sap.ui.jsview("fault_mgmt.attachments", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.attachments
	*/ 
	getControllerName : function() {
		return "fault_mgmt.attachments";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.attachments
	*/ 
	createContent : function(oController) {
		
		var oDocumentList = new sap.m.List({
//			mode : sap.m.ListMode.Delete,
//			'delete': function(evt)
//			{
//			oController.deleteItem(evt);	
//			},
            showUnread : true,
            itemPress : function(evt){
            	var docValue = evt.getParameters().listItem.data("documentId");
            	var key = evt.getParameters().listItem.data("objectId");
            	var filename =  evt.getParameters().listItem.data("type");
            	 var appView = this.getParent().getParent().oParent.getViewData();
                       var app = appView.app;
                       var prevPage = this.getParent().getParent().oParent;
					  
					  var docValue = evt.getParameters().listItem.data("documentId");
					  if (!app.getPage("docView"))
						{
							var docView = sap.ui.view({id:"docView", viewName:"fault_mgmt.docView", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
							docView.getController().nav=this;
							app.addPage(docView);
						}
						app.getPage("docView").data("prevPage",prevPage);
						app.getPage("docView").data("docValue",docValue);
						var docViewTemp = app.getPage("docView");
						var attachUrl = "/sap/opu/odata/sap/ZGWP_PM_XECM_ATTACHMENTS_SRV";
						var pdf_url = attachUrl+"/ETS_ATTACHMENT(ArcDocId='"+docValue+"'"+",Qmnum='"+key+"')/$value";
						docViewTemp.html_page.setContent('<iframe src= "'+pdf_url+'" width="100%" height="100%"></iframe>');
						app.to("docView");		
																
				  },
			
			items: []
			
			
		});
		this.documentsList = oDocumentList;
		var title = new sap.m.Text({text: ""}).addStyleClass("Title");
		this.title = title;
		var oDocumentListPanel = new sap.m.Panel({
			headerToolbar : new sap.m.Toolbar({
				content : [title,new sap.m.ToolbarSpacer(),
				new sap.m.Button({icon : "sap-icon://add",
					press : function() {
						oController.uploadDialog();
					}
				})]
			}),
			content: [oDocumentList]
		}).addStyleClass("carLayout");
		this.oDocumentListPanel = oDocumentListPanel;
		
		var page = new sap.m.Page({	
				
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
				showNavButton: true,
				title:  "Fault Management",
				navButtonPress: function(evt){
					oController.handleNavBack(evt);
				},
				
				content: [oDocumentListPanel]
				 		
						}).addStyleClass("backGroundColor");
	 		
			return page;
	
	}

});