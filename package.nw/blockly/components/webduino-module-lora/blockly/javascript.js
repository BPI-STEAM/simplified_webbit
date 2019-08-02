Blockly.JavaScript['lora_new'] = function (block) {
  var dropdown_resetpin = block.getFieldValue('resetPin');
  var dropdown_address = block.getFieldValue('address');
  var code = 'getLORA(board,' + dropdown_resetpin + ',' + dropdown_address + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['lora_send'] = function (block) {
  var variable_lora = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('lora'), Blockly.Variables.NAME_TYPE);
  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var code = variable_lora + '.send(' + value_data + ');\n';
  return code;
};


Blockly.JavaScript['lora_send_ack'] = function (block) {
  var variable_lora = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('lora'), Blockly.Variables.NAME_TYPE);
  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_send_ok = Blockly.JavaScript.statementToCode(block, 'send_ok');
  var statements_send_failure = Blockly.JavaScript.statementToCode(block, 'send_failure');
  var code = variable_lora + '.sendAck(' + value_data + ',\n';
  code += "function(){\n  " + statements_send_ok + "},\n";
  code += "function(){\n  " + statements_send_failure + "});\n";
  return code;
};


Blockly.JavaScript['lora_recv_ack'] = function (block) {
  var variable_lora = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('lora'), Blockly.Variables.NAME_TYPE);
  var statements_recv_ok = Blockly.JavaScript.statementToCode(block, 'recv_ok');
  var code = variable_lora + '.recvAck(\n';
  code += "function(){\n  " + statements_recv_ok + "});\n";
  return code;
};


Blockly.JavaScript['lora_recv_data'] = function (block) {
  var variable_lora = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('lora'), Blockly.Variables.NAME_TYPE);
  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var code = variable_lora + '.recvData';
  return [code];
};