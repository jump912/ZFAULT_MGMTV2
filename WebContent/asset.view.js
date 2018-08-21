sap.ui.jsview("fault_mgmt.asset", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.asset
	*/ 
	getControllerName : function() {
		return "fault_mgmt.asset";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.asset
	*/ 
	createContent : function(oController) {
		this.controller = oController;
		var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout( {
			emptySpanL: 1,
			emptySpanM: 1,
			columnsL: 3,
			columnsM: 3,
		});
		var carInput = new sap.m.Input({layoutData : new sap.m.FlexItemData({
			alignSelf: "Center",
			
		}),
			
			enabled : false,
			});
		this.carInput = carInput;
		var dateTime = new sap.m.DateTimeInput({layoutData : new sap.m.FlexItemData({
			alignSelf: "Center",
			
		}),
			
			enabled : false,
			placeholder : "Time Picker",
			type : "DateTime",
			valueFormat : "dd-MM, yyyy HH:mm",
			displayFormat: "dd-MMM-yyyy HH:mm",
			});
		this.dateTime = dateTime;
		var setNum = new sap.m.Input({layoutData : new sap.m.FlexItemData({
			alignSelf: "Center",
			
		}),
			
			
			enabled : false,
			});
		this.setNum = setNum;
		var carLabel = new sap.m.Label({
			text: "Car Number"});
			this.carLabel = carLabel;
		
			var setLabel = new sap.m.Label({
			text: "Set Number"});
			this.setLabel = setLabel;
			
			var dateTimeLabel = new sap.m.Label({
				text: "Fault Date/Time"});
				this.dateTimeLabel = dateTimeLabel;

		var assetData = new sap.ui.layout.form.Form({
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
			  				})]
			  			}), new sap.ui.layout.form.FormContainer({
			  				styleClass :"formWidth",
			  				formElements : [ new sap.ui.layout.form.FormElement({
			  					fields : [ new sap.m.VBox({
				  			         items: [setLabel,setNum]
			  					 }).addStyleClass("blockVBox")]
			  				}),  ]
			  			}),new sap.ui.layout.form.FormContainer({
			  				styleClass :"formWidth",
			  				formElements : [ new sap.ui.layout.form.FormElement({
			  					fields : [new sap.m.VBox({
				  			         items: [dateTimeLabel,dateTime]
			  					 }).addStyleClass("blockVBox")]
			  				}),  ]
			  			}),
			  			]
		});
		
	 	   var oTransTree = new sap.ui.commons.Tree("hierarchyTree", {
	 		  showHeaderIcons : false,
	 		   select : function(evt){
	 			   oController.getOpenNotifications(evt);
	 		   }
	 		   
	 	   });
	 	   
	 	   this.assetTree = oTransTree;


		  var assetTree = new sap.ui.layout.form.Form({
				
				editable : true,
				layoutData : new sap.m.FlexItemData({
					
				}),
				layout : new sap.ui.layout.form.ResponsiveGridLayout(),
				formContainers : [
				    new sap.ui.layout.form.FormContainer(
				    {
				    
					formElements : [ new sap.ui.layout.form.FormElement({
						fields : [oTransTree ]
					}) ]
				}),

				]
			});
		var app = sap.ui.getCore().byId("fms_app");
		
		 var panelTable = new sap.m.Panel({
				headerText  : "Asset Structure",
				content : [assetData,assetTree],
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
		app.addPage(page);
		return page;
	}

});