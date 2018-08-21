sap.ui.jsview("fault_mgmt.symptom", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.symptom
	*/ 
	getControllerName : function() {
		return "fault_mgmt.symptom";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.symptom
	*/ 
	
	createContent : function(oController) {
	

		var oColCode = new sap.m.Column({
			header : new sap.m.Text({
				text : "Code Group"
			}).addStyleClass("Title")
		});
		var oColDesc = new sap.m.Column({
			header : new sap.m.Text({
				text : "Symptom Group"
			}).addStyleClass("Title")
		});
		var oColDamage = new sap.m.Column({
			header : new sap.m.Text({
				text : "Code"
			}).addStyleClass("Title")
		});
		var oColDamageDesc = new sap.m.Column({
			header : new sap.m.Text({
				text : "Symptom"
			}).addStyleClass("Title")
		});

		var oTable_1 = new sap.m.Table({
			mode : sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection : true,
			}).addStyleClass("table");
		oTable_1.addColumn(oColDamageDesc);

		oTable_1.attachSelectionChange(function(oEvent) {
			oController.onItemPress(oEvent);
		});
		this.oTable_1 = oTable_1;
		
		var oTable = new sap.m.Table({
			mode : sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection : true,
		}).addStyleClass("table");
		this.oTable = oTable;
		oTable.addColumn(oColDesc);
		oTable.attachSelectionChange(function(oEvent) {
			oController.onItemPressSymptom(oEvent);
		});

		 	var tableTitle = new sap.m.Text({
			}).addStyleClass("Title");
		this.tableTitle = tableTitle;
		
		var symptomForm = new sap.ui.layout.form.Form({

			title : "Select Symptom",
			editable : true,
			layoutData : new sap.m.FlexItemData({

			}),
			layout : new sap.ui.layout.form.ResponsiveGridLayout({
				labelSpanL: 2,
				labelSpanM: 2,
				columnsL : 2,
				columnsM : 2	
			}),
			 
			formContainers : [ new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({

					fields : [ new sap.m.Text({
						}).addStyleClass("Title") ]
				}), new sap.ui.layout.form.FormElement({
					fields : [ oTable ]
				}) ]
			}), new sap.ui.layout.form.FormContainer({
				formElements : [ new sap.ui.layout.form.FormElement({
					fields : [ tableTitle ]
				}), new sap.ui.layout.form.FormElement({
					fields : [ oTable_1 ]
				}) ]
			})

			]
		}).addStyleClass("carLayout");

	var page3 = new sap.m.Page({
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
			content : [ symptomForm ]

		}).addStyleClass("backGroundColor");
	
		return page3;
	}

});