Blockly.JavaScript['buzzer_new'] = function (block) {
  var code = 'getBuzzer(board, \'25\')';

  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['buzzer_music'] = function (block) {
  var value_music_name_ = Blockly.JavaScript.valueToCode(block, 'music_name_', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_music_ = Blockly.JavaScript.statementToCode(block, 'music_');
  var functionName = Blockly.JavaScript.provideFunction_(
    'buzzer_music', ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(m) {',
      _buzzer_music.toString().replace(/function _buzzer_music\(m\) {\r?\n/, '')
    ]);
  var code = value_music_name_ + ' = ' + functionName + '([' + statements_music_ + ']);\n';

  return code;
};

function _buzzer_music(m) {
  var musicNotes = {};
  musicNotes.notes = [];
  musicNotes.tempos = [];
  if (m[0].notes.length > 1) {
    for (var i = 0; i < m.length; i++) {
      if (Array.isArray(m[i].notes)) {
        var cn = musicNotes.notes.concat(m[i].notes);
        musicNotes.notes = cn;
      } else {
        musicNotes.notes.push(m[i].notes);
      }
      if (Array.isArray(m[i].tempos)) {
        var ct = musicNotes.tempos.concat(m[i].tempos);
        musicNotes.tempos = ct;
      } else {
        musicNotes.tempos.push(m[i].tempos);
      }
    }
  } else {
    musicNotes.notes = [m[0].notes];
    musicNotes.tempos = [m[0].tempos];
  }
  return musicNotes;
}

Blockly.JavaScript['buzzer_music_play'] = function (block) {
  var variable_var_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_'), Blockly.Variables.NAME_TYPE);
  var statements_music_ = Blockly.JavaScript.statementToCode(block, 'music_');
  var code = '';

  if (statements_music_.indexOf('"') > 0) {
    var functionName = Blockly.JavaScript.provideFunction_(
      'buzzer_music', ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(m) {',
        _buzzer_music.toString().replace(/function _buzzer_music\(m\) {\r?\n/, '')
      ]);
    code = variable_var_ + '.play(' + functionName + '([' + statements_music_ + ']).notes ,' + functionName + '([' + statements_music_ + ']).tempos );\n';
  } else {
    var _vars = statements_music_.trim();
    _vars = _vars.substring(0,_vars.length-1).split(',');
    var notes = _vars[0].split(':')[1];
    var tempos = _vars[1].split(':')[1];
    code = variable_var_ + '.play(' + notes +','+ tempos+');\n';
  }
  return code;
};

Blockly.JavaScript['buzzer_music_array'] = function (block) {
  var value_music_name_ = Blockly.JavaScript.valueToCode(block, 'music_name_', Blockly.JavaScript.ORDER_ATOMIC);
  var value_notes_ = Blockly.JavaScript.valueToCode(block, 'notes_', Blockly.JavaScript.ORDER_ATOMIC);
  var value_tempos_ = Blockly.JavaScript.valueToCode(block, 'tempos_', Blockly.JavaScript.ORDER_ATOMIC);
  var next = block.getNextBlock();
  var notes = value_notes_.replace(/\'/g, '');
  var tempos = value_tempos_.replace(/\'/g, '');
  var notesGen = notes.split(',');
  var temposGen = tempos.split(',');
  var code;

  if (notesGen.length > temposGen.length) {
    var nt = notesGen.length - temposGen.length;
    var tl = temposGen.length - 1;
    for (var i = 0; i < nt; i++) {
      temposGen.push(temposGen[tl])
    }
  } else if (notesGen.length < temposGen.length) {
    var nb = temposGen.length - notesGen.length;
    temposGen.splice(notesGen.length, nb);
  }
  for (var i = 0; i < notesGen.length; i++) {
    notesGen[i] = '"' + notesGen[i] + '"';
  }
  for (var i = 0; i < temposGen.length; i++) {
    temposGen[i] = '"' + temposGen[i] + '"';
  }
  if (next === null) {
    code = '{notes : [' + notesGen + '] , tempos : [' + temposGen + '] }';
  } else {
    code = '{notes : [' + notesGen + '] , tempos : [' + temposGen + '] },';
  }
  return code;
};

Blockly.JavaScript['buzzer_var_notes_var_tempos'] = function (block) {
  var variable_notes = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('notes'), Blockly.Variables.NAME_TYPE);
  var variable_tempo = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('tempo'), Blockly.Variables.NAME_TYPE);
  var next = block.getNextBlock();
  var code = '{notes: ' + variable_notes + ',tempos:' + variable_tempo + '}';

  if (next != null) {
    code += ',';
  }
  return code;
};

Blockly.JavaScript['buzzer_notes_tempos'] = function (block) {
  var dropdown_tone_ = block.getFieldValue('tone_');
  var dropdown_pitch_ = block.getFieldValue('pitch_');
  var dropdown_tempos_ = block.getFieldValue('tempos_');
  var next = block.getNextBlock();
  var code;

  if (dropdown_tone_ == '0') {
    dropdown_pitch_ = '';
  }
  if (next === null) {
    code = '{notes:"' + dropdown_tone_ + dropdown_pitch_ + '",tempos:"' + dropdown_tempos_ + '"}';
  } else {
    code = '{notes:"' + dropdown_tone_ + dropdown_pitch_ + '",tempos:"' + dropdown_tempos_ + '"},';
  }
  return code;
};

Blockly.JavaScript['buzzer_event'] = function (block) {
  var variable_var_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_'), Blockly.Variables.NAME_TYPE);
  var dropdown_event_ = block.getFieldValue('event_');
  var code = variable_var_ + dropdown_event_ + ';\n';

  return code;
};

Blockly.JavaScript['buzzer_state'] = function (block) {
  var variable_var_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var_'), Blockly.Variables.NAME_TYPE);
  var dropdown_state_ = block.getFieldValue('state_');
  var code = variable_var_ + '._state == "' + dropdown_state_ + '"';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['buzzer_load_music'] = function (block) {
  var dropdown_music_ = block.getFieldValue('music_');
  var notes, tempos;
  var next = block.getNextBlock();

  if (dropdown_music_ == 'm1') {
    notes = '["E7","E7","0","E7","0","C7","E7","0","G7","0","0","0","G6","0","0","0","C7","0","0","G6","0","0","E6","0","0","A6","0","B6","0","AS6","A6","0","G6","E7","0","G7","A7","0","F7","G7","0","E7","0","C7","D7","B6","0","0","C7","0","0","G6","0","0","E6","0","0","A6","0","B6","0","AS6","A6","0","G6","E7","0","G7","A7","0","F7","G7","0","E7","0","C7","D7","B6","0","0"]';
    tempos = '["8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8"]';
  } else if (dropdown_music_ == 'm2') {
    notes = '["c4","e4","e4","0","e4","g4","g4","0","d4","f4","f4","0","a4","b4","b4","0","c4","d4","e4","c4","e4","c4","e4","0","d4","e4","f4","f4","e4","d4","f4","0","e4","f4","g4","e4","g4","e4","g4","0","f4","g4","a4","a4","g4","f4","a4","0","g4","c4","d4","e4","f4","g4","a4","0","a4","d4","e4","f4","g4","a4","b4","0","b4","e4","f4","g4","a4","b4","c5","0","c5","b4","a4","f4","b4","g4","c5"]';
    tempos = '["6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6"]';
  } else if (dropdown_music_ == 'm3') {
    notes = '["C5","C5","G4","G4","A4","A4","G4","0","E4","G4","C5","A4","G4","0","0","A4","0","G4","0","E4","A4","G4","0","E4","0","G4","0","E4","D4","C4","0","E4","E4","G4","G4","A4","A4","G4","G4","0","D5","0","C5","A4","G4","A4","C5","G4","0","A4","A4","G4","A4","C5","G4","0","A4","A4","G4","A4","D5","C5"]';
    tempos = '["6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6"]';
  } else if (dropdown_music_ == 'm4') {
    notes = '["FS6","FS6","0","FS6","0","D6","FS6","0","B6","0","0","0","G6","0","0","0","G6","0","0","E6","0","0","C6","0","0","F6","0","G6","0","FS6","F6","0","E6","C7","0","E7","F7","0","D7","E7","0","C7","0","A6","B6","G6","0","0","G6","0","0","E6","0","0","C6","0","0","F6","0","G6","0","FS6","F6","0","E6","G6","0","E7","F7","0","D7","E7","0","C7","0","A6","B6","G6","0","0"]';
    tempos = '["8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8"]';
  } else if (dropdown_music_ == 'm5') {
    notes = '["E5","E5","E5","0","E5","E5","E5","0","E5","G5","C5","D5","E5","0","F5","F5","F5","F5","F5","E5","E5","0","E5","D5","D5","E5","D5","G5","0","G4","E5","D5","C5","G4","0","G4","E5","D5","C5","A4","0","A4","F5","E5","D5","B4","0","G5","G5","F5","D5","E5","C5","0","G4","E5","D5","C5","G4","0","G4","E5","D5","C5","A4","0","A4","F5","E5","D5","G5","G5","G5","G5","A5","G5","F5","D5","C5"]';
    tempos = '["8","8","8","8","8","8","8","8","8","8","6","8","8","6","8","8","8","8","8","8","8","6","8","8","8","8","4","8","6","8","8","8","8","5","5","8","8","8","8","5","5","8","8","8","8","5","5","8","8","8","8","5","5","5","8","8","8","8","5","5","8","8","8","8","5","5","8","8","8","8","8","8","8","8","8","8","8","8","8"]';
  }
  var code;
  if (next === null) {
    code = '{notes:' + notes + ' , tempos:' + tempos + '}';
  } else {
    code = '{notes:' + notes + ' , tempos:' + tempos + '},';
  }
  return code;
};