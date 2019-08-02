Blockly.JavaScript['wabot_new'] = function(block) {
    var code = 'getwabot(board)';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['wabot_basic_action'] = function(block) {
    var variable_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('wabot'), Blockly.Variables.NAME_TYPE);
    var dropdown_action = block.getFieldValue('action');
    var code = variable_ + '.' + dropdown_action + '();\n';
    return code;
};

Blockly.JavaScript['wabot_tempo'] = function(block) {
    var variable_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('wabot'), Blockly.Variables.NAME_TYPE);
    var dropdown_special = block.getFieldValue('special');
    var code = variable_ + '.' + dropdown_special +'();\n';
    return code;
};

Blockly.JavaScript['wabot_status'] = function(block) {
    var variable_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('wabot'), Blockly.Variables.NAME_TYPE);
    var dropdown_step = block.getFieldValue('status');
    var code = variable_ + '.' + dropdown_step + '(' + 0 + ',function(){});\n';
    return code;
};

Blockly.JavaScript['wabot_angle'] = function(block) {
    var variable_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('wabot'), Blockly.Variables.NAME_TYPE);
    var dropdown_limb = block.getFieldValue('limb');
    var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
    var code = variable_ + '.servo' + '(' + dropdown_limb + ','+ value_angle + ',function(){});\n';
    return code;
};

Blockly.JavaScript['wabot_angle_tool'] = function(block) {
    var variable_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('wabot'), Blockly.Variables.NAME_TYPE);
    var dropdown_limb = block.getFieldValue('limb');
    var angle_pos = block.getFieldValue('pos');
    var code = variable_ + '.servo' + '(' + dropdown_limb + ','+ angle_pos + ',function(){});\n';
    return code;
};

Blockly.JavaScript['wabot_stop'] = function(block) {
    var variable_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('wabot'), Blockly.Variables.NAME_TYPE);
    // var value_step = Blockly.JavaScript.valueToCode(block, 'step', Blockly.JavaScript.ORDER_ATOMIC);
    var code = variable_ + '.stop();\n';
    return code;
};