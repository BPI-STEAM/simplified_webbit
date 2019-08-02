Blockly.JavaScript['irrecv_new'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getIRRecv(board, bitGPIO(' + dropdown_pin_ + '))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['irrecv_on'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var statements_on_ = Blockly.JavaScript.statementToCode(block, 'on_');
  var code = variable_name_ + '.receive(async function (val) {\n' +
    '  ' + variable_name_ + '.onVal = val;\n' +
    statements_on_ +
    '}, function () {});\n';
  return code;
};


Blockly.JavaScript['irrecv_val'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var code = variable_name_ + '.onVal';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['irrecv_off'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var code = variable_name_ + '.off();\n';
  return code;
};
