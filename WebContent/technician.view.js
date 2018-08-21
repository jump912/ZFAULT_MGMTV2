sap.ui.jsview("fault_mgmt.technician", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.technician
	*/ 
	getControllerName : function() {
		return "fault_mgmt.technician";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.technician
	*/ 
	createContent : function(oController) {
		var oTable = new sap.m.Table({
 	    	mode : sap.m.ListMode.SingleSelectMaster,
 	    	includeItemInSelection : true,
 			
 		}).addStyleClass("table");
 	     this.oTable = oTable;
 	    var oColDesc = new sap.m.Column({header: new sap.m.Text({text:"Technician"}).addStyleClass("Title") });
		 
		oTable.addColumn(oColDesc);
		   
		   oTable.attachSelectionChange(function(oEvent) {
				oController.onItemPress(oEvent);
			});
		   var panelTable = new sap.m.Panel({
				headerText  : "Select Maintainer",
				content : [oTable],
				expanded: false,
				expandandable : true,
				
			}).addStyleClass("carLayout");
			this.panelTable = panelTable;
			
//			Changes as per version 1.2
			
			var depotLabel = new sap.m.Label({
				text: "Depot"});
				this.depotLabel = depotLabel;
			
			var depot_inp = new sap.m.Input("depot",{
				enabled: false,
				value: "{/Zzdepot}",
//				layoutData : new sap.m.FlexItemData({
//									}),	
			}).addStyleClass("FaultHoverDisabled"); 
			
			depot_inp.ontouchstart = function(evt){ 
				oController.openDepotPopup(this);
			};
			this.depot_inp = depot_inp;
			
			var workcenLabel = new sap.m.Label({
				text: "Work Centre"});
				this.workcenLabel = workcenLabel;
			
			var workcen_inp = new sap.m.Input("workcentre",{
				enabled: false,
				value: "{/Zzworkcen}",
//				layoutData : new sap.m.FlexItemData({
//									}),	
			}).addStyleClass("FaultHoverDisabled"); 
			
			workcen_inp.ontouchstart = function(evt){ 
				oController.openWorkCentrePopup(this);
			};
			this.workcen_inp = workcen_inp;
			
			var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout( {
				emptySpanL: 1,
				columnsL: 3,
			});			
			var searchBox = new sap.ui.layout.form.Form({
				editable : true,
				layoutData : new sap.m.FlexItemData({
				}),
				layout : oLayout1,
				formContainers : [
				  			    new sap.ui.layout.form.FormContainer(
				  			    {
				  			    
				  				formElements : [
				  				 new sap.ui.layout.form.FormElement({
				  					fields : [ new sap.m.VBox({
					  			         items: [depotLabel,depot_inp],
				  					 }).addStyleClass("blockVBox") ]
				  				}),  ]
				  			}),new sap.ui.layout.form.FormContainer({
				  				styleClass :"formWidth",
				  				formElements : [ new sap.ui.layout.form.FormElement({
				  					fields : [ new sap.m.VBox({
					  			         items: [workcenLabel,workcen_inp]
				  					 }).addStyleClass("blockVBox") ]
				  				}),  ]
				  			}),
				  			]
			});
			
			var searchPanel = new sap.m.Panel({
				headerText  : "Select Depot and Work Centre",
				content : [searchBox],
				expanded: false,
				expandandable : true,
				
			}).addStyleClass("carLayout");
			this.searchPanel = searchPanel;	

//			End of changes
			
		  var page2 = new sap.m.Page({	
	 			showNavButton : true,
				navButtonPress : function(evt) {
					oController.handleNavBack(evt);
				},
				 title: "Fault Management",
			 /* customHeader : new sap.m.Bar({
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
				content: [searchPanel, panelTable]
				 		
						}).addStyleClass("backGroundColor");
	 		
			return page2;
	}

});