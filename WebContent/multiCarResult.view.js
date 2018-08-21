sap.ui.jsview("fault_mgmt.multiCarResult", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.multiCarResult
	*/ 
	getControllerName : function() {
		return "fault_mgmt.multiCarResult";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.multiCarResult
	*/ 
	createContent : function(oController) {
		var oTable = new sap.m.Table({
 	    	mode : sap.m.ListMode.SingleSelectMaster,
 	    	includeItemInSelection : true,
 			
 		}).addStyleClass("tableMultiResult");
 	     this.oTable = oTable;
 	     var oCarNum = new sap.m.Column({width:"15%",header: new sap.m.Text({text:"Car Number"}).addStyleClass("Title") });
		 var oColDesc = new sap.m.Column({width:"20%",header: new sap.m.Text({text:"Description"}).addStyleClass("Title") });
		 var oColPosition = new sap.m.Column({width:"10%",header: new sap.m.Text({text:"Car Position"}).addStyleClass("Title") }); // changes as per version 1.2
		 var oColButton = new sap.m.Column({width:"2%"}); // changes as per version 1.2
		 var oColResult = new sap.m.Column({width:"35%",header: new sap.m.Text({text:"Result"}).addStyleClass("Title") });
		 oTable.addColumn(oCarNum).addColumn(oColDesc).addColumn(oColPosition).addColumn(oColButton).addColumn(oColResult);
		   
		   oTable.attachSelectionChange(function(oEvent) {
				oController.onItemPress(oEvent);
			});
		  
			
			var oLayout2 = new sap.ui.layout.form.ResponsiveGridLayout({
				labelSpanL: 5,
				columnsL: 1,
				emptySpanL: 1,
			});
			
			var sympLabel = new sap.m.Label({
				text: "Symptom"});
			this.sympLabel = sympLabel;
			
			var sympDesc = new sap.m.Input({
				editable: false,
				value: "",
							
			}); 
			
			
			this.sympDesc = sympDesc;
			
			var formData = new sap.ui.layout.form.Form({
				editable : true,
				layout : oLayout2,
				formContainers : [
				    new sap.ui.layout.form.FormContainer(
				    {
				    
					formElements : [new sap.ui.layout.form.FormElement({
				  					fields : [new sap.m.VBox({
				 	  			         items: [sympLabel,sympDesc],
				  					 }).addStyleClass("blockVBox") ]
				  				}),new sap.ui.layout.form.FormElement({
						fields : [ oTable ]
					}), ]
				}), 

				]
			});
			
			 var panelTable = new sap.m.Panel({
				   headerText  : "Multi-Car Fault for Set",
					content : [formData],
					expanded: false,
					expandandable : true,
					
				}).addStyleClass("carLayout");
				this.panelTable = panelTable;
				
				var review =  new sap.m.Button({
					text : "Review / Update",
					icon : "sap-icon://edit",
					press : function(evt) {
						oController.openReviewUpdate(evt);
					}
				});
				this.review = review;
				
				var done =  new sap.m.Button({
					text : "Done",
					icon : "sap-icon://accept",
					press : function(evt) {
						window.location.reload();
					}
				});
				
		  var page2 = new sap.m.Page({	
				
			  customHeader : new sap.m.Bar({
					contentLeft : [	new sap.m.Button({
		                icon: "sap-icon://home",
	                    text : "",
	       press : function(evt){
	    	   window.location.reload();
	         }
	         }),
					
					],
					contentMiddle : [new sap.m.Label({
				    	text : "Multi-Car Fault Creation Results"
				    }).addStyleClass("appTitle"), 
					              
					 ]
				}),
				
				 footer : new sap.m.Bar({
						
						contentLeft : [review],
						contentRight: [done]
					}),
				content: [panelTable]
				 		
						}).addStyleClass("backGroundColor");
	 		
			return page2;
	}

}); 