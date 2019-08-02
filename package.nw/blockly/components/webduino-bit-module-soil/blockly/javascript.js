Blockly.JavaScript['soil_new'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getSoil(board, ' + dropdown_pin_ + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['soil_detected'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var statements_detected_ = Blockly.JavaScript.statementToCode(block, 'detected_');
  var code = variable_name_ + '.measure(async function(val){\n' +
    '  ' + variable_name_ + '.detectedVal = val;\n' +
    statements_detected_ +
    '});\n';
  return code;
};


Blockly.JavaScript['soil_val'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var code = variable_name_ + '.detectedVal';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['soil_stop'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var code = variable_name_ + '.off();\n';
  return code;
};
