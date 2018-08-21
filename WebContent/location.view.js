sap.ui.jsview("fault_mgmt.location", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.location
	*/ 
	getControllerName : function() {
		return "fault_mgmt.location";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.location
	*/ 
	createContent : function(oController) {
		var oTable = new sap.m.Table({
 	    	mode : sap.m.ListMode.SingleSelectMaster,
 	    	includeItemInSelection : true,
 			
 		}).addStyleClass("table");
 	     this.oTable = oTable;
 	    var oColDesc = new sap.m.Column({header: new sap.m.Text({text:"Location"}).addStyleClass("Title") });
		 
		oTable.addColumn(oColDesc);
		   
		   oTable.attachSelectionChange(function(oEvent) {
				oController.onItemPress(oEvent);
			});
		   var panelTable = new sap.m.Panel({
				headerText  : "Select Location",
				content : [oTable],
				expanded: false,
				expandandable : true,
				
			}).addStyleClass("carLayout");
			this.panelTable = panelTable;
			
		  var page2 = new sap.m.Page({
	 			showNavButton : true,
				navButtonPress : function(evt) {
					oController.handleNavBack(evt);
				},
				 title: "Fault Management",
				/*
			  customHeader : new sap.m.Bar({
					contentLeft : [	new sap.m.Button({
		                icon: "sap-icon://nav-back",
	                    text : "",
	       press : function(evt){
	           oController.handleNavBack(evt)
	         }
	         }),
					
					],
					contentMiddle : [new sap.m.Label({
				    	text : "Fault Management"
				    }).addStyleClass("appTitle"), 
					              
					 ]
				}),*/
				
				content: [panelTable]
				 		
						}).addStyleClass("backGroundColor");
	 		
			return page2;
	}

});