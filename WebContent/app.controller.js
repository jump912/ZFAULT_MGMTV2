sap.ui.controller("fault_mgmt.app", {
	
	handleNavigation : function(evt){
		var initial = evt.getParameters().firstTime;
		var destination = evt.getParameters().to;
		var destinationId = evt.getParameters().toId;
		var fromId = evt.getParameters().fromId;
		var from = evt.getParameters().from;
		var app = this.app;
		
		
		switch (destinationId) {
		
		case "prologuePage" :{
			var controller = destination.oController;
			destination.btnProceed.focus();
			break;
		}
		case "multiCarResult" :{
			var controller = destination.oController;
			var setNum = destination.oTable.getModel().getData().listitems[0].setNum;
			destination.panelTable.setHeaderText("Multi-Car Fault for Set "+setNum);
			var data = destination.oTable.getModel().getData().listitems[0];
			var symptomCode = data.sym.symCode;
			var symGp = data.sym.symGp;
			destination.sympDesc.setValue(symGp+" - "+symptomCode);
			break;
		}
		
		
		case "asset" : {
			
			var carnum = "";
			if(from.sId == "createNotification")
				{
			var dateTime = new Date(from.dateTime.getDateValue());
			destination.dateTime.setDateValue(dateTime);
			destination.dateTime.getParent().setVisible(true);
			
			if (from.carInput.getTokens().length > 0){
				
			carnum 	= from.carInput.getTokens()[0].getKey();
				
			}
				}
			else if (from.carInput.getValue() != "")
				{
				 carnum = from.carInput.getValue();
				destination.dateTime.getParent().setVisible(false);
				}
			
			var setNum = from.setNum.getValue();
			var PrevCarValue = from.data("carToken");
			destination.carInput.setValue(carnum);
			destination.setNum.setValue(setNum);
			var controller = destination.oController;
			
			
			
			
			if(!from.oController.change ){
				from.oController.change = true;
//Start of fix by KONCHADS on 160616 for Defect # 11915						
//			getAssetTree(carnum,destination,controller.getAssetData, controller);
				//BOI For Defect 70358 KADAMA10OCT2017
				var multiFlag = false;
				if(from.sId === "createNotification"){
					var multiFlag = (from.carInput.getTokens().length > 1);
				}
				//EOI For Defect 70358 KADAMA10OCT2017
				getAssetTree(carnum,destination,controller.getAssetData, controller,multiFlag);
//End of fix by KONCHADS on 160616 for Defect # 11915					
			}
			break;
		  }
		
		case "position":{
			
			var carnum  = from.carInput.getTokens()[0].getKey();
			var setNum = from.setNum.getValue();
			//var equnr = from.asset.getTokens()[0].getKey(); //Insert for Defect 14670 KADAMA20161002+
			//var equnr = from.obj_inp.getTokens()[0].getKey(); //Insert for Defect 14670 KADAMA20161002+
			var equnr = from.data("objPartGroup"); //Insert for Defect 14670 KADAMA20161002+
			destination.carInput.setValue(carnum);
			destination.setNum.setValue(setNum);

			var controller = destination.oController;
			
			//getPositionList(controller.getPositionData, controller); //Commented for Defect 14670 KADAMA20161002-
			getPositionList(controller.getPositionData, controller, equnr); //Insert for Defect 14670 KADAMA20161002-
			break;	
		}
		case "searchResults":{
			
			var controller = destination.oController;
			break;	
		}
		case "searchFault":{
			
			var controller = destination.oController;
			destination.faultNum.focus();
			break;	
		}
		
     case "carNumber":{
			
			var controller = destination.oController;
			if(fromId == "createNotification" )
				{
				
				}
			break;	
		}
		
		
		case "createNotification": {
			destination.cancelButton.focus();
			
//			Changes as per Version 1.2
//			Hide technical detail box
			if((fromId == "tileHome" && destination.setNum.getValue() == "")|| fromId == "prologuePage" ){
			destination.techDetBox.setVisible(false);			
			destination.Techdetail.setIcon( "sap-icon://collapse-group") ;
			
//			Add a empty model to activity table
			var itemModel= new sap.ui.model.json.JSONModel(); 
			var odata = [{Txt_Actcd:"", Txt_Actgrp : "", Acttext:""}];
			itemModel.setData({actitems:odata});
			var actTable = destination.actTable;
			destination.actTable.setModel(itemModel);	
			destination.data("activityData",[]);
			var oNewObject = {Txt_Actcd:"", Txt_Actgrp:"",ActText:""};
			destination.data("activityData").push(oNewObject);
			destination.oController.setActivity();
			
			destination.actBox.setVisible(false);			
			}
			else if(fromId == "searchResults" || fromId == "tileHome"){
				destination.techDetBox.setVisible(false);
				destination.Techdetail.setIcon( "sap-icon://collapse-group") ;
				destination.oController.setActivity();
				destination.actBox.setVisible(false);			
				}
			
//			End of changes
			var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
			//Start of change HPQC 23519 DAGARA20170322
			if(destination.dateTime.getDateValue() === null){
				destination.dateTime.setDateValue(new Date());				
			};
			//End of change HPQC 23519 DAGARA20170322
			var date = new Date(destination.dateTime.getDateValue());
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
			var controller = destination.oController;
			var set = destination.setNum.getValue();
			var trip = "";
           //if(initial){
			//BOC KADAMA20161102
			/*if(initial && (fromId != "tileHome")){
				getTripDetails(trip,set,dateNow,time,controller.getTripData,controller);
            }*/
			//EOC KADAMA20161102
			if(destination.controller.check){ //  multicar reqt
			if((destination.symptom.getTokens().length)== 0)
			{
				destination.data("multiFlag",false);
			}} 
			var multiFlag = destination.data("multiFlag");
			var desc = destination.data("description");

			//destination.dateTime.setDateValue(now);
			var controller = destination.oController;
			//if(initial){
			if(initial && (fromId != "tileHome" && fromId != "searchResults")){
				initial = false;
				var carNum = from.carInput.getValue();
				if(carNum == ""){
					destination.carInput.destroyTokens();
				}
				controller.openPriorityPopup(controller.getView().priority_input, true);
				var defaultValues = setInitialValidationRules(controller);

			}
			if((destination.controller.check) && (fromId == "searchResults"))
			{
				destination.searchButton.setVisible(false);
			}
			if((destination.carInput.getTokens().length)== 1)
			{
				if(!multiFlag){
					destination.checkFaults.setVisible(true);
					//destination.asset.setEnabled(true); //KADAMA20161003 Commented for Defect 14670-
					// Defect 11687 NARASIMB 02062016 - Hide Attachment button if no fault exists
					var notifNum = destination.data("notifNum");
					if($.trim(notifNum).length > 0)
						destination.attachmentButtonFooter.setVisible(true);
					else
						destination.attachmentButtonFooter.setVisible(false);
					var car = destination.carInput.getTokens()[0].getKey();
					var symptom = destination.data("symptomCode");
					
					if((fromId == "faultRepBy")||(fromId == "position")||(fromId == "location")||(fromId == "asset")||(fromId == "symptom")||(fromId == "detailedDescription")||(fromId == "technician")||(fromId == "setNumber"))
					{
					}
					else
					{
						var oModel = getOpenNotifCount(car,notifNum,destination);
					}
				}
				else{
					destination.checkFaults.setVisible(true);
					//destination.asset.setEnabled(true); //KADAMA20161003 Commented for Defect 14670-
					destination.attachmentButtonFooter.setVisible(false); // Changed for defect 10398 by PATTEDT
				}
			}
//			Changes for version 1.4
		else if((destination.carInput.getTokens().length == 0))
			{
				/*if ((multiFlag)&&(destination.carInput.getTokens().length == 1))
				{
					destination.checkFaults.setVisible(true);
					destination.attachmentButtonFooter.setVisible(true);
				}
				else
				{
					destination.checkFaults.setVisible(false);
					destination.attachmentButtonFooter.setVisible(false);
				}*/
			destination.checkFaults.setVisible(false);
			destination.attachmentButtonFooter.setVisible(false);
			}
//			end of changes
			if((fromId == "searchResults")||(controller.fromPopUp ==true))
			{
				var oModel = destination.getModel();
				destination.trainTechVBox.getParent().setVisible(true);
				listitems = oModel.getData();
				controller.getValidateValues("faultSource");
				controller.getValidateValues("faultPriority");
				controller.getValidateValues("symptom");
				destination.priority_input.data("value",listitems.Zzpriority);
				destination.data("symptomGroup",listitems.ZzsymptomGp);
				destination.data("symptomCode",listitems.ZzsymptomCode);
				destination.data("positionCode",listitems.Zzposition);
				destination.temp_input.data("value",listitems.Zztemperature);
				destination.weather_input.data("value",listitems.Zzweather);
				destination.reportPhase.data("value",listitems.ZzrepPhase);
				destination.faultSource.data("value",listitems.ZzfaultSource);
				if(destination.auditType.getValue() != "")
				{
					destination.auditType.data("value", listitems.ZzauditType);
				}
				else
				{
					destination.auditType.data("value","");  
				}
				destination.data("location",listitems.ZzfaultLoc);
				controller.fromPopUp = false;
				if((destination.faultSource.data("value") != "") && (destination.faultSource.data("value") != null))
				{
					destination.row4.setVisible(true);
				}
				if((destination.selected.getText() != "") && (destination.selected.getText() != null))
		        {
		            destination.oLinked.setSelected(true);
		        }
			}
			//Begin of Insert for Defect 15697 KADAMA20161012
			if(destination.positionLabel.getRequired() == true && destination.positionPopOver.getEnabled() == false){
				if(destination.positionPopOver.getValue() == ""){
					destination.positionPopOver.setValue("- N/A");
							var selector1 = "#" + destination.positionPopOver.getId() + "-inner";
							$(selector1).css("border-color","#bfbfbf");
						}
			}
			//End of Insert for Defect 15697 KADAMA20161012
			break;
		}
		case "symptom":{
			var carnum  = "";
			var asset = "";
			var controller = destination.oController;
			if(fromId == "createNotification"){
				if (from.data("carNumbers") != null){
				carnum  = from.data("carNumbers")[0].Zzcarid; // Changes as per version 1.4
			}
				else{
					carnum = from.carInput.getTokens()[0].getKey();
				}
				if(from.asset.getTokens().length != 0){			
					var assetString = from.asset.getTokens()[0].getKey();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				}
				
			}
			else
				{
				carnum = from.carInput.getValue();
					var assetString = from.asset.getValue();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				
				}
			
			destination.oTable_1.getParent().setVisible(false);
	        destination.tableTitle.getParent().setVisible(false); 
			
			
			getSymptomList(asset,carnum,controller.getSymptomData,controller);
			
			
			break;	
		}
		case "location": {

			var controller = destination.oController;
			var set = from.setNum.getValue();	//Insert for Defect 14867 KADAMA20160926
			//getLocation_table(controller.getLocationData, controller);//Commented for Defect 14867 KADAMA20160926
			getLocation_table(controller.getLocationData, controller, set);//Insert for Defect 14867 KADAMA20160926

			break;
		}
		case "detailedDescription": {

			var descValue = destination.data("descValue");
			var existingLongTxt = destination.data("textBoxExtTxt")
			//destination.textBox.setValue(descValue);
			destination.textBoxExtTxt.setValue(existingLongTxt);
			var controller = destination.oController;
			controller.getDescription();

			break;
		}
		case "attachments": {

			var controller = destination.oController;
			controller.getList();

			break;
		}
//		Changes as per Version 1.2
		case "technician": {

			var controller = destination.oController;
//			var notifNum = destination.data("notifNum");
//			getTechnician_table(notifNum,controller.getTechnicianData, controller);
			getDepotList(controller.setSearchValues, controller);
			destination.panelTable.setVisible(false);
			break;
		}
		case "objectPart":{
//			Get car and asset data
			var carnum  = "";
			var asset = "";
			var controller = destination.oController;
			var catalog = 'B'
			if(fromId == "createNotification"){
				if (from.data("carNumbers")!= null){
				carnum  = from.data("carNumbers")[0].Zzcarid; // Changes as per version 1.4
			}
				else{
					carnum = from.carInput.getTokens()[0].getKey();
				}
				if(from.asset.getTokens().length != 0){			
					var assetString = from.asset.getTokens()[0].getKey();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				}
				
			}
			else
				{
				carnum = from.carInput.getValue();
					var assetString = from.asset.getValue();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				
				}
			
// Set the title of table and panel
			destination.oColDamageDesc.setHeader(new sap.m.Text({
				text : "Object Part"
			}).addStyleClass("Title"));
			destination.oColDesc.setHeader(new sap.m.Text({
				text : "Object Part Group"
			}).addStyleClass("Title"));
			destination.symptomForm.setTitle(new sap.ui.core.Title({
				text : "Select Object Part"
			}));
			
			destination.oTable_1.getParent().setVisible(false);
	        destination.tableTitle.getParent().setVisible(false); 
	        getTechDetailGrp(asset,carnum,catalog,controller.setGrp,controller);
			break;			
		}
		case "damage":{
//			Get car and asset data
			var carnum  = "";
			var asset = "";
			var controller = destination.oController;
			var catalog = 'C';
			if(fromId == "createNotification"){
				if (from.data("carNumbers")!= null){
				carnum  = from.data("carNumbers")[0].Zzcarid; // Changes as per version 1.4
			}
				else{
					carnum = from.carInput.getTokens()[0].getKey();
				}
				if(from.asset.getTokens().length != 0){			
					var assetString = from.asset.getTokens()[0].getKey();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				}
				
			}
			else
				{
				carnum = from.carInput.getValue();
					var assetString = from.asset.getValue();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				
				}
			
// Set the title of table and panel

			destination.oColDamageDesc.setHeader(new sap.m.Text({
				text : "Damage"
			}).addStyleClass("Title"));
			destination.oColDesc.setHeader(new sap.m.Text({
				text : "Damage Group"
			}).addStyleClass("Title"));
			destination.symptomForm.setTitle(new sap.ui.core.Title({
				text : "Select Damage"
			}));
			
			destination.oTable_1.getParent().setVisible(false);
	        destination.tableTitle.getParent().setVisible(false); 
	        getTechDetailGrp(asset,carnum,catalog,controller.setGrp,controller);
			break;
			
		}
		case "cause":{
			
//			Get car and asset data
			var carnum  = "";
			var asset = "";
			var controller = destination.oController;
			var catalog = '5';
			if(fromId == "createNotification"){
				if (from.data("carNumbers") != null){
				carnum  = from.data("carNumbers")[0].Zzcarid; // Changes as per version 1.4
			}
				else{
					carnum = from.carInput.getTokens()[0].getKey();
				}
				if(from.asset.getTokens().length != 0){			
					var assetString = from.asset.getTokens()[0].getKey();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				}
				
			}
			else
				{
				carnum = from.carInput.getValue();
					var assetString = from.asset.getValue();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				
				}
			
// Set the title of table and panel
					destination.oColDamageDesc.setHeader(new sap.m.Text({
						text : "Cause"
					}).addStyleClass("Title"));
					destination.oColDesc.setHeader(new sap.m.Text({
						text : "Cause Group"
					}).addStyleClass("Title"));
					destination.symptomForm.setTitle(new sap.ui.core.Title({
						text : "Select Cause"
					}));
					
					destination.oTable_1.getParent().setVisible(false);
			        destination.tableTitle.getParent().setVisible(false); 
			        getTechDetailGrp(asset,carnum,catalog,controller.setGrp,controller);
			break;
			
		}
		
		case "activity":{
			
//			Get car and asset data
			var carnum  = "";
			var asset = "";
			var controller = destination.oController;
			var catalog = 'A';
			if(fromId == "createNotification"){
//				if (from.carInput.getTokens().length == 1){
				carnum  = from.carInput.getTokens()[0].getKey();
//			}
				if(from.asset.getTokens().length != 0){			
					var assetString = from.asset.getTokens()[0].getKey();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				}
				
			}
			else
				{
				carnum = from.carInput.getValue();
					var assetString = from.asset.getValue();
				var assetCode = assetString.split(" ");
				 asset = assetCode[0].trim();
				
				}
			
// Set the title of table and panel
					destination.oColDamageDesc.setHeader(new sap.m.Text({
						text : "Activity"
					}).addStyleClass("Title"));
					destination.oColDesc.setHeader(new sap.m.Text({
						text : "Activity Group"
					}).addStyleClass("Title"));
					destination.symptomForm.setTitle(new sap.ui.core.Title({
						text : "Select Activity"
					}));
					
					destination.oTable_1.getParent().setVisible(false);
			        destination.tableTitle.getParent().setVisible(false); 
			        getTechDetailGrp(asset,carnum,catalog,controller.setGrp,controller);
			break;
			
		}
		

		
		}
	},
// End of changes
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.app
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.app
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.app
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.app
*/
//	onExit: function() {
//
//	}

});