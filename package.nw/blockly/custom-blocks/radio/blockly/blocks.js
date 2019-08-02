// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kb5ujh
Blockly.Blocks['radio_channel_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BROADCAST_WHEN_RECEIVE_MESSAGE);
    this.appendValueInput("name_")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BROADCAST_WHEN_FROM_CHANNEL);
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBDUINO_BROADCAST_DO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBDUINO_BROADCAST_GET_HELPURL);
    this.setCommentText("獨立使用，不需放在迴圈積木內，就能持續偵測頻道。");
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ki9tgo
Blockly.Blocks['radio_channel_set'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBDUINO_BROADCAST_TO_CHANNEL);
    this.appendValueInput("msg_")
      .appendField(Blockly.Msg.WEBDUINO_BROADCAST_SEND_MESSAGE);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBDUINO_BROADCAST_SET_HELPURL);
    this.setCommentText("發送廣播訊息後，才會繼續執行下方程式");
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#yp8ery
Blockly.Blocks['radio_channel_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BROADCAST_RECEIVED_MESSAGE);
    this.setOutput(true, null);
    this.setColour(25);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBDUINO_BROADCAST_GET_HELPURL);
  }
};
