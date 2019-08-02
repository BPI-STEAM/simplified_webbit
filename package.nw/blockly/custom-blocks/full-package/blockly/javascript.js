Blockly.JavaScript['full_irled_launch'] = function (block) {
  var value_code_ = Blockly.JavaScript.valueToCode(block, 'code_', Blockly.JavaScript.ORDER_ATOMIC);
  var code;
  if (value_code_.length > 2) {
    code = 'IrLed.init(board, 2).send(' + value_code_ + ');\n';
  } else {
    code = 'IrLed.init(board, 2).send("ffffffff");\n';
  }
  return code;
};

Blockly.JavaScript['full_irrecv_value'] = function (block) {
  var code = `(value || '')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['full_irrecv_on'] = function (block) {
  var statements_on_ = Blockly.JavaScript.statementToCode(block, 'on_');
  var code = 'IrRecv.init(board, 1).receive(async value => {\n' +
    statements_on_ +
    '}, () => {});\n';
  return code;
};



Blockly.JavaScript['full_ultrasonic_distance'] = function (block) {
  var dropdown_trig_ = block.getFieldValue('trig_');
  var dropdown_echo_ = block.getFieldValue('echo_');
  var code = `((await Ultrasonic.init(board, ${dropdown_trig_}, ${dropdown_echo_})).distance || 0)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};




Blockly.JavaScript['full_servo_angle'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var angle_angle_ = block.getFieldValue('angle_');
  if (angle_angle_ <= 5) {
    angle_angle_ = 5;
  }
  if (angle_angle_ > 270) {
    angle_angle_ = 5;
  }
  if (angle_angle_ >= 175 && angle_angle_ <= 270) {
    angle_angle_ = 175;
  }
  var code = 'Servo.init(board, ' + dropdown_pin_ + ').angle = ' + angle_angle_ + ';\n';
  return code;
};



Blockly.JavaScript['full_sound_status'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var status = block.getFieldValue('status_');
  var statement = Blockly.JavaScript.statementToCode(block, 'callback_');
  var code;
  if (status == 'detected') {
    code = 'Sound.init(board, ' + pin + ').on(\'' + status + '\', async function () {\n' +
      '  ' + statement + '\n' +
      '});\n';
  } else {
    code = 'Sound.init(board, ' + pin + ').on(\'' + status + '\', async function () {\n' +
      '  setTimeout(async function () {\n' +
      '  ' + statement + '\n' +
      '  }, 300);\n' +
      '});\n';
  }
  return code;
};



Blockly.JavaScript['full_dht_get_number'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var dropdown_dht_ = block.getFieldValue('dht_');
  var code = `((DHT.init(board, ${dropdown_pin_})).${dropdown_dht_} || 0)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.JavaScript['full_shock_event'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var dropdown_event_ = block.getFieldValue('event_');
  var statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  var code = `Shock.init(board, ${dropdown_pin_}).on('${dropdown_event_}', async () => {
    ${statements_do_}
    });\n`;
  return code;
};



Blockly.JavaScript['full_relay_state'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var dropdown_state_ = block.getFieldValue('state_');
  var code = `Relay.init(board, ${dropdown_pin_}).${dropdown_state_}();\n`;
  return code;
};



Blockly.JavaScript['full_soil_value'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = `((Soil.init(board, ${dropdown_pin_})).value || 0)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



Blockly.JavaScript['full_led_state'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var dropdown_state_ = block.getFieldValue('state_');
  var code = `LED.init(board, ${dropdown_pin_}).${dropdown_state_}();\n`;
  return code;
};



Blockly.JavaScript['full_rgbled_setcolor'] = function (block) {
  var dropdown_red_ = block.getFieldValue('red_');
  var dropdown_green_ = block.getFieldValue('green_');
  var dropdown_blue_ = block.getFieldValue('blue_');
  var value_color_ = Blockly.JavaScript.valueToCode(block, 'color_', Blockly.JavaScript.ORDER_NONE);
  var code = `RGBLED.init(board, ${dropdown_red_}, ${dropdown_green_}, ${dropdown_blue_}).setColor(${value_color_});\n`;
  return code;
};



Blockly.JavaScript['full_photocell_value'] = function (block) {
  var dropdown_pin_ = block.getFieldValue('pin_');
  var code = `((Photocell.init(board, ${dropdown_pin_})).value || 0)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
