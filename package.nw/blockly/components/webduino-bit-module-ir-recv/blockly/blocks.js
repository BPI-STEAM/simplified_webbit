var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['irrecv_new'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_IRRECV, "紅外線接收，腳位：")
      .appendField(new Blockly.FieldDropdown([["1", "1"]]), "pin_");
    this.setOutput(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/component/ir.html' + utmUrl);
  }
};

Blockly.Blocks['irrecv_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("irrecv"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_IRRECV_ON, "開始接收");
    this.appendStatementInput("on_")
      .appendField(Blockly.Msg.WEBDUINO_IRRECV_DO, "執行：");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/component/ir.html' + utmUrl);
  }
};

Blockly.Blocks['irrecv_val'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("irrecv"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_IRRECV_CODE, "接收的代碼");
    this.setOutput(true);
    this.setColour(35);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/component/ir.html' + utmUrl);
  }
};

Blockly.Blocks['irrecv_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("irrecv"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_IRRECV_OFF, "停止接收");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/component/ir.html' + utmUrl);
  }
};
