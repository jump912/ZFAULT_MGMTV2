sap.ui.jsview("fault_mgmt.searchResults", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.searchResults
	*/ 
	getControllerName : function() {
		return "fault_mgmt.searchResults";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.searchResults
	*/ 
	createContent : function(oController) {
		
		var oLinked = new sap.m.CheckBox({
        	selected: false,
        	enabled: false,
        	
        });
        this.oLinked = oLinked;
		var oTable = new sap.m.Table({
	    	mode : sap.m.ListMode.SingleSelectMaster,
	    	includeItemInSelection : true,
			
		}).addStyleClass("dialogTable");
        this.oTable = oTable;
        
        var oModel = new sap.ui.model.json.JSONModel();
        oTable.setModel(oModel);
		
		var oColNotification = new sap.m.Column({header: new sap.m.Text({text:"Fault No. \n Date/Time"}).addStyleClass("Title") });
		var oColPosition = new sap.m.Column({header: new sap.m.Text({text:"Position"}).addStyleClass("Title") });
  		var oColDateTime = new sap.m.Column({header: new sap.m.Text({text:"Daily Incident No. \n Date/Time"}).addStyleClass("Title") });
//  		var oColCarNum = new sap.m.Column({header: new sap.m.Text({text:"Car No."}).addStyleClass("Title") });
  		var oColAsset = new sap.m.Column({header: new sap.m.Text({text:"Asset"}).addStyleClass("Title") });
  		var oColSymptom = new sap.m.Column({header: new sap.m.Text({text:"Symptom"}).addStyleClass("Title") });
  		var oColPriority = new sap.m.Column({header: new sap.m.Text({text:"Priority"}).addStyleClass("Title") });
  		var oColSetno = new sap.m.Column({header: new sap.m.Text({text:"Set No. \n Car No."}).addStyleClass("Title") });
  		var oColTripno = new sap.m.Column({header: new sap.m.Text({text:"Trip No."}).addStyleClass("Title") });
  		var oColLinked = new sap.m.Column({header: new sap.m.Text({text:"Work Order No."}).addStyleClass("Title") });
//  		Changes as per version 1.2
  		var oColPrimary = new sap.m.Column({header: new sap.m.Text({text:"Primary Fault No."}).addStyleClass("Title") });
  		//Defect #10865 - NARASIMB - 20052016 - Renamed the lable from Linked Fault No to Primary Fault No
		
	    oTable.addColumn(oColNotification).addColumn(oColTripno).addColumn(oColDateTime).addColumn(oColSetno).addColumn(oColAsset).addColumn(oColPosition).addColumn(oColSymptom).addColumn(oColPriority).addColumn(oColPrimary).addColumn(oColLinked);
            
            oTable.attachSelectionChange(function(oEvent) {
			oController.onItemPress(oEvent);
			});
		var title = new sap.m.Text({text: ""}).addStyleClass("Title");
		this.title = title;
		
		var titleList = new sap.m.Text({
			text : "List Mode",
			layoutData : new sap.m.FlexItemData({
				alignSelf  : "Center",
				}),
		}).addStyleClass("Title");
		
		var switchButton = new sap.m.Switch({
			
			state : false,
			customTextOff : " ",
			customTextOn : " ",
			change : function(evt)
			{
				oController.getState();
			},
			layoutData : new sap.m.FlexItemData({
				growFactor : 1,
				}),
			
		}).addStyleClass("switch");
	this.switchButton = switchButton;
	
	var titleDuplicate = new sap.m.Text({
		text : "Duplicate Reporting Mode" ,
		layoutData : new sap.m.FlexItemData({
			alignSelf  : "Center",
		}),
	}).addStyleClass("Title").addStyleClass("duplicateTitle");
	
	var hBoxTitle = new sap.m.HBox({
		displayInline : true,
		items: [titleList,switchButton,titleDuplicate]
	}).addStyleClass("edit");
		
		 var panelTable = new sap.m.Panel({
			headerText: "",
				content : [hBoxTitle,oTable],
				expanded: false,
				expandandable : true,
				
			}).addStyleClass("carLayout");
			this.panelTable = panelTable;
			var reviewMarkButton = new sap.m.Button({
		    	text : "Review / Update",
		    	icon : "sap-icon://edit",
		    	press : function(evt) {
		    		 oController.openUpdate(evt)
				}
		    });
			this.reviewMarkButton = reviewMarkButton;
			
			var showLongTextBtn = new sap.m.Button({
		    	text : "Show Long Text",
		    	icon : "sap-icon://document-text",
		    	press : function(evt) {
		    		 oController.getFaultLongTxt(evt)
				}
		    });
			this.showLongTextBtn = showLongTextBtn;			
			
			var oTableDup = new sap.m.Table({
		    	mode : sap.m.ListMode.SingleSelectLeft,
		    	includeItemInSelection : true,
				
			}).addStyleClass("dialogTable");
			this.oTableDup = oTableDup;
			oTableDup.attachSelectionChange(function(oEvent) {
			});
			
			var rModel = new sap.ui.model.json.JSONModel();
			oTableDup.setModel(rModel);
			
			var oColNotification = new sap.m.Column({header: new sap.m.Text({text:"Fault No. \n Date/Time"}).addStyleClass("Title") });
	  		var oColPosition = new sap.m.Column({header: new sap.m.Text({text:"Position"}).addStyleClass("Title") });
	  		var oColDateTime = new sap.m.Column({header: new sap.m.Text({text:"Daily Incident No. \n Date/Time"}).addStyleClass("Title") });
	  		var oColCarNum = new sap.m.Column({header: new sap.m.Text({text:"Car No."}).addStyleClass("Title") });
	  		var oColAsset = new sap.m.Column({header: new sap.m.Text({text:"Asset"}).addStyleClass("Title") });
	  		var oColSymptom = new sap.m.Column({header: new sap.m.Text({text:"Symptom"}).addStyleClass("Title") });
	  		var oColPriority = new sap.m.Column({header: new sap.m.Text({text:"Priority"}).addStyleClass("Title") });
	  		var oColSetno = new sap.m.Column({header: new sap.m.Text({text:"Set No."}).addStyleClass("Title") });
	  		var oColTripno = new sap.m.Column({header: new sap.m.Text({text:"Trip No."}).addStyleClass("Title") });
	  		var oColLinked = new sap.m.Column({header: new sap.m.Text({text:"Work Order No."}).addStyleClass("Title") });
			
	  		oTableDup.addColumn(oColNotification).addColumn(oColTripno).addColumn(oColDateTime).addColumn(oColCarNum).addColumn(oColSetno).addColumn(oColAsset).addColumn(oColPosition).addColumn(oColSymptom).addColumn(oColPriority).addColumn(oColLinked);
	  		
		
		    
	  		
	  		var savebtn = new sap.m.Button({
				text : "Save",
				icon : "sap-icon://save",
				press : function(evt) {
					oController.handleMarkDuplicates(evt);
				}
			}).addStyleClass("markDupbutton");
	  		
			var cancelbtn = new sap.m.Button({
				text : "Cancel",
				icon: "sap-icon://sys-cancel",
				press : function(evt) {
					oController.handleCloseDialog(evt);
				}
			}).addStyleClass("markDupbutton");
	  		
		/*	var dialogButtons = new sap.m.FlexBox({
				justifyContent: "SpaceAround",
				items : [cancelbtn,savebtn,]
			});*/
	  		
	  		
	  		
			
			var markAsDupDialog = new sap.m.Dialog("markDupDialog",{
				title : "Report Duplicate Faults - Select Primary",
				contentWidth : "1500px",
				horizontalScrolling : true,
				verticalScrolling : true,
				content: [oTableDup],
				buttons:[cancelbtn, savebtn,]
				
			});
			this.markAsDupDialog = markAsDupDialog;
			
			
			
			 var oWONum = new sap.m.Column({header: new sap.m.Text({text:"Notification Number"}).addStyleClass("Title") });
			 var oMessage = new sap.m.Column({header: new sap.m.Text({text:"Result"}).addStyleClass("Title") });
			 var oType = new sap.m.Column({header: new sap.m.Text({text:""}).addStyleClass("Title") });
			
			 var oTable_create = new sap.m.Table("create",{
			 	includeItemInSelection : true,
			 	}).addStyleClass("dialogTable");
			 this.oTable_create = oTable_create;
			 oTable_create.addColumn(oType).addColumn(oMessage).addColumn(oWONum);
			 var closeButton = new sap.m.Button({
					text : "OK",
					press : function(evt) {
						oController.closeFilterDialog(evt);
					}
				}).addStyleClass("notifybutton");
			 var closeFilter = new sap.m.Button({
					text : "Cancel",
					press : function(evt) {
					}
				}).addStyleClass("filterButton");
			 var okApplyFilter = new sap.m.Button({
					text : "OK",
					press : function(evt) {
						oController.applyFilter();
					}
				}).addStyleClass("filterButton");
			 var createNotification = new sap.m.Dialog("createDialog",{
			 	title : "Confirmation Results",
			 	contentWidth : "800px",
			 	horizontalScrolling : true,
			 	verticalScrolling : true,
			 	content: [oTable_create],
			 	buttons:[closeButton],
			 	
			 });
			 this.createNotification = createNotification;
			
			 
			 
			 
			 var oFaultNum = new sap.m.Column({header: new sap.m.Text({text:"Fault Number"}).addStyleClass("Title") });
			 var oMessage_r = new sap.m.Column({header: new sap.m.Text({text:"Result"}).addStyleClass("Title") });
			 
			
			 var oTable_response = new sap.m.Table({
			 	includeItemInSelection : true,
			 	}).addStyleClass("dialogTable");;
			 
			 	oTable_response.addColumn(oFaultNum).addColumn(oMessage_r);
			 var closeButton = new sap.m.Button({
					text : "OK",
					press : function(evt) {
						oController.closeResponseDialog(evt);
					}
				}).addStyleClass("markDupbutton");
			 this.oTable_response = oTable_response;
			
			 /* var responseDialog = new sap.m.Dialog("responseDupDialog",{*/ //Commented for Defect 14859 KADAMA20160912
			  var responseDialog = new sap.m.Dialog({ //Insert for Defect 14859 KADAMA20160912
				 title : "Report Duplicate Faults - Results",
			 	contentWidth : "1500px",
			 	horizontalScrolling : true,
			 	verticalScrolling : true,
			 	content: [oTable_response],
			 	buttons:[closeButton],
			 	
			 });
			 this.responseDialog = responseDialog;
			 
			
			
			
			
			
			
			
 		return new sap.m.Page({	
 			showNavButton : true,
			navButtonPress : function(evt) {
				oController.handleNavBack(evt);
			},
			 title: "Fault Search Results",
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
				    	text : "Fault Search Results"
				    }).addStyleClass("appTitle"), 
					              
					 ]
				}),*/
				footer : new sap.m.Bar({
					
					contentLeft : [reviewMarkButton, showLongTextBtn],
		        	contentRight : [
					   
					  ]
				}),
				content: [panelTable]
				 		
						}).addStyleClass("backGroundColor");
	}

});