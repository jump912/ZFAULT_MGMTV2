sap.ui.jsview("fault_mgmt.setNumber", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.setNumber
	*/ 
	getControllerName : function() {
		return "fault_mgmt.setNumber";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.setNumber
	*/ 
	createContent : function(oController) {
		var oTable = new sap.m.Table({
 	    	mode : sap.m.ListMode.SingleSelectMaster,
 	    	includeItemInSelection : true,
 			
 		}).addStyleClass("table");
   		this.oTable = oTable;
   		var panelTable = new sap.m.Panel({
			headerText : "",
			content : [oTable],
			expanded: false,
			expandandable : true,
			
		}).addStyleClass("carLayout");
       	this.panelTable = panelTable;
	
		var searchInput = new sap.m.Input({
			layoutData : new sap.m.FlexItemData({
								}),	
		}).addStyleClass("input").addStyleClass("textUpperCase");
		this.searchInput = searchInput;
				
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
			
			title : "Select Set Number",
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
			}),

			]
		}).addStyleClass("carLayout");
         var oColCarNum = new sap.m.Column({header: new sap.m.Text({text:"Set Number"}).addStyleClass("Title") });
   		 var oColDesc = new sap.m.Column({header: new sap.m.Text({text:"Description"}).addStyleClass("Title") });
   		
 	        oTable.addColumn(oColCarNum).addColumn(oColDesc);
 	    
 	        oTable.attachSelectionChange(function(oEvent) {
			oController.onItemPress(oEvent);
		});
       	
		var page4 = new sap.m.Page({
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
			content: [searchData,panelTable]
			 		
					}).addStyleClass("backGroundColor");
		return page4;
	}

});