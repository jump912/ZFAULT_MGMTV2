sap.ui.jsview("fault_mgmt.carNumber", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf fault_mgmt.carNumber
	 */ 
	getControllerName : function() {

		return "fault_mgmt.carNumber";
	},


	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf fault_mgmt.carNumber
	 */ 
	createContent : function(oController) {

		var oTable = new sap.m.Table({
			mode : sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection : true,

		}).addStyleClass("table");
		this.oTable = oTable;

		var searchInput = new sap.m.Input({
			layoutData : new sap.m.FlexItemData({
			}),	
		}).addStyleClass("input").addStyleClass("textUpperCase");
		this.searchInput = searchInput; 
		var oColCarNum = new sap.m.Column({header: new sap.m.Text({text:"Car Number"}).addStyleClass("Title") });
		var oColDesc = new sap.m.Column({header: new sap.m.Text({text:"Description"}).addStyleClass("Title") });
		var oColPos = new sap.m.Column({header: new sap.m.Text({text:"Car Position"}).addStyleClass("Title") });


		oTable.addColumn(oColCarNum).addColumn(oColDesc).addColumn(oColPos);

		oTable.attachSelectionChange(function(oEvent) {
			oController.onItemPress(oEvent);
		});
		var panelTable = new sap.m.Panel({
			headerText  : "",
			content : [oTable],
			expanded: false,
			expandandable : true,

		}).addStyleClass("carLayout");
		this.panelTable = panelTable;

		var oButton = new sap.m.Button({
			text: "Search",
			iconFirst: true,
			icon : "sap-icon://search",
			width : "10rem",
			press : function(evt)
			{
				oController.getSearchData();
			}
		}).addStyleClass("button");
		var search_box = new sap.m.FlexBox({

			items : [searchInput,oButton]
		});

		var searchData = new sap.ui.layout.form.Form({

			title : "Search by Set Number",
			editable : true,
			layoutData : new sap.m.FlexItemData({

			}),

			layout : new sap.ui.layout.form.ResponsiveGridLayout(),
			formContainers : [
			                  new sap.ui.layout.form.FormContainer(
			                		  {

			                			  formElements : [ new sap.ui.layout.form.FormElement({

			                				  fields : [search_box  ]
			                			  }) ]
			                		  })

			                  ]
		}).addStyleClass("carLayout");

//		Start of fix by KONCHADS on 160616 for Defect # 11915
		var carSearchInput = new sap.m.Input({
			layoutData : new sap.m.FlexItemData({
			}),
			type:"Number",
			maxLength:4,
			/*			change: function(){
				oController.searchCar();
			}, */
		}).addStyleClass("input").addStyleClass("textUpperCase");
		this.carSearchInput = carSearchInput; 
		var oCheckButton = new sap.m.Button({
			text: "Select",
			iconFirst: true,
			icon : "sap-icon://accept",
			width : "10rem",
			press : function(evt)
			{
				oController.searchCar();
			}
		}).addStyleClass("button");
		var car_search_box = new sap.m.FlexBox({
			items : [carSearchInput,oCheckButton]
		});
		var carSearchData = new sap.ui.layout.form.Form({
			title : "Enter Car Number",
			editable : true,
			layoutData : new sap.m.FlexItemData({}),
			layout :  new sap.ui.layout.form.ResponsiveGridLayout(),
			formContainers : [
			                  new sap.ui.layout.form.FormContainer(
			                		  {
			                			  formElements : [ new sap.ui.layout.form.FormElement({
			                				  fields : [car_search_box ]
			                			  }) ]
			                		  })
			                  ]
		}).addStyleClass("carLayout");
		this.carSearchData = carSearchData;

//		End of fix by KONCHADS on 160616 for Defect # 11915	
		var cancelBtn = new sap.m.Button({
			text : "Cancel",
			icon : "sap-icon://sys-cancel",
			visible : false,
			press: function(evt){ oController.handleNavBack(); }
		});

		var saveBtn =        new sap.m.Button({
			text : "OK",
			icon : "sap-icon://accept",
			visible : false,
			press: function(evt){ oController.onAccept(evt, this); }
		});
		this.cancelBtn = cancelBtn;
		this.saveBtn = saveBtn;

		var page2 = new sap.m.Page({	
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
				}),*/

//			content: [searchData,panelTable], // fix by KONCHADS on 160616 for Defect # 11915	
			content: [carSearchData,searchData,panelTable],

			footer : new sap.m.Bar({

				contentRight : [cancelBtn,saveBtn


				                ]
			}),


		}).addStyleClass("backGroundColor");
		return page2;

	}

});