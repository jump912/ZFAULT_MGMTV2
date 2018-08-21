sap.ui.controller("fault_mgmt.asset", {
	
	handleNavBack : function(){
        var appView = this.getView().getViewData();
        var app = appView.app;
        var prevPage = this.getView().data("prevPage");
        var descText = this.getView().data("descShortText");
        if(prevPage.textBoxArea !== undefined){ //Insert for Defect 70358
        	prevPage.textBoxArea.setValue(descText);
        } //Insert for Defect 70358
        app.to(prevPage);

  },
	buildAssetTree : function(treeData){
		
		var destination = this.getView();
		var controller = this;
		
		var funcTree = destination.assetTree;
		funcTree.destroyNodes();              //reset the tree to initial state
		
		
		
		//Function to be called recursively to build children of tree nodes
		function buildChildren(parent) {

			var childrenFlag = 0;
			var children = [];

			for ( var j in treeData) {
				

				if  (  ( 
						   ( treeData[j].ZzparentEqui == parent.data("value")) //condition for being a child of the parent node
						
						)
					)				
				{
				
					childrenFlag = 1;
					var position = "";
					if($.trim(treeData[j].Zzheqnr).length > 0)
						position = "  -  " + treeData[j].Zzheqnr;
					var treeNode = new sap.ui.commons.TreeNode(
							{
								text : treeData[j].Zzequi  + "  -  " + treeData[j].Zzdescription + position,
								expanded : false,
								icon : "sap-icon://wrench"
							});
					treeNode.data("value", treeData[j].Zzequi);
					treeNode.data("desc",treeData[j].Zzdescription);
					treeData[j].added = true;
					
			var grandChildren = buildChildren(treeNode);			//recursively calculate the children for child node

					for(var z in grandChildren){
						treeNode.addNode(grandChildren[z]);
					}
					children.push(treeNode);
					
				}
			}
			
			if (childrenFlag == 0) {
				return [];
			} 
			else
				return children;
		}

		

	//Building the tree starts here. Identify root nodes first.

		for (i in treeData) {

			var node = treeData[i];
			var position = "";
			if($.trim(treeData[i].Zzheqnr).length > 0)
				position = "  -  " + treeData[i].Zzheqnr;
			
			if(treeData[i].ZzparentEqui == "")  //condition for root node
			{

				var rootNode = new sap.ui.commons.TreeNode(
				{
					text : treeData[i].Zzequi  + "  -  " + treeData[i].Zzdescription + position,
					expanded : false,
					icon : "sap-icon://wrench",
					selected :  function (evt){
					//controller.openDialog(evt,this);
						
					}
				});
				
				rootNode.data("value", treeData[i].Zzequi);
				rootNode.data("desc", treeData[i].Zzdescription);
				this.getView().data("rootNode",treeData[i].Zzequi+" - " +treeData[i].Zzdescription + position);


				var children = buildChildren(rootNode);   //calculate children for each root node
				
				for(var k in children){
				 rootNode.addNode(children[k]);
				 
				}
				funcTree.addNode(rootNode);			//add root node to tree

			}
			
		}
	},
	
	getOpenNotifications : function(evt){
		
		var page = this.getView();
		var notifTable = this.getView().notifTable;
		var equipment = evt.getParameters().node.data("value")+" - " +evt.getParameters().node.data("desc");
		this.equipment = equipment;
		this.selectAsset(evt);
		},
	
	selectAsset : function(evt){
		eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
		var appView = this.getView().getViewData();
		var app = appView.app;
		var equip = this.equipment;
		if((this.getView().data("rootNode"))!= equip)
				{
		
		var prevPage = this.getView().data("prevPage");
		var descText = this.getView().data("descShortText");
		
		 if(prevPage.sId == "createNotification")
     	{
//Start of fix by KONCHADS on 23/06/2016 for defect # 11832			 
//		var token = new sap.m.Token({ key: equip, text:equip});
		if(evt.getParameter("node")){
			var token = new sap.m.Token({ key: evt.getParameter("node").data("value"), text:evt.getParameter("node").data("desc")});
		}else{
			var token = new sap.m.Token({ key: equip, text:equip});
		}
//End of fix by KONCHADS on 23/06/2016 for defect # 11832				
		prevPage.asset.destroyTokens();
		prevPage.symptom.destroyTokens();
		prevPage.obj_inp.destroyTokens();
		//BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
		if((prevPage.data("notifNum"))!==""&&(prevPage.data("notifNum"))!==null){
			prevPage.positionPopOver.setValue(""); 
		}
		//EOI For fault UI Fix KADAMA20161223 #HPQC 42144
		//BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
		/*var actTable = prevPage.actTable;
		
		var actTableData = actTable.getModel().oData.actitems;
		
		if(actTableData.length > 0){
			
			actTable.destroyItems();
			prevPage.data("activityData",[]);
			
			for (var i = 0; i<actTableData.length; i++){
				actTableData[i].Txt_Actcd = "";
				actTableData[i].Txt_Actgrp = "";
				prevPage.data("activityData")[i] = actTableData[i];
			}
			
			var itemModel= new sap.ui.model.json.JSONModel(); 
			itemModel.setData({actitems:actTableData});
			
			actTable.setModel(itemModel);
		}
		
		*/
		prevPage.oController.clearActivityCode();
		//EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
		prevPage.asset.addToken(token);
		prevPage.textBoxArea.setValue(descText);
     	}
		 else{
			 prevPage.asset.setValue(equip);		
		 }
		app.to(prevPage);
				}
	},

	getAssetData : function(data)
	{
		this.buildAssetTree(data.d.results[0].NAV_HIERARCHY.results);
	},

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.asset
*/
	onInit: function() {

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.asset
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.asset
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.asset
*/
//	onExit: function() {
//
//	}

});