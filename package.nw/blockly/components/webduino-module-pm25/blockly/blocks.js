var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['g3_new'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_G3_NEW)
      .appendField(new Blockly.FieldDropdown([
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
        ['12', '12'],
        ['13', '13'],
        ['14', '14'],
        ['15', '15'],
        ['16', '16']
      ]), 'rx_')
      .appendField(Blockly.Msg.WEBDUINO_G3_TX)
      .appendField(new Blockly.FieldDropdown([
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['10', '10'],
        ['11', '11'],
        ['12', '12'],
        ['13', '13'],
        ['14', '14'],
        ['15', '15'],
        ['16', '16']
      ]), 'tx_');
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(230);
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['g3_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('g3'), 'var_');
    this.appendValueInput('time')
      .setCheck('Number')
      .appendField(Blockly.Msg.WEBDUINO_G3_GET);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_G3_GET_TIME);
    this.appendStatementInput('do')
      .appendField(Blockly.Msg.WEBDUINO_G3_GET_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['g3_read'] = {
  init: function () {
    this.setCommentText(Blockly.Msg.WEBDUINO_G3_FIRMWARE_COMMENT);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_G3_FIRMWARE)
      .appendField(new Blockly.FieldVariable('g3'), 'var_')
      .appendField(Blockly.Msg.WEBDUINO_G3_READ);
    this.appendStatementInput('do')
      .appendField(Blockly.Msg.WEBDUINO_G3_GET_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['g3_trigger'] = {
  init: function() {
    this.setCommentText(Blockly.Msg.WEBDUINO_G3_FIRMWARE_COMMENT);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_G3_FIRMWARE)
        .appendField(new Blockly.FieldVariable('g3'), 'g3')
        .appendField(new Blockly.FieldDropdown([
          ['on', 'true'],
          ['off', 'false']
        ]), 'state')
        .appendField(Blockly.Msg.WEBDUINO_G3_TIMER)
        .appendField(Blockly.Msg.WEBDUINO_G3_INTERVAL)
        .appendField(new Blockly.FieldDropdown([
          ['1', '1'],
          ['3', '3'],
          ['5', '5'],
          ['10', '10'],
          ['30', '30'],
          ['60', '60'],
          ['180', '180']
        ]), 'delaySec')
        .appendField(Blockly.Msg.WEBDUINO_G3_RUN)
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.WEBDUINO_G3_INFINITY, '-1']
        ]), 'repeatTime')
        .appendField(Blockly.Msg.WEBDUINO_G3_TIMES);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['g3_get_number'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('g3'), 'name_')
      .appendField(Blockly.Msg.WEBDUINO_G3_GET_NOW)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_G3_GET_PM25, 'pm25'],
        [Blockly.Msg.WEBDUINO_G3_GET_PM10, 'pm10']
      ]), 'g3_');
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(35);
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};
