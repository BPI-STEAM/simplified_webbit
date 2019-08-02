Blockly.JavaScript['gps_new'] = function (block) {
  var dropdown_rx_ = block.getFieldValue('rx_');
  var dropdown_tx_ = block.getFieldValue('tx_');
  var code = 'getGPS(board,' + dropdown_rx_ + ',' + dropdown_tx_ + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['gps_read'] = function (block) {
  var variable_gps = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('gps'), Blockly.Variables.NAME_TYPE);
  var value_qryTime = Blockly.JavaScript.valueToCode(block, 'qryTime', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');
  var code = variable_gps + '.read(async function(evt){\n' +
    statements_callback + '}, ' + value_qryTime + ');\n';
  return code;
};

Blockly.JavaScript['gps_get_data'] = function(block) {
  var variable_gps = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('gps'), Blockly.Variables.NAME_TYPE);
  var dropdown_datatype = block.getFieldValue('dataType');
  var code = variable_gps + '.' + dropdown_datatype;
  return [code, Blockly.JavaScript.ORDER_NONE];
};