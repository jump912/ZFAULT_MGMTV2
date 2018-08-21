sap.ui.controller("fault_mgmt.TileHome", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.TileHome
*/
	onInit: function() {
		//// logic for notification coming from worklist app////
		//var notifNum = jQuery.sap.getUriParameters().get("queryFaultNo");
		//var fromQstr = jQuery.sap.getUriParameters().get("from");
		var componentData = this.getOwnerComponent().getComponentData();
		var paramData = componentData.startupParameters;
		var cleanURL = "";
		function getParamValue(paramName){
			var paramValue = "";
			if(paramData){
				paramValue = (paramData[paramName] ? (paramData[paramName].length > 0 ? paramData[paramName][0] : "") : "");
			}
			return paramValue;
		}
		function removeCustomQuery(uri, keyValue) {
		      var re = new RegExp("([&\?]"+ keyValue + "*$|" + keyValue + "&|[?&]" + keyValue + "(?=#))", "i"); 
		      cleanURL = uri.replace(re, '');
		      window.history.replaceState({}, document.title, cleanURL);
		}
		var notifNum = getParamValue("queryFaultNo");
		var fromQstr = getParamValue("from");
		if(notifNum){
			console.log("queryFaultNo="+notifNum);
			var uri = window.location.toString();
			var queryStrVal = "queryFaultNo="+notifNum;
			//removeCustomQuery(uri, queryStrVal);  --Defect 20047 by CHUNDS
			var appView = this.getView().getViewData();
			var app = appView.app;
			if (!app.getPage("createNotification")) {		
				var createNotification = sap.ui.view({id:"createNotification", viewName:"fault_mgmt.createNotification", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
				app.addDetailPage(createNotification);
				this.createNotification = createNotification;
			}
			else
			{
				this.createNotification = app.getPage("createNotification");
			}
			var controller = this.createNotification.oController;
			controller.fromWorklist = true ;
			this.createNotification.data("notifSelectedToMark",notifNum);
		    setInitialValidationRulesEnh(controller, notifNum, controller);
			//Hide Train Technician Dispatched control if navigated from Work List
			this.createNotification.trainHBox.setVisible(false); 
			this.createNotification.trainTechDispatch.setVisible(false); 
			this.createNotification.Techdetail.setIcon("sap-icon://expand-group");  //KADAMA20161020 39204+
			controller.openPriorityPopup(this.createNotification.priority_input, true);
			this.createNotification.reportPhase.setEnabled(true);	//KADAMA20161002 Insert for Defect 14670+
			this.createNotification.faultSource.setEnabled(true); //KADAMA20161002 Insert for Defect 14670+
			app.to("createNotification")
		}
		else if(fromQstr){
			if($.trim(fromQstr) === "TMP"){
				var uri = window.location.toString();
				var carNo = getParamValue("car");
				var setNo = getParamValue("set");
				var depoId = getParamValue("depoid");
				var depoName = getParamValue("depo");
				var inspType = getParamValue("inspType");
				var shiftName = getParamValue("shiftName");
				var taskId = getParamValue("taskId");
				var jobDetailselKey = getParamValue("selectedKey");
				var faultRepBy = "Technician";
				var reportPhase = "MAINTENANCE";
				var faultSource = "VOI";
				var queryStrVal = "from=TMP";
				uri = window.location.toString()
				removeCustomQuery(uri, queryStrVal);
				queryStrVal = "car="+carNo;
				uri = window.location.toString()
				removeCustomQuery(uri, queryStrVal);
				queryStrVal = "set="+setNo;
				uri = window.location.toString()
				removeCustomQuery(uri, queryStrVal);
				queryStrVal = "depoid="+depoId;
				uri = window.location.toString()
				removeCustomQuery(uri, queryStrVal);
				queryStrVal = "depo="+depoName;
				uri = window.location.toString()
				removeCustomQuery(uri, queryStrVal);
				var appView = this.getView().getViewData();
				var app = appView.app;
				if (!app.getPage("createNotification")) {		
					var createNotification = sap.ui.view({id:"createNotification", viewName:"fault_mgmt.createNotification", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
					app.addDetailPage(createNotification);
					this.createNotification = createNotification;
				}
				else
				{
					this.createNotification = app.getPage("createNotification");
				}
				var controller = this.createNotification.oController;
				controller.fromTMP = true;
				controller.carNo = carNo;
				controller.inspType = inspType;
				controller.shiftName = shiftName;
				controller.setNo = setNo;
				controller.taskId = taskId;
				controller.jobDetailselKey = jobDetailselKey;
				//controller.fromWorklist = true ;
				//this.createNotification.data("notifSelectedToMark",notifNum);
				// Set the default values
				var token = new sap.m.Token({ key: carNo, text:carNo});
				var carInput = this.createNotification.carInput;
				setTimeout(function(){ carInput.addToken(token)},10);
				this.createNotification.setNum.setValue(setNo);
				this.createNotification.faultRepBy.setValue(faultRepBy);
				this.createNotification.reportPhase.setValue(reportPhase);
				this.createNotification.reportPhase.data("value","MAIN");
				this.createNotification.location.setValue(depoName);
				this.createNotification.location.data("location",depoId);
				this.createNotification.faultSource.setValue(faultSource);
				this.createNotification.faultSource.data("value",faultSource);
				setInitialValidationRulesEnh(controller, "", controller);
				//Hide Train Technician Dispatched control if navigated from Work List/TMP
				this.createNotification.trainHBox.setVisible(false);
				this.createNotification.trainTechDispatch.setVisible(false);
				this.createNotification.attachmentButtonFooter.setVisible(false);
				controller.openPriorityPopup(this.createNotification.priority_input, true);
				this.createNotification.reportPhase.setEnabled(true);	//KADAMA20161002 Insert for Defect 14670+
				this.createNotification.faultSource.setEnabled(true); //KADAMA20161002 Insert for Defect 14670+
				app.to("createNotification");
			}
		}
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.TileHome
*/
//	onBeforeRendering: function() {
//
//	},
	navigateTo : function(destination){
		var appView = this.getView().getViewData();
		var app = appView.app;
		var prevPage = this.getView();
		switch (destination){
			case "prologuePage" : {
				if (!app.getPage("prologuePage")) {
					var prologuePage = sap.ui.view({id:"prologuePage", viewName:"fault_mgmt.prologuePage", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
					app.addDetailPage(prologuePage);
					this.prologuePage = prologuePage;
				}
				this.prologuePage.data("prevPage",prevPage);
				app.toDetail("prologuePage");
				break;
			}
			case "createNotification" : {
				if (!app.getPage("createNotification")) {
					var createNotification = sap.ui.view({id:"createNotification", viewName:"fault_mgmt.createNotification", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
					app.addDetailPage(createNotification);
					this.createNotification = createNotification;
				}
				var notifController = app.getPage("createNotification").oController;
				setInitialValidationRules(notifController);
				// Get the last updated/created fault's your location and fault source
				//if($.trim(destination.data("notifNum")).length <= 0)
				//{
					getLastFaultDetails(notifController.setDefaults, notifController);
				//}
				this.createNotification.data("prevPage",prevPage);
				this.createNotification.reportPhase.setEnabled(true);	//KADAMA20161002 Insert for Defect 14670+
				this.createNotification.faultSource.setEnabled(true); //KADAMA20161002 Insert for Defect 14670+
				app.toDetail("createNotification");
				break;
			}
			case "searchFault" : {
				if (!app.getPage("searchFault")) {
					var searchFault = sap.ui.view({id:"searchFault", viewName:"fault_mgmt.searchFault", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
					app.addDetailPage(searchFault);
					this.searchFault = searchFault;
				}
				this.searchFault.data("prevPage",prevPage);
				app.toDetail("searchFault");
				break;
			}			
		}
	}
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.TileHome
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.TileHome
*/
//	onExit: function() {
//
//	}

});