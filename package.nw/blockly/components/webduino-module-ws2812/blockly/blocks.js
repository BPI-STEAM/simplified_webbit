//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#ji8gno
var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['ws2812_new'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WEBDUINO_WS2812_PIN)
        .appendField(new Blockly.FieldDropdown([
            ["0","0"], 
            ["1","1"], 
            ["2","2"], 
            ["3","3"], 
            ["4","4"], 
            ["5","5"], 
            ["6","6"], 
            ["7","7"], 
            ["8","8"], 
            ["9","9"], 
            ["10","10"], 
            ["11","11"], 
            ["12","12"], 
            ["13","13"], 
            ["14","14"],
            ["15","15"], 
            ["16","16"]
            ]), "pin")
        .appendField(Blockly.Msg.WEBDUINO_WS2812_LED)
        .appendField(new Blockly.FieldTextInput('7'), "leds")
        .appendField(Blockly.Msg.WEBDUINO_WS2812_LED_UNIT);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};

//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#co6db6
Blockly.Blocks['ws2812_data'] = {
  init: function() {
    this.appendValueInput("data")
        .setCheck(null)
        .appendField(new Blockly.FieldVariable("ws2812"), "ws2812")
        .appendField(Blockly.Msg.WEBDUINO_WS2812_DISPLAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};


Blockly.Blocks['ws2812_print'] = {
  init: function() {
    this.appendValueInput("led")
        .setCheck("Number")
        .appendField(new Blockly.FieldVariable("ws2812"), "ws2812")
        .appendField(Blockly.Msg.WEBDUINO_WS2812_LED_SET)
        .appendField(Blockly.Msg.WEBDUINO_WS2812_LED_NUMBER);
    this.appendValueInput("color")
        .appendField(Blockly.Msg.WEBDUINO_WS2812_LED_UNIT)
        .appendField(Blockly.Msg.WEBDUINO_WS2812_LED_COLOR);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};


//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#5pnrkk
Blockly.Blocks['ws2812_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WEBDUINO_WS2812_CLOSE)
        .appendField(new Blockly.FieldVariable("ws2812"), "ws2812");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};


//https://blockly-demo.appspot.com/static/demos/blockfactory_old/index.html#khxoen
Blockly.Blocks['ws2812_brightness'] = {
  init: function() {
    this.appendValueInput("brightness")
        .setCheck("Number")
        .appendField(new Blockly.FieldVariable("ws2812"), "ws2812")
        .appendField(Blockly.Msg.WEBDUINO_WS2812_BRIGHTBESS);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl(mainUrl + 'basic/index.html' + utmUrl); 
  }
};