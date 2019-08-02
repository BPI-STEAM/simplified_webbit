Blockly.JavaScript['DFPlayer_new'] = function (block) {
  var dropdown_rx_ = block.getFieldValue('Rx_');
  var dropdown_tx_ = block.getFieldValue('Tx_');
  var code = 'getDFPlayer(board,' + dropdown_rx_ + ',' + dropdown_tx_ + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['DFPlayer_play'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_value_ = Blockly.JavaScript.valueToCode(block, 'value_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = variable_name_ + '.play(' + value_value_ + ');\n';
  return code;
};

Blockly.JavaScript['DFPlayer_loop'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_value_ = Blockly.JavaScript.valueToCode(block, 'value_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = variable_name_ + '.loop(' + value_value_ + ');\n';
  return code;
};

Blockly.JavaScript['DFPlayer_volume'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_value_ = Blockly.JavaScript.valueToCode(block, 'value_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = variable_name_ + '.volume(' + value_value_ + ');\n';
  return code;
};

Blockly.JavaScript['DFPlayer_action'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var dropdown_state_ = block.getFieldValue('action_');
  var code = '';

  switch(dropdown_state_) {
    case 'prev':
      code = variable_name_ + '.previous();\n';
      break;
    case 'next':
      code = variable_name_ + '.next();\n';
      break;
    case 'start':
      code = variable_name_ + '.start();\n';
      break;
    case 'stop':
      code = variable_name_ + '.stop();\n';
      break;
    case 'pause':
      code = variable_name_ + '.pause();\n';
      break;
  }
  return code;
};
