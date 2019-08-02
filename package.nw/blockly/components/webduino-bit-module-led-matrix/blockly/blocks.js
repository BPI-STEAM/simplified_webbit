var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['matrix_new'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['matrix_color'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SET)
        .appendField(new Blockly.FieldVariable('matrix'), 'matrix_');
    this.appendDummyInput()
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SELECT_COLOR)

        // Warninig: This name (mcolor_) must not be changed!
        .appendField(new Blockly.CustomFieldColour('#ffffff'), 'mcolor_');

    this.appendDummyInput()
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_0_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_1_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_2_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_3_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_4_');
    this.appendDummyInput()
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_5_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_6_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_7_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_8_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_9_');
    this.appendDummyInput()
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_10_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_11_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_12_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_13_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_14_');
    this.appendDummyInput()
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_15_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_16_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_17_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_18_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_19_');
    this.appendDummyInput()
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_20_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_21_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_22_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_23_')
        .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_24_');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['matrix_color_single'] = {
  init: function () {
    this.appendValueInput('led_')
        .setCheck('Number')
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SET)
        .appendField(new Blockly.FieldVariable('matrix'), 'matrix_')
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_NUMBER);
    this.appendValueInput('color_')
        .setCheck(null)
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_COLOR_TO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['matrix_brightness'] = {
  init: function () {
    this.appendValueInput('brightness_')
        .setCheck(null)
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SET)
        .appendField(new Blockly.FieldVariable('matrix'), 'matrix_')
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_BRIGHTNESS);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['matrix_off'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_CLOSE)
        .appendField(new Blockly.FieldVariable('matrix'), 'matrix_');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['matrix_character'] = {
  init: function () {
    this.appendValueInput('char_')
        .setCheck(null)
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SET)
        .appendField(new Blockly.FieldVariable('matrix'), 'matrix_')
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_CHARACTER_SHOW);
    this.appendValueInput('color_')
        .setCheck(null)
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_CHARACTER_COLOR_TO);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['matrix_string'] = {
  init: function () {
    this.appendValueInput('str_')
        .setCheck(null)
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SET)
        .appendField(new Blockly.FieldVariable('matrix'), 'matrix_')
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_STRING_SHOW);
    this.appendValueInput('color_')
        .setCheck(null)
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_STRING_COLOR_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_STRING_SPEED)
        .appendField(new Blockly.FieldDropdown([
          ["150", "0"],
          ["200", "1"],
          ["250", "2"],
          ["500", "3"],
          ["1000", "4"]
        ]), 'speed_')
        .appendField("ms");    
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['matrix_color_output'] = {
    init: function () {
        this.appendValueInput("color_input")
            .setCheck(null)
            .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SET)
            .appendField(new Blockly.FieldVariable("matrix"), "matrix_")
            .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_CHARACTER_COLOR_TO);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['matrix_color_array'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SELECT_COLOR)
          // Warninig: This name (mcolor_) must not be changed!
          .appendField(new Blockly.CustomFieldColour('#ffffff'), 'mcolor_');
      this.appendDummyInput()
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_0_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_1_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_2_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_3_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_4_');
      this.appendDummyInput()
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_5_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_6_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_7_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_8_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_9_');
      this.appendDummyInput()
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_10_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_11_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_12_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_13_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_14_');
      this.appendDummyInput()
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_15_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_16_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_17_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_18_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_19_');
      this.appendDummyInput()
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_20_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_21_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_22_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_23_')
          .appendField(new Blockly.CustomFieldCheckbox('#000000'), 'led_24_');
      this.setColour(35);
      this.setOutput(true, null);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['matrix_xy'] = {
    init: function() {
      this.appendValueInput("x")
          .setCheck(null)
          .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_SET)
          .appendField(new Blockly.FieldVariable("matrix"), "NAME")
          .appendField("X");
      this.appendValueInput("y")
          .setCheck(null)
          .appendField("Y");
      this.appendValueInput("color_input")
          .setCheck(null)
          .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_CHARACTER_COLOR_XY);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  //https://jsbin.com/yubolugoti/1/edit?html,js,output
  let emoji_list = [
      ["+","0010000100111110010000100"], 
      ["-","0000000000111110000000000"], 
      ["×","1000101010001000101010001"],   
      ["÷","0010000000111110000000100"], 
      ["=","0000011111000001111100000"], 
      ["▲","0010001110111110000000000"], 
      ["▼","0000000000111110111000100"], 
      ["◀","0010001100111000110000100"], 
      ["▶","0010000110001110011000100"],
      ["◢","0000000001000110011101111"], 
      ["◣","0000010000110001110011110"], 
      ["◥","0111100111000110000100000"], 
      ["◤","1111011100110001000000000"],
      ["↑","0010001110101010010000100"], 
      ["↓","0010000100101010111000100"], 
      ["←","0010001000111110100000100"], 
      ["→","0010000010111110001000100"], 
      ["↖","1110011000101000001000001"], 
      ["↗","0011100011001010100010000"], 
      ["↙","0000100010101001100011100"], 
      ["↘","1000001000001010001100111"], 
      ["·","0000000000001000000000000"], 
      ["∶","0000000100000000010000000"], 
      ["∴","0000000100000000101000000"], 
      ["⸬","0000001010000000101000000"], 
      ["⁙","0000001010001000101000000"], 
      ["⋮⋮","0101000000010100000001010"], 
      ["⧓","1000111011111111101110001"], 
      ["⧗","1111101110001000111011111"],
      ["⧔","1000111010111001101010001"], 
      ["⧕","1000101011001110101110001"], 
      ["♥","0101011111111110111000100"],
      ["♡","0101010101100010101000100"],
      ["■","0000001110011100111000000"], 
      ["□","1111110001100011000111111"], 
      ["○","0111010001100011000101110"], 
      ["◆","0010001110111110111000100"], 
      ["◇","0010001010100010101000100"], 
      ["⊡","1111110001101011000111111"], 
      ["⊞","1111110101111111010111111"], 
      ["⟐","0010001010101010101000100"], 
      ["★","0010010101011100101010001"], 
      ["✔","0000100010101000100000000"], 
      ["♪","0011000101001001110011100"], 
      ["♫","0111101001010011101111011"], 
      ["⌗","0101011111010101111101010"], 
      ["⚑","0111101111011110100001000"], 
      ["⊠","1111111011101011101111111"], 
      ["♀","0111001110001001111100100"], 
      ["♂","0010100010111011010011100"], 
      ["※","1010101010101010101010101"], 
      ["✈","0010010110111111011000100"], 
      ["♕","1010110101111111000111111"], 
      ["≡","1111100000111110000011111"], 
      ["","1111100000111110000011111"]
    ];
  Blockly.Blocks['matrix_emoji'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_EMOJI)
          .appendField(new Blockly.FieldDropdown(emoji_list), "emoji")
          .appendField(Blockly.Msg.WEBDUINO_LED_MATRIX_LED_EMOJICOLOR)
          .appendField(new Blockly.FieldColour("#ff0000"), "color");
          this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(35);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
