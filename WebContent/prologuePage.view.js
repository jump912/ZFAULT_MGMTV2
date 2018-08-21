sap.ui.jsview("fault_mgmt.prologuePage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.prologuePage
	*/ 
	getControllerName : function() {
		return "fault_mgmt.prologuePage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.prologuePage
	*/ 
	createContent : function(oController) {
		
		var app = this.getViewData().app;
		this.controller = oController;	
		this.mandatory = [];
		
		
		var carInput = new sap.m.Input({
			id : "carNumberInput1",
			maxLength :4 ,
			layoutData : new sap.m.FlexItemData({
			alignSelf: "Center",
			
			}),
			valueHelpRequest : function(evt) {
				 oController.chooseCarNumber(evt,this);
			},
			showValueHelp: true,
			enabled : true,
			change: function(){
				oController.ValidateChangeCarNum();
			}
			});
		this.carInput = carInput;

		var setNum = new sap.m.Input({layoutData : new sap.m.FlexItemData({
			alignSelf: "Center",
			
		}),
			
			showValueHelp: true,
			maxLength :4 ,
			valueHelpRequest : function(evt) {
				oController.chooseSetNumber(evt,this);
			},
			change: function(){
				oController.ValidateChangeCarNum();
				},
			enabled : true,
			}).addStyleClass("textUpperCase");
	
		this.setNum = setNum;
		
		
               var control = [];
               
		var pageForm = new sap.ui.layout.form.SimpleForm(
				{
					maxContainerCols: 2,
					content:[

					         new sap.m.VBox({  
					        	 items: [  
					        	         
					        	         new sap.m.Label({text:"Car Number",
					        	        	 required: true,
					                          layoutData : new sap.m.FlexItemData({
							                             alignSelf: "Center",
							                                    }),
				                                                 }),
				                                        carInput,	 ],
					         }),
					         
					         new sap.m.VBox({  
					        	 items: [  
                              new sap.m.Label({text:"Set Number ",
                            	  required: true,
	                        layoutData : new sap.m.FlexItemData({
	                                       	alignSelf: "Center",
	                                  	}),  
                                       }),
                                           setNum,	 ],		
					         }),
					         
				],
				});
		control.push(pageForm);
		
		var btnProceed = new sap.m.Button({
			text : "Proceed",
			icon: "sap-icon://create",
			press : function(evt)
			{
				oController.validateBeforeNavigate(evt);
			}
		});
		this.btnProceed = btnProceed;
		 var page1 =  new sap.m.Page({
	 			/*customHeader : new sap.m.Bar({
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
		        footer : new sap.m.Bar({
					
					contentRight : [
					    btnProceed,  ]
				}),
				content : [ pageForm]
			}).addStyleClass("backGroundColor");
	         
	         
	 		 app.addPage(page1);
	 		
			 return page1;
				
	}

});