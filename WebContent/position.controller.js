sap.ui.controller("fault_mgmt.position", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.position
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
		 if(oItem.Zzcode || oItem.Zzdesc)
	        prevPage.source.setValue(oItem.Zzcode+" - "+oItem.Zzdesc);
		 else
			 prevPage.source.setValue(""); 
	        prevPage.data("positionCode",oItem.Zzcode);
					app.to(prevPage);
		
	},
	getPositionData: function(data)
	{
		var oModel= new sap.ui.model.json.JSONModel(); 
		oModel.setData({listitems: data.d.results});
		this.getView().oTable.setModel(oModel);
		var oLocation = new sap.m.Text({
			text : "{Zzcode}"
		}); // location
		var oDescription = new sap.m.Text({
			text : "{Zzdesc}"
		}); // description
		var oRow = new sap.m.ColumnListItem();

		oRow.addCell(oLocation).addCell(oDescription);
		this.getView().oTable.bindItems("/listitems", oRow);
	},
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.position
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.position
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.position
*/
//	onExit: function() {
//
//	}

});