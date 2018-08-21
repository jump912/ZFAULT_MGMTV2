sap.ui.jsview("fault_mgmt.detailedDescription", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.detailedDescription
	*/ 
	getControllerName : function() {
		return "fault_mgmt.detailedDescription";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.detailedDescription
	*/ 
	createContent : function(oController) {
		//BOI For Defect 15814
		var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout({
			columnsL: 2,
		});
		var findLabel = new sap.m.Label({
			required: true,
			text: "Work Completion Info-What did you find?"});
		this.findLabel = findLabel;

		var actionLabel = new sap.m.Label({
			required: true,
			text: "Work Completion Info-Actions Taken"});
		this.actionLabel = actionLabel;
		
		var find_inp = new sap.m.TextArea("find_inp",{
			enabled:true,
			height: "50%",
			wrapping : "Soft",
			rows: 5,
			visible: true,
			value: ""
		});
	    this.find_inp = find_inp;
	    
	    var action_inp = new sap.m.TextArea("action_inp",{
			enabled:true,
			height: "50%",
			wrapping : "Soft",
			rows: 5,
			visible: true,
			value: ""
		});
	    this.action_inp = action_inp;
	    
		var row7 = new sap.ui.layout.form.Form({
			width:"95%",
			editable: true,
			layout: oLayout3,
			formContainers:[
			                new sap.ui.layout.form.FormContainer({

			                	formElements : [ new sap.ui.layout.form.FormElement({
			                		fields : [ new sap.m.VBox({
			                			items: [findLabel,find_inp]
			                		}).addStyleClass("blockVBox") ]
			                	})]
			                }), new sap.ui.layout.form.FormContainer({

			                	formElements : [ new sap.ui.layout.form.FormElement({
			                		fields : [ new sap.m.VBox({
			                			items: [actionLabel,action_inp]
			                		}).addStyleClass("blockVBox") ]
			                	})]
			                }),

			                ]
		}).addStyleClass("carLayout");//.addStyleClass("formInput");
		this.row7 = row7;
		//EOI For Defect 15814
		var textBoxExtTxt = new sap.m.TextArea("notifLongTxt",{
			enabled:false,
			height: "50%",
			wrapping : "Soft",
			rows: 10,
			visible: false,
			value: ""
		});
	    this.textBoxExtTxt = textBoxExtTxt;
		var descFormExtTxt = new sap.ui.layout.form.Form({
			
			title : "Detailed Description",
			editable : true,
			visible: false,
			layoutData : new sap.m.FlexItemData({
				
			}),
			layout : new sap.ui.layout.form.ResponsiveGridLayout(),
			formContainers : [
			    new sap.ui.layout.form.FormContainer(
			    {
			    
				formElements : [ new sap.ui.layout.form.FormElement({
					fields : [textBoxExtTxt ]
				}) ]
			})

			]
		}).addStyleClass("carLayout");
		this.descFormExtTxt = descFormExtTxt;
		var textBox = new sap.m.TextArea({
			enabled:true,
			height: "50%",
			wrapping : "Soft",
			rows: 10,
			value: "",
			liveChange: function(evt)
			{
				oController.getDescription();
			}});
	    this.textBox = textBox;
		var descForm = new sap.ui.layout.form.Form({
			
			title : "Enter Detailed Description",
			editable : true,
			layoutData : new sap.m.FlexItemData({
				
			}),
			layout : new sap.ui.layout.form.ResponsiveGridLayout(),
			formContainers : [
			    new sap.ui.layout.form.FormContainer(
			    {
			    
				formElements : [ new sap.ui.layout.form.FormElement({
					fields : [textBox ]
				}) ]
			})

			]
		}).addStyleClass("carLayout");
		this.descForm = descForm;		//Insert for Defect 14867 KADAMA20160926
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
			
			content: [descFormExtTxt, descForm, row7]
			 		
					}).addStyleClass("backGroundColor");
		return page;
	}

});