sap.ui.controller("fault_mgmt.searchResults", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.searchResults
*/
	handleNavBack : function(){
        var appView = this.getView().getViewData();
        var app = appView.app;	         
        app.to(this.getView().data("prevPage"));

  },
  onItemPress: function(evt)
	{
		var appView = this.getView().getViewData();
		var app = appView.app;
		var oItem = evt.getParameter("listItem").getBindingContext().getObject();
		var prevPage = this.getView().data("prevPage");
		//var createNotifPage = app.getPage("createNotification");
	    var notifNum = oItem.Zzqmnum;
//	    Changes as per Version 1.2
	    var state = this.getView().switchButton.getState();
		  if(!state){
	    if (oItem.ZzprimedupFlag == "L"){
	    	this.getView().reviewMarkButton.setVisible(false);
	    	this.getView().data("notifNum",notifNum);
	    }
	    else{
	    	this.getView().reviewMarkButton.setVisible(true);
	    	this.getView().data("notifNum",notifNum);
	    }}
		  else{
			  this.getView().data("notifNum",notifNum);  
		  }
//		  End of changes
	},
	
  openUpdate : function(evt)
  {
	eqpFMSFormChngdFlg = false; // fix by KONCHADS on 23/06/2016 for defect # 11832
	var controller = this;
	var appView = this.getView().getViewData();
	var app = appView.app;
	var prevPage = this.getView();
	var state = this.getView().switchButton.getState();
	  if(!state)
	{
	if ((this.getView().data("notifNum"))==""||(this.getView().data("notifNum"))==null)
		{
		jQuery.sap.require("sap.m.MessageBox");
		sap.m.MessageBox.show("Please select a Fault to Review / Update",{
				icon: sap.m.MessageBox.Icon.INFORMATION , 
				title: "Fault Search Information", 
				actions: sap.m.MessageBox.Action.OK, 
				onClose: function() { },
				styleClass: "faultMsgBox"
		});
		}
	else
		{
		var notifNum = this.getView().data("notifNum");
		//getFaultDetails(notifNum,controller.faultDetails,controller);
		if (!app.getPage("createNotification")) {		
		var createNotification = sap.ui.view({id:"createNotification", viewName:"fault_mgmt.createNotification", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
		app.addDetailPage(createNotification);
		this.createNotification = createNotification;
		}
		else
			{
			this.createNotification = app.getPage("createNotification");
			}
			
		var notifController = this.createNotification.oController;
		this.createNotification.data("prevPage",prevPage);
		setInitialValidationRulesEnh(notifController, notifNum, controller);		
		}
	}
	  else
		  {
		  var oTable = this.getView().oTable;
		  
		  var items = oTable.getSelectedItems();
		  var oArr = [];
		  for (i=0; i<items.length; i++){
			  oArr.push(items[i].getBindingContext().getObject());
		  }
		var oTableDup = this.getView().oTableDup;
			
			oTableDup.getModel().setData({listitems:oArr});
			
			var markAsDupDialog = this.getView().markAsDupDialog;
			if(!this.markAsDupDialog){
				
		
			this.markAsDupDialog = markAsDupDialog;
			}
			this.markAsDupDialog.open();
			
		   
		    	 var oNotification = new sap.m.Text({text: "Zzqmnum"});
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
		         var oDateTime = new sap.m.Text({text: {
		        	 parts : [{path :"Zzqmdat"}, {path : "Zzmzeit/ms"}, {path: "Zzqmnum"}],
		    	       
		         	formatter : function(date,time,fault){
		         		if(date && time)
		         			{
		         		  var formattedDate = date.toDateString().substring(4);
		         		  var ms = time % 1000;
		         		  time = (time - ms) / 1000;
		         		  var secs = time % 60;
		         		  time = (time - secs) / 60;
		         		  var mins = time % 60;
		         		  var hrs = (time - mins) / 60;
		         		  
		         		  if(hrs<10)
		         			  {
		         			  hrs = "0"+hrs;
		         			  }
		         		 if(mins<10)
		    			  {
		    			  mins = "0"+mins;
		    			  }
		         		 if(secs<10)
		    			  {
		         			secs = "0"+secs;
		    			  }
		         	      var formattedTime = hrs + ':' + mins + ':' + secs;
		         		  }
		         		else if(date && time == "0")
		     			{
		     			var formattedDate = date.toDateString().substring(4);
		     			var formattedTime  = "00:00:00";
		     			}
		     		else if (date)
		     			{
		     			var formattedDate = date.toDateString().substring(4);
		     			var formattedTime  = "";
		     			}
		     		else
		     			{
		     			var formattedDate = "";
		     			var formattedTime = "";
		     			}
		     		return fault+ "\n"+formattedDate + "  " + formattedTime;
		         	}
		         		
		         },
		         wrapping : true,

		         	});
		         
		         
		         
		         var oIncident = new sap.m.Text({text: {
		         		//parts : [{path :"ZzincidentDate"}, {path : "ZzincidentTime/ms"}, {path :"ZziimsNo"}],
		         	//Changed ZziimsNo to ZzcurrentNotif as part of ENH 8230
		        	 parts : [{path :"ZzincidentDate"}, {path : "ZzincidentTime/ms"}, {path :"Zzincdailynum"}],
		         	formatter : function(date,time,incident){
		         		if(date && time)
		     			{
		     		  var formattedDate = date.toDateString().substring(4);
		     		  var ms = time % 1000;
		     		  time = (time - ms) / 1000;
		     		  var secs = time % 60;
		     		  time = (time - secs) / 60;
		     		  var mins = time % 60;
		     		  var hrs = (time - mins) / 60;
		     		  
		     		  if(hrs<10)
		     			  {
		     			  hrs = "0"+hrs;
		     			  }
		     		 if(mins<10)
		    		  {
		    		  mins = "0"+mins;
		    		  }
		     		 if(secs<10)
		    		  {
		     			secs = "0"+secs;
		    		  }
		     	      var formattedTime = hrs + ':' + mins + ':' + secs;
		                        }
		         		else if((date) && (time == "0"))
		     			{
		     			var formattedDate = date.toDateString().substring(4);
		     			var formattedTime = "00:00:00";
		     			}
		         		else if(time)
		         			{
		         			var formattedDate = "";
		    	     		  var ms = time % 1000;
		    	     		  time = (time - ms) / 1000;
		    	     		  var secs = time % 60;
		    	     		  time = (time - secs) / 60;
		    	     		  var mins = time % 60;
		    	     		  var hrs = (time - mins) / 60;
		    	     		  
		    	     		  if(hrs<10)
		    	     			  {
		    	     			  hrs = "0"+hrs;
		    	     			  }
		    	     		 if(mins<10)
		    	    		  {
		    	    		  mins = "0"+mins;
		    	    		  }
		    	     		 if(secs<10)
		    	    		  {
		    	     			secs = "0"+secs;
		    	    		  }
		    	     	      var formattedTime = hrs + ':' + mins + ':' + secs;
		         			}
		         		else if(date && time == "0")
		         			{
		         			var formattedDate = date.toDateString().substring(4);
		         			var formattedTime  = "00:00:00";
		         			}
		         		else if (date)
		         			{
		         			var formattedDate = date.toDateString().substring(4);
		         			var formattedTime  = "";
		         			}
		         		else
		         			{
		         			var formattedDate = "";
		         			var formattedTime = "";
		         			}
		     			
		     		  return incident+ "\n"+formattedDate + "  " + formattedTime;
		     				
		         		
		     	}
		         	
		         },
		         wrapping : true,

		         	});
		         
		         var oLinked = this.getView().oLinked;
		         var selected = new sap.m.Text({text: "{Zzaufnr}"});
		         if((selected.getText() != "") && (selected.getText() != null))
		         	{
		          this.getView().oLinked.setSelected(true);
		         	}
		         
//		       Changes as per version 1.2
//		       var oCarNum = new sap.m.Text({text: "{Zzecarid}"});
//		       var oSetno = new sap.m.Text({text: "{ZzsetNum}"});
		       var oSetno = new sap.m.Text({
		      	 text:{
		      		 parts:[{path:"ZzsetNum"},{path:"Zzecarid"}],
		      		 formatter: function(set,car){
		      			 return set+"\n"+car;
		      		 }
		      	 }
		       });
//		       End changes
		         
		         var oAsset = new sap.m.Text({text: "{Zzeqktx}"});
		         var oSymptom = new sap.m.Text({text:{
		         	parts :[{path : "Zzktxtgr"} , {path : "Zzktxtcd"}],
		         
		    			formatter : function(symCode,symDesc){
		    				
		    				if(symCode&&symDesc)
		    					{
		    				return symCode +" - "+symDesc;
		    					}
		    				else if(symCode)
		    					{
		    					return symCode;
		    					}
		    				else if(symDesc)
		    				{
		    					return symDesc;
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
		         
		    		var oRow = new sap.m.ColumnListItem();
		    		oRow.addCell(oDateTime).addCell(oTripno).addCell(oIncident).addCell(oSetno).addCell(oAsset).addCell(oPosition).addCell(oSymptom).addCell(oPriority).addCell(selected);
		    		this.getView().oTableDup.bindItems("/listitems",oRow); 
		    		
		  }
  },
  
  
  handleCloseDialog:function (evt){
	 //evt.oSource.getParent().getParent().getParent().close();
//defect 20187  NANDIS
	  evt.oSource.getParent().close();
	  
	  
  },
  closeFilterDialog: function (evt){
	  this.refreshList()
	  this.getView().createNotification.close();
  },
  closeResponseDialog: function (evt){
	  this.refreshList()
	  this.getView().responseDialog.close();
  },
  
  refreshList :function (){
	  var appView = this.getView().getViewData();
      var app = appView.app;	
      app.getPage("searchFault").oController.searchFaults();
	  
  },
  
  
  handleMarkDuplicates :function (evt){
	  
	 
	 
	 var items =  this.getView().oTableDup.getItems();
	 var controller = this;
	 var appView = this.getView().getViewData();
     var app = appView.app;	
    //var createController =  app.getPage("createNotification").oController;
    var oDataObj = [];
    var postdata = [];
	
	for (i = 0; i < items.length; i++)		
	{
		var values = items[i].getBindingContext().getObject();
		 //oDataObj[i] = createController.copyObject(values);
		oDataObj[i] = copyObject(values);
		 if((items[i].getSelected())){
			 postdata.push({"IvDup" :"P" ,"IvPrimNotif":oDataObj[i].Zzqmnum, "IvNotifNo":oDataObj[i].Zzqmnum}) 
		 }
		 
		 
	}
	for (i = 0; i < items.length; i++)		
	{
		if(!(items[i].getSelected())){
			 postdata.push({"IvDup" :"D" ,"IvPrimNotif":postdata[0].IvPrimNotif, "IvNotifNo":oDataObj[i].Zzqmnum}) 
			
		}
	
	}
	this.iLength = items.length;
	this.dArray = [];
	
	markAsDuplicatePost(postdata,controller);
	//defect 20187
	//evt.oSource.getParent().getParent().getParent().close();
	evt.oSource.getParent().close();
    
	  
	  
  },
  
  handleResponse :function(data,length){
	  
	 
	  
	  var oLength = this.getView().data("oLength");
	  
	  this.q++;
	  
	  this.finalArr.push(data);
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({listitems:this.finalArr});
		if(this.q == oLength)
			{
			
			var tableDialog = this.getView().oTable_create; 
			
		    var notifNum = new sap.m.Text({text: "{IvNotifNo}"});
			var oMessage = new sap.m.Text({text: "{Message}"});
			var oType = new  sap.ui.core.Icon({
		    src : "sap-icon://status-positive",
		    color : {
				parts :[{path : "Type"}],
				formatter : function(type){
					if (type =="E")
						{
						return "red";
						}
					else if (type =="S")
					{
					return "green";
					}
					else
						{
					return "yellow";
						}
				}
		    
			}
		    	});
	   		var oRow = new sap.m.ColumnListItem();
	   		oRow.addCell(oType).addCell(oMessage).addCell(notifNum);
	   		tableDialog.setModel(oModel);
	   		tableDialog.bindItems("/listitems",oRow);
	   		this.getView().createNotification.open();
	  
	  
			}
	  
	  
  },
  
  handleDuplicateResponse :function(rData,length){
	  
	 
	 this.dArray.push(rData);
		
	 
	  if((this.iLength -1) === (length))
  	{
		  var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({listitems:this.dArray});
		  var tableDialog = this.getView().oTable_response; 
			
		    var notifNum = new sap.m.Text({text: "{IvNotifNo}"});
			var oMessage = new sap.m.Text({text: "{Message}"});
		
	   		var oRow = new sap.m.ColumnListItem();
	   		oRow.addCell(notifNum).addCell(oMessage);
	   		tableDialog.setModel(oModel);
	   		tableDialog.bindItems("/listitems",oRow);
	   		this.getView().responseDialog.open();
		  jQuery.sap.require("sap.m.MessageBox");
        }
	  
  },
  
  faultDetails: function(data)
  {
	  
	  var appView = this.getView().getViewData();
	  var app = appView.app;
	  var notifNum = this.getView().data("notifNum");
	  var listitems = data.d; 
	  var createNotifPage = app.getPage("createNotification");
	  if(!createNotifPage){
		  createNotifPage = sap.ui.view({id:"createNotification", viewName:"fault_mgmt.createNotification", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
			app.addDetailPage(createNotifPage);
	  }
	  
	  //validateSetM_updateView(data.d.ZzsetNum, createNotifPage, data.d.Zzpriority);		// Insert for Defect 14670 KADAMA20160927  
	  
	  
	  createNotifPage.trainTechDispatch.setValue("");
	  var oModel = createNotifPage.getModel();
	  oModel.setData(listitems);
	  createNotifPage.setModel(oModel);
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
	  var flag  = false; // kept it as false always in case of update 
	  createNotifPage.data("multiFlag",flag);
	  if(listitems.ZzworkOrder != "" && listitems.ZzworkOrder != null)
    	{
		  createNotifPage.oLinked.setSelected(true);
		  createNotifPage.oLinked.setEnabled(false);
		  createNotifPage.trainTechVBox.getParent().setVisible(true);
		  createNotifPage.trainTechDispatch.setEnabled(true);
		  createNotifPage.trainTechDispatch.setValue(listitems.ZzfirstName+" "+listitems.ZzlastName);
		  createNotifPage.data("technician",listitems.ZzpersonNo);
		  createNotifPage.data("workOrderNo",listitems.ZzworkOrder);
    	}
		  else
			  {
			  createNotifPage.trainTechVBox.getParent().setVisible(true);
			  createNotifPage.oLinked.setSelected(false);
			  createNotifPage.oLinked.setEnabled(true);
			  createNotifPage.trainTechDispatch.setEnabled(false);
			  createNotifPage.data("technician","");
			  createNotifPage.data("workOrderNo","");
			  
			  }
	  var selectedValues = listitems.ZzfaultResponse;
	  var selectedKeys = selectedValues.substring(5);
	  
	  var array = selectedKeys.split(" ");
	  var faultRepByKey = listitems.Zzfaultreptby;
	  createNotifPage.faultResponse.setSelectedKeys(array);
	  createNotifPage.faultRepBy.setValue(faultRepByKey);
	  var descFieldFromSearch = listitems.ZznotifTextlng;
	  //createNotifPage.data("description",descFieldFromSearch);
	  createNotifPage.data("descFieldFromSearch",descFieldFromSearch);
	  createNotifPage.getContent()[0].setTitle("Update Fault "+notifNum);
	  createNotifPage.data("notifNum",notifNum);
	//BOI For Defect 15814
		if (!app.getPage("detailedDescription"))
		{
			//navigation to the detailed description view			
			var page = sap.ui.view({
				id : "detailedDescription",
				viewName : "fault_mgmt.detailedDescription",
				type : sap.ui.core.mvc.ViewType.JS,
				viewData: appView

			});
			app.addPage(page);
			this.page = page;
		}
		else {
			this.page = app.getPage("detailedDescription");
		}
		
		var longTxtPage = this.page;
		longTxtPage.textBox.setValue("");
		
		longTxtPage.find_inp.setValue("");
		longTxtPage.action_inp.setValue("");
		
		var selector1 = "#" + longTxtPage.find_inp.getId() + "-inner";
		var selector2 = "#" + longTxtPage.action_inp.getId() + "-inner";
		
		$(selector1).css("border-color","#bfbfbf");
		$(selector2).css("border-color","#bfbfbf");
		//EOI For Defect 15814
	  var cToken = new sap.m.Token({ key: listitems.ZzcarNum, text:listitems.ZzcarNum});
	  //var sToken = new sap.m.Token({ key: listitems.ZzsymptomCode, text:listitems.ZzsymptomCodeDesc});
	  var sToken = new sap.m.Token({ key: listitems.ZzsymptomCode, text:listitems.ZzsymptomGpDesc + " - " + listitems.ZzsymptomCodeDesc}); //Defect #6565  -- narasimb
	  var aToken = new sap.m.Token({ key: listitems.Zzasset, text:listitems.ZzassetDesc});
	  
	  createNotifPage.carInput.destroyTokens();
	  createNotifPage.asset.destroyTokens();
	  createNotifPage.symptom.destroyTokens();
	  if(listitems.Zzasset)
	  {
	  createNotifPage.asset.addToken(aToken);
	  }
	  if(listitems.ZzsymptomCode)
		  {
	  createNotifPage.symptom.addToken(sToken);
		  } 
	  createNotifPage.carInput.addToken(cToken);
	  
//		Changes for version 1.2
	  if(listitems.NAV_FAULT_DISPLAY_ITEMS.results.length != 0){
		  var techPath = listitems.NAV_FAULT_DISPLAY_ITEMS.results[0];
		  
//		  Object part
		  if(techPath.DlCodegrp != ""){
		  var objToken = new sap.m.Token({key:techPath.DlCode, text:techPath.Txt_Grpcd + "-" + techPath.Txt_Objptcd });			  
		  createNotifPage.obj_inp.destroyTokens();
		  createNotifPage.obj_inp.addToken(objToken);
		  createNotifPage.data("objPartGroup",techPath.DlCodegrp);
		  createNotifPage.data("objPartCode",techPath.DlCode);	
		  }
		  else{
			  createNotifPage.obj_inp.destroyTokens();
			  createNotifPage.data("objPartGroup",techPath.DlCodegrp);
			  createNotifPage.data("objPartCode",techPath.DlCode); 
			  }
		  
//		 Damage
		  if(techPath.DCodegrp != ""){
		  var dToken = new sap.m.Token({key:techPath.DCode, text:techPath.Stxt_Grpcd  + "-" + techPath.Txt_Probcd });
		  createNotifPage.damage_inp.destroyTokens();
		  createNotifPage.damage_inp.addToken(dToken);
		  createNotifPage.data("damageGroup",techPath.DCodegrp);
		  createNotifPage.data("damageCode",techPath.DCode);		  			  	  
		  }
		  else{
			  createNotifPage.damage_inp.destroyTokens();
			  createNotifPage.data("damageGroup",techPath.DCodegrp);
			  createNotifPage.data("damageCode",techPath.DCode);  
		  }
		  if(techPath.Dtext != ""){
			  createNotifPage.damage_desc.setValue(techPath.DText);  
		  }
		  else{
			  createNotifPage.damage_desc.setValue("");  
		  }
		  
//		 Cause 
		  if(techPath.CauseCodegrp != ""){
		  var cauToken = new sap.m.Token({key:techPath.CauseCode, text:techPath.Txt_Causegrp  + "-" + techPath.Txt_Causecd });
		  createNotifPage.cause_inp.destroyTokens();
		  createNotifPage.cause_inp.addToken(cauToken);
		  createNotifPage.data("causeGroup",techPath.CauseCodegrp);
		  createNotifPage.data("causeCode",techPath.CauseCode);
		  	
		  }
		  else{
			  createNotifPage.cause_inp.destroyTokens();
			  createNotifPage.data("causeGroup",techPath.CauseCodegrp);
			  createNotifPage.data("causeCode",techPath.CauseCode);
			  createNotifPage.cause_desc.setValue("");	
		  }
		  if(techPath.Causetext){
			  createNotifPage.cause_desc.setValue(techPath.Causetext); 
		  }
		  else{
			  createNotifPage.cause_desc.setValue("");
		  }
		  
		  var actTableData = listitems.NAV_FAULT_DISPLAY_ITEMS.results;
			var itemModel= new sap.ui.model.json.JSONModel(); 
			itemModel.setData({actitems:listitems.NAV_FAULT_DISPLAY_ITEMS.results});
			var actTable = createNotifPage.actTable;
			actTable.setModel(itemModel);
			createNotifPage.data("activityData",[]);
			
			for (var i = 0; i<actTableData.length; i++){
				var newObj = {actCode:actTableData[i].ActCode, actgroup:actTableData[i].ActCodegrp};
				createNotifPage.data("activityData")[i] = newObj;
			}
	  
	  }
	  else{
			var itemModel= new sap.ui.model.json.JSONModel(); 
			 var odata = [{Txt_Actcd:"", Txt_Actgrp : "", Acttext:""}];
			itemModel.setData({actitems:odata});
			var actTable = createNotifPage.actTable;
			actTable.setModel(itemModel);	
			createNotifPage.data("activityData",[]);
			var oNewObject = {Txt_Actcd:"", Txt_Actgrp:"",ActText:""};
			createNotifPage.data("activityData").push(oNewObject);
			
//			Clear cause
			createNotifPage.cause_inp.destroyTokens();
			createNotifPage.data("causeGroup","");
			createNotifPage.data("causeCode","");
			createNotifPage.cause_desc.setValue("");	
//			Clear items
			
			  createNotifPage.damage_inp.destroyTokens();
			  createNotifPage.data("damageGroup","");
			  createNotifPage.data("damageCode",""); 
			  createNotifPage.obj_inp.destroyTokens();
			  createNotifPage.data("objPartGroup","");
			  createNotifPage.data("objPartCode",""); 

	  }
	  
//	  End of changes 
	  
	  createNotifPage.priority_input.setValue(listitems.Zzpriority +" - "+listitems.ZzpriorityDesc); // HPQC # 16191 NARASIMB 14102016
	 // HPQC # 42147 NARASIMB 13122016  -- Start
	 // createNotifPage.data("SAPFaultPriority",listitems.Zzpriority); 
	 // HPQC # 42147 NARASIMB 13122016  -- End
	  createNotifPage.oController.SAPFaultPriority = listitems.Zzpriority; //Insert for Defect 42147
	  createNotifPage.oController.check = true;
	  getDocListForUpdate(notifNum,this.loadDocList,this);
	  createNotifPage.oController.determineObjPartMandatory(listitems.ZzsetNum); // fix by KONCHADS on 160616 for Defect # 11915	
	  validateSetM_updateView(data.d.ZzsetNum, createNotifPage, data.d.Zzpriority);		// Insert for Defect 14670 KADAMA20160927
	  app.to(createNotifPage);
	  },
	  
	loadDocList: function(data)
	{
		var appView = this.getView().getViewData();
		var app = appView.app;
		var oModel = new sap.ui.model.json.JSONModel();
		var listitems = data.d.results[0].NAV_GET_ATT_LIST.results;
		oModel.setData(listitems);
		var count = listitems.length;
		var createNotifPage = app.getPage("createNotification");
		createNotifPage.attachmentButtonFooter.setText("Fault Attachments ("+count+")");
		
         
	},
  getSearchList : function(oModel)
  {
	  var controller = this;
	 this.getView().oTable.setModel(oModel); 
	 var oNotification = new sap.m.Text({text: "{Zzqmnum}"});
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
     var oDateTime = new sap.m.Text({text: {
    	 parts : [{path :"Zzqmdat"}, {path : "Zzmzeit/ms"}, {path: "Zzqmnum"}],
	       
     	formatter : function(date,time,fault){
     		if(date && time)
     			{
     		  //var r = /\d+/;
     		  var formattedDate = date.toDateString().substring(4);
     		  var ms = time % 1000;
     		  time = (time - ms) / 1000;
     		  var secs = time % 60;
     		  time = (time - secs) / 60;
     		  var mins = time % 60;
     		  var hrs = (time - mins) / 60;
     		  
     		  if(hrs<10)
     			  {
     			  hrs = "0"+hrs;
     			  }
     		 if(mins<10)
			  {
			  mins = "0"+mins;
			  }
     		 if(secs<10)
			  {
     			secs = "0"+secs;
			  }
     	      var formattedTime = hrs + ':' + mins + ':' + secs;
     		 }
     		else if((date) && (time == "0"))
 			{
 			var formattedDate = date.toDateString().substring(4);
 			var formattedTime = "00:00:00";
 			}
     		else if(time)
     			{
     			var formattedDate = "";
	     		  var ms = time % 1000;
	     		  time = (time - ms) / 1000;
	     		  var secs = time % 60;
	     		  time = (time - secs) / 60;
	     		  var mins = time % 60;
	     		  var hrs = (time - mins) / 60;
	     		  
	     		  if(hrs<10)
	     			  {
	     			  hrs = "0"+hrs;
	     			  }
	     		 if(mins<10)
	    		  {
	    		  mins = "0"+mins;
	    		  }
	     		 if(secs<10)
	    		  {
	     			secs = "0"+secs;
	    		  }
	     	      var formattedTime = hrs + ':' + mins + ':' + secs;
     			}
     		else if(date && time == "0")
     			{
     			var formattedDate = date.toDateString().substring(4);
     			var formattedTime  = "00:00:00";
     			}
     		else if (date)
     			{
     			var formattedDate = date.toDateString().substring(4);
     			var formattedTime  = "";
     			}
     		else
     			{
     			var formattedDate = "";
     			var formattedTime = "";
     			}
     		return fault+ "\n"+formattedDate + "  " + formattedTime;
     	}
     	},
     wrapping : true,

     	});

     var oIncident = new sap.m.Text({text: {
      	//parts : [{path :"ZzincidentDate"}, {path : "ZzincidentTime/ms"}, {path :"ZziimsNo"}],
    	//Changed ZziimsNo to ZzcurrentNotif as part of ENH 8230
    	 parts : [{path :"ZzincidentDate"}, {path : "ZzincidentTime/ms"}, {path :"Zzincdailynum"}], 
    	 formatter : function(date,time,incident){
     		if(date && time)
 			{
     	  var formattedDate = date.toDateString().substring(4);
 		  var ms = time % 1000;
 		  time = (time - ms) / 1000;
 		  var secs = time % 60;
 		  time = (time - secs) / 60;
 		  var mins = time % 60;
 		  var hrs = (time - mins) / 60;
 		  
 		  if(hrs<10)
 			  {
 			  hrs = "0"+hrs;
 			  }
 		 if(mins<10)
		  {
		  mins = "0"+mins;
		  }
 		 if(secs<10)
		  {
 			secs = "0"+secs;
		  }
 	      var formattedTime = hrs + ':' + mins + ':' + secs;
 			}
     		else if((date) && (time == "0"))
     			{
     			var formattedDate = date.toDateString().substring(4);
     			var formattedTime = "00:00:00";
     			}
     		else if(time)
     			{
     			var formattedDate = "";
	     		  var ms = time % 1000;
	     		  time = (time - ms) / 1000;
	     		  var secs = time % 60;
	     		  time = (time - secs) / 60;
	     		  var mins = time % 60;
	     		  var hrs = (time - mins) / 60;
	     		  
	     		  if(hrs<10)
	     			  {
	     			  hrs = "0"+hrs;
	     			  }
	     		 if(mins<10)
	    		  {
	    		  mins = "0"+mins;
	    		  }
	     		 if(secs<10)
	    		  {
	     			secs = "0"+secs;
	    		  }
	     	      var formattedTime = hrs + ':' + mins + ':' + secs;
     			}
     		else if(date && time == "0")
 			{
 			var formattedDate = date.toDateString().substring(4);
 			var formattedTime  = "00:00:00";
 			}
 		else if (date)
 			{
 			var formattedDate = date.toDateString().substring(4);
 			var formattedTime  = "";
 			}
 		else
 			{
 			var formattedDate = "";
 			var formattedTime = "";
 			}
 			return incident+ "\n"+formattedDate + "  " + formattedTime;
 				
     		
 	}
     	
     },
     wrapping : true,

     	});
     var oLinked = this.getView().oLinked;
     var selected = new sap.m.Text({text: "{Zzaufnr}"});
     if((selected.getText() != "") && (selected.getText() != null))
     	{
      this.getView().oLinked.setSelected(true);
     	}
    
//     Changes as per version 1.2
//     var oCarNum = new sap.m.Text({text: "{Zzecarid}"});
//     var oSetno = new sap.m.Text({text: "{ZzsetNum}"});
     var oSetno = new sap.m.Text({
    	 text:{
    		 parts:[{path:"ZzsetNum"},{path:"Zzecarid"}],
    		 formatter: function(set,car){
    			 return set+"\n"+car;
    		 }
    	 }
     });
//     End changes
     var oAsset = new sap.m.Text({text: "{Zzeqktx}"});
     var oSymptom = new sap.m.Text({text:{
     	parts :[{path : "Zzktxtgr"} , {path : "Zzktxtcd"}],
     
			formatter : function(symCode,symDesc){
				
				if(symCode&&symDesc)
					{
				return symCode +" - "+symDesc;
					}
				else if(symCode)
					{
					return symCode;
					}
				else if(symDesc)
				{
					return symDesc;
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
     var oPrimeNotif = new sap.m.Text({text:{
    	 parts:[{path:"ZzprimeFaultNum"},{path:"ZzprimedupFlag"}],
    	 formatter: function(notif,flag){
    		 if(flag == "L" && notif != undefined){
    			 var notifNum = notif.replace(/^[0]+/g,"");
    			 return notifNum ;
    		 }
    	 }
     }
     })
         
     
		var oRow = new sap.m.ColumnListItem();
		oRow.addCell(oDateTime).addCell(oTripno).addCell(oIncident).addCell(oSetno).addCell(oAsset).addCell(oPosition).addCell(oSymptom).addCell(oPriority).addCell(oPrimeNotif).addCell(selected);
		
		this.getView().oTable.bindItems("/listitems",oRow); 
		var count = oModel.getData().listitems.length;
		this.getView().panelTable.setHeaderText(count+" Faults found");
  },
  getState : function(evt)
  {
	  var state = this.getView().switchButton.getState();
	  this.getView().reviewMarkButton.setVisible(true); // Changes as per version 1.2

	  if(state)
		  {
		  this.getView().reviewMarkButton.setText("Report Duplicate Faults");
		  this.getView().reviewMarkButton.setIcon("sap-icon://duplicate");
		  this.getView().oTable.setMode(sap.m.ListMode.MultiSelect);//changing the mode to multi select
		  }
	  else
		  {
		  this.getView().reviewMarkButton.setText("Review / Update");
		  this.getView().reviewMarkButton.setIcon("sap-icon://edit");
//		   Changes as per version 1.2
//		  Hide the update button if notification is linked notification
//		  var oTable = this.getView().oTable;
		  var items = this.getView().oTable.getSelectedItems();
		  if (items.length == 1 && items[0].getBindingContext().getObject().ZzprimedupFlag == "L"){
			  this.getView().reviewMarkButton.setVisible(false); 
		  }
//		  End of changes
		  this.getView().oTable.setMode(sap.m.ListMode.SingleSelectMaster);//changing the mode to multi select

		  }
  },
  getFaultLongTxt:function(evt){
	  this.source = evt.getSource();
	  var state = this.getView().switchButton.getState();
	  if(!state)
	  {
		  if ((this.getView().data("notifNum"))==""||(this.getView().data("notifNum"))==null)
		  {
			  jQuery.sap.require("sap.m.MessageBox");
			  sap.m.MessageBox.show("Please select a Fault to Show Long Text",{
					  icon: sap.m.MessageBox.Icon.INFORMATION , 
					  title: "Fault Search Information", 
        			  actions:sap.m.MessageBox.Action.OK, 
        			  onClose: function() { },
					  styleClass: "faultMsgBox"
		  });
		  }
		  else
		  {
			  var notifNum = this.getView().data("notifNum");
			  var faultLontTxtTitle = notifNum + " Fault Long Text";
			  var faultLontTxt = getFaultLongText(notifNum);
			  jQuery.sap.require("sap.m.MessageBox");
			  sap.m.MessageBox.show(
					  faultLontTxt, {
			          icon: sap.m.MessageBox.Icon.INFORMATION,
			          title: faultLontTxtTitle,
			          actions: [sap.m.MessageBox.Action.CLOSE],
			          onClose: function(oAction) {  },
			          styleClass: "faultMsgBox"
			      }
			    );
		  }
		}
	  else{
		  //var oItem = this.getView().oTable.getSelectedItems()[0].getBindingContext().getObject();
		  //var notifNum = oItem.Zzqmnum;
		  var oTable = this.getView().oTable;
		  var items = oTable.getSelectedItems();
		  if(items.length <= 0){
			  jQuery.sap.require("sap.m.MessageBox");
			  sap.m.MessageBox.show("Please select a Fault to Show Long Text",{
					  icon: sap.m.MessageBox.Icon.INFORMATION , 
					  title: "Fault Search Information", 
					  actions: sap.m.MessageBox.Action.OK, 
					  onClose: function() { },
        			  styleClass: "faultMsgBox"
			  });
		  }
		  else if(items.length > 1){
			  jQuery.sap.require("sap.m.MessageBox");
			  sap.m.MessageBox.show("Please select only one Fault to Show Long Text",{
					  icon: sap.m.MessageBox.Icon.INFORMATION,
					  title: "Fault Search Information",
					  actions: sap.m.MessageBox.Action.OK, 
					  onClose: function() { },
					  styleClass: "faultMsgBox"
					  } );
		  }
		  else
		  {
			  var notifNum = "";
			  var oArr = [];
			  for (i=0; i<items.length; i++){
				  //oArr.push(items[i].getBindingContext().getObject());
				  notifNum = items[i].getBindingContext().getObject().Zzqmnum;
			  }		
			  var faultLontTxtTitle = notifNum + " Fault Long Text";
			  var faultLontTxt = getFaultLongText(notifNum);
			  jQuery.sap.require("sap.m.MessageBox");
			  sap.m.MessageBox.show(
					  faultLontTxt, {
			          icon: sap.m.MessageBox.Icon.INFORMATION,
			          title: faultLontTxtTitle,
			          actions: [sap.m.MessageBox.Action.CLOSE],
			          onClose: function(oAction) {  },
			          styleClass: "faultMsgBox"
			      }
			    );			  
		  }
	  }
  },
  populateFaultLongTxt:function(data)
  {
	  
  }
  
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.searchResults
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.searchResults
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.searchResults
*/
//	onExit: function() {
//
//	}

});