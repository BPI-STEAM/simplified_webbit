
Blockly.Blocks['full_irrecv_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_IRRECV_ON);
    this.appendStatementInput("on_")
      .appendField(Blockly.Msg.WEBBIT_IRRECV_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(70);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['full_irrecv_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_IRRECV_CODE);
    this.setOutput(true);
    this.setColour(70);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['full_irled_launch'] = {
  init: function () {
    this.appendValueInput("code_")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBBIT_IRLED_LAUNCHCODE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(70);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_ultrasonic_distance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_ULTRASONIC_NEW_TRIG)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "trig_")
      .appendField(Blockly.Msg.WEBDUINO_ULTRASONIC_NEW_ECHO)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "echo_")
      .appendField(Blockly.Msg.WEBDUINO_ULTRASONIC_DISTANCE);
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(70);
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_servo_angle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_SERVO)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('pwm')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_SERVO_ANGLE)
      .appendField(new Blockly.FieldAngle("90"), "angle_");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(70);
    this.setHelpUrl('');
  }
};




Blockly.Blocks['full_sound_status'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_SOUND)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "pin_")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_SOUND_STATUS_DETECTED, "detected"],
        [Blockly.Msg.WEBDUINO_SOUND_STATUS_ENDED, "ended"]
      ]), "status_")
      .appendField(Blockly.Msg.WEBDUINO_SOUND_DETECTED);
    this.appendStatementInput("callback_")
      .appendField(Blockly.Msg.WEBDUINO_SOUND_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(70);
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_dht_get_number'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_DHT_NEW)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_DHT_GET_NOW)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_DHT_GET_T, "temp"],
        [Blockly.Msg.WEBDUINO_DHT_GET_H, "humd"]
      ]), "dht_");
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(70);
    this.setToolUrl('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_shock_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_SHOCK_NEW)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_SHOCK_EVENT_WAS)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_SHOCK_EVENT_HIGH, "high"],
        [Blockly.Msg.WEBDUINO_SHOCK_EVENT_LOW, "low"]
      ]), "event_")
      .appendField(Blockly.Msg.WEBDUINO_SHOCK_EVENT_TO);
    this.appendStatementInput("do_")
      .appendField(Blockly.Msg.WEBDUINO_SHOCK_EVENT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(70);
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_relay_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_RELAY_BIT)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_RELAY_SET_STATE)
      .appendField(new Blockly.FieldDropdown([
        ["on", "on"],
        ["off", "off"]
      ]), "state_");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(70);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_soil_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_SOIL)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('analog')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_SOIL_VAL);
    this.setOutput(true);
    this.setColour(70);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_led_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_LED)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_LED_STATE)
      .appendField(new Blockly.FieldDropdown([
        ["on", "on"],
        ["off", "off"]
      ]), "state_");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(70);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_rgbled_setcolor'] = {
  init: function () {
    this.appendValueInput("color_")
      .appendField(Blockly.Msg.WEBDUINO_RGBLED_BIT)
      .appendField(Blockly.Msg.WEBDUINO_RGBLED_RED)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "red_")
      .appendField(Blockly.Msg.WEBDUINO_RGBLED_GREEN)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "green_")
      .appendField(Blockly.Msg.WEBDUINO_RGBLED_BLUE)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "blue_")
      .appendField(Blockly.Msg.WEBDUINO_RGBLED_SETCOLOR);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(70);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['full_photocell_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_PHOTOCELL_PIN)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('analog')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_PHOTOCELL_VAL);
    this.setOutput(true);
    this.setColour(70);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
