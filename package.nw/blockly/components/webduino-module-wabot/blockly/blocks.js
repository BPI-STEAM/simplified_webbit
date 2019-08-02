Blockly.Blocks['wabot_new'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(Blockly.Msg.WEBDUINO_WABOT, "哇寶機器人");
        this.setOutput(true);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('https://webduino.io');
    }
};

Blockly.Blocks['wabot_basic_action'] = {
    init: function() {
        this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("wabot"), "wabot")
        .appendField("動作")
        .appendField(new Blockly.FieldDropdown(
            [
                ["向前走","walk"], 
                ["向後走","goBack"], 
                ["向左走","moonWalkLeft"], 
                ["向右走","moonWalkRight"],
                ["向左轉","turnLeft"], 
                ["向右轉","turnRight"], 
                ["向後轉","backyard"]
            ]), "action")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('https://webduino.io');
    }
};

Blockly.Blocks['wabot_tempo'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("wabot"), "wabot")
            .appendField("動作")
            .appendField(new Blockly.FieldDropdown(
                [
                    ["裝可愛", "swing"],
                    // ["上下跳動", "upDown"],
                    ["快樂向前", "flapping"],
                    ["玻璃舞", "crusaito"],
                    ["跑步", "run"]
                ]), "special");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('https://webduino.io');
    }
};

Blockly.Blocks['wabot_status'] = {
    init: function() {
        this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("wabot"), "wabot")
        .appendField("動作")
        .appendField(new Blockly.FieldDropdown(
            [
                ["立正","standard"], 
                ["踢左腳","kickLeft"], 
                ["踢右腳","kickRight"], 
                // ["墊腳尖","goingUp"], 
                ["跌倒","noGravity"], 
                ["酒醉","drunk"],
                ["跳舞","dance"]
            ]), "status");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('https://webduino.io');
    }
};

Blockly.Blocks['wabot_angle'] = {
    init: function() {
        this.appendValueInput("angle")
        .appendField(new Blockly.FieldVariable("wabot"), "wabot")
        .appendField("設定")
        .appendField(new Blockly.FieldDropdown(
            [
                ["右足", "0"], 
                ["左足", "1"], 
                ["右腿", "2"], 
                ["左腿", "3"],
                ["左手", "4"], 
                ["右手", "5"]
            ]), "limb");
        this.appendDummyInput()
            .appendField("度");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('https://webduino.io');
    }
};

Blockly.Blocks['wabot_angle_tool'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("wabot"), "wabot")
            .appendField("設定")
            .appendField(new Blockly.FieldDropdown(
            [
                ["右足", "0"], 
                ["左足", "1"], 
                ["右腿", "2"], 
                ["左腿", "3"],
                ["左手", "4"], 
                ["右手", "5"]
            ]), "limb")
            .appendField("為")    
            .appendField(new Blockly.FieldAngle(90), "pos");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(65);
        this.setTooltip('');
        this.setHelpUrl('https://webduino.io');
    }
};

Blockly.Blocks['wabot_stop'] = {
    init: function() {
        this.appendDummyInput()
          .appendField(new Blockly.FieldVariable("wabot"), "wabot")
          .appendField("停止動作");
        this.setColour(65);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl('https://webduino.io');
    }
  };

