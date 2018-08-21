var sUrl = "/sap/opu/odata/sap/ZGWP_PM_FAULT_MANAGE_SRV";


function  getOpenNotifCount(car,notifNum,view){
    
    var oModel= new sap.ui.model.json.JSONModel();
if(!this.busyIndicatorCount){
	    
	    this.busyIndicatorCount = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicatorCount.open();
    var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_OPEN_NOTIF?$filter= IvCar eq '"+car+"'and IvCurrentNotif eq'"+notifNum+"'and IvSympcode eq'@@@@'",
contentType: "application/json; charset=utf-8",
            dataType: "json",
                            
          success: function (data, status, jqXHR) {
           
              oModel.setData({listitems: data.d.results});
              modal.busyIndicatorCount.close();
              var data  = oModel.getData();
      		  var length = $.trim(data.listitems[0].Zzqmcod);
      		  if(data == ""|| length<1)
      			{
      			view.checkFaults.setText("Check Open Faults ("+length+")");
      			
      			}
      		else
      			{
      			view.checkFaults.setText("Check Open Faults ("+length+")");
      			}
              
            
            },
            error: function (jqXHR, status) {
            	 modal.busyIndicatorCount.close();
                        
            }
             });
    
    
};
function  getNotificationList(){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_NOTIFUSEROUT?$filter=Zzernam eq 'RANAN'&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                            
          success: function (data, status, jqXHR) {
           
              oModel.setData({listitems: data.d.results});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
            }
             });
    
    return oModel;
};

function getSetNumber(carNumber,callback,callbackObject){
	
	var eModel= new sap.ui.model.json.JSONModel();
	sap.ui.core.BusyIndicator.show();
    jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_TECHOBJ?$filter=IvCarid eq '"+carNumber+"'&$expand=NAV_HIERARCHY,NAV_CARSET&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                               
          success: function (data, status, jqXHR) {
        	  sap.ui.core.BusyIndicator.hide();
        	  
        	  
        	  callback.call(callbackObject,data);
        	  
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                          
            }
             });


};
function getAssetTree(carNumber,source,callback, callbackObject){
	
if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
	
	var eModel= new sap.ui.model.json.JSONModel();
	jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_TECHOBJ?$filter=IvCarid eq '"+carNumber+"' and IvHier eq 'X'&$expand=NAV_HIERARCHY,NAV_CARSET&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                               
          success: function (data, status, jqXHR) {
        	  modal.busyIndicator.close();
        	  callback.call(callbackObject,data);
        	  },
            error: function (jqXHR, status) {
            	modal.busyIndicator.close();
                           
            }
             });
};

function setOpenNotificationData(car,notifTable,page,controller,notifNum){
	
	var eModel= new sap.ui.model.json.JSONModel();
if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
    jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_OPEN_NOTIF?$filter= IvCar eq '"+car+"'and IvCurrentNotif eq'"+notifNum+"'",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
        	  modal.busyIndicator.close();
        	  var oData = data.d.results;
              oData.sort(function(a, b) {
                  if (a.Zzqmdat === b.Zzqmdat) return 0;
                  return a.Zzqmdat < b.Zzqmdat ? 1 : -1;
              });
              notifTable.getModel().setSizeLimit(data.d.results.length);
        	  notifTable.getModel().setData(oData);
        	  
        	  if(data.d.results.length>1)
        	{	  
        	  page.setTitle(data.d.results.length+" open faults found for car "+car);
        	  controller.openDialog();
        	}
        	  else if(data.d.results.length==0)
        		  {
        		  jQuery.sap.require("sap.m.MessageBox");
        		  sap.m.MessageBox.show("No open faults found for car "+car,sap.m.MessageBox.Icon.INFORMATION, "Fault Information", sap.m.MessageBox.Action.OK, function() {/*True case;*/ });
        		  }
        	  else
        		  {
        		  page.setTitle(data.d.results.length+" open fault found for car "+car);
        		  controller.openDialog();
        		  }
        	  
          },
            error: function (jqXHR, status) {
            	modal.busyIndicator.close();
                           
            }
             });
};
//To get the Car Number Details
function  getCarList(setNum,callback, callbackObject){
	
if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
	
	if (setNum == "") //car number input check
		{
		searchString = "*";
		}
	else 
		searchString = setNum;
	
	 var eModel= new sap.ui.model.json.JSONModel();
	    var adata= jQuery.ajax({
	           async:true,
	      type: "GET",
	url: sUrl+"/ETS_FLAG2?$filter=IvCar eq '"+searchString+"'&$expand=NAV_CAR",  
	contentType: "application/json; charset=utf-8",
	            dataType: "json",
	                              
	          success: function (data, status, jqXHR) {
	        	  
	        	  modal.busyIndicator.close();
	        	  callback.call(callbackObject,data);
	        	 
	        		            },
	            error: function (jqXHR, status) {
	            	
	            	modal.busyIndicator.close();
	            	 }
	             });
	    
	
};
// To get the Set Number Details
function  getSetList(setNum,callback, callbackObject){
	if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
	
	if (setNum == "")	//set number input check
	{
	searchString = "*";
	}
else 
	searchString = setNum;
    
	
	    var adata= jQuery.ajax({
	           async:true,
	      type: "GET",
	url: sUrl+"/ETS_FLAG2?$filter=IvSet eq '"+searchString+"'&$expand=NAV_SET",  
	contentType: "application/json; charset=utf-8",
	            dataType: "json",
	                              
	          success: function (data, status, jqXHR) {
	        	  modal.busyIndicator.close();
	        	  callback.call(callbackObject,data);
	        	  },
	            error: function (jqXHR, status) {
	            	 modal.busyIndicator.close();
	            	 }
	             });
	    
	   
};
// To get Priority List
function  getPrioList(){
       
       var oModel= new sap.ui.model.json.JSONModel();
       sap.ui.core.BusyIndicator.show();
       var adata= jQuery.ajax({
              async:false,
         type: "GET",
   url: sUrl+"/ETS_PRIORITY?$filter=IvNotifTyp eq 'F2'",  
   contentType: "application/json; charset=utf-8",
               dataType: "json",
                                 
             success: function (data, status, jqXHR) {
              
                 oModel.setData({listitems: data.d.results});
                 sap.ui.core.BusyIndicator.hide();
               
               },
               error: function (jqXHR, status) {
            	   sap.ui.core.BusyIndicator.hide();
                              
               }
                });
       
       return oModel;
};
// To get Sector List
function  getSectorList(){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG2?$filter=IvSectorcode eq 'X'&$expand=NAV_SECTORCODE",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
           
              oModel.setData({listitems: data.d.results[0].NAV_SECTORCODE.results});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
         	   sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return oModel;
};
// To get Object Part Groups
function  getObjectPartList(){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: "proxy/http/tdylap01.transport.nsw.gov.au:8100/sap/opu/odata/sap/ZGWP_PM_FAULT_MANAGE_SRV/ETS_SYMP_OBJ_CG?$filter=IvCatalog eq 'B'&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                            
          success: function (data, status, jqXHR) {
           
              oModel.setData({listitems: data.d.results});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return oModel;
};
//To get Symptom Groups
function  getSymptomList(asset, car, callback, callbackObject){
if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
    
       var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_SYMP_OBJ_CG?$filter=IvAsset eq '"+asset+"' and IvCatalog eq 'S' and IvCarid eq '"+car+"'",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                             
          success: function (data, status, jqXHR) {
        	  
        	  modal.busyIndicator.close();
        	  callback.call(callbackObject,data);
        	                       
            },
            error: function (jqXHR, status) {
            	 modal.busyIndicator.close();
            	        
            }
             });
    

};
//To get Symptom Code for a selected Group
function getSymptomDamageList(code,callback, callbackObject)
{
if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog();
	  }

	  var modal = this;
	  modal.busyIndicator.open();
    var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_SYM_OBJ_CODES?$filter=IvCatalog eq 'S' and IvCodeGrp eq '"+code+"'",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
           
        	  modal.busyIndicator.close();
        	  callback.call(callbackObject,data);
        	  },
            error: function (jqXHR, status) {
            	 modal.busyIndicator.close();
            	 }
             });
    

};
//To get Object Part Code for a selected Group
function getObjectPartDamageList(code)
{
	var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_SYM_OBJ_CODES?$filter=IvCatalog eq 'B' and IvCodeGrp eq'"+code+"'",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
           
              oModel.setData({listitems: data.d.results});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return oModel;
};
//To get the notification Type list
function  getNotificationTypeList(){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_NOTIF_TYP?$filter=IvNotif eq 'X'&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                             
          success: function (data, status, jqXHR) {
          
              oModel.setData({listitems: data.d.results});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return oModel;
};
//To get trip number
function  getTripDetails(trip,set,dateNow,time,callback, callbackObject){
	
	if (!this.busyIndicatorTrip) {

		this.busyIndicatorTrip = new sap.m.BusyDialog()
	}

	var modal = this;
	modal.busyIndicatorTrip.open();
	
	var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_TRIP_SET(IvSetid='"+set+"',IvTripid='"+trip+"',IvFdate=datetime'"+dateNow+"',IvFtime=time'"+time+"')",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function (data, status, jqXHR) {
          	  
          	  
          	  callback.call(callbackObject,data);
          	  modal.busyIndicatorTrip.close();
          	                           
              },
              error: function (jqXHR, status) {
              	 modal.busyIndicatorTrip.close();
              	            
              }
                               
         
             });
    
   
};
//To get position list
function  getPositionList(callback, callbackObject){
	
	if (!this.busyIndicator) {

		this.busyIndicator = new sap.m.BusyDialog()
	}

	var modal = this;
	modal.busyIndicator.open();
    var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_POSITION",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function (data, status, jqXHR) {
          	  
          	  modal.busyIndicator.close();
          	  callback.call(callbackObject,data);
          	                          
              },
              error: function (jqXHR, status) {
              	 modal.busyIndicator.close();
              	            
              }
                               
         
             });
    
   
};
// To get engineering flag
function  getEngFlagList(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG2?$filter=IvEngg eq 'X'&$expand=NAV_ENGG",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
          
        	  var oModel= new sap.ui.model.json.JSONModel();
              oModel.setData({items: data.d.results});
              var data=oModel.getData().items[0];
              var oData = data.NAV_ENGG.results;
              eModel.setData({listitems: oData});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return eModel;
};
// To get Audit type list
function  getAuditTypeList(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG?$filter=IvAudittype eq 'X'&$expand=NAV_AUDITTYPE",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                                
          success: function (data, status, jqXHR) {
          
        	  var oModel= new sap.ui.model.json.JSONModel();
              oModel.setData({items: data.d.results});
              var data=oModel.getData().items[0];
              var oData = data.NAV_AUDITTYPE.results;
              eModel.setData({listitems: oData});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return eModel;
};
// To get fault response
function  getFaultResponse(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG2?$filter=IvStatusprofile eq 'TNOTI0F1'&$expand=NAV_FAULTRESPONSE&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
           
        	  var oModel= new sap.ui.model.json.JSONModel();
              oModel.setData({items: data.d.results});
              var data=oModel.getData().items[0];
              var oData = data.NAV_FAULTRESPONSE.results;
              eModel.setData({listitems: oData});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return eModel;
};
//To get temperature list
function  getTempList(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG2?$filter=IvTemp eq 'X'&$expand=NAV_TEMP&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
           
        	  var oModel= new sap.ui.model.json.JSONModel();
              oModel.setData({items: data.d.results});
              var data=oModel.getData().items[0];
              var oData = data.NAV_TEMP.results;
              eModel.setData({listitems: oData});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return eModel;
};
//To get Weather List
function  getWeatherList(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG2?$filter=IvWeather eq 'X'&$expand=NAV_WEATHER&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
           
        	  var oModel= new sap.ui.model.json.JSONModel();
              oModel.setData({items: data.d.results});
              var data=oModel.getData().items[0];
              var oData = data.NAV_WEATHER.results;
              eModel.setData({listitems: oData});
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
    return eModel;
};
//To get Fault Source
function  getFaultSources(list){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG?$filter=IvFaultsrc eq 'X'&$expand=NAV_FAULTSRC",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                              
          success: function (data, status, jqXHR) {
          
        	  var oModel= new sap.ui.model.json.JSONModel();
              oModel.setData({listitems : data.d.results[0].NAV_FAULTSRC.results});
              
              list.setModel(oModel);
              var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
              oDataTemplate.bindProperty("value", "ZzfaultSrc"); //binding the code for Fault source
              var listDesc =  new sap.m.StandardListItem({
                  title : "{Zzdesc}", }); // description visible on pop over
              listDesc.addCustomData(oDataTemplate);
              list.bindItems("/listitems",listDesc);
             
              sap.ui.core.BusyIndicator.hide();
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    

};
// To get report phase list
function  getReportPhase(list){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG?$filter=IvReportphase eq 'X'&$expand=NAV_REPORTPHASE",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
                               
          success: function (data, status, jqXHR) {
          
        	  var oModel= new sap.ui.model.json.JSONModel();
              oModel.setData({listitems : data.d.results[0].NAV_REPORTPHASE.results});
              
              list.setModel(oModel);
              var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
              oDataTemplate.bindProperty("value", "Zzrphase"); //binding the code for report phase
              var listDesc =  new sap.m.StandardListItem({
                  title : "{Zzdesc}", }); //description field
              listDesc.addCustomData(oDataTemplate);
              list.bindItems("/listitems",listDesc);
             
              sap.ui.core.BusyIndicator.hide();

            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
                           
            }
             });
    

};
function  getTechnician_table(notifNum,callback, callbackObject){
    
    if (!this.busyIndicator) {
		
		this.busyIndicator = new sap.m.BusyDialog()
	}
	var modal = this;

	modal.busyIndicator.open();

    var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_FLAG2?$filter=IvTechnician eq 'X' and IvNotif eq '"+notifNum+"'&$expand=NAV_TECHNICIAN&$format=json",
contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function (data, status, jqXHR) {
          	  
          	  modal.busyIndicator.close();
          	  callback.call(callbackObject,data);
          	                          
              },
              error: function (jqXHR, status) {
              	 modal.busyIndicator.close();
              	           
              }                  
             });
    
  };
function  getLocation_table(callback, callbackObject){
    
    if (!this.busyIndicator) {
		
		this.busyIndicator = new sap.m.BusyDialog()
	}
	var modal = this;

	modal.busyIndicator.open();

    var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_FLAG?$filter=IvLocation eq 'X'&$expand=NAV_LOCATION&$format=json",
contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function (data, status, jqXHR) {
          	  
          	  modal.busyIndicator.close();
          	  callback.call(callbackObject,data);
          	                          
              },
              error: function (jqXHR, status) {
              	 modal.busyIndicator.close();
              	          
              }                  
         });
    
};
// To get location list
function  getLocation(list){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: sUrl+"/ETS_FLAG?$filter=IvLocation eq 'X'&$expand=NAV_LOCATION&$format=json",
contentType: "application/json; charset=utf-8",
            dataType: "json",
                                
          success: function (data, status, jqXHR) {
           
        	  var oModel= new sap.ui.model.json.JSONModel();
              oModel.setData({listitems : data.d.results[0].NAV_LOCATION.results});
              
              list.setModel(oModel);
              var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
              oDataTemplate.bindProperty("value", "Zzfloca");
              var listDesc =  new sap.m.StandardListItem({
                  title : "{Zzdesc}", });
              listDesc.addCustomData(oDataTemplate);
              list.bindItems("/listitems",listDesc);
              
              sap.ui.core.BusyIndicator.hide();
              
            
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });

};
//To get intial set of user detail values
function setFaultLocDetails(source){
		
	var eModel= new sap.ui.model.json.JSONModel();
	sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:false,
      type: "GET",
url: "/sap/opu/odata/sap/ZGWP_EAM_FAULT_MANAGE02_SRV/ETS_USER_DETAIL?$filter=IvUser eq 'AHMEDDA' and IvFaultsourceE eq '' and IvPriorityE eq '' and IvSymptom eq ''&$format=json",  
contentType: "application/json; charset=utf-8",
            dataType: "json",
          success: function (data, status, jqXHR) {
        	  sap.ui.core.BusyIndicator.hide(); 

      		var view = source.getView();
      		source.getView().faultSource.setValue(data.d.results[0].ZzfaultsourceR);
      		source.getView().location.setValue(data.d.results[0].Zzlocation);
      		source.getView().reportPhase.setValue(data.d.results[0].Zzreportphase);
      		source.getView().faultSource.data("value",data.d.results[0].ZzfaultsourceR);
      		source.getView().location.data("value",data.d.results[0].Zzlocation);
      		source.getView().reportPhase.data("value",data.d.results[0].Zzreportphase);
      		getValidationRules(source,data.d.results[0].ZzfaultsourceR,"","");
            },
            error: function (jqXHR, status) {
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
};

function getValidationRules(source,faultSource,priority,symptom){
	
	 var eModel= new sap.ui.model.json.JSONModel();
	sap.ui.core.BusyIndicator.show();
		
	    var adata= jQuery.ajax({
	           async:false,
	      type: "GET",
	url: "/sap/opu/odata/sap/ZGWP_EAM_FAULT_MANAGE02_SRV/ETS_USER_DETAIL?$filter=IvUser eq '' and IvFaultsourceE eq '"+ faultSource+"' and IvPriorityE eq '" + priority + "' and IvSymptom eq '" + symptom + "'&$format=json",  
	contentType: "application/json; charset=utf-8",
	            dataType: "json",
	          success: function (data, status, jqXHR) {
	        	  sap.ui.core.BusyIndicator.hide(); 

	      		var view = source.getView();

	      	 if(data.d.results.length == 1){
	      		 
	      		 if(data.d.results[0].ZzpriorityR != "" && source.priorityList){   //set priority description by looping through priority keys
	      		
	      		 var priorityData = source.priorityList.getModel().getData();
	      		 var desc = "";
	      		 for(i in priorityData.listitems){
	      			 if(priorityData.listitems[i].Zzpriok == data.d.results[0].ZzpriorityR ){
	      				view.priority_input.setValue(priorityData.listitems[i].Zzpriokx);
	      				view.priority_input.data("value",priorityData.listitems[i].Zzpriok);
	      			 }
	      		 }
	      		 
	      		 }
	      		 else if(data.d.results[0].ZzpriorityR != ""){   //if prioirity list is not avialable, default key
	      			view.priority_input.setValue(data.d.results[0].ZzpriorityR );
      				view.priority_input.data("value",data.d.results[0].ZzpriorityR );
	      		 }
	      		 
		      		if(data.d.results[0].Zzfaulttype2 == "M"){   // check if faulttype2 has to be mandatory
		      			view.fixedTraffic.data("mandatory",true);
		      			view.fixedTraffic.setText("*Fixed in Traffic");
		      		}
		      		else if(data.d.results[0].Zzfaulttype2 == "N"){
		      			view.fixedTraffic.data("mandatory",false);
		      			view.fixedTraffic.setText("Fixed in Traffic");
		      		}
	     	      		 
	      		 
	      		if(data.d.results[0].ZztsrTpcAuditno == "M"){   // check if audit number has to be mandatory
	      			view.auditNum.data("mandatory",true);
	      			view.auditNum.getParent().setVisible(true);	
	      			view.auditNum.getParent().setLabel("*TSR/TPC/Audit Number");
	      		}
	      		else if(data.d.results[0].ZztsrTpcAuditno = "N"){
	      			view.auditNum.data("mandatory",false);
	      			view.auditNum.getParent().setLabel("TSR/TPC/Audit Number");	      			
	      		}
	      		else if(data.d.results[0].ZztsrTpcAuditno == "H"){
	      			view.auditNum.getParent().setVisible(false);
	      			view.auditNum.data("mandatory",false);
      			}
	      		else if(data.d.results[0].ZztsrTpcAuditno == "V"){
	      			view.auditNum.getParent().setVisible(true);
	      			view.auditNum.data("mandatory",false);
      			}
	      		
	      		
	      		if(data.d.results[0].Zzaudittype == "M"){ // check if audit type has to be mandatory
	      			view.auditType.getParent().setLabel("*Audit Type");
	      			view.auditType.data("mandatory",true);
	      			view.auditType.getParent().setVisible(true);
	      		}
	      		else if(data.d.results[0].Zzaudittype == "N"){
	      			view.auditType.data("mandatory",false);
	      			view.auditType.getParent().setLabel("Audit Type");
	      		}
	      		else if(data.d.results[0].Zzaudittype == "H"){
	      			view.auditType.getParent().setVisible(false);	
	      			view.auditNum.data("mandatory",false);
	      		}
	      		else if(data.d.results[0].Zzaudittype == "V"){
	      			view.auditType.getParent().setVisible(true);	
	      			view.auditNum.data("mandatory",false);
	      		}
	      		
	    		if(data.d.results[0].Zzengflag == "M"){		// check if engineering has to be mandatory
	      			view.engineering.getParent().setLabel("*Engineering Flag");
	      			view.engineering.data("mandatory",true);
	      			view.engineering.getParent().setVisible(true);
	      		}
	      		else if(data.d.results[0].Zzengflag = "N"){
	      			view.engineering.data("mandatory",false);
	      			view.engineering.getParent().setLabel("Engineering Flag");
	      		}
	      		else if(data.d.results[0].Zzengflag == "H"){
	      			view.engineering.getParent().setVisible(false);	
	      			view.engineering.data("mandatory",false);
	      		}
	      		else if(data.d.results[0].Zzengflag == "V"){
	      			view.engineering.getParent().setVisible(true);	
	      			view.engineering.data("mandatory",false);
	      		}
	      	 }
	      	 else{                          // if no rules are fetched, default all fields to initial state
	     		view.auditNum.data("mandatory",false);
	     		view.auditType.data("mandatory",false);
     			view.auditType.getParent().setLabel("Audit Type");
     			view.auditNum.getParent().setLabel("TSR/TPC/Audit Number");
     			view.auditType.getParent().setVisible(true);	
	     		view.auditNum.getParent().setVisible(true);	
	     		view.engineering.getParent().setLabel("Engineering Flag");
	     		view.engineering.data("mandatory",false);
	     		view.engineering.getParent().setVisible(true);
      			view.fixedTraffic.data("mandatory",false);
      			view.fixedTraffic.setText("Fixed in Traffic");
	     		
	      	 }
	      		

	            },
	            error: function (jqXHR, status) {
	            	sap.ui.core.BusyIndicator.hide();
	                           
	            }
	             });
	    

}


///Post call for Create to the backend
function createNotification(postData,controller,check,flag,checkCarCount){

if(!this.busyIndicator){
	
	this.busyIndicator = new sap.m.BusyDialog()
}

var modal = this;
var oModel =  new sap.ui.model.odata.ODataModel(sUrl, true) ;
modal.busyIndicator.open();
oModel.refreshSecurityToken(
function(a, b) {
	
	var length =  postData.length;
    for ( var i = 0;i < length; i++)
   	 {
	
oModel.oHeaders = {
             "x-csrf-token" : b.headers["x-csrf-token"],
              "Content-Type" : "application/json; charset=utf-8"
              
                   
};
var formattedData = {"d":postData[i]};

oModel.create('/ETS_FAULT_CREATE_UPD',formattedData,{
      success : function(data, response){
   	   	  modal.busyIndicator.close();
             if((flag)&&(checkCarCount))
       	  {
       	  controller.handleMultipleResponse(data,length);
       	  }
         else{
       	  controller.handleSingleResponse(data,length);
         }
           	 },
      error : function(error){
    	  modal.busyIndicator.close();
          sap.m.MessageBox.show("Fault Creation failed !..",sap.m.MessageBox.Icon.ERROR,"Fault Information", sap.m.MessageBox.Action.OK, null );
          controller.getView().saveUpdate.setEnabled(true);
      }
});
}
}, function(a) {
      successFaultCallBack.apply(context,[a, true]);
}, true);

}

//Post call to the backend
function markAsDuplicatePost(postData,controller){
	 if(!this.busyIndicator){
			
			this.busyIndicator = new sap.m.BusyDialog()
		}

	 var modal = this;
    var oModel =  new sap.ui.model.odata.ODataModel(sUrl, true) ;
    var rModel = new sap.ui.model.json.JSONModel();
    modal.busyIndicator.open();
    oModel.refreshSecurityToken(
  function(a, b) {
	
	var length =  postData.length;
  for ( var i = 0;i < length; i++)
	 {

  oModel.oHeaders = {
        "x-csrf-token" : b.headers["x-csrf-token"],
         "Content-Type" : "application/json; charset=utf-8"
         
              
   };
var formattedData = {"d":postData[i]};
    oModel.create('/ETS_DUP_NOTIF',formattedData,{
              success : function(data, response){
           	   	  modal.busyIndicator.close();
                     controller.handleDuplicateResponse(data,i);
                   	 },
              error : function(error){
           	   modal.busyIndicator.close();
                     sap.m.MessageBox.show("Marked as Duplicate failed !..",sap.m.MessageBox.Icon.ERROR,"Fault Information", sap.m.MessageBox.Action.OK, null );
              }
       });
	 }
       }, function(a) {
              successFaultCallBack.apply(context,[a, true]);
}, true);
    
};

function setInitialValidationRules(source){
if (!this.busyIndicator) {
		
		this.busyIndicator = new sap.m.BusyDialog()
	}
	var modal = this;

	modal.busyIndicator.open();
	
	var eModel= new sap.ui.model.json.JSONModel();
	sap.ui.core.BusyIndicator.show();
    var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_NOTIFRULE?$filter=Zzuser eq 'SHAHK'",
      contentType: "application/json; charset=utf-8",
            dataType: "json",
          success: function (data, status, jqXHR) {
        	  modal.busyIndicator.close();
        	  sap.ui.core.BusyIndicator.hide(); 

      		var view = source.getView();
      		var rules = data.d.results;
      		source.rules = rules;
      		var url ;
      		var rulesHash = {
      				faultSource : [],
      				symptom : [],
      				priority : [],
      		
      		}

      			for( i=0; i < rules.length ;i++ )
      			{
      				if(rules[i].Zzuser != ""){
      		      		source.getView().faultSource.setValue(rules[i].ZzfaultsourceR);
      		      		source.getView().location.setValue(rules[i].Zzlocation);
      		      		source.getView().reportPhase.setValue(rules[i].Zzreportphase);
      		      		source.getView().faultSource.data("value",rules[i].ZzfaultsourceR);
      		      		source.getView().location.data("value",rules[i].Zzlocation);
      		      		source.getView().reportPhase.data("value",rules[i].Zzreportphase);
      				}
      				else if(rules[i].ZzfaultsourceE != ""){
      					rulesHash.faultSource[rules[i].ZzfaultsourceE] = rules[i];
      				}
      				else if(rules[i].ZzpriorityE != ""){
      					rulesHash.priority[rules[i].ZzpriorityE] = rules[i];
      				}
      				else if(rules[i].Zzsymptom != ""){
      					rulesHash.symptom[rules[i].Zzsymptom] = rules[i];
      									}
      				else if(rules[i].Zzurl != ""){
      					 url = rules[i].Zzurl ;
      									}
      		     				
      			}
      		source.rulesHash = rulesHash;
      		if(source.oView.sId == "createNotification")
      			{
      		source.getValidateValues("faultSource",source.getView().faultSource.getValue());
      			}
      		else{
      			source.getView().data("url",url);
      		}
      		
            },
            error: function (jqXHR, status) {
            	modal.busyIndicator.close();
            	sap.ui.core.BusyIndicator.hide();
                           
            }
             });
    
};

//ToValidate Set Number
function  validateSetNum(setNum,callback, callbackObject){
if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
    
       var adata= jQuery.ajax({
           async:true,
      type: "GET",
url: sUrl+"/ETS_TECHOBJ?$filter=IvSetid eq '"+setNum+"'&$expand=NAV_HIERARCHY,NAV_CARSET",  

contentType: "application/json; charset=utf-8",
            dataType: "json",
                             
          success: function (data, status, jqXHR) {
        	  
        	  modal.busyIndicator.close();
        	  callback.call(callbackObject,data);
        	                        
            },
            error: function (jqXHR, status) {
            	 modal.busyIndicator.close();
            	        
            }
             });
    

};
//To get the attachment list
function  getDocList(notifNum,callback, callbackObject){
	if(!this.busyIndicator){
			
			this.busyIndicator = new sap.m.BusyDialog()
		}

	var modal = this
	  modal.busyIndicator.open();
		var adata= jQuery.ajax({
	         type: "GET",
	         url : sUrl+"/ETS_GET_ATTACHMENTS_IN?$filter=IvKey eq'"+notifNum+"' and IvNotification eq 'X'&$expand=NAV_GET_ATT_LIST",  
	   contentType: "application/json; charset=utf-8",
	               dataType: "json",              
	             success: function (data, status, jqXHR) {
	            	 modal.busyIndicator.close();
	            	 
	            	 callback.call(callbackObject,data);
	                
	               },
	               error: function (jqXHR, status) {
	            	   modal.busyIndicator.close();
	            	   }
	                });
		 

	};
	function  getDocListForUpdate(notifNum,callback, callbackObject){
		if(!this.busyIndicator){
				
				this.busyIndicator = new sap.m.BusyDialog()
			}

		var modal = this
		  modal.busyIndicator.open();
			var adata= jQuery.ajax({
		         type: "GET",
		         url : sUrl+"/ETS_GET_ATTACHMENTS_IN?$filter=IvKey eq'"+notifNum+"' and IvNotification eq 'X'&$expand=NAV_GET_ATT_LIST",  
		   contentType: "application/json; charset=utf-8",
		               dataType: "json",              
		             success: function (data, status, jqXHR) {
		            	 modal.busyIndicator.close();
		            	 
		            	 callback.call(callbackObject,data);
		                
		               },
		               error: function (jqXHR, status) {
		            	   modal.busyIndicator.close();
		            	  
		                         }
		                });
			 

		};
//To remove attachments from the list
	function  removeDocList(notifNum,docValue,callback, callbackObject){
		if(!this.busyIndicator){
				
				this.busyIndicator = new sap.m.BusyDialog()
			}

		var modal = this
		  modal.busyIndicator.open();
			var adata= jQuery.ajax({
		         type: "GET",
		         url :sUrl+"/ETS_DELETE_ATTACH(IvDel='X',IvKey='"+notifNum+"',IvSoObjNo='"+docValue+"',IvType='N')",  
		   contentType: "application/json; charset=utf-8",
		               dataType: "json",              
		             success: function (data, status, jqXHR) {
		            	 modal.busyIndicator.close();
		            	 
		            	 callback.call(callbackObject,data);
		                
		               },
		               error: function (jqXHR, status) {
		            	   modal.busyIndicator.close();
		            	   
		                         }
		                });
			 

		};	
//TO get fault details
function getFaultDetails(notifNum, callback, callbackObject) {
	if (!this.busyIndicator) {

		this.busyIndicator = new sap.m.BusyDialog();
	}

	var modal = this
	modal.busyIndicator.open();
	var adata = jQuery.ajax({
		type : "GET",
		url : sUrl + "/ETS_FAULT_DISPLAY(IvNotifNum='"+notifNum+"')",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(data, status, jqXHR) {
			modal.busyIndicator.close();
			
			callback.call(callbackObject, data);

		},
		error : function(jqXHR, status) {
			modal.busyIndicator.close();
			
		}
	});

};	
// To search faults based on search parameters
	function searchFaults(data,controller)
	{
		 if(!this.busyIndicator){
				
				this.busyIndicator = new sap.m.BusyDialog()
			}

		 var modal = this;
	     var oModel =  new sap.ui.model.odata.ODataModel(sUrl, true) ;
	     var rModel = new sap.ui.model.json.JSONModel();
	     modal.busyIndicator.open();
	     oModel.refreshSecurityToken(
	 function(a, b) {
	     oModel.oHeaders = {
	                      "x-csrf-token" : b.headers["x-csrf-token"],
	                       "Content-Type" : "application/json; charset=utf-8",
	                       "accept" : "application/json",
	                       "dataType" : "json",
	                            
	        };
	     oModel.create('/ETS_OPEN_NOTIF_ADV_SRCH_IN',data,{
	               success : function(data, response){
	            	   	  modal.busyIndicator.close();
	                      if(data.NAV_OPEN_NOTIF_LIST ==null)
	                    	  {
	                    	  jQuery.sap.require("sap.m.MessageBox");
	                    	  sap.m.MessageBox.show("No results found with the search criteria",sap.m.MessageBox.Icon.INFORMATION , "Fault Search Information", sap.m.MessageBox.Action.OK, function() { });  
	                    	  }
	                      else
	                    	  {
	                      rModel.setData({listitems : data.NAV_OPEN_NOTIF_LIST.results});
	                      rModel.setSizeLimit(500);
	                      controller.getSearchResults(null,rModel);	
	                      jQuery.sap.require("sap.m.MessageBox");
	                      
	                    	  }    },
	               error : function(error){
	            	   modal.busyIndicator.close();
	                      sap.m.MessageBox.show("Search failed !..",sap.m.MessageBox.Icon.ERROR,"Search Information", sap.m.MessageBox.Action.OK, null );
	               }
	        });
	        }, function(a) {
	               successFaultCallBack.apply(context,[a, true]);
	}, true);
	     
	return rModel;
	     
};

