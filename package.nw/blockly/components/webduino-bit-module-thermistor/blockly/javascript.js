Blockly.JavaScript['thermistor_new'] = function (block) {
  var code = 'getThermistor(board, 6)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['thermistor_pin_get'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getThermistor(board, '+dropdown_pin_+')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['thermistor_detected'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var statements_detected_ = Blockly.JavaScript.statementToCode(block, 'detected_');
  var code = variable_name_ + '.measure(async function (val) {\n' +
    '  ' + variable_name_ + '.detectedVal = val;\n' +
    statements_detected_ +
    '});\n';
  return code;
};

Blockly.JavaScript['thermistor_val'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var code = variable_name_ + '.detectedVal';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['thermistor_stop'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var code = variable_name_ + '.off();\n';
  return code;
};
