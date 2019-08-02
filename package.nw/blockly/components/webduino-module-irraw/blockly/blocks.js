var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['irraw_new_recv'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_IRRAW_RECV, "紅外線接收，腳位：")
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown), "pin_");
    this.setOutput(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['irraw_new_send'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_IRRAW_SEND, "紅外線接收，腳位：")
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown), "pin_");
    this.setOutput(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['irraw_val'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("irrawrecv"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_IRRAW_CODE, "側錄的代碼");
    this.setOutput(true);
    this.setColour(35);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['irraw_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("irrawrecv"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_IRRAW_ON, "開始接收");
    this.appendStatementInput("on_")
      .appendField(Blockly.Msg.WEBDUINO_IRRAW_DO, "執行：");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['irraw_launch'] = {
  init: function () {
    this.appendValueInput("code_")
      .setCheck("String")
      .appendField(new Blockly.FieldVariable("irraw"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_IRRAW_LAUNCHCODE, "發射代碼 ( 十六進位 )：");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};
