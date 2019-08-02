Blockly.Blocks['basic_irrecv_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_IRRECV_ON);
    this.appendStatementInput("on_")
      .appendField(Blockly.Msg.WEBBIT_IRRECV_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['basic_irrecv_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_IRRECV_CODE);
    this.setOutput(true);
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['basic_irled_launch'] = {
  init: function () {
    this.appendValueInput("code_")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBBIT_IRLED_LAUNCHCODE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};



Blockly.Blocks['basic_ultrasonic_distance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_ULTRASONIC_NEW_TRIG)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "trig_")
      .appendField(Blockly.Msg.WEBDUINO_ULTRASONIC_NEW_ECHO)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), "echo_")
      .appendField(Blockly.Msg.WEBDUINO_ULTRASONIC_DISTANCE);
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(60);
    this.setHelpUrl('');
  }
};



Blockly.Blocks['basic_servo_angle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_SERVO)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('pwm')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_SERVO_ANGLE)
      .appendField(new Blockly.FieldAngle("90"), "angle_");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(60);
    this.setHelpUrl('');
  }
};




Blockly.Blocks['basic_sound_status'] = {
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
    this.setColour(60);
    this.setHelpUrl('');
  }
};



Blockly.Blocks['basic_photocell_val'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_PHOTOCELL_PIN)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('analog')), "pin_")
      .appendField(Blockly.Msg.WEBDUINO_PHOTOCELL_VAL);
    this.setOutput(true);
    this.setColour(60);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
