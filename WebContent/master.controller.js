sap.ui.controller("fault_mgmt.master", {
	getData: function()
	{
			
		var rModel = getNotificationList();
		var list = this.getView().list;
		var listTemp =this.getView().listTemp;
		var oModel = list.getModel();
	    var data = rModel.getData();
    	oModel.setData(data);
    	list.setModel(oModel);
       	               
       
   		list.bindItems("/listitems",new sap.m.CustomListItem({
   			type:sap.m.ListType.Active,
   			content:[listTemp],
   		}));
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.master
*/
	onInit: function() {
		},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.master
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.master
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.master
*/
//	onExit: function() {
//
//	}

});