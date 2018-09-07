var faultServiceUrl = "/sap/opu/odata/sap/ZGWP_PM_FAULT_MANAGE_SRV";
var commonUtilUrl = "/sap/opu/odata/sap/ZGWP_PM_COMMON_UTILITY_SRV"; //++ CR015 SIMS20180815 (SY)
//var faultServiceUrl = "https://nwgwdev.transport.nsw.gov.au/sap/opu/odata/sap/ZGWP_PM_FAULT_MANAGE_SRV";
var eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
// Begin of insert KADAMA20160923 for Defect 14867
function validateSetAM(callback, callbackObject, set) {
	var oModel = new sap.ui.model.json.JSONModel();
	sap.ui.core.BusyIndicator.show();
	var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl,
			false);
	mModel.read("/ETS_PLANT_SECTION_CHECK('" + set + "')", {
		success : function(odata, response) {
			
        	callback.call(callbackObject,response.data);
			sap.ui.core.BusyIndicator.hide();
		},
		error : function(error) {
			sap.ui.core.BusyIndicator.hide();
			sap.m.MessageBox.alert(error, {
				title : "Error",
				icon : sap.m.MessageBox.Icon.ERROR
			});
		}
	})
};
//End of Insert KADAMA20160923+ for Defect 14867

//Begin Of Insert for Defect 14670 KADAMA20160927
function validateSetM_updateView(set, updateView, priority) {
	var oModel = new sap.ui.model.json.JSONModel();
	var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl,
			false);
	mModel.read("/ETS_PLANT_SECTION_CHECK('" + set + "')", {
		success : function(odata, response) {

			var enable_flag = true;
			if(		response.data.Zzplant_section == "true"){ //Belongs to Warath or Millenium
				if(response.data.Zzplant_section_val =='5' && //Plant Section for M Set
					priority =='U')							  //Priority 
					{
						enable_flag = true;
					}
				else{
						enable_flag = false;
				}
			}
			enableFieldsInUpdateView(enable_flag, updateView);
			updateView.getController().setFaultPositionMandatory(response.data);
				
			
		},
		error : function(error) {
			sap.m.MessageBox.alert(error, {
				title : "Error",
				icon : sap.m.MessageBox.Icon.ERROR
			});
		}
	})
};
function enableFieldsInUpdateView(enable_flag,updateView ){
	updateView.setNum.setEnabled(enable_flag);
	
	updateView.carInput.setEnabled(enable_flag);
	var multiInput = updateView.carInput;
	var tokens = multiInput.getTokens();
	jQuery.each(tokens, function(idx, token) {
	    token.setEditable(enable_flag);
	});
	
	updateView.addButton.setEnabled(enable_flag);

	updateView.tripNum.setEnabled(enable_flag);

	updateView.dateTime.setEnabled(enable_flag);

	updateView.faultRepBy.setEnabled(enable_flag);
	
	updateView.location.setEnabled(enable_flag); 

	/*updateView.asset.setEditable(enable_flag);

	updateView.symptom.setEditable(enable_flag);
	
	updateView.obj_inp.setEditable(enable_flag);*/
	updateView.asset.setEnabled(enable_flag);
	multiInput = updateView.asset;
	tokens = multiInput.getTokens();
	jQuery.each(tokens, function(idx, token) {
	    token.setEditable(enable_flag);
	});

	updateView.symptom.setEnabled(enable_flag);
	multiInput = updateView.symptom;
    tokens = multiInput.getTokens();
	jQuery.each(tokens, function(idx, token) {
	    token.setEditable(enable_flag);
	});
	
	updateView.obj_inp.setEnabled(enable_flag);
	multiInput = updateView.obj_inp;
	tokens = multiInput.getTokens();
	jQuery.each(tokens, function(idx, token) {
	    token.setEditable(enable_flag);
	});
	
	updateView.faultSource.setEditable(enable_flag);
	
	updateView.reportPhase.setEditable(enable_flag);
	
	updateView.faultSource.setEnabled(enable_flag);
	
	updateView.reportPhase.setEnabled(enable_flag);
	
	updateView.positionPopOver.setEnabled(enable_flag);
	
	if(enable_flag == false){
		/*updateView.positionPopOver.data("mandatory", false);
		updateView.positionLabel.setRequired(false);*/
		if(updateView.positionPopOver.getValue() == "" ||
		   updateView.positionPopOver.getValue().indexOf("N/A") !== -1){
			updateView.positionPopOver.setValue("- N/A");
			var selector1 = "#" + updateView.positionPopOver.getId() + "-inner";
			$(selector1).css("border-color","#bfbfbf");
		}
		/*var selector1 = "#" + updateView.positionPopOver.getId() + "-inner";
		$(selector1).css("border-color","#bfbfbf");*/
	}
	
	updateView.actTable.getColumns()[3].setVisible(enable_flag);
	
	updateView.damage_inp.setEnabled(enable_flag);
	
	updateView.damage_desc.setEnabled(enable_flag);
	
	updateView.cause_inp.setEnabled(enable_flag);
	
	updateView.cause_desc.setEnabled(enable_flag);
	
	updateView.auditNum.setEnabled(enable_flag);

	updateView.auditType.setEnabled(enable_flag); // Insert For Fault UI Fix KADAMA20170109 #HPQC 39201 --> enable Field
	
	var items = updateView.actTable.getModel().getProperty("/").actitems;

	for(var i= 0; i<items.length; i++){
		items[i].enabled = enable_flag;
	}
	updateView.actTable.getModel().refresh(true);
}
//End of  for Defect 14670 KADAMA20160927
function  getOpenNotifCount(car,notifNum,view){
    
    var oModel= new sap.ui.model.json.JSONModel();
if(!this.busyIndicatorCount){
	    
	    this.busyIndicatorCount = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	  modal.busyIndicatorCount.open();
	  mModel.read("/ETS_OPEN_NOTIF?$filter= IvCar eq '"+car+"'and IvCurrentNotif eq'"+notifNum+"'and IvSympcode eq'@@@@'", {
          success: function (data, response) {
              
              oModel.setData({listitems: data.results});
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
            error: function (oError) {
            	 modal.busyIndicatorCount.close();
                        
            }		  
	  });
};
function  getNotificationList(){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_NOTIFUSEROUT?$filter=Zzernam eq 'RANAN'",null, null, false,
    	function (data, response) {
            oModel.setData({listitems: data.results});
            sap.ui.core.BusyIndicator.hide();
          },
          function (oError) {
          	sap.ui.core.BusyIndicator.hide();
          }
    );
    return oModel;
};

function getSetNumber(carNumber,callback,callbackObject){
	
	var eModel= new sap.ui.model.json.JSONModel();
	sap.ui.core.BusyIndicator.show();
	var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	mModel.read("/ETS_TECHOBJ?$filter=IvCarid eq '"+carNumber+"'&$expand=NAV_HIERARCHY,NAV_CARSET",{
        success: function (oData, response) {
        	var data={};
        	data.d = oData;
      	  	sap.ui.core.BusyIndicator.hide();
      	  	callback.call(callbackObject,data);
          },
          error: function (oError) {
          	sap.ui.core.BusyIndicator.hide();
          }
	});
};
//Start of fix by KONCHADS on 160616 for Defect # 11915	
//function getAssetTree(carNumber,source,callback, callbackObject){ // fix by KONCHADS on 160616 for Defect # 11915	
function getAssetTree(carNumber,source,callback, callbackObject, multiFlag){
	
if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
	  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	  var IvMultiple = (multiFlag ? "X" : ""); // // fix by KONCHADS on 160616 for Defect # 11915	
//	  mModel.read("/ETS_TECHOBJ?$filter=IvCarid eq '"+carNumber+"' and IvHier eq 'X'&$expand=NAV_HIERARCHY,NAV_CARSET", { // fix by KONCHADS on 160616 for Defect # 11915	
	  mModel.read("/ETS_TECHOBJ?$filter=IvCarid eq '"+carNumber+"' and IvMultiple eq '"+IvMultiple+"' and IvHier eq 'X'&$expand=NAV_HIERARCHY,NAV_CARSET", { // fix by KONCHADS on 160616 for Defect # 11915	
          success: function (oData, response) {
        	  var data={};
        	  data.d = oData;
        	  modal.busyIndicator.close();
        	  callback.call(callbackObject,data);
          },
          error: function (oError) {
        	  modal.busyIndicator.close();
           }
	  });
};
//End of fix by KONCHADS on 160616 for Defect # 11915	
function getLongTextLock(notifNumber, createController, callback, callbackObject){
	
	if(!this.busyIndicator){
		    this.busyIndicator = new sap.m.BusyDialog()
	}
	  var modal = this;
	  modal.busyIndicator.open();
	  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	  mModel.read("/ETY_LONG_TEXT_LOCKSet(IvQmnum='"+notifNumber+"')", {
	      success: function (oData, response) {
	    	  modal.busyIndicator.close();
	    	  createController.getView().data(notifNumber, (oData.EvQmltxt02 == 'X' ? "YES" : "NO"));
	    	  callback.call(callbackObject, oData.EvQmltxt02);
	      },
	      error: function (oError) {
	    	  modal.busyIndicator.close();
	       }
	  });
};
function  getFaultLongText(notifNum){
	if(!this.busyIndicator){
			
			this.busyIndicator = new sap.m.BusyDialog()
		}
	var longText;
	var modal = this
	modal.busyIndicator.open();
	var mModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
	//mModel.read("/ETS_FAULT_DISPLAY(IvNotifNum='"+notifNum+"')", null, null, false,
	mModel.read("/ETY_LONG_TEXTSet(IvQmnum='"+notifNum+"')", null, null, false,
        function (data, response) {//Success
       	 	modal.busyIndicator.close();
       	 	//longText = data.ZznotifTextlng;
       	 	longText = data.EvLongText;

          },
          function (oError) { // Failure
        	  modal.busyIndicator.close();
       	  }	
	);
	 	return longText;
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
url: faultServiceUrl+"/ETS_OPEN_NOTIF?$filter= IvCar eq '"+car+"'and IvCurrentNotif eq'"+notifNum+"'",  
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
        	  //car = car.replace("|"," ");
        		car = car.replace(/\|/g,',');
        	  page.setTitle(data.d.results.length+" open faults found for cars - "+ car); //Change for version 1.4
        	  
        	  //** Eric - Begin add - CR015
        	  // Set the title to our custom header
        	  page.getCustomHeader().getContentMiddle()[0].setText(data.d.results.length+" open faults found for cars - "+ car);  
        	  //** Eric - End add - CR015
        	  
        	  controller.openDialog();       	  
        	}
//** Eric - Begin delete - CR015 
//** We still want to see the popup for closed faults search function even though there is no open faults        	  
//        	  else if(data.d.results.length==0)
//        	  {
//        		  jQuery.sap.require("sap.m.MessageBox");
//        		  //car = car.replace("|"," ");
//        		  car = car.replace(/\|/g,',');
//        		  sap.m.MessageBox.show("No open faults found for cars - "+car,{
//        			  icon: sap.m.MessageBox.Icon.INFORMATION, 
//        			  title: "Fault Information", 
//        			  actions: sap.m.MessageBox.Action.OK, 
//        			  onClose: function() {},
//        			  styleClass: "faultMsgBox"
//        			  }
//        		  );
//        	  }
//** Eric - End delete - CR015        	  
        	  else
        		  {
        		  page.setTitle(data.d.results.length+" open fault found for car "+car);
        		  
        		  //** Eric - Begin add - CR015
            	  // Set the title to our custom header
            	  page.getCustomHeader().getContentMiddle()[0].setText(data.d.results.length+" open fault found for car "+car);  
            	  //** Eric - End add - CR015
            	  
        		  controller.openDialog();
        		  }
        	  
          },
            error: function (jqXHR, status) {
            	modal.busyIndicator.close();
                           
            }
             });
   
    
    /*  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
     	 mModel.oHeaders = {
                  "Content-Type" : "application/json; charset=utf-8",
                  "accept" : "application/json",
                  "dataType" : "json",
                       
     	 };
	 mModel.read("/ETS_OPEN_NOTIF?$filter= IvCar eq '"+car+"'and IvCurrentNotif eq'"+notifNum+"'",{
          success: function (data, response) {
        	  modal.busyIndicator.close();
        	  var oData = data.results;
              oData.sort(function(a, b) {
                  if (a.Zzqmdat === b.Zzqmdat) return 0;
                  return a.Zzqmdat < b.Zzqmdat ? 1 : -1;
              });
              notifTable.getModel().setSizeLimit(data.results.length);
        	  notifTable.getModel().setData(oData);
        	  
        	  if(data.results.length>1)
        	{	  
        	  page.setTitle(data.results.length+" open faults found for car "+car);
        	  controller.openDialog();
        	}
        	  else if(data.results.length==0)
        		  {
        		  jQuery.sap.require("sap.m.MessageBox");
        		  sap.m.MessageBox.show("No open faults found for car "+car,sap.m.MessageBox.Icon.INFORMATION, "Fault Information", sap.m.MessageBox.Action.OK, function() {});
        		  }
        	  else
        		  {
        		  page.setTitle(data.results.length+" open fault found for car "+car);
        		  controller.openDialog();
        		  }
        	  
          },
            error: function (oError) {
            	modal.busyIndicator.close();
                           
            }
	  }); */
     
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
	 var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	 mModel.read("/ETS_FLAG2?$filter=IvCar eq '"+searchString+"'&$expand=NAV_CAR",{
         success: function (oData, response) {
        	 var data={};
        	 data.d = oData;
        	 modal.busyIndicator.close();
        	 callback.call(callbackObject,data);
       	 },
          error: function (oError) {
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
    
	 var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	 mModel.read("/ETS_FLAG2?$filter=IvSet eq '"+searchString+"'&$expand=NAV_SET",{
         success: function (oData, response) {
        	 var data={};
        	 data.d = oData;
        	 modal.busyIndicator.close();
        	 callback.call(callbackObject,data);
       	  },
           error: function (oError) {
           	 modal.busyIndicator.close();
           }		 
	 });
};
// To get Priority List
function  getPrioList(mode){
       
       var oModel= new sap.ui.model.json.JSONModel();
       sap.ui.core.BusyIndicator.show();
       var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
       mModel.read("/ETS_PRIORITY?$filter=IvNotifTyp eq 'F2' and IvMode eq '"+mode+"'", null, null, false,
    		 function (data, response) {
               oModel.setData({listitems: data.results});
               sap.ui.core.BusyIndicator.hide();
             },
             function (oError) {
          	   sap.ui.core.BusyIndicator.hide();
             }
       );
       return oModel;
};
// To get Sector List
function  getSectorList(){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG2?$filter=IvSectorcode eq 'X'&$expand=NAV_SECTORCODE", null, null, false,
    	function (data, response) {
            oModel.setData({listitems: data.results[0].NAV_SECTORCODE.results});
            sap.ui.core.BusyIndicator.hide();
          },
          function (oError) {
       	   sap.ui.core.BusyIndicator.hide();
          }    	
    );
    return oModel;
};
// To get Object Part Groups
/*
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
};*/
//To get Symptom Groups
function  getSymptomList(asset, car, callback, callbackObject){
if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
	  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	  mModel.read("/ETS_SYMP_OBJ_CG?$filter=IvAsset eq '"+asset+"' and IvCatalog eq 'S' and IvCarid eq '"+car+"'",{
          success: function (oData, response) {
        	  var data={};
        	  data.d = oData;
        	  modal.busyIndicator.close();
        	  callback.call(callbackObject,data);
            },
            error: function (oError) {
            	 modal.busyIndicator.close();
//            	 Added for defect 11697 by PATTEDT
            	 var data = {};
            	 data.d = {};
            	 data.d.results = {};
           	  callback.call(callbackObject,data);
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
	  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	  mModel.read("/ETS_SYM_OBJ_CODES?$filter=IvCatalog eq 'S' and IvCodeGrp eq '"+code+"'",{
		  success: function (oData, response) {
        	  var data={};
        	  data.d = oData;			  
        	  modal.busyIndicator.close();
        	  callback.call(callbackObject,data);
       	  },
          error: function (oError) {
         	 modal.busyIndicator.close();
          }
	  });
};
//To get Object Part Code for a selected Group
function getObjectPartDamageList(code)
{
	var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_SYM_OBJ_CODES?$filter=IvCatalog eq 'B' and IvCodeGrp eq'"+code+"'",null, null, false,           
    		function (data, response) {
    			oModel.setData({listitems: data.results});
    			sap.ui.core.BusyIndicator.hide();
    		},
    		function (oError) {
    			sap.ui.core.BusyIndicator.hide();
    		}
    );
    return oModel;
};
//To get the notification Type list
function  getNotificationTypeList(){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_NOTIF_TYP?$filter=IvNotif eq 'X'", null, null, false,
    		function (data, response) {
                oModel.setData({listitems: data.results});
                sap.ui.core.BusyIndicator.hide();
            },
            function (oError) {
              	sap.ui.core.BusyIndicator.hide();
            }
    );
    return oModel;
};
//To get trip number
function  getTripDetails(trip,set,dateNow,time,callback, callbackObject){
	
	if (!this.busyIndicatorTrip) {

		this.busyIndicatorTrip = new sap.m.BusyDialog()
	}

	var modal = this;
	modal.busyIndicatorTrip.open();
	/*var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	mModel.read("/ETS_TRIP_SET(IvSetid='"+set+"',IvTripid='"+trip+"',IvFdate=datetime'"+dateNow+"',IvFtime=time'"+time+"')", {
        success: function (oData, response) {
        	 modal.busyIndicatorTrip.close();
        	  var data={};
        	  data.d = oData;	
        	  callback.call(callbackObject,data);
        	 
            },
            error: function (oError) {
            	 modal.busyIndicatorTrip.close();
            }
	});
	*/
	var adata= jQuery.ajax({
        async:true,
   type: "GET",
url: faultServiceUrl+"/ETS_TRIP_SET(IvSetid='"+set+"',IvTripid='"+trip+"',IvFdate=datetime'"+dateNow+"',IvFtime=time'"+time+"')",  
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
//BEGIN OF INSERT AK20MAY2016+

//To get trip number
function  getTripSetDetails(trip,set,dateNow,time,callback, callbackObject){
	
	if (!this.busyIndicatorTrip) {

		this.busyIndicatorTrip = new sap.m.BusyDialog()
	}

	var modal = this;
	modal.busyIndicatorTrip.open();	
	
	var queryString = "/ETS_TRIP_SET?$filter=IvSetid eq '"+set+"' and IvTripid eq '"+trip+"' and IvFdate eq datetime'"+dateNow+"' and IvFtime eq time'"+time+"'&$format=json";
	// var queryString = "/ETS_TRIP_SET?$filter=IvSetid eq ' ' and IvTripid eq '36-A' and IvFdate eq datetime'2015-07-28T00:00:00' and IvFtime eq time'PT04H08M00S'&$format=json";
	var oServiceModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true); 
	oServiceModel.read(queryString,{			
			success: function(odata,response){
				var data = {};
				data.d = odata;
				callback.call(callbackObject,data);
		     	  modal.busyIndicatorTrip.close();
			
			},
	         error: function (oError) {
	        	 modal.busyIndicatorTrip.close();
	         	            
	         }
	 });
};
//END OF INSERT AK20MAY2016+
//To get position list
function  getPositionList(callback, callbackObject, equnr){
	
	if (!this.busyIndicator) {

		this.busyIndicator = new sap.m.BusyDialog()
	}

	var modal = this;
	modal.busyIndicator.open();
	var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	mModel.read("/ETS_POSITION?$filter=Zzdesc eq '"+equnr+"'",{
		success: function (oData, response) {
			var data={};
			data.d = oData;
        	modal.busyIndicator.close();
        	callback.call(callbackObject,data);
            },
            error: function (oError) {
            	 modal.busyIndicator.close();
            }
	});
};
// To get engineering flag
function  getEngFlagList(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG2?$filter=IvEngg eq 'X'&$expand=NAV_ENGG", null, null, false,
            function (respData, response) {
				var data={};
				data.d = respData;
    			var oModel= new sap.ui.model.json.JSONModel();
                oModel.setData({items: data.d.results});
                var data=oModel.getData().items[0];
                var oData = data.NAV_ENGG.results;
                eModel.setData({listitems: oData});
                sap.ui.core.BusyIndicator.hide();
              },
              function (oError) {
              	sap.ui.core.BusyIndicator.hide();
              }    		
    );
    return eModel;
};
// To get Audit type list
function  getAuditTypeList(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG?$filter=IvAudittype eq 'X'&$expand=NAV_AUDITTYPE", null, null, false,
            function (data, response) {
                var oModel= new sap.ui.model.json.JSONModel();
                oModel.setData({items: data.results});
                var data=oModel.getData().items[0];
                var oData = data.NAV_AUDITTYPE.results;
                eModel.setData({listitems: oData});
                sap.ui.core.BusyIndicator.hide();
              },
              function (oError) {
              	sap.ui.core.BusyIndicator.hide();
              }    		
    );
    return eModel;
};
// To get fault response
function  getFaultResponse(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG2?$filter=IvStatusprofile eq 'TNOTI0F1'&$expand=NAV_FAULTRESPONSE", null, null, false,
            function (data, response) {
                var oModel= new sap.ui.model.json.JSONModel();
                oModel.setData({items: data.results});
                var data=oModel.getData().items[0];
                var oData = data.NAV_FAULTRESPONSE.results;
                eModel.setData({listitems: oData});
                sap.ui.core.BusyIndicator.hide();
              },
              function (oError) {
              	sap.ui.core.BusyIndicator.hide();
              }    		
    );
    return eModel;
};
//To get temperature list
function  getTempList(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG2?$filter=IvTemp eq 'X'&$expand=NAV_TEMP", null, null, false,
            function (data, response) {
    			var oModel= new sap.ui.model.json.JSONModel();
                oModel.setData({items: data.results});
                var data=oModel.getData().items[0];
                var oData = data.NAV_TEMP.results;
                eModel.setData({listitems: oData});
                sap.ui.core.BusyIndicator.hide();
              },
              function (oError) {
              	sap.ui.core.BusyIndicator.hide();
              }    		
    );
    return eModel;
};
//To get Weather List
function  getWeatherList(){
    
    var eModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG2?$filter=IvWeather eq 'X'&$expand=NAV_WEATHER", null, null, false, 
    		function (data, response) {
    			var oModel= new sap.ui.model.json.JSONModel();
                oModel.setData({items: data.results});
                var data=oModel.getData().items[0];
                var oData = data.NAV_WEATHER.results;
                eModel.setData({listitems: oData});
                sap.ui.core.BusyIndicator.hide();
              },
              function (oError) {
              	sap.ui.core.BusyIndicator.hide();
              }
    );
    return eModel;
};
//To get Fault Source
function  getFaultSources(list){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG?$filter=IvFaultsrc eq 'X'&$expand=NAV_FAULTSRC", null, null, false,
            function (data, response) {
    			var oModel= new sap.ui.model.json.JSONModel();
//Start of fix by KONCHADS for defect #  
    			var revisedList = [];
    			for(var i=0;i< data.results[0].NAV_FAULTSRC.results.length;i++){
    				if(data.results[0].NAV_FAULTSRC.results[i].ZzfaultSrc !== "IIMS"){
    					revisedList.push(data.results[0].NAV_FAULTSRC.results[i]);
    				}
    			}
    			oModel.setData({listitems : revisedList});
//                oModel.setData({listitems : data.results[0].NAV_FAULTSRC.results});
//End of fix by KONCHADS for defect #                   
                list.setModel(oModel);
                var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
                oDataTemplate.bindProperty("value", "ZzfaultSrc"); //binding the code for Fault source
                var listDesc =  new sap.m.StandardListItem({
                    title : "{Zzdesc}", }); // description visible on pop over
                listDesc.addCustomData(oDataTemplate);
                list.bindItems("/listitems",listDesc);
                sap.ui.core.BusyIndicator.hide();
              },
              function (oError) {
              	sap.ui.core.BusyIndicator.hide();
              }    		
    );
};
// To get report phase list
function  getReportPhase(list){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG?$filter=IvReportphase eq 'X'&$expand=NAV_REPORTPHASE", null, null, false,
            function (data, response) {
          	 	var oModel= new sap.ui.model.json.JSONModel();
                oModel.setData({listitems : data.results[0].NAV_REPORTPHASE.results});
                list.setModel(oModel);
                var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
                oDataTemplate.bindProperty("value", "Zzrphase"); //binding the code for report phase
                var listDesc =  new sap.m.StandardListItem({
                    title : "{Zzdesc}", }); //description field
                listDesc.addCustomData(oDataTemplate);
                list.bindItems("/listitems",listDesc);
                sap.ui.core.BusyIndicator.hide();
              },
              function (oError) {
              	sap.ui.core.BusyIndicator.hide();
              }    		
    );
};
/*function  getTechnician_table(notifNum,depot,workcen,callback, callbackObject){
    
    if (!this.busyIndicator) {
		
		this.busyIndicator = new sap.m.BusyDialog()
	}
	var modal = this;

	modal.busyIndicator.open();
	var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
	mModel.read("/ETS_FLAG2?$filter=IvTechnician eq 'X' and IvNotif eq '"+notifNum+"'&$expand=NAV_TECHNICIAN", {
        success: function (oData, response) {
        	var data={};
			data.d = oData;
        	modal.busyIndicator.close();
        	callback.call(callbackObject,data);
        },
        error: function (oError) {
        	modal.busyIndicator.close();
        }  		
	});
    
  };*/
function  getLocation_table(callback, callbackObject, set){
    
    if (!this.busyIndicator) {
		
		this.busyIndicator = new sap.m.BusyDialog()
	}
	var modal = this;

	modal.busyIndicator.open();
	//Begin of Insert for Defect 14867 KADAMA20160926
	if(set == ""){
	//End of Insert for Defect 14867 KADAMA20160926
		var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
		mModel.read("/ETS_FLAG?$filter=IvLocation eq 'X'&$expand=NAV_LOCATION", {
	        success: function (oData, response) {
	        	var data={};
				data.d = oData;
	        	modal.busyIndicator.close();
	        	callback.call(callbackObject,data);
	            },
	            error: function (oError) {
	            	 modal.busyIndicator.close();
	            }     
		});
	//Begin of Insert for Defect 14867 KADAMA20160926
	}
	else{
		var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
		mModel.read("/ETS_FLAG?$filter=IvLocation eq 'X' and Zzsetid eq '" +set+"'&$expand=NAV_LOCATION", {
	        success: function (oData, response) {
	        	var data={};
				data.d = oData;
	        	modal.busyIndicator.close();
	        	callback.call(callbackObject,data);
	            },
	            error: function (oError) {
	            	 modal.busyIndicator.close();
	            }     
		});
	}
	//End of Insert for Defect 14867 KADAMA20160926
};
// To get location list
function  getLocation(list){
    
    var oModel= new sap.ui.model.json.JSONModel();
    sap.ui.core.BusyIndicator.show();
    var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
    mModel.read("/ETS_FLAG?$filter=IvLocation eq 'X'&$expand=NAV_LOCATION", null, null, false,
            function (data, response) {
    			var oModel= new sap.ui.model.json.JSONModel();
                oModel.setData({listitems : data.results[0].NAV_LOCATION.results});
                list.setModel(oModel);
                var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
                oDataTemplate.bindProperty("value", "Zzfloca");
                var listDesc =  new sap.m.StandardListItem({
                    title : "{Zzdesc}", });
                listDesc.addCustomData(oDataTemplate);
                list.bindItems("/listitems",listDesc);
                sap.ui.core.BusyIndicator.hide();
              },
              function (oError) {
              	sap.ui.core.BusyIndicator.hide();
              }    		
    );
};
//To get intial set of user detail values
/*
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

*/
///Post call for Create to the backend
function createNotification(postData,controller,check,flag,checkCarCount){

if(!this.busyIndicator){
	
	this.busyIndicator = new sap.m.BusyDialog()
}

var modal = this;
var oModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
modal.busyIndicator.open();
oModel.refreshSecurityToken(
function(a, b) {
	
//	var length =  postData.length;
//    for ( var i = 0;i < length; i++)
//   	 {
	
oModel.oHeaders = {
             "x-csrf-token" : b.headers["x-csrf-token"],
              "Content-Type" : "application/json; charset=utf-8"
              
                   
};
//var formattedData = {"d":postData[i]};
//Changes as per Version 1.2, multiple car data is posted in 1 payload instaed of in loop
var length = controller.getView().carInput.getTokens().length;

oModel.create('/ETS_FAULT_CREATE_UPD',postData,{
      success : function(data, response){
   	   	  modal.busyIndicator.close();
   	   	  controller.setUserLastEntry();  //++ CR015 SIMS20180815 (SY)
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
          sap.m.MessageBox.show("Fault Creation failed !..",{
        	  icon: sap.m.MessageBox.Icon.ERROR,
        	  title: "Fault Information", 
        	  actions: sap.m.MessageBox.Action.OK, 
        	  onClose: function(){},
        	  styleClass: "faultMsgBox"
          });
          controller.getView().saveUpdate.setEnabled(true);
      }
});
//}
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
    var oModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
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
                     sap.m.MessageBox.show("Marked as Duplicate failed !..",{
                    	 icon: sap.m.MessageBox.Icon.ERROR,
                    	 title: "Fault Information", 
                    	 actions: sap.m.MessageBox.Action.OK, 
                    	 onClose: function(){},
                    	 styleClass: "faultMsgBox"
                    });
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
	var mModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
	sap.ui.core.BusyIndicator.show();
	mModel.read("/ETS_NOTIFRULE?$filter=Zzuser eq 'SHAHK'", {
        success: function (data, response) {
      	  modal.busyIndicator.close();
      	  sap.ui.core.BusyIndicator.hide(); 

    		var view = source.getView();
    		var rules = data.results;
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
          error: function (oError) {
          	modal.busyIndicator.close();
          	sap.ui.core.BusyIndicator.hide();
                         
          }
		
	});
};

function setInitialValidationRulesEnh(source, notifNum, callbackObject){
	if (!this.busyIndicator) {
			
			this.busyIndicator = new sap.m.BusyDialog()
		}
		var modal = this;

		modal.busyIndicator.open();
		
		var eModel= new sap.ui.model.json.JSONModel();
		var mModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
		sap.ui.core.BusyIndicator.show();
		mModel.read("/ETS_NOTIFRULE?$filter=Zzuser eq 'SHAHK'", {
	        success: function (data, response) {
	      	  modal.busyIndicator.close();
	      	  sap.ui.core.BusyIndicator.hide(); 

	    		var view = source.getView();
	    		var rules = data.results;
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
	    		if(notifNum)
	    			getFaultDetails(notifNum,callbackObject.faultDetails,callbackObject);
	    		
	          },
	          error: function (oError) {
	          	modal.busyIndicator.close();
	          	sap.ui.core.BusyIndicator.hide();
	          	if(notifNum)
	          		getFaultDetails(notifNum,callbackObject.faultDetails,callbackObject);
	                         
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
	  var mModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
	  mModel.read("/ETS_TECHOBJ?$filter=IvSetid eq '"+setNum+"'&$expand=NAV_HIERARCHY,NAV_CARSET", {
          success: function (oData, response) {
        	  var data={};
        	  data.d = oData;
        	  modal.busyIndicator.close();
        	  callback.call(callbackObject,data);
            },
            error: function (oError) {
            	 modal.busyIndicator.close();
            }
	  });
};
//To get the attachment list
function  getDocList(notifNum,callback, callbackObject){
	if(!this.busyIndicator){
			
			this.busyIndicator = new sap.m.BusyDialog()
		}

	var modal = this;
	var attachURL = "/sap/opu/odata/sap/ZGWP_PM_XECM_ATTACHMENTS_SRV";
	modal.busyIndicator.open();
	var mModel =  new sap.ui.model.odata.ODataModel(attachURL, true) ;
	mModel.read("/ETS_ATTACHMENT?$filter=Qmnum eq'"+notifNum+"'" ,{
        success: function (oData, response) {
        	var data={};
        	data.d = oData;
       	 	modal.busyIndicator.close();
       	 	callback.call(callbackObject,data);
          },
          error: function (oError) {
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
		var attachURL = "/sap/opu/odata/sap/ZGWP_PM_XECM_ATTACHMENTS_SRV";
		var mModel =  new sap.ui.model.odata.ODataModel(attachURL, true) ;
		mModel.read("/ETS_ATTACHMENT?$filter=Qmnum eq'"+notifNum+"'", {
            success: function (oData, response) {
            	var data={};
            	data.d = oData;
           	 	modal.busyIndicator.close();
           	 	callback.call(callbackObject,data);
              },
              error: function (oError) {
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
		var attachURL = "/sap/opu/odata/sap/ZGWP_PM_XECM_ATTACHMENTS_SRV";
		var mModel =  new sap.ui.model.odata.ODataModel(attachURL, true) ;
		mModel.read("/ETS_DEL_ATTACH(IV_DEL_FLAG='X',IV_ARC_DOC_ID='"+docValue+"',IV_OBJECT_ID='"+notifNum+"')",{
            success: function (oData, response) {
            	var data={};
            	data.d = oData;            	
           	 	modal.busyIndicator.close();
           	 	callback.call(callbackObject,data);
              },
              error: function (oError) {
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
	/*var mModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
	mModel.read("/ETS_FAULT_DISPLAY?$filter=IvNotifNum eq '"+notifNum+"'&$expand=NAV_FAULT_DISPLAY_ITEMS",{
		success : function(oData, response) {
        	var data={};
        	data.d = oData.results[0]; 
			modal.busyIndicator.close();
			callback.call(callbackObject, data);
		},
		error : function(oError) {
			modal.busyIndicator.close();
		}
	});*/
	var adata = jQuery.ajax({
 	type : "GET",
//		url : faultServiceUrl + "/ETS_FAULT_DISPLAY(IvNotifNum='"+notifNum+"')",
		url: faultServiceUrl + "/ETS_FAULT_DISPLAY?$filter=IvNotifNum eq '"+notifNum+"'&$expand=NAV_FAULT_DISPLAY_ITEMS",
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(data, status, jqXHR) {
			modal.busyIndicator.close();
			var odata = {};
			odata.d = data.d.results[0];
			callback.call(callbackObject, odata);

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
	     var oModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
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
		                    	  sap.m.MessageBox.show("No results found with the search criteria",
		                    		   {
		                    		  		icon: sap.m.MessageBox.Icon.INFORMATION , 
		                    		  		title: "Fault Search Information", 
		                    		  		actions: sap.m.MessageBox.Action.OK, 
		                    		  		onClose: function() { },
		                    		  		styleClass: "faultMsgBox"
		                    		  	}
		                    	  );  
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
	                      sap.m.MessageBox.show("Search failed !..",{icon: sap.m.MessageBox.Icon.ERROR,
	                    	  title: "Search Information", 
	                    	  actions: sap.m.MessageBox.Action.OK, 
	                    	  onClose: function(){},
	                    	  styleClass: "faultMsgBox"
	                      });
	               }
	        });
	        }, function(a) {
	               successFaultCallBack.apply(context,[a, true]);
	}, true);
	     
	return rModel;
	     
};

// Get last updated / created notification details by User Id
function getLastFaultDetails(callback, callbackObject) {
	if (!this.busyIndicator) {

		this.busyIndicator = new sap.m.BusyDialog();
	}

	var modal = this
	modal.busyIndicator.open();
	var mModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
	mModel.read("/ETS_LAST_CHANGE_NOTIF('')",{
		success : function(data, response) {
			modal.busyIndicator.close();
			callback.call(callbackObject, data);
		},
		error : function(oError) {
			modal.busyIndicator.close();
		}
	});
	
	
	//Defect #21608 Get Icon User or Not?
/*	mModel.read("/ETS_ICON_USER(IvUser='')",{
		success : function(data, response) {
			var oModel = new sap.ui.model.json.JSONModel(data);
			callbackObject.getView().setModel(oModel,"userParameters");
		}
	});*/
	//Defect #21608
	
};	

//helper function to clone a given object instance
function copyObject(obj) {
    var newObj = {};
    for (var key in obj) {
        //copy all the fields
        newObj[key] = obj[key];
    }

    return newObj;
};

//Changes for version 1.2

//To get Depot list 
function getDepotList(callback,callbackObject){

if(!this.busyIndicator){
	    
	    this.busyIndicator = new sap.m.BusyDialog()
	  }

	  var modal = this;
	  modal.busyIndicator.open();
  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
  mModel.read("/ETS_PLANT_WORKCENTER", { 
		  success: function (oData, response) {
      	  var data={};
      	  data.d = oData;			  
      	  modal.busyIndicator.close();
      	  callback.call(callbackObject,data);
     	  },
        error: function (oError) {
       	 modal.busyIndicator.close();
        }
  });	
}

//Get maintainers
function  getTechnician_table(depot,workcen,callback, callbackObject){

if (!this.busyIndicator) {
	
	this.busyIndicator = new sap.m.BusyDialog()
}
var modal = this;

modal.busyIndicator.open();
var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
mModel.read("/ETS_TECHNICIAN?$filter=(Arbpl eq'" + workcen + "'and Werks eq '" + depot +"')", {
  success: function (oData, response) {
  	var data={};
		data.d = oData;
  	modal.busyIndicator.close();
  	callback.call(callbackObject,data);
  },
  error: function (oError) {
  	modal.busyIndicator.close();
  }  		
});

};

//Get object part group
function  getTechDetailGrp(asset,car,catalog,callback, callbackObject){
	if(!this.busyIndicator){
		    
		    this.busyIndicator = new sap.m.BusyDialog()
		  }

		  var modal = this;
		  modal.busyIndicator.open();
		  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
		  mModel.read("/ETS_SYMP_OBJ_CG?$filter=IvAsset eq '"+asset+"' and IvCatalog eq '"+catalog+"' and IvCarid eq '"+car+"'",{
	          success: function (oData, response) {
	        	  var data={};
	        	  data.d = oData;
	        	  modal.busyIndicator.close();
	        	  callback.call(callbackObject,data);
	            },
	            error: function (oError) {
	            	 modal.busyIndicator.close();
	            }
		  });
	};
	//To get object part Code for a selected Group
	function getTechDetailCode(code,catalog,callback, callbackObject)
	{
	if(!this.busyIndicator){
		    
		    this.busyIndicator = new sap.m.BusyDialog();
		  }

		  var modal = this;
		  modal.busyIndicator.open();
		  var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
		  mModel.read("/ETS_SYM_OBJ_CODES?$filter=IvCatalog eq '"+catalog+"' and IvCodeGrp eq '"+code+"'",{
			  success: function (oData, response) {
	        	  var data={};
	        	  data.d = oData;			  
	        	  modal.busyIndicator.close();
	        	  callback.call(callbackObject,data);
	       	  },
	          error: function (oError) {
	         	 modal.busyIndicator.close();
	          }
		  });
	};
	//To get Constant and Parameter Values
	function getConstantParamValues(fieldId, moduleId, wricefId, counter,callback, callbackObject)
	{
		var comoonUtilityService = "/sap/opu/odata/sap/ZGWP_PM_COMMON_UTILITY_SRV";
		if(!this.busyIndicator){
			    this.busyIndicator = new sap.m.BusyDialog();
        }
		  var modal = this;
		  modal.busyIndicator.open();
		  var mModel = new sap.ui.model.odata.ODataModel(comoonUtilityService, true);
		  mModel.read("/ETS_GET_CONSTANT_PARAMS?$filter=IvField eq '"+fieldId+"' and IvModule eq '"+moduleId+"' and IvWricef eq '"+wricefId+"'&$expand=NAV_TO_PARAMETERS,NAV_TO_CONSTANTS", null, null, false,
			  function (oData, response) {			  
	        	  modal.busyIndicator.close();
	        	  callback.call(callbackObject,oData);
	       	  },
	          function (oError) {
	         	 modal.busyIndicator.close();
	          }
		  );
	};	
	
	//Get the user is an Icon User or Not
	function getIconUsers(callbackObject){
		
		var modal = this
		var mModel =  new sap.ui.model.odata.ODataModel(faultServiceUrl, true) ;
		//Defect #21608 Get Icon User or Not?
		mModel.read("/ETS_ICON_USER(IvUser='')",{
			success : function(data, response) {
				var oModel = new sap.ui.model.json.JSONModel(data);
				callbackObject.getView().setModel(oModel,"userParameters");
			}
		});
	};

//End of changes

//** Eric - Begin add - CR015
	function getClosedFaultInterval(oController) {
		var iIntervalDays;
		var oModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
		oModel.read("/ETS_CLOSEDFAULT_INTERVAL", {
		  success: function(data, response) {
			  iIntervalDays = data.results[0].Interval;
			  
			  var oTodayDate = new Date();
			  var oFromDate = new Date();
			  oFromDate.setDate(oFromDate.getDate() - iIntervalDays); 
			  var oData = {
					  FromDate: oFromDate,
					  ToDate: oTodayDate
			  };
			  var oClosedFaultSearchModel = new sap.ui.model.json.JSONModel(oData);
			  oController.getView().dialogNotification.setModel(oClosedFaultSearchModel, "ClosedFaultSearchModel");
		  },
		  error: function(oError) {
			  // Unable to read parameter or not maintained, set to today only
			  var oData = {
					  FromDate: new Date(),
					  ToDate: new Date()
			  };
			  var oClosedFaultSearchModel = new sap.ui.model.json.JSONModel(oData);
			  oController.getView().dialogNotification.setModel(oClosedFaultSearchModel, "ClosedFaultSearchModel");	
		  }
	  });   	
	};
	
	function getClosedFaultModel(oController, oClosedFaultDateFrom, oClosedFaultDateTo, sCarid, sNotifNum, fCallback) {
		var oClosedFaultModel = oController.closedFaultModel;
		if(!oClosedFaultModel){
			oClosedFaultModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
		}
		
		if(!this.busyIndicator){
			this.busyIndicator = new sap.m.BusyDialog() 
		}
		var oModal = this
		oModal.busyIndicator.open();
		
		var aFilters = [
			new sap.ui.model.Filter({
				path: "IvCar",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: sCarid
			}),
			new sap.ui.model.Filter({ 
				path: "Zzqmdat",
				operator: sap.ui.model.FilterOperator.GE,
				value1: oClosedFaultDateFrom.toISOString().replace(/\.[0-9Z]{3,4}/, '')		// Take the ISO string but strip away the millisecond part
			}),
			new sap.ui.model.Filter({
				path: "Zzqmdat",
				operator: sap.ui.model.FilterOperator.LE,
				value1: oClosedFaultDateTo.toISOString().replace(/\.[0-9Z]{3,4}/, '')		// Take the ISO string but strip away the millisecond part
			})
		];
		oClosedFaultModel.read("/ETS_CLOSED_NOTIF", {
			filters: aFilters,
			success: function(oData, response) {
				fCallback.call(oController, oData);
				oModal.busyIndicator.close();
			},
			error: function(oError) {
				oModal.busyIndicator.close();
			}
		});
	};
	
	function getFilterModel() {
		var oFilterModel = new sap.ui.model.json.JSONModel;
		var oData = {
				"Zzqmnum": "",
				 "ZztripNum": "",
				 "ZzincdailyNum": "",
				 "ZzsetNum": "",
				 "Zzcarid": "",
				 "Zzeqktx": "",
				 "Zzposition": "",
				 "Zzktxtcd": "",
				 "Zzpriok": "",
				 "ZzprimeFauktNum": "",
				 "Zzaufnr": ""
		};
		oFilterModel.setData(oData);
		return oFilterModel;
	};
	
	function getSortableColumns() {
		/* Use these fields to build the sort dialog 
		 * Maintain the actualy table field name here */
		 return [
			 "Zzqmnum",
			 "Zzqmdat",
			 "Zzmzeit",
			 "ZztripNum",
			 "ZzincdailyNum",
			 "ZzincidentDate",
			 "ZzincidentTime",
			 "ZzsetNum",
			 "Zzcarid",
			 "Zzeqktx",
			 "Zzposition",
			 "ZzpositionDesc",
			 "Zzktxtcd",
			 "Zzktxtgr",
			 "Zzpriok",
			 "ZzpriorityDesc",
			 "ZzprimeFauktNum",
			 "Zzaufnr"
		 ];
	 };
	 
	 function geti18nModel(){
		 if(!this.i18nModel){
			 var sRootPath = jQuery.sap.getResourcePath("fault_mgmt");
			 
			 this.i18nModel = new sap.ui.model.resource.ResourceModel({
			        bundleUrl : sRootPath+"/i18n/i18n.properties"
			  });
		 }
		 
		 return this.i18nModel;
	 };
	 
	 function getSortModel() {
//	     var oSortModel = this.oSortModel
//	     if (oSortModel) {
//	    	 oSortModel.refresh();
//	     } else {
//	         //Model for Popover fragment for sort items
//	    	 oSortModel = new sap.ui.model.json.JSONModel();
//	     };
	     
		 var oSortModel = new sap.ui.model.json.JSONModel();
	     var aData = {};
	     aData.items = [];

	     var aSortableColumns = this.getSortableColumns();
	     
	     var i18nModel = this.geti18nModel();
	     var oResourceBundle = i18nModel.getResourceBundle();
	     for (var i = 0; i < aSortableColumns.length; i++) {
	    	 var oVal = {};
	    	 
	    	 oVal.key = aSortableColumns[i];
	    	 oVal.text = oResourceBundle.getText(aSortableColumns[i]);
	    	 
	    	 aData.items.push(oVal);
		}
	     
	     oSortModel.setData(aData);
	     return oSortModel;
	 };
//** Eric - End add - CR015
	
//BEGIN INSERT CR015 SIMS20180815 (SY)
	function readUserLastEntry(callback, callbackObject) {
		if(!this.busyIndicator) {
			this.busyIndicator = new sap.m.BusyDialog()
		}
		
		var modal = this;
		modal.busyIndicator.open();
		
		var mModel = new sap.ui.model.odata.ODataModel(commonUtilUrl, true);
		mModel.read("/ETS_USER_LAST_ENTRY(ApplicationID='ZFAULT_MGMTV2',RicefID='ENH-8230',IsMobile=false)/NAV_TO_LENTRY", {
			success : function(oData, response) {
				var data = {};
				data.d = oData;
				modal.busyIndicator.close();
				callback.call(callbackObject,data);
			},
			error : function(oError) {
				modal.busyIndicator.close();
			}
		})
	};
	
	function getLocAndRptPhaseList(callback, callbackObject) {
		if(!this.busyIndicator) {
			this.busyIndicator = new sap.m.BusyDialog()
		}
		
		var modal = this;
		modal.busyIndicator.open();
		
		var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
		mModel.read("ETS_FLAG?$filter=IvLocation eq 'X' and IvReportphase eq 'X'&$expand=NAV_LOCATION,NAV_REPORTPHASE", {
			success : function(oData, response) {
				var data = {};
				data.d = oData;
				modal.busyIndicator.close();
				callback.call(callbackObject,data);
			},
			error : function(oError) {
				modal.busyIndicator.close();
			}
		})
		
	};
	
	function saveUserLastEntry(data, controller) {
		if(!this.busyIndicator) {
			this.busyIndicator = new sap.m.BusyDialog()
		}

		var modal = this;
		modal.busyIndicator.open();
		
		var mModel = new sap.ui.model.odata.ODataModel(commonUtilUrl, true);		
		mModel.refreshSecurityToken(function(a, b) {
			mModel.oHeaders = {
				"x-csrf-token" : b.headers["x-csrf-token"],
				"Content-Type" : "application/json; charset=utf-8"
			};
			mModel.create('/ETS_USER_LAST_ENTRY', data, {
				success : function(data, response) {
					modal.busyIndicator.close();
				},
				error : function(error) {
					modal.busyIndicator.close();
				}
			});
		}, function(a) {
			successFaultCallBack.apply(context, [ a, true ]);
		}, true);		
	};
	
// To get the Car and set Number
	function  getCarAndSetList(sSetNum, sCarNum, callback, callbackObject){
		if(!this.busyIndicator){		    
		    this.busyIndicator = new sap.m.BusyDialog()
		}

	    var modal = this;
	    modal.busyIndicator.open();
	    
	    if(sSetNum === ""){
	    	sSetNum = "*"
	    }
	    
	    if(sCarNum === ""){
	    	sCarNum = "*"
	    }
	    
		 var mModel = new sap.ui.model.odata.ODataModel(faultServiceUrl, true);
		 mModel.read("/ETS_FLAG2?$filter=IvSet eq '"+sSetNum+"' and IvCar eq '"+sCarNum+"' &$expand=NAV_SET,NAV_CAR",{
	         success: function (oData, response) {
	        	 var data={};
	        	 data.d = oData;
	        	 modal.busyIndicator.close();
	        	 callback.call(callbackObject,data);       	 
	       	  },
	           error: function (oError) {
	           	 modal.busyIndicator.close();
	           }		 
		 });
	};	
//END INSERT CR015 SIMS20180815 (SY)	