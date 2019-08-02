var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['irled_new'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_IRLED, "紅外線發射，腳位：")
      .appendField(new Blockly.FieldDropdown([
        ["2", "2"]
      ]), "pin_");
    this.setOutput(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/component/ir.html' + utmUrl);
  }
};

Blockly.Blocks['irled_launch'] = {
  init: function () {
    this.appendValueInput("code_")
      .setCheck("String")
      .appendField(new Blockly.FieldVariable("irled"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_IRLED_LAUNCHCODE, "發射代碼 ( 十六進位 )：");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl(mainUrl + 'basic/component/ir.html' + utmUrl);
  }
};
