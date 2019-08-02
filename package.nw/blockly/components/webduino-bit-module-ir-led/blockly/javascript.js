Blockly.JavaScript['irled_new'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getIRLed(board, bitGPIO(' + dropdown_pin_ + '))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['irled_launch'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_code_ = Blockly.JavaScript.valueToCode(block, 'code_', Blockly.JavaScript.ORDER_ATOMIC);
  var code;
  if (value_code_.length > 2) {
    code = variable_name_ + '.send(' + value_code_ + ');\n';
  } else {
    code = variable_name_ + '.send(\'ffffffff\');\n';
  }
  return code;
};
