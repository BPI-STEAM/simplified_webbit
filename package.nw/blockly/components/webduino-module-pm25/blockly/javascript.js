Blockly.JavaScript['g3_get_number'] = function (block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var dropdown_g3_ = block.getFieldValue('g3_');
  var code = variable_name_ + '.' + dropdown_g3_;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript['g3_new'] = function (block) {
  var dropdown_rx_ = block.getFieldValue('rx_');
  var dropdown_tx_ = block.getFieldValue('tx_');
  var code = 'getG3(board, ' + dropdown_rx_ + ', ' + dropdown_tx_ + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['g3_get'] = function (block) {
  var variable_var_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_'), Blockly.Variables.NAME_TYPE);
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = variable_var_ + '.read(async function (val) {\n' +
    statements_do +
    '}, ' + value_time + ');\n';
  return code;
};

Blockly.JavaScript['g3_read'] = function (block) {
  var variable_var_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_'), Blockly.Variables.NAME_TYPE);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var code = variable_var_ + '.read(async function (val) {\n' +
    statements_do +
    '});\n';
  return code;
};

//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#mvnntd
Blockly.JavaScript['g3_trigger'] = function (block) {
  var variable_g3 = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('g3'), Blockly.Variables.NAME_TYPE);
  var dropdown_state = block.getFieldValue('state');
  var dropdown_delaysec = block.getFieldValue('delaySec');
  var dropdown_repeattime = block.getFieldValue('repeatTime');
  var code = '';
  if (dropdown_state == 'true') {
    code = variable_g3 + '.trigger(true, ' + dropdown_delaysec + ', ' + dropdown_repeattime + ');\n';
  } else {
    code = variable_g3 + '.trigger(false);\n';
  }
  return code;
};