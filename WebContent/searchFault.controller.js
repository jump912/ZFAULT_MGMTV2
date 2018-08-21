sap.ui.controller("fault_mgmt.searchFault", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.searchFault
*/
	handleNavBack : function(){
        var appView = this.getView().getViewData();
        var app = appView.app;	         
        //app.to(this.getView().data("prevPage"));
        window.location.reload();
  },
  
  hideViewFields : function(evt)
  {
	  if(this.getView().advSearch.getText() == "Advanced Search" )
		  {
		  this.getView().row5.setVisible(true);	
		  this.getView().row6.setVisible(true);
		  this.getView().advSearch.setText("Hide Advanced Search");
		  }
	  else if(this.getView().advSearch.getText() == "Hide Advanced Search")
		  {
		  this.getView().row5.setVisible(false);	
		  this.getView().row6.setVisible(false);
		  this.getView().advSearch.setText("Advanced Search");
		  }
  },
  chooseCarNumber : function(evt) {
		var appView = this.getView().getViewData();
		var app = appView.app;
		var source = evt.getSource();
		var prevPage = this.getView();
		prevPage.source = source;
		var setNum = this.getView().setNum.getValue();
		// navigation to car number view
		if (!app.getPage("carNumber")) {
			var page = sap.ui.view({
				id : "carNumber",
				viewName : "fault_mgmt.carNumber",
				type : sap.ui.core.mvc.ViewType.JS,
				viewData : appView

			});
			app.addPage(page);
			this.page = page;
		} else {
			this.page = app.getPage("carNumber");
		}
		this.page.searchInput.setValue(setNum); //setting the set number value to the search input
		this.page.data("multiFlag",false) // Fix by KONCHADS for defect # 11915
		this.page.data("prevPage",prevPage);
		var controller  =this.page.oController;
		getCarList(setNum,controller.getData,controller);  
		app.to("carNumber");
	},
	chooseSetNumber : function(evt) {
		var appView = this.getView().getViewData();
		var app = appView.app;
		
		var source = evt.getSource();
		var prevPage = this.getView();
		prevPage.source = source;
		var setnum = this.getView().setNum.getValue(); //getting the entered or auto populated set number
		// navigation to set number view
		if (!app.getPage("setNumber")) {
			var page = sap.ui.view({
				id : "setNumber",
				viewName : "fault_mgmt.setNumber",
				type : sap.ui.core.mvc.ViewType.JS,
				viewData : appView

			});
			app.addPage(page);
			this.page = page;
		} else {
			this.page = app.getPage("setNumber");
		}
		this.page.searchInput.setValue(setnum);
		this.page.data("prevPage",prevPage);
		var controller  =this.page.oController;			
		getSetList(setnum,controller.getData,controller);
		app.to("setNumber");
	},
	chooseAsset : function(evt, source) {
		var appView = this.getView().getViewData();
		var app = appView.app;
		var source = evt.getSource();
		var prevPage = this.getView();
		prevPage.source = source;

	if (source.data("valid")) {

		// navigation to asset view
		if (!app.getPage("asset")) {
			var page = sap.ui.view({
				id : "asset",
				viewName : "fault_mgmt.asset",
				type : sap.ui.core.mvc.ViewType.JS,
				viewData : appView
			});
			app.addPage(page);
			this.page = page;
		} else {
			this.page = app.getPage("asset");
		}
		this.page.data("prevPage",prevPage);

		app.to("asset");
	} else {
		this.ValidateChangeCarNum();

	}
},
chooseSymptom : function(evt) {
	var appView = this.getView().getViewData();
	var app = appView.app;
	var source = evt.getSource();
	var prevPage = this.getView();
	prevPage.source = source;
	
	// navigation to Symptom view
	if (!app.getPage("symptom")) {
		var page = sap.ui.view({
			id : "symptom",
			viewName : "fault_mgmt.symptom",
			type : sap.ui.core.mvc.ViewType.JS,
			viewData : appView

		});
		app.addPage(page);
		this.page = page;
		
	} else {
		this.page = app.getPage("symptom");
	}
	
	this.page.data("prevPage",prevPage);
		
	app.to("symptom");
},
chooseLocation : function(evt,source)
{
	var appView = this.getView().getViewData();
	var app = appView.app;
	var source = evt.getSource();
	var prevPage = this.getView();
	prevPage.source = source;
	
	if (!app.getPage("location")) {
		var page = sap.ui.view({
			id : "location",
			viewName : "fault_mgmt.location",
			type : sap.ui.core.mvc.ViewType.JS,
			viewData : appView

		});
		app.addPage(page);
		app.getPage("location").data("app",app);
		this.page = page;
	} else {
		this.page = app.getPage("location");
	}
	this.page.data("prevPage",prevPage);
	app.to("location");
},
getSearchResults : function(evt,oModel)
{
	var appView = this.getView().getViewData();
	var app = appView.app;
	
	var prevPage = this.getView();
	if (!app.getPage("searchResults")) {
		var page = sap.ui.view({
			id : "searchResults",
			viewName : "fault_mgmt.searchResults",
			type : sap.ui.core.mvc.ViewType.JS,
			viewData : appView

		});
		app.addPage(page);
		app.getPage("searchResults").data("app",app);
		this.page = page;
	} else {
		this.page = app.getPage("searchResults");
	}
	this.page.oController.getSearchList(oModel);
	this.page.data("prevPage",prevPage);
	app.to("searchResults");
},
openPriorityPopup : function(source){
	
	this.source = source;
	var controller = this;
	if (!source.list) {

		var list = new sap.m.ResponsivePopover({
			placement : sap.m.PlacementType.Right,
			title : "Select Priority",
			content : [],
			width : "200px",
			height : "300px",
			styleClass : "faultPopup"
		});
		source.list = list;
        var oModel = getPrioList(''); // C - Create / Update Mode and S or blank for Search
		var optionList = new sap.m.List({
			mode : sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection : true,
			select : function(evt,source) {
				controller.selectValue(evt);
			},
			width : "100%",
			height : "100%"
		});
		this.priorityList = optionList;
        optionList.setModel(oModel);
        var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
        oDataTemplate.bindProperty("value", "Zzpriok"); //code for priority
        var listDesc =  new sap.m.StandardListItem({
        	title : {
				parts :[{path : "Zzpriok"} , {path : "Zzpriokx"}],
				formatter : function(Zzpriok,Zzpriokx){
					if(Zzpriok&&Zzpriokx)
					{
				return Zzpriok +" - "+Zzpriokx;
					}
				else if(Zzpriok)
					{
					return Zzpriok;
					}
				else if(Zzpriokx)
					{
					return Zzpriokx;
					}
				}
			},
            });
        listDesc.addCustomData(oDataTemplate);
        optionList.bindItems("/listitems",listDesc); //adding model data to list
       
		source.list.addContent(optionList);

	}
	source.list.openBy(source);
},
openSectorPopup : function(source){
	
	this.source = source;
	var controller = this;
	if (!source.list) {

		var list = new sap.m.ResponsivePopover({
			placement : sap.m.PlacementType.Left,
			title : "Select Sector",
			content : [],
			width : "400px",
			height : "300px",
			styleClass : "faultPopup"
		});
		source.list = list;
        var oModel = getSectorList();
		var optionList = new sap.m.List({
			mode : sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection : true,
			select : function(evt,source) {
				controller.selectValue(evt);
			},
			width : "100%",
			height : "100%"
		});
		this.sectorList = optionList;
        optionList.setModel(oModel);
        var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
        oDataTemplate.bindProperty("value", "Beber"); //code for priority
        var listDesc =  new sap.m.StandardListItem({
        	title : {
				parts :[{path : "Beber"} , {path : "Fing"}],
				formatter : function(Beber,Fing){
					if(Beber&&Fing)
					{
				return Beber +" - "+Fing;
					}
				else if(Beber)
					{
					return Beber;
					}
				else if(Fing)
					{
					return Fing;
					}
				}
			},
            });
        listDesc.addCustomData(oDataTemplate);
        optionList.bindItems("/listitems",listDesc); //adding model data to list
       
		source.list.addContent(optionList);

	}
	source.list.openBy(source);
},
ValidateChangeCarNum :function(){
	var newValue = this.getView().carInput.getValue();
	getSetNumber(newValue,this.CarValidationSucess,this);
},
CarValidationSucess :function(data){
	var setNum = data.d.results[0].NAV_CARSET.EvSetid;
	var setId = this.getView().setNum.getValue();
	var carinp= this.getView().carInput;
	var setInp = this.getView().setNum;
	var appView = this.getView().getViewData();
	var app = appView.app;
	var prevPage = this.getView();
	if (setNum == ""){
		this.getView().carInput.setValueState("Error");
		this.getView().carInput.setValueStateText("Please provide valid Car Number");
		this.getView().asset.data("valid",false);
		}
	else{
		if(setId != ""){
		if(setId == setNum){		
		this.getView().carInput.setValueState("Success"); 
		this.getView().setNum.setValueState("Success"); 
		this.getView().data("setNum",setNum);
		this.getView().asset.data("valid",true);
		if (!app.getPage("asset")) {
			var page = sap.ui.view({
				id : "asset",
				viewName : "fault_mgmt.asset",
				type : sap.ui.core.mvc.ViewType.JS,
				viewData : appView
			});
			app.addPage(page);
			this.page = page;
		} else {
			this.page = app.getPage("asset");
		}
		this.page.data("prevPage",prevPage);

		app.to("asset");
	}
		else{
			 jQuery.sap.require("sap.m.MessageBox");
	   		 sap.m.MessageBox.show(
	   				 "Car number doesnt match Set,Please Try Again", {
					          icon: sap.m.MessageBox.Icon.ERROR,
					          title: "ERROR",
					          actions: [sap.m.MessageBox.Action.OK],
					          onClose: function(oAction) { 
					        	  if(oAction == "OK"){
					        		  carinp.setValueState("Error");
					        		  setInp.setValueState("Error");
					          } },
					          styleClass: "faultMsgBox"
					      }
					    );
	   		this.getView().asset.data("valid",false);
		}
	}
		else {
			jQuery.sap.require("sap.m.MessageBox");
	   		 sap.m.MessageBox.show(
	   				 "Car number belongs to Set "+setNum, {
					          icon: sap.m.MessageBox.Icon.INFORMATION,
					          title: "Information",
					          actions: [sap.m.MessageBox.Action.OK],
					          onClose: function(oAction) { 
					        	  if(oAction == "OK"){
					        		  setInp.setValue(setNum);
					        		  carinp.setValueState("Success"); 
					        		  setInp.setValueState("Success");
					        	 
					          } },
					          styleClass: "faultMsgBox"
					      }
					    );
			
			
		}
	}
},
openFaultPopup : function(source) {

	this.source = source;
	var controller = this;
	if (!source.list) {

		var list = new sap.m.ResponsivePopover({
			placement : sap.m.PlacementType.Right,
			title : "Select Fault Source",
			content : [],
			width : "400px",
			height : "300px",
			styleClass : "faultPopup"
		});
		source.list = list;

		var optionList = new sap.m.List({
			mode : sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection : true,
			select : function(evt, source) {
				controller.selectValue(evt);
			},
			width : "100%",
			height : "100%"
		});


		source.list.addContent(optionList);
		getFaultSources(optionList);

	}
	source.list.openBy(source);
},
openReportPhasePopup : function(source) {

	this.source = source;
	var controller = this;
	if (!source.list) {

		var list = new sap.m.ResponsivePopover({
			placement : sap.m.PlacementType.Right,
			title : "Chooose Report Phase",
			content : [],
			width : "200px",
			height : "300px",
			styleClass : "faultPopup"
		});
		source.list = list;

		var optionList = new sap.m.List({
			mode : sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection : true,
			select : function(evt, source) {
				controller.selectValue(evt)
			},
			items : [],
			width : "100%",
			height : "100%"
		});
		source.list.addContent(optionList);
		getReportPhase(optionList);
	}
	source.list.openBy(source);
},
selectValue : function(Evt) {
	this.source.setValue(Evt.getParameters().listItem.getTitle());
	this.source.data("value",Evt.getParameters().listItem.data("code"));
	this.source.list.close();
	
	
},
clearSearch : function(evt)
{
	var aModel = new sap.ui.model.json.JSONModel();
	this.getView().faultResponse.setModel(aModel);
	this.getView().fromDateTime.setValue("");
	this.getView().toDateTime.setValue("");
	this.getView().faultNum.setValue("");
	this.getView().IIMSNum.setValue("");
	this.getView().malDateTime.setValue("");
	this.getView().status.setValue("");
	this.getView().auditNum.setValue("");
	this.getView().tripNum.setValue("");
	this.getView().carInput.setValue("");
	this.getView().setNum.setValue("");
	this.getView().asset.setValue("");
	this.getView().symptom.setValue("");
	this.getView().priority_input.setValue("");
	this.getView().location.setValue("");
	this.getView().fault_input.setValue("");
	this.getView().reportPhase.setValue("");
	this.getView().sector.setValue("");
	
},
searchFaults : function(evt)
{
	var appView = this.getView().getViewData();
	var app = appView.app;
	var notifNum = "";
	var createNotifPage = app.getPage("createNotification");
	if(createNotifPage){
		notifNum = createNotifPage.data("notifNum");
		if (notifNum == null)
		{
			notifNum = "";
		}
	}

	var data = {}; //data object
	data.d = {};
	var farr =  this.getView().faultResponse.getSelectedKeys();
	var len  = farr.length;
	                                                var arrdata = "";
	                                                for(var i= 0;i<len;i++){
	                                                arrdata = arrdata +","+farr[i];
	                                                
	                                                    }
 var faultRes = arrdata.substring(1); 	                                                
 var fromDate = new Date(this.getView().fromDateTime.getDateValue());
 var TZOffsetMs = new Date(0).getTimezoneOffset()*60*1000;
 var x = new Date(fromDate.getTime() - TZOffsetMs);
 var fMilli = x.getTime();
 var toDate = new Date(this.getView().toDateTime.getDateValue());
 var y = new Date(toDate.getTime() - TZOffsetMs);
 var toMilli = y.getTime();
 var malDateTime = new Date(this.getView().malDateTime.getDateValue());
 var z = new Date(malDateTime.getTime() - TZOffsetMs);
 var malTimeMilli = z.getTime();
 var hour = malDateTime.getHours(); // get hours from the date value
 var minutes = malDateTime.getMinutes(); //get minutes from the date value
 var seconds = malDateTime.getSeconds(); //get seconds from the date value
 if(this.getView().fromDateTime.getValue() == "")
	 {
	 data.d.ZzdateFrom = null;
	 }
 else
	 {
	 data.d.ZzdateFrom = "\\/Date("+fMilli+")\\/";
	 }
 if(this.getView().toDateTime.getValue() == "")
 {
 data.d.ZzdateTo = null;
 }
 else
	 {
	 data.d.ZzdateTo = "\\/Date("+toMilli+")\\/";
	  }
 data.d.ZzfaultNo = this.getView().faultNum.getValue();
 //data.d.ZziimsNo = this.getView().IIMSNum.getValue();
 //Changed zziimsno to Zzincdailynum as part of ENH 8230
 data.d.Zzincdailynum = this.getView().IIMSNum.getValue();
 if((this.getView().IIMSNum.getValue()) != "")
	 {
	 if((this.getView().malDateTime.getValue() == ""))
		 {
	 this.incidentCheck = false;
		 }
	 else
		 {
	 this.incidentCheck = true;
	 this.getView().malDateTime.setValueState("Success");
		 }
	 } 
 if(this.getView().malDateTime.getValue() == "")
 {
 data.d.ZziimsDate = null;
 data.d.ZziimsTime = "PT00H00M00S";
 }
 else
	 {
	 data.d.ZziimsDate = "\\/Date("+malTimeMilli+")\\/";
	 //data.d.ZziimsTime = "PT"+hour+"H"+minutes+"M"+seconds+"S";
	//Changed Datetime to Date as part of ENH 8230
	 data.d.ZziimsTime = "PT00H00M00S";
	 }
 
 data.d.Zzstatus = this.getView().status.getValue();
 data.d.ZzauditNo = this.getView().auditNum.getValue();
 data.d.ZztripNo = this.getView().tripNum.getValue();
 data.d.Zzcarid = this.getView().carInput.getValue();
 data.d.Zzsetid = this.getView().setNum.getValue();
 data.d.Zzasset = this.getView().asset.getValue();
 if (this.getView().symptom.getValue() == "")
	 {
	 data.d.ZzsympCode = ""; 
	 data.d.ZzsympCg = "";
	 }
 else{
 data.d.ZzsympCode = this.getView().data("symptomCode");
 data.d.ZzsympCg = this.getView().data("symptomGroup");
 }
 if(this.getView().priority_input.getValue() == "")
	 {
	 data.d.Zzpriority ="";
	 }
 else
	 {
	 data.d.Zzpriority = this.getView().priority_input.data().value;
	 }
 if(this.getView().location.getValue() == "")
	 {
	 data.d.Zzlocation = "";
	 }
 else
	 {
 data.d.Zzlocation = this.getView().data("location");
	 }
 if(this.getView().fault_input.getValue() == "")
	 {
	 data.d.ZzfaultSrc = "";
	 }
 else
	 {
	 data.d.ZzfaultSrc = this.getView().fault_input.data().value; 
	 }
 if(this.getView().reportPhase.getValue() == "")
	 {
 data.d.ZzreportPhase = ""; 
	 }
 else
	 {
 data.d.ZzreportPhase = this.getView().reportPhase.data().value;  
	 }
 if(this.getView().sector.getValue() == "")
 {
 data.d.ZzsectorCode ="";
 }
else
 {
 data.d.ZzsectorCode = this.getView().sector.data().value;
 }
 data.d.ZzfaultResponse = faultRes;
 data.d.ZzcurrentNotif = "";
 data.d.NAV_OPEN_NOTIF_LIST = [];
 if(this.incidentCheck)
	 {
 var oModel = searchFaults(data,this);
	 }
 else
	 {
	 var controller = this;
	 jQuery.sap.require("sap.m.MessageBox");
		 sap.m.MessageBox.show(
				 "Highlighted field cannot be blank", {
			          icon: sap.m.MessageBox.Icon.ERROR,
			          title: "VALIDATION",
			          actions: [sap.m.MessageBox.Action.OK],
			          onClose: function(oAction) { 
			        	  if(oAction == "OK"){
			        		  controller.getView().malDateTime.setValueState("Error");
			        		  controller.getView().malDateTime.setValueStateText("Please specify Incident Notified Date/Time");
			          } },
			          styleClass: "faultMsgBox"
			      }
			    );
	 }
 
},

  
onInit: function() {
	var appView = this.getView().getViewData();
    var app = appView.app;
	var bData = {
			listitems:[
			           		{
								key : "FFDC",
								text : "Fixed During Call",

							}, {
								key : "FCTO",
								text : "Cut Out",

							}, {
								key : "FFTR",
								text : "Fixed in Traffic",

							}, {
								key : "FNBF",
								text : "Non-Blocked Fault",

							}, {
								key : "FTDP",
								text : "Technician Dispatched",

							},
]
};
	this.getView().row5.setVisible(false);	
	this.getView().row6.setVisible(false);
	this.getView().advSearch.setText("Advanced Search");
	var bModel = new sap.ui.model.json.JSONModel(bData);
	this.getView().faultResponse.setModel(bModel);
	var appView = this.getView().getViewData();
    var app = appView.app;	
    var car = "";
    var set = "";
    /*if(app.getPage("createNotification").carInput.getTokens().length == 1){
     car = app.getPage("createNotification").carInput.getTokens()[0].getKey();
    }
    set = app.getPage("createNotification").setNum.getValue();*/
    this.getView().carInput.setValue(car);
    this.getView().setNum.setValue(set);
    this.incidentCheck = true;
    
},


/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.searchFault
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.searchFault
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.searchFault
*/
//	onExit: function() {
//
//	}

});