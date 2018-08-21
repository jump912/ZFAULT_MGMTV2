sap.ui.controller("fault_mgmt.cause", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf cause
*/
	
	setGrp: function(data)
	{
	
		var oModel= new sap.ui.model.json.JSONModel(); 
		oModel.setData({listitems:data.d.results});
		var oTable = this.getView().oTable;        
       	oTable.setModel(oModel);   	          	
       	var oGrpCode = new sap.m.Text({text: "{Zzcodegruppe}"});          	//Cause group 	
   		var oGrpDescription = new sap.m.Text({text: "{ZzkurztextCg}"});    //Cause group description
   		var oRow = new sap.m.ColumnListItem();   		
   		oRow.addCell(oGrpDescription);
        oTable.bindItems("/listitems",oRow); //binding data to the table
        var prevPage = this.getView().data("prevPage");
//        If there is only 1 group, list all codes
        if(data.d.results.length == 1){
		var source = prevPage.source;
		var catalog;
		if(source.sId == "objPart"){
			catalog = 'B';			
		}
		else if(source.sId == "Damage"){
			catalog = 'C';			
		} 
		else if (source.sId == "Cause"){
			catalog = '5';			
		}
		else{
			catalog = 'A';			
		}
		getTechDetailCode(code,catalog,this.setCode,this);
        }	
	},
	onItemPressGrp: function(evt)
	{   this.getView().oTable_1.getParent().setVisible(true);
        this.getView().tableTitle.getParent().setVisible(true); 
		var oItem = evt.getParameter("listItem").getBindingContext().getObject();
		var code = oItem.Zzcodegruppe;
		this.codeGroup = code;
		this.codeGroupDesc = oItem.ZzkurztextCg;
		var prevPage = this.getView().data("prevPage");
		var source = prevPage.source;
		if(source.sId == "objPart"){
			catalog = 'B';			
		}
		else if(source.sId == "Damage"){
			catalog = 'C';			
		} 
		else if (source.sId == "Cause"){
			catalog = '5';			
		}
		else{
			catalog = 'A';			
		}
		getTechDetailCode(code,catalog,this.setCode,this);
	},
		
	setCode: function(data)
		{		
		var dModel= new sap.ui.model.json.JSONModel(); 
		dModel.setData({listitems:data.d.results});
		var dTable = this.getView().oTable_1;
		dTable.setModel(dModel);
		var oCode = new sap.m.Text({text: "{Zzcode}"}); //symptom code for the selected symptom group
        var oCodeDesc = new sap.m.Text({text: "{ZzkurztextC}"}); //symptom code description for the selected symptom group
   		var oRow = new sap.m.ColumnListItem();
   		oRow.addCell(oCodeDesc);
        dTable.bindItems("/listitems",oRow); //binding data to the table       
		
	},
	onItemPressCode: function(evt)
	{
		eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
		var appView = this.getView().getViewData();
		var app = appView.app;
		var oItem = evt.getParameter("listItem").getBindingContext().getObject();
		 var prevPage = this.getView().data("prevPage");
	        	var techDetText = this.codeGroupDesc + " - " + oItem.ZzkurztextC;
	        	 var token = new sap.m.Token({ key: oItem.ZzkurztextC, text:techDetText});
	 			prevPage.source.destroyTokens();
	 			prevPage.source.addToken(token);	        
			
	        var source = prevPage.source;
			if(source.sId == "objPart"){
		        prevPage.data("objPartCode",oItem.Zzcode);  //attaching code to the view
			    prevPage.data("objPartGroup",this.codeGroup); //attaching group to the view	
			}
			else if(source.sId == "Damage"){
		        prevPage.data("damageCode",oItem.Zzcode);  //attaching code to the view
			    prevPage.data("damageGroup",this.codeGroup); //attaching group to the view	
			} 
			else if (source.sId == "Cause"){
		        prevPage.data("causeCode",oItem.Zzcode);  //attaching code to the view
			    prevPage.data("causeGroup",this.codeGroup); //attaching group to the view	
			}
			else{
//				Create a array for activity code in prevPage.data
				if(prevPage.data("activityData")== undefined){
					prevPage.data("activityData",[]);
				}
				var ind = prevPage.source.sId.lastIndexOf("-");
				var rowInd = prevPage.source.sId.substring(ind+1,prevPage.source.length);
				newObj = {actCode:oItem.Zzcode, actgroup:this.codeGroup};
				prevPage.data("activityData")[rowInd] = newObj
//				Set the data in the model
				prevPage.tabModel.actitems[rowInd].Txt_Actcd = oItem.ZzkurztextC;
				prevPage.tabModel.actitems[rowInd].Txt_Actgrp = this.codeGroupDesc;
				
			}
	        
        
		app.to(prevPage);
		
	},
	
	handleNavBack : function(evt){
		   var appView = this.getView().getViewData();
	       var app = appView.app;
//	       var prevPage = this.getView().data("prevPage");
//	       prevPage.Techdetail.setIcon( "sap-icon://expand-group") ;
//	       prevPage.techDetBox.setVisible(true);
//	       prevPage.NotifPage.scrollTo(screen.height,0);
	       app.to(this.getView().data("prevPage"));

		},
		
	
	onInit: function() {
		
		  this.getView().oTable_1.getParent().setVisible(false);
	      this.getView().tableTitle.getParent().setVisible(false);       
	      
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf cause
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf cause
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf cause
*/
//	onExit: function() {
//
//	}

});