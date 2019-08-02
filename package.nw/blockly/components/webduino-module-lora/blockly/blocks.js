//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#5ag74x
var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['lora_new'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LORA , Reset")
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["15", "15"]]), "resetPin")
        .appendField(" Address")
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["15", "15"]]), "address");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['lora_send'] = {
  init: function() {
    this.appendValueInput("data")
        .setCheck(null)
        .appendField(new Blockly.FieldVariable("lora"), "lora")
        .appendField(Blockly.Msg.WEBDUINO_LORA_SEND_STRING);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#hv345s
Blockly.Blocks['lora_send_ack'] = {
  init: function() {
    this.appendValueInput("data")
        .setCheck(null)
        .appendField(new Blockly.FieldVariable("lora"), "lora")
        .appendField(Blockly.Msg.WEBDUINO_LORA_SEND_STRING);
    this.appendStatementInput("send_ok")
        .setCheck(null)
        .appendField(Blockly.Msg.WEBDUINO_LORA_SUCCESS_CALLBACK)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendStatementInput("send_failure")
        .setCheck(null)
        .appendField(Blockly.Msg.WEBDUINO_LORA_FAIL_CALLBACK)
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#t673pk
Blockly.Blocks['lora_recv_ack'] = {
  init: function() {
    this.appendStatementInput("recv_ok")
        .setCheck(null)
        .appendField(new Blockly.FieldVariable("lora"), "lora")
        .appendField(Blockly.Msg.WEBDUINO_LORA_RECEIVE_CALLBACK);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#csh9m9
Blockly.Blocks['lora_recv_data'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("lora"), "lora")
        .appendField(Blockly.Msg.WEBDUINO_LORA_RECEIVED_STRING);
    this.setOutput(true, null);
    this.setColour(35);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};