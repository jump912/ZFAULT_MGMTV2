sap.ui.controller("fault_mgmt.symptom", {

  getSymptomData: function(data)
  {

    var oModel= new sap.ui.model.json.JSONModel(); 
    oModel.setData({listitems:data.d.results});
    var oTable = this.getView().oTable;        
       	oTable.setModel(oModel);
       	var oCode = new sap.m.Text({text: "{Zzcodegruppe}"});          	//Symptom group
      var oDescription = new sap.m.Text({text: "{ZzkurztextCg}"});    //Symptom group description
      var oRow = new sap.m.ColumnListItem();
      oRow.addCell(oDescription);
        oTable.bindItems("/listitems",oRow); //binding data to the table

  },
  onItemPressSymptom: function(evt)
  {   this.getView().oTable_1.getParent().setVisible(true);
        this.getView().tableTitle.getParent().setVisible(true); 
    var oItem = evt.getParameter("listItem").getBindingContext().getObject();
    var code = oItem.Zzcodegruppe;
    this.codeGroupDesc = oItem.ZzkurztextCg;
    getSymptomDamageList(code,this.getSymptomDamageData,this);
  },

    getSymptomDamageData: function(data)
    {

    var dModel= new sap.ui.model.json.JSONModel(); 
    dModel.setData({listitems:data.d.results});
    var dTable = this.getView().oTable_1;
    dTable.setModel(dModel);
    var oDamage = new sap.m.Text({text: "{Zzcode}"}); //symptom code for the selected symptom group
        var oDamageDesc = new sap.m.Text({text: "{ZzkurztextC}"}); //symptom code description for the selected symptom group
      var oRow = new sap.m.ColumnListItem();
      oRow.addCell(oDamageDesc);
        dTable.bindItems("/listitems",oRow); //binding data to the table       

  },
  onItemPress: function(evt)
  {
    eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
    var appView = this.getView().getViewData();
    var app = appView.app;
    var oItem = evt.getParameter("listItem").getBindingContext().getObject();
     var prevPage = this.getView().data("prevPage");
        
          if(prevPage.sId == "createNotification")
            {
            var symptomText = this.codeGroupDesc + " - " + oItem.ZzkurztextC;
             var token = new sap.m.Token({ key: oItem.ZzkurztextC, text:symptomText});
        prevPage.source.destroyTokens();
        prevPage.source.addToken(token);
        /*if(!prevPage.oController.check){
//          var flag = this.multiCheck(oItem.Zzcodegruppe,oItem.Zzcode); // comment multicar reqt
//          prevPage.data("multiFlag",flag); // comment multicar reqt
          if (prevPage.data("multiFlag")) // multicar reqt
//          if(flag == true) //comment multicar reqt
            {
            prevPage.asset.destroyTokens();
            }
          }*/ // Commented for defect; Assest should not be cleared if symptom when chosen 
//        else //comment multicar reqt
//          {
//          var flag = false;
//          prevPage.data("multiFlag",flag);
//          } // comment multicar reqt
              
         prevPage.controller.getValidateValues("symptom");
         
            }
          else
            {
            var symptomText = this.codeGroupDesc + " - " + oItem.ZzkurztextC;
             //prevPage.source.setValue(oItem.ZzkurztextC);
            prevPage.source.setValue(symptomText);
            }
          prevPage.data("symptomCode",oItem.Zzcode);  //attaching code to the view
            prevPage.data("symptomGroup",oItem.Zzcodegruppe); //attaching group to the view
          
            //BOI for Defect 42144 KADAMA23DEC2016
            if(oItem.Zzcode == "S063" ){
              var oModel = getPrioList('C'); // C - Create / Update Mode and S or blank for Search
              if(oModel.oData !== undefined){
                var listitems = oModel.oData.listitems;
                for(var i=0;i<listitems.length;i++){
                  if(listitems[i].Zzpriok == 'D'){
                    var value = listitems[i].Zzpriok +" - "+listitems[i].Zzpriokx;
                    prevPage.priority_input.setValue(value);
                    prevPage.priority_input.data("value",listitems[i].Zzpriok);
                    prevPage.oController.getValidateValues("faultPriority");
                    break;
                  }
                }
              }
            }
            //EOI For Defect 42144 KADAMA23DEC2016
    app.to(prevPage);

  },



  multiCheck :function (codeGroup,code){

    var multiFlag;
    switch (codeGroup){
     case "F-010000" : {
       if(code == "S062"||code == "S063"||code == "S064")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-010100" : {
       if(code == "S062"||code == "S063"||code == "S064")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-010400" : {
       if(code == "S062"||code == "S063"||code == "S064")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     
     case "F-010500" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     
     case "F-010800" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-130400" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-131000" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-030400" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-040100" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-040200" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-040300" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-040400" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-040500" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-040600" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     case "F-040800" : {
       if(code == "S063")
         {
         multiFlag = true;
         return multiFlag;}
       else{
         multiFlag = false;
         return multiFlag;
       }

       break; 
     }
     
     
     
     
        


    }

  },


  handleNavBack : function(evt){
     var appView = this.getView().getViewData();
       var app = appView.app;	         
       app.to(this.getView().data("prevPage"));

  },
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf fault_mgmt.symptom
*/
  onInit: function() {

      this.getView().oTable_1.getParent().setVisible(false);
        this.getView().tableTitle.getParent().setVisible(false); 
  },



/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf fault_mgmt.symptom
*/
//  onBeforeRendering: function() {
//
//  },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf fault_mgmt.symptom
*/
//  onAfterRendering: function() {
//
//  },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf fault_mgmt.symptom
*/
//  onExit: function() {
//
//  }

});