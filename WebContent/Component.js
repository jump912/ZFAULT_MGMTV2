jQuery.sap.declare("fault_mgmt.Component");
jQuery.sap.require("sap.m.MessageBox");
sap.ui.core.UIComponent.extend("fault_mgmt.Component", {
	metadata:{
		"includes":["images/TreeNode_Coll.png","images/TreeNode_Exp.png","models/faultmgmt.model.js","css/Styles.css"],
		"dependencies" : {
			"libs" : [ "sap.m","sap.ui.layout","sap.ui.commons","sap.ui.unified","sap.ui.table" ],
			"components" : []
		},
		"config" : {
			fullWidth : true				
		}
		
	},
//	init: function(){
//		var actData = {}; 
//			
//	},
	createContent : function() {
		/*if(sap.ushell) // Defect 11832 NARASIMB 08062016 removed warning
			sap.ushell.Container.setDirtyFlag(true);*/
		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "fault_mgmt.app",
			type : "JS",
			viewData : { component : this }
		});

		 
		return oView;
	},
	
	destroy : function() {
		 var app = sap.ui.getCore().byId("fms_app");  
		 sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
		/* this.destroyControl("master");
		 this.destroyControl("tileHome");
		 this.destroyControl("asset");
		 this.destroyControl("attachments");
		 this.destroyControl("carNumber");
		 this.destroyControl("createNotification");
		 this.destroyControl("detailedDescription");
		 this.destroyControl("docView");
		 this.destroyControl("faultRepBy");
		 this.destroyControl("location");
		 this.destroyControl("multiCarResult");
		 this.destroyControl("position");
		 this.destroyControl("prologuePage");
		 this.destroyControl("searchFault");
		 this.destroyControl("setNumber");
		 this.destroyControl("symptom");
		 this.destroyControl("searchResults");
		 this.destroyControl("technician");*/
		 this.destroyControl("master");
		 this.destroyControl("create");
		 this.destroyControl("createDialog");
		 this.destroyControl("listtemplt");
		 this.destroyControl("markDupDialog");
		 this.destroyControl("hierarchyTree");
		 this.destroyControl("check");
		 this.destroyControl("notifyDialog");
		 this.destroyControl("carMulti");
		 this.destroyControl("symptomMulti");
		 this.destroyControl("faultPriority");
		 this.destroyControl("edit");
		 this.destroyControl("inputDesc");
		 this.destroyControl("reportPhase");
		 this.destroyControl("auditType");
		 this.destroyControl("weather");
		 this.destroyControl("temperature");
		 this.destroyControl("faultSource");
		 this.destroyControl("fixedTraffic");
		 this.destroyControl("fms_app_Asset"); //NARASIMB 22092016 - HPQC #15195
		 this.destroyControl("cL1");
		 this.destroyControl("L1");
		 this.destroyControl("L2");
		 this.destroyControl("L3");
		 this.destroyControl("L4");
		 this.destroyControl("L5");
		 this.destroyControl("L6");
		 this.destroyControl("L7");
		 this.destroyControl("L8");
		 this.destroyControl("L9");
		 
		 this.destroyControl("panelGeneral");
		 this.destroyControl("panelMalfunction");
		 this.destroyControl("panelAdditionalInfo");
		 this.destroyControl("notifLongTxt");
		 this.destroyControl("searchPriority");
		 this.destroyControl("sector");
		 this.destroyControl("fault_input");
		 this.destroyControl("searchRepPhase");
		 this.destroyControl("LS1");
		 this.destroyControl("LS2");
		 this.destroyControl("LS3");
		 this.destroyControl("LS4");
		 this.destroyControl("LS5");
		 this.destroyControl("LS6");
		 
		 
	
		 
		 

		 
		 app.destroy();
		},
		destroyControl :function(controlId){
			var control = sap.ui.getCore().byId(controlId);
			if(control){
				control.destroy();
			}
			
		},

});