var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['DFPlayer_new'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_DFPLAYER)
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
        ['13', '13']
      ]), 'Rx_')
      .appendField(Blockly.Msg.WEBDUINO_DFPLAYER_RX)
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
        ['13', '13']
      ]), 'Tx_');
    this.setOutput(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['DFPlayer_play'] = {
  init: function () {
    this.appendValueInput('value_')
      .appendField(new Blockly.FieldVariable('dfplayer'), 'name_')
      .appendField(Blockly.Msg.WEBDUINO_DFPLAYER_PLAY);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_DFPLAYER_NUM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
}

Blockly.Blocks['DFPlayer_volume'] = {
  init: function () {
    this.appendValueInput('value_')
      .appendField(new Blockly.FieldVariable('dfplayer'), 'name_')
      .appendField(Blockly.Msg.WEBDUINO_DFPLAYER_VOLUME);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

Blockly.Blocks['DFPlayer_loop'] = {
  init: function () {
    this.appendValueInput('value_')
      .appendField(new Blockly.FieldVariable('dfplayer'), 'name_')
      .appendField(Blockly.Msg.WEBDUINO_DFPLAYER_LOOP);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_DFPLAYER_NUM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
}

Blockly.Blocks['DFPlayer_action'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('dfplayer'), 'name_')
        .appendField(Blockly.Msg.WEBDUINO_DFPLAYER_SET)
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.WEBDUINO_DFPLAYER_PREVIOUS, 'prev'],
          [Blockly.Msg.WEBDUINO_DFPLAYER_NEXT, 'next'],
          [Blockly.Msg.WEBDUINO_DFPLAYER_START, 'start'],
          [Blockly.Msg.WEBDUINO_DFPLAYER_STOP, 'stop'],
          [Blockly.Msg.WEBDUINO_DFPLAYER_PAUSE, 'pause']
        ]), 'action_');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};
