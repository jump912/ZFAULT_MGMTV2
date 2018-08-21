sap.ui.jsview("fault_mgmt.searchFault", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fault_mgmt.searchFault
	*/ 
	getControllerName : function() {
		return "fault_mgmt.searchFault";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fault_mgmt.searchFault
	*/ 
	createContent : function(oController) {
		var carLabel = new sap.m.Label({
			text : "Car Number"
		});
		this.carLabel = carLabel;

		var setLabel = new sap.m.Label({
			text : "Set Number"
		});
		this.setLabel = setLabel;

		var tripLabel = new sap.m.Label({
			text : "Trip Number"
		});
		this.tripLabel = tripLabel;

		var dateFrom = new sap.m.Label({
			text : "Date From"
		});
		this.dateFrom = dateFrom;
		var repPhaseLabel = new sap.m.Label({
			text: "Report Phase"});
		this.repPhaseLabel = repPhaseLabel;
		
		var dateTo = new sap.m.Label({
			text: "Date To"});
		this.dateTo = dateTo;
		
		var faultSourceLabel = new sap.m.Label({
			text: "Fault Source"});
		this.faultSourceLabel = faultSourceLabel;
		
		var locationLabel = new sap.m.Label({
			text: "Location"});
		this.locationLabel = locationLabel;
		
		var assetLabel = new sap.m.Label({
			text: "Asset"});
		this.assetLabel = assetLabel;
		
		var priorityLabel = new sap.m.Label({
			text: "Priority"});
		this.priorityLabel = priorityLabel;
				
		var statusLabel = new sap.m.Label({
			text: "Status"});
		this.statusLabel = statusLabel;
		
		var IIMSLabel = new sap.m.Label({
			text: "Daily Incident Number"});
		this.IIMSLabel = IIMSLabel;
		
		var FaultNumLabel = new sap.m.Label({
			text: "Fault Number"});
		this.FaultNumLabel = FaultNumLabel;
		
		var auditNumLabel = new sap.m.Label({
			text: "TSR/TPC/Audit Number"});
		this.auditNumLabel = auditNumLabel;
		
		var malDateLabel = new sap.m.Label({
			text: "Incident Date"});
		this.malDateLabel = malDateLabel;
		
		var symptomLabel = new sap.m.Label({
			text: "Symptom"});
		this.symptomLabel = symptomLabel;
		
		var sectorLabel = new sap.m.Label({
			text: "Sector Code"});
		this.sectorLabel = sectorLabel;
		
		var malDateTime = new sap.m.DateTimeInput({
			placeholder : "Time Picker",
			//type : "DateTime",
			//Changed Datetime to Date as part of ENH 8230
			type : "Date",
			change : function(e) {
				}
		});
		this.malDateTime = malDateTime;
		
		var fromDateTime = new sap.m.DateTimeInput({
			placeholder : "Time Picker",
			type : "Date",
			change : function(e) {
				}
		});
		this.fromDateTime = fromDateTime;
		
		var toDateTime = new sap.m.DateTimeInput({
			placeholder : "Time Picker",
			type : "Date",
			change : function(e) {
				}
		});
		this.toDateTime = toDateTime;
		
		var faultResLabel = new sap.m.Label({
			text: "Fault Information"});
		this.faultResLabel = faultResLabel;
		
		var symptom = new sap.m.Input({
			layoutData : new sap.m.FlexItemData({
		}),
			valueHelpOnly : true,
			showValueHelp: true,
			valueHelpRequest : function(evt) {
				oController.chooseSymptom(evt,this);
			},
			
			enabled : true,
			});
		this.symptom = symptom;
		
		var priority_input = new sap.m.Input("searchPriority",{
			enabled: false,
		}).addStyleClass("FaultHoverDisabled"); 
		
		priority_input.ontouchstart = function(evt){ 
			oController.openPriorityPopup(this);
		};
		this.priority_input = priority_input;
		
		var sector = new sap.m.Input("sector",{
			enabled: false,
		}).addStyleClass("FaultHoverDisabled"); 
		
		sector.ontouchstart = function(evt){ 
			oController.openSectorPopup(this);
		};
		this.sector = sector;
		
		var auditNum = new sap.m.Input({
		enabled : true,
		});
		this.auditNum = auditNum;
		
		
		var setNum = new sap.m.Input({
			
			showValueHelp: true,
			valueHelpRequest : function(evt) {
				oController.chooseSetNumber(evt,this);
			},
			change: function(){
			},
			enabled : true,
			});
	
		this.setNum = setNum;
		
		var oItemTemplate = new sap.ui.core.Item({
			key : "{key}",
			text : "{text}"
		});
		
	var faultResponse = new sap.m.MultiComboBox({
		
		items: { path : "/listitems",
				template : oItemTemplate},
	});
	this.faultResponse = faultResponse;
	
	var carInput = new sap.m.Input({
		valueHelpRequest : function(evt) {
			 oController.chooseCarNumber(evt,this);
		},
		showValueHelp: true,
		enabled : true,
		});
	this.carInput = carInput;
	

	
	var asset = new sap.m.Input({
	valueHelpOnly : true,
	showValueHelp: true,
	valueHelpRequest : function(evt) {
		oController.chooseAsset(evt,this);
	},
	enabled : true,
	});
	this.asset = asset;
		
	var tripNum =  new sap.m.Input({
		
		enabled : true,
		}) ;
	this.tripNum = tripNum;
	var status =  new sap.m.Input({
		
		enabled : true,
		}) ;
	this.status = status;
	var faultNum =  new sap.m.Input({
		
		enabled : true,
		}) ;
	this.faultNum = faultNum;
	
	var IIMSNum =  new sap.m.Input({
		
		enabled : true,
		}) ;
	this.IIMSNum = IIMSNum;
	
	var location = new sap.m.Input({
		valueHelpOnly : true,
		showValueHelp: true,
		valueHelpRequest : function(evt) {
			 oController.chooseLocation(evt,this);
		},
	}); 
	this.location = location;
	var fault_input = new sap.m.Input("fault_input",{
		enabled: false,
	}).addStyleClass("FaultHoverDisabled"); 
	
	fault_input.ontouchstart = function(evt){ 
		oController.openFaultPopup(this);
	};
	this.fault_input = fault_input;
	
	var repPhase = new sap.m.Input("searchRepPhase",{
		enabled: false,
	}).addStyleClass("FaultHoverDisabled"); 
	
	repPhase.ontouchstart = function(evt){ 
		oController.openReportPhasePopup(this);
	};
	this.reportPhase = repPhase;
	
		var oLayout1 = new sap.ui.layout.form.ResponsiveGridLayout("LS1", {
			emptySpanL: 1,
			emptySpanM: 1,
			emptySpanS: 1,
			labelSpanL: 5,
			labelSpanM: 5,
			labelSpanS: 5,
			columnsL: 3,
			columnsM: 3,
			breakpointL: 800,
			breakpointM: 400
		});
		var oLayout2 = new sap.ui.layout.form.ResponsiveGridLayout("LS2", {
			emptySpanL: 1,
			emptySpanM: 1,
			emptySpanS: 1,
			labelSpanL: 5,
			labelSpanM: 5,
			labelSpanS: 5,
			columnsL: 3,
			columnsM: 3,
			breakpointL: 800,
			breakpointM: 400
		});
		var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout("LS3", {
			emptySpanL: 1,
			emptySpanM: 1,
			emptySpanS: 1,
			labelSpanL: 5,
			labelSpanM: 5,
			labelSpanS: 5,
			columnsL: 3,
			columnsM: 3,
			breakpointL: 800,
			breakpointM: 400
		});
		var oLayout4 = new sap.ui.layout.form.ResponsiveGridLayout("LS4", {
			emptySpanL: 1,
			emptySpanM: 1,
			emptySpanS: 1,
			labelSpanL: 5,
			labelSpanM: 5,
			labelSpanS: 5,
			columnsL: 3,
			columnsM: 3,
			breakpointL: 800,
			breakpointM: 400
		});
		var oLayout5 = new sap.ui.layout.form.ResponsiveGridLayout("LS5", {
			emptySpanL: 1,
			emptySpanM: 1,
			emptySpanS: 1,
			labelSpanL: 5,
			labelSpanM: 5,
			labelSpanS: 5,
			columnsL: 3,
			columnsM: 3,
			breakpointL: 800,
			breakpointM: 400
		});
		var oLayout6 = new sap.ui.layout.form.ResponsiveGridLayout("LS6", {
			emptySpanL: 1,
			emptySpanM: 1,
			emptySpanS: 1,
			labelSpanL: 5,
			labelSpanM: 5,
			labelSpanS: 5,
			columnsL: 3,
			columnsM: 3,
			breakpointL: 800,
			breakpointM: 400
		});
		var generalData = new sap.ui.layout.form.Form({
			editable : true,
			layout : oLayout1,
			formContainers : [
			  			    new sap.ui.layout.form.FormContainer(
			  			    {
			  			    
			  				formElements : [ 
				  				 new sap.ui.layout.form.FormElement({
				 					fields : [ new sap.m.VBox({
				 	  			         items: [dateFrom,fromDateTime],
				  					 }).addStyleClass("blockVBox"),new sap.m.VBox({
				 	  			         items: [dateTo,toDateTime],
				  					 }).addStyleClass("blockVBox")]
				 				}),
				 				
				 				
			  				]
			  			}), new sap.ui.layout.form.FormContainer({
			  				styleClass :"formWidth",
			  				formElements : [
			  				     new sap.ui.layout.form.FormElement({
			  					 fields: [new sap.m.VBox({
				  			         items: [FaultNumLabel,faultNum],
				  					 }).addStyleClass("blockVBox")]
				  				}),
				  				
			  				          ]
			  			}),new sap.ui.layout.form.FormContainer({
			  				styleClass :"formWidth",
			  				formElements : [new sap.ui.layout.form.FormElement({
			  					
			  					fields : [new sap.m.VBox({
				  			         items: [IIMSLabel,IIMSNum]
			  					 }).addStyleClass("blockVBox"),]
			  				}),]
			  			}),
			  			
			  			]
		}).addStyleClass("formInput");
		var row2 = new sap.ui.layout.form.Form({
			editable : true,
			layout : oLayout2,
			formContainers : [  new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [auditNumLabel,auditNum],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [tripLabel,tripNum],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}),
			new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [malDateLabel,malDateTime]
  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}),

			]
		}).addStyleClass("formInput");

		this.row2 = row2;
		
		var row3 = new sap.ui.layout.form.Form({
			editable : true,
			layout : oLayout3,
			formContainers : [ new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [carLabel,carInput],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [setLabel,setNum],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [  new sap.ui.layout.form.FormElement({
					fields : [ new sap.m.VBox({
	  			         items: [sectorLabel,sector],
 					 }).addStyleClass("blockVBox") ]
				})  ]
			}),

			]
		}).addStyleClass("formInput");

		this.row3 = row3;
		
		var row4 = new sap.ui.layout.form.Form({
			editable : true,
			layout : oLayout4,
			formContainers : [ new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [assetLabel,asset],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [symptomLabel,symptom],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [  new sap.ui.layout.form.FormElement({
					label : "",
					fields : [ new sap.m.Input({
						editable : false,
					}) ]
				})  ]
			}),

			]
		}).addStyleClass("formInput");

		this.row4 = row4;
		
		var row5 = new sap.ui.layout.form.Form({
			editable : true,
			layout : oLayout5,
			formContainers : [ new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [priorityLabel, priority_input],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [locationLabel,location],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [  new sap.ui.layout.form.FormElement({
					fields : [ new sap.m.VBox({
	  			         items: [faultResLabel,faultResponse],
 					 }).addStyleClass("blockVBox") ]
				})  ]
			}),

			]
		}).addStyleClass("formInput");

		this.row5 = row5;
		
		var row6 = new sap.ui.layout.form.Form({
			editable : true,
			layout : oLayout6,
			formContainers : [ new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [faultSourceLabel,fault_input],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [ new sap.ui.layout.form.FormElement({
 					 fields: [new sap.m.VBox({
	  			         items: [repPhaseLabel,repPhase],
	  					 }).addStyleClass("blockVBox")]
	  				}), ]
			}), new sap.ui.layout.form.FormContainer({

				formElements : [  new sap.ui.layout.form.FormElement({
					label : "",
					fields : [ new sap.m.Input({
						editable : false,
					}) ]
				})  ]
			}),

			]
		}).addStyleClass("formInput");

		this.row6 = row6;
		var advSearch = new sap.m.Button({
			text : "",
			icon : "sap-icon://open-command-field",
			press : function(evt) {
				oController.hideViewFields(evt);
				
			}
		});
		this.advSearch = advSearch;
 		return new sap.m.Page({
 			showNavButton : true,
			navButtonPress : function(evt) {
				oController.handleNavBack(evt,this);
			},
			 title: "Fault Search",
			/*customHeader : new sap.m.Bar({
				contentLeft : [	new sap.m.Button({
	                icon: "sap-icon://home",
                    text : "",
       press : function(evt){
           window.location.reload();
         }
         }),
				],
				contentMiddle : [new sap.m.Label({
			    	text : "Fault Search"
			    }).addStyleClass("appTitle"), 
				              
				 ]
			}),*/
			   footer : new sap.m.Bar({
					
					contentLeft : [advSearch],
		        	contentRight : [
					   new sap.m.Button({
					    	text : "Clear Search",
					    	icon : "sap-icon://sys-cancel",
					    	press : function(evt) {
					    		 oController.clearSearch(evt)
							}
					    }),
					  new sap.m.Button({
				    	text : "Search",
				    	icon : "sap-icon://search",
				    		press : function(evt) {
								oController.searchFaults(evt);
							}	
				    }), ]
				}),
			content : [ generalData , row2, row3,row4,row5,row6]

		
 		}).addStyleClass("backGroundColor");
	}

});