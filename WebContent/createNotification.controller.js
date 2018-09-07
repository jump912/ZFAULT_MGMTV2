sap.ui.controller("fault_mgmt.createNotification", {
 revertValidationRule : function(rule){

  var controller = this;
  var view = this.getView();

  if(rule && Object.keys(rule).length !=0){

   if(rule.ZzpriorityR != ""){   //set priority description by looping through priority keys

    var priorityData = controller.priorityList.getModel().getData();
    var desc = "";

    for(i in priorityData.listitems){
     if(priorityData.listitems[i].Zzpriok == rule.ZzpriorityR ){
      view.priority_input.setValue(priorityData.listitems[i].Zzpriok+" - "+priorityData.listitems[i].Zzpriokx);

      view.priority_input.data("value",priorityData.listitems[i].Zzpriok);
     }
    }
   }

   if(rule.Zzfaulttype2 == "M"){   // check if faulttype2 has to be mandatory

    view.faultResponse.data("mandatory",false);
    view.faultResponse.getParent().getItems()[0].setText("Fault Information");
   }
   else if(rule.Zzfaulttype2 == "H"){

    view.faultResponse.data("mandatory",false);
    view.faultResponse.getParent().getItems()[0].setText("Fault Information");

   }
   else if(rule.Zzfaulttype2 == "F2"){
	   var oFlag = "X";
	   controller.getOwnerComponent().oFlag = oFlag;
   }

   if(rule.ZztsrTpcAuditno == "M"){   // check if audit number has to be mandatory
    view.auditNum.data("mandatory",false);
    view.auditNum.getParent().setVisible(true);
    view.auditNum.getParent().getItems()[0].setText("TSR/TPC/Audit Number");
    view.row4.setVisible(false);
   }
   else if(rule.ZztsrTpcAuditno == "H"){
    view.auditNum.getParent().setVisible(true);
    view.auditNum.data("mandatory",false);
   }


   if(rule.Zzaudittype == "M"){ // check if audit type has to be mandatory
    view.auditType.data("mandatory",false);
    view.auditType.getParent().setVisible(true);
    view.auditType.getParent().getItems()[0].setText("Audit Type");
    view.row4.setVisible(false);

   }
   else if(rule.Zzaudittype == "H"){
    view.auditType.getParent().setVisible(true);
    view.auditNum.data("mandatory",false);
   }


   if(rule.Zzengflag == "M"){  // check if engineering has to be mandatory
    view.engineering.getParent().setLabel("Engineering Flag");
    view.engineering.data("mandatory",false);
    view.engineering.getParent().setVisible(true);
   }

   else if(rule.Zzengflag == "H"){
    view.engineering.getParent().setVisible(true);
    view.engineering.data("mandatory",false);
   }

  }

 },


 applyValidationRule : function(rule,change){

  var controller = this;
  var view = this.getView();

  if(!this.appliedRule){
   this.appliedRule = {
     faultSource : {},
     priority : {},
     symptom : {}
   }
  }

  if(rule){

   if(this.prevChange == change && typeof(this.prevChange) != "undefined"){
    var prevrule = {};
    switch(change){

    case "faultSource" : {
     prevrule =  this.appliedRule.faultSource;
     break;
    }
    case "priority" : {
     prevrule =  this.appliedRule.priority;
     break;
    }
    case "symptom" : {
     prevrule =  this.appliedRule.symptom;
     break;
    }
    }
    this.revertValidationRule(prevrule);
   }
   this.prevChange = change;

   if(rule.ZzpriorityR != ""){   //set priority description by looping through priority keys



    var priorityData = controller.priorityList.getModel().getData();
    var desc = "";

    for(i in priorityData.listitems){
     if(priorityData.listitems[i].Zzpriok == rule.ZzpriorityR ){
      view.priority_input.setValue(priorityData.listitems[i].Zzpriok+" - "+priorityData.listitems[i].Zzpriokx);
      view.priority_input.data("value",priorityData.listitems[i].Zzpriok);
     }
    }
   }

   if(rule.Zzfaulttype2 == "M"){   // check if faulttype2 has to be mandatory
    view.faultResponse.data("mandatory",true);
    //view.faultResponse.getParent().getItems()[0].setText("*Fault Information");
    view.faultResponse.getParent().getItems()[0].setRequired(true);



   }
   else if(rule.Zzfaulttype2 == "H"){
    view.faultResponse.data("mandatory",false);
    view.faultResponse.getParent().getItems()[0].setText("Fault Information");


   }



   if(rule.ZztsrTpcAuditno == "M"){   // check if audit number has to be mandatory
    view.auditNum.data("mandatory",true);
    view.auditNum.getParent().setVisible(true);
    view.row4.setVisible(true);
    //view.auditNum.getParent().getItems()[0].setText("*TSR/TPC/Audit Number");
    view.auditNum.getParent().getItems()[0].setRequired(true);

   }

   else if(rule.ZztsrTpcAuditno == "H"){
    view.auditNum.getParent().setVisible(false);
    view.auditNum.data("mandatory",false);
    view.auditNum.setValue("");
   }



   if(rule.Zzaudittype == "M"){ // check if audit type has to be mandatory
    view.auditType.data("mandatory",true);
    view.row4.setVisible(true);
    view.auditType.getParent().setVisible(true);
    //view.auditType.getParent().getItems()[0].setText("*Audit Type");
    view.auditType.getParent().getItems()[0].setRequired(true);
   }

   else if(rule.Zzaudittype == "H"){
    view.auditType.getParent().setVisible(false);
    view.auditType.data("mandatory",false);
    view.auditType.setValue("");


   }


   if(rule.Zzengflag == "M"){  // check if engineering has to be mandatory
    //view.engineering.getParent().setLabel("*Engineering Flag");
    view.engineering.getParent().setRequired(true);
    view.engineering.data("mandatory",true);
    view.engineering.getParent().setVisible(true);
   }
   else if(rule.Zzengflag == "H"){
    view.engineering.getParent().setVisible(false);
    view.engineering.data("mandatory",false);
   }





   switch(change){

   case "faultSource" : {
    this.appliedRule.faultSource = rule;
    break;
   }
   case "priority" : {
    this.appliedRule.priority = rule;
    break;
   }
   case "symptom" : {
    this.appliedRule.symptom = rule;
    break;
   }

   }

  }


  else{                          // if no rules are fetched, default all fields to initial state

   var prevrule = {};
   switch(change){

   case "faultSource" : {
    prevrule =  this.appliedRule.faultSource;
    break;
   }
   case "priority" : {
    prevrule =  this.appliedRule.priority;
    break;
   }
   case "symptom" : {
    prevrule =  this.appliedRule.symptom;
    break;
   }
   }
   this.revertValidationRule(prevrule); 
  }


 },

 fetchValidationRule : function(change,value){

  var rule;
  var controller = this;

  switch(change){
  case "faultSource" : {
   rule = controller.rulesHash.faultSource[value];
   break;
  }
  case "priority" : {
   rule = controller.rulesHash.priority[value];
   break;
  }
  case "symptom" : {
   rule = controller.rulesHash.symptom[value];
   break;
  }
  }

  this.applyValidationRule(rule,change);
 },

 ValidateChangeCarNum :function(){
  var newValue = this.getView().carInput.getTokens()[0].getKey();
  getSetNumber(newValue,this.CarValidationSucess,this);
 },

 validMandatFieldsOpenFault : function(car,symptom)
 {
  var errorFlag = false;
  var selector1 = "#" + this.getView().carInput.getId() + "-inner";
  var selector2 = "#" + this.getView().symptom.getId() + "-inner";
  if(((car =="")||(car ==null)) || ((symptom=="")||(symptom==null)))
  {
   $(selector1).css("border-color","red");
   $(selector2).css("border-color","red");
   errorFlag = true;
  }
  else{
   $(selector1).css("border-color","#bfbfbf");
   $(selector2).css("border-color","#bfbfbf");
  }
  if(errorFlag == true){
   jQuery.sap.require("sap.m.MessageBox");
   sap.m.MessageBox.show("The highlighted fields cannot be blank!",{
    icon: sap.m.MessageBox.Icon.ERROR , 
    title: "Open faults check", 
    actions: sap.m.MessageBox.Action.OK, 
    onClose: function() {/*True case;*/ },
    styleClass: "faultMsgBox"
   });

  }
  return errorFlag;
 },
 validateMandatoryFields : function(){

  var fields = this.getView().mandatory;
  var errorFlag = false;
  var controller = this;
  for(var i in fields){
   var selector = "#" + fields[i].getId() + "-inner";
   var selector_border = "#" + fields[i].getId() + "-border";
   var selectorSymp = "#" + fields[i].getId() + "-border";
   var carMulti = "#" + fields[i].getId() + "-border";
   if(fields[i].getId() === "symptomMulti"){
    if(fields[i].data("mandatory") && this.getView().symptom.getTokens().length == 0){ 
     $(selectorSymp).css("border-color","red");
     errorFlag = true;
    }
    else
     $(selectorSymp).css("border-color","");
   }
   else if(fields[i].getId() === "carMulti"){
    if(fields[i].data("mandatory") && this.getView().carInput.getTokens().length == 0){ 
     $(carMulti).css("border-color","red");
     errorFlag = true;
    }
    else
     $(carMulti).css("border-color","");
   }
   else
   {
    if(fields[i].data("mandatory") && selector_border === "#objPart-border"){
     if(fields[i].getTokens().length <= 0){
      $(selector_border).css("border-color","red");
      errorFlag = true;
     }
     else{
      $(selector_border).css("border-color","");
     }
    }
    //NARASIMB 22092016 - HPQC #15195 -- Start
    else if(fields[i].data("mandatory") && selector_border === "#fms_app_Asset-border"){
     if(fields[i].getTokens().length <= 0){
      $(selector_border).css("border-color","red");
      errorFlag = true;
     }
     else{
      $(selector_border).css("border-color","");
     }
    }
    //NARASIMB 22092016 - HPQC #15195 -- End
    else if(fields[i].data("mandatory") && fields[i].getValue() == ""){
     $(selector).css("border-color","red");
     $(selector_border).css("border-color","red");
     errorFlag = true;
    }
    else{
     $(selector).css("border-color","");
     $(selector_border).css("border-color","");
    }


   }
   /*if(this.getView().symptom.data("mandatory") && this.getView().symptom.getTokens().length == 0)
   {
     $(selectorSymp).css("border-color","red");
     errorFlag = true;

   }
   else
   {
     $(selectorSymp).css("border-color","none");
   }*/
  }

  if(this.getView().fixedTraffic.data("mandatory") && (this.getView().fixedTraffic.getSelected() == false))
  {
   $("#fixedTraffic-CbBg").css("border-color","red");
   errorFlag = true;
  }
  else
  {
   $("#fixedTraffic-CbBg").css("border-color","#bfbfbf");
  }

  if(this.getView().faultResponse.data("mandatory") && (this.getView().faultResponse.getSelectedKeys() == false))

  {
   this.getView().faultResponse.getParent().getItems()[1].setValueState("Error");

   errorFlag = true;
  }
  else
  {
   this.getView().faultResponse.getParent().getItems()[1].setValueState("None");
  }


  if(errorFlag == true){
   controller.showErrorMessage("The highlighted fields cannot be blank!");
  }
  return errorFlag;
 },


 getValidateValues : function(change){

  var source = this;

  var faultSource = source.getView().faultSource.getValue();
  var priority = source.getView().priority_input.data().value;
  var symptom = this.getView().data("symptomGroup");
  if(symptom == null){
   symptom = "";
  }
  switch(change){
  case "faultSource" : {
   this.fetchValidationRule("faultSource",faultSource);
   break;
  }
  case "faultPriority" : {
   this.fetchValidationRule("priority",priority);
   break;
  }
  case "symptom" : {
   this.fetchValidationRule("symptom",symptom);
   break;
  }

  }

 },

 showErrorMessage : function(message){

  controller = this;
  if(!this.dialog){
   var info =  new sap.m.Text({
    text : ""
   });

   var dialog = new sap.m.Dialog({
    title : "Validations",
    type : "Message",
    content : [
               new sap.m.HBox({
                width : "100%",
                height : "100%",
                alignItems : sap.m.FlexAlignItems.Center,
                justifyContent : sap.m.FlexJustifyContent.Center,
                items : [
                         new sap.ui.core.Icon({
                          src : "sap-icon://error",
                          layoutData : new sap.m.FlexItemData({
                           styleClass : "errorIcon"
                          }),
                          size : "2em",
                         }), 
                         info
                         ]
               })

               ],
               beginButton : new sap.m.Button({
                text : "Ok",
                press : function(evt){
                 controller.dialog.close();

                }
               })
   }).addStyleClass("faultMsgBox");
   dialog.info = info;
   this.dialog = dialog;
  }
  this.dialog.info.setText(message);
  this.dialog.open();
 },


 chooseAsset : function(evt, source) {
  if(this.getView().carInput.getTokens().length > 0){
   var appView = this.getView().getViewData();
   var app = appView.app;

   var carnum = this.getView().carInput.getTokens()[0].getKey();
   var dateTime = this.getView().dateTime.getValue();
   var setNum = this.getView().setNum.getValue();
   var treeData = this.assetData;
   var source = evt.getSource();
   var prevPage = this.getView();
   prevPage.source = source;
   var descShortText = this.getView().textBoxArea.getValue();

   /*if (source.data("valid")) {*/

   // navigation to asset view
   if (!app.getPage("asset")) {
    var page = sap.ui.view({
     id : "asset",
     viewName : "fault_mgmt.asset",
     type : sap.ui.core.mvc.ViewType.JS,
     viewData : appView
    });
    app.addPage(page);
    this.page = page;
   } else {
    this.page = app.getPage("asset");
   }
   this.page.data("prevPage",prevPage);
   this.page.data("descShortText",descShortText);

   app.to("asset");
   /*} else {

       //if(!this.check){
       this.ValidateChangeCarNum();
       //}
      }*/
  }
//  }
 },
 chooseSymptom : function(evt) {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  var asset;

  var carnum = "";
  var carLength = prevPage.carInput.getTokens().length;
  if (prevPage.asset.getTokens().length != 0){
   var assetString = prevPage.asset.getTokens()[0].getKey();
   var assetCode = assetString.split(" ");
   asset = assetCode[0].trim();
  }
  else {
   asset = "";
  }
  prevPage.source = source;

  // navigation to Symptom view
  if((carLength == 0) && (!asset))
  {
   jQuery.sap.require("sap.m.MessageBox");
   sap.m.MessageBox.show("Please enter a Car to proceed",
     {
    icon: sap.m.MessageBox.Icon.INFORMATION , 
    title: "Fault Information", 
    actions: sap.m.MessageBox.Action.OK, 
    onClose: function() {/*True case;*/ },
    styleClass: "faultMsgBox"
     });
  }
  else {
   if(prevPage.carInput.getTokens().length !=1)
   {
    carnum = prevPage.carInput.getTokens()[0].getKey();
   }// multicar reqt
//   if(prevPage.carInput.getTokens().length ==1) // comment multi car reqt
//   {
   carnum = prevPage.carInput.getTokens()[0].getKey();
   if (!app.getPage("symptom")) {
    var page = sap.ui.view({
     id : "symptom",
     viewName : "fault_mgmt.symptom",
     type : sap.ui.core.mvc.ViewType.JS,
     viewData : appView

    });
    app.addPage(page);
    this.page = page;

   } else {
    this.page = app.getPage("symptom");
   }

   this.page.data("prevPage",prevPage);

   app.to("symptom");
//   }
//   else{// comment else block multi car reqt
//   jQuery.sap.require("sap.m.MessageBox");
////   sap.m.MessageBox.show("Symptom cannot be re-selected when multiple cars are specified",sap.m.MessageBox.Icon.INFORMATION , "Fault Information", sap.m.MessageBox.Action.OK, function() {/*True case;*/ }).addStyleClass("faultMsgBox");
//   sap.m.MessageBox.show("Symptom cannot be re-selected when multiple cars are specified",{
//   icon  : sap.m.MessageBox.Icon.INFORMATION , 
//   title  :  "Fault Information", 
//   actions  : sap.m.MessageBox.Action.OK, 
//   onClose  : function() {True case; },
//   styleClass : "faultMsgBox"
//   });
//   }
  }
 },


 resetSymptom : function(evt)
 { 
  if(this.getView().symptom){

   var removeFlag = evt.getParameters().type;
//   if((!this.getView().data("multiFlag"))&& (removeFlag == "removed")){ // Commented for defect 10398 by PATTEDT
   if(removeFlag == "removed"){
    this.getView().symptom.destroyTokens();
    this.getView().asset.destroyTokens();
    this.getView().obj_inp.destroyTokens();
    //BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
    if((this.getView().data("notifNum"))!==""&&(this.getView().data("notifNum"))!==null){
     this.getView().positionPopOver.setValue(""); 
    }
    //EOI For fault UI Fix KADAMA20161223 #HPQC 42144

    //BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
    this.clearActivityCode();
    //EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
   }
  }


 },
 resetSymptomAsset :function(evt){
  var removeFlag = evt.getParameters().type;

  //if(this.getView().carInput.getTokens().length>0){
  //if((!this.getView().data("multiFlag"))&& (removeFlag == "removed")){
//  if(this.getView().carInput.getTokens().length<=0 && // Commented for defect 10398
  if(removeFlag == "removed"){
   var removedToken = evt.getParameters().token.getKey();
   this.getView().symptom.destroyTokens();
   this.getView().asset.destroyTokens();
   this.getView().obj_inp.destroyTokens();
   //BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
   if((this.getView().data("notifNum"))!==""&&(this.getView().data("notifNum"))!==null){
    this.getView().positionPopOver.setValue(""); 
   }
   //EOI For fault UI Fix KADAMA20161223 #HPQC 42144

   //BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
   this.clearActivityCode();
   //EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
   this.getView().data("multiFlag", false);
   this.getView().data("carToken",removedToken);
   this.change = false;
// BEGIN INSERT CR015 SIMS20180815 (SY)
   var aCarNum = [];
   var carNumbers = this.getView().data("carNumbers");
   for(var i=0; i<carNumbers.length; i++){
	   if(carNumbers[i].Zzcarid !== removedToken){
		   aCarNum.push({Zzcarid: carNumbers[i].Zzcarid, Zzcarpos: carNumbers[i].Zzcarid})
	   }
   };
   this.getView().data("carNumbers",aCarNum);
   this.getView().data("carNumbersLen",aCarNum.length);
// END INSERT CR015 SIMS20180815 (SY)   
  }
  if((this.getView().carInput.getTokens().length == 1) && (removeFlag == "added")){
   var prevToken = this.getView().data("carToken");
   var addToken =  evt.getParameters().token.getKey();
   if((prevToken == addToken) && (this.isFromChange)){
    this.change = false;
    this.isFromChange = false;
   }
   else if(prevToken == addToken){
    this.change = true;
   }
   else
   {
    this.getView().data("carToken",addToken);
    this.change = false;
   }
  }

  //}


 },



 chooseObjectPart : function(evt, source) {
  var appView = this.getView().getViewData();
  var app = appView.app;

  //navigation to object parts view
  if (!app.getPage("objectParts")) {
   var page4 = sap.ui.view({
    id : "objectParts",
    viewName : "fault_mgmt.objectParts",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : source

   });
   page4.data("app",app);
   app.addPage(page4);
  }
  app.to("objectParts");
 },
 chooseFaultRepBy: function(evt,source)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  prevPage.source = source;
  var controller = this;

  if (!app.getPage("faultRepBy")) {
   var page = sap.ui.view({
    id : "faultRepBy",
    viewName : "fault_mgmt.faultRepBy",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   app.getPage("faultRepBy").data("app",app);
   this.page = page;
  } else {
   this.page = app.getPage("faultRepBy");
  }
  var oModel = controller.aModel;  
  this.page.oTable.setModel(oModel);
  var oRepBy = new sap.m.Text({
   text : "{text1}"
  }); // location
  var oDescription = new sap.m.Text({
   text : "{text2}"
  }); // description
  var oRow = new sap.m.ColumnListItem();

  oRow.addCell(oRepBy).addCell(oDescription);
  this.page.oTable.bindItems("/items", oRow);
  this.page.data("prevPage",prevPage);
  app.to("faultRepBy");
 },
 openMultiCarResults: function(oModel,source,check)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var prevPage = this.getView();
  prevPage.source = source;
  var controller = this;

  if (!app.getPage("multiCarResult")) {
   var page = sap.ui.view({
    id : "multiCarResult",
    viewName : "fault_mgmt.multiCarResult",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   app.getPage("multiCarResult").data("app",app);
   this.page = page;
  } else {
   this.page = app.getPage("multiCarResult");
  } 

  this.page.oTable.setModel(oModel);
  var oCarNum = new sap.m.Text({
   text : "{carNum}"
  }); // location
  // Changes as per version 1.2
  var oPosition = new sap.m.Text({
   text:"{carPos}"
  });
  var oDesc = new sap.m.Text({
   text:"{carDesc}"
  });
  var oStatus = new sap.m.Button({
   enabled: false,
   type:{parts :[{path : "type"}],
    formatter : function(status){
     if(status == "S")
     { 
      return "Accept";
     }
     else{
      return "Reject";
     }
    }}
  }).addStyleClass("statButton");
//  End of changes 
  var oResult = new sap.m.Text({
   text : "{message}",
  }); 
  var oRow = new sap.m.ColumnListItem();

  oRow.addCell(oCarNum).addCell(oDesc).addCell(oPosition).addCell(oStatus).addCell(oResult);
  this.page.oTable.bindItems("/listitems", oRow);
  this.page.data("prevPage",prevPage);
  this.page.data("check",check);
  app.to("multiCarResult");

 },
 chooseTrainTechnician: function(evt,source)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  prevPage.source = source;
  var notifNum = this.getView().data("notifNum");

  if (!app.getPage("technician")) {
   var page = sap.ui.view({
    id : "technician",
    viewName : "fault_mgmt.technician",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   app.getPage("technician").data("app",app);
   this.page = page;
  } else {
   this.page = app.getPage("technician");
  }

  this.page.data("prevPage",prevPage);
  this.page.data("notifNum",notifNum);
  app.to("technician");
 },
 chooseLocation : function(evt,source)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  prevPage.source = source;

  if (!app.getPage("location")) {
   var page = sap.ui.view({
    id : "location",
    viewName : "fault_mgmt.location",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   app.getPage("location").data("app",app);
   this.page = page;
  } else {
   this.page = app.getPage("location");
  }
  this.page.data("prevPage",prevPage);
  app.to("location");
 },
 choosePosition : function(evt,source)
 {
  if(this.getView().obj_inp.getTokens().length !== 0){ //Insert for Defect 14670 KADAMA20161002+
   var appView = this.getView().getViewData();
   var app = appView.app;
   var source = evt.getSource();
   var prevPage = this.getView();
   prevPage.source = source;

   if (!app.getPage("position")) {
    var page = sap.ui.view({
     id : "position",
     viewName : "fault_mgmt.position",
     type : sap.ui.core.mvc.ViewType.JS,
     viewData : appView

    });
    app.addPage(page);
    app.getPage("position").data("app",app);
    this.page = page;
   } else {
    this.page = app.getPage("position");
   }
   this.page.data("prevPage",prevPage);
   app.to("position");
  //Begin of Insert for Defect 14670 KADAMA20161002+
  }
  else{
   sap.m.MessageBox.alert("Enter Object Part...!!", {
    title : "Error",
    icon : sap.m.MessageBox.Icon.ERROR
   });
  }
  //End Of Insert for Defect 14670 KADAMA20161002+

 },
 chooseCarNumber : function(evt) {

  if(!this.check){ // if it is create scenario, enable multi-select for cars // multicar reqt 
   this.getView().data("multiFlag",true) // multicar reqt
  }
  var flag = this.getView().data("multiFlag");
  var appView = this.getView().getViewData();
  var app = appView.app;
  var source =this.getView().carInput;
  var prevPage = this.getView();
  prevPage.source = source;
  var setNum = this.getView().setNum.getValue();
  // navigation to car number view
  if (!app.getPage("carNumber")) {
   var page = sap.ui.view({
    id : "carNumber",
    viewName : "fault_mgmt.carNumber",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   this.page = page;
  } else {
   this.page = app.getPage("carNumber");
  }
  this.page.data("multiFlag",flag);
  this.page.searchInput.setValue(setNum); //setting the set number value to the search input
  this.page.data("prevPage",prevPage);
  var controller  =this.page.oController;
  getCarList(setNum,controller.getData,controller);  
  app.to("carNumber");
 },
 chooseSetNumber : function(evt) {
  var appView = this.getView().getViewData();
  var app = appView.app;

  var source = evt.getSource();
  var prevPage = this.getView();
  prevPage.source = source;
  var setnum = this.getView().setNum.getValue(); //getting the entered or auto populated set number
  // navigation to set number view
  if (!app.getPage("setNumber")) {
   var page = sap.ui.view({
    id : "setNumber",
    viewName : "fault_mgmt.setNumber",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   this.page = page;
  } else {
   this.page = app.getPage("setNumber");
  }
  this.page.searchInput.setValue(setnum);
  this.page.data("prevPage",prevPage);
  var controller  =this.page.oController;

  getSetList(setnum,controller.getData,controller);
  app.to("setNumber");
 },
 changeSetNum :function(){
 
  var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
  var date = new Date(this.getView().dateTime.getDateValue());
  var z = new Date(date.getTime() - TZOffsetMs);
  var x = z.toISOString();
  var y = x.split("T");
  var dateNow = y[0]+"T00:00:00";
  var hour = date.getHours(); // get hours from the date value
  var minutes = date.getMinutes(); //get minutes from the date value
  var seconds = date.getSeconds(); //get seconds from the date value
  if(seconds<10)
  {
   seconds = "0"+seconds;
  }
  var time = "PT"+hour+"H"+minutes+"M"+seconds+"S";
  var controller = this.getView().oController;
//  var set = this.getView().setNum.getValue();  //-- CR015 SIMS20180815 (SY)
  
//BEGIN INSERT CR015 SIMS20180815 (SY)  
  var set = this.getView().setNum.getValue().toUpperCase();
  
//  if(set !== null && set !==""){
//	  var setModelList = this.getView().getModel("setNumberModel").oData.list;
//	  
//	  var index = setModelList.map(function(obj){
//		  return obj.Zzsetid
//	  }).indexOf(set);
//	  
//	  if (index === -1){
//		 set = "";
//		 jQuery.sap.require("sap.m.MessageBox");
//		 sap.m.MessageBox.show(
//				 "Set Number does not have Car Numbers", {
//			      icon: sap.m.MessageBox.Icon.ERROR,
//			      title: "ERROR",
//			      actions: [sap.m.MessageBox.Action.OK],
//			      onClose: function(oAction) { 
//			       if(oAction == "OK"){	
//			       } },
//			       styleClass: "faultMsgBox" 
//		    	   }
//		 )	  
//	  }
//  }
//  
//  var oldSet = this.getView().data("setNumber");
//  
//  this.getView().setNum.setValue(set);
//  this.getView().data("setNumber",set);
//  getCarAndSetList(set, "", this.initCarAndSet, this);
//  if (oldSet!=="" && oldSet !==null) {
//	  if(set !== oldSet){
//		  this.getView().data("carNumbers",[]);
//		  this.getView().data("carNumbersLen","0");
//		  this.getView().carInput.destroyTokens();
//		  this.getView().symptom.destroyTokens();
//		  this.getView().asset.destroyTokens();	
//		  if((this.getView().data("notifNum"))!==""&&(this.getView().data("notifNum"))!==null){
//			  this.getView().positionPopOver.setValue(""); 
//		  }
//   }
//	  this.clearActivityCode();
//  }
//END INSERT CR015 SIMS20180815 (SY)
  
  //check if set is maintained in Constant and Parameter table. If matches make objet part mandatory
  this.determineObjPartMandatory(set);
  validateSetAM(controller.setFaultPositionMandatory, controller, set); //Insert for Defect 15697 KADAMA20161012


  var trip = "";
  eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
  getTripDetails(trip,set,dateNow,time,controller.getTripData,controller);
 },
 //Begin of Insert for Defect 15697 KADAMA20161012+
 setFaultPositionMandatory: function(data){
  var controller = this;
  var fldsMandatory = this.getView().mandatory;
  for(var i=0; i<fldsMandatory.length;i++){
   if(fldsMandatory[i].getId() === controller.getView().positionPopOver.getId())
   {
    fldsMandatory.splice(i,1)
    break; 
   }
  }
  if(data.Zzplant_section == "true"){
   controller.getView().positionLabel.setRequired(true);
   controller.getView().positionPopOver.data("mandatory", true);
   controller.getView().mandatory.push(controller.getView().positionPopOver);

  }
  else{
   controller.getView().positionPopOver.data("mandatory", false);
   controller.getView().positionLabel.setRequired(false);
   var selector1 = "#" + controller.getView().positionPopOver.getId() + "-inner";
   $(selector1).css("border-color","#bfbfbf");

  }
  //BOC for Defect 42517 --> Set fault source and rep by as mandatory in update mode for A and M Set too
/*  //Begin of Insert KADAMA20161028 for Defect 16647 --> 
  //Set fault source and fault rep by as non madatory for and m set only in update mode
  if(this.check == true){
   for(var i=0; i<fldsMandatory.length;i++){
    if(fldsMandatory[i].getId() === controller.getView().faultSource.getId()
      || fldsMandatory[i].getId() === controller.getView().faultRepBy.getId()
    )
    {
     fldsMandatory.splice(i,1)
    }
   }
   if(data.Zzplant_section == "true"){
    controller.getView().faultRepBy.data("mandatory", false);
    controller.getView().faultRepByLabel.setRequired(false);
    var selector1 = "#" + controller.getView().faultRepBy.getId() + "-inner";
    $(selector1).css("border-color","#bfbfbf");

    controller.getView().faultSource.data("mandatory", false);
    controller.getView().faultSourceLabel.setRequired(false);
    var selector2 = "#" + controller.getView().faultSource.getId() + "-inner";
    $(selector2).css("border-color","#bfbfbf");

   }
   else{
    controller.getView().faultRepByLabel.setRequired(true);
    controller.getView().faultRepBy.data("mandatory", true);
    controller.getView().mandatory.push(controller.getView().faultRepBy);

    controller.getView().faultSourceLabel.setRequired(true);
    controller.getView().faultSource.data("mandatory", true);
    controller.getView().mandatory.push(controller.getView().faultSource);
   }
  }
  //End of Insert KADAMA20161028 for Defect 16647
*/
 //EOC for Defect 42517
 },
 //End of Insert for Defect 15697 KADAMA20161012+

 openPositionPopup : function(source) {

  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Bottom,
    title : "Position",
    content : [],
    width : "200px",
    height : "300px",
    styleClass : "faultPopup"
   });

   source.list = list;
   var oModel = getPositionList();

   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt, source) {
     controller.selectValue(evt)
    },
    width : "100%",
    height : "100%"
   });

   optionList.setModel(oModel);

   optionList.bindItems("/listitems",
     new sap.m.StandardListItem({
      title : "{Zzcode}", //setting the position code to the popover
     }));

   source.list.addContent(optionList);

  }
  source.list.openBy(source);
 },
 openReportPhasePopup : function(source) {
  if(source.getEditable()){  //Insert for Defect 14670 KADAMA20161002+
  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Bottom,
    title : "Select Report Phase",
    content : [],
    width : "200px",
    height : "300px",
    styleClass : "faultPopup"
   });
   source.list = list;

   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt, source) {
     controller.selectValue(evt)
    },
    items : [],
    width : "100%",
    height : "100%"
   });
   this.reportPhaseList = optionList;
   source.list.addContent(optionList);
   getReportPhase(optionList);
  }
  var arr = [];
  arr = this.reportPhaseList.getItems();
  for(var k=0;k<arr.length;k++)
  {
   if(this.source.data("value") == arr[k].data("code"))
   {
    this.reportPhaseList.setSelectedItem(arr[k]);
   }
   else if(this.source.data("value")=== "")
   {
    this.reportPhaseList.removeSelections(true);
   }
  }

  source.list.openBy(source);
  }  //Insert for Defect 14670 KADAMA20161002+
 },
 openAuditTypePopup : function(source) {

  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Right,
    title : "Select Audit Type",
    content : [],
    width : "250px",
    height : "300px",
    styleClass : "faultPopup"
   });
   source.list = list;
   var oModel = getAuditTypeList();

   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt, source) {
     controller.selectValue(evt)
    },

    width : "100%",
    height : "100%"
   });
   this.auditTypeList = optionList;
   optionList.setModel(oModel);
   var oDataTemplate = new sap.ui.core.CustomData({
    key : "code"
   });
   oDataTemplate.bindProperty("value", "ZzauditType"); //audit type code 
   var listDesc = new sap.m.StandardListItem({
    title : "{Zzdesc}",
   }); //audit type description
   listDesc.addCustomData(oDataTemplate);
   optionList.bindItems("/listitems", listDesc); //binding model data to the list




   source.list.addContent(optionList);

  }
  var arr = [];
  arr = this.auditTypeList.getItems();
  for(var k=0;k<arr.length;k++)
  {
   if(this.source.data("value") == arr[k].data("code"))
   {
    this.auditTypeList.setSelectedItem(arr[k]);
   }
   else if(this.source.data("value")=== "")
   {
    this.auditTypeList.removeSelections(true);
   }
  }
  source.list.openBy(source);
 },
 openLocationPopup : function(source) {

  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Top,
    title : "Select Location",
    content : [],
    width : "200px",
    height : "300px",
    styleClass : "faultPopup"
   });
   source.list = list;

   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt, source) {
     controller.selectValue(evt)
    },
    width : "100%",
    height : "100%"
   });
   source.list.addContent(optionList);
   getLocation(optionList);

  }
  source.list.openBy(source);
 },
 openFaultPopup : function(source) {
  if(source.getEditable()){  //Insert for Defect 14670 KADAMA20161002+
  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Right,
    title : "Select Fault Source",
    content : [],
    width : "400px",
    height : "300px",
    styleClass : "faultPopup"
   });
   source.list = list;

   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt, source) {
     controller.selectValue(evt);
    },
    width : "100%",
    height : "100%"
   });
   this.faultSourceList = optionList; 


   source.list.addContent(optionList);
   getFaultSources(optionList);

  }
  var arr = [];
  arr = this.faultSourceList.getItems();
  for(var k=0;k<arr.length;k++)
  {
   if(this.source.data("value") == arr[k].data("code"))
   {
    this.faultSourceList.setSelectedItem(arr[k]);
   }
   else if(this.source.data("value")=== "")
   {
    this.faultSourceList.removeSelections(true);
   }
  }

  source.list.openBy(source);
  } //Insert for Defect 14670 KADAMA20161002+
 },
 openTempPopup : function(source) {

  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Top,
    title : "Select Temperature",
    content : [],
    width : "200px",
    height : "300px",
    styleClass : "faultPopup"
   });
   source.list = list;
   var oModel = getTempList();

   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt, source) {
     controller.selectValue(evt)
    },
    width : "100%",
    height : "100%"
   });
   this.tempList = optionList;
   optionList.setModel(oModel);
   var oDataTemplate = new sap.ui.core.CustomData({
    key : "code"
   });
   oDataTemplate.bindProperty("value", "Zztemp"); // code
   // for
   // temperature
   var listDesc = new sap.m.StandardListItem({
    title : "{Zzdesc}",
   }); // description for temperature
   listDesc.addCustomData(oDataTemplate);
   optionList.bindItems("/listitems", listDesc); //binding the model data to the list
   source.list.addContent(optionList);

  }
  var arr = [];
  arr = this.tempList.getItems();
  for(var k=0;k<arr.length;k++)
  {
   if(this.source.data("value") == arr[k].data("code"))
   {
    this.tempList.setSelectedItem(arr[k]);
   }
   else if(this.source.data("value")=== "")
   {
    this.tempList.removeSelections(true);
   }
  }

  source.list.openBy(source);
 },
 openNotificationTypePopup : function(source) {

  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Bottom,
    title : "Select Type",
    content : [],
    width : "200px",
    height : "300px",
    styleClass : "faultPopup"
   });

   source.list = list;
   var oModel = getNotificationTypeList();

   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt, source) {
     controller.selectValue(evt)
    },


    width : "100%",
    height : "100%"
   });
   optionList.setModel(oModel);
   var oDataTemplate = new sap.ui.core.CustomData({
    key : "code"
   });
   oDataTemplate.bindProperty("value", "Qmart");//code for Notification Type
   var listDesc = new sap.m.StandardListItem({
    title : "{Qmartx}",
   }); //description for notification type
   listDesc.addCustomData(oDataTemplate);
   optionList.bindItems("/listitems", listDesc); // adding model data to the list

   source.list.addContent(optionList);

  }
  source.list.openBy(source);
 },
 openEngFlagPopup : function(source){

  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Bottom,
    title : "Select Flag Value",
    content : [],
    width : "200px",
    height : "300px",
    styleClass : "faultPopup"
   });
   source.list = list;
   var oModel = getEngFlagList();

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
   var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
   oDataTemplate.bindProperty("value", "ZzengFlag"); //codes for engineering flag
   var listDesc =  new sap.m.StandardListItem({
    title : "{Zzdesc}", }); //description for engineering flag
   listDesc.addCustomData(oDataTemplate);
   optionList.bindItems("/listitems",listDesc); //adding model data to the list
   source.list.addContent(optionList);

  }
  source.list.openBy(source);
 },
 openWeatherPopup : function(source){

  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    //placement : sap.m.PlacementType.Bottom,
    placement : sap.m.PlacementType.Top,
    title : "Select Weather",
    content : [],
    width : "200px",
    height : "300px",

   });

   source.list = list;
   var oModel = getWeatherList();

   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt,source) {
     controller.selectValue(evt)
    },

    width : "100%",
    height : "100%"
   });
   this.weatherList = optionList;
   optionList.setModel(oModel);
   optionList.addStyleClass("faultPopup");


   var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
   oDataTemplate.bindProperty("value", "Zzweather"); //code for weather
   var listDesc =  new sap.m.StandardListItem({
    title : "{Zzdesc}", }); //description for weather
   listDesc.addCustomData(oDataTemplate);
   optionList.bindItems("/listitems",listDesc); //adding model data to the list



   source.list.addContent(optionList);

  }
  var arr = [];
  arr = this.weatherList.getItems();
  for(var k=0;k<arr.length;k++)
  {
   if(this.source.data("value") == arr[k].data("code"))
   {
    this.weatherList.setSelectedItem(arr[k]);
   }
   else if(this.source.data("value")=== "")
   {
    this.weatherList.removeSelections(true);
   }
  }
  source.list.openBy(source);
 },

 openPriorityPopup : function(source,init){

  this.source = source;
  var controller = this;
  if (!source.list) {

   var list = new sap.m.ResponsivePopover({
    placement : sap.m.PlacementType.Right,
    title : "Select Priority",
    content : [],
    width : "200px",
    height : "300px",

   }).addStyleClass("faultPopup");
   source.list = list;
   var oModel = getPrioList('C'); // C - Create / Update Mode and S or blank for Search
   var optionList = new sap.m.List({
    mode : sap.m.ListMode.SingleSelectMaster,
    includeItemInSelection : true,
    select : function(evt,source) {
     controller.selectValue(evt);
    },
    width : "100%",
    height : "100%"
   });
   this.priorityList = optionList;
   optionList.setModel(oModel);
   var oDataTemplate = new sap.ui.core.CustomData({key:"code"});
   oDataTemplate.bindProperty("value", "Zzpriok"); //code for priority
   var listDesc =  new sap.m.StandardListItem({
    title : {
     parts :[{path : "Zzpriok"} , {path : "Zzpriokx"}],
     formatter : function(Zzpriok,Zzpriokx){
      if(Zzpriok&&Zzpriokx)
      {
       return Zzpriok +" - "+Zzpriokx;
      }
      else if(Zzpriok)
      {
       return Zzpriok;
      }
      else if(Zzpriokx)
      {
       return Zzpriokx;
      }
     }
    },});
   listDesc.addCustomData(oDataTemplate);
   optionList.bindItems("/listitems",listDesc); //adding model data to list

   source.list.addContent(optionList);

  }
  if(!init){
   this.priorityList.removeSelections(true); // BOI 16191
   var arr = [];
   arr = this.priorityList.getItems();
   for(var k=0;k<arr.length;k++)
   {
    if(this.source.data("value") == arr[k].data("code"))
    {
     this.priorityList.setSelectedItem(arr[k]);
    }
    else if(this.source.data("value")=== "")
    {
     this.priorityList.removeSelections(true);
    }
   }
   source.list.openBy(source);
  }
 },
 selectValue : function(Evt) {
  eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
  this.source.setValue(Evt.getParameters().listItem.getTitle());
  this.source.data("value",Evt.getParameters().listItem.data("code"));
//  this.source.data("selectedItemId",Evt.getParameters().listItem.getId());
  this.source.list.close();

  if((this.source.preValue != this.source.data()) && this.source.getId() == "faultSource"){
   this.source.preValue = this.source.data("value");
   this.getValidateValues("faultSource");
  }
  else if ((this.source.preValue != this.source.data()) && this.source.getId() == "faultPriority"){
   this.source.preValue = this.source.data("value");
   this.getValidateValues("faultPriority");
  }


 },

 CarValidationSucess :function(data){
  var setNum = data.d.results[0].NAV_CARSET.EvSetid;
  var setId = this.getView().setNum.getValue();
  var carinp= this.getView().carInput;
  var setInp = this.getView().setNum;
  var appView = this.getView().getViewData();
  var app = appView.app;
  var prevPage = this.getView();
  
  if (setNum == ""){
   //this.getView().carInput.setValueState("Error");
   //this.getView().carInput.setValueStateText("Please provide valid Car Number");
   this.getView().asset.data("valid",false);
   jQuery.sap.require("sap.m.MessageBox");
   sap.m.MessageBox.show(
     "Please provide valid Car Number", {
      icon: sap.m.MessageBox.Icon.ERROR,
      title: "ERROR",
      actions: [sap.m.MessageBox.Action.OK],
      onClose: function(oAction) { 
       if(oAction == "OK"){
        ///url redirection for legecy
        //carinp.setValueState("Error");
        //setInp.setValueState("Error");
       } },
       styleClass: "faultMsgBox"
     }
   );

  }
  else{
   if(setId != ""){
    if(setId == setNum){
    	
	     //this.getView().carInput.setValueState("Success"); 
	     //this.getView().setNum.setValueState("Success"); 
	     this.getView().data("setNum",setNum);
	     this.getView().asset.data("valid",true);
	     
	     // navigation to asset view
	     if (!app.getPage("asset")) {
	      var page = sap.ui.view({
	       id : "asset",
	       viewName : "fault_mgmt.asset",
	       type : sap.ui.core.mvc.ViewType.JS,
	       viewData : appView
	      });
	      app.addPage(page);
	      this.page = page;
	     } else {
	      this.page = app.getPage("asset");
	     }
	     this.page.data("prevPage",prevPage);
	
	     app.to("asset");

    }
    else{
     jQuery.sap.require("sap.m.MessageBox");
     sap.m.MessageBox.show(
       "Car number does not match Set number. Please try again", {
        icon: sap.m.MessageBox.Icon.ERROR,
        title: "ERROR",
        actions: [sap.m.MessageBox.Action.OK],
        onClose: function(oAction) { 
         if(oAction == "OK"){
          ///url redirection for legecy
          //carinp.setValueState("Error");
          //setInp.setValueState("Error");
         } },
         styleClass: "faultMsgBox"
       }
     );
     this.getView().asset.data("valid",false);
    }
   }
   else { 
    jQuery.sap.require("sap.m.MessageBox");
    sap.m.MessageBox.show(
      "Car number belongs to Set "+setNum, {
       icon: sap.m.MessageBox.Icon.INFORMATION,
       title: "Information",
       actions: [sap.m.MessageBox.Action.OK],
       onClose: function(oAction) { 
        if(oAction == "OK"){
        	
        	setInp.setValue(setNum);  
	         // navigation to asset view
	         if (!app.getPage("asset")) {
	          var page = sap.ui.view({
	           id : "asset",
	           viewName : "fault_mgmt.asset",
	           type : sap.ui.core.mvc.ViewType.JS,
	           viewData : appView
	          });
	          app.addPage(page);
	          this.page = page;
	         } else {
	          this.page = app.getPage("asset");
	         }
	         this.page.data("prevPage",prevPage);
	
	         app.to("asset");
	         //carinp.setValueState("Success"); 
	         //setInp.setValueState("Success");
        } },
        styleClass: "faultMsgBox"
      }
    );


   }
  }

 },



 editOrSave : function(evt,source){
  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  prevPage.source = source;
  var descValue;

  if(this.getView().data("descFieldFromSearch") == "" || this.getView().data("descFieldFromSearch") == null)
  {
   descValue = prevPage.textBoxArea.getValue();
  }
  else
  {
   descValue = this.getView().data("descFieldFromSearch");
  }
  if (!app.getPage("detailedDescription"))
  {
   //navigation to the detailed description view
   var page = sap.ui.view({
    id : "detailedDescription",
    viewName : "fault_mgmt.detailedDescription",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData: appView

   });
   app.addPage(page);
   this.page = page;
  }
  else {
   this.page = app.getPage("detailedDescription");
  }
  this.page.data("prevPage",prevPage);
  if (this.page.textBox.getValue().length <= 40)
  {
   this.page.data("descValue",descValue);
  }
  else 
  {
   if(!this.check)
   {
    descValue = this.page.textBox.getValue();
   }
   else
   {
    descValue  = this.getView().data("descFieldFromSearch");
   }
   this.page.data("descValue",descValue);
  }



  var notifNumber = this.getView().data("notifNum");
  var longTxtController = this.page.oController;
  if($.trim(notifNumber).length > 0) 
  {
   this.page.data("textBoxExtTxt",this.getView().data("descFieldFromSearch"));//Copy to the existing text control

   if($.trim(this.getView().data(notifNumber)).length <= 0)
    getLongTextLock(notifNumber, this.getView().oController, longTxtController.dispExistingTxt, longTxtController);
   else{
    if($.trim(this.getView().data(notifNumber)) === "YES")
     longTxtController.dispExistingTxt('X');
    else
     longTxtController.dispExistingTxt('');
   }
   // HPQC # 42147 NARASIMB 13122016  -- Start
     /*if($.trim(this.getView().data("SAPFaultPriority")).charAt(0) !== "U") 
      longTxtController.getView().row7.setVisible(true); //Insert for Defect 15814*/
    // HPQC # 42147 NARASIMB 13122016  -- End 
   if(this.SAPFaultPriority !== "U"){
    longTxtController.getView().row7.setVisible(true); //Insert for Defect 15814
   }
   else{
    longTxtController.getView().row7.setVisible(false);
   }

  }
  else
  {
   longTxtController.getView().row7.setVisible(false); //Insert for Defect 15814
   this.page.data("textBoxExtTxt","");//Copy to the existing text control
   if(prevPage.textBoxArea.getValue().length === 40 && this.page.textBox.getValue().length <= 0)
   {
    this.page.textBox.setValue(prevPage.textBoxArea.getValue());
   }
  }
  app.to("detailedDescription"); 
 },

 addAttachments: function(evt)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var notifNum = this.getView().data("notifNum");
  var source = evt.getSource();
  var prevPage = this.getView();

  if (!app.getPage("attachments")) {
   var page = sap.ui.view({
    id : "attachments",
    viewName : "fault_mgmt.attachments",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);

   this.page = page;
  } else {
   this.page = app.getPage("attachments");
  }
  this.page.data("notifNum",notifNum);
  this.page.data("prevPage",prevPage);
  app.to("attachments");
 },
 openSearchView: function(evt)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var notifNum = this.getView().data("notifNum");
  var prevPage = this.getView();
  if(prevPage.carInput){
   if(prevPage.carInput.getTokens().length < 2){

    if (!app.getPage("searchFault")) {
     var page = sap.ui.view({
      id : "searchFault",
      viewName : "fault_mgmt.searchFault",
      type : sap.ui.core.mvc.ViewType.JS,
      viewData : appView

     });
     app.addPage(page);
     this.page = page;
    } else {
     this.page = app.getPage("searchFault");
    }
    this.page.data("notifNum",notifNum);
    this.page.data("prevPage",prevPage);

    this.page.faultNum.focus();
    app.to("searchFault");
   }
   else{
    jQuery.sap.require("sap.m.MessageBox");
//    sap.m.MessageBox.show("Please Remove more then one Car",sap.m.MessageBox.Icon.INFORMATION , "Fault Information", sap.m.MessageBox.Action.OK, function() { }).addStyleClass("faultMsgBox");

    sap.m.MessageBox.show("Please Remove more then one Car",{
     icon  : sap.m.MessageBox.Icon.INFORMATION , 
     title  :  "Fault Information", 
     actions  : sap.m.MessageBox.Action.OK, 
     onClose  : function() {/*True case;*/ },
     styleClass : "faultMsgBox"
    });

   }
  }
  else{

   if (!app.getPage("searchFault")) {
    var page = sap.ui.view({
     id : "searchFault",
     viewName : "fault_mgmt.searchFault",
     type : sap.ui.core.mvc.ViewType.JS,
     viewData : appView

    });
    app.addPage(page);
    this.page = page;
   } else {
    this.page = app.getPage("searchFault");
   }
   this.page.data("notifNum",notifNum);
   this.page.data("prevPage",prevPage);
   this.page.faultNum.focus();
   app.to("searchFault");

  }
 },
// function called on check notification button press
 getOpenNotifications : function(evt){

  var page = this.getView();
  var notifTable = this.getView().notifTable;
  
//** Eric - Begin add - CR015
//** reset the switch to open fault 
  this.resetFaultDialog(); 
//** Eric - End add - CR015
  
  var dialog = this.getView().dialogNotification;
//  Changes for version 1.4
  var carid = "";
  var len = this.getView().carInput.getTokens().length;
  for (var k =0; k < len; k++){
   if(k==0){
    carid = this.getView().carInput.getTokens()[k].getKey();
   }
   else{
    carid = carid + "|" + this.getView().carInput.getTokens()[k].getKey();}
  }
//  End of changes
//  var car = this.getView().carInput.getTokens()[0].getKey();
  var notifNum = this.getView().data("notifNum");

  setOpenNotificationData(carid,notifTable,dialog,this,notifNum);


 },
 
 //** Eric - Begin add - CR015
 onFaultSwitchFlipped: function(oEvent) {
	 
	 if(!this._oStateObj) {
		 this._oStateObj = {
			openState: {
				data: null,
				filter: null,
				sorter: null,
			},
			closedState: {
				data: null,
				filter: null,
				sorter: null,
			}
		 };
	 }
	 
	 var oTable = this.getView().notifTable;
	 var oBinding = oTable.getBinding("items");
	 
	 // State = true means switched to closed fault 
	 if(oEvent.getParameters().state) {
		// Switching to closed fault data
		 
	 	// Stash open fault data
	 	this._oStateObj.openState.data = oTable.getModel().getData();
	 	this._oStateObj.openState.filter = oBinding.aFilters;
	 	this._oStateObj.openState.sorter = oBinding.aSorters;
		 
		// Restore closed fault data
		oTable.getModel().setData(this._oStateObj.closedState.data);
		oBinding.filter(this._oStateObj.closedState.filter);
		oBinding.sort(this._oStateObj.closedState.sorter);
		 
	 } else {
		// Switching to open fault data
		 
		// Stash closed fault data
		this._oStateObj.closedState.data = oTable.getModel().getData();
		this._oStateObj.closedState.filter = oBinding.aFilters;
		this._oStateObj.closedState.sorter = oBinding.aSorters;
		 
		// Restore open fault data
		oTable.getModel().setData(this._oStateObj.openState.data);
		oBinding.filter(this._oStateObj.openState.filter);
		oBinding.sort(this._oStateObj.openState.sorter);
	 }
	 
	 this.showHideDialogComponent(oEvent.getParameters().state);
 },
 
 showHideDialogComponent: function(bSwitchState) {
	// Hide/reveal the sub header
	 this.dialogNotification.getSubHeader().setVisible(bSwitchState);
	 
	 // Hide/reveal the Review/Update button
	 var aDialogButtons = this.dialogNotification.getButtons();
	 for (var e = 0; e < aDialogButtons.length; e++) {
		 if(aDialogButtons[e].getId() === "ReviewExistButton") {
			 aDialogButtons[e].setVisible(!bSwitchState);
		 }
	}
 },
 
 resetFaultDialog: function() {
	 var oDialog = this.getView().dialogNotification;
	 var oFaultSwitch = oDialog.getCustomHeader().getContentLeft().find(x => x.sId==="FaultSwitch");
	 if(oFaultSwitch.getState() === true) {
		 // We want the switch to always back to open fault when dialog is closed
		 oFaultSwitch.setState(false);
		 this.showHideDialogComponent(false);
	 }
 },
 
 clearFilterAndSort: function() {
	 var oTable = this.getView().notifTable;
	 var oBinding = oTable.getBinding("items");
	 var oModel = oTable.getModel();
	 var oFilterDialog = this._getClosedFaultFilterDialog();
	 var oSortDialog = this._getSortDialog();
	 
	 if(oBinding) {
		 oBinding.aSorters = null;
		 oBinding.aFilters = null;
		 oModel.refresh(true);
		 
		 if(oFilterDialog) {
			// set a fresh blank model
			 var oFilterModel = getFilterModel();
			 oFilterDialog.setModel(oFilterModel, "FilterModel");
			 oFilterModel.refresh(true);
		 }
		 
		 if(oSortDialog) {
			 // set a fresh blank model
			 var oSortModel = getSortModel();
			 oSortDialog.setModel(oSortModel, "SortModel");
			 oSortModel.refresh(true);
		 }
	 }
 },
 
 setDefaultSort: function() {
	 // Default to sort by Notification Date Time
	 var oTable = this.getView().notifTable;
	 var oBinding = oTable.getBinding("items");

     var aSorters = [];
     aSorters.push(new sap.ui.model.Sorter("ZzincidentDate", true));
     aSorters.push(new sap.ui.model.Sorter("ZzincidentTime", true));
     
     oBinding.sort(aSorters);
 },
 
 getClosedFaultModelCallback: function(oData) {
	 this.closedFaultData = oData.results;
	 
	 // The original design uses json model and already bound properly
	 // So we just change the data
	 this.getView().notifTable.getModel().setData(this.closedFaultData);
	 
	 // clear all filter + sort and default to sort by incident date & time
	 this.clearFilterAndSort();
	 this.setDefaultSort();
 },
 
 onClosedFaultSearch: function(oEvent) {
	 this.searchAndSetClosedFaultData();
 },
 
 searchAndSetClosedFaultData: function() {
	// get or refresh closed fault model
	 var sCarid = "";
	 var iLen = this.getView().carInput.getTokens().length; 
	 for (var k =0; k < iLen; k++){ 
		 if(k==0){
			 sCarid = this.getView().carInput.getTokens()[k].getKey();
	   	}else{
	   		sCarid = sCarid + "|" + this.getView().carInput.getTokens()[k].getKey();}
	 	}
	 var sNotifNum = this.getView().data("notifNum");		 
	 var dClosedFaultDateFrom = this.getView().dialogNotification.getModel("ClosedFaultSearchModel").oData.FromDate;
	 var dClosedFaultDateTo = this.getView().dialogNotification.getModel("ClosedFaultSearchModel").oData.ToDate;
	 getClosedFaultModel(this, dClosedFaultDateFrom, dClosedFaultDateTo, sCarid, sNotifNum, this.getClosedFaultModelCallback);	 
},
	 
 validateClosedFaultSearchDate: function(oDatePickerControl, oEvent) {
	 if(oEvent.getParameters().value !== "" && oEvent.getParameters().valid) {
		oDatePickerControl.setValueState(sap.ui.core.ValueState.Success);
			
		// Find the search button & enable it
		this.enableDisableSearchButton();
		
		return true;
	 } else {
		oDatePickerControl.setValueState(sap.ui.core.ValueState.Error);
		
		// Find the search button & disable it
		this.enableDisableSearchButton();
		
		return false;
	 }	 
 },
 
 enableDisableSearchButton: function() {
	 var oDateFromPicker = this.dialogNotification.getSubHeader().getContentMiddle().find(x => x.sId==="ClosedFaultDateFrom");
	 var oDateToPicker = this.dialogNotification.getSubHeader().getContentMiddle().find(x => x.sId==="ClosedFaultDateTo");
	 var oSearchButton = this.dialogNotification.getSubHeader().getContentMiddle().find(x => x.sId==="ClosedFaultSearchButton");
	 
	 if(oDateFromPicker.getValueState() === sap.ui.core.ValueState.Error || oDateToPicker.getValueState() === sap.ui.core.ValueState.Error) {
		 oSearchButton.setEnabled(false);
	 } else {
		 oSearchButton.setEnabled(true);
	 }
 },
 
 onFilter: function(oEvent) {
	 var oClosedFaultFilterDialog = this._getClosedFaultFilterDialog();
	 oClosedFaultFilterDialog.openBy(oEvent.getSource());
 },
 
 onLiveSearch: function(oEvent) {
     var sValue = oEvent.getSource().getValue();
     var sInputId = oEvent.getSource().getId();
     
     var oFilter;
     
     switch (sInputId) {
     	case "Zzktxtcd":
			if (sValue && sValue.length > 0) {
				// either symptom code or description field matches the input will do
				var oFilter1 = new sap.ui.model.Filter({path: "Zzktxtcd", operator: sap.ui.model.FilterOperator.Contains, value1: sValue});
				var oFilter2 = new sap.ui.model.Filter({path: "Zzktxtgr", operator: sap.ui.model.FilterOperator.Contains, value1: sValue});
		        
				oFilter = new sap.ui.model.Filter({filters:[oFilter1, oFilter2]});
		    }
			break;

     	case "Zzposition":
			if (sValue && sValue.length > 0) {
				// either position code or description field matches the input will do
				var oFilter1 = new sap.ui.model.Filter({path: "Zzposition", operator: sap.ui.model.FilterOperator.Contains, value1: sValue});
				var oFilter2 = new sap.ui.model.Filter({path: "ZzpositionDesc", operator: sap.ui.model.FilterOperator.Contains, value1: sValue});
		        
				oFilter = new sap.ui.model.Filter({filters:[oFilter1, oFilter2]});
		    }
			break;
			
     	case "Zzpriok":
			if (sValue && sValue.length > 0) {
				// either priority code or description field matches the input will do
				var oFilter1 = new sap.ui.model.Filter({path: "Zzpriok", operator: sap.ui.model.FilterOperator.Contains, value1: sValue});
				var oFilter2 = new sap.ui.model.Filter({path: "ZzpriorityDesc", operator: sap.ui.model.FilterOperator.Contains, value1: sValue});
		        
				oFilter = new sap.ui.model.Filter({filters:[oFilter1, oFilter2]});
		    }
			break;
			
     	default:
			var oFilter = new sap.ui.model.Filter({path: sInputId, operator: sap.ui.model.FilterOperator.Contains, value1: sValue});
			break;
	}
     
     // Now get the Table binding.
     var oNotifTable = this.getView().notifTable;
     var oBinding = oNotifTable.getBinding("items");
     oBinding.filter(oFilter);
//     var filterCount = this.getCount(); 
//     this.setFilterText(filterCount); 
 },
 
 onSort: function(oEvent) {
	 this._getSortDialog().open();
 },
 
 _getClosedFaultFilterDialog: function() {
	 if (!this._oFilterPopover) {
         this._oFilterPopover = sap.ui.xmlfragment("fault_mgmt.fragment.FaultSearchFilter", this);
         
         var oFilterModel = getFilterModel();
         this._oFilterPopover.setModel(oFilterModel, "FilterModel");
         
         this.getView().addDependent(this._oFilterPopover);
     }
     return this._oFilterPopover;	 
 },
 
 _getSortDialog: function() {
     // create a fragment with dialog, and pass the selected data
     if (!this.sortDialog) {
         // This fragment can be instantiated from a controller as follows:
         this.sortDialog = sap.ui.xmlfragment("fault_mgmt.fragment.FaultSearchSort", this);
//         var oSortModel = this._buildSortModel(); 
         var oSortModel = getSortModel(); 
         this.sortDialog.setModel(oSortModel, "sortModel");
         this.getView().addDependent(this.sortDialog);
     }
     return this.sortDialog;
 },
 
 handleSort: function(oEvent) {
     var oTable = this.getView().notifTable;
     var oBinding = oTable.getBinding("items");
     var mParams = oEvent.getParameters();

     // apply sorter to binding (grouping comes before sorting)
     var aSorters = [];
     var sPath = mParams.sortItem.getKey();
     
     aSorters.push(new sap.ui.model.Sorter(sPath, mParams.sortDescending));
     oBinding.sort(aSorters);
 },
 //** Eric - End add - CR015
 
 getCountForFaults : function(evt)
 {
  if(this.check){ 
   // Insert for version 1.4 
   if(this.getView().carInput.getTokens().length == 1){
    var car = this.getView().carInput.getTokens()[0].getKey();
    if(car!="")
    {
     this.getView().checkFaults.setVisible(true);
     this.getView().attachmentButtonFooter.setVisible(true);
    }
    else if(car=="")
    {
     this.getView().checkFaults.setVisible(false);
     this.getView().attachmentButtonFooter.setVisible(false);
    }
    var notifNum = this.getView().data("notifNum");
    var oModel = getOpenNotifCount(car,notifNum,this.getView());
   }
   else{
    this.getView().checkFaults.setVisible(false);
   }
  }
  else{
   var len = "";
   if(this.getView().data("fromCarCont") == "X"){
    len = this.getView().data("carNumbersLen");
   }
   else{
    len = this.getView().carInput.getTokens().length;
   }
   var carid = "";
   if(this.getView().carInput.getTokens().length == len){
    for (var k =0; k < len; k++){
     if(k==0){
      carid = this.getView().carInput.getTokens()[k].getKey();
     }
     else{
      carid = carid + "|" + this.getView().carInput.getTokens()[k].getKey();}
    }
//    Changes for defect 10398 by PATTEDT
    if(carid != ""){
     var oModel = getOpenNotifCount(carid,notifNum,this.getView());
     this.getView().checkFaults.setVisible(true);}
    else{
     this.getView().checkFaults.setVisible(false);
    }
//    End of changes
   }

  }

 },
 selectAsset : function(evt){
  var appView = this.getView().getViewData();
  var app = appView.app;
  this.closeDialog();
 },
 closeDialog : function(evt)
 {
  var dialogNotification = this.getView().dialogNotification;
  this.dialogNotification.close();

 },
 enableCheck: function(evt)
 {
  if(this.getView().oLinked.getSelected())
  {
   eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
   this.getView().trainTechDispatch.setEnabled(true);
  }
  else
  {
   this.getView().trainTechDispatch.setEnabled(false);
   this.getView().trainTechDispatch.setValue("");
  }
 },
 onItemPress: function(evt)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var oItem = evt.getParameter("listItem").getBindingContext().getObject();
//  Changes as per Version 1.2
  if(oItem.ZzprimedupFlag == "L"){
   this.getView().reviewExist.setVisible(false)
  }
  else{
   this.getView().reviewExist.setVisible(true)
   var notifSelectedToMark = oItem.Zzqmnum;
   this.getView().data("notifSelectedToMark",notifSelectedToMark);
  }
//  End of changes

 },
 openUpdate : function(evt)
 {
  var controller = this;
  if ((this.getView().data("notifSelectedToMark"))==""||(this.getView().data("notifSelectedToMark"))==null)
  {
   jQuery.sap.require("sap.m.MessageBox");
//   sap.m.MessageBox.show("Please select a Fault to Review / Update",sap.m.MessageBox.Icon.INFORMATION , "Fault Information", sap.m.MessageBox.Action.OK, function() { }).addStyleClass("faultMsgBox");
   sap.m.MessageBox.show("Please select a Fault to Review / Update",{
    icon  : sap.m.MessageBox.Icon.INFORMATION , 
    title  :  "Fault Information", 
    actions  : sap.m.MessageBox.Action.OK, 
    onClose  : function() {/*True case;*/ },
    styleClass : "faultMsgBox"
   });

  }
  else
  {
   this.getView().weather_input.data().value = "";
   this.getView().temp_input.data().value = "";
   this.getView().reportPhase.data().value = "";
   this.getView().auditType.data().value = "";
   this.getView().faultSource.data("value","");
   this.getView().priority_input.data().value = "";
   var notifNum = this.getView().data("notifSelectedToMark");

//   Changes as per Version 1.2
   this.getView().trainTechDispatch.setValue("");
   this.getView().searchButton.setVisible(false);
//   this.getView().obj_inp.destroyTokens();
   this.getView().data("objPartCode","");
   this.getView().data("objPartGroup","");
   this.getView().damage_inp.destroyTokens();
   this.getView().data("damageCode","");
   this.getView().data("damageGroup","");
   this.getView().cause_inp.destroyTokens();
   this.getView().data("causeCode","");
   this.getView().data("causeGroup","");
   this.getView().techDetBox.setVisible(false);
   this.getView().Techdetail.setIcon( "sap-icon://collapse-group") ;
   this.getView().actTable.getModel().oData.listitems = [];
   this.getView().actTable.destroyItems();
//   this.getView().actTable.getModel().getProperty("/").actitems = []
//   this.setActivity();
   this.getView().actBox.setVisible(false);
   this.getView().data("activityData",[]);
//   End of changes

   getFaultDetails(notifNum,controller.faultDetails,controller);
   this.fromPopUp = true;
   this.closeDialog(evt);
  }
 },
 faultDetails: function(data)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var notifNum = this.getView().data("notifSelectedToMark");
  var listitems = data.d;
  var oModel = this.getView().getModel();
  oModel.setData(listitems);
  this.getView().setModel(oModel);
  if (!app.getPage("symptom")) {
   var page = sap.ui.view({
    id : "symptom",
    viewName : "fault_mgmt.symptom",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   this.page = page;

  } else {
   this.page = app.getPage("symptom");
  }
  this.isFromChange = true; // Set to true -- to determine to load the asset tree for the first time. 
  var flag  = false; //made it always false in case of update 
  this.getView().data("multiFlag",flag);
  this.check = true;
  this.checkFlag(flag);

  this.getView().trainTechVBox.getParent().setVisible(true);
  listitems = oModel.getData();
  this.getValidateValues("faultSource");
  this.getValidateValues("faultPriority");
  this.getValidateValues("symptom");
  this.getView().priority_input.data("value",listitems.Zzpriority);
  this.SAPFaultPriority = listitems.Zzpriority; //Insert for Defect 42147
  this.getView().data("symptomGroup",listitems.ZzsymptomGp);
  this.getView().data("symptomCode",listitems.ZzsymptomCode);
  this.getView().data("positionCode",listitems.Zzposition);
  this.getView().temp_input.data("value",listitems.Zztemperature);
  this.getView().weather_input.data("value",listitems.Zzweather);
  this.getView().reportPhase.data("value",listitems.ZzrepPhase);
  this.getView().faultSource.data("value",listitems.ZzfaultSource);

  if(this.getView().auditType.getValue() != "")
  {
   this.getView().auditType.data("value", listitems.ZzauditType);
  }
  else
  {
   this.getView().auditType.data("value","");  
  }
  this.getView().data("location",listitems.ZzfaultLoc);
  this.fromPopUp = false;
  if((this.getView().faultSource.data("value") != "") && (this.getView().faultSource.data("value") != null))
  {
   this.getView().row4.setVisible(true);
  }
  if((this.getView().selected.getText() != "") && (this.getView().selected.getText() != null))
  {
   this.getView().oLinked.setSelected(true);
  }
  if((listitems.ZzworkOrder != "") && (listitems.ZzworkOrder != null))
  {
   this.getView().oLinked.setSelected(true);
   this.getView().oLinked.setEnabled(false);
   this.getView().trainTechDispatch.setEnabled(true);
   this.getView().trainTechVBox.getParent().setVisible(true);
   this.getView().trainTechDispatch.setValue(listitems.ZzfirstName+" "+listitems.ZzlastName);
   this.getView().data("technician",listitems.ZzpersonNo);
   this.getView().data("workOrderNo",listitems.ZzworkOrder);
  }
  else
  {
   this.getView().trainTechVBox.getParent().setVisible(true);
   this.getView().oLinked.setSelected(false);
   this.getView().oLinked.setEnabled(true);
   this.getView().trainTechDispatch.setEnabled(false);
   this.getView().data("technician","");
   this.getView().data("workOrderNo","");
  }
  var selectedValues = listitems.ZzfaultResponse;
  var selectedKeys = selectedValues.substring(5);
  var descFieldFromSearch = listitems.ZznotifTextlng;
  this.getView().data("descFieldFromSearch",descFieldFromSearch);
  //this.getView().data("description",descFieldFromSearch);
  var array = selectedKeys.split(" ");
  var faultRepByKey = listitems.Zzfaultreptby;
  this.getView().faultResponse.setSelectedKeys(array);
  this.getView().faultRepBy.setValue(faultRepByKey);
  this.getView().getContent()[0].setTitle("Update Fault "+notifNum);
  this.getView().data("notifNum",notifNum);

  //check if set is maintained in Constant and Parameter table. If matches make objet part mandatory
  this.determineObjPartMandatory(listitems.ZzsetNum);



  var cToken = new sap.m.Token({ key: listitems.ZzcarNum, text:listitems.ZzcarNum});
  //var sToken = new sap.m.Token({ key: listitems.ZzsymptomCode, text:listitems.ZzsymptomCodeDesc});
  var sToken = new sap.m.Token({ key: listitems.ZzsymptomCode, text:listitems.ZzsymptomGpDesc + " - " + listitems.ZzsymptomCodeDesc}); //Defect #6565  -- narasimb
  var aToken = new sap.m.Token({ key: listitems.Zzasset, text:listitems.ZzassetDesc});
  //clear long text value
  //BOC For Defect 15814
  /*var longTxtPage = app.getPage("detailedDescription");
  if(longTxtPage)
  {
   longTxtPage.textBox.setValue("");
  }*/
  //EOC for Defect 15814
  //BOI For Defect 15814
  if (!app.getPage("detailedDescription"))
  {
   //navigation to the detailed description view
   var page = sap.ui.view({
    id : "detailedDescription",
    viewName : "fault_mgmt.detailedDescription",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData: appView

   });
   app.addPage(page);
   this.page = page;
  }
  else {
   this.page = app.getPage("detailedDescription");
  }
  longTxtPage = app.getPage("detailedDescription");
  longTxtPage.textBox.setValue("");

  longTxtPage.find_inp.setValue("");
  longTxtPage.action_inp.setValue("");

  var selector1 = "#" + longTxtPage.find_inp.getId() + "-inner";
  var selector2 = "#" + longTxtPage.action_inp.getId() + "-inner";

  $(selector1).css("border-color","#bfbfbf");
  $(selector2).css("border-color","#bfbfbf");

  //EOI For Defect 15814
  this.getView().carInput.destroyTokens();
  this.getView().asset.destroyTokens();
  this.getView().obj_inp.destroyTokens();
  this.getView().symptom.destroyTokens();
  if(listitems.Zzasset)
  {
   this.getView().asset.addToken(aToken);
  }
  if(listitems.ZzsymptomCode)
  {
   this.getView().symptom.addToken(sToken);
  }
  this.getView().carInput.addToken(cToken);

  this.getView().priority_input.setValue(listitems.Zzpriority +" - "+listitems.ZzpriorityDesc); // HPQC # 16191 NARASIMB 19102016

//  Changes for version 1.2
  if(listitems.NAV_FAULT_DISPLAY_ITEMS.results.length != 0){
   var techPath = listitems.NAV_FAULT_DISPLAY_ITEMS.results[0];

//   Object part
   if(techPath.DlCodegrp != ""){
    var objToken = new sap.m.Token({key:techPath.DlCode, text:techPath.Txt_Grpcd + "-" + techPath.Txt_Objptcd });
    this.getView().obj_inp.destroyTokens();
    this.getView().obj_inp.addToken(objToken);
    this.getView().data("objPartGroup",techPath.DlCodegrp);
    this.getView().data("objPartCode",techPath.DlCode);
   }
   else{
    this.getView().obj_inp.destroyTokens();
    this.getView().data("objPartGroup",techPath.DlCodegrp);
    this.getView().data("objPartCode",techPath.DlCode); 
   }

//   Damage
   if(techPath.DCodegrp != ""){
    var dToken = new sap.m.Token({key:techPath.DCode, text:techPath.Stxt_Grpcd  + "-" + techPath.Txt_Probcd });
    this.getView().damage_inp.destroyTokens();
    this.getView().damage_inp.addToken(dToken);
    this.getView().data("damageGroup",techPath.DCodegrp);
    this.getView().data("damageCode",techPath.DCode);        
   }
   else{
    this.getView().damage_inp.destroyTokens();
    this.getView().data("damageGroup",techPath.DCodegrp);
    this.getView().data("damageCode",techPath.DCode);  
   }
   if(techPath.Dtext != ""){
    this.getView().damage_desc.setValue(techPath.DText);  
   }
   else{
    this.getView().damage_desc.setValue("");  
   }


//   Cause 
   if(techPath.CauseCodegrp != ""){
    var cauToken = new sap.m.Token({key:techPath.CauseCode, text:techPath.Txt_Causegrp  + "-" + techPath.Txt_Causecd });
    this.getView().cause_inp.destroyTokens();
    this.getView().cause_inp.addToken(cauToken);
    this.getView().data("causeGroup",techPath.CauseCodegrp);
    this.getView().data("causeCode",techPath.CauseCode);     
   }
   else{
    this.getView().cause_inp.destroyTokens();
    this.getView().data("causeGroup",techPath.CauseCodegrp);
    this.getView().data("causeCode",techPath.CauseCode);
    this.getView().cause_desc.setValue("");
   }     
   if(techPath.Causetext!= ""){
    this.getView().cause_desc.setValue(techPath.Causetext);      
   }
   else{
    this.getView().cause_desc.setValue("");
   }

   var actTableData = listitems.NAV_FAULT_DISPLAY_ITEMS.results;

   var itemModel= new sap.ui.model.json.JSONModel(); 
   itemModel.setData({actitems:listitems.NAV_FAULT_DISPLAY_ITEMS.results});
   var actTable = this.getView().actTable;
   actTable.setModel(itemModel);
   this.getView().data("activityData",[]);

   for (var i = 0; i<actTableData.length; i++){
    var newObj = {actCode:actTableData[i].ActCode, actgroup:actTableData[i].ActCodegrp};
    newObj.enabled = true;  //Insert for Defect 14670 KADAMA20161002+
    this.getView().data("activityData")[i] = newObj;
   }

  }

//  If no item data is present, create a empty row for activity
  else{
   var itemModel= new sap.ui.model.json.JSONModel(); 
   var odata = [{Txt_Actcd:"", Txt_Actgrp : "", Acttext:""}];
   itemModel.setData({actitems:odata});
   var actTable = this.getView().actTable;
   actTable.setModel(itemModel);
   this.getView().data("activityData",[]);
   //var oNewObject = {Txt_Actcd:"", Txt_Actgrp:"",ActText:""}; //Commented for defect 14670 KADAMA20161002-
   var oNewObject = {Txt_Actcd:"", Txt_Actgrp:"",ActText:"", enabled:true};  //Insert for Defect 14670 KADAMA20161002+
   this.getView().data("activityData").push(oNewObject);

//   Clear cause
   this.getView().cause_inp.destroyTokens();
   this.getView().data("causeGroup","");
   this.getView().data("causeCode","");
   this.getView().cause_desc.setValue("");

//   Clear items
   this.getView().damage_inp.destroyTokens();
   this.getView().data("damageGroup","");
   this.getView().data("damageCode",""); 
   this.getView().obj_inp.destroyTokens();
   this.getView().data("objPartGroup","");
   this.getView().data("objPartCode",""); 

  }
  this.setActivity(); //KADAMA20161020 39204+


//  End of changes


  getDocListForUpdate(notifNum,this.loadDocList,this);
  validateSetM_updateView(listitems.ZzsetNum, this.getView(), listitems.Zzpriority); //15814 // Insert for Defect 14670 KADAMA20160927
    
 },
 loadDocList: function(data)
 {
  var appView = this.getView().getViewData();
  var app = appView.app;
  var oModel = new sap.ui.model.json.JSONModel();
  var listitems = data.d.results[0].NAV_GET_ATT_LIST.results;
  oModel.setData(listitems);
  var count = listitems.length;
  this.getView().attachmentButtonFooter.setText("Fault Attachments ("+count+")");
//  this.setActivity();


 },
 enableAsset : function()
 {
  this.getView().asset.setEnabled(true);

 },
 checkFlag : function(multiFlag)
 {
  if((this.getView().carInput.getTokens().length)== 1)
  {
   if(!multiFlag && this.check){
    this.getView().checkFaults.setVisible(true);
    this.getView().asset.setEnabled(true);
    this.getView().attachmentButtonFooter.setVisible(true);
    var car = this.getView().carInput.getTokens()[0].getKey();
    var symptom = this.getView().data("symptomCode");
    var notifNum = this.getView().data("notifNum");
    var oModel = getOpenNotifCount(car,notifNum,this.getView());
    /*var data  = oModel.getData();
   var length = data.listitems.length;
   if(data == ""|| length<1)
    {
    this.getView().checkFaults.setText("Check Open Faults (0)");

    }
   else
    {
    this.getView().checkFaults.setText("Check Open Faults ("+length+")");
    }*/
   }
   else{
    this.getView().checkFaults.setVisible(true);
    this.getView().asset.setEnabled(false);
    this.getView().attachmentButtonFooter.setVisible(true);


   }
  }
  else if((this.getView().carInput.getTokens().length == 0)||multiFlag)

  {if ((multiFlag)&&(this.getView().carInput.getTokens().length == 1))
  {
   this.getView().checkFaults.setVisible(true);
   this.getView().attachmentButtonFooter.setVisible(true);
  }
  else
  {
   this.getView().checkFaults.setVisible(false);
   this.getView().attachmentButtonFooter.setVisible(false);
  }

  }
 },
 markAsDuplicate : function(evt)
 {
  if(this.getView().data("notifSelectedToMark")==""||this.getView().data("notifSelectedToMark")==null)
  {
   jQuery.sap.require("sap.m.MessageBox");
//   sap.m.MessageBox.show("No Fault selected, please select a fault",sap.m.MessageBox.Icon.INFORMATION , "Information", sap.m.MessageBox.Action.OK, function() {}).addStyleClass("faultMsgBox");
   sap.m.MessageBox.show("No Fault selected, please select a fault",{
    icon  : sap.m.MessageBox.Icon.INFORMATION , 
    title  :  "Information", 
    actions  : sap.m.MessageBox.Action.OK, 
    onClose  : function() {/*True case;*/ },
    styleClass : "faultMsgBox"
   });
  }
  else
  {
   var data = {}; //data object
   data.d = {};
   data.d.IvDup = "X";
   data.d.IvNotifNo = this.getView().data("notifSelectedToMark");
   markAsDuplicate(data);
   this.closeDialog(evt);
  }

 },
 openDialog : function(evt,source)
 {  var dialogNotification = this.getView().dialogNotification;
 if(!this.dialogNotification){

  this.dialogNotification = dialogNotification;
 }
 
 //** Eric - Begin add - CR015
 	this.getView().addDependent(this.dialogNotification);
 //** Eric - End add - CR015
 
 this.dialogNotification.open();
 },

 onApprovePost: function(){
  var controller = this;
  var flag1;
  var flag2;
  var flag3;
  var check1 = this.getView().cutOut.getSelected(); //value for cut out checkbox
  if(check1 == true) //value of flag1 set to X if field is checked
  {
   flag1 = "X";
  }
  else
   flag1 = "";
  var check2 = this.getView().fixedTraffic.getSelected();//value for fixed traffic checkbox
  if(check2 == true) //value of flag2 set to X if field is checked
  {
   flag2 = "X";
  }
  else
   flag2 = "";
  var check3 = this.getView().nonBlock.getSelected();//value for non Block checkbox
  if(check3 == true)//value of flag3 set to X if field is checked
  {
   flag3 = "X";
  }
  else
   flag3 = "";

  var farr =  this.getView().faultResponse.getSelectedKeys();
  var len  = farr.length;
  var arrdata = [];
  for(var i= 0, j=0;i<len;i++){
   if(farr[i] != ""){
    arrdata.push({"Txt04": farr[i], "Stsma":"TNOTI0F2"});
   }
  }                                                                                                              
  var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
  var date = new Date(this.getView().dateTime.getDateValue());// get date from the date/time input field
  var z = new Date(date.getTime() - TZOffsetMs);
  var datemilli =z.getTime(); //date conversion to milliseconds
  var hour = date.getHours(); // get hours from the date value
  var minutes = date.getMinutes(); //get minutes from the date value
  var seconds = date.getSeconds(); //get seconds from the date value
  if(seconds<10)
  {
   seconds = "0"+seconds;
  }
  var assetValue ;
  if(this.getView().asset.getTokens().length == 1)
  {
   var asset = this.getView().asset.getTokens()[0].getKey();
   var assetCode = asset.split(" ");
   assetValue = assetCode[0].trim();
  }
  else
  {
   assetValue = "";
  }
  var data = {}; //data object
  data.d = {};
  data.d.EvAufnrNew = "";
  data.d.EvAufnrNew = "";
  data.d.ZzsetNum = this.getView().setNum.getValue(); //setting set number field
  data.d.ZznotifType = "F2"; //defaulting the value of notification type to F2 for Fault/Failure 
  data.d.ZzshortText = this.getView().textBoxArea.getValue(); //setting the short text 
  data.d.Zzasset = assetValue; //setting asset value
  data.d.Zzpriority = this.getView().priority_input.data().value; //setting priority code
  data.d.Zzdesstdate = "\\/Date("+datemilli+")\\/"; //setting date in JSON format
  data.d.Zzdessttime = "PT"+hour+"H"+minutes+"M"+seconds+"S"; //setting time in JSON format
  data.d.Zzdesenddate = "\\/Date("+datemilli+")\\/"; //setting date in JSON format
  data.d.Zzdesendtm = "PT00H00M00S"; //setting time in JSON format
  if(this.getView().symptom.getTokens().length>0){
   if((this.getView().data("symptomGroup")!=null)&&(this.getView().data("symptomGroup")!=""))
   {
    data.d.ZzsymptomGp = this.getView().data("symptomGroup"); //setting symptom group code
   }
   else
   {
    data.d.ZzsymptomGp = ""; //setting symptom group code
   }
   if((this.getView().data("symptomCode") != null) &&(this.getView().data("symptomCode")!= ""))
   {
    data.d.ZzsymptomCode =  this.getView().data("symptomCode"); //setting symptom code for the selected group
   }
   else
   {
    data.d.ZzsymptomCode =  ""; //setting symptom code for the selected group
   }
  }
  else{
   data.d.ZzsymptomCode =  "";
   data.d.ZzsymptomGp = "";
  }
  if((this.getView().data("positionCode") !=null) && (this.getView().data("positionCode")!=""))
  {
   data.d.Zzposition = this.getView().data("positionCode");//setting position value
  }
  else
  {
   data.d.Zzposition = " ";//setting position value
  }

  data.d.Zzfaultreptat = this.getView().faultRepAt.getValue(); //setting fault reported at input field value
  data.d.Zzfaultreptby = this.getView().faultRepBy.getValue(); //setting fault reported by input field value
  data.d.Zztemperature = this.getView().temp_input.data().value; //setting temperature code
  data.d.Zzweather = this.getView().weather_input.data().value; //setting weather code
  //data.d.ZzengFlag = this.getView().engFlag_input.data().value; //setting code for engineering flag
  data.d.ZzauditNum = this.getView().auditNum.getValue(); //setting audit number
  data.d.ZzrepPhase = this.getView().reportPhase.data().value; //setting report phase code
//BEGIN INSERT CR015 SIMS20180815 (SY)
  if ((!data.d.ZzrepPhase) && (this.getView().reportPhase.getValue())) {
	  var sRptPhaseDesc = this.getView().reportPhase.getValue();
	  var aRptPhase = this.getView().getModel("rptPhaseModel").oData.list;
	  var rptPhaseIndex = aRptPhase.map(function(obj){
		  return obj.Zzrphase;
	  }).indexOf(sRptPhaseDesc);
	  
	  if ( rptPhaseIndex > -1 ) {
		  data.d.ZzrepPhase = aRptPhase[rptPhaseIndex].Zzrphase;
	  }	  
  }  
//END INSERT CR015 SIMS20180815 (SY)  
  if((this.getView().data("location")!=null) && (this.getView().data("location")!= ""))
  {
   data.d.ZzfaultLoc = this.getView().data("location"); //setting location code
  }
  else
  {
   data.d.ZzfaultLoc = " "; //setting location code
  }
//BEGIN INSERT CR015 SIMS20180815 (SY)  
  if ((!data.d.ZzfaultLoc) && (this.getView().location.getValue())) {
	  var sLocationDesc = this.getView().location.getValue();
	  var aLocation = this.getView().getModel("locationModel").oData.list;
	  var locationIndex = aLocation.map(function(obj){
		  return obj.Zzfloca;
	  }).indexOf(sLocationDesc);
	  
	  if ( locationIndex > -1 ) {
		  data.d.ZzfaultLoc = aLocation[locationIndex].Zzfloca;
	  }	  
  }  
//END INSERT CR015 SIMS20180815 (SY)   
  data.d.ZzfaultSource = this.getView().faultSource.data().value; //setting fault source code
  if(this.getView().auditType.getValue()=="")
  {
   data.d.ZzauditType = "";
  }
  else
  {
   data.d.ZzauditType = this.getView().auditType.data().value; //setting audit type code
  }
  data.d.ZztripNum = this.getView().tripNum.getValue(); //setting trip number value
  if(!this.check)
  {
   data.d.IvNotifNo = "";
   data.d.IvAufnr = "";
   data.d.IvPerson = "";
  }
  else
  {
   if((this.getView().data("workOrderNo") == null) || (this.getView().data("workOrderNo")== ""))
   {
    data.d.IvAufnr = "";
   }
   else
   {
    data.d.IvAufnr = this.getView().data("workOrderNo");
   }
   data.d.IvNotifNo = this.getView().data("notifNum");
   if((this.getView().data("technician")== null) || (this.getView().data("technician")== ""))
   {
    data.d.IvPerson = "00000000";
   }
   else
   {
    data.d.IvPerson = this.getView().data("technician");
   }
  }
  if(this.getView().data("description") == null)
  {
   data.d.ZznotifTextlng = "";
  }
  else
  {
   data.d.ZznotifTextlng = this.getView().data("description"); //setting the value for longtext for description
  }
  data.d.NAV_FAULT_CRT_UPD = [];
  data.d.NAV_FAULT_ITEMS = [];
  data.d.NAV_FAULT_CRT_UPD_CAR = []
  data.d.NAV_FAULT_CRT_UPD_FR = arrdata;
  var flag = this.getView().data("multiFlag");

//  Changes as per Version 1.2
  if(this.getView().data("plantCode") != null){
   data.d.IvPlant = this.getView().data("plantCode");
   data.d.IvWorkcenter = this.getView().data("workcenCode");}

  var techdata = {};
//  Object part
  if (this.getView().obj_inp.getTokens().length > 0 ){
   if(this.getView().data("objPartGroup")!= null){
    techdata.DlCodegrp = this.getView().data("objPartGroup");};
    if(this.getView().data("objPartCode")!= null){
     techdata.DlCode = this.getView().data("objPartCode");};
  };
//  Damage
  if(this.getView().damage_inp.getTokens().length > 0){
   if(this.getView().data("damageGroup")!= null){
    techdata.DCodegrp = this.getView().data("damageGroup");};
    if(this.getView().data("damageCode")!= null){
     techdata.DCode = this.getView().data("damageCode");};
  }
  if (this.getView().damage_desc.getValue() != ""){
   techdata.DText = this.getView().damage_desc.getValue();}

//  Cause
  if(this.getView().cause_inp.getTokens().length > 0){
   if(this.getView().data("causeGroup")!= null){
    techdata.CauseCodegrp = this.getView().data("causeGroup");};
    if(this.getView().data("causeCode")!= null){
     techdata.CauseCode = this.getView().data("causeCode");};
  }
  if(this.getView().cause_desc.getValue() != ""){
   techdata.Causetext = this.getView().cause_desc.getValue();}
  var dataAdded = "";
  var act_flag = "";
//  Activity 

  if(this.getView().data("activityData")!= undefined && this.getView().data("activityData")!= null && this.getView().data("activityData").length != 0)
  {
   var activityTableData = this.getView().data("activityData");
   var validateByActData = false;
   for(var aData = 0; aData < activityTableData.length; aData++){
    if($.trim(activityTableData[aData].actCode).length > 0)
    {
     validateByActData = true;
     break;
    }
    if($.trim(activityTableData[aData].actgroup).length > 0)
    {
     validateByActData = true;
     break;
    }
   }

   //BOI For Defect 41527 KADAMA04JAN2017
   var selector1 = "#" + this.getView().obj_inp.getId() + "-inner";
   $(selector1).css("border-color","#bfbfbf");

   if(activityTableData.length > 0 && (this.getView().data("objPartGroup") == null || this.getView().data("objPartGroup") == "")){
    var items = this.getView().actTable.getModel().getProperty("/").actitems;
    for(var j=0;j<items.length;j++){
     if(items[j].Acttext !== "" || items[j].Txt_Actcd !== "" || items[j].Txt_Actgrp !== ""){
      act_flag = "X";
      $(selector1).css("border-color","red");
      jQuery.sap.require("sap.m.MessageBox");
      sap.m.MessageBox.show("Please Enter Object Part",{
       icon: sap.m.MessageBox.Icon.ERROR , 
       title: "Validation Error", 
       actions: sap.m.MessageBox.Action.OK, 
       onClose: function() {/*True case;*/ },
       styleClass: "faultMsgBox"
      });
      validateByActData = false;
      break;
     }
    };

   }

   //EOI For Defect 41527 KADAMA04JAN2017

   if(validateByActData){
    if((this.getView().data("damageGroup")== null && this.getView().data("objPartGroup") == null &&
      this.getView().damage_desc.getValue() == "")||(this.getView().data("damageGroup")== "" && this.getView().data("objPartGroup") == ""
       && this.getView().damage_desc.getValue() == "")){

     act_flag = "X";
     jQuery.sap.require("sap.m.MessageBox");
     sap.m.MessageBox.show("Activity cannot be processed if item details are blank",{
      icon: sap.m.MessageBox.Icon.ERROR , 
      title: "Validation Error", 
      actions: sap.m.MessageBox.Action.OK, 
      onClose: function() {/*True case;*/ },
      styleClass: "faultMsgBox"
     });
    }
    else{
     var activity = this.getView().data("activityData");
     var localModel = this.getView().actTable.getModel().getProperty("/").actitems;
     var code = "";
     var grp = "";
     for (var i = 0, j = 0; i<localModel.length; i++){
      if(activity[i].actgroup!= undefined && activity[i].actCode!= undefined || localModel[i].Acttext != "" ){
       if(activity[i].actgroup!= undefined){
        grp = activity[i].actgroup;
        code = activity[i].actCode;
       }
       else{
        grp = "";
        code = "";
       }
       if(j == 0){
        techdata.ActCodegrp = grp;
        techdata.ActCode = code;
        techdata.Acttext = localModel[i].Acttext;
        data.d.NAV_FAULT_ITEMS.push(techdata);
        j = j+1;
        dataAdded = "X";
       }
       else{

        data.d.NAV_FAULT_ITEMS.push({"ActCodegrp":grp, "ActCode":code, "Acttext":localModel[i].Acttext});
        dataAdded = "X";
        j= j+1;
       }
      }

     }
    }
   }
  }
  if (dataAdded != "X" && act_flag != "X" ){
   //Begin of Insert KADAMA20161013 For Activity description text Defect
   var localModel = this.getView().actTable.getModel().getProperty("/").actitems;
   if(localModel !== undefined){
    if(localModel.length > 0){
     for (var i = 0; i<localModel.length; i++){
      var code = "";
      var grp = "";
      if(localModel[i].Acttext !== ""){
       techdata.ActCodegrp = grp;
       techdata.ActCode = code;
       techdata.Acttext = localModel[i].Acttext;
       data.d.NAV_FAULT_ITEMS.push(techdata);
       dataAdded = "X";
      }

     }
    }
   }

   if(dataAdded != "X"){
    data.d.NAV_FAULT_ITEMS.push(techdata);
   }
   //End of Insert KADAMA20161013 For Activity description text Defect

   //data.d.NAV_FAULT_ITEMS.push(techdata); //Commented KADAMA20161013 For Activity description text Defect
  }

//  End of changes
  //BOI for 15814
  if(data.d.IvNotifNo !== ""){
   //Get Detail Description Page
   var appView = this.getView().getViewData();
   var app = appView.app;

   if (!app.getPage("detailedDescription"))
   {
    //navigation to the detailed description view
    var page = sap.ui.view({
     id : "detailedDescription",
     viewName : "fault_mgmt.detailedDescription",
     type : sap.ui.core.mvc.ViewType.JS,
     viewData: appView

    });
    app.addPage(page);
    this.page = page;
   }
   else {
    this.page = app.getPage("detailedDescription");
   }
   if(this.SAPFaultPriority !== "U" && act_flag !== "X"){
    var find_inp = this.page.find_inp.getValue();
    var action_inp = this.page.action_inp.getValue();
    var selector1 = "#" + this.page.find_inp.getId() + "-inner";
    var selector2 = "#" + this.page.action_inp.getId() + "-inner";
  //Start of change - 45058 - Monish - 09/10/2017 
    //if(find_inp === "" || action_inp === ""){
    if(find_inp.trim() == 0 || action_inp.trim() == 0){
  //End of change - 45058 - Monish - 09/10/2017     	
     act_flag = "X";

     var text2 = " - under Section For Detailed Description";
     var message = "";
   //Start of change - 45058 - Monish - 09/10/2017     
     //if(find_inp === "" && action_inp === ""){
     find_inp = find_inp.trim();
     action_inp = action_inp.trim();
     if(find_inp.trim() == 0 && action_inp.trim() == 0){
   //End of change - 45058 - Monish - 09/10/2017    	 
      message = "Enter Findings and Action Taken" + text2;
      $(selector1).css("border-color","red");
      $(selector2).css("border-color","red");
     }
   //Start of change - 45058 - Monish - 09/10/2017  
   //else if(find_inp === ""){     
     else if(find_inp.length === 0){
   //End of change - 45058 - Monish - 09/10/2017    	 
      message = "Enter Findings" + text2;
      $(selector1).css("border-color","red");
     }
   //Start of change - 45058 - Monish - 09/10/2017  
     //else if(action_inp === ""){
     else if(action_inp.length === 0){
   //End of change - 45058 - Monish - 09/10/2017   
      message = "Enter Action Taken" + text2;
      $(selector2).css("border-color","red");
     }

     sap.m.MessageBox.show(message,{
      icon  : sap.m.MessageBox.Icon.ERROR , 
      title  :  "Mandatory Fields Missing", 
      actions  : sap.m.MessageBox.Action.OK, 
      onClose  : function() {},//True case; },
      styleClass : "faultMsgBox"
     }); 
    }
    else{
     $(selector1).css("border-color","#bfbfbf");
     $(selector2).css("border-color","#bfbfbf");
     data.d.WorkFound  = find_inp;
     data.d.WorkAction = action_inp;
    }
   }

  }
  //EOI for 15814
  if(act_flag != "X"){
   this.handleCreatePost(data,flag); 
  }
  else{
   this.getView().saveUpdate.setEnabled(true);
  }
 },
 approve: function(evt){  
//Reverted back to original code so the other defect can be moved
//Defect 67753 changes not moved to other system	 
	 this.getView().saveUpdate.setEnabled(false);
  // Disable Save after approve. Enable after completion
	//SOC - Panangiv  67753 Save Disabling disabled 
 // this.getView().saveUpdate.setEnabled(false);
//EOC - Panangiv 67753
  var controller = this;
  var error = controller.validateMandatoryFields();
  //Begin of Insert by CHUNDS defect 20579 - Desktop UI "Create Fault" should not allow future date & time when creating faults
  if(this.getView().dateTime.getDateValue !== null && error === false){
   var d1 = new Date(this.getView().dateTime.getDateValue());
   var d2 = new Date();//Current Date
   if(d1 > d2){
    error = true;
    //Show error
    sap.m.MessageBox.show("Future Date/Time is not allowed for Fault creation",{
     icon  : sap.m.MessageBox.Icon.ERROR , 
     title  :  "Validation", 
     actions  : sap.m.MessageBox.Action.OK, 
     onClose  : function() {},//True case; },
     styleClass : "faultMsgBox"
    });
   }
  }
  //End of Insert by CHUNDS defect 20579 - Desktop UI "Create Fault" should not allow future date & time when creating faults
  if( !error ) {
   //Begin of Insert Defect 21608
   var oUsrModel = controller.getView().getModel("userParameters");
   if(oUsrModel){
    var oUsrData = oUsrModel.getData();
    if(oUsrData.Zziconuser === false){
     var oFilter;
     //var oPriorModel = this.priorityList.getModel();
     var oPriorModel = getPrioList('C');
     if(oPriorModel){
       oFilter = oPriorModel.oData.listitems.filter(function(item){
               return item.Zzpriok === controller.getView().priority_input.data().value;
           });
     }
     if(oFilter.length > 0){
    	 if(oFilter[0].Zzpriok === "U"){		//Defect 6792 PATSOM 22/05/2017
    		 sap.m.MessageBox.show("Priority U is still set. Please Update the Priority before saving.", {
                 icon: "ERROR",
                 title: "Validation",
                 onClose: function(oAction) {
                  if (oAction === "OK") {
                   controller.getView().saveUpdate.setEnabled(true);
                  }
                 }.bind(this)
                });
    	 }
    	 else if(oFilter[0].Zzpopup === "X"){
       /*sap.m.MessageBox.show("This is a High Priority Fault. Please contact RMC", {
        icon: "INFORMATION",
        title: "Validation",
        onClose: function(oAction) {
         if (oAction === "OK") {
          controller.onApprovePost();
         }
        }.bind(this)
       });*/
       controller.onApprovePost();
      }
        else{    	 
       controller.onApprovePost();
      }
     }
     else if(controller.getView().priority_input.data().value === "U")		//Defect 6792 PATSOM 22/05/2017
     {
         sap.m.MessageBox.show("Priority U is still set. Please Update the Priority before saving.", {
             icon: "ERROR",
             title: "Validation",
             onClose: function(oAction) {
              if (oAction === "OK") {
            	  controller.getView().saveUpdate.setEnabled(true);
              }
             }.bind(this)
            });
           }
    }else{
     //Call the backend without popup
     controller.onApprovePost();
    }
   }
   //End of Insert Defect 21608
  }else{
   //enable save button
   this.getView().saveUpdate.setEnabled(true);}
 },


 handleCreatePost:function (postData,flag){
  var oDataObj = [];
  var oData = {};
  var checkCarCount;
  var length = this.getView().carInput.getTokens().length;
  if(length>1)
  {
   checkCarCount = true;
  }
  else
  {
   checkCarCount = false;
  }
//  Changes as per Version 1.2
  /*for ( var i = 0 , j= 0; i < length; i++)
  {
    var carNum = this.getView().carInput.getTokens()[i].getKey();


    oDataObj[i] = copyObject(postData.d);
    oDataObj[i].ZzcarNum = carNum;
  }*/
  /*  if(!this.check && this.getView().data("carNumbers")!= undefined){
   for ( var i = 0; i < length; i++)
   {
    var carNum = this.getView().data("carNumbers")[i].Zzcarid;
//    Copy entire data for car1 and for rest of the cars send the car numbers in NAV_FAULT_CRT_UPD_CAR
    if (i == 0){
     oData = copyObject(postData.d);
     oData.ZzcarNum = carNum;
    }
    else{
     oData.NAV_FAULT_CRT_UPD_CAR.push({"Zzcarid":carNum});     
    }}  */
  if(!this.check && length > 1){
   for ( var i = 0; i < length; i++)
   {
    var carNum = this.getView().carInput.getTokens()[i].getKey();
    if (i == 0){
     oData = copyObject(postData.d);
     oData.ZzcarNum = carNum;
    }else{
     oData.NAV_FAULT_CRT_UPD_CAR.push({"Zzcarid":carNum});     
    }
   }
  }
  else{
   var carNum = this.getView().carInput.getTokens()[0].getKey();    
   oData = copyObject(postData.d);
   oData.ZzcarNum = carNum;

  }
  createNotification(oData,this,this.check,flag,checkCarCount);
 },

 handleSingleResponse : function(data,length)
 {

  var controller = this;
  var rModel = new sap.ui.model.json.JSONModel();
  var message = "";
  for (var i = 0; i<data.NAV_FAULT_CRT_UPD.results.length; i++){
   message = message + data.NAV_FAULT_CRT_UPD.results[i].Message + "\n" + "\n";
  }
  var type = data.NAV_FAULT_CRT_UPD.results[0].Type;
  rModel.setData({listitems : data.NAV_FAULT_CRT_UPD.results[0]});
  jQuery.sap.require("sap.m.MessageBox");
  this.getView().saveUpdate.setEnabled(true);
  var notifNum = data.NAV_FAULT_CRT_UPD.results[0].Parameter;
  if (type =="S") //for type success
  {
   this.updateLongTxt(notifNum);
   if(!this.check)
   {
    sap.m.MessageBox.show(message,{ icon: sap.m.MessageBox.Icon.SUCCESS , title: "Success", 
     actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
     onClose: function(oAction){
      if(oAction === sap.m.MessageBox.Action.YES){

       var WONum = data.EvAufnrNew;
       this.check = true;

       controller.editEnabled(notifNum,this.check,WONum);
       //BOI For Defect 15814
       controller.getView().data("notifSelectedToMark",notifNum);                     
       getFaultDetails(notifNum,controller.faultDetails,controller);
       //EOI For Defect 15814


      }
      else
      {
       controller.setToInitial();
       getLastFaultDetails(controller.setDefaults, controller);
      }},
      styleClass: "faultMsgBox"
    });
   }
   else
   {
    /*        sap.m.MessageBox.show(message,sap.m.MessageBox.Icon.SUCCESS , "Success", sap.m.MessageBox.Action.OK, function() {
         //var notifNum = data.NAV_FAULT_CRT_UPD.results[0].Parameter;
         var WONum = data.EvAufnrNew;
         this.check = true;

         controller.editEnabled(notifNum,this.check,WONum);


         }).addStyleClass("faultMsgBox");*/

    sap.m.MessageBox.show(message,{
     icon  : sap.m.MessageBox.Icon.SUCCESS, 
     title  :  "Success", 
     actions  : sap.m.MessageBox.Action.OK, 
     onClose  : function() {
      //var notifNum = data.NAV_FAULT_CRT_UPD.results[0].Parameter;
      var WONum = data.EvAufnrNew;
      this.check = true;
      controller.editEnabled(notifNum,this.check,WONum);

      //BOI For Defect 15814
      controller.getView().data("notifSelectedToMark",notifNum);                     
      getFaultDetails(notifNum,controller.faultDetails,controller);
      //EOI For Defect 15814
     },
     styleClass : "faultMsgBox"
    });        
   }
  }
  else
  {
//   sap.m.MessageBox.show(message,sap.m.MessageBox.Icon.ERROR , "Fault Information", sap.m.MessageBox.Action.OK, function() {/*True case;*/ }).addStyleClass("faultMsgBox");
   sap.m.MessageBox.show(message,{
    icon  : sap.m.MessageBox.Icon.ERROR , 
    title  :  "Fault Information", 
    actions  : sap.m.MessageBox.Action.OK, 
    onClose  : function() {/*True case;*/ },
    styleClass : "faultMsgBox"
   });
  }
  this.getView().data("multiFlag",false);


 },

 updateLongTxt: function(notifNum){
  // Append Long Text to exisitn long text
  var appView = this.getView().getViewData();
  var app = appView.app;
  var longTxtPage = app.getPage("detailedDescription");
  var longTxt, longTxtCntrl, existingLongTxt, existingLongTxtCntrl;
  if(longTxtPage)
  {
   longTxtCntrl = longTxtPage.textBox;
   //longTxt = longTxtCntrl.getValue();
   // Get the long text from the server
   longTxt = getFaultLongText(notifNum);
   longTxtCntrl.setValue("");
   existingLongTxtCntrl = longTxtPage.textBoxExtTxt;
   //existingLongTxt = existingLongTxtCntrl.getValue();
   if($.trim(longTxt).length > 0)
   {
    existingLongTxtCntrl.setValue("");
    /*if($.trim(existingLongTxt).length > 0)
      {
       existingLongTxt = existingLongTxt +"\n"+longTxt;
      }
      else
       existingLongTxt = existingLongTxt +"\n"+longTxt;*/
    existingLongTxt = longTxt;
    this.getView().data("descFieldFromSearch", existingLongTxt);
    existingLongTxtCntrl.setValue(existingLongTxt);
   }
   longTxtCntrl.setValue("");
  }
  this.getView().data("description","");
 },

 handleMultipleResponse : function(data,length)
 {


  var controller = this;
  var oData = {};
  this.finalarray = [];
//  Changes as per Vesrion 1.2
  //for (var i = 0; i<length; i++){ //Commented for Defect 14656 KADAMA20160920
  for (var i = 0; i<data.NAV_FAULT_CRT_UPD.results.length; i++){ //Insert for Defect 14656 KADAMA20160920
   var message = data.NAV_FAULT_CRT_UPD.results[i].Message;
   var type = data.NAV_FAULT_CRT_UPD.results[i].Type;
   var notifNum = data.NAV_FAULT_CRT_UPD.results[i].Parameter;
   var carPos = data.NAV_FAULT_CRT_UPD.results[i].MessageV4.split("|");
   var carDesc = data.NAV_FAULT_CRT_UPD.results[i].MessageV3;
   oData.symCode = data.NAV_FAULT_CRT_UPD.results[i].MessageV2;
   oData.symGp = data.NAV_FAULT_CRT_UPD.results[i].MessageV1;
   this.updateLongTxt(notifNum);
   var WONum = data.EvAufnrNew;
   this.fALength++; 
   this.finalarray.push({"message": message, "type" : type, "carNum": carPos[0], "NotifNo": notifNum, "setNum": data.ZzsetNum, "sym": oData, "WONum": WONum, "carPos": carPos[1], "carDesc": carDesc});
  } 
//  End changes

  var oModel = new sap.ui.model.json.JSONModel();
  this.getView().saveUpdate.setEnabled(true);        

  //if(this.fALength ===length) //Commented for Defect 14656 KADAMA20160920
  if(this.fALength == data.NAV_FAULT_CRT_UPD.results.length) //Insert for Defect 14656 KADAMA20160920
  {

   controller.check = true;
   oModel.setData({listitems: this.finalarray});
   this.openMultiCarResults(oModel,this,this.check);
   this.getView().carInput.destroyTokens();
   this.finalarray = [];
   this.fALength = 0;
   this.getView().data("multiFlag",false);

  }
 },
 handleSelectionChange: function(oEvent) {
  var isSelected = oEvent.getParameter("selected");

  var state = "Selected";
  if (!isSelected) {
   state = "Deselected"
  }

  sap.m.MessageToast.show("Event 'selectionChange': " + state + " '" + changedItem.getText() + "'", {
   width: "auto"
  });
 },

 handleSelectionFinish: function(oEvent) {
  var selectedItems = oEvent.getParameter("selectedItems");
  var messageText = "Event 'selectionFinished': [";

  for (var i = 0; i < selectedItems.length; i++) {
   messageText += "'" + selectedItems[i].getText() + "'";
   if (i != selectedItems.length-1) {
    messageText += ",";
   }
  }

  messageText += "]";

  sap.m.MessageToast.show(messageText, {
   width: "auto"
  });
 },

 /**
  * Called when a controller is instantiated and its View controls (if available) are already created.
  * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
  * @memberOf fault_mgmt.createNotification
  */
 onInit: function() {
  this.fromWorklist = false;
  this.fromTMP = false;
  this.change = false;
  this.fALength = 0;
  this.finalarray = [];
  var aData = {
    items:[
           {
            text1 : "Driver",
            text2: "Driver",

           }, {
            text1 : "Guard",
            text2 : "Guard",

           }, {
            text1 : "Signaller",
            text2 : "Signaller",

           }, {
            text1 : "Operations",
            text2 : "Operations",

           },
           {
            text1 : "Maintainer",
            text2 : "Maintainer",

           },
           {
            text1 : "Technician",
            text2 : "Technician",

           },
           {
            text1 : "Other",
            text2 : "Other",

           },
           {
            text1 : "WCM",
            text2 : "WCM",

           },
         //Begin of Insert for Defect 33514 KADAMA20161020+
           {
            text1 : "PCMS",
            text2 : "PCMS",

           },
           {
            text1 : "CIU",
            text2 : "CIU",

           }
           //End of Insert for Defect 33514 KADAMA20161020+
           ]
  };

  var bData = {
    listitems:[
               {
                key : "FFDC",
                text : "Fixed During Call",

               }, {
                key : "FCTO",
                text : "Cut Out",

               }, {
                key : "FFTR",
                text : "Fixed in Traffic",

               }, {
                key : "FNBF",
                text : "Non-Blocked Fault",

               }, 
               ]
  };
  this.getView().symptom.destroyTokens();
  this.getView().obj_inp.destroyTokens();
  this.getView().faultRepBy.data("mandatory",true);
  this.getView().priority_input.data("mandatory",true);
  this.getView().textBoxArea.data("mandatory",true);
  this.getView().faultSource.data("mandatory",true);
  this.getView().reportPhase.data("mandatory",true);
  this.getView().location.data("mandatory",true);
  this.getView().symptom.data("mandatory",true);
  this.getView().carInput.data("mandatory",true);
  this.getView().setNum.data("mandatory",true);
  var now = new Date();
  this.getView().dateTime.setDateValue(now);
  var vModel = new sap.ui.model.json.JSONModel();
  var data = vModel.getData();
  data.ZzTempDate = "";
  vModel.setData(data);
  this.assetData = "";
  this.notifyCode = "";
  this.initialLoad = true;
  this.check = false;
  this.fromPopUp = false;
  this.WONum = "";
  //this.getView().backButton.setVisible(true);
  this.getView().getContent()[0].setTitle("Create New Fault");
  this.getView().setModel(vModel);
  this.getView().attachmentButtonFooter.setText("Fault Attachments");
  this.getView().notificationType.getParent().setVisible(false);
  this.getView().row1.setVisible(false);
  this.getView().trainTechVBox.getParent().setVisible(false);
  if((this.getView().faultSource.data("value") ==="") || (this.getView().faultSource.data("value") ===null))
  {
   this.getView().row4.setVisible(false);
  }
  var oModel = getFaultResponse();
  this.aModel = new sap.ui.model.json.JSONModel(aData);  
  var bModel = new sap.ui.model.json.JSONModel(bData);
  this.getView().faultResponse.setModel(bModel);
  this.getView().faultRepBy.setModel(this.aModel);
  this.getView().saveUpdate.setText("Save");
  getConstantParamValues("ZZSETNUM", "EAM", "ENH-8230", "",this.getConstantParams, this);
  
  //** Eric - Begin add - CR015  
  // Populate the closed fault interval dates
  getClosedFaultInterval(this);
  
  // Set the i18n
//  var sRootPath = jQuery.sap.getResourcePath("fault_mgmt");
//  this.i18nModel = new sap.ui.model.resource.ResourceModel({
//        bundleUrl : sRootPath+"/i18n/i18n.properties"
//  });
  var i18nModel = geti18nModel();
  this.getView().setModel(i18nModel, "i18n");  
  //** Eric - End add - CR015
  
  getIconUsers(this);
  this.setInitModels();  //++ CR015 SIMS20180815 (SY)
 }, 
 navigateTo : function(destination){
  destination = this.getView().data("prevPage").sId;
  var appView = this.getView().getViewData();
  var app = appView.app;
  var prevPage = this.getView();
  switch (destination){
  case "prologuePage" : {
   if (!app.getPage("prologuePage")) {
    var prologuePage = sap.ui.view({id:"prologuePage", viewName:"fault_mgmt.prologuePage", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
    app.addDetailPage(prologuePage);
    this.prologuePage = prologuePage;
   }
   this.prologuePage.data("prevPage",prevPage);
   app.toDetail("prologuePage");
   break;
  }
  case "createNotification" : {
   if (!app.getPage("createNotification")) {
    var createNotification = sap.ui.view({id:"createNotification", viewName:"fault_mgmt.createNotification", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
    app.addDetailPage(createNotification);
    this.createNotification = createNotification;
   }
   var notifController = app.getPage("createNotification").oController;
   setInitialValidationRules(notifController);
   // Get the last updated/created fault's your location and fault source
   //if($.trim(destination.data("notifNum")).length <= 0)
   //{
   getLastFaultDetails(notifController.setDefaults, notifController);
   //}
   this.createNotification.data("prevPage",prevPage);
   app.toDetail("createNotification");
   break;
  }
  case "searchFault" : {
   if (!app.getPage("searchFault")) {
    var searchFault = sap.ui.view({id:"searchFault", viewName:"fault_mgmt.searchFault", type:sap.ui.core.mvc.ViewType.JS, viewData : appView});
    app.addDetailPage(searchFault);
    this.searchFault = searchFault;
   }
   this.searchFault.data("prevPage",prevPage);
   app.toDetail("searchFault");
   break;
  }
  }
 },
 handleNavBack : function(){
  var appView = this.getView().getViewData();
  var app = appView.app;
  this.getView().Techdetail.setIcon( "sap-icon://collapse-group") ;
  this.getView().techDetBox.setVisible(false);
  this.getView().actBox.setVisible(false);
  var controller = this;
  var inspType = controller.inspType;
  var shiftName = controller.shiftName;
  var setNo = controller.setNo;
  var carNo = controller.carNo;
  var taskId = controller.taskId;
  var jobDetailselKey = controller.jobDetailselKey;
  this.setActivity();
  //app.to(this.getView().data("prevPage"));
  if(eqpFMSFormChngdFlg){
   sap.m.MessageBox.show("Leaving the screen will cause unsaved changes to be lost. Are you sure?",{
    icon: "WARNING", 
    title: "Validation", 
    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO], 
    onClose: function(oAction){
     if(oAction === sap.m.MessageBox.Action.YES){
      if(controller.fromWorklist){
       if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
        var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
        oCrossAppNavigator.toExternal({
         target: { semanticObject : "TIME_MGMT", action: "display" },   //the app you're navigating to 
         params : { "from": "FMS"}
        });
        eqpFMSFormChngdFlg = false;
       }else{
        jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
       }
      }else if(controller.fromTMP){
       /*if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
        var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
        oCrossAppNavigator.toExternal({
         target: { semanticObject : "JOB_CARD", action: "display" },   //the app you're navigating to 
         params : { "from": "FMS", "car":carNo, "set":setNo, "inspType":inspType, "shiftName": shiftName, "taskId" : taskId, "selectedKey": jobDetailselKey}
        }); 
        eqpFMSFormChngdFlg = false;
       }else{
        jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
       }*/
    	// Commented above line as part of defect 24048 NARASIMB 07042016
    	  eqpFMSFormChngdFlg = false;
   	   	  window.close();
      }else if((controller.getView().data("prevPage").sId)== "searchResults"){
       app.to("searchResults");
       eqpFMSFormChngdFlg = false;
      }else if((controller.getView().data("prevPage").sId)== "prologuePage"){
       controller.setToInitial();
       app.to("prologuePage");
       eqpFMSFormChngdFlg = false;
      }else if(controller.getView().data("notifNum") && controller.getView().data("notifNum") != ""){ // Fix by KONCHADS for defect # 11832
       controller.setToInitial();
       eqpFMSFormChngdFlg = false;
      }else{
       controller.setToInitial(); // Fix by KONCHADS for defect # 11915
       app.to(controller.getView().data("prevPage"));
       eqpFMSFormChngdFlg = false;
      }
     }else if(oAction === sap.m.MessageBox.Action.NO){
      //Do nothing
     }
    },styleClass: "faultMsgBox"
   });
  }else{
   if(controller.fromWorklist){
    if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
     var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
     oCrossAppNavigator.toExternal({
      target: { semanticObject : "TIME_MGMT", action: "display" },   //the app you're navigating to 
      params : { "from": "FMS"}
     });
     eqpFMSFormChngdFlg = false;
    }else{
     jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
    }
   }else if(controller.fromTMP){
   /* if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
     var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
     oCrossAppNavigator.toExternal({
      target: { semanticObject : "JOB_CARD", action: "display" },   //the app you're navigating to 
      params : { "from": "FMS", "car":carNo, "set":setNo, "inspType":inspType, "shiftName": shiftName, "taskId" : taskId, "selectedKey": jobDetailselKey}
     }); 
     eqpFMSFormChngdFlg = false;
    }else{
     jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
    }*/
	   eqpFMSFormChngdFlg = false;
	   window.close();
   }else if((controller.getView().data("prevPage").sId)== "searchResults"){
    app.to("searchResults");
    eqpFMSFormChngdFlg = false;
   }else if((controller.getView().data("prevPage").sId)== "prologuePage"){
    controller.setToInitial();
    app.to("prologuePage");
    eqpFMSFormChngdFlg = false;
   }else if(controller.getView().data("notifNum") && controller.getView().data("notifNum") != ""){ // Fix by KONCHADS for defect # 11832
    controller.setToInitial();
    eqpFMSFormChngdFlg = false;
   }else{
    controller.setToInitial(); // Fix by KONCHADS for defect # 11915
    app.to(controller.getView().data("prevPage"));
    eqpFMSFormChngdFlg = false;
   }
  }

  /*  if(this.fromWorklist)
  {
   //window.location.reload();
   if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService)
   {
    var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
    oCrossAppNavigator.toExternal({
     target: { semanticObject : "TIME_MGMT", action: "display" },   //the app you're navigating to 
     params : { "from": "FMS"}
    }); 
   }
   else
   {
    jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
   }
  }
  else if(this.fromTMP)
  {
   //window.location.reload();
   if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService)
   {
    var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
    oCrossAppNavigator.toExternal({
     target: { semanticObject : "JOB_CARD", action: "display" },   //the app you're navigating to 
     params : { "from": "FMS", "car":carNo, "set":setNo, "inspType":inspType, "shiftName": shiftName, "taskId" : taskId, "selectedKey": jobDetailselKey}
    }); 
   }
   else
   {
    jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
   }
  }        
  else if((this.getView().data("prevPage").sId)== "searchResults")
  {
   app.to("searchResults");
  }
  else if((this.getView().data("prevPage").sId)== "prologuePage")
  {
   this.setToInitial();
   app.to("prologuePage");
  }
  else if((this.getView().data("notifNum")) != "")
  {
   this.setToInitial();
  }
  else
  { this.setToInitial(); // Fix by KONCHADS for defect # 11915
  app.to(this.getView().data("prevPage"));
  } */


 },
 setToInitial : function()
 {
  //this.fromWorklist = false;
  //this.fromTMP = false;

  this.change = false;
  this.fALength = 0;
  this.finalarray = [];
  var aData = {
    items:[
           {
            text1 : "Driver",
            text2: "Driver",

           }, {
            text1 : "Guard",
            text2 : "Guard",

           }, {
            text1 : "Signaller",
            text2 : "Signaller",

           }, {
            text1 : "Operations",
            text2 : "Operations",

           },
           {
            text1 : "Maintainer",
            text2 : "Maintainer",

           },
           {
            text1 : "Technician",
            text2 : "Technician",

           },
           {
            text1 : "Other",
            text2 : "Other",

           },
           {
            text1 : "WCM",
            text2 : "WCM",

           },
           //Begin of Insert for Defect 33514 KADAMA20161020+
           {
            text1 : "PCMS",
            text2 : "PCMS",

           },
           {
            text1 : "CIU",
            text2 : "CIU",

           }
           //End of Insert for Defect 33514 KADAMA20161020+
           ]
  };

  var bData = {
    listitems:[
               {
                key : "FFDC",
                text : "Fixed During Call",

               }, {
                key : "FCTO",
                text : "Cut Out",

               }, {
                key : "FFTR",
                text : "Fixed in Traffic",

               }, {
                key : "FNBF",
                text : "Non-Blocked Fault",

               }, 
               ]
  };
  this.getView().symptom.destroyTokens();
  this.getView().obj_inp.destroyTokens();
  this.getView().carInput.destroyTokens();
  this.getView().asset.destroyTokens();
  this.getView().checkFaults.setVisible(false);
  this.getView().tripNum.setValue("");
  this.getView().setNum.setValue("");
  this.getView().faultRepBy.setValue("");
  this.getView().faultRepAt.setValue("");
  this.getView().positionPopOver.setValue("");
  this.getView().reportPhase.setValue("");
  this.getView().textBoxArea.setValue("");
  this.getView().data("descFieldFromSearch","");
  this.getView().faultSource.setValue("");
  this.getView().location.setValue("");
  this.getView().priority_input.setValue("");
  this.getView().temp_input.setValue("");
  this.getView().weather_input.setValue("");
  var blankArray = [];
  this.getView().faultResponse.setSelectedKeys(blankArray);                                               
  this.getValidateValues("faultSource");
  this.getValidateValues("faultPriority");
  this.getValidateValues("symptom");
  this.getView().priority_input.data("value","");
  this.getView().data("symptomGroup","");
  this.getView().data("symptomCode","");
  this.getView().data("positionCode","");
  this.getView().temp_input.data("value","");
  this.getView().weather_input.data("value","");
  this.getView().reportPhase.data("value","");
  this.getView().faultSource.data("value","");
  this.getView().auditType.data("value","");  
  this.getView().data("location","");
  this.getView().selected.setText() == "";   
  this.getView().oLinked.setSelected(false);
  this.getView().data("notifNum","");
  this.getView().faultRepBy.data("mandatory",true);
  this.getView().priority_input.data("mandatory",true);
  this.getView().textBoxArea.data("mandatory",true);
  this.getView().faultSource.data("mandatory",true);
  this.getView().reportPhase.data("mandatory",true);
  this.getView().location.data("mandatory",true);
  this.getView().symptom.data("mandatory",true);
  this.getView().carInput.data("mandatory",true);
  this.getView().setNum.data("mandatory",true);

  var now = new Date();
  this.getView().dateTime.setDateValue(now);
  var vModel = new sap.ui.model.json.JSONModel();
  var data = vModel.getData();
  data.ZzTempDate = "";
  vModel.setData(data);
  this.assetData = "";
  this.notifyCode = "";
  this.initialLoad = true;
  this.check = false;
  this.fromPopUp = false;
  this.WONum = "";
  //this.getView().backButton.setVisible(true);
  this.getView().getContent()[0].setTitle("Create New Fault");
  enableFieldsInUpdateView(true, this.getView()); //Insert for Defect 14670 KADAMA20161002
  this.getView().setModel(vModel);
  this.getView().attachmentButtonFooter.setText("Fault Attachments");
  this.getView().attachmentButtonFooter.setVisible(false); // Added for defect 10398 by PATTEDT
  this.getView().notificationType.getParent().setVisible(false);
  this.getView().row1.setVisible(false);
  this.getView().trainTechVBox.getParent().setVisible(false);
  if((this.getView().faultSource.data("value") ==="") || (this.getView().faultSource.data("value") ===null))
  {
   this.getView().row4.setVisible(false);
  }
  var oModel = getFaultResponse();
  this.aModel = new sap.ui.model.json.JSONModel(aData);  
  var bModel = new sap.ui.model.json.JSONModel(bData);
  this.getView().faultResponse.setModel(bModel);
  this.getView().faultRepBy.setModel(this.aModel);
  this.getView().saveUpdate.setText("Save"); 

  this.getValidateValues("faultSource");
  this.getValidateValues("faultPriority");
  this.getValidateValues("symptom");
  this.getView().priority_input.data("value","");
  this.getView().data("symptomGroup","");
  this.getView().data("symptomCode","");
  this.getView().data("positionCode","");
  this.getView().temp_input.data("value","");
  this.getView().weather_input.data("value","");
  this.getView().reportPhase.data("value","");
  this.getView().faultSource.data("value","");
  this.getView().auditType.data("value","");  
  this.getView().data("location","");
  this.getView().selected.setText() == "";   
  this.getView().oLinked.setSelected(false);
  this.getView().data("notifNum","");
//  Changes as per Version 1.2
//  Clear technical data
  this.getView().damage_inp.destroyTokens();
  this.getView().cause_inp.destroyTokens();
  this.getView().damage_desc.setValue("");
  this.getView().cause_desc.setValue("");
  this.getView().data("objPartCode","");
  this.getView().data("objPartGroup","");
  this.getView().data("damageCode","");
  this.getView().data("damageGroup","");
  this.getView().data("causeCode","");
  this.getView().data("causeGroup","");
  this.getView().data("activityData",[]);
  this.getView().actTable.getModel().getProperty("/").actitems = [];
  //BOI for Defect 41527 KADAMA 06JAN2017
  var itemModel= new sap.ui.model.json.JSONModel(); 
  var odata = [{Txt_Actcd:"", Txt_Actgrp : "", Acttext:""}];
  itemModel.setData({actitems:odata});
  this.getView().actTable.setModel(itemModel);
  this.getView().actTable.getModel().refresh(); 
  //EOI for Defect 41527 KADAMA 06JAN2017
//  End of changes
 },

 /**
  * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
  * (NOT before the first rendering! onInit() is used for that one!).
  * @memberOf fault_mgmt.createNotification
  */
// onBeforeRendering: function() {

// },

 /**
  * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
  * This hook is the same one that SAPUI5 controls get after being rendered.
  * @memberOf fault_mgmt.createNotification
  */
 onAfterRendering: function() {
  var controller = this;
  if(this.initialLoad){
  }

 },

 editEnabled: function (notifNum,check,WONum){
  eqpFMSFormChngdFlg = false;  // fix by KONCHADS on 23/06/2016 for defect # 11832 
  this.getView().row1.setVisible(true);
  this.getView().searchButton.setVisible(false);
  this.getView().notificationNum.setText(notifNum);
  this.getView().data("notifNum",notifNum);
  if((this.getView().data("workOrderNo") == "") || (this.getView().data("workOrderNo") == null))
  {
   this.getView().data("workOrderNo",WONum);
  }

  if((this.getView().data("workOrderNo") != "") && (this.getView().data("workOrderNo") != null))
  {
   this.getView().oLinked.setEnabled(false);
   this.getView().trainTechDispatch.setEnabled(true);
  }
  else
  {
   this.getView().oLinked.setEnabled(true);
   this.getView().trainTechDispatch.setEnabled(false);
  }
  this.WONum = WONum;
  this.getView().attachIcon.setVisible(true);
  this.getView().saveUpdate.setText("Save");
  this.check = check;
  this.getView().getContent()[0].setTitle("Update Fault "+notifNum);
  getDocListForUpdate(notifNum,this.loadDocList,this);
  this.getView().trainTechVBox.getParent().setVisible(true);
  /*var desc = this.getView().data("description");
  var appView = this.getView().getViewData();
  var app = appView.app;
  var pageDetails = app.getPage("detailedDescription");
  pageDetails.data("descValue",desc);*/


  validateSetM_updateView(this.getView().setNum.getValue(), this.getView(), this.getView().priority_input.getValue().charAt(0)); //Insert for Defect 14670 KADAMA20160927

 },

 resetSymptomUpdate:function(evt){
  if(this.getView().symptom){
   if(this.check){
    this.getView().symptom.destroyTokens();

   }
  }

 },



 addAttachmentsInitial : function(evt){

  var appView = this.getView().getViewData();
  var app = appView.app;
  var prevPage = this.getView();
  controller = this;

  if((this.getView().data("notifNum")) == ""|| (this.getView().data("notifNum"))==null){

   if(!this.dialog1){
    var dialog1 = new sap.m.Dialog({
     title : "Save Fault!",
     type : "Message",
     content : [
                new sap.m.Text({
                 text : "The Fault needs to be saved in order to attach a document."
                })
                ],
                beginButton : new sap.m.Button({
                 text : "Ok",
                 press : function(evt){
                  controller.dialog1.close();
                 }
                })
    });
    this.dialog1 = dialog1;
   }
   this.dialog1.open();
  }
  else
  {
   this.addAttachments(evt);
  }
 },
// Start of fix by KONCHADS on 24/06/2016 for Defect # 11832
 cancel : function(evt){
  var view = this.getView();
  var controller = this;
  var appView = this.getView().getViewData();
  var app = appView.app;
  // Defect 11883 NARASIMB 08062016
  var inspType = controller.inspType;
  var shiftName = controller.shiftName;
  var setNo = controller.setNo;
  var carNo = controller.carNo;
  var taskId = controller.taskId;
  var jobDetailselKey = controller.jobDetailselKey;
  jQuery.sap.require("sap.m.MessageBox");
  if(eqpFMSFormChngdFlg){
   sap.m.MessageBox.show("Leaving the screen will cause unsaved changes to be lost. Are you sure?",{
    icon: "WARNING", 
    title: "Validation", 
    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO], 
    onClose: function(oAction){
     if(oAction === sap.m.MessageBox.Action.YES){
      if(controller.fromWorklist){
       if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
        var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
        oCrossAppNavigator.toExternal({
         target: { semanticObject : "TIME_MGMT", action: "display" },   //the app you're navigating to 
         params : { "from": "FMS"}
        }); 
        eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
       }else{
        jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
       }
      }else if(controller.fromTMP){
       /*if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
        var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
        oCrossAppNavigator.toExternal({
         target: { semanticObject : "JOB_CARD", action: "display" },   //the app you're navigating to 
         params : { "from": "FMS", "car":carNo, "set":setNo, "inspType":inspType, "shiftName": shiftName, "taskId" : taskId, "selectedKey": jobDetailselKey}
        }); 
        eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
       }else{
        jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
       }*/
    	  // Commented above line as part of defect 24048 NARASIMB 07042016
    	  eqpFMSFormChngdFlg = false;
   	   	  window.close();
      } if(!controller.check){
       if(view.data("prevPage").sId == "prologuePage"){
        controller.setToInitial();
        eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
        app.to("prologuePage");
       }else{
        controller.setToInitial();
        eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
        app.to(view.data("prevPage").sId);
       }
      }else{
       var searchPage = app.getPage("searchResults");
       if(searchPage){
        eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
        app.to("searchResults");
       }else{
        if(view.data("prevPage").sId == "prologuePage"){
         controller.setToInitial();
         eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
         app.to("prologuePage");
        } else{
         controller.setToInitial();
         eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
         app.to(view.data("prevPage").sId);
        }
       }
      } 
     }else{
      // Do nothing Stay here
     }
    },
    styleClass: "faultMsgBox"
   }); 
  }else{
   if(controller.fromWorklist){
    if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
     var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
     oCrossAppNavigator.toExternal({
      target: { semanticObject : "TIME_MGMT", action: "display" },   //the app you're navigating to 
      params : { "from": "FMS"}
     }); 
     eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
    }else{
     jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
    }
   }else if(controller.fromTMP){
    /*if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService){
     var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
     oCrossAppNavigator.toExternal({
      target: { semanticObject : "JOB_CARD", action: "display" },   //the app you're navigating to 
      params : { "from": "FMS", "car":carNo, "set":setNo, "inspType":inspType, "shiftName": shiftName, "taskId" : taskId, "selectedKey": jobDetailselKey}
     }); 
     eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
    }else{
     jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
    }*/
	// Commented above line as part of defect 24048 NARASIMB 07042016
 	  	eqpFMSFormChngdFlg = false;
	   	window.close();
   } else if(!controller.check){
    if(view.data("prevPage").sId == "prologuePage"){
     controller.setToInitial();
     eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
     app.to("prologuePage");
    }else{
     controller.setToInitial();
     eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
     app.to(view.data("prevPage").sId);
    }
   }else{
    var searchPage = app.getPage("searchResults");
    if(searchPage){
     eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
     app.to("searchResults");
    }else{
     if(view.data("prevPage").sId == "prologuePage"){
      controller.setToInitial();
      eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
      app.to("prologuePage");
     }else{
      controller.setToInitial();
      eqpFMSFormChngdFlg = false; //Defect #29409  NARASIMB 06072016
      app.to(view.data("prevPage").sId);
     }
    }
   }
  }
 },  

/* cancel : function(evt)
 {
  var view = this.getView();
  var controller = this;
  var appView = this.getView().getViewData();
  var app = appView.app;
  // Defect 11883 NARASIMB 08062016
  var inspType = controller.inspType;
  var shiftName = controller.shiftName;
  var setNo = controller.setNo;
  var carNo = controller.carNo;
  var taskId = controller.taskId;
  var jobDetailselKey = controller.jobDetailselKey;
  jQuery.sap.require("sap.m.MessageBox");
  if(this.fromWorklist)
  {
   sap.m.MessageBox.show("Are you sure you want to exit without saving?",{ 
    icon: sap.m.MessageBox.Icon.WARNING , title: "Warning", 
    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
    onClose: function(oAction){
     if(oAction === sap.m.MessageBox.Action.YES){
      if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService)
      {
       var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
       oCrossAppNavigator.toExternal({
        target: { semanticObject : "TIME_MGMT", action: "display" },   //the app you're navigating to 
        params : { "from": "FMS"}
       }); 
      }
      else
      {
       jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
      }
     }
    },
    styleClass: "faultMsgBox"
   });
  }
  else if(this.fromTMP)
  {
   sap.m.MessageBox.show("Are you sure you want to exit without saving?",{ 
    icon: sap.m.MessageBox.Icon.WARNING , title: "Warning", 
    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
    onClose: function(oAction){
     if(oAction === sap.m.MessageBox.Action.YES){
      if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService)
      {
       var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
       oCrossAppNavigator.toExternal({
        target: { semanticObject : "JOB_CARD", action: "display" },   //the app you're navigating to 
        params : { "from": "FMS", "car":carNo, "set":setNo, "inspType":inspType, "shiftName": shiftName, "taskId" : taskId, "selectedKey": jobDetailselKey}
       }); 
      }
      else
      {
       jQuery.sap.log.info("Cannot Navigate - Application Running Standalone");
      }                  
     }
    },
    styleClass: "faultMsgBox"
   });

  }        

  // End Defect 11883 NARASIMB 08062016
  else if(!this.check)
  {
   sap.m.MessageBox.show("Are you sure you want to exit without saving?",{ 
    icon: sap.m.MessageBox.Icon.WARNING , title: "Warning", 
    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
    onClose: function(oAction){
     if(oAction === sap.m.MessageBox.Action.YES){
      if((view.data("prevPage").sId)== "prologuePage")
      {
       controller.setToInitial();
       app.to("prologuePage");
      }
      else
      {
       window.location.reload();
      }
     }
     else
     {

     }
    },
    styleClass: "faultMsgBox"
   });  
  }
  else
  {
   var searchPage = app.getPage("searchResults");
   if(searchPage)
   {
    sap.m.MessageBox.show("Are you sure you want to exit without saving?",{ 
     icon: sap.m.MessageBox.Icon.WARNING , title: "Warning", 
     actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
     onClose: function(oAction){
      if(oAction === sap.m.MessageBox.Action.YES){                   
       app.to("searchResults");
      }
      else
      {
      }
     },
     styleClass : "faultMsgBox"
    });
    //app.to("searchResults");
   }
   else
   {
    sap.m.MessageBox.show("Are you sure you want to exit without saving?",{ icon: sap.m.MessageBox.Icon.WARNING , title: "Warning", 
     actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
     onClose: function(oAction){
      if(oAction === sap.m.MessageBox.Action.YES){
       if(view.data("prevPage"))
       {
        if((view.data("prevPage").sId)== "prologuePage")
        {
         controller.setToInitial();
         app.to("prologuePage");
        }
        else
         window.location.reload();
       }
       else{
        window.location.reload();
       }
       if((view.data("prevPage").sId)== "prologuePage")
                 {
                  controller.setToInitial();
                     app.to("prologuePage");
                 }
                 else
                 {
                  window.location.reload();
                 }
      }
      else
      {

      }
     },
     styleClass : "faultMsgBox"
    });  
   }
  }
 }, */
// End of fix by KONCHADS on 24/06/2016 for Defect # 11832
 getTripData:  function(data)
 {
  this.getView().tripNum.setValue("");
  var type = data.d.Type;
  if(type === "E")
  {
   jQuery.sap.require("sap.m.MessageBox");
//   sap.m.MessageBox.show(data.d.Message,sap.m.MessageBox.Icon.INFORMATION , "Trip-Set Information", sap.m.MessageBox.Action.OK, function() { });
   sap.m.MessageBox.show(data.d.Message,{
    icon  : sap.m.MessageBox.Icon.INFORMATION , 
    title  :  "Trip-Set Information", 
    actions  : sap.m.MessageBox.Action.OK, 
    onClose  : function() {/*True case;*/ },
    styleClass : "faultMsgBox"
   });
  }
  var trip = data.d.IvTripid;
  this.getView().tripNum.setValue(trip);
 },
 dateChange : function(evt)
 {
  var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
  var date = new Date(this.getView().dateTime.getDateValue());
  var z = new Date(date.getTime() - TZOffsetMs);
  var x = z.toISOString();
  var y = x.split("T");
  var dateNow = y[0]+"T00:00:00";
  var hour = date.getHours(); // get hours from the date value
  var minutes = date.getMinutes(); //get minutes from the date value
  var seconds = date.getSeconds(); //get seconds from the date value
  if(seconds<10)
  {
   seconds = "0"+seconds;
  }
  var time = "PT"+hour+"H"+minutes+"M"+seconds+"S";
  var controller = this.getView().oController;
  var set = this.getView().setNum.getValue();
  var trip = "";
  eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
  getTripDetails(trip,set,dateNow,time,controller.getTripData,controller);
 },
 changeOfTrip : function(evt)
 {
  var TZOffsetMs = new Date(0).getTimezoneOffset() * 60 * 1000;
  var date = new Date(this.getView().dateTime.getDateValue());
  var z = new Date(date.getTime() - TZOffsetMs);
  var x = z.toISOString();
  var y = x.split("T");
  var dateNow = y[0]+"T00:00:00";
  var hour = date.getHours(); // get hours from the date value
  var minutes = date.getMinutes(); //get minutes from the date value
  var seconds = date.getSeconds(); //get seconds from the date value
  if(seconds<10)
  {
   seconds = "0"+seconds;
  }
  var time = "PT"+hour+"H"+minutes+"M"+seconds+"S";
  var controller = this.getView().oController;
  var trip = this.getView().tripNum.getValue();
  /*
Start of fix by KONCHADS on 160616 for Defect # 11915
   var set = "";

  //getTripDetails(trip,set,dateNow,time,controller.getSetData,controller); //AK20MAY2016-
  getTripSetDetails(trip,set,dateNow,time,controller.getTripSetData,controller); //AK20MAY2016+ 
End of fix by KONCHADS on 160616 for Defect # 11915
   */
  var set = this.getView().setNum.getValue();
  if(set === ""){
   eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
   getTripSetDetails(trip,set,dateNow,time,controller.getTripSetData,controller);
  }
 },
// BEGIN OF INSERT AK20MAY2016+
 closeTripSet: function(evt){
  evt.getSource().destroy();
 },
 selectTripSet: function(evt, view){
  var row = evt.mParameters.selectedContexts[0].sPath;

  var start = row.lastIndexOf('/') + 1;
  var rowIndex = row.substring(start, row.length);
  var set = evt.getSource().getModel().getData().d.results[rowIndex].IvSetid;

  view.setNum.setValue("");
  view.setNum.setValue(set);
  view.symptom.destroyTokens();
  view.obj_inp.destroyTokens();
  //BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
  if((view.data("notifNum"))!==""&&(view.data("notifNum"))!==null){
   view.positionPopOver.setValue(""); 
  }
  //EOI For fault UI Fix KADAMA20161223 #HPQC 42144

  //BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
  view.oController.clearActivityCode();
  //EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
  view.asset.destroyTokens();
  view.carInput.destroyTokens();
  view.checkFaults.setVisible(false);
 },
 searchTripSet: function(evt){
  var aFilters = [],
  sSearchValue = evt.getParameter("value"),
  itemsBinding = evt.getParameter("itemsBinding");
  aFilters.push(new sap.ui.model.Filter("IvSetid", sap.ui.model.FilterOperator.Contains , sSearchValue));
  itemsBinding.filter(aFilters, "Application");
 },
 getTripSetData: function(data){
  //BEGIN OF COMMENT AK23MAY2016-
  /*var view = this.getView();
  if((data.d.Type === "E") || (data.d.Type === "I" && data.d.Message.toUpperCase() != "SUCCESS")) 
  {
    jQuery.sap.require("sap.m.MessageBox");
      sap.m.MessageBox.show(data.d.Message,sap.m.MessageBox.Icon.INFORMATION , "Trip-Set Information", sap.m.MessageBox.Action.OK, function() {
       //Clear trip number
       view.tripNum.setValue("");
      }); 
     sap.m.MessageBox.show(data.d.Message,{
      icon  : sap.m.MessageBox.Icon.INFORMATION , 
      title  :  "Trip-Set Information", 
      actions  : sap.m.MessageBox.Action.OK, 
      onClose  : function() { view.tripNum.setValue("");},
      styleClass : "faultMsgBox"
     });
  }
  else

   /*view.setNum.setValue("");
   var set = data.d.IvSetid;
   view.setNum.setValue(set);
   view.symptom.destroyTokens();
   view.asset.destroyTokens();
   view.carInput.destroyTokens();
   view.checkFaults.setVisible(false);*/
  //END OF CHANGES AK23MAY016-
  if((data.d.results).length > 1){
   var oController = this;
   //getTripSetDetails(trip,set,dateNow,time,controller.getTripSetData,controller); AK20MAY2016-
   var oDialog = new sap.m.TableSelectDialog({
    title:"Sets on Trip",
    contentWidth: "500px",
    contentHeight: "300px",
    multiSelect:false, 
    columns: [
              new sap.m.Column({
               width  : "40%",
               header : new sap.m.Label({
                text   : "Set Number",
                design : sap.m.LabelDesign.Bold,
               })
              }),
              new sap.m.Column({
               width  : "60%",
               header : new sap.m.Label({
                text   : " Description",
                design : sap.m.LabelDesign.Bold
               })
              })
              ],
              confirm: function(evt){
               oController.selectTripSet(evt, oController.getView())
              }, 
              cancel: oController.closeTripSet,
              search: oController.searchTripSet});

   var oModel = new sap.ui.model.json.JSONModel();
   oModel.setData(data);
   oDialog.setModel(oModel);
   oDialog.bindAggregation("items", {
    path: "/d/results",
    template: new sap.m.ColumnListItem({ type:"Active",
     cells: [
             new sap.m.Label({ text: "{IvSetid}" }), //First Name
             new sap.m.Label({ text: "{Zzdesc}" }), //Last Name
             ]})
   });

   oDialog.open();
  }
  else{
   var view = this.getView();
   view.setNum.setValue("");
   var set = "";
   if(data.d.results.length > 0){
    set = data.d.results[0].IvSetid;
   }

   view.setNum.setValue(set);
   view.symptom.destroyTokens();
   view.obj_inp.destroyTokens();
   view.asset.destroyTokens();
   //BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
   if((view.data("notifNum"))!==""&&(view.data("notifNum"))!==null){
    view.positionPopOver.setValue(""); 
   }
   //EOI For fault UI Fix KADAMA20161223 #HPQC 42144

   //BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
   this.clearActivityCode();
   //EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
   view.carInput.destroyTokens();
   view.checkFaults.setVisible(false);
  }


  //}
 },
// END OF INSERT AK20MAY2016+
 getSetData : function(data)
 {
  var view = this.getView();
  if((data.d.Type === "E") || (data.d.Type === "I" && data.d.Message.toUpperCase() != "SUCCESS")) 
  {
   jQuery.sap.require("sap.m.MessageBox");
   /*      sap.m.MessageBox.show(data.d.Message,sap.m.MessageBox.Icon.INFORMATION , "Trip-Set Information", sap.m.MessageBox.Action.OK, function() {
       //Clear trip number
       view.tripNum.setValue("");
      }); 
    */     sap.m.MessageBox.show(data.d.Message,{
     icon  : sap.m.MessageBox.Icon.INFORMATION , 
     title  :  "Trip-Set Information", 
     actions  : sap.m.MessageBox.Action.OK, 
     onClose  : function() { view.tripNum.setValue("");},
     styleClass : "faultMsgBox"
    });
  }
  else
  {
   view.setNum.setValue("");
   var set = data.d.IvSetid;
   view.setNum.setValue(set);
   view.symptom.destroyTokens();
   view.obj_inp.destroyTokens();
   view.asset.destroyTokens();
   //BOI For Fault UI Fix KADAMA20161223 #HPQC 42144
   if((view.data("notifNum"))!==""&&(view.data("notifNum"))!==null){
    view.positionPopOver.setValue(""); 
   }
   //EOI For fault UI Fix KADAMA20161223 #HPQC 42144
   //BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
   this.clearActivityCode();
   //EOI For Fault UI Fix KADAMA20170109 #HPQC 39201
   view.carInput.destroyTokens();
   view.checkFaults.setVisible(false);
  }
 },

 changeCarFlag:function(evt){
  /*var removeFlag = evt.getParameters().type;
  var token = evt.getParameters().token;
  var removeKey,removedText;
  var addedKey,addedText;
  if(removeFlag == "removed"){
   removeKey = token.getKey();
   removedText = token.getText();
       }
  if(removeFlag == "added"){
   addedKey = token.getKey();
   addedText = token.getText();
    }
  if ((removeKey == addedKey)&& (removedText == addedText)){
  this.change = true;
  }*/
 },
 setDefaults: function(data){
//  Start of fix KONCHADS on 23/06/2016 for Defect # 11832
  eqpFMSFormChngdFlg = false;
  $('input').change(function() {
   eqpFMSFormChngdFlg = true;
  });
//  End of fix by KONCHADS on 23/06/2016 for Defect # 11832
// START DELETION CR015 SIMS20180815 (SY)   
//  var view = this.getView();
//  if(data){
//   if($.trim(data.ZzfaultLoc).length > 0 && $.trim(data.ZzfaultLocDesc).length > 0)
//   {
//    view.data("location",data.ZzfaultLoc);
//    view.location.setValue(data.ZzfaultLocDesc);
//   }
//   if($.trim(data.ZzfaultSource).length > 0 && $.trim(data.ZzfaultSourceDesc).length > 0)
//   {
//    view.faultSource.setValue(data.ZzfaultSourceDesc);
//    view.faultSource.data("value",data.ZzfaultSource);
//
//    this.getValidateValues("faultSource");
//   }
//   //Begin of Insert KADAMA20161013 for Defect 33612
//   if($.trim(data.ZzrepPhase).length > 0 && $.trim(data.ZzrepPhaseDesc).length > 0)
//   {
//    view.reportPhase.setValue(data.ZzrepPhaseDesc);
//    view.reportPhase.data("value",data.ZzrepPhase);
//
//   }
//   //End of Insert KADAMA20161013 for Defect 33612
//
//  }
//END DELETION CR015 SIMS20180815 (SY) 
  
  this.getValidateValues("faultSource"); //++ CR015 SIMS20180815 (SY)
  var controller = this;  //++ CR015 SIMS20180815 (SY)
  readUserLastEntry(controller.getUserLastEntry, controller); //++ CR015 SIMS20180815 (SY)
 },
 getFaultLongTxt:function(evt){
  var controller = this;
  if ((this.getView().data("notifSelectedToMark"))==""||(this.getView().data("notifSelectedToMark"))==null)
  {
   jQuery.sap.require("sap.m.MessageBox");
//   sap.m.MessageBox.show("Please select a Fault to Show Long Text",sap.m.MessageBox.Icon.INFORMATION , "Fault Information", sap.m.MessageBox.Action.OK, function() { });
   sap.m.MessageBox.show("Please select a Fault to Show Long Text",{
    icon  : sap.m.MessageBox.Icon.INFORMATION , 
    title  :  "Fault Information", 
    actions  : sap.m.MessageBox.Action.OK, 
    onClose  : function() {/*True case;*/ },
    styleClass : "faultMsgBox"
   });
  }
  else
  {
   var notifNum = this.getView().data("notifSelectedToMark");
   var faultLontTxtTitle = notifNum + " Fault Long Text";
   var faultLontTxt = getFaultLongText(notifNum);
   jQuery.sap.require("sap.m.MessageBox");
   sap.m.MessageBox.show(
     faultLontTxt, {
      icon: sap.m.MessageBox.Icon.INFORMATION,
      title: faultLontTxtTitle,
      actions: [sap.m.MessageBox.Action.CLOSE],
      onClose: function(oAction) {  },
      styleClass:"faultMsgBox"
     }
   );
  }
 },

// Changes as per version 1.2
 expandTechDetail: function(evt){
  if (this.getView().Techdetail.getIcon() == "sap-icon://collapse-group"){
   this.getView().Techdetail.setIcon( "sap-icon://expand-group") ;
   this.getView().techDetBox.setVisible(true);
   this.getView().actBox.setVisible(true);        
   this.getView().NotifPage.scrollTo(900,10);


  }
  else if (this.getView().Techdetail.getIcon() == "sap-icon://expand-group"){
   this.getView().Techdetail.setIcon("sap-icon://collapse-group") ;
   this.getView().techDetBox.setVisible(false);
   this.getView().actBox.setVisible(false);
  }
 },



 chooseCause: function(evt,source){

  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  prevPage.source = source;

  if (!app.getPage("cause")) {
   var page = sap.ui.view({
    id : "cause",
    viewName : "fault_mgmt.cause",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   app.getPage("cause").data("app",app);
   this.page = page;
  } else {
   this.page = app.getPage("cause");
  }

  this.page.data("prevPage",prevPage);
  app.to("cause");
 },

 chooseDamage: function(evt,source){

  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  prevPage.source = source;

  if (!app.getPage("damage")) {
   var page = sap.ui.view({
    id : "damage",
    //BEGIN CR015 SIMSI(SYEN)
    //viewName : "fault_mgmt.cause",
    viewName : "fault_mgmt.damage",
    //END CR015 SIMSI(SYEN)
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   app.getPage("damage").data("app",app);
   this.page = page;
  } else {
   this.page = app.getPage("damage");
  }

  this.page.data("prevPage",prevPage);
  app.to("damage");
 },

 chooseObjPart: function(evt,source){

  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  prevPage.source = source;

  if (!app.getPage("objectPart")) {
   var page = sap.ui.view({
    id : "objectPart",
    viewName : "fault_mgmt.cause",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   app.getPage("objectPart").data("app",app);
   this.page = page;
  } else {
   this.page = app.getPage("objectPart");
  }

  this.page.data("prevPage",prevPage);
  app.to("objectPart");
 },
 chooseActivity: function(evt,source){

  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  var actTable = this.getView().actTable;
  prevPage.source = source;
  prevPage.tabModel = actTable.getModel().getProperty("/");

  if (!app.getPage("activity")) {
   var page = sap.ui.view({
    id : "activity",
    viewName : "fault_mgmt.cause",
    type : sap.ui.core.mvc.ViewType.JS,
    viewData : appView

   });
   app.addPage(page);
   app.getPage("activity").data("app",app);
   this.page = page;
  } else {
   this.page = app.getPage("activity");
  }

  this.page.data("prevPage",prevPage);
  app.to("activity");

 },

 setActivity: function(){   
//  var odata = [{Zzactivity:"", Zzactdesc:""}];
//  var oNewObject = {Zzactivity:"", Zzactdesc:""};
//  var oModel= new sap.ui.model.json.JSONModel();
  var controller = this;
//  oModel.setData({listitems:odata});
  var actTable = this.getView().actTable;
//  actTable.setModel(oModel);
  var act_inp = new sap.m.MultiInput({
   layoutData : new sap.m.FlexItemData({
    styleClass : "textBox",

   }),
   tokens:[ new sap.m.Token({text:{
//    parts :[{path : "Zzactivity"}],
    parts :[{path : "Txt_Actgrp"},{path : "Txt_Actcd"}],
    formatter: function(Txt_Actgrp,Txt_Actcd){
     if(Txt_Actgrp == ""){
      this.getParent().getParent().destroyTokens();
     }
     else{
      return Txt_Actgrp + "-" + Txt_Actcd;
     }
    }}}),],

    showValueHelp: true,
    valueHelpOnly : true,
    //editable : true,  //Commented for Defect 14670 KADAMA20161002
    //enabled : true, //Commented for Defect 14670 KADAMA20161002
    //editable : "{enabled}", //Insert for Defect 14670 KADAMA20161002
    enabled : "{enabled}", //Insert for Defect 14670 KADAMA20161002
    valueHelpRequest: function(evt) {
     controller.getCarAsset(evt,this);
    },
    tokenChange: function(evt){
     controller.actToken(evt,this);
    },
  })//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670

  var dummyField = new sap.m.Text();
  var delButton = new sap.m.Button({
   icon: "sap-icon://delete",
   press: function(evt) {
    controller.delActivity(evt);
   },
  }).addStyleClass("delButton");

  var act_desc = new sap.m.Input({
   //enabled : true, //Commented for Defect 14670 KADAMA20161002
   //editable : "{enabled}", //Insert for Defect 14670 KADAMA20161002
   enabled : "{enabled}", //Insert for Defect 14670 KADAMA20161002
   maxLength: 40,
//   value: "{Zzactdesc}"
   value: "{Acttext}"
  })//.addStyleClass("FaultHoverDisabled"); //KADAMA20161002 Commented Styleclass for Defect 14670
  var oRow = new sap.m.ColumnListItem();
  oRow.addCell(act_inp).addCell(dummyField).addCell(act_desc).addCell(delButton);
  actTable.bindItems("/actitems",oRow); //binding data to the table
//  this.getView().data("activityData",[]);
//  this.getView().data("activityData").push(oNewObject);
 },

 actToken: function(evt,con){
  if (evt.getSource().getTokens().length == 0){
   eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832 
   var sourceId = evt.getSource().getId();
   var ind = sourceId.lastIndexOf("-");
   var tableInd = sourceId.substring(ind+1,sourceId.length);
   var oNewObject = {Txt_Actcd:"", Txt_Actgrp:"",Acttext:""};
   this.getView().data("activityData")[tableInd] = oNewObject;
   if(this.getView().actTable.getModel().oData.actitems[tableInd] != undefined){
    this.getView().actTable.getModel().oData.actitems[tableInd].Txt_Actcd = "";
    this.getView().actTable.getModel().oData.actitems[tableInd].Txt_Actgrp = "";
   }
   if(this.getView().getModel().oData.NAV_FAULT_DISPLAY_ITEMS!= undefined && 
     this.getView().getModel().oData.NAV_FAULT_DISPLAY_ITEMS.results[tableInd]!= undefined)
   {

    this.getView().getModel().oData.NAV_FAULT_DISPLAY_ITEMS.results[tableInd].ActCode = "";
    this.getView().getModel().oData.NAV_FAULT_DISPLAY_ITEMS.results[tableInd].ActCodegrp = "";

   } 

  }
 },
 addActivity: function(evt){
  eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
  var source = evt.getSource();
  var actTable = this.getView().actTable;
  var oModel = actTable.getModel().getProperty("/");
  var oNewObject = {Txt_Actcd:"", Txt_Actgrp:"",Acttext:""};
  oModel.actitems.push(oNewObject);
  actTable.getModel().setProperty("/", oModel);
  this.getView().data("activityData").push(oNewObject);
 },

 delActivity: function(evt){
  eqpFMSFormChngdFlg = true; // fix by KONCHADS on 23/06/2016 for defect # 11832
  var idButton = evt.getParameter("id");
  var arrayId = idButton.split("-");
  var tableIndex = arrayId[arrayId.length-1]; 

  var data = this.getView().actTable.getModel().getProperty("/");
  data.actitems.splice(tableIndex,1);
  this.getView().data("activityData").splice(tableIndex,1);
  this.getView().actTable.getModel().refresh();
 },

 getCarAsset: function(evt,source){

  var appView = this.getView().getViewData();
  var app = appView.app;
  var source = evt.getSource();
  var prevPage = this.getView();
  var asset;
  var carnum = "";

  var carLength = prevPage.carInput.getTokens().length;
  if (prevPage.asset.getTokens().length != 0){
   var assetString = prevPage.asset.getTokens()[0].getKey();
   var assetCode = assetString.split(" ");
   asset = assetCode[0].trim();
  }
  else {
   asset = "";
  }
//  prevPage.source = source;

  // navigation to next view
  if((carLength == 0) && (!asset))
  {
   jQuery.sap.require("sap.m.MessageBox");
   sap.m.MessageBox.show("Please enter a Car to proceed",
     {
    icon: sap.m.MessageBox.Icon.INFORMATION , 
    title: "Fault Information", 
    actions: sap.m.MessageBox.Action.OK, 
    onClose: function() {/*True case;*/ },
    styleClass: "faultMsgBox"
     });
  }
  else {
   if(prevPage.carInput.getTokens().length > 0)
   {
    if(source.sId == "Damage"){
     this.chooseDamage(evt,source);
    }
    else if (source.sId == "Cause"){
     this.chooseCause(evt,source);
    }
    else if (source.sId == "objPart"){
     this.chooseObjPart(evt,source);
    }
    else {
     this.chooseActivity(evt,source);
    }

   }
//   comment multicar reqt
//   else{
//   jQuery.sap.require("sap.m.MessageBox");
////   sap.m.MessageBox.show("Symptom cannot be re-selected when multiple cars are specified",sap.m.MessageBox.Icon.INFORMATION , "Fault Information", sap.m.MessageBox.Action.OK, function() {/*True case;*/ }).addStyleClass("faultMsgBox");
//   sap.m.MessageBox.show("Details cannot be re-selected when multiple cars are specified",{
//   icon  : sap.m.MessageBox.Icon.INFORMATION , 
//   title  :  "Fault Information", 
//   actions  : sap.m.MessageBox.Action.OK, 
//   onClose  : function() {True case; },
//   styleClass : "faultMsgBox"
//   });
//   } comment multicar reqt
  }
 },  
// End of changes
 getConstantParams: function(data){
  this.constParams = data;

 },
 determineObjPartMandatory:function(set){

	//BOC for Defect 49294 -KADAMA20170404 Object Part mandatory
	/*this.getView().assetLabel.setRequired(true);		
	this.getView().objLabel.setRequired(true);		
	this.getView().asset.data("mandatory", true);		 
	this.getView().obj_inp.data("mandatory", true);
	this.getView().mandatory.push(this.getView().asset);
	this.getView().mandatory.push(this.getView().obj_inp); */ 		
	//EOC for Defect 49294 -KADAMA20170404 Object Part mandatory
	 
  var set_constants = [];
  var set_params = [];
  var paramSet = "";
  var constantSet = "";
  this.getView().objLabel.setRequired(false);
  this.getView().obj_inp.data("mandatory", false);
  this.getView().assetLabel.setRequired(false);   //Insert for Defect 15195 KADAMA20160921
  this.getView().asset.data("mandatory", false);   //Insert for Defect 15195 KADAMA20160921
  var fldsMandatory = this.getView().mandatory;
  for(var i=0; i<fldsMandatory.length;i++){
   if(fldsMandatory[i].getId() === this.getView().obj_inp.getId() 
    || fldsMandatory[i].getId() === this.getView().asset.getId()) //Insert for Defect 15195 KADAMA20160921
   {
    fldsMandatory.splice(i,1)
    break;
   }
  }
  if(this.constParams && this.constParams.results){
   if(this.constParams.results){
    set_constants = (this.constParams.results.length>0 ? this.constParams.results[0].NAV_TO_CONSTANTS : null);
    set_params = (this.constParams.results.length>0 ? this.constParams.results[0].NAV_TO_PARAMETERS : null);
    if(set_params && set_constants){
     if(set_params.results && set_constants.results){
      if(set_params.results.length > 0 && set_constants.results.length > 0){
       for(var c = 0; c < set_constants.results.length; c++){
        if(set_constants.results[c].Zzoption === "CP" && set_constants.results[c].Zzsign === "I"){
         paramSet = set_constants.results[c].Zzlow;
         paramSet = $.trim(paramSet.replace("*",""));
         if(set.startsWith(paramSet)){
          for(var p = 0; p < set_params.results.length > 0; p++){
           if(set_params.results[p].Zzparam === "ZZOBJPART" && set_params.results[p].Zzsign === "I" && 
             set_params.results[p].Zzoption === "EQ" && set_params.results[p].Zzlow === "M"){
            this.getView().objLabel.setRequired(true);
            this.getView().obj_inp.data("mandatory", true);
            this.getView().mandatory.push(this.getView().obj_inp);

            this.getView().assetLabel.setRequired(true);   //Insert for Defect 15195 KADAMA20160921
            this.getView().asset.data("mandatory", true);   //Insert for Defect 15195 KADAMA20160921
            this.getView().mandatory.push(this.getView().asset); //Insert for Defect 15195 KADAMA20160921
           }
          }
          break;
         }
        }
       }
      }
     }
    }
   }
  }
 },
 //BOI For Fault UI Fix KADAMA20170109 #HPQC 39201 -->Clear Activity code
 clearActivityCode: function(){
  var actTable = this.getView().actTable;

   var actTableData = actTable.getModel().oData.actitems;
  if(actTableData !== undefined){  

   if(actTableData.length > 0){

    actTable.destroyItems();
    this.getView().data("activityData",[]);

    for (var i = 0; i<actTableData.length; i++){
     actTableData[i].Txt_Actcd = "";
     actTableData[i].Txt_Actgrp = "";
     actTableData[i].Acttext = "";
     this.getView().data("activityData")[i] = actTableData[i];
    }

    var itemModel= new sap.ui.model.json.JSONModel(); 
    itemModel.setData({actitems:actTableData});

    actTable.setModel(itemModel);
   }
  }

 },
//BEGIN INSERT CR015 SIMS20180815 (SY)
 setInitModels: function() {	
	getCarAndSetList("", "", this.initCarAndSet, this);  //init set number model
	getLocAndRptPhaseList(this.initLocAndRptPhase, this); //init location and report phase model
 }, 
 
 initCarAndSet: function(data) {	 
	 var oSetData = data.d.results[0].NAV_SET.results;	 
	 var oSetModel = new sap.ui.model.json.JSONModel({
		 list: oSetData
	 });
	 this.getView().setModel(oSetModel,"setNumberModel");

	 var oCarData = data.d.results[0].NAV_CAR.results;	 
	 var oCarModel = new sap.ui.model.json.JSONModel({
		 list: oCarData
	 });
	 this.getView().setModel(oCarModel,"carNumberModel");
 },
 
 initLocAndRptPhase: function(data) {
	 var oLocationData = data.d.results[0].NAV_LOCATION.results;
	 var oLocationModel = new sap.ui.model.json.JSONModel({
		 list : oLocationData
	 });
	 this.getView().setModel(oLocationModel,"locationModel");
	 
	 var oRptPhaseData = data.d.results[0].NAV_REPORTPHASE.results;
	 var oRptPhaseModel = new sap.ui.model.json.JSONModel({
		 list : oRptPhaseData
	 });
	 this.getView().setModel(oRptPhaseModel,"rptPhaseModel");
 },
 
 getUserLastEntry: function(data) {
	 var view = this.getView();
	 if (data){
		 for (var i = 0; i < data.d.results.length; i++) {
			 if ( data.d.results[i].ParameterName === "CREATE_FAULT") {
				 if ( data.d.results[i].Key1 === "ZZREP_PHASE" ) {
					 if ( data.d.results[i].Key2 === "KEY" ) {
						 view.reportPhase.data("value",data.d.results[i].Value);  //report phase key
					 }
					 if ( data.d.results[i].Key2 === "DESCRIPTION" ) {
						 view.reportPhase.setValue(data.d.results[i].Value);  //report phase desc
					 }					 					 
				 }
				 if ( data.d.results[i].Key1 === "QMNAM" ) {
						 view.faultRepBy.setValue(data.d.results[i].Value);  //reported by				 	 
				 }
				 if ( data.d.results[i].Key1 === "ZZFAULT_LOC" ) {
					 if ( data.d.results[i].Key2 === "KEY" ) {
						 view.data("location",data.d.results[i].Value);  //location key
					 }
					 if ( data.d.results[i].Key2 === "DESCRIPTION" ) {
						 view.location.setValue(data.d.results[i].Value);  //location desc
					 }					  
				 }
				 if ( data.d.results[i].Key1 === "ZZFAULT_SOURCE" ) {
					 if ( data.d.results[i].Key2 === "KEY" ) {
						 view.faultSource.data("value",data.d.results[i].Value);  //fault source key
					 }
					 if ( data.d.results[i].Key2 === "DESCRIPTION" ) {
						 view.faultSource.setValue(data.d.results[i].Value);  //fault source desc
					 }					  
				 }				 
			 }
		 }
	 }
 },
 
 setUserLastEntry: function() {
	var oEntry = {};
	var oEntryItem = {};
	
	oEntry.ApplicationID = "ZFAULT_MGMTV2";
	oEntry.RicefID = "ENH-8230";
	oEntry.IsMobile = false;
	oEntry.NAV_TO_LENTRY = [];
	
	oEntryItem.ParameterName = "CREATE_FAULT";
	oEntryItem.Key1 = "ZZREP_PHASE";
	oEntryItem.Key2 = "DESCRIPTION";
	oEntryItem.Value = this.getView().reportPhase.getValue();
	oEntry.NAV_TO_LENTRY.push(oEntryItem);
	
	if (this.getView().reportPhase.data().value) {
		oEntryItem = {};
		oEntryItem.ParameterName = "CREATE_FAULT";
		oEntryItem.Key1 = "ZZREP_PHASE";		
		oEntryItem.Key2 = "KEY";
		oEntryItem.Value = this.getView().reportPhase.data().value;
		oEntry.NAV_TO_LENTRY.push(oEntryItem);
	}

	oEntryItem = {};
	oEntryItem.ParameterName = "CREATE_FAULT";
	oEntryItem.Key1 = "QMNAM";
	oEntryItem.Key2 = "";
	oEntryItem.Value = this.getView().faultRepBy.getValue();
	oEntry.NAV_TO_LENTRY.push(oEntryItem);

	oEntryItem = {};
	oEntryItem.ParameterName = "CREATE_FAULT";
	oEntryItem.Key1 = "ZZFAULT_LOC";
	oEntryItem.Key2 = "DESCRIPTION";
	oEntryItem.Value = this.getView().location.getValue();
	oEntry.NAV_TO_LENTRY.push(oEntryItem);
	
	if (this.getView().data().location) {
		oEntryItem = {};
		oEntryItem.ParameterName = "CREATE_FAULT";
		oEntryItem.Key1 = "ZZFAULT_LOC";		
		oEntryItem.Key2 = "KEY";
		oEntryItem.Value = this.getView().data().location;
		oEntry.NAV_TO_LENTRY.push(oEntryItem);
	}
	
	oEntryItem = {};
	oEntryItem.ParameterName = "CREATE_FAULT";
	oEntryItem.Key1 = "ZZFAULT_SOURCE";
	oEntryItem.Key2 = "DESCRIPTION";
	oEntryItem.Value = this.getView().faultSource.getValue();
	oEntry.NAV_TO_LENTRY.push(oEntryItem);
	
	if (this.getView().faultSource.data().value) {
		oEntryItem = {};
		oEntryItem.ParameterName = "CREATE_FAULT";
		oEntryItem.Key1 = "ZZFAULT_SOURCE";		
		oEntryItem.Key2 = "KEY";
		oEntryItem.Value = this.getView().faultSource.data().value;
		oEntry.NAV_TO_LENTRY.push(oEntryItem);
	}
	
	saveUserLastEntry(oEntry, this);
 },

 suggestSetNumber: function(oEvent) {
	 var sValue = oEvent.getSource().getValue();
	 var aFilters = [];
	 if (sValue) {
		 aFilters.push(new sap.ui.model.Filter("Zzsetid", sap.ui.model.FilterOperator.StartsWith, sValue));
	 };
	 
	 oEvent.getSource().getBinding("suggestionItems").filter(aFilters);
 },
 
 addCarToken: function(data) {
	 var carSetNum = data.d.results[0].NAV_CARSET.EvSetid;
	 var setNumber = this.getView().setNum.getValue();
	 var carInput = this.getView().carInput.getValue(); 
	 
	 if (carSetNum === ""){
		 this.getView().asset.data("valid",false);
		 jQuery.sap.require("sap.m.MessageBox");
		 sap.m.MessageBox.show(
				 "Please provide valid Car Number", {
			      icon: sap.m.MessageBox.Icon.ERROR,
			      title: "ERROR",
			      actions: [sap.m.MessageBox.Action.OK],
			      onClose: function(oAction) { 
			       if(oAction == "OK"){	
			    	   
			       } },
			       styleClass: "faultMsgBox" 
		    	   }
		 );
		 this.getView().carInput.setValue("");
		 
	 } else {
		 if (setNumber === "" || setNumber === carSetNum) {

			 this.getView().asset.data("valid",true);
			 this.getView().setNum.setValue(carSetNum);	
			 this.getView().data("setNumber",carSetNum); 
			 getCarAndSetList(carSetNum, "", this.initCarAndSet, this); 		 
			 var carNumbList = [];

			 var carExists = 0;			 
			 var oldCars = this.getView().carInput.getTokens();
			 for(var i=0; i<oldCars.length; i++){
				 carNumbList.push({"Zzcarid":oldCars[i].getKey(), "Zzcarpos":oldCars[i].getKey() });
				 if(oldCars[i].getKey() === carInput && carInput !=="" && carInput !==null) {
					 carExists++
				 }
			 };
			 this.getView().carInput.setValue("");
			 
			 if(carExists === 0) {
				 if(carInput !=="" && carInput !==null) {
					 this.getView().carInput.destroyTokens();
					 carNumbList.push({"Zzcarid":carInput, "Zzcarpos":carInput });
				 }
//				 Sort the car objects based on position
				 function sorting(json_object, key_to_sort_by) {
					 function sortByKey(a, b) {
						var x = a[key_to_sort_by];
						var y = b[key_to_sort_by];
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					 }

					 json_object.sort(sortByKey);
				 }
				 sorting(carNumbList,'Zzcarpos');
				 this.getView().data("carNumbers",carNumbList);
				 this.getView().data("carNumbersLen",carNumbList.length);	
				 this.getView().symptom.destroyTokens();
				 this.getView().asset.destroyTokens();
				
			 	 if((this.getView().data("notifNum"))!==""&&(this.getView().data("notifNum"))!==null){
			 		this.getView().positionPopOver.setValue(""); 
				 }
			 	 this.getView().oController.clearActivityCode();
			 	 this.getView().obj_inp.destroyTokens();
			 	 
			 	if(carInput !=="" && carInput !==null) {
					 for(var j=0; j<carNumbList.length; j++){
						 var newToken = new sap.m.Token({
						 	   key: carNumbList[j].Zzcarid,
						 	   text: carNumbList[j].Zzcarid
						 });
						 this.getView().carInput.addToken(newToken);			 		 
					 }
			 	}
			 };
	   
		 } else {
			 
			 if(setNumber !== carSetNum) {
				 this.getView().asset.data("valid",false);

			     jQuery.sap.require("sap.m.MessageBox");
			     sap.m.MessageBox.show(
			       "Car number does not match Set number. Please try again", {
			        icon: sap.m.MessageBox.Icon.ERROR,
			        title: "ERROR",
			        actions: [sap.m.MessageBox.Action.OK],
			        onClose: function(oAction) { 
			         if(oAction == "OK"){
			         } },
			         styleClass: "faultMsgBox"
			       }
			     );
			     this.getView().carInput.setValue("");
			 }
		 }
	 } 
 },
 
 suggestCarNumber: function(oEvent) {
	 var sValue = oEvent.getSource().getValue();
	 var aFilters = [];
	 if (sValue) {
		 aFilters.push(new sap.ui.model.Filter("Zzcarid", sap.ui.model.FilterOperator.StartsWith, sValue));
	 };
	 
	 oEvent.getSource().getBinding("suggestionItems").filter(aFilters);	 
 },
 
  processFromInput :function(data){
	 
	  var set = this.getView().setNum.getValue().toUpperCase();	  
	  var sValidSet = data.d.results[0].NAV_SET.results.length;
	  
	  //check if car number has a token but is a valid set number

	  
	  if(set !== null && set !==""){
		  
		  if(sValidSet === 0){  //invalid set
				 set = "";
				 jQuery.sap.require("sap.m.MessageBox");
				 sap.m.MessageBox.show(
						 "Please provide valid Set Number", {
					      icon: sap.m.MessageBox.Icon.ERROR,
					      title: "ERROR",
					      actions: [sap.m.MessageBox.Action.OK],
					      onClose: function(oAction) { 
					       if(oAction == "OK"){	
					       } },
					       styleClass: "faultMsgBox" 
				    	   }
				 )		  
		  } else {
				  
				  if(this.getView().carInput.getTokens().length !== 0){  //car number has tokens 
				  var setModelList = this.getView().getModel("setNumberModel").oData.list;
				  
				  var index = setModelList.map(function(obj){
					  return obj.Zzsetid
				  }).indexOf(set);
				  
				  if (index === -1){
					 jQuery.sap.require("sap.m.MessageBox");
					 sap.m.MessageBox.show(
							 "Set Number does not match Car number. Please try again", {
						      icon: sap.m.MessageBox.Icon.ERROR,
						      title: "ERROR",
						      actions: [sap.m.MessageBox.Action.OK],
						      onClose: function(oAction) { 
						       if(oAction == "OK"){	
						       } },
						       styleClass: "faultMsgBox" 
					    	   }
					 )	  
				  }
					  
				  }  
	      }
	  }
	  
	  var oldSet = this.getView().data("setNumber");
	  
	  this.getView().setNum.setValue(set);
	  this.getView().data("setNumber",set);
	  getCarAndSetList(set, "", this.initCarAndSet, this);
	  if (oldSet!=="" && oldSet !==null) {
		  if(set !== oldSet){
			  this.getView().data("carNumbers",[]);
			  this.getView().data("carNumbersLen","0");
			  this.getView().carInput.destroyTokens();
			  this.getView().symptom.destroyTokens();
			  this.getView().asset.destroyTokens();	
			  if((this.getView().data("notifNum"))!==""&&(this.getView().data("notifNum"))!==null){
				  this.getView().positionPopOver.setValue(""); 
			  }
	   }
		  this.clearActivityCode();
	  }
  },
 
//END INSERT CR015 SIMS20180815 (SY) 
 //EOI For Fault UI Fix KADAMA20170109 #HPQC 39201

 /**
  * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
  * @memberOf fault_mgmt.createNotification
  */
// onExit: function() {

// }

});