Blockly.JavaScript['mpu9250_new'] = function (block) {
  var code = 'getMPU9250(board)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mpu9250_detected'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var dropdown_type_ = block.getFieldValue('type_');
  var statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  var code = variable_name_ + '.on(' + dropdown_type_ +', async function () {\n' +
    statements_do_ +
    '});\n';
  return code;
};

Blockly.JavaScript['mpu9250_val'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var dropdown_val_ = block.getFieldValue('val_');
  var code = variable_name_ + '.' + dropdown_val_
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mpu9250_stop'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var dropdown_type_ = block.getFieldValue('type_');
  var code = variable_name_ + '.off(' + dropdown_type_ + ');\n';
  return code;
};

Blockly.JavaScript['mpu9250_detectTime'] = function (block) {
  var variable_matrix_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var dropdown_detectTimeType_ = block.getFieldValue('detectTimeType_');
  var code = variable_matrix_ + '.setDetectTimeType(' + dropdown_detectTimeType_ + ');\n';
  return code;
};
