Blockly.JavaScript['car_tracker_move'] = function (block) {
  var dropdown_direction_ = block.getFieldValue('direction_');
  var code = 'CarTracker.init(board).action(' + dropdown_direction_ + ');\n';
  return code;
};

Blockly.JavaScript['car_tracker_speed'] = function (block) {
  var dropdown_speed_ = block.getFieldValue('speed_');
  var dropdown_tire_ = block.getFieldValue('tire_');
  var code = 'CarTracker.init(board).' + dropdown_tire_ + '(' + dropdown_speed_ + ');\n';
  return code;
}

Blockly.JavaScript['car_tracker_track'] = function (block) {
  var dropdown_status1 = block.getFieldValue('status1');
  var statements_do1 = Blockly.JavaScript.statementToCode(block, 'do1');
  var dropdown_status2 = block.getFieldValue('status2');
  var statements_do2 = Blockly.JavaScript.statementToCode(block, 'do2');
  var dropdown_status3 = block.getFieldValue('status3');
  var statements_do3 = Blockly.JavaScript.statementToCode(block, 'do3');
  var dropdown_status4 = block.getFieldValue('status4');
  var statements_do4 = Blockly.JavaScript.statementToCode(block, 'do4');
  var code = `CarTracker.init(board).track('000', ${dropdown_status1}, async function () {
    ${statements_do1}
  });
  CarTracker.init(board).track('001', ${dropdown_status2}, async function () {
    ${statements_do2}
  });
  CarTracker.init(board).track('100', ${dropdown_status3}, async function () {
    ${statements_do3}
  });
  CarTracker.init(board).track('101', ${dropdown_status4}, async function () {
    ${statements_do4}
  });
  CarTracker.init(board).on();\n`;
  return code;
};

Blockly.JavaScript['car_tracker_off'] = function (block) {
  var code = 'CarTracker.init(board).off();\n';
  return code;
};



Blockly.JavaScript['car_button_event'] = function (block) {
  var dropdown_event_ = block.getFieldValue('event_');
  var statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  var code = 'CarButton.init(board).on(\'' + dropdown_event_ + '\', async function () {\n' +
    statements_do_ +
    '});\n';
  return code;
};



Blockly.JavaScript['car_ultrasonic_distance'] = function (block) {
  var code = `((await Ultrasonic.init(board)).distance || 0)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.JavaScript['car_irled_launch'] = function (block) {
  var value_code_ = Blockly.JavaScript.valueToCode(block, 'code_', Blockly.JavaScript.ORDER_ATOMIC);
  var code;
  if (value_code_.length > 2) {
    code = 'IrLed.init(board).send(' + value_code_ + ');\n';
  } else {
    code = 'IrLed.init(board).send("ffffffff");\n';
  }
  return code;
};

Blockly.JavaScript['car_irrecv_value'] = function (block) {
  var code = `(value || '')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['car_irrecv_on'] = function (block) {
  var statements_on_ = Blockly.JavaScript.statementToCode(block, 'on_');
  var code = 'IrRecv.init(board).receive(async value => {\n' +
    statements_on_ +
    '}, () => {});\n';
  return code;
};



Blockly.JavaScript['car_ws2812_print'] = function (block) {
  var value_led = Blockly.JavaScript.valueToCode(block, 'led', Blockly.JavaScript.ORDER_ATOMIC);
  var value_color = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `WS2812.init(board).setColor(${value_led}-1, ${value_color});\n`;
  return code;
};

Blockly.JavaScript['car_ws2812_off'] = function (block) {
  var code = 'WS2812.init(board).off();\n';
  return code;
};

Blockly.JavaScript['car_ws2812_brightness'] = function (block) {
  var value_brightness = Blockly.JavaScript.valueToCode(block, 'brightness', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'WS2812.init(board).brightness(' + value_brightness + ');\n';
  return code;
};
