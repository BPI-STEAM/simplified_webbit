var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['buzzer_new'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BUZZER)
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(230);
    this.setToolUrl('http://webduinoio.github.io/samples/content/buzzer-piano/');
    this.setHelpUrl(mainUrl + 'basic/component/buzzer.html' + utmUrl);
  }
};

Blockly.Blocks['buzzer_notes_tempos'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_MUSIC1_TONE)
      .appendField(new Blockly.FieldDropdown([
        ['C', 'C'],
        ['CS', 'CS'],
        ['D', 'D'],
        ['DS', 'DS'],
        ['E', 'E'],
        ['F', 'F'],
        ['FS', 'FS'],
        ['G', 'G'],
        ['GS', 'GS'],
        ['A', 'A'],
        ['AS', 'AS'],
        ['B', 'B'],
        [Blockly.Msg.WEBDUINO_BUZZER_MUSIC1_NO, '0']
      ]), 'tone_')
      .appendField(new Blockly.FieldDropdown([
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7']
      ]), 'pitch_')
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_MUSIC1_TEMPOS)
      .appendField(new Blockly.FieldDropdown([
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['10', '10']
      ]), 'tempos_');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(35);
    this.setToolUrl('http://webduinoio.github.io/samples/content/buzzer-piano/');
    this.setHelpUrl(mainUrl + 'basic/component/buzzer.html' + utmUrl);
  }
};

Blockly.Blocks['buzzer_music_play'] = {
  init: function () {
    this.appendStatementInput('music_')
      .setCheck(null)
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_USE)
      .appendField(new Blockly.FieldVariable('buzzer'), 'var_')
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_PLAY);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(65);
    this.setToolUrl('http://webduinoio.github.io/samples/content/buzzer-piano/');
    this.setHelpUrl(mainUrl + 'basic/component/buzzer.html' + utmUrl);
  }
};

Blockly.Blocks['buzzer_var_notes_var_tempos'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_MUSIC1_TONE)
        .appendField(new Blockly.FieldVariable('notes'), 'notes')
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_MUSIC1_TEMPOS)
        .appendField(new Blockly.FieldVariable('tempo'), 'tempo');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip('');
    this.setToolUrl('http://webduinoio.github.io/samples/content/buzzer-piano/');
    this.setHelpUrl(mainUrl + 'basic/component/buzzer.html' + utmUrl);
  }
};

Blockly.Blocks['buzzer_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_LET)
      .appendField(new Blockly.FieldVariable('buzzer'), 'var_')
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_BUZZER_EVENT_STOP, '.stop()'],
        [Blockly.Msg.WEBDUINO_BUZZER_EVENT_PAUSE, '.pause()'],
        [Blockly.Msg.WEBDUINO_BUZZER_EVENT_RESUMEPLAY, '.play()']
      ]), 'event_')
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_EVENT_PLAY);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(65);
    this.setToolUrl('http://webduinoio.github.io/samples/content/buzzer-piano/');
    this.setHelpUrl(mainUrl + 'basic/component/buzzer.html' + utmUrl);
  }
};

Blockly.Blocks['buzzer_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_CHECK)
      .appendField(new Blockly.FieldVariable('buzzer'), 'var_')
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_STATE)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_BUZZER_STATE_STOP, 'stopped'],
        [Blockly.Msg.WEBDUINO_BUZZER_STATE_PAUSE, 'paused'],
        [Blockly.Msg.WEBDUINO_BUZZER_STATE_PLAYING, 'playing']
      ]), 'state_');
    this.setOutput(true);
    this.setTooltip('');
    this.setColour(65);
    this.setToolUrl('http://webduinoio.github.io/samples/content/buzzer-piano/');
    this.setHelpUrl(mainUrl + 'basic/component/buzzer.html' + utmUrl);
  }
};

Blockly.Blocks['buzzer_music_array'] = {
  init: function () {
    this.appendValueInput('notes_')
      .setCheck('String')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_MUSIC2_NOTES);
    this.appendValueInput('tempos_')
      .setCheck('String')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_MUSIC2_TEMPOS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(35);
    this.setToolUrl('http://webduinoio.github.io/samples/content/buzzer-piano/');
    this.setHelpUrl(mainUrl + 'basic/component/buzzer.html' + utmUrl);
  }
};

Blockly.Blocks['buzzer_load_music'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_BUZZER_CHOOSE_MUSIC)
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBDUINO_BUZZER_CHOOSE_MUSIC1, 'm1'],
        [Blockly.Msg.WEBDUINO_BUZZER_CHOOSE_MUSIC4, 'm4'],
        [Blockly.Msg.WEBDUINO_BUZZER_CHOOSE_MUSIC2, 'm2'],
        [Blockly.Msg.WEBDUINO_BUZZER_CHOOSE_MUSIC3, 'm3'],
        [Blockly.Msg.WEBDUINO_BUZZER_CHOOSE_MUSIC5, 'm5']
      ]), 'music_');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(35);
    this.setToolUrl('http://webduinoio.github.io/samples/content/buzzer-piano/');
    this.setHelpUrl(mainUrl + 'basic/component/buzzer.html' + utmUrl);
  }
};