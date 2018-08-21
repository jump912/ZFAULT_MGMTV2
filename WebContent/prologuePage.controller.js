sap.ui.controller("fault_mgmt.prologuePage", {
	handleNavBack : function(){
        var appView = this.getView().getViewData();
        var app = appView.app;	  
        window.location.reload();
	},
	validateBeforeNavigate: function (evt){
		var setNum = this.getView().setNum.getValue().toUpperCase();
		this.getView().data("setNum",setNum);
		var carNum = this.getView().carInput.getValue();
		// Check Car & Set numbers entered or not Defect 6552
		if($.trim(carNum).length <= 0 || $.trim(setNum).length <= 0)
		{	
			jQuery.sap.require("sap.m.MessageBox");
			var mandtMsg = "";
			if($.trim(carNum).length <= 0 && $.trim(setNum).length <= 0)
			{	
				this.getView().carInput.setValueState("Error");
				this.getView().setNum.setValueState("Error");
				mandtMsg = "Car and Set Numbers are required";
			}
			else if($.trim(carNum).length <= 0)
			{	
				this.getView().carInput.setValueState("Error");
				this.getView().setNum.setValueState("Success");
				mandtMsg = "Car Number is required";
			}
			else if($.trim(setNum).length <= 0)
			{	
				this.getView().setNum.setValueState("Error");
				this.getView().carInput.setValueState("Success");
				mandtMsg = "Set Number is required";
			}
			
  		  
	   		 sap.m.MessageBox.show(
	   				 mandtMsg, {
					          icon: sap.m.MessageBox.Icon.ERROR,
					          title: "ERROR",
					          actions: [sap.m.MessageBox.Action.OK],
					          onClose: function(oAction) { 
					          },
					          styleClass: "faultMsgBox"
					      }
					    );
			return;
		}
		// End defect 6552
		
		if (carNum){
			getSetNumber(carNum,this.setCarValidationSucess,this);
		}
		else{
		if(setNum == "" || setNum == null ){
			this.getView().setNum.setValueState("Error");
			this.getView().setNum.setValueStateText("Please provide valid Set Number");
		}
		else{
		validateSetNum(setNum,this.toCreateNotif,this);
		
		}
		}
	},
		
	setCarValidationSucess:function(data){
		var carinp= this.getView().carInput;
		var setInp = this.getView().setNum;
		var setNum = this.getView().setNum.getValue().toUpperCase();
		var setId= data.d.results[0].NAV_CARSET.EvSetid;
		if(setNum){
		if(setId == setNum){
			///proceed to create notification
			this.toCreateNotif(data)
			
		}
		else{
			jQuery.sap.require("sap.m.MessageBox");
	   		 sap.m.MessageBox.show(
	   				 "Car number does not match the Set number. Please try again", {
					          icon: sap.m.MessageBox.Icon.ERROR,
					          title: "ERROR",
					          actions: [sap.m.MessageBox.Action.OK],
					          onClose: function(oAction) { 
					        	  if(oAction == "OK"){
					        	  ///url redirection for legecy
					        		  carinp.setValueState("Error");
					        		  setInp.setValueState("Error");
					          } },
					          styleClass: "faultMsgBox"
					      }
					    );
			
		}
		}
		
	},
	
	
	toCreateNotif :function (data){
		
		var appView = this.getView().getViewData();
		var app = appView.app;
		var setNum = this.getView().data("setNum");
		var setId= data.d.results[0].NAV_CARSET.EvSetid;
		var url = this.getView().data("url");
		var carNum = this.getView().carInput.getValue();
		var prevPage = this.getView();
		
		var token = new sap.m.Token({ key: carNum, text:carNum});
		if (setNum == setId){ 
			//console.log ("Valid Match")
		if (!app.getPage("createNotification")) {		
		var createNotification = sap.ui.view({id:"createNotification", viewName:"fault_mgmt.createNotification", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
		app.addDetailPage(createNotification);
		this.createNotification = createNotification;
		}
		else
			{
			this.createNotification = app.getPage("createNotification");
			}
			
			
			
		if(token.getKey()){
			this.createNotification.carInput.destroyTokens();
			this.createNotification.carInput.addToken(token);
			this.createNotification.data("carToken",token.getKey());
		}
		setNum = this.getView().setNum.getValue().toUpperCase();
		this.createNotification.setNum.setValue(setNum);
		//Start of change - Monish - 72552 - 14/09/2017
		var trip = "";
		var date = new Date();
		var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
		var z = new Date(date.getTime() - TZOffsetMs);
		var x = z.toISOString();
		var y = x.split("T");
		var dateNow = y[0]+"T00:00:00";
		var hour = date.getHours(); // get hours from the date value
		var minutes = date.getMinutes(); //get minutes from the date value
		var seconds = date.getSeconds(); //get seconds from the date value
		if(seconds<10)
		  {
		   seconds = "0"+seconds;
		  }				
		var time = "PT"+hour+"H"+minutes+"M"+seconds+"S";
		getTripDetails(trip,setNum,dateNow,time,this.createNotification.oController.getTripData,this.createNotification.oController);
		//End of change - Monish - 72552 - 14/09/2017
		//NARASIMB --- Defect 9950. 
		/*if a Set is a Waratah / Millennium (i.e. Set Number starts with 'A' or 'M') then Object Part must be mandatory. 
		 * This is important because of the implications on the RelianceRail and Clyman interfaces when sending faults to
		 * these 3rd parties.*/
		this.createNotification.oController.determineObjPartMandatory(setNum);
		/*if(setNum.indexOf(0,1) === "A" || setNum.indexOf(0,1) === "M"){
			this.createNotification.objLabel.setRequired(true);
			this.createNotification.mandatory.push(this.createNotification.obj_inp);
		}
		else
		{
			this.createNotification.objLabel.setRequired(false);
			//remove the mandatory entry if exists
			var fldsMandatory = this.createNotification.mandatory;
			for(var i=0; i<fldsMandatory.length;i++){
				if(fldsMandatory[i].getId() === this.createNotification.obj_inp.getId())
				{	
					fldsMandatory.splice(i,1)
					break;
				}
			}
		}*/
		
		this.createNotification.data("prevPage",prevPage);
		var notifController = this.createNotification.oController;
		// Get the last updated/created fault's your location and fault source
		//if($.trim(destination.data("notifNum")).length <= 0)
		//{
			getLastFaultDetails(notifController.setDefaults, notifController);
		//}

			this.createNotification.reportPhase.setEnabled(true);	//KADAMA20161028 Insert for Defect 14670+
			this.createNotification.faultSource.setEnabled(true); //KADAMA20161028 Insert for Defect 14670+
			validateSetAM(notifController.setFaultPositionMandatory, notifController, setNum);	//Insert for Defect 15697 KADAMA20161012
			app.to("createNotification")
		}
		else{
			jQuery.sap.require("sap.m.MessageBox");
   		 sap.m.MessageBox.show(
   				 "No match found.  Re-direct to the FMBS application on ICFMS Portal?", {
				          icon: sap.m.MessageBox.Icon.WARNING,
				          title: "INFORMATION",
				          actions: [sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
				          onClose: function(oAction) { 
				        	  if(oAction == "OK"){
				        		  window.open( url,"_blank");
				        		//  sap.m.URLHelper.redirect(url,false);
				        	  ///url redirection for legecy
				        	  
				          } },
				          styleClass: "faultMsgBox"
				      }
				    );
		}
		
	},
	
	chooseCarNumber : function(evt) {
		var appView = this.getView().getViewData();
		var app = appView.app;
		
		var source = evt.getSource();
		var prevPage = this.getView();
		prevPage.source = source;
		var carnum = this.getView().carInput.getValue(); //to get the value entered by the user
		var setNum = this.getView().setNum.getValue();
		var prevPage = this.getView();
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
		this.page.data("prevPage",prevPage);
		this.page.data("multiFlag",false);// Version 1.4
		var controller  =this.page.oController;
		 getCarList(setNum,controller.getData,controller);
		 this.page.searchInput.setValue(setNum);
		
		
		/*if((setNum!="")&&(setNum.indexOf('*') === -1)){
		 getCarList(setNum,controller.getData,controller);  
		 this.page.searchInput.setValue(setNum); //setting the set number value to the search input
		}
		else
		{
		setNum = "-";;
		getCarList(setNum,controller.getData,controller);
		this.page.searchInput.setValue("");
		
		}*/
		
		app.to("carNumber");
	},
	chooseSetNumber : function(evt) {
		
		var appView = this.getView().getViewData();
		var app = appView.app;
		
		var source = evt.getSource();
		var prevPage = this.getView();
		prevPage.source = source;
		var setNum = this.getView().setNum.getValue(); //getting the entered or auto populated set number
		// navigation to set number view
		var setNumber = app.getPage("setNumber");
		if (setNumber === null) {
		
			setNumber = sap.ui.view({
				id : "setNumber",
				viewName : "fault_mgmt.setNumber",
				type : "JS",
				viewData : appView,
			});
			app.addDetailPage(setNumber);
			this.setNumber = setNumber;
		} else {
			this.setNumber = app.getPage("setNumber");
		}
		this.setNumber.data("prevPage",prevPage);
		var controller  =this.setNumber.oController;
		this.setNumber.searchInput.setValue(setNum);
		getSetList(setNum,controller.getData,controller);
		
		
		/*if((setNum!="")&&(setNum.indexOf('*') === -1)){
		this.setNumber.searchInput.setValue(setNum);
		getSetList(setNum,controller.getData,controller);
		}
		else
			{
			setNum = "-";;
			getSetList(setNum,controller.getData,controller);
			this.setNumber.searchInput.setValue("");
			
			}*/
		
		app.to("setNumber");
	},
	CarValidationSucess :function(data){
		var setNum = data.d.results[0].NAV_CARSET.EvSetid;
		var setId = this.getView().setNum.getValue().toUpperCase();
		var carinp= this.getView().carInput;
		var setInp = this.getView().setNum;
		var url = this.getView().data("url");
		if (setNum == ""){
			jQuery.sap.require("sap.m.MessageBox");
			 sap.m.MessageBox.show(
	   				 "No match found.  Re-direct to the FMBS application on ICFMS Portal?", {
					          icon: sap.m.MessageBox.Icon.WARNING,
					          title: "INFORMATION",
					          actions: [sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
					          onClose: function(oAction) { 
					        	  if(oAction == "OK"){
					        		  window.open( url,"_blank");
					        		//  sap.m.URLHelper.redirect(url,false);
					        	  ///url redirection for legecy
					        	  
					          } },
					          styleClass: "faultMsgBox"
					      }
					    );
			/*this.getView().carInput.setValueState("Error");
			this.getView().carInput.setValueStateText("Please provide valid Car Number");*/
		}
		else{
			if(setId != ""){
			if(setId == setNum){		
			this.getView().carInput.setValueState("Success"); 
			this.getView().setNum.setValueState("Success"); 
			this.getView().data("setNum",setNum);
		}
			else{
				 jQuery.sap.require("sap.m.MessageBox");
		   		 sap.m.MessageBox.show(
		   				 "Car number does not match the Set Number. Please try again", {
						          icon: sap.m.MessageBox.Icon.ERROR,
						          title: "ERROR",
						          actions: [sap.m.MessageBox.Action.OK],
						          onClose: function(oAction) { 
						        	  if(oAction == "OK"){
						        	  ///url redirection for legecy
						        		  carinp.setValueState("Error");
						        		  setInp.setValueState("Error");
						          } },
						          styleClass: "faultMsgBox"
						      }
						    );
			}
		}
			else {
				
				
				setInp.setValue(setNum);
      		  carinp.setValueState("Success"); 
      		  setInp.setValueState("Success");
				
				
			}
		}
		
		
	},
	ValidateChangeSetNum : function(){
		var setNum = this.getView().setNum.getValue();
		if(setNum == "" || setNum == null ){
			this.getView().setNum.setValueState("Error");
			this.getView().setNum.setValueStateText("Please provide valid Set Number");
			this.getView().carInput.setValue("");
		}
		else{
			this.getView().carInput.setValue("");
		validateSetNum(setNum,this.SetValidationSucess,this)
		}
	},
SetValidationSucess: function(data){
	var setId= data.d.results[0].NAV_CARSET.EvSetid;
	if(setId == ""){
		this.getView().setNum.setValueState("Error");
		this.getView().setNum.setValueStateText("Please provide valid Set Number");
		this.getView().setNum.setValue("");
	}
	else{
		this.getView().setNum.setValueState("Success");
		this.getView().setNum.setValueStateText("Valid Set Number");
		
	}
	
},
	
ValidateChangeCarNum :function(){
		var newValue = this.getView().carInput.getValue();
		if($.trim(newValue).length > 0)
			getSetNumber(newValue,this.CarValidationSucess,this);
	}	,
	

	


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.prologuePage
*/
	onInit: function() {
		
		//// logic for notification coming from worklist app////
		var Procontroller = this;
		
		
		
		
		/// bala block  start///
		var notifNum = jQuery.sap.getUriParameters().get("queryFaultNo");
		if(notifNum){
		console.log("queryFaultNo="+notifNum);
	//	setInitialValidationRules(Procontroller);
		var uri = window.location.toString();
		function removeCustomQuery(uri, keyValue) {
		      var re = new RegExp("([&\?]"+ keyValue + "*$|" + keyValue + "&|[?&]" + keyValue + "(?=#))", "i"); 
		      var cleanURL = uri.replace(re, '');
		      window.history.replaceState({}, document.title, cleanURL);
		    }

		var queryStrVal = "queryFaultNo="+notifNum;
		removeCustomQuery(uri, queryStrVal);
		var appView = this.getView().getViewData();
		var app = appView.app;
			//console.log ("Valid Match")
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
	//	setInitialValidationRules(controller);
		
		setInitialValidationRulesEnh(controller, notifNum, controller);
		    
		//Hide Train Technician Dispatched control if navigated from Work List
		this.createNotification.trainHBox.setVisible(false);
		this.createNotification.trainTechDispatch.setVisible(false);

		this.createNotification.reportPhase.setEnabled(true);	//KADAMA20161028 Insert for Defect 14670+
		this.createNotification.faultSource.setEnabled(true); //KADAMA20161028 Insert for Defect 14670+
		app.to("createNotification")
		//getFaultDetails(notifNum,controller.faultDetails,controller);
		
		
		/// bala block  end ///
		}
		
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.prologuePage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.prologuePage
*/
	onAfterRendering: function() {
		var controller = this;
		setInitialValidationRules(controller);
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.prologuePage
*/
//	onExit: function() {
//
//	}

});