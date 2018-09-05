sap.ui.jsview("fault_mgmt.createNotification", {

 /** Specifies the Controller belonging to this View. 
  * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
  * @memberOf fault_mgmt.createNotification
  */ 
 getControllerName : function() {
  return "fault_mgmt.createNotification";
 },

 /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
  * Since the Controller is given to this method, its event handlers can be attached right away. 
  * @memberOf fault_mgmt.createNotification
  */ 
 createContent : function(oController) {
  //Dialog code //
  var oColNotification = new sap.m.Column({header: new sap.m.Text({text:"Fault No. \n Date/Time"}).addStyleClass("Title") });
  var oColPosition = new sap.m.Column({header: new sap.m.Text({text:"Position"}).addStyleClass("Title") });
  var oColDateTime = new sap.m.Column({header: new sap.m.Text({text:"Daily Incident No. \n Date/Time"}).addStyleClass("Title") });
//  var oColCarNum = new sap.m.Column({header: new sap.m.Text({text:"Car No."}).addStyleClass("Title") });
  var oColAsset = new sap.m.Column({header: new sap.m.Text({text:"Asset"}).addStyleClass("Title") });
  var oColSymptom = new sap.m.Column({header: new sap.m.Text({text:"Symptom"}).addStyleClass("Title") });
  var oColPriority = new sap.m.Column({header: new sap.m.Text({text:"Priority"}).addStyleClass("Title") });
  var oColSetno = new sap.m.Column({header: new sap.m.Text({text:"Set No.\n Car No."}).addStyleClass("Title") });
  var oColTripno = new sap.m.Column({header: new sap.m.Text({text:"Trip No."}).addStyleClass("Title") });
  var oColLinked = new sap.m.Column({header: new sap.m.Text({text:"Work Order No."}).addStyleClass("Title") });
  var oColPrime = new sap.m.Column({header: new sap.m.Text({text:"Primary Fault No."}).addStyleClass("Title") }); // Changes as per Version 1.2 
  // Defect #10865 - NARASIMB - 20052016 - Renamed the lable from Linked Fault No to Primary Fault No
  var oTable = new sap.m.Table("oOpenNotification",{
   mode : sap.m.ListMode.SingleSelectLeft,
   includeItemInSelection : true,

  }).addStyleClass("dialogTable");
  oTable.attachSelectionChange(function(oEvent) {
   oController.onItemPress(oEvent);
  });
  oTable.addColumn(oColNotification).addColumn(oColTripno).addColumn(oColDateTime).addColumn(oColSetno).addColumn(oColAsset).addColumn(oColPosition).addColumn(oColSymptom).addColumn(oColPriority).addColumn(oColPrime).addColumn(oColLinked);
  //oTable.addColumn(oColNotification).addColumn(oColTripno).addColumn(oColSetno).addColumn(oColAsset).addColumn(oColPosition).addColumn(oColSymptom).addColumn(oColPriority).addColumn(oColLinked);


  var oIncident = new sap.m.Text({text: {
   //parts : [{path :"ZzincidentDate"}, {path : "ZzincidentTime"}, {path :"ZziimsNo"}],
   //Changed ZziimsNo to Zzincdailynum as part of ENH 8230
   //parts : [{path :"ZzincidentDate", type: new sap.ui.model.type.Date({pattern: "MMM dd yyyy"})}, 
   parts : [{path :"ZzincidentDate"},
            //{path : "ZzincidentTime", type: new sap.ui.model.odata.type.Time({pattern: "hh:mm:ss"})}, 
            {path : "ZzincidentTime"},
            {path :"Zzincdailynum"}],
            formatter : function(date,time,incident){
             if(date)
             {
//** Eric - Begin add - CR015
            	 try {
            		 var r = /\d+/;
                     var formattedDate = new Date(Number(date.match(r)[0])).toDateString().split(" ").slice(1).join(" ");            		 
            	 } 
            	 catch(err) {
            		 // date returned by using oData.read() will be javascript date object and will fail the above formatting
            		 var dateFormatter = sap.ui.core.format.DateFormat.getDateInstance({pattern : "MMM dd YYYY" });   
            		 var formattedDate = dateFormatter.format(date);
            	 }
//** Eric - End add - CR015
            	
//** Eric - Begin delete - CR015
//            	 var r = /\d+/;
//                 var formattedDate = new Date(Number(date.match(r)[0])).toDateString().split(" ").slice(1).join(" ");
//                 //var formattedDate = date;
//** Eric - End delete - CR015
             }
             else
             {
              var formattedDate = "";
             }
             
             if ((time == "PT00H00M00S") &&(date)) {
            	 var formattedTime = time.slice(2,4) + ":" + time.slice(5,7) + ":" + time.slice(8,10);
             } else if((time) && (time != "PT00H00M00S")) {
            	 
//** Eric - Begin add - CR015  
            	 try {
            		 var formattedTime = time.slice(2,4) + ":" + time.slice(5,7) + ":" + time.slice(8,10);
            	 } catch(err) {
            		 if(time.ms !== 0) {
            			// Time returned by using oData.read() will be in milliseconds
                		 var tempDate = new Date(time.ms);
                		 
                		 // format into 24 hours format local time
            			 dateFormatter = sap.ui.core.format.DateFormat.getDateInstance({pattern : "HH:mm:ss" });   
            			 var formattedTime = dateFormatter.format(tempDate);
            		 } else {
            			 var formattedTime = "";
            		 }
            	 }
//** Eric - End add - CR015        
            	 
//            	 var formattedTime = time.slice(2,4) + ":" + time.slice(5,7) + ":" + time.slice(8,10);		// Eric-- CR015
            	 
             } else {
              var formattedTime = "";
             }

             /*if(time)
           //var formattedTime = time;
          if ((time.ms == "0") && (date))
       {
           var formattedTime = "";
          }
       else if((time.ms) && (time.ms != "0"))
    {
              // 1- Convert to seconds:
              var seconds = time.ms / 1000;
              // 2- Extract hours:
              var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
              seconds = seconds % 3600; // seconds remaining after extracting hours
              // 3- Extract minutes:
              var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
              // 4- Keep only seconds not extracted to minutes:
              seconds = seconds % 60;
              //alert( hours+":"+minutes+":"+seconds);


           formattedTime = hours + ":" + minutes + ":" + (seconds.length < 2 ? "0"+seconds : seconds);
    }
       else
       {
        var formattedTime = "";
       }       */
             return incident+ "\n"+formattedDate + "  " + formattedTime;
            }

  },
  wrapping : true,

  });
  var oPosition = new sap.m.Text({text:{
   parts :[{path : "Zzposition"} , {path : "ZzpositionDesc"}],

   formatter : function(positionCode,positionDesc){
    if(positionCode&&positionDesc)
    {
     return positionCode +" - "+positionDesc;
    }
    else if(positionCode)
    {
     return positionCode
    }
    else if(positionDesc)
    {
     return positionDesc;
    }



   }}
  });
  this.position = oPosition; //Insert for Defect 14670 KADMA20160927
  var oDateTime = new sap.m.Text({text: {
   //parts : [{path :"Zzqmdat", type: new sap.ui.model.type.Date({pattern: "MMM dd yyyy"})}, 
   parts : [{path :"Zzqmdat"},
            // {path : "Zzmzeit", type: new sap.ui.model.odata.type.Time({pattern: "hh:mm:ss"})}, 
            {path : "Zzmzeit"},
            {path :"Zzqmnum"}],
            formatter : function(date,time,fault){
             if(date){
            	 var formattedDate;
                 var formattedTime;
                 
//** Eric - Begin add - CR015
            	 try {
                     var r = /\d+/;
                     formattedDate = new Date(Number(date.match(r)[0])).toDateString().split(" ").slice(1).join(" ");
                     // formattedDate = date;           		 
            	 } catch(err) {
            		 // date returned by using oData.read() will be javascript date object and will fail the above formatting
            		 var dateFormatter = sap.ui.core.format.DateFormat.getDateInstance({pattern : "MMM dd YYYY" });   
            		 var formattedDate = dateFormatter.format(date);
            	 }
//** Eric - End add - CR015   
            	 
//** Eric - Begin delete - CR015
//                 var r = /\d+/;
//                 formattedDate = new Date(Number(date.match(r)[0])).toDateString().split(" ").slice(1).join(" ");
//                 // formattedDate = date;
//** Eric - End delete - CR015            	 
             }
             else {
              formattedDate = "";
             }
             
             if(time){
//** Eric - Begin add - CR015  
            	 try {
            		 formattedTime = time.slice(2,4) + ":" + time.slice(5,7) + ":" + time.slice(8,10);
            	 } catch(err) {
            		 if(time.ms !== 0) {
            			// Time returned by using oData.read() will be in milliseconds
                		 var tempDate = new Date(time.ms);
                		 
                		// format into 24 hours format local time
	        			 dateFormatter = sap.ui.core.format.DateFormat.getDateInstance({pattern : "HH:mm:ss" });   
	        			 var formattedTime = dateFormatter.format(tempDate);
            		 } else {
            			 var formattedTime = "";
            		 }  		 
            	 }
//** Eric - End add - CR015            	 
            	 
//              formattedTime = time.slice(2,4) + ":" + time.slice(5,7) + ":" + time.slice(8,10);	// Eric-- CR015
              
              /*   // 1- Convert to seconds:
              var seconds = time.ms / 1000;
              // 2- Extract hours:
              var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
              seconds = seconds % 3600; // seconds remaining after extracting hours
              // 3- Extract minutes:
              var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
              // 4- Keep only seconds not extracted to minutes:
              seconds = seconds % 60;
              //alert( hours+":"+minutes+":"+seconds);

           formattedTime = hours + ":" + minutes + ":" + seconds;*/
              //formattedTime = time;
             }
             else{
              formattedTime = "";
             }
             //formattedTime = "";
             return fault+ "\n"+formattedDate + "  " + formattedTime;
            }

  },
  wrapping : true,

  });
  var oLinked = new sap.m.CheckBox("check",{
   selected: false,
   layoutData : new sap.m.FlexItemData({
    styleClass : "checkBox",

   }),
   select : function(evt)
   {
    oController.enableCheck();
   }

  });
  this.oLinked = oLinked;

  var trainTechText = new sap.ui.commons.Label({
   layoutData : new sap.m.FlexItemData({
    styleClass : "checkBox",

   }),
   text: "Maintainer Dispatched", // Changed as per version 1.2
  }).addStyleClass("label");
  this.trainTechText = trainTechText;

  var trainHBox = new sap.m.HBox({
   alignItems : sap.m.FlexAlignItems.Top,
   height: "19px",
   items: [oLinked,trainTechText],

  });
  this.trainHBox = trainHBox;

  var trainTechDispatch = new sap.m.Input({
   value : {
    parts :[{path : "ZzfirstName"} , {path : "ZzlastName"}],

    formatter : function(firstName,lastName){
     if(firstName&&lastName)
     {
      return firstName +" "+lastName;
     }
     else if(firstName)
     {
      return firstName;
     }
     else if(lastName)
     {
      return lastName;
     }
    }},
    layoutData : new sap.m.FlexItemData({
    }), 
    valueHelpOnly : true,
    showValueHelp: true,
    valueHelpRequest : function(evt) {
     oController.chooseTrainTechnician(evt,this);
    },
  }); 
  this.trainTechDispatch = trainTechDispatch;

  var trainTechVBox = new sap.m.VBox({
   items: [trainHBox,trainTechDispatch]
  }).addStyleClass("blockVBox");
  this.trainTechVBox = trainTechVBox;


//  Changes as per version 1.2
//  var oCarNum = new sap.m.Text({text: "{Zzecarid}"});
//  var oSetno = new sap.m.Text({text: "{ZzsetNum}"});
  var oSetno = new sap.m.Text({
   text:{
    parts:[{path:"ZzsetNum"},{path:"Zzecarid"}],
    formatter: function(set,car){
     return set+"\n"+car;
    }
   }
  });
//  End changes
  var oAsset = new sap.m.Text({text: "{Zzeqktx}"});
  var oSymptom = new sap.m.Text({text:{
   parts :[{path : "Zzktxtgr"} , {path : "Zzktxtcd"}],

   formatter : function(symGpDesc,symCodeDesc){
    if(symGpDesc&&symCodeDesc)
    {
     return symGpDesc +" - "+symCodeDesc;
    }
    else if(symCodeDesc)
    {
     return symCodeDesc;
    } 
    else if(symGpDesc)
    {
     return symGpDesc;
    }
   }}
  });
  var oPriority = new sap.m.Text({text:{
   parts :[{path : "Zzpriok"} , {path : "ZzpriorityDesc"}], 

   formatter : function(priorityCode,priorityDesc){
    if(priorityCode&&priorityDesc)
    {
     return priorityCode +" - "+priorityDesc;
    }
    else if(priorityCode)
    {
     return priorityCode;
    }
    else if(priorityDesc)
    {
     return priorityDesc;
    }

   }}
  });
  var oTripno = new sap.m.Text({text: "{ZztripNum}"});
  var selected = new sap.m.Text({text: "{Zzaufnr}"});
//  Changes as per version 1.2
  var oPrimeNotif = new sap.m.Text({text:{
   parts:[{path:"ZzprimeFaultNum"},{path:"ZzprimedupFlag"}],
   formatter: function(notif,flag){
    if(flag == "L" && notif != undefined){
     var notifNum = notif.replace(/^[0]+/g,"");
     return notifNum;
    }
   }
  }});
//  End of changes
  this.selected = selected;
  if((selected.getText() != "") && (selected.getText() != null))
  {
   this.oLinked.setSelected(true);
  }
  var oRow = new sap.m.ColumnListItem();
  oRow.addCell(oDateTime).addCell(oTripno).addCell(oIncident).addCell(oSetno).addCell(oAsset).addCell(oPosition).addCell(oSymptom).addCell(oPriority).addCell(oPrimeNotif).addCell(selected);
  //oRow.addCell(oDateTime).addCell(oTripno).addCell(oSetno).addCell(oAsset).addCell(oPosition).addCell(oSymptom).addCell(oPriority).addCell(selected);
  oTable.bindItems("/",oRow); 
  var oModel = new sap.ui.model.json.JSONModel();
  oTable.setModel(oModel);
  this.notifTable = oTable;

  var reviewExist = new sap.m.Button(
	//** Eric - Begin add - CR015
	// Give this button an ID for easy reference later
		  "ReviewExistButton", 
	//** Eric - End add - CR015
	{
   text : "Review / Update Selected",
   icon : "sap-icon://edit",
   press : function(evt) {
    oController.openUpdate(evt);
   }
  }).addStyleClass("notifybutton");
  this.reviewExist = reviewExist;
  var showLongTextBtn = new sap.m.Button({
   text : "Show Long Text",
   icon : "sap-icon://document-text",
   press : function(evt) {
    oController.getFaultLongTxt(evt)
   }
  }).addStyleClass("notifybutton");;
  var conNotification = new sap.m.Button({
   text : "Continue with Original",
   icon: "sap-icon://process",
   press : function(evt) {
    oController.selectAsset(evt);
   }
  }).addStyleClass("notifybutton");
  var cancelNotification = new sap.m.Button({
   text : "Mark Selected as Duplicate",
   icon : "sap-icon://duplicate",
   press : function(evt) {
    oController.markAsDuplicate();
   }
  }).addStyleClass("notifybutton");
  //** Start of Change for Portal upgrade changes by SINGHPRI 
  //** Date - 1/11/2017
  /* var notificationButtons = new sap.m.FlexBox({
   justifyContent: "SpaceAround",
   items : [reviewExist,showLongTextBtn,conNotification,]
  });*/
  //** End of Change for Portal upgrade changes by SINGHPRI

  //** Eric - Begin add - CR015  
  var oCustomTitle = new sap.m.Title({
	  text: "Title" // Stub text
  });
  
  var oCustomTitleBar = new sap.m.Bar({
	  contentLeft: [
		  new sap.m.Label({
			  text: "{i18n>toggleOpenFaults}"
		  }),
		  new sap.m.Switch({
			  id: "FaultSwitch",
			  customTextOn: " ",
			  customTextOff: " ",
			  change: function(evt) {
				  oController.onFaultSwitchFlipped(evt);
			  }
		  }),
		  new sap.m.Label({
			  text: "{i18n>toggleClosedFaults}"
		  }),
	  ],
	  contentMiddle: [oCustomTitle]
  });
   
  var fromDatePicker = new sap.m.DatePicker({
		id: "ClosedFaultDateFrom",
		width: "auto",
		dateValue: "{ClosedFaultSearchModel>/FromDate}",
		displayFormat: "dd/MM/YYYY",
		valueFormat: "YYYY-MM-dd",
		required: true,
		maxDate: new Date(),
		change: function(evt) {
			oController.validateClosedFaultSearchDate(this, evt);
		}
	});
  var toDatePicker = new sap.m.DatePicker({
		id: "ClosedFaultDateTo",
		width: "auto",
		dateValue: "{ClosedFaultSearchModel>/ToDate}",	
		displayFormat: "dd/MM/YYYY",
		valueFormat: "YYYY-MM-dd",
		required: true,
		change: function(evt) {
			oController.validateClosedFaultSearchDate(this, evt);
			
			if(evt.getParameters().valid){
				fromDatePicker.setMaxDate(new Date(evt.getParameters().value));
			}
		}
	});
  var closedFaultSearchButton = new sap.m.Button({
		id: "ClosedFaultSearchButton",
		text: "{i18n>buttonClosedFaultSearch}",
		press: function(evt){
			oController.onClosedFaultSearch();
		}
	});
  var oSubHeader = new sap.m.Bar({
	  contentMiddle: [
		new sap.m.Label({
			text: "{i18n>labelClosedFaultDateFrom}"
		}),
		fromDatePicker,
		new sap.m.Label({
			text: "{i18n>labelClosedFaultDateTo}"
		}),
		toDatePicker,
		closedFaultSearchButton
	  ],
	  contentRight: [
		  new sap.m.Button({
			  icon: "sap-icon://filter",
			  press: function(evt) {
				  oController.onFilter(evt);
			  }
		  }),
		  new sap.m.Button({
			  icon: "sap-icon://sort",
			  press: function(evt) {
				  oController.onSort(evt);
			  }
		  })
	  ],
	  visible: false
  });
  //** Eric - End add - CR015
 
  
  var dialogNotification = new sap.m.Dialog("notifyDialog",{
   contentWidth : "1500px",
   horizontalScrolling : true,
   verticalScrolling : true,
   content: [oTable],
   //** Start of Change for Portal upgrade changes by SINGHPRI 
   //** Date - 1/11/2017
   buttons:[reviewExist,showLongTextBtn,conNotification,],
   //buttons:[notificationButtons],
   //** End of Change for Portal upgrade changes by SINGHPRI

   //** Eric - Begin add - CR015
   	customHeader: oCustomTitleBar,
  	subHeader: oSubHeader
   //** Eric - End add - CR015
  });
  this.dialogNotification = dialogNotification;
  //Dialog code end//

  var app = this.getViewData().app;
  this.controller = oController;
  this.mandatory = [];


  var carInput = new sap.m.MultiInput("carMulti",{
   layoutData : new sap.m.FlexItemData({
    styleClass : "textBox",

   }),
//   valueHelpOnly : true,  //-- CR015 SIMS20180815 (SY)
   valueHelpOnly : false,   //++ CR015 SIMS20180815 (SY)  
   showValueHelp: false,
   enableMultiLineMode:false,
//   editable : false,      //-- CR015 SIMS20180815 (SY)
// BEGIN INSERT CR015 SIMS20180815 (SY) 
   editable : true,        
   showSuggestion : true,
   liveChange : function(oEvent) {
	   oController.suggestCarNumber(oEvent);
   },
   suggestionItems : {
	   path : "carNumberModel>/list",
   	   sorter : { path: "Zzcarid" },
   	   templateShareable : true,
   	   template : new sap.ui.core.ListItem({
   		   key :  "{carNumberModel>Zzcarid}",
   		   text :  "{carNumberModel>Zzcarid}"
   	   })
   },
// END INSERT CR015 SIMS20180815 (SY)    
   enabled : true,
   valueHelpRequest: function(evt) {
   },

   change : function()
   {
// BEGIN INSERT CR015 SIMS20180815 (SY)
	   var carNumber = oController.getView().carInput.getValue();
	   if(carNumber !== "" && carNumber !==null) {
		   getSetNumber(carNumber,oController.addCarToken,oController);		   
	   } else {
 // END INSERT CR015 SIMS20180815 (SY)    
		   oController.ValidateChangeCarNum();
	   }  //++ CR015 SIMS20180815 (SY)	   
	   oController.getCountForFaults();
   },  

   tokenChange:function (evt)
   {
// BEGIN INSERT CR015 SIMS20180815 (SY)
	   if(evt.getParameters().type === "added"){
		   var carNumber = evt.getParameters().token.getKey();
		   if(carNumber !== "" && carNumber !==null) {
			   getSetNumber(carNumber,oController.addCarToken,oController);		   
		   }   
	   } 
 // END INSERT CR015 SIMS20180815 (SY)  	   
    oController.getCountForFaults(evt);
    oController.resetSymptomAsset(evt);
    // oController.changeFlag(evt);

   },


//   }).addStyleClass("disabledInput");  //fix by KONCHADS on 160616 for Defect # 11915
  }).addStyleClass("cCardisabledInput");
  this.carInput = carInput;
  this.mandatory.push(carInput);


  var addButton = new sap.m.Button({
   icon: "sap-icon://add",
   enabled: true,
   visible :true,
   press : function(evt){
    oController.chooseCarNumber(evt,this);
   },
   layoutData: new sap.ui.core.VariantLayoutData({
    multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({
     weight: 1
    }),
    new sap.ui.layout.form.GridElementData({
     hCells: "1"
    }),
    new sap.ui.layout.GridData({
     span: "L1 M1 S1"
    })
    ]
   })
  });
  this.addButton = addButton;
  var carBox = new sap.m.FlexBox({
   justifyContent : "SpaceBetween",
   items : [carInput, addButton],

  });
  var asset = new sap.m.MultiInput("fms_app_Asset",{//NARASIMB 22092016 - HPQC #15195
   width: "98%",
   showValueHelp:true,
   valueHelpOnly : true,
   enableMultiLineMode:false,
   editable: true,
   enabled :true,
   valueHelpRequest: function(evt) {
    oController.chooseAsset(evt,this);
   },
   change : function()
   {
    oController.resetSymptom(evt);
   },

   tokenChange :  function(evt)
   {
    oController.resetSymptom(evt);
   },

   tokens : [             
             new sap.m.Token({key:"{/Zzasset}" , text:"{/ZzassetDesc}",
              visible:{
               parts :[{path : "/Zzasset"} , {path : "/ZzassetDesc"}],

               formatter : function(assetCode){
                if((assetCode!= "") &&(assetCode)){
                 return true;
                }
                else{
                 return false;
                }
               }
              },
             })

             ],


  }).addStyleClass("inputPadding"); 

  this.asset = asset;
//  Start of fix by KONCHADS on 160616 for Defect # 11915
  var obj_inp = new sap.m.MultiInput("objPart",{
   showValueHelp: true,
   valueHelpOnly : true,
   editable : true,
   enabled : true,
   width: "98%",
   valueHelpRequest: function(evt) {
    oController.getCarAsset(evt,this);
   },
   //BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
   tokenChange : function(evt)
   {
    oController.clearActivityCode();
   },
   //EOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
  }).addStyleClass("inputPadding");
  this.obj_inp = obj_inp;
//  End of fix by KONCHADS on 160616 for Defect # 11915

  var dateTime = new sap.m.DateTimeInput({
   width : "98%",
   placeholder : "Time Picker",
   type : "DateTime",
   valueFormat : "dd-MM, yyyy HH:mm",
   displayFormat: "dd-MMM-yyyy HH:mm",
   dateValue: {
    parts : [{path :"/ZzfaultDate"}, {path : "/ZzfaultTime"}],

    formatter : function(date,time){
     if(date && time)
     {
      var r = /\d+/;
      var formattedDate = new Date(Number(date.match(r)[0])).toDateString().split(" ").slice(1).join(" ");
      var formattedTime = time.slice(2,4) + ":" + time.slice(5,7) + ":" + time.slice(8,10);
      var date = new Date(formattedDate + "  " + formattedTime);
      return date;
     }
    }

   },
   change : function(e) {
    oController.dateChange();
   }
  });
  this.dateTime = dateTime;


  var symptom = new sap.m.MultiInput("symptomMulti",{
   width: "98%",
   showValueHelp:true,
   valueHelpOnly : true,
   enableMultiLineMode:false,
   change : function(evt){
    oController.getValidateValues(evt);
    oController.getCountForFaults();
   },
   valueHelpRequest : function(evt) {
    oController.chooseSymptom(evt,this);
   },

   enabled : true,
   tokenChange :  function(evt)
   {

   },
   tokens : [             
             //new sap.m.Token({key:"{/ZzsymptomCode}" , text:"{/ZzsymptomCodeDesc}",
             new sap.m.Token({key:"{/ZzsymptomCode}" , text:{ // Defect #6565  -- narasimb
              parts:[
                     {path:"/ZzsymptomGpDesc"}, {path:"/ZzsymptomCodeDesc"}
                     ],
                     formatter: function(symptomGpDesc, symptomCodeDesc){
                      return symptomGpDesc + " - " + symptomCodeDesc;

                     }
             },
             visible:{
              parts :[{path : "/ZzsymptomCode"}],

              formatter : function(ZzsymptomCode){
               if(ZzsymptomCode){
                return true;
               }
               else{
                return false;
               }
              }
             },
             })

             ],
  }).addStyleClass("inputPadding");
  this.symptom = symptom;
  this.mandatory.push(symptom);



  var priority_input = new sap.m.Input("faultPriority",{
   enabled: false,
   value : {
    parts :[{path : "/Zzpriority"} , {path : "/ZzpriorityDesc"}],

    formatter : function(priorityCode,priorityDesc){
     if(priorityCode&&priorityDesc)
      return priorityCode +" - "+priorityDesc;

    }},
    change : function(evt){
     oController.getValidateValues(evt);
    },
    layoutData : new sap.m.FlexItemData({
    }),
  }).addStyleClass("FaultHoverDisabled"); 

  priority_input.ontouchstart = function(evt){ 
   oController.openPriorityPopup(this);
  };
  this.priority_input = priority_input;
  this.mandatory.push(priority_input);

  var positionPopOver = new sap.m.Input({
   value : {
    parts :[{path : "/Zzposition"} , {path : "/ZzpositionDesc"}],

    formatter : function(positionCode,positionDesc){
     if(positionCode&&positionDesc)
     {
      return positionCode +" - "+positionDesc;
     }
     else if(positionCode)
     {
      return positionCode;
     }
     else
     {
      return positionDesc;
     }
    }},
    layoutData : new sap.m.FlexItemData({
    }),
    valueHelpOnly : true,
    showValueHelp: true,
    valueHelpRequest : function(evt) {
     oController.choosePosition(evt,this);
    },
  }); 


  this.positionPopOver = positionPopOver;

  var faultRepBy = new sap.m.Input({layoutData : new sap.m.FlexItemData({
  }),
  enabled : true,
  maxLength : 12,
  showValueHelp: true,
  valueHelpRequest : function(evt) {
   oController.chooseFaultRepBy(evt,this);
  },
  value: "{/Zzfaultreptby}",
  });
  this.faultRepBy = faultRepBy;


  var auditNum = new sap.m.Input({layoutData : new sap.m.FlexItemData({
  }),
  value : "{/ZzauditNum}",
  enabled : true,
  });
  this.auditNum = auditNum;
  this.mandatory.push(auditNum);


  var setNum = new sap.m.Input({layoutData : new sap.m.FlexItemData({
  }),

  showValueHelp: true,
//  valueHelpOnly : true,   //-- CR015 SIMS20180815 (SY)
// BEGIN INSERT CR015 SIMS20180815 (SY) 
  valueHelpOnly : false,
  showSuggestion : true,
  liveChange : function(oEvent) {
	  oController.suggestSetNumber(oEvent);
  },
  suggestionItems : {
	  path : "setNumberModel>/list",
	  sorter : { path: "Zzsetid" },
	  templateShareable: true,
	  template: new sap.ui.core.ListItem({
		  text: "{setNumberModel>Zzsetid}"
	  })  
  },
//END INSERT CR015 SIMS20180815 (SY)  
  valueHelpRequest : function(evt) {
   oController.chooseSetNumber(evt,this);
  },
  value: "{/ZzsetNum}",
  change: function(){
   oController.changeSetNum();	  
  },
  enabled : true,
  });
  
  this.setNum = setNum;
  this.mandatory.push(setNum);

  var editButton = new sap.m.Button("edit",{
   icon: "sap-icon://edit",
   enabled: true,
   press : function(evt){
    var text = sap.ui.getCore().byId("inputDesc").getValue();
    oController.editOrSave(evt,text);
   },
   layoutData: new sap.ui.core.VariantLayoutData({
    multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({
     weight: 1
    }),
    new sap.ui.layout.form.GridElementData({
     hCells: "1"
    }),
    new sap.ui.layout.GridData({
     span: "L1 M1 S1"
    })
    ]
   })
  });

  this.mandatory.push(faultRepBy);
  var oItemTemplate = new sap.ui.core.Item({
   key : "{key}",
   text : "{text}"
  });

  var faultResponse = new sap.m.MultiComboBox({

   items: { path : "/listitems",
    template : oItemTemplate},

  });
  this.faultResponse = faultResponse;


  var textBoxArea = new sap.m.Input("inputDesc",{
   layoutData : new sap.m.FlexItemData({
    styleClass : "textBox",

   }),
   value: "{/ZznotifShorttext}",   //ZznotifTextlng//
   enabled:true,
   maxLength: 40,
   liveChange : function(evt){
    if(this.getValue().length == 40)
    {
     // Defect #6691  --- narasimb
     /*var mySelf = this;
     mySelf.setEditable(false);
     var text = sap.ui.getCore().byId("inputDesc").getValue();
     oController.editOrSave(evt,text);*/
    }
   },
   change: function(evt){
    eqpFMSFormChngdFlg = true;
   }
  });
  this.textBoxArea = textBoxArea;
  this.mandatory.push(textBoxArea);
  var Desc = new sap.m.FlexBox({
   justifyContent : "SpaceBetween",
   items : [textBoxArea, editButton ]
  });
  this.Desc = Desc;
  var objectPart = new sap.m.Input({layoutData : new sap.m.FlexItemData({
  }),
  valueHelpOnly : true,
  showValueHelp: true,
  valueHelpRequest : function(evt) {
   oController.chooseObjectPart(evt,this);
  },
  enabled : true,
  });

  var repPhase = new sap.m.Input("reportPhase",{
   width: "98%",
   enabled: false,
   layoutData : new sap.m.FlexItemData({
   }),
   value: "{/ZzrepPhaseDesc}"
  });//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670

  repPhase.ontouchstart = function(evt){ 
   oController.openReportPhasePopup(this);
  };
  this.reportPhase = repPhase;
  this.mandatory.push(repPhase);

  var faultRepAt = new sap.m.Input({
   layoutData : new sap.m.FlexItemData({
   }),
   value: "{/Zzfaultreptat}",
  }); 
  this.faultRepAt = faultRepAt;


  var auditType = new sap.m.Input("auditType",{
   //enabled: false, // Commented For Fault UI Fix KADAMA20170109 #HPQC 39201 --> enable Field
   layoutData : new sap.m.FlexItemData({
   }),
   value : "{/ZzauditTypeDesc}",
  })//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670 

  auditType.ontouchstart = function(evt){ 
   oController.openAuditTypePopup(this);
  };
  this.auditType = auditType;
  this.mandatory.push(auditType);

  var weather_input = new sap.m.Input("weather",{
   enabled: false,
   value : "{/ZzweatherDesc}",
   layoutData : new sap.m.FlexItemData({
   }),
  }).addStyleClass("FaultHoverDisabled"); 
  this.auditType = auditType;

  weather_input.ontouchstart = function(evt){ 
   oController.openWeatherPopup(this);
  };
  this.weather_input = weather_input;

  var engFlag_input = new sap.m.Input({
   layoutData : new sap.m.FlexItemData({
   }),
  }); 
  this.engineering = engFlag_input;
  //this.mandatory.push(engFlag_input);

  engFlag_input.ontouchstart = function(evt){ 
   oController.openEngFlagPopup(this);
  };
  this.engFlag_input = engFlag_input;

  var temp_input = new sap.m.Input("temperature",{
   enabled: false,
   value: "{/ZztemperatureDesc}",
   layoutData : new sap.m.FlexItemData({
   }),
  }).addStyleClass("FaultHoverDisabled"); 

  temp_input.ontouchstart = function(evt){ 
   oController.openTempPopup(this);
  };
  this.temp_input = temp_input;


  var fault_input = new sap.m.Input("faultSource",{
   enabled: false,
   change : function(evt){
    oController.getValidateValues(evt);
   },
   layoutData : new sap.m.FlexItemData({
   }),
   value: "{/ZzfaultSourceDesc}",
  })//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670 

  fault_input.ontouchstart = function(evt){ 
   oController.openFaultPopup(this);
  };
  this.faultSource = fault_input;
  this.mandatory.push(fault_input);

  var location = new sap.m.Input({
   valueHelpOnly : true,
   showValueHelp: true,
   valueHelpRequest : function(evt) {
    oController.chooseLocation(evt,this);
   },
   value : "{/ZzfaultLocDesc}",
   layoutData : new sap.m.FlexItemData({
   }),
  }); 

  this.location = location;
  this.mandatory.push(location);


  var tripNum =  new sap.m.Input({layoutData : new sap.m.FlexItemData({
  }),
  enabled : true,
  value: "{/ZztripNum}",
  change : function(evt){
   oController.changeOfTrip(evt);
  },
  }) ;
  this.tripNum = tripNum;
  var notificationType = new sap.m.Input({
   layoutData : new sap.m.FlexItemData({
   }),
   enabled : false,
   value : "Fault/Failure",
  }); 


  this.notificationType = notificationType;

  var notificationNum = new sap.m.Text({
   text :"",

  }); 
  this.notificationNum = notificationNum;
  var attachmentNumber = new sap.m.Input({
   editable: false,
   enabled : true,
   width : "50%"
  });
  this.attachmentNumber = attachmentNumber;


  var cutOut = new sap.m.CheckBox({
   text : "Cut Out",
  });
  this.cutOut = cutOut;
  var fixedTraffic = new sap.m.CheckBox("fixedTraffic",{
   text : "Fixed in Traffic",
  });
  this.fixedTraffic = fixedTraffic;


  var nonBlock = new sap.m.CheckBox({
   text : "Non Block Fault",
  });
  this.nonBlock = nonBlock;
  var carRowLayout = new sap.ui.layout.form.ResponsiveGridLayout("cL1", {
   columnsL: 2,
  });

  var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout("L1", {
   /*emptySpanL: 1,
   emptySpanM: 1,
   emptySpanS: 1,
   labelSpanL: 5,
   labelSpanM: 5,
   labelSpanS: 5,
   columnsL: 4,
   columnsM: 4,
   breakpointL: 800,
   breakpointM: 400*/
   columnsL: 2,
   columnsM: 2,
  });
  var oLayout2 = new sap.ui.layout.form.ResponsiveGridLayout("L2", {
   labelSpanL: 5,
   columnsL: 1,
   emptySpanL: 1,
  });
  var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout("L3", {
   columnsL: 2,
  });
  var oLayout4 = new sap.ui.layout.form.ResponsiveGridLayout("L4", {
   columnsL: 1,
   labelSpanL: 4,
  });
  var oLayout5 = new sap.ui.layout.form.ResponsiveGridLayout("L5", {
   emptySpanL: 1,
   emptySpanM: 1,
   emptySpanS: 1,
   labelSpanL: 5,
   labelSpanM: 5,
   labelSpanS: 5,
   columnsL: 4,
   columnsM: 4,
   breakpointL: 800,
   breakpointM: 400
  });
  var oLayout6 = new sap.ui.layout.form.ResponsiveGridLayout("L6", {
   emptySpanL: 1,
   emptySpanM: 1,
   emptySpanS: 1,
   labelSpanL: 2,
   labelSpanM: 2,
   labelSpanS: 2,
   columnsL: 4,
   columnsM: 4,
   breakpointL: 800,
   breakpointM: 400
  });
  var oLayout7 = new sap.ui.layout.form.ResponsiveGridLayout("L7", {
   emptySpanL: 1,
   emptySpanM: 1,
   emptySpanS: 1,
   labelSpanL: 5,
   labelSpanM: 5,
   labelSpanS: 5,
   columnsL: 4,
   columnsM: 4,
   breakpointL: 800,
   breakpointM: 400
  });
  var oLayout8 = new sap.ui.layout.form.ResponsiveGridLayout("L8", {
   labelSpanL: 7,
   emptySpanL: 1,
   columnsL: 4,
  });
  var oLayout9 = new sap.ui.layout.form.ResponsiveGridLayout("L9", {
   emptySpanL: 1,
   emptySpanM: 1,
   emptySpanS: 1,
   labelSpanL: 5,
   labelSpanM: 5,
   labelSpanS: 5,
   columnsL: 4,
   columnsM: 4,
   breakpointL: 800,
   breakpointM: 400
  });
  var carLabel = new sap.m.Label({
   text: "Car Number",
   required: true,
  });
  this.carLabel = carLabel;

  var setLabel = new sap.m.Label({
   text: "Set Number",
   required: true,
  });
  this.setLabel = setLabel;

  var tripLabel = new sap.m.Label({
   text: "Trip Number"});
  this.tripLabel = tripLabel;

  var dateTimeLabel = new sap.m.Label({
   text: "Fault Occurred Date/Time"});
  this.dateTimeLabel = dateTimeLabel;

  var faultRepByLabel = new sap.m.Label({
   text: "Fault Reported by",
   required: true,
  });

  this.faultRepByLabel = faultRepByLabel;

  var faultRepAtLabel = new sap.m.Label({
   text: "Fault Occurred (location)"});
  this.faultRepAtLabel = faultRepAtLabel;

  var repPhaseLabel = new sap.m.Label({
   text: "Report Phase",
   required: true,
  });
  this.repPhaseLabel = repPhaseLabel;

  var DescLabel = new sap.m.Label({
   text: "Description:",
   required: true,
  });
  this.DescLabel = DescLabel;

  var faultSourceLabel = new sap.m.Label({
   text: "Fault Source:",
   required: true,
  });
  this.faultSourceLabel = faultSourceLabel;

  var locationLabel = new sap.m.Label({
   text: "Your Location:",
   required: true,
  });
  this.locationLabel = locationLabel;

  var assetLabel = new sap.m.Label({
   text: "Asset"});
  this.assetLabel = assetLabel;

  //Start of fix by KONCHADS on 160616 for Defect # 11915
  var objLabel = new sap.m.Label({
   text: "Object Part", 
  });
  this.objLabel = objLabel;
  //End of fix by KONCHADS on 160616 for Defect # 11915
  var positionLabel = new sap.m.Label({
   text: "Position"});
  this.positionLabel = positionLabel;

  var symptomLabel = new sap.m.Label({
   text: "Symptom",
   required: true,
  });
  this.symptomLabel = symptomLabel;

  var priorityLabel = new sap.m.Label({
   text: "Priority",
   required: true,
  });
  this.priorityLabel = priorityLabel;

  var weatherLabel = new sap.m.Label({
   text: "Weather"});
  this.weatherLabel = weatherLabel;

  var engFlagLabel = new sap.m.Label({
   text: "Engineering Flag"});
  this.engFlagLabel = engFlagLabel;

  var tempLabel = new sap.m.Label({
   text: "Temperature"});
  this.tempLabel = tempLabel;

  var auditNumLabel = new sap.m.Label({
   text: "TSR/TPC/Audit Number"});
  this.auditNumLabel = auditNumLabel;

  var auditTypeLabel = new sap.m.Label({
   text: "Audit Type"});
  this.auditTypeLabel = auditTypeLabel;

  var notificationNumLabel = new sap.m.Label({
   text: "Fault Number"});
  this.notificationNumLabel = notificationNumLabel;
  var faultResLabel = new sap.m.Label({
   text: "Fault Information"});
  this.faultResLabel = faultResLabel;


  var row1 = new sap.ui.layout.form.Form({
   editable : true,
   layout : oLayout4,
   formContainers : [ new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     //label : "Fault Number",
     fields : [ new sap.m.VBox({
      items: [notificationNumLabel,notificationNum],
     }).addStyleClass("blockVBox") ],

    }) ]
   }),]
  }).addStyleClass("formInput");

  this.row1 = row1;

  var carRow = new sap.ui.layout.form.Form({
   layout: carRowLayout,
   formContainers:[

                   new sap.ui.layout.form.FormContainer({
                    styleClass :"formWidth",
                    formElements : [
                                    new sap.ui.layout.form.FormElement({
                                     fields: [new sap.m.VBox({
                                      items: [carLabel,carBox],
                                     }).addStyleClass("blockVBox")]
                                    }),

                                    ]
                   }),new sap.ui.layout.form.FormContainer({
                    styleClass :"formWidth",
                    formElements : [new sap.ui.layout.form.FormElement({

                     fields : [new sap.m.VBox({
                      items: [setLabel,setNum]
                     }).addStyleClass("blockVBox")]
                    }),new sap.ui.layout.form.FormElement({
                     label : "Notification Type",
                     fields : [ notificationType ]
                    })  ]
                   }),
                   ]
  });


  var generalData_1 = new sap.ui.layout.form.Form({
   // icon: "sap-icon://multi-select",
   editable : true,
   layout : oLayout1,
   formContainers : [
                     new sap.ui.layout.form.FormContainer(
                       {

                        formElements : [ 
                                        new sap.ui.layout.form.FormElement({
                                         fields : [ new sap.m.VBox({
                                          items: [tripLabel,tripNum],
                                         }).addStyleClass("blockVBox")]
                                        }),

                                        ]
                       }), 
                       /*new sap.ui.layout.form.FormContainer({
         styleClass :"formWidth",
         formElements : [
              new sap.ui.layout.form.FormElement({
           fields: [new sap.m.VBox({
                  items: [carLabel,carBox],
            }).addStyleClass("blockVBox")]
          }),

                   ]
        }),
        new sap.ui.layout.form.FormContainer({
         styleClass :"formWidth",
         formElements : [new sap.ui.layout.form.FormElement({

          fields : [new sap.m.VBox({
                  items: [setLabel,setNum]
           }).addStyleClass("blockVBox")]
         }),new sap.ui.layout.form.FormElement({
          label : "Notification Type",
          fields : [ notificationType ]
         })  ]
        }),*/
                       new sap.ui.layout.form.FormContainer({
                        styleClass :"formWidth",
                        formElements : [new sap.ui.layout.form.FormElement({
                         fields : [ new sap.m.VBox({
                          items: [dateTimeLabel,dateTime]
                         }).addStyleClass("blockVBox") ]
                        }), ]
                       }),
                       ]
  }).addStyleClass("formInput");

  var row2 = new sap.ui.layout.form.Form({
   editable : true,
   layout : oLayout5,
   formContainers : [ new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     fields : [ new sap.m.VBox({
      items: [faultRepByLabel,faultRepBy],
     }).addStyleClass("blockVBox")  ]
    }), ]
   }), new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     fields : [ new sap.m.VBox({
      items: [faultRepAtLabel,faultRepAt],
     }).addStyleClass("blockVBox") ]
    }) ]
   }), 
   new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     fields : [ new sap.m.VBox({
      items: [positionLabel,positionPopOver]
     }).addStyleClass("blockVBox") ]
    })              
    ]
   }),
   new sap.ui.layout.form.FormContainer({

    formElements : [ ,new sap.ui.layout.form.FormElement({
     fields : [ new sap.m.VBox({
      items: [repPhaseLabel,repPhase],
     }).addStyleClass("blockVBox") ]
    }) ]
   }),

   ]
  }).addStyleClass("formInput_bottm_pad");

  this.row2 = row2;

  var formHBox = new sap.ui.layout.Grid({
   content:[new sap.m.VBox({
    items: [DescLabel,Desc],
    layoutData : new sap.ui.layout.GridData({
     span : "L6 M6 S12"
    })
   }).addStyleClass("blockVBox"),new sap.m.VBox({
    items: [faultSourceLabel,fault_input],
    layoutData : new sap.ui.layout.GridData({
     span : "L3 M3 S12"
    })
   }).addStyleClass("blockVBox"), new sap.m.VBox({
    items: [locationLabel,location],
    layoutData : new sap.ui.layout.GridData({
     span : "L3 M3 S12"
    })
   }).addStyleClass("blockVBox")],

  }).addStyleClass("formHBox");
  this.formHBox = formHBox;

  var malfunctionData = new sap.ui.layout.form.Form({
   editable : true,
   layout : oLayout2,
   formContainers : [
                     new sap.ui.layout.form.FormContainer(
                       {

                        formElements : [new sap.ui.layout.form.FormElement({
                         fields : [formHBox ]
                        }), ]
                       }), ]
  }).addStyleClass("formInput");
  var additionalInfo = new sap.ui.layout.form.Form({
   editable : true,
   layout: oLayout3,
   formContainers : [
                     new sap.ui.layout.form.FormContainer(
                       {

                        formElements : [ new sap.ui.layout.form.FormElement({
                         fields : [ new sap.m.VBox({
                          items: [assetLabel,asset]
                         }).addStyleClass("blockVBox") ]
                        })],
                        /*layoutData: new sap.ui.layout.GridData({
     span: "L6 M6 S6"
    })*/
                       }),
                       new sap.ui.layout.form.FormContainer({

                        formElements : [
                                        new sap.ui.layout.form.FormElement({
                                         fields : [ new sap.m.VBox({
                                          items: [symptomLabel,symptom]
                                         }).addStyleClass("blockVBox") ],

                                        })],
                                        /*layoutData: new sap.ui.layout.GridData({
         span: "L6 M6 S6"
        })*/
                       }),
//                       Start of fix by KONCHADS on 160616 for Defect # 11915
                       new sap.ui.layout.form.FormContainer({
                        formElements : [
                                        new sap.ui.layout.form.FormElement({
                                         fields : [ new sap.m.VBox({
                                          items: [objLabel,obj_inp]
                                         }).addStyleClass("blockVBox") ],

                                        })],
                                        /*layoutData: new sap.ui.layout.GridData({
         span: "L6 M6 S6"
        })*/
                       }),
//                       END of fix by KONCHADS on 160616 for Defect # 11915
                       ]
  }).addStyleClass("formInput");

  /*var additionalInfo = new sap.ui.layout.Grid({
   content:[new sap.m.VBox({
    items: [assetLabel,asset],
            layoutData : new sap.ui.layout.GridData({
                       span : "L6 M6 S12"
                     })
     }).addStyleClass("blockVBox"),
     new sap.m.VBox({
             items: [symptomLabel,symptom],
            layoutData : new sap.ui.layout.GridData({
                       span : "L6 M6 S12"
                     })
    }).addStyleClass("blockVBox")],

  }).addStyleClass("formHBox");*/

  var row3 = new sap.ui.layout.form.Form({
   editable : true,
   layout : oLayout6,
   formContainers : [ new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     fields : [ new sap.m.VBox({
      items: [priorityLabel,priority_input]
     }).addStyleClass("blockVBox")  ]
    })  ]
   }), 
   new sap.ui.layout.form.FormContainer({
    formElements : [ 
                    new sap.ui.layout.form.FormElement({
                     fields : [ new sap.m.VBox({
                      items: [faultResLabel,faultResponse],

                     }).addStyleClass("blockVBox")]
                    })],
                    layoutData: new sap.ui.layout.GridData({
                     span: "L6 M6 S12"
                    })
   }),
   new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     fields : [ trainTechVBox ]
    }) ]

   })

   ]
  }).addStyleClass("formInput");

  this.row3 = row3;

  var row4 = new sap.ui.layout.form.Form({
   editable : true,
   layout : oLayout7,
   visible: false,
   formContainers : [ new sap.ui.layout.form.FormContainer({

    formElements : [ 
                    new sap.ui.layout.form.FormElement({
                     fields : [ new sap.m.VBox({
                      items: [auditNumLabel,auditNum],
                     }).addStyleClass("blockVBox") ]
                    }) ]
   }), new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     fields : [ new sap.m.VBox({
      items: [auditTypeLabel,auditType],
     }).addStyleClass("blockVBox") ]
    }) ]
   }), new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     label : "",
     fields : [ new sap.m.Input({
      editable : false,
     }) ]
    }) ]
   }), new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     label : "",
     fields : [ new sap.m.Input({
      editable : false,
     }) ]
    }) ]
   })

   ]
  }).addStyleClass("formInput");

  this.row4 = row4;


  var attachButton = new sap.m.Button({
   icon: "sap-icon://attachment",

  }).addStyleClass("attachmentButton");
  var attachIcon = new sap.ui.core.Icon({
   src : "sap-icon://attachment",
   size : "2em",
   press : function(evt){
    oController.addAttachmentsInitial(evt)
   },
   width : "10%",
   color : "black",
   hoverColor : "#0077a6",
   activeColor : "#0D045A",
   backgroundColor : "white",
   hoverBackgroundColor : "white",
   activeBackgroundColor : "white",
  }).addStyleClass("attachmentButton");

  this.attachIcon = attachIcon;

  var row5 = new sap.ui.layout.form.Form({
   editable : true,
   layout : oLayout8,
   formContainers : [ new sap.ui.layout.form.FormContainer({

    formElements : [ ,
                     new sap.ui.layout.form.FormElement({
                      label : "Fault Attachments",
                      fields : [
                                new sap.m.HBox({
                                 width : "100%",
                                 items : [attachIcon,
                                          attachmentNumber

                                          ]
                                })
                                ]
                     }) ]
   }), new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     label : "",
     fields : [ new sap.m.Input({
      editable : false,
     }) ]
    }) ]
   }), new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     label : "",
     fields : [ new sap.m.Input({
      editable : false,
     }) ]
    }) ]
   }), new sap.ui.layout.form.FormContainer({

    formElements : [ new sap.ui.layout.form.FormElement({
     label : "",
     fields : [ new sap.m.Input({
      editable : false,
     }) ]
    }) ]
   })

   ]
  }).addStyleClass("formInput");

  this.row5 = row5;

  var row6 = new sap.ui.layout.form.Form({
   editable: true,
   layout: oLayout9,
   formContainers:[
                   new sap.ui.layout.form.FormContainer({

                    formElements : [ new sap.ui.layout.form.FormElement({
                     fields : [ new sap.m.VBox({
                      items: [weatherLabel,weather_input]
                     }).addStyleClass("blockVBox") ]
                    })]
                   }), new sap.ui.layout.form.FormContainer({

                    formElements : [ new sap.ui.layout.form.FormElement({
                     fields : [ new sap.m.VBox({
                      items: [tempLabel,temp_input]
                     }).addStyleClass("blockVBox") ]
                    })]
                   }),

                   ]
  }).addStyleClass("formInput");
  this.row6 = row6;

  var oGeneralPanel = new sap.ui.commons.Panel("panelGeneral", {
   width : "95%",
   content : [ generalData_1 ]
  }).addStyleClass("notesLayout");
  oGeneralPanel.setTitle(new sap.ui.core.Title({
   icon : "sap-icon://activity-assigned-to-goal",
   text : "General Data"
  }));
  var saveUpdate =  new sap.m.Button({
   text : "",
   icon : "sap-icon://save",
   press : function(evt)
   {
    oController.approve(evt);
   }
  });
  this.saveUpdate = saveUpdate;

  var attachmentButtonFooter =  new sap.m.Button({
   text : "",
   icon : "sap-icon://attachment",
   press : function(evt){
    oController.addAttachmentsInitial(evt)
   },
  });
  this.attachmentButtonFooter = attachmentButtonFooter;

  var oMalfunction = new sap.ui.commons.Panel("panelMalfunction", {
   width : "95%",
   content : [ malfunctionData ]
  }).addStyleClass("notesLayout");
  oMalfunction.setTitle(new sap.ui.core.Title({
   icon : "sap-icon://collections-management",
   text : "Malfunction Data"
  }));
  oMalfunction.setCollapsed(true);
  var oAdditionalInfo = new sap.ui.commons.Panel("panelAdditionalInfo", {
   width : "95%",
   content : [ additionalInfo ]
  }).addStyleClass("notesLayout");
  oAdditionalInfo.setTitle(new sap.ui.core.Title({
   icon : "sap-icon://crm-service-manager",
   text : "Additional Information"
  }));
  oAdditionalInfo.setCollapsed(true);
  var pageCreateLabel = new sap.m.Label({
   text : ""
  }).addStyleClass("appTitle");
  this.pageCreateLabel = pageCreateLabel;

  var checkFaults = new sap.m.Button({
   text : "",
   icon : "sap-icon://open-folder",
   press : function(evt) {
    oController.getOpenNotifications();
   }
  });
  this.checkFaults = checkFaults;
  var backButton = new sap.m.Button({
   icon : "sap-icon://nav-back",
   text : "",
   press : function(evt) {
    oController.handleNavBack(evt)
   }
  });
  this.backButton = backButton;

  var searchButton = new sap.m.Button({
   icon : "sap-icon://search",
   press : function(evt)
   {
    oController.openSearchView();
   }
  });
  this.searchButton = searchButton;
  var cancelButton = new sap.m.Button({
   text : "Cancel",
   icon : "sap-icon://sys-cancel",
   press : function(evt) {
    oController.cancel(evt);
   }
  });
  this.cancelButton = cancelButton;

//  Changes for Version 1.2
  var Techdetail = new sap.m.Button({
   text : "Technical Findings",
   icon : "sap-icon://collapse-group",
   press : function(evt) {
    oController.expandTechDetail(evt);
   }
  });
  this.Techdetail = Techdetail;

  var damageLabel = new sap.m.Label({
   text: "Damage"});
  this.damgeLabel = damageLabel;

  var damage_inp = new sap.m.MultiInput("Damage",{
   layoutData : new sap.m.FlexItemData({
    styleClass : "textBox",

   }),
   showValueHelp: true,
   valueHelpOnly : true,
   editable : true,
   enabled : true,
   width: "100%",
   valueHelpRequest: function(evt) {
    oController.getCarAsset(evt,this);
   },
  })//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670
  this.damage_inp = damage_inp;

  var damageDescLabel = new sap.m.Label({
   text: "Damage - extra description"});
  this.damgeDescLabel = damageDescLabel;

  var damage_desc = new sap.m.Input("damageDesc",{
   enabled: true,
   maxLength: 40,
   value: "{/NAV_FAULT_DISPLAY_ITEMS.results.DText}",
  })//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670
  this.damage_desc = damage_desc;

  var causeLabel = new sap.m.Label({
   text: "Cause"});
  this.causeLabel = causeLabel;

  var cause_inp = new sap.m.MultiInput("Cause",{
   layoutData : new sap.m.FlexItemData({
    styleClass : "textBox",

   }),
   showValueHelp: true,
   valueHelpOnly : true,
   editable : true,
   enabled : true,
   value: "{/Zzcause}",
   valueHelpRequest: function(evt) {
    oController.getCarAsset(evt,this);
   },
  })//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670
  this.cause_inp = cause_inp

  var causeDescLabel = new sap.m.Label({
   text: "Cause - extra description"});
  this.causeDescLabel = causeDescLabel;

  var cause_desc = new sap.m.Input("causeDesc",{
   enabled: true,
   maxLength: 40,
   value: "{/Zzcausedesc}",
  })//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670
  this.cause_desc = cause_desc;

  var formCont = new sap.ui.layout.form.FormContainer("cont1",
    {

   formElements : [
//Start of fix by KONCHADS on 160616 for Defect # 11915
/*     new sap.ui.layout.form.FormElement({
       fields : [ new sap.m.VBox({
        width: "47%",
               items: [objLabel,obj_inp],
        }).addStyleClass("blockVBox")]
      }), */
//End of fix by KONCHADS on 160616 for Defect # 11915
new sap.ui.layout.form.FormElement({
 fields : [ new sap.m.VBox({
  width:"105%",
  items: [damageLabel,damage_inp]
 }).addStyleClass("blockVBox"),
 new sap.m.VBox({
  items: [damageDescLabel,damage_desc]
 }).addStyleClass("blockVBox")]}),

 new sap.ui.layout.form.FormElement({
  fields : [ new sap.m.VBox({
   width:"105%",
   items: [causeLabel,cause_inp]
  }).addStyleClass("blockVBox"),
  new sap.m.VBox({
   items: [causeDescLabel,cause_desc]
  }).addStyleClass("blockVBox")]}),
  ]
    });

  this.formCont = formCont;
  var oLayout12 = new sap.ui.layout.form.ResponsiveGridLayout("L12", {
   columnsL: 2,
   columnsM: 2,
  });
  var techDetBox = new sap.ui.layout.form.Form({
   editable : true,
   layoutData : new sap.m.FlexItemData({
   }),
   layout : oLayout12,
   formContainers : [  formCont]
  }).addStyleClass("formInput");

  this.techDetBox = techDetBox;

  var oLayout10 = new sap.ui.layout.form.ResponsiveGridLayout("L10", {
   columnsL: 1,
   columnsM: 1,
  });

  var actTable = new sap.m.Table({
   showNoData: false,
   width: "100%",
   columns: [ new sap.m.Column({//width:"20.5%", //Comment for defect 47849
    width: "46%", //Insert for Defect 47849
    header: new sap.m.Label({text: "Activity"}).addStyleClass("actLabel")}),
    new sap.m.Column({//width: "1.2%"}), // dummy column to provide gap //Comment for defect 47849
     width: "3%"}), // dummy column to provide gap //Insert for defect 47849

    new sap.m.Column({//width:"20.5%", //Comment for defect 47849
     width: "45%", //Insert for Defect 47849
     header: new sap.m.Label({text: "Description"}).addStyleClass("actLabel")}),
     new sap.m.Column({//width:"1.7%", //Comment for defect 47849
      width: "4%", //Insert for Defect 47849 
      header: new sap.m.Button({icon: "sap-icon://sys-add",
       press : function(evt) {
        oController.addActivity(evt);
       } }).addStyleClass("addButton")}),               
       ]
  }).addStyleClass("activityTable").addStyleClass("actTable").addStyleClass("actLabel");

  this.actTable = actTable;

  var actBox = new sap.ui.layout.form.Form({
   editable : true,
   layoutData : new sap.m.FlexItemData({
   }),
   layout : oLayout10,
   formContainers : [
                     new sap.ui.layout.form.FormContainer(
                       {

                        formElements : [
                                        new sap.ui.layout.form.FormElement({
                                         fields : [ actTable]
                                        }),
                                        ]
                       }),
                       ]
  }).addStyleClass("formInput");
  this.actBox = actBox;



//  End of changes

  var page1 =  new sap.m.Page({
   showNavButton: true,
   title:  "",
   enableScrolling: true,
   navButtonPress: function(evt){
    oController.handleNavBack(evt);
    //oController.navigateTo(this.data("prevPage"));
   },
   /*customHeader : new sap.m.Bar({
    contentLeft : [backBut;ton

    ],
    contentMiddle : [pageCreateLabel],
    contentRight: [
                   //searchButton
                   ]
   }),*/



   footer : new sap.m.Bar({

    contentLeft : [attachmentButtonFooter,checkFaults,Techdetail],
    contentRight : [
                    cancelButton,saveUpdate ]
   }),
   content : [generalData_1,carRow,row2,formHBox,additionalInfo, row3,row4, row6, techDetBox,actBox]

  }).addStyleClass("backGroundColor");

  this.NotifPage = page1;
  app.addPage(page1);

  return page1;

 }

});
