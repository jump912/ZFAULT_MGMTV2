sap.ui.jsview("fault_mgmt.TileHome", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.TileHome
	*/ 
	getControllerName : function() {
		return "fault_mgmt.TileHome";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.TileHome
	*/ 
	createContent : function(oController) {
		var tileContainer = new sap.m.TileContainer({
			tiles:[
			       new sap.m.StandardTile({
			    	   icon:"sap-icon://subway-train",
			    	   title:"Set & Car Selection",
			    	   info:"Create Fault",
			    	   press : function() {
			               oController.navigateTo("prologuePage");
			            }
			       }),
			       new sap.m.StandardTile({
			    	   icon:"sap-icon://create",
			    	   title:"Create",
			    	   info:"Create Fault",
			    	   press : function() {
			               oController.navigateTo("createNotification");
			            }
			       }),
			       new sap.m.StandardTile({
			    	   icon:"sap-icon://sys-find",
			    	   title:"Search Faults",
			    	   info:"Search & Update Fault",
			    	   press : function() {
			               oController.navigateTo("searchFault");
			            }
			       }),
			       ]
		});
 		return new sap.m.Page({
			title: "Fault Management",
			content: [
			          tileContainer
			]
		}).addStyleClass("backGroundColor");
	}

});