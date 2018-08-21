sap.ui.controller("fault_mgmt.detailedDescription", {
	
	getDescription : function()
	{
		var appView = this.getView().getViewData();
		var app = appView.app;
		var desc = this.getView().textBox.getValue();
		this.getView().textBox.focus();
		if((desc != null) && (desc != ""))
			{
			//this.getView().data("prevPage").textBoxArea.setValue(desc); 
			}
		app.getPage("createNotification").data("description",desc);
	},
	handleNavBack : function(){
        var appView = this.getView().getViewData();
        var app = appView.app;	    
        var desc = this.getView().textBox.getValue();
        //app.getPage("createNotification").data("descFieldFromSearch",desc);
        app.getPage("createNotification").textBoxArea.setEditable(true);
        
        app.to(this.getView().data("prevPage"));
  },
  
  dispExistingTxt: function(isDisplay)
  {
	if(isDisplay){
		if(isDisplay === 'X')//Display Existing Text Area controls
		{
			var view = this.getView();
			view.textBoxExtTxt.setVisible(true);
			view.descFormExtTxt.setVisible(true);
			
			//BOI For Defect 42147
			var priority = this.getView().getViewData().app.getPage("createNotification").oController.SAPFaultPriority;
			if(priority !== "U"){
				//Begin of Insert for Defect 14867 KADAMA20160923
				var setNum = this.getView().getViewData().app.getPage("createNotification").setNum.getValue();
				if(setNum !== ""){
					
					validateSetAM(this.enableForm, this, setNum);	
				}
				//End of Insert for Defect 14867 KADAMA20160923
			}
			else{
				this.getView().textBox.setEnabled(true);
				this.getView().descForm.setVisible(true);
			}
			//EOI For defect 42147
			
			
		}
	}  
  },
  //Begin of Insert for Defect 14867 KADAMA20160923
  enableForm: function(data){
		
		if(data.Zzplant_section == "true"){
			this.getView().textBox.setEnabled(false);
			this.getView().descForm.setVisible(false);
		}
		else{
			this.getView().textBox.setEnabled(true);
			this.getView().descForm.setVisible(true);
		}
	},
  //End of Insert for Defect 14867 KADAMA20160923

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.detailedDescription
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.detailedDescription
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.detailedDescription
*/
//	onAfterRendering: function() {
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.detailedDescription
*/
//	onExit: function() {
//
//	}

});