sap.ui.controller("fault_mgmt.attachments", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.attachments
*/
	handleNavBack : function(){
        var appView = this.getView().getViewData();
        var app = appView.app;	         
        app.to(this.getView().data("prevPage"));

  },
  getList: function()
	{

	 var oView = this.getView();
	 oView.documentsList.destroyItems();
	 var notifNum = this.getView().data("notifNum");
	 var controller = this;
	 getDocList(notifNum,controller.loadDocList,controller);
	 oView.addStyleClass("customScroll");
	},
	loadDocList: function(data)
	{
		var oModel = new sap.ui.model.json.JSONModel();
		var listitems = data.d.results;
		oModel.setData(listitems);
		var final_data = oModel.getData();
		var oView = this.getView();
		var count = listitems.length;
		this.getView().title.setText("Attachments ("+count+")");
		var prevPage = this.getView().data("prevPage");
		prevPage.attachmentNumber.setEnabled(true);
		prevPage.attachmentNumber.setValue(count);
		prevPage.attachmentButtonFooter.setText("Fault Attachments ("+count+")");
		
		
		 //order_select = equipNum;
         for( i in final_data){
        	 	var a= final_data[i].Filename;
        	 	//Defect 9933 Attachment name is stripped between the fullstops
				//var x = a.split(".");
        	 	var indx = a.lastIndexOf(".");
				//var ext=x[x.length-1];
        	 	var fileName = a.substring(0, indx);
        	 	var ext = a.substring(indx+1, a.length);
				if((ext== "jpeg")||(ext== "JPEG")||(ext== "jpg")||(ext== "JPG")||(ext== "png")||(ext== "PNG"))
				{
					var imagePath = "sap-icon://image-viewer";
				}
				else if ((ext== "PDF")||(ext== "pdf"))
					imagePath = "sap-icon://pdf-attachment";
				
				else if ((ext== "zip")||(ext== "ZIP"))
					imagePath = "sap-icon://attachment-zip-file";
				
				else if ((ext== "txt")||(ext== "TXT"))
					imagePath = "sap-icon://attachment-text-file";
				
				else
					imagePath = "sap-icon://attachment";
				
				
				  var newDocument =  new sap.m.CustomListItem({
					type : "Active",
					content: [			        	          	        	          
								new sap.m.HBox({
								justifyContent : "Start",
								alignItems : "Start",
								items: [ new sap.ui.core.Icon({
									src:imagePath,
									size : "2em"
								}).addStyleClass("iconHBox"),
								new sap.m.Label({
									text: final_data[i].Filename,
									textAlign: "Center",
									width: "100%"
								 })
         
								]
								}).addStyleClass("docHBox")
							]
						}).data("documentId",final_data[i].ArcDocId).data("type",final_data[i].Filename).data("objectId",final_data[i].ObjectId);
						oView.documentsList.addItem(newDocument);
                 	}
	},
  uploadDialog : function() {
		
	  var notifNum = this.getView().data("notifNum");
		var controller = this;
			if(!controller.busyIndicator){
			    
				controller.busyIndicator = new sap.m.BusyDialog()
			  }
	//Calling the Xecm attachment service
			var attachURL = "/sap/opu/odata/sap/ZGWP_PM_XECM_ATTACHMENTS_SRV";
			controller.busyIndicator.open();
			var oFU = new sap.ui.unified.FileUploader({
			
					uploadUrl : attachURL+"/ETS_ATTACHMENT",  
					name: 'FileUpload',
	    			buttonText:'Browse',
	    			width: "89%",
	    			fileType: "jpeg,jpg,png,pdf,JPEG,JPG,PNG,PDF",
					useMultipart: false, 
	    			sendXHR: true,
	    			maximumFilenameLength: 50,
	    			filenameLengthExceed: function(oEvent){
	    				var upldCntnt = this;
	    				jQuery.sap.require("sap.m.MessageBox");
	    			  	sap.m.MessageBox.show("Filename length cannot be more than 50 characters",
	    			  	{
	    			  		  icon: sap.m.MessageBox.Icon.ERROR ,
	    			  		  title: "Error" , 
	    			  		  actions: sap.m.MessageBox.Action.OK, 
	    			  		  onClose: function() {
	    			  			  upldCntnt.oFileUpload.value = "";
	    			  		  },
	    			  		  styleClass: "faultMsgBox"
	    			  	});
	    			  	controller.busyIndicator.close();
	    			},
	    			typeMissmatch: function(oEvent){
	    				jQuery.sap.require("sap.m.MessageBox");
	    			  	sap.m.MessageBox.show("File with extension " + oEvent.getParameter("fileType").toUpperCase()+ " is not allowed. Allowed extensions are: JPG, PNG, PDF",
	    			  	{
	    			  		icon: sap.m.MessageBox.Icon.ERROR ,
	    			  		title: "Error" , 
	    			  		actions: sap.m.MessageBox.Action.OK, 
	    			  		onClose: function() { },
	    			  		styleClass: "faultMsgBox"
	    			  	});
	    			  	controller.busyIndicator.close();
	    			},
	    			uploadOnChange: false,
					uploadComplete: function()
					{   controller.getView().documentsList.destroyItems(); //adding line
							
					if(!this.busyIndicator){
						
						this.busyIndicator = new sap.m.BusyDialog()
					}

				var modal = this;
				var attachURL = "/sap/opu/odata/sap/ZGWP_PM_XECM_ATTACHMENTS_SRV";
				modal.busyIndicator.open();
				var mModel =  new sap.ui.model.odata.ODataModel(attachURL, true) ;
				mModel.read("/ETS_ATTACHMENT?$filter=Qmnum eq'"+notifNum+"'" ,{
	                          success: function (results, status, jqXHR) {
	                        	  
								 var oModel = new sap.ui.model.json.JSONModel({items: results.results});
								var modelData = oModel.getData().items;
								 var final_data =  modelData;

								
									
	                          	for( i in final_data){
	                          		var a= final_data[i].Filename;
	                        	 	//Defect 9933 Attachment name is stripped between the fullstops
	                				//var x = a.split(".");
	                        	 	var indx = a.lastIndexOf(".");
	                				//var ext=x[x.length-1];
	                        	 	var fileName = a.substring(0, indx);
	                        	 	var ext = a.substring(indx+1, a.length);
	                				if((ext== "jpeg")||(ext== "JPEG")||(ext== "jpg")||(ext== "JPG")||(ext== "PNG")||(ext== "png"))
	                				{
	                					var imagePath = "sap-icon://image-viewer";
	                					}
	                				else if ((ext== "PDF")||(ext== "pdf"))
	                					imagePath = "sap-icon://pdf-attachment";
	                				
	                				else if ((ext== "zip")||(ext== "ZIP"))
	                					imagePath = "sap-icon://attachment-zip-file";
	                				
	                				else if ((ext== "txt")||(ext== "TXT"))
	                					imagePath = "sap-icon://attachment-text-file";
	                				else
	                					imagePath = "sap-icon://attachment";
	                				
	                				
	                				  var newDocument =  new sap.m.CustomListItem({
	                					type : "Active",
	                					content: [			        	          	        	          
	                								new sap.m.HBox({
	                								justifyContent : "Start",
	                								alignItems : "Start",
	                								items: [ new sap.ui.core.Icon({
	                									src:imagePath,
	                									size : "2em"
	                								}).addStyleClass("iconHBox"),
	                								new sap.m.Label({
	                									text: final_data[i].Filename,                									  
	                									textAlign: "Center",
	                									width: "100%"
	                								 })
	                         
	                								]
	                								}).addStyleClass("docHBox")
	                							]
	                						}).data("documentId",final_data[i].ArcDocId).data("type",final_data[i].Filename).data("objectId",final_data[i].ObjectId);
									controller.getView().documentsList.addItem(newDocument);
	                				var count = final_data.length;
	                				controller.getView().title.setText("Attachments ("+count+")");
	                				var prevPage = controller.getView().data("prevPage");
	                				prevPage.attachmentNumber.setEnabled(true);
	                				prevPage.attachmentNumber.setValue(count);
	                				prevPage.attachmentButtonFooter.setText("Fault Attachments ("+count+")");
	                				modal.busyIndicator.close();
	                				sap.m.MessageToast.show("File Uploaded Successfully.");
	                				
	                          	}
	                         
						
	              },
	              error: function (jqXHR, status) {
	                               alert("error loading");
	                               controller.busyIndicator.close();
	              }
	              });
				      controller.busyIndicator.close();
					}
	          
	                             
	    });
		
			var dialog = new sap.m.Dialog({
				title : "File Upload",
				type : "Message",
				content : [oFU],
				buttons: [
				new sap.m.Button({
					text : "Upload",
					press : function(evt) {
						oFU.destroyHeaderParameters();
			
							if(!this.busyIndicator)
						  {
						    this.busyIndicator = new sap.m.BusyDialog();
						  }
							var modal = this;
					 modal.busyIndicator.open();
	
//new Code for 24152 here
					 

	        		  oFU.destroyHeaderParameters();
	        	
	        			  var f = sap.ui.getCore().byId(oFU.getId()).oFileUpload.files[0];
	        			  if(f){
	        				  var oModel =  new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZGWP_PM_XECM_ATTACHMENTS_SRV/ETS_ATTACHMENT", true);
	        				  //var oModel =  new sap.ui.model.odata.ODataModel(vController.mainDataModel.sServiceUrl, true)
	        				  oModel.refreshSecurityToken( function(a, b) {
	        					  controller.dialog.close();
	        					  var token = b.headers["x-csrf-token"];
	        					  var a= oFU.getValue();
	        					  var x = a.split(".");
	        					  var ext=x[x.length-1];
	        					  var func = notifNum;
	        					  var newFileName = (x[0]);

	        					  oFU.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "slug", value: func+","+newFileName+","+ext.toLowerCase()}));
	        					  oFU.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "X-CSRF-Token", value: token }));
	        					  // call the upload method
	        					  controller.busyIndicator.open();
	        					  oFU.upload();
	        				  }, function(a) {
	        					  console.log(a);
	        				  }, true);
	        			  }else{
	        				  sap.m.MessageBox.show(vController.mFSMsg.getProperty("filenotselected"), {
	        					  icon: vController.mFSMsg.getProperty("popError"),
	        					  title: vController.mFSMsg.getProperty("popTitleError"),
	        					  actions: [sap.m.MessageBox.Action.OK],
	        					  onClose: function(oAction) {
	        						  vController.dialog.open();
	        					  }
	        				  });
	        			  }

	        
// New code ends here	        	  
					 
					 //Old Code of 24152 here
					 /*	$.ajax({
						type : 'GET',
						url: faultServiceUrl+"/",
						datatype : "",
						contentType: "application/atom+xml;type\x3dentry;",
						
			            headers: {
			                "X-CSRF-Token": "fetch"
			            },
						success : function(data,textStatus, request){
							modal.busyIndicator.close();
							var token = request.getResponseHeader('X-CSRF-Token');
							var a= oFU.getValue();
                    	 	//Defect 9933 Attachment name is stripped between the fullstops
            				//var x = a.split(".");
                    	 	var indx = a.lastIndexOf(".");
            				//var ext=x[x.length-1];
                    	 	var fileName = a.substring(0, indx);
                    	 	var ext = a.substring(indx+1, a.length);
							var func = notifNum;
							
							if(token && token!=undefined && token.trim()!=''){
	                    	 	//Defect 9933 Attachment name is stripped between the fullstops
								//oFU.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "slug", value: func+","+x[0]+","+ext+","+"N"}));  
								oFU.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "slug", value: func+","+fileName+","+ext+","+"N"}));
								oFU.insertHeaderParameter(new sap.ui.unified.FileUploaderParameter({name: "X-CSRF-Token", value: token }));
								// call the upload method
								oFU.upload();
							 	modal.busyIndicator.close();
							}
							modal.busyIndicator.close();
						},
						error : function(XMLHttpRequest, textStatus, errorThrown){
							alert("Error: " + errorThrown + "; Status: " + textStatus);
							controller.dialog.close();
						}
					});*/
	        			  
	        			  //old code for 24152 ends here
		modal.busyIndicator.close();
						controller.dialog.close();
					}
				}),
				 new sap.m.Button({
						text : "Cancel",
						press : function(
								evt) {
							controller.dialog.close();
							controller.busyIndicator.close();
						}
					})],
				
			});
			this.dialog = dialog;
		
		this.dialog.open();
		controller.busyIndicator.close();
	},
	deleteItem : function(evt)
	{
		var controller = this;
		var docValue = evt.getParameters().listItem.data("documentId");
		var notifNum = this.getView().data("notifNum");
		jQuery.sap.require("sap.m.MessageBox");
		sap.m.MessageBox.show("Do you want to delete the attachment?",{
			icon: sap.m.MessageBox.Icon.WARNING, 
			title: "Delete Attachment",
			actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO ],
			onClose: function(oAction){
				if(oAction === "YES")
				{
					removeDocList(notifNum,docValue,controller.removeDoc,controller);			
				}
				
			},
			styleClass : "faultMsgBox"
		});
		
	},
	removeDoc : function(data)
	{
						var notifNum = this.getView().data("notifNum");
						var controller = this;
						var status = "Attachment deleted successfully";
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(status,{
							icon: sap.m.MessageBox.Icon.SUCCESS, 
							title: "Success",
							actions: sap.m.MessageBox.Action.OK, 
							onClose: function() {
							},
							styleClass : "faultMsgBox"
						});
						controller.getView().documentsList.destroyItems();
						getDocList(notifNum, controller.loadDocList, controller);
						this.getView().addStyleClass("customScroll");
	    
		
	},
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.attachments
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.attachments
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.attachments
*/
//	onExit: function() {
//
//	}

});