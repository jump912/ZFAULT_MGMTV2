sap.ui.jsview("fault_mgmt.position", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.position
	*/ 
	getControllerName : function() {
		return "fault_mgmt.position";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.position
	*/ 
	createContent : function(oController) {
		var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout( {
			emptySpanL: 1,
			columnsL: 3,
		});
		var carInput = new sap.m.Input({
			
			showValueHelp: false,
			enabled : false,
			});
		this.carInput = carInput;
		
		var setNum = new sap.m.Input({layoutData : new sap.m.FlexItemData({
		}),
			
			showValueHelp: false,
			enabled : false,
			});
	
		this.setNum = setNum;
		
		var carLabel = new sap.m.Label({
		text: "Car Number"});
		this.carLabel = carLabel;
	
		var setLabel = new sap.m.Label({
		text: "Set Number"});
		this.setLabel = setLabel;
		var oTable = new sap.m.Table({
 	    	mode : sap.m.ListMode.SingleSelectMaster,
 	    	includeItemInSelection : true,
 			
 		}).addStyleClass("table");
 	     this.oTable = oTable;
 	    var oLocation = new sap.m.Column({header: new sap.m.Text({text:"Code"}).addStyleClass("Title") });
		 var oColDesc = new sap.m.Column({header: new sap.m.Text({text:"Description"}).addStyleClass("Title") });
		 
		 oTable.addColumn(oLocation).addColumn(oColDesc);
		   
		   oTable.attachSelectionChange(function(oEvent) {
				oController.onItemPress(oEvent);
			});
			var positionData = new sap.ui.layout.form.Form({
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
					  			         items: [carLabel,carInput],
				  					 }).addStyleClass("blockVBox") ]
				  				}),  ]
				  			}),new sap.ui.layout.form.FormContainer({
				  				styleClass :"formWidth",
				  				formElements : [ new sap.ui.layout.form.FormElement({
				  					fields : [ new sap.m.VBox({
					  			         items: [setLabel,setNum]
				  					 }).addStyleClass("blockVBox") ]
				  				}),  ]
				  			}),
				  			]
			});
		   var panelTable = new sap.m.Panel({
				headerText  : "Select Position",
				content : [positionData,oTable],
				expanded: false,
				expandandable : true,
				
			}).addStyleClass("carLayout");
			this.panelTable = panelTable;
		
	
		 var page = new sap.m.Page({
	 			showNavButton : true,
				navButtonPress : function(evt) {
					oController.handleNavBack(evt);
				},
				 title: "Fault Management",
			 /*customHeader : new sap.m.Bar({
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
				}),
				*/
				content: [panelTable]
				 		
						}).addStyleClass("backGroundColor");
	 		
			return page;
	}

});