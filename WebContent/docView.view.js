sap.ui.jsview("fault_mgmt.docView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.docView
	*/ 
	getControllerName : function() {
		return "fault_mgmt.docView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.docView
	*/ 
	createContent : function(oController) {
		
		var docValue = this.data("docValue");
		var doc_url = faultServiceUrl+"/ETS_GET_ATTACH_CONTENTS(SoObjNo='"+docValue+"')/$value";
		var html_page = new sap.ui.core.HTML({preferDOM:true,content:'<iframe src= "'+doc_url+'" width="100%" height="100%"></iframe>'})
		this.html_page=html_page;
		
 		return new sap.m.Page({
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
			content: [html_page]
		}).addStyleClass("backGroundColor");
	}

});