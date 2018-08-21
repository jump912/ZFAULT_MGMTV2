sap.ui.jsview("fault_mgmt.app", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.app
	*/ 
	
	getControllerName : function() {
		return "fault_mgmt.app";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.app
	*/ 
	createContent : function(oController) {
		
			var app = new sap.m.SplitApp("fms_app",{initialPage:"master", mode : sap.m.SplitAppMode.HideMode, afterDetailNavigate : function(evt){
				this.hideMaster();
				oController.handleNavigation(evt);
				
			}});
			this.app = app;
			
			if(!app.getPage("master")){
				var oMasterPage = sap.ui.view({
					id : "master",
					viewName : "fault_mgmt.master",
					type : sap.ui.core.mvc.ViewType.JS,
					viewData : this,
				});
				app.addMasterPage(oMasterPage);
			}
			
			/*var page1 = sap.ui.view({
				id : "prologuePage",
				viewName : "fault_mgmt.prologuePage",
				type : sap.ui.core.mvc.ViewType.JS,
				viewData : this,
			});
			app.addDetailPage(page1);*/
			if(!app.getPage("tileHome")){
				var page1 = sap.ui.view({
					id : "tileHome",
					viewName : "fault_mgmt.TileHome",
					type : sap.ui.core.mvc.ViewType.JS,
					viewData : this,
				});
				app.addDetailPage(page1);
		        //app.placeAt("content");
			}

			return app;
	}

});