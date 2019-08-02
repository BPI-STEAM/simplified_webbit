Blockly.JavaScript['irraw_new_send'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getIrRaw(board, {"send":' + dropdown_pin_ + '})';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['irraw_new_recv'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getIrRaw(board, {"recv":' + dropdown_pin_ + '})';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['irraw_on'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var statements_on_ = Blockly.JavaScript.statementToCode(block, 'on_');
  var code = variable_name_ + '.receive(async function(val){\n' +
    '  ' + variable_name_ + '.onVal = val;\n' +
    statements_on_ +
    '});\n';
  return code;
};

Blockly.JavaScript['irraw_launch'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_code_ = Blockly.JavaScript.valueToCode(block, 'code_', Blockly.JavaScript.ORDER_ATOMIC);
  var code;
  if (value_code_.length > 2) {
    code = variable_name_ + '.send(' + value_code_ + ',\n  function(){});\n';
  } else {
    code = variable_name_ + '.send("ffffffff");\n';
  }
  return code;
};

Blockly.JavaScript['irraw_val'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var code = variable_name_ + '.onVal';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
