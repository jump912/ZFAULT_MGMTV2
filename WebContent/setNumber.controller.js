sap.ui.controller("fault_mgmt.setNumber", {
	getData: function(data)
	{
		var length = data.d.results[0].NAV_SET.results.length;
		length =Number(length);
		 var prevPage = this.getView().data("prevPage");
		 
		
		 var oModel= new sap.ui.model.json.JSONModel();
		 oModel.setSizeLimit(1000);
		var oData = data.d.results[0].NAV_SET.results;
		oModel.setData({listitems: oData});
		var oTable = this.getView().oTable;
		oTable.setModel(oModel);
		var count = oModel.getData().listitems.length;
		this.getView().panelTable.setHeaderText("Search Results ("+count+")");
		var oSetNumber = new sap.m.Text({text: "{Zzsetid}"});  		
   		var oDescription = new sap.m.Text({text: "{Zzdesc}"});
   		var oRow = new sap.m.ColumnListItem();   		
   		oRow.addCell(oSetNumber).addCell(oDescription);
        oTable.bindItems("/listitems",oRow); 
        },
	
	getSearchData: function(){	
	var setNumValue =this.getView().searchInput.getValue(); 
	getSetList(setNumValue,this.getData,this);
	},
	
		onItemPress: function(evt)
		{
			var appView = this.getView().getViewData();
			var app = appView.app;
			
			var oItem = evt.getParameter("listItem").getBindingContext().getObject();
			var prevPage = this.getView().data("prevPage");
			if(prevPage.sId == "prologuePage"|| prevPage.sId == "searchFault"){
				 prevPage.source.setValue(oItem.Zzsetid);
			     prevPage.source.data("setNumber",oItem.Zzsetid);			
			}
			else{
			var oldSet = prevPage.source.getValue();
		        prevPage.source.setValue(oItem.Zzsetid);
		        prevPage.source.data("setNumber",oItem.Zzsetid);
		        if(oldSet != oItem.Zzsetid)
		        {
		        prevPage.carInput.destroyTokens();
		        prevPage.symptom.destroyTokens();
		        prevPage.asset.destroyTokens();
		      //BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
				if((prevPage.data("notifNum"))!==""&&(prevPage.data("notifNum"))!==null){
					prevPage.positionPopOver.setValue(""); 
				}
				//EOI For fault UI Fix KADAMA20161223 #HPQC 42144
				//BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
				prevPage.oController.clearActivityCode();
				//EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
		        // update the trip number Defect 6577
		        prevPage.oController.changeSetNum();
		        }
			}
		        app.to(prevPage);
		},
		
		 handleNavBack : function(){
	         var appView = this.getView().getViewData();
	         var app = appView.app;	         
	         app.to(this.getView().data("prevPage"));

	   },
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.setNumber
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.setNumber
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.setNumber
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.setNumber
*/
//	onExit: function() {
//
//	}

});