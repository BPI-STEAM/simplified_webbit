Blockly.Blocks['car_tracker_move'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_TOYCAR_ACTION)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_CARTRACKER_FORWARD, "1"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_BACK, "4"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_FORWARD, "7"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_FORWARD, "8"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_BACK, "9"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_BACK, "10"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_RIGHT, "3"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_LEFT, "2"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_STOP, "0"],
      ]), "direction_");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(170);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['car_tracker_speed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_TOYCAR)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_TOYCAR_ALL_WHEEL ,"setAllSpeed"],
        [Blockly.Msg.WEBDUINO_TOYCAR_RIGHT_WHEEL, "setRightSpeed"],
        [Blockly.Msg.WEBDUINO_TOYCAR_LEFT_WHEEL, "setLeftSpeed"]
      ]), "tire_")
      .appendField(Blockly.Msg.WEBDUINO_TOYCAR_SPEED)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_TOYCAR_SPEED_FASTEST, "100"],
        [Blockly.Msg.WEBDUINO_TOYCAR_SPEED_FASTER, "85"],
        [Blockly.Msg.WEBDUINO_TOYCAR_SPEED_MEDIUM, "70"],
        [Blockly.Msg.WEBDUINO_TOYCAR_SPEED_SLOW, "55"],
        [Blockly.Msg.WEBDUINO_TOYCAR_SPEED_SLOWEST, "40"],
    ]), "speed_");
    this.setColour(170);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl("");
  }
};

Blockly.Blocks['car_tracker_track'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_ON);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_STATUS_1)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_CARTRACKER_FORWARD, "1"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_BACK, "4"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_FORWARD, "7"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_FORWARD, "8"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_BACK, "9"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_BACK, "10"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_RIGHT, "3"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_LEFT, "2"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_STOP, "0"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_KEEP, "11"]
      ]), "status1");
    this.appendStatementInput("do1")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_DO);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_STATUS_2)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_CARTRACKER_FORWARD, "1"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_BACK, "4"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_FORWARD, "7"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_FORWARD, "8"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_BACK, "9"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_BACK, "10"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_RIGHT, "3"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_LEFT, "2"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_STOP, "0"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_KEEP, "11"]
      ]), "status2");
    this.appendStatementInput("do2")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_DO);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_STATUS_3)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_CARTRACKER_FORWARD, "1"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_BACK, "4"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_FORWARD, "7"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_FORWARD, "8"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_BACK, "9"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_BACK, "10"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_RIGHT, "3"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_LEFT, "2"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_STOP, "0"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_KEEP, "11"]
      ]), "status3");
    this.appendStatementInput("do3")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_DO);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_STATUS_4)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_CARTRACKER_FORWARD, "1"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_BACK, "4"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_FORWARD, "7"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_FORWARD, "8"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_LEFT_BACK, "9"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_RIGHT_BACK, "10"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_RIGHT, "3"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_TURN_LEFT, "2"],
        [Blockly.Msg.WEBDUINO_CARTRACKER_STOP, "0"]
      ]), "status4");
    this.appendStatementInput("do4")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_DO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(170);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['car_tracker_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_CARTRACKER_OFF);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(170);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};



Blockly.Blocks['car_button_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_CARBUTTON_EVENT_WHEN)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_BUTTON_EVENT_PRESSED, "pressed"],
        [Blockly.Msg.WEBDUINO_BUTTON_EVENT_RELEASED, "released"],
        [Blockly.Msg.WEBDUINO_BUTTON_EVENT_LONGPRESS, "longPress"]
      ]), "event_")
      .appendField(Blockly.Msg.WEBDUINO_BUTTON_EVENT_TO);
    this.appendStatementInput("do_")
      .appendField(Blockly.Msg.WEBDUINO_BUTTON_EVENT_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(170);
    this.setHelpUrl("");
  }
};



Blockly.Blocks['car_ultrasonic_distance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_ULTRASONIC_DISTANCE);
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(170);
    this.setHelpUrl("");
  }
};



Blockly.Blocks['car_irrecv_on'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_IRRECV_ON);
    this.appendStatementInput("on_")
      .appendField(Blockly.Msg.WEBDUINO_IRRECV_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(170);
    this.setTooltip('');
    this.setHelpUrl("");
  }
};

Blockly.Blocks['car_irled_launch'] = {
  init: function () {
    this.appendValueInput("code_")
      .setCheck("String")
      .appendField(Blockly.Msg.WEBDUINO_IRLED_LAUNCHCODE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(170);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['car_irrecv_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_IRRECV_CODE);
    this.setOutput(true);
    this.setColour(170);
    this.setTooltip('');
    this.setHelpUrl("");
  }
};



Blockly.Blocks['car_ws2812_print'] = {
  init: function () {
    this.appendValueInput("led")
      .setCheck("Number")
      .appendField(Blockly.Msg.WEBDUINO_WS2812_LED_SET)
    this.appendValueInput("color")
      .appendField(Blockly.Msg.WEBDUINO_WS2812_LED_UNIT)
      .appendField(Blockly.Msg.WEBDUINO_WS2812_LED_COLOR);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(170);
    this.setTooltip('');
    this.setHelpUrl("");
  }
};

Blockly.Blocks['car_ws2812_brightness'] = {
  init: function () {
    this.appendValueInput("brightness")
      .setCheck("Number")
      .appendField(Blockly.Msg.WEBDUINO_WS2812_BRIGHTBESS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(170);
    this.setTooltip('');
    this.setHelpUrl("");
  }
};

Blockly.Blocks['car_ws2812_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_WS2812_CLOSE)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(170);
    this.setTooltip('');
    this.setHelpUrl("");
  }
};
