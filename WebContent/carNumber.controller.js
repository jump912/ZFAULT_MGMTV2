sap.ui.controller("fault_mgmt.carNumber", {

	//called on search button click
	getData: function(data)
	{
		var oModel= new sap.ui.model.json.JSONModel();    
		oModel.setSizeLimit(1000);

		var oData = data.d.results[0].NAV_CAR.results;
		this.getView().data("setNum", data.d.results[0].IvCar);
		oModel.setData({listitems: oData}); 
		var oTable = this.getView().oTable;
		oTable.setModel(oModel);
		oTable.setModel(oModel);
		var count = oModel.getData().listitems.length;
		this.getView().panelTable.setHeaderText("Search Results ("+count+")"); //set the headertext for the panel with updated count

		var oCarNumber = new sap.m.Text({text: "{Zzcarid}"}); //car number code

		var oDescription = new sap.m.Text({text: "{Zzdesc}"}); //car description
		var oPosition = new sap.m.Text({text:{parts :[{path : "Zzcarpos"}],
			formatter : function(Zzcarpos){
				if(Zzcarpos != undefined){
					var cpos = Zzcarpos.replace(/^[0]+/g,"");
					return cpos;	}		

			}}}); //car position
		var oRow = new sap.m.ColumnListItem();

		oRow.addCell(oCarNumber).addCell(oDescription).addCell(oPosition);
		oTable.bindItems("/listitems",oRow); //bind car number and description
		var flag = this.getView().data("multiFlag");
		var oView = this.getView();
		if(flag){
			oView.saveBtn.setVisible(true);
			oView.cancelBtn.setVisible(true);
			oTable.setMode(sap.m.ListMode.MultiSelect);
		}
		else{
			oView.saveBtn.setVisible(false);
			oView.cancelBtn.setVisible(false);
			oTable.setMode(sap.m.ListMode.SingleSelectMaster);
		}
//		Start of fix by KONCHADS on 160616 for Defect # 11915		
		var prevPage = this.getView().data("prevPage");
		var carSearchData = this.getView().carSearchData;
		carSearchData.setVisible((prevPage && prevPage.sId === "createNotification"));
		this.getView().carSearchInput.setValue("");
//		End of fix by KONCHADS on 160616 for Defect # 11915		
	},
	getSearchData: function(){	
		var setnum =this.getView().searchInput.getValue(); 
		getCarList(setnum,this.getData,this);
	},
	//on selection of the table item
	onItemPress: function(evt)
	{
		eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
		var flag = this.getView().data("multiFlag");
		if(!flag){
			var appView = this.getView().getViewData();
			var app = appView.app;
			var view = this.getView();

			var oItem = evt.getParameter("listItem").getBindingContext().getObject();
			var setnum =this.getView().searchInput.getValue().toUpperCase();
			var prevPage = this.getView().data("prevPage");
			var carNumbers = [];
			carNumbers.push({"Zzcarid":oItem.Zzcarid, "Zzcarpos":oItem.Zzcarpos}); // Changes as per version 1.4
			prevPage.data("carNumbers", carNumbers); // Changes as per version 1.4

			var oldCar = prevPage.source.getValue(); 
			if (prevPage.sId == "prologuePage"|| prevPage.sId == "searchFault"){
				prevPage.source.setValue(oItem.Zzcarid);
				prevPage.source.data("setNumber",oItem.Zzcarid);
				prevPage.source.setValueState("None");

				// Set set number
				if($.trim(setnum).length > 0)
					prevPage.setNum.setValue($.trim(setnum).toUpperCase());
			}
			else{
				var token = new sap.m.Token({ key: oItem.Zzcarid, text:oItem.Zzcarid});			
				prevPage.source.destroyTokens();
				prevPage.source.addToken(token);
			
				prevPage.source.data("setNumber",oItem.Zzcarid);
				prevPage.source.setValueState("None");

				prevPage.setNum.setValue(this.getView().data("setNum").toUpperCase());
				prevPage.setNum.setValueState("None");
				if(oldCar != oItem.Zzcarid)
				{
					prevPage.symptom.destroyTokens();
					prevPage.asset.destroyTokens();
					prevPage.obj_inp.destroyTokens(); // fix by KONCHADS on 160616 for Defect # 11915
					//BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
					if((prevPage.data("notifNum"))!==""&&(prevPage.data("notifNum"))!==null){
						prevPage.positionPopOver.setValue(""); 
					}
					//EOI For fault UI Fix KADAMA20161223 #HPQC 42144
					//BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
					prevPage.oController.clearActivityCode();
					//EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
				}	
			}
			app.to(prevPage);
		}

	},

	onAccept : function(evt){
		eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
		var appView = this.getView().getViewData();
		var app = appView.app;

		var carTable = this.getView().oTable;
		var aContexts = carTable.getSelectedContexts();
		var prevPage = this.getView().data("prevPage");
		prevPage.data("carNumbersLen",aContexts.length);
		prevPage.data("fromCarCont","X");
		var oldCars = prevPage.source.getTokens();
		prevPage.source.destroyTokens();
		var clearAssetSympt = true;			
		var carNumbers = [];
		var changeFlagCount = 0; // by KONCHADS on 160616 for Defect # 11915	
		if (aContexts.length) {

			aContexts.map(function(oContext) {
				var token = new sap.m.Token({ key: oContext.getObject().Zzcarid, text:oContext.getObject().Zzcarid});
				prevPage.source.addToken(token);
				carNumbers.push({"Zzcarid":oContext.getObject().Zzcarid, "Zzcarpos":oContext.getObject().Zzcarid }); // Changes as per version 1.4
				$.each(oldCars, function(i){
					if(oContext.getObject().Zzcarid === oldCars[i].getKey() && clearAssetSympt)
					{
						clearAssetSympt = false;
					}
//					Start of fix by KONCHADS on 160616 for Defect # 11915							
					if(oContext.getObject().Zzcarid === oldCars[i].getKey())
					{
						changeFlagCount++;
					}
//					End of fix by KONCHADS on 160616 for Defect # 11915							
				});
			});
//			Changes as per version 1.4
			if(carNumbers.length != 0){
//				Sort the car objects based on position
				function sorting(json_object, key_to_sort_by) {
					function sortByKey(a, b) {
						var x = a[key_to_sort_by];
						var y = b[key_to_sort_by];
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					}

					json_object.sort(sortByKey);
				}
				sorting(carNumbers,'Zzcarpos');
				prevPage.data("carNumbers",carNumbers);
				prevPage.data("fromCarCont","");
			}}		

//		End of changes
		//Begin of Comment for Defect 15195 KADAMA20161003-
		//prevPage.setNum.setValue(this.getView().data("setNum").toUpperCase());
		//prevPage.setNum.setValueState("None");
		//End of Comment for Defect 15195 KADAMA20161003-
		//Begin of Insert for Defect 15195 KADAMA20161003+
		var setNum = this.getView().data("setNum").toUpperCase();
		if(prevPage.setNum.getValue() !== setNum){
			prevPage.source.data("setNumber",setNum);
			prevPage.setNum.setValueState("None");
			prevPage.setNum.setValue(this.getView().data("setNum").toUpperCase());
			prevPage.oController.changeSetNum();
		}
		//End of Insert for Defect 15195 KADAMA20161003+
//		Start of fix by KONCHADS on 160616 for Defect # 11915
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
		prevPage.obj_inp.destroyTokens(); // fix by KONCHADS on 160616 for Defect # 11915
		if(changeFlagCount === aContexts.length && changeFlagCount === oldCars.length){
			prevPage.oController.change = true;
		}else{
			prevPage.oController.change = false;
		}
//		End of fix by KONCHADS on 160616 for Defect # 11915				
		app.to(prevPage);

	},
	//handle back button navigation
	handleNavBack : function(evt){
		var appView = this.getView().getViewData();
		var app = appView.app;	         
		app.to(this.getView().data("prevPage"));

	},
//	Start of fix by KONCHADS on 160616 for Defect # 11915		
	searchCar:function(){
		var newValue = this.getView().carSearchInput.getValue();
		if($.trim(newValue).length > 0)
			getSetNumber(newValue,this.CarValidationSucess,this);
	},
	CarValidationSucess :function(data){
		eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832	
		var setNum = data.d.results[0].NAV_CARSET.EvSetid;
		var url = this.getView().data("url");
		var prevPage = this.getView().data("prevPage");
		var appView = this.getView().getViewData();
		var app = appView.app;
		var carNumbers = [];
		if (setNum === ""){
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
					"No match found.  Re-direct to the FMBS application on ICFMS Portal?", {
						icon: sap.m.MessageBox.Icon.WARNING,
						title: "INFORMATION",
						actions: [sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],
						onClose: function(oAction) { 
							if(oAction == "OK"){
								window.open( url,"_blank");
							} },
							styleClass: "faultMsgBox"
					}
			);
		}else{
			var carId =  data.d.results[0].IvCarid;
			var oldCars = prevPage.source.getTokens();
			prevPage.source.destroyTokens();
			var token = new sap.m.Token({ key: carId, text:carId});
			prevPage.source.addToken(token);
			carNumbers.push({"Zzcarid":carId, "Zzcarpos":carId});
			prevPage.data("carNumbers",carNumbers);
			prevPage.symptom.destroyTokens();
			prevPage.asset.destroyTokens();
			prevPage.obj_inp.destroyTokens();
			//BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
			if((prevPage.data("notifNum"))!==""&&(prevPage.data("notifNum"))!==null){
				prevPage.positionPopOver.setValue(""); 
			}
			//EOI For fault UI Fix KADAMA20161223 #HPQC 42144
			//BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
			prevPage.oController.clearActivityCode();
			//EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
			if(prevPage.setNum.getValue() !== setNum){
				prevPage.source.data("setNumber",setNum);
				prevPage.setNum.setValue(setNum.toUpperCase());
				prevPage.oController.changeSetNum();
			}
			app.to(prevPage);
		}
	},
//	End of fix by KONCHADS on 160616 for Defect # 11915	
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf fault_mgmt.carNumber
	 */
	onInit: function() {

	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf fault_mgmt.carNumber
	 */
//	onBeforeRendering: function() {

//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf fault_mgmt.carNumber
	 */
//	onAfterRendering: function() {

//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf fault_mgmt.carNumber
	 */
//	onExit: function() {

//	}

});