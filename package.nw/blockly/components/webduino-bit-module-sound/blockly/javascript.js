Blockly.JavaScript['sound_new'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getSound(board, bitGPIO(' + dropdown_pin_ + '))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


Blockly.JavaScript['sound_status'] = function (block) {
  var variable_item_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('item_'), Blockly.Variables.NAME_TYPE);
  var dropdown_status_ = block.getFieldValue('status_');
  var statements_var_ = Blockly.JavaScript.statementToCode(block, 'var_');
  var code;
  if (dropdown_status_ == 'detected') {
    code = variable_item_ + '.on("' + dropdown_status_ + '", async function(){\n' +
      '  ' + statements_var_ + '\n' +
      '});\n';
  } else {
    code = variable_item_ + '.on("' + dropdown_status_ + '", async function(){\n' +
      '  setTimeout(async function(){\n' +
      '  ' + statements_var_ + '\n' +
      '  },300);\n' +
      '});\n';
  }
  return code;
};
