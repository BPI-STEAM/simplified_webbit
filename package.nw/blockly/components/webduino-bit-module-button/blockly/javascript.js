Blockly.JavaScript['button_new'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getPullupButton(board, ' + dropdown_pin_ + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['button_pin_get'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = 'getButton(board, bitGPIO(' + dropdown_pin_ + '))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['button_event'] = function (block) {
  var variable_var_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_'), Blockly.Variables.NAME_TYPE);
  var dropdown_event_ = block.getFieldValue('event_');
  var statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  var code = variable_var_ + '.on(\'' + dropdown_event_ + '\', async function () {\n' + statements_do_ + '});\n';
  return code;
};

Blockly.JavaScript['button_event_2'] = function (block) {
  function genFnName(prefix) {
    var time = Date.now().toString().substr(-4);
    var random = Math.random().toString().substr(-4);
    return prefix + "_" + time + random;
  }

  var variable_var_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_'), Blockly.Variables.NAME_TYPE);
  var variable_var2_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var2_'), Blockly.Variables.NAME_TYPE);
  var dropdown_event_ = block.getFieldValue('event_');
  var statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  var FUNCTION_NAME = genFnName('button_event');
  var FUNCTION_HANDLE_NAME = genFnName('button_handle');
  var STATUS_NAME = '.currentStatus';
  var EVENTS = ['pressed', 'released', 'longPress'];
  var code = 'async function ' + FUNCTION_NAME + '() {\n'
    + statements_do_ 
    + '}\n';
    
  code += 'async function ' + FUNCTION_HANDLE_NAME + '(btn, type) {\n'
    + Blockly.JavaScript.INDENT + 'return async function () {\n'
    + Blockly.JavaScript.INDENT + Blockly.JavaScript.INDENT + 'btn' + STATUS_NAME + ' = type;\n'
    + Blockly.JavaScript.INDENT + Blockly.JavaScript.INDENT
    + variable_var_ + '.currentStatus === "' + dropdown_event_ +'"' 
    + ' && ' + variable_var2_ + '.currentStatus === "' + dropdown_event_ + '"'
    + ' && ' + FUNCTION_NAME + '();\n'
    + Blockly.JavaScript.INDENT + '};\n'
    + '}\n';

  [variable_var_, variable_var2_].forEach(function (varVal) {
    EVENTS.forEach(function (event) {
      code += varVal + '.on("' + event + '", ' + FUNCTION_HANDLE_NAME + '(' + varVal + ',"' + event + '"));\n';
    });
  });
  
  return code;
};
