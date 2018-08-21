sap.ui.controller("fault_mgmt.technician", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.technician
*/
	handleNavBack : function(evt){
		 var appView = this.getView().getViewData();
       var app = appView.app;	         
       app.to(this.getView().data("prevPage"));

	},
	onItemPress: function(evt)
	{
		var appView = this.getView().getViewData();
		var app = appView.app;
		var oItem = evt.getParameter("listItem").getBindingContext().getObject();
		 var prevPage = this.getView().data("prevPage");
	        prevPage.source.setValue(oItem.Stext);
	        prevPage.data("technician",oItem.Pernr);
	        prevPage.data("plant",this.getView().depot_inp.getValue());
	        prevPage.data("plantCode",this.getView().depot_inp.data("value"));
			prevPage.data("workcen", this.getView().workcen_inp.getValue());
			prevPage.data("workcenCode", this.getView().workcen_inp.data("value"));
			app.to(prevPage);
		
	},
		
	
	getTechnicianData: function(data)
	{
		var oModel= new sap.ui.model.json.JSONModel();
		oModel.setSizeLimit(data.d.results.length); //Insert for Defect 39555
		oModel.setData({listitems : data.d.results});
		this.getView().oTable.setModel(oModel);
		var oPerson = new sap.m.Text({
			text : "{Pernr}"
		}); // location
		var oDescription = new sap.m.Text({
			text : "{Stext}"
		}); // description
		var oRow = new sap.m.ColumnListItem();

		oRow.addCell(oDescription);
		this.getView().oTable.bindItems("/listitems", oRow);
		this.getView().panelTable.setVisible(true);
		
	},
	
//	Changes as per Version 1.2
	
	setSearchValues: function(data){
		var list = data.d.results;
		var j = 0;
		var uniqueEle = [];
		var uniqueWerks = [];
		var default_val = "";
		for (var i = 0 ; i <list.length ;i++){
			if(uniqueWerks.indexOf(list[i].Werks) == -1 ){
				uniqueEle[j]=list[i];
				uniqueWerks[j]=list[i].Werks;
				j = j+1;				
			}
//			Set default values
			if (list[i].DefaultFlag == 'X'){
				default_val = 'X';
				this.getView().depot_inp.setValue(list[i].Name1);
				this.getView().depot_inp.data("value", list[i].Werks);
				this.getView().workcen_inp.setValue(list[i].Ktext);
				this.getView().workcen_inp.data("value",list[i].Arbpl);
			}
		}
		if(default_val == ""){
			this.getView().depot_inp.setValue("");
			this.getView().depot_inp.data("value", "");
			this.getView().workcen_inp.setValue("");
			this.getView().workcen_inp.data("value","");
		}
		
		
		this.depotitems = uniqueEle;	
		this.workcenitems = data.d.results;
//		If default values are present get the maintainers
		if(this.getView().depot_inp.getValue() != "" &&
			this.getView().workcen_inp.getValue()!= ""){
		getTechnician_table(
				this.getView().depot_inp.data("value"),
				this.getView().workcen_inp.data("value"),
				this.getTechnicianData, this);
		}
	},
	
	
	openDepotPopup: function(source){
		
		this.source = source;
		var controller = this;
		
		if (!source.list) {

			var list = new sap.m.ResponsivePopover({
				
				placement : sap.m.PlacementType.Right,
				title : "Select Depot",
				content : [],
				width : "200px",
				height : "300px",
				
			}).addStyleClass("popupColor");
			
			source.list = list;
			var oModel = new sap.ui.model.json.JSONModel(); 				
			oModel.setData({depotitems: this.depotitems})
			
			var optionList = new sap.m.List({
				mode : sap.m.ListMode.SingleSelectMaster,
				includeItemInSelection : true,
				select : function(evt,source) {
					controller.selectValue(evt)
				},				
				width : "100%",
				height : "100%"
			});
			
            optionList.setModel(oModel);
            optionList.addStyleClass("faultPopup");
			this.DepotList = optionList;
         
            var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
            oDataTemplate.bindProperty("value", "Werks"); //code for depot             
            var listDesc =  new sap.m.StandardListItem({
                title : "{Name1}", }); //description for depot
            listDesc.addCustomData(oDataTemplate);
            optionList.bindItems("/depotitems",listDesc); //adding model data to the list
			source.list.addContent(optionList);

		}
		var arr = [];
		arr = this.DepotList.getItems();
	    for(var k=0;k<arr.length;k++)
		{
		if(this.getView().depot_inp.data("value") == arr[k].data("code"))
			{	
			this.DepotList.setSelectedItem(arr[k]);
			}
		else if(this.getView().depot_inp.getValue()=== "")
			{
			this.DepotList.removeSelections(true);
			}
		}
		source.list.openBy(source);
	},

	
openWorkCentrePopup: function(source){
		
		this.source = source;
		var controller = this;
//		if (!source.list) {
			this.source = source;
			var controller = this;
			var list = new sap.m.ResponsivePopover({
				
				placement : sap.m.PlacementType.Bottom,
				title : "Selet Work Centre",
				content : [],
				width : "200px",
				height : "300px",
				
			});
			source.list = list;
			var workcentres = [];
			var j = 0;
			var oWorkCen = new sap.ui.model.json.JSONModel();
			var Depot = this.getView().depot_inp.data("value");
			var oModel = new sap.ui.model.json.JSONModel(); 				
			oModel.setData({workcenitems: this.workcenitems})	;		
			
//			Sort work centres based on depot
			for (var i = 0; i < oModel.oData.workcenitems.length; i++){
				if(oModel.oData.workcenitems[i].Werks == Depot){
					workcentres[j] = oModel.oData.workcenitems[i];
						j = j + 1;
				}				
			}
			oWorkCen.setData({workcen: workcentres});
			var optionList = new sap.m.List({
				mode : sap.m.ListMode.SingleSelectMaster,
				includeItemInSelection : true,
				select : function(evt,source) {
					controller.selectValue(evt)
				},
				
				width : "100%",
				height : "100%"
			});
			
           optionList.setModel(oWorkCen);
            optionList.addStyleClass("faultPopup");
			
         
            var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
            oDataTemplate.bindProperty("value", "Arbpl"); //code for work centre
            var listDesc =  new sap.m.StandardListItem({
                title : "{Ktext}", }); //description for work centre
            listDesc.addCustomData(oDataTemplate);
            optionList.bindItems("/workcen",listDesc); //adding model data to the list         

			source.list.addContent(optionList);
			source.list.openBy(source);
	},
	
	selectValue: function(Evt){	

		if (this.source.sId == "depot"){			
				this.getView().workcen_inp.data("value");
				this.getView().workcen_inp.setValue("");			
		}
		this.source.setValue(Evt.getParameters().listItem.getTitle());
		this.source.data("value",Evt.getParameters().listItem.data("code"));		
		this.source.list.close();
		if (this.source.sId == "workcentre"){
			var depot = this.getView().depot_inp.data("value");
			var workcen = this.getView().workcen_inp.data("value");
			getTechnician_table(depot,workcen,this.getTechnicianData, this);
			
		}
	}
	
	
	
//	End of changes for version 1.2
	
	
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.technician
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.technician
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.technician
*/
//	onExit: function() {
//
//	}

});