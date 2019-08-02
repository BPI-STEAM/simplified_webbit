var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['mpu9250_new'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_MPU9250);
    this.setOutput(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['mpu9250_detected'] = {
  init: function () {
    function getDropDownValue() {
      return [
        [Blockly.Msg.WEBDUINO_MPU9250_ACCELEROMETER, 'webduino.module.MPU9250Event.ACCELEROMETER_MESSAGE'],
        [Blockly.Msg.WEBDUINO_MPU9250_GYROSCOPE, 'webduino.module.MPU9250Event.GYROSCOPE_MESSAGE'],
        [Blockly.Msg.WEBDUINO_MPU9250_MAGNETOMETER, 'webduino.module.MPU9250Event.MAGNETOMETER_MESSAGE'],
        [Blockly.Msg.WEBDUINO_MPU9250_ANGLE, 'webduino.module.MPU9250Event.ANGLE_MESSAGE'],
        [Blockly.Msg.WEBDUINO_MPU9250_AZIMUTH, 'webduino.module.MPU9250Event.AZIMUTH_MESSAGE']
      ];
    }

    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("mpu9250"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_MPU9250_DETECTED)
      .appendField(new Blockly.FieldDropdown(getDropDownValue), 'type_');
    this.appendStatementInput("do_")
      .appendField(Blockly.Msg.WEBDUINO_MPU9250_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['mpu9250_val'] = {
  init: function () {
    function getDropDownValue() {
      return [
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_X1, 'accVals[0]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_Y1, 'accVals[1]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_Z1, 'accVals[2]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_X2, 'gyrVals[0]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_Y2, 'gyrVals[1]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_Z2, 'gyrVals[2]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_X3, 'magVals[0]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_Y3, 'magVals[1]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_Z3, 'magVals[2]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_X4, 'angVals[0]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_Y4, 'angVals[1]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_Z4, 'angVals[2]'],
        [Blockly.Msg.WEBDUINO_MPU9250_VAL_C, 'aziVals[0]']
      ];
    }

    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable("mpu9250"), "name_")
      .appendField(Blockly.Msg.WEBDUINO_MPU9250_S)
      .appendField(new Blockly.FieldDropdown(getDropDownValue), "val_")
      .appendField(Blockly.Msg.WEBDUINO_MPU9250_VAL);
    this.setOutput(true, null);
    this.setColour(35);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange: function () {
    var val_ = this.getFieldValue('val_');
    switch (val_) {
      case '_x':
        this.setFieldValue('accVals[0]', 'val_');
        break;
      case '_y':
        this.setFieldValue('accVals[1]', 'val_');
        break;
      case '_z':
        this.setFieldValue('accVals[2]', 'val_');
        break;
      default:
        break;
    }
  }
};

Blockly.Blocks['mpu9250_stop'] = {
  init: function () {
    function getDropDownValue() {
      return [
        [Blockly.Msg.WEBDUINO_MPU9250_ACCELEROMETER, 'webduino.module.MPU9250Event.ACCELEROMETER_MESSAGE'],
        [Blockly.Msg.WEBDUINO_MPU9250_GYROSCOPE, 'webduino.module.MPU9250Event.GYROSCOPE_MESSAGE'],
        [Blockly.Msg.WEBDUINO_MPU9250_MAGNETOMETER, 'webduino.module.MPU9250Event.MAGNETOMETER_MESSAGE'],
        [Blockly.Msg.WEBDUINO_MPU9250_ANGLE, 'webduino.module.MPU9250Event.ANGLE_MESSAGE'],
        [Blockly.Msg.WEBDUINO_MPU9250_AZIMUTH, 'webduino.module.MPU9250Event.AZIMUTH_MESSAGE']
      ];
    }

    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('mpu9250'), 'name_')
      .appendField(Blockly.Msg.WEBDUINO_MPU9250_STOP)
      .appendField(new Blockly.FieldDropdown(getDropDownValue), 'type_');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  onchange: function () {
    if (this.getFieldValue('type_') === 'webduino.module.MPU9250Event.MAGNETOMETER_MESSAGE') {
      this.setFieldValue('webduino.module.MPU9250Event.ACCELEROMETER_MESSAGE', 'type_');
    }
  }
};

Blockly.Blocks['mpu9250_detectTime'] = {
  init: function () {
    function getDropDownValue() {
      return [
        ["150", "0"],
        ["200", "1"],
        ["250", "2"],
        ["500", "3"],
        ["1000", "4"]
      ];
    }

    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_MPU9250_SET)
      .appendField(new Blockly.FieldVariable('mpu9250'), 'name_')
      .appendField(Blockly.Msg.WEBDUINO_MPU9250_DETECTTIME)
      .appendField(new Blockly.FieldDropdown(getDropDownValue), 'detectTimeType_')
      .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
