sap.ui.controller("fault_mgmt.multiCarResult", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.multiCarResult
*/
	handleNavBack : function(evt){
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
		 var notifNum = oItem.NotifNo;
//		 Changes as per version 1.2
		 if (oItem.message.indexOf("linked") != -1){
			 this.getView().review.setVisible(false);
		 }
		 else{
		 this.getView().review.setVisible(true);
	     this.getView().data("notifNum",notifNum);
	     this.getView().data("WONum",oItem.WONum);
	     this.getView().data("setNum",oItem.setNum);}
//	     End of changes   
	},
	getPostData: function(data)
	{
		
	},
	openReviewUpdate : function(evt)
	{
		var controller = this;
		var prevPage = this.getView().data("prevPage");
		if ((this.getView().data("notifNum"))==""||(this.getView().data("notifNum"))==null)
		{
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show("Please select a Fault to Review / Update",
			{		
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
		var WONum = this.getView().data("WONum");
		var check = this.getView().data("check");
		prevPage.oController.editEnabled(notifNum,check,WONum);
		getFaultDetails(notifNum,controller.faultDetails,controller);
		}
	},
	  faultDetails: function(data)
	  {
		  
		  var appView = this.getView().getViewData();
		  var app = appView.app;
		  var notifNum = this.getView().data("notifNum");
		  var listitems = data.d; 
		  
		  var createNotifPage = app.getPage("createNotification");
		  createNotifPage.trainTechDispatch.setValue("");
		  var oModel = createNotifPage.getModel();
		  oModel.setData(listitems);
		  createNotifPage.setModel(oModel);
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
		  createNotifPage.data("descFieldFromSearch",descFieldFromSearch);
		  createNotifPage.getContent()[0].setTitle("Update Fault "+notifNum);
		  createNotifPage.data("notifNum",notifNum);
		  var token = new sap.m.Token({ key: listitems.ZzcarNum, text:listitems.ZzcarNum});
		  createNotifPage.carInput.destroyTokens();
		  createNotifPage.carInput.addToken(token);
		  createNotifPage.oController.check = true;
		  getDocListForUpdate(notifNum,this.loadDocList,this);
		  app.to(createNotifPage);
		  },
	  loadDocList: function(data)
		{
			var appView = this.getView().getViewData();
			var app = appView.app;
			var oModel = new sap.ui.model.json.JSONModel();
			var listitems = data.d.results;
			oModel.setData(listitems);
			var count = listitems.length;
			var createNotifPage = app.getPage("createNotification");
			createNotifPage.attachmentButtonFooter.setText("Fault Attachments ("+count+")");
			
	         
		},
		
//		Changes as per version 1.2
		/*done: function(){
			var appView = this.getView().getViewData();
			var app = appView.app;
			var prevPage = this.getView();
			if (!app.getPage("createNotification")) {
				var createNotification = sap.ui.view({id:"createNotification", viewName:"fault_mgmt.createNotification", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
				app.addDetailPage(createNotification);
				this.createNotification = createNotification;
			}
			var notifController = app.getPage("createNotification").oController;
				getLastFaultDetails(notifController.setDefaults, notifController);
			this.createNotification.data("prevPage",prevPage);
			app.toDetail("createNotification");
			this.page = app.getPage("createNotification")
			
			
		}*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.multiCarResult
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.multiCarResult
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.multiCarResult
*/
//	onExit: function() {
//
//	}

});