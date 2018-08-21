sap.ui.controller("fault_mgmt.location", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.location
*/
	handleNavBack : function(evt){
		 var appView = this.getView().getViewData();
        var app = appView.app;	         
        app.to(this.getView().data("prevPage"));

	},
	onItemPress: function(evt)
	{
		eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
		var appView = this.getView().getViewData();
		var app = appView.app;
		var oItem = evt.getParameter("listItem").getBindingContext().getObject();
		 var prevPage = this.getView().data("prevPage");
	        prevPage.source.setValue(oItem.Zzdesc);
	        prevPage.data("location",oItem.Zzfloca);
					app.to(prevPage);
		
	},
	getLocationData: function(data)
	{
		var oModel= new sap.ui.model.json.JSONModel(); 
		oModel.setData({listitems : data.d.results[0].NAV_LOCATION.results});
		this.getView().oTable.setModel(oModel);
		var oLocation = new sap.m.Text({
			text : "{Zzfloca}"
		}); // location
		var oDescription = new sap.m.Text({
			text : "{Zzdesc}"
		}); // description
		var oRow = new sap.m.ColumnListItem();

		oRow.addCell(oDescription);
		this.getView().oTable.bindItems("/listitems", oRow);
	},
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.location
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.location
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.location
*/
//	onExit: function() {
//
//	}

});