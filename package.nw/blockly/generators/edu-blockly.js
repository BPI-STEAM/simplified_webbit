'use strict';

goog.provide('Blockly.JavaScript.blockly-edu');
goog.require('Blockly.JavaScript');

Blockly.JavaScript['variables_change'] = function (block) {
  let variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  let value_var_ = Blockly.JavaScript.valueToCode(block, 'var_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '';
  if (value_var_.length > 0) {
    code = variable_name_ + ' = ' + variable_name_ + ' + ' + value_var_ + ';\n';
  }
  return code;
};

//簡化版無窮迴圈積木
Blockly.JavaScript['controls_loop_forever'] = function (block) {
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  let checkbox_async = block.getFieldValue('async');
  let varName = _startLoop_();
  if (statements_do_.indexOf('await delay') != -1) {
    statements_do_ = statements_do_.replace(/, true\); \/\/delay/g, ', ' + varName + ');');
  }
  let code;
  if (checkbox_async == 'TRUE') {
    code = '(async function(){\n' +
      ' let ' + varName + ' = _startLoop_();\n' +
      '  while(_loop_[' + varName + ']){\n' +
      statements_do_ +
      '    await delay(0.005, true);\n' +
      '  }\n' +
      '})();\n\n';
  } else {
    code = 'let ' + varName + ' = _startLoop_();\n' +
      'while(_loop_[' + varName + ']){\n' +
      statements_do_ +
      '  await delay(0.005, true);\n' +
      '}\n\n';
  }
  return code;
};

Blockly.JavaScript['controls_loop_forever_while_do'] = function (block) {
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let checkbox_async = block.getFieldValue('async');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  let varName = _startLoop_();
  if (statements_do_.indexOf('await delay') != -1) {
    statements_do_ = statements_do_.replace(/, true\); \/\/delay/g, ', ' + varName + ');');
  }
  let code;
  if (checkbox_async == 'TRUE') {
    code = '(async function(){\n' +
      ' let ' + varName + ' = _startLoop_();\n' +
      '  while(_loop_[' + varName + '] && ' + value_val_ + '){\n' +
      statements_do_ +
      '    await delay(0.005, true);\n' +
      '  }\n' +
      '})();\n\n';
  } else {
    code = 'let ' + varName + ' = _startLoop_();\n' +
      'while(_loop_[' + varName + '] && ' + value_val_ + '){\n' +
      statements_do_ +
      '  await delay(0.005, true);\n\n' +
      '}\n';
  }
  return code;
};

Blockly.JavaScript['controls_loop_stop'] = function (block) {
  let dropdown_type_ = block.getFieldValue('type_');
  let code;
  switch (dropdown_type_) {
    case 'all':
      code = '_stopAllLoop_();\n';
      break;
    case 'this':
      code = 'break;\n\n';
      break;
  }
  return code;
};

Blockly.JavaScript['controls_repeat_ext_can_stop'] = function (block) {
  let value_times_ = Blockly.JavaScript.valueToCode(block, 'times_', Blockly.JavaScript.ORDER_ATOMIC);
  let checkbox_async = block.getFieldValue('async');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  let varName = _startLoop_();
  if (statements_do_.indexOf('await delay') != -1) {
    statements_do_ = statements_do_.replace(/, true\); \/\/delay/g, ', ' + varName + ');');
  }
  let code;
  if (checkbox_async == 'TRUE') {
    code = '(async function(){\n' +
      ' let ' + varName + ' = _startLoop_();\n' +
      '  for (let count = 0; count < ' + value_times_ + '; count++) {\n' +
      '    if(!_loop_[' + varName + ']){break;}\n' +
      statements_do_ +
      '    await delay(0.001, true);\n' +
      '  }\n' +
      '})();\n\n';
  } else {
    code = 'let ' + varName + ' = _startLoop_();\n' +
      'for (let count = 0; count < ' + value_times_ + '; count++) {\n' +
      '  if(!_loop_[' + varName + ']){break;}\n' +
      statements_do_ +
      '  await delay(0.001, true);\n\n' +
      '}\n';
  }
  return code;
};

Blockly.JavaScript['controls_for_can_stop'] = function (block) {
  let variable_item_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('item_'), Blockly.Variables.NAME_TYPE);
  let value_num_ = Blockly.JavaScript.valueToCode(block, 'num_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_from_ = Blockly.JavaScript.valueToCode(block, 'from_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_to_ = Blockly.JavaScript.valueToCode(block, 'to_', Blockly.JavaScript.ORDER_ATOMIC);
  let checkbox_async = block.getFieldValue('async');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  let varName = _startLoop_();
  if (statements_do_.indexOf('await delay') != -1) {
    statements_do_ = statements_do_.replace(/, true\); \/\/delay/g, ', ' + varName + ');');
  }
  let code, mark;
  let markVar = '';
  if (!Blockly.isNumber(value_from_) || !Blockly.isNumber(value_to_)) {
    markVar = 'let ' + variable_item_ + '_inc = ' + value_num_ + ';\n' +
      'if(' + value_from_ + ' > ' + value_to_ + '){\n  ' + variable_item_ + '_inc = -' + variable_item_ + '_inc;\n}';
    mark = variable_item_ + ' = ' + value_from_ + '; ' + variable_item_ + '_inc >= 0 ? ' + variable_item_ + ' <= ' + value_to_ + ' : ' + variable_item_ + ' >= ' + value_to_ + '; ' + variable_item_ + ' += ' + variable_item_ + '_inc';
  } else {
    if (value_from_ * 1 > value_to_ * 1) {
      mark = 'var ' + variable_item_ + ' = ' + value_from_ + '; ' + variable_item_ + ' >= ' + value_to_ + '; ' + variable_item_ + '-=' + value_num_;
    } else {
      mark = 'var ' + variable_item_ + ' = ' + value_from_ + '; ' + variable_item_ + ' <= ' + value_to_ + '; ' + variable_item_ + '+=' + value_num_;
    }
  }
  if (checkbox_async == 'TRUE') {
    code = '(async function(){\n' +
      ' let ' + varName + ' = _startLoop_();\n' + markVar +
      '  for (' + mark + ') {\n' +
      '    if(!_loop_[' + varName + ']){break;}\n' +
      statements_do_ +
      '    await delay(0.001, true);\n' +
      '  }\n' +
      '})();\n\n';
  } else {
    code = 'let ' + varName + ' = _startLoop_();\n' + markVar +
      'for (' + mark + ') {\n' +
      '  if(!_loop_[' + varName + ']){break;}\n' +
      statements_do_ +
      '  await delay(0.001, true);\n' +
      '}\n\n';
  }
  return code;
};

Blockly.JavaScript['controls_foreach_can_stop'] = function (block) {
  let variable_item_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('item_'), Blockly.Variables.NAME_TYPE);
  let value_array_ = Blockly.JavaScript.valueToCode(block, 'array_', Blockly.JavaScript.ORDER_ATOMIC);
  let checkbox_async = block.getFieldValue('async');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  let varName = _startLoop_();
  if (statements_do_.indexOf('await delay') != -1) {
    statements_do_ = statements_do_.replace(/, true\); \/\/delay/g, ', ' + varName + ');');
  }
  let code;
  if (checkbox_async == 'TRUE') {
    code = '(async function(){\n' +
      ' let ' + varName + ' = _startLoop_();\n' +
      ' let ' + variable_item_ + '_list = ' + value_array_ + ';\n' +
      '  for (let ' + variable_item_ + '_index in ' + variable_item_ + '_list) {\n' +
      '    ' + variable_item_ + ' = ' + variable_item_ + '_list[' + variable_item_ + '_index];\n' +
      '    if(!_loop_[' + varName + ']){break;}\n' +
      statements_do_ +
      '    await delay(0.001, true);\n' +
      '  }\n' +
      '})();\n\n';
  } else {
    code = 'let ' + varName + ' = _startLoop_();\n' +
      'let ' + variable_item_ + '_list = ' + value_array_ + ';\n' +
      'for (let ' + variable_item_ + '_index in ' + variable_item_ + '_list) {\n' +
      '  ' + variable_item_ + ' = ' + variable_item_ + '_list[' + variable_item_ + '_index];\n' +
      '  if(!_loop_[' + varName + ']){break;}\n' +
      statements_do_ +
      '  await delay(0.001, true);\n\n' +
      '}\n';
  }
  return code;

};

//把除號放大
Blockly.JavaScript['math_modulo_big_icon'] = function (block) {
  let value_a_ = Blockly.JavaScript.valueToCode(block, 'a_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_b_ = Blockly.JavaScript.valueToCode(block, 'b_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = value_a_ + '%' + value_b_;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//把一些分散的邏輯集中到邏輯區塊內
Blockly.JavaScript['logic_is_empty'] = function (block) {
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '!('+value_val_ + '?'+value_val_+':[]).length';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['logic_is_even'] = function (block) {
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type_ = block.getFieldValue('type_');
  let code;
  switch (dropdown_type_) {
    case 'even':
      code = value_val_ + ' %  2 == 0';
      break;
    case 'odd':
      code = value_val_ + ' % 2 == 1';
      break;
    case 'integer':
      code = '(()=>{if((' + value_val_ + '+\'\').indexOf(\'.\')==-1 && typeof (' + value_val_ + ') == \'number\'){return true;}else{return false;}})()';
      break;
    case 'float':
      code = '(()=>{if((' + value_val_ + '+\'\').indexOf(\'.\')!=-1 && typeof (' + value_val_ + ') == \'number\'){return true;}else{return false;}})()';
      break;
    case 'string':
      code = '(()=>{if(typeof (' + value_val_ + ') == \'string\'){return true;}else{return false;}})()';
      break;
    case 'array':
      code = '(()=>{if(typeof (' + value_val_ + ') == \'array\'){return true;}else{return false;}})()';
      break;
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//新增陣列積木，改善原本的問題
let fn_lists_random_item =
  ['function lists_random_item(list, remove) {',
    '  let x = Math.floor(Math.random() * list.length);',
    '  if (remove) {',
    '    return list.splice(x, 1)[0];',
    '  } else {',
    '    return list[x];',
    '  }',
    '}'];

let fn_lists_from_end =
  ['function lists_from_end(list, x) {',
    '   x = list.length - x;',
    '   return list.splice(x, 1)[0];',
    ' }'];


Blockly.JavaScript['lists_get_2'] = function (block) {
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type_ = block.getFieldValue('type_');
  let dropdown_pos_ = block.getFieldValue('pos_');
  let code, value_num_;
  switch (dropdown_pos_) {
    case 'num':
      value_num_ = Blockly.JavaScript.valueToCode(block, 'num_', Blockly.JavaScript.ORDER_ATOMIC);
      switch (dropdown_type_) {
        case 'get':
          code = value_val_ + '[(' + value_num_ + ' - 1)]';
          break;
        case 'getAndRemove':
          code = value_val_ + '.splice((' + value_num_ + ' - 1), 1)[0]';
          break;
      }
      break;
    case 'endnum':
      value_num_ = Blockly.JavaScript.valueToCode(block, 'num_', Blockly.JavaScript.ORDER_ATOMIC);
      Blockly.JavaScript.provideFunction_('fn_lists_from_end', fn_lists_from_end);
      switch (dropdown_type_) {
        case 'get':
          code = value_val_ + '.slice(' + value_num_ + ' * -1)[0]';
          break;
        case 'getAndRemove':
          code = 'lists_from_end(' + value_val_ + ', ' + value_num_ + ')';
          break;
      }
      break;
    case 'first':
      switch (dropdown_type_) {
        case 'get':
          code = value_val_ + '[0]';
          break;
        case 'getAndRemove':
          code = value_val_ + '.shift()';
          break;
      }
      break;
    case 'last':
      switch (dropdown_type_) {
        case 'get':
          code = value_val_ + '.slice(-1)[0]';
          break;
        case 'getAndRemove':
          code = value_val_ + '.pop()';
          break;
      }
      break;
    case 'random':
      Blockly.JavaScript.provideFunction_('fn_lists_random_item', fn_lists_random_item);
      switch (dropdown_type_) {
        case 'get':
          code = 'lists_random_item(' + value_val_ + ', false)';
          break;
        case 'getAndRemove':
          code = 'lists_random_item(' + value_val_ + ', true)';
          break;
      }
      break;
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['lists_set_2'] = function (block) {
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_pos_ = block.getFieldValue('pos_');
  let dropdown_type_ = block.getFieldValue('type_');
  let value_num_ = Blockly.JavaScript.valueToCode(block, 'num_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  switch (dropdown_pos_) {
    case 'num':
      switch (dropdown_type_) {
        case 'set':
          code = value_name_ + '[' + value_num_ + ' - 1] = ' + value_val_ + ';\n';
          break;
        case 'insert':
          code = value_name_ + '.splice((' + value_num_ + ' - 1), 0, ' + value_val_ + ');\n';
          break;
        case 'remove':
          code = value_name_ + '.splice((' + value_num_ + ' - 1), 1);\n';
          break;
      }
      break;
    case 'endnum':
      switch (dropdown_type_) {
        case 'set':
          code = value_name_ + '[' + value_name_ + '.length - ' + value_num_ + '] = ' + value_val_ + ';\n';
          break;
        case 'insert':
          code = value_name_ + '.splice(' + value_name_ + '.length - ' + value_num_ + ', 0, ' + value_val_ + ');\n';
          break;
        case 'remove':
          Blockly.JavaScript.provideFunction_('fn_lists_from_end', fn_lists_from_end);
          code = 'lists_from_end(' + value_name_ + ', ' + value_num_ + ');'
          break;
      }
      break;
    case 'first':
      switch (dropdown_type_) {
        case 'set':
          code = value_name_ + '[0] = ' + value_val_ + ';\n';
          break;
        case 'insert':
          code = value_name_ + '.unshift(' + value_val_ + ');\n';
          break;
        case 'remove':
          code = value_name_ + '.shift();\n';
          break;
      }
      break;
    case 'last':
      switch (dropdown_type_) {
        case 'set':
          code = value_name_ + '[' + value_name_ + '.length - 1] = ' + value_val_ + ';\n';
          break;
        case 'insert':
          code = value_name_ + '.push(' + value_val_ + ');\n';
          break;
        case 'remove':
          code = value_name_ + '.pop();\n';
          break;
      }
      break;
    case 'random':
      switch (dropdown_type_) {
        case 'set':
          code = value_name_ + '[Math.floor(Math.random() * ' + value_name_ + '.length)] = ' + value_val_ + ';\n';
          break;
        case 'insert':
          code = value_name_ + '.splice(Math.floor(Math.random() * ' + value_name_ + '.length), 0, ' + value_val_ + ');\n';
          break;
        case 'remove':
          Blockly.JavaScript.provideFunction_('fn_lists_random_item', fn_lists_random_item);
          code = 'lists_random_item(' + value_name_ + ', true);'
          break;
      }
      break;
  }
  return code;
};

Blockly.JavaScript['lists_indexOf_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type_ = block.getFieldValue('type_');
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = value_name_ + '.' + dropdown_type_ + '(' + value_val_ + ') + 1';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

let fn_listsGetSortCompare =
  ['function listsGetSortCompare(type, direction) {',
    '  var compareFuncs = {',
    '    "NUMERIC": function(a, b) {',
    '        return parseFloat(a) - parseFloat(b); },',
    '    "TEXT": function(a, b) {',
    '        return a.toString() > b.toString() ? 1 : -1; },',
    '    "IGNORE_CASE": function(a, b) {',
    '        return a.toString().toLowerCase() > b.toString().toLowerCase() ? 1 : -1; },',
    '  };',
    '  var compare = compareFuncs[type];',
    '  return function(a, b) { return compare(a, b) * direction; }',
    '}'];

Blockly.JavaScript['lists_sort_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type1_ = block.getFieldValue('type1_');
  let dropdown_type2_ = block.getFieldValue('type2_');
  Blockly.JavaScript.provideFunction_('fn_listsGetSortCompare', fn_listsGetSortCompare);
  let code = value_name_ + '.slice().sort(listsGetSortCompare(\'' + dropdown_type1_ + '\',' + dropdown_type2_ + '))';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//修正文字積木錯誤

Blockly.JavaScript['text_indexOf_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type_ = block.getFieldValue('type_');
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = value_name_ + '.' + dropdown_type_ + '(' + value_val_ + ') + 1';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['text_charAt_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type_ = block.getFieldValue('type_');
  let value_num_ = Blockly.JavaScript.valueToCode(block, 'num_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  switch (dropdown_type_) {
    case 'num':
      code = value_name_ + '.charAt(' + value_num_ + ' - 1 )';
      break;
    case 'endnum':
      code = value_name_ + '.slice(' + value_num_ + ' * -1 ).charAt(0)';
      break;
    case 'first':
      code = value_name_ + '.charAt(0)';
      break;
    case 'last':
      code = value_name_ + '.slice(-1)';
      break;
    case 'random':
      code = value_name_ + '[Math.floor(Math.random() * ' + value_name_ + '.length)]';
      break;
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

let fn_text_get_substring = [
  'function fn_text_get_substring(text, where1, at1, where2, at2) {',
  '  function getAt(where, at) {',
  '    if (where == \'FROM_START\') {',
  '      at--;',
  '    } else if (where == \'FROM_END\') {',
  '      at = text.length - at;',
  '    } else if (where == \'FIRST\') {',
  '      at = 0;',
  '    } else if (where == \'LAST\') {',
  '      at = text.length - 1;',
  '    } else {',
  '      throw \'Unhandled option (text_getSubstring).\';',
  '    }',
  '    return at;',
  '  }',
  '  at1 = getAt(where1, at1);',
  '  at2 = getAt(where2, at2) + 1;',
  '  return text.slice(at1, at2);',
  '}'
];

Blockly.JavaScript['text_getSubstring_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type1_ = block.getFieldValue('type1_');
  let value_num1_ = Blockly.JavaScript.valueToCode(block, 'num1_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type2_ = block.getFieldValue('type2_');
  let value_num2_ = Blockly.JavaScript.valueToCode(block, 'num2_', Blockly.JavaScript.ORDER_ATOMIC);
  let code1, code2, code;
  Blockly.JavaScript.provideFunction_('fn_text_get_substring', fn_text_get_substring);
  switch (dropdown_type1_) {
    case 'num':
      code1 = 'FROM_START';
      break;
    case 'endnum':
      code1 = 'FROM_END';
      break;
    case 'first':
      code1 = 'FIRST';
      value_num1_ = 1;
      break;
  }
  switch (dropdown_type2_) {
    case 'num':
      code2 = 'FROM_START';
      break;
    case 'endnum':
      code2 = 'FROM_END';
      break;
    case 'last':
      code2 = 'LAST';
      value_num2_ = 1;
      break;
  }
  code = 'fn_text_get_substring(' + value_name_ + ',\'' + code1 + '\',' + value_num1_ + ',\'' + code2 + '\',' + value_num2_ + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['text_replace'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type_ = block.getFieldValue('type_');
  let value_input_ = Blockly.JavaScript.valueToCode(block, 'input_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_output_ = Blockly.JavaScript.valueToCode(block, 'output_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  switch (dropdown_type_) {
    case 'first':
      code = value_name_ + '.replace(' + value_input_ + ',' + value_output_ + ')';
      break;
    case 'all':
      code = value_name_ + '.replace((()=>{let replaceText = new RegExp(' + value_input_ + ' ,\'g\'); return replaceText;})(),' + value_output_ + ')';
      break;
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['text_append_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_text_ = Blockly.JavaScript.valueToCode(block, 'text_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = value_name_ + ' = String(' + value_name_ + ') + String(' + value_text_ + ');\n';
  return code;
};

Blockly.JavaScript['lists_split_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_mark_ = Blockly.JavaScript.valueToCode(block, 'mark_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type_ = block.getFieldValue('type_');
  let code = value_name_ + '.' + dropdown_type_ + '(' + value_mark_ + ')';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//長度積木

Blockly.JavaScript['lists_length_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = value_name_ + '.length';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['text_length_2'] = function (block) {
  let value_name_ = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = value_name_ + '.length';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//簡化鍵盤事件積木
Blockly.JavaScript['bit_document_keycode'] = function (block) {
  let dropdown_event_ = block.getFieldValue('event_');
  let dropdown_keycode_ = block.getFieldValue('keycode_');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  statements_do_ = statements_do_.replace('//_loop_', '_loop_');
  Blockly.JavaScript.provideFunction_('_bit_keyboard_status_', ['keyboardEvent();']);
  let code = '';
  if (statements_do_.indexOf('await') != -1) {
    code = 'var _' + dropdown_event_ + dropdown_keycode_ + '_ = false;\n' +
      dropdown_event_ + '[\'code' + dropdown_keycode_ + '\'] = async function(){\n' +
      '  if(!_' + dropdown_event_ + dropdown_keycode_ + '_){\n' +
      '    _' + dropdown_event_ + dropdown_keycode_ + '_ = true;\n' +
      statements_do_ +
      '  _' + dropdown_event_ + dropdown_keycode_ + '_ = false;\n' +
      '  }\n' +
      '};\n';
  } else {
    code = dropdown_event_ + '[\'code' + dropdown_keycode_ + '\'] = async function(){\n' +
      statements_do_ +
      '};\n';
  }
  return code;
};

/*
88 88b 88 88""Yb 88   88 888888
88 88Yb88 88__dP 88   88   88
88 88 Y88 88"""  Y8   8P   88
88 88  Y8 88     `YbodP'   88
*/

Blockly.JavaScript['input_text_async'] = function (block) {
  let code = 'await textInput();\n';
  return code;
};

Blockly.JavaScript['input_text_async_val'] = function (block) {
  let code = 'thisInputVal';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['input_text'] = function (block) {
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  let code = '$(\'#inputArea\').addClass(\'show\');\n' +
    '$(\'#input\').focus();\n' +
    '$(\'#input\').off(\'change\');\n' +
    '$(\'#input\').on(\'change\',async function(){\n' +
    '  $(\'#inputArea\').removeClass(\'show\');\n' +
    statements_do_ + '\n' +
    '  await delay(0.01);\n' +
    '  $(\'#input\').val(\'\');\n' +
    '});\n' +
    '$(\'#send\').on(\'click\',async function(){\n' +
    '  $(\'#input\').change();\n' +
    '});';
  return code;
};

Blockly.JavaScript['input_text_val'] = function (block) {
  let code = '$(this).val()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['speak_async'] = function (block) {
  let value_text_ = Blockly.JavaScript.valueToCode(block, 'text_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_setting_ = Blockly.JavaScript.valueToCode(block, 'setting_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (!value_setting_) {
    code = 'await speakAsync(' + value_text_ + ', [\'zh-TW\', 1, 1]);\n';
  } else {
    code = 'await speakAsync(' + value_text_ + ',[' + value_setting_ + ']);\n';
  }
  return code;
};

Blockly.JavaScript['speak_async_setting'] = function (block) {
  let dropdown_lang_ = block.getFieldValue('lang_');
  let dropdown_pitch_ = block.getFieldValue('pitch_');
  let dropdown_rate_ = block.getFieldValue('rate_');
  let code = '"' + dropdown_lang_ + '",' + dropdown_pitch_ + ',' + dropdown_rate_;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/*
 88""Yb  dP"Yb     db    88""Yb 8888b.
88__dP dP   Yb   dPYb   88__dP  8I  Yb
88""Yb Yb   dP  dP__Yb  88"Yb   8I  dY
88oodP  YbodP  dP""""Yb 88  Yb 8888Y"
*/

Blockly.JavaScript['board'] = function (block) {
  const dropdown_type_ = block.getFieldValue('type_');
  const value_device_ = block.getFieldValue('device_');
  const statements_callbacks_ = Blockly.JavaScript.statementToCode(block, 'callbacks_');
  let type, samplingInterval, detectTime;


  switch (dropdown_type_) {
    case 'bit':
      type = "{board: 'Bit', device: 'Webduino Bit', multi: true, transport: 'message', window: window.top.frames[0]}";
      samplingInterval = '100';
      detectTime = '0';
      break;
    case 'wifi':
      type = "{board: 'Bit', device: '" + value_device_ + "', transport: 'mqtt', multi: true" + Blockly.Msg.BIT_MQTT_SERVER + "}";
      samplingInterval = '250';
      detectTime = '2';
      break;
    case 'usb':
      type = "{board: 'Bit', url: '127.0.0.1:8080', multi: true }";
      samplingInterval = '100';
      detectTime = '0';
      break;
  }

  let code = 'boardReady(' + type + ',async function (board) {\n' +
    'let _board_ = await boardInit_(board, ' + samplingInterval + ', ' + detectTime + ');\n' +
    /* See `Blockly.JavaScript['workspaceToCode]` in code.js */
    '// sensor init' +
    statements_callbacks_ + '\n' +
    '});\n';
  return code;
};

/*
8b    d8    db    888888 88""Yb 88 Yb  dP
88b  d88   dPYb     88   88__dP 88  YbdP
88YbdP88  dP__Yb    88   88"Yb  88  dPYb
88 YY 88 dP""""Yb   88   88  Yb 88 dP  Yb
*/

let matrixColorChange = function (color) {
  let output = color.replace(/33/g, '44');
  return output;
}

Blockly.JavaScript['bit_matrix_color_single'] = function (block) {
  let value_led_ = Blockly.JavaScript.valueToCode(block, 'led_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_color_ = Blockly.JavaScript.valueToCode(block, 'color_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '_board_._bit_matrix_.setColor((' + value_led_ + ' - 1), ' + matrixColorChange(value_color_) + ');\n';
  return code;
};

Blockly.JavaScript['bit_matrix_brightness'] = function (block) {
  let value_brightness_ = Blockly.JavaScript.valueToCode(block, 'brightness_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '_board_._bit_matrix_.brightness(' + value_brightness_ + ');\n';
  return code;
};

Blockly.JavaScript['bit_matrix_off'] = function (block) {
  let code = '_board_._bit_matrix_.off();\n';
  return code;
};

Blockly.JavaScript['bit_matrix_character'] = function (block) {
  let value_char_ = Blockly.JavaScript.valueToCode(block, 'char_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_color_ = Blockly.JavaScript.valueToCode(block, 'color_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '_board_._bit_matrix_.setCharacter(' + value_char_ + ', ' + matrixColorChange(value_color_) + ');\n';
  return code;
};

Blockly.JavaScript['bit_matrix_string'] = function (block) {
  let value_str_ = Blockly.JavaScript.valueToCode(block, 'str_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_color_ = Blockly.JavaScript.valueToCode(block, 'color_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_speed_ = block.getFieldValue('speed_');
  let code = '_board_._bit_matrix_.setString(' + value_str_ + ', ' + matrixColorChange(value_color_) + ', ' + value_speed_ + ');\n';
  return code;
};

Blockly.JavaScript['bit_matrix_string_once'] = function (block) {
  let value_str_ = Blockly.JavaScript.valueToCode(block, 'str_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_color_ = Blockly.JavaScript.valueToCode(block, 'color_', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_type_ = block.getFieldValue('type_');
  let dropdown_speed_ = block.getFieldValue('speed_');
  let code;
  switch (dropdown_type_) {
    case '1':
      code = 'await _board_._bit_matrix_.setStringOnce(' + value_str_ + ', ' + matrixColorChange(value_color_) + ', ' + dropdown_speed_ + ');\n';
      break;
    case '2':
      code = '_board_._bit_matrix_.setString(' + value_str_ + ', ' + matrixColorChange(value_color_) + ', ' + dropdown_speed_ + ');\n';
      break;
  }
  return code;
};

Blockly.JavaScript['bit_matrix_color_output'] = function (block) {
  let value_color_input = Blockly.JavaScript.valueToCode(block, 'color_input', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '_board_._bit_matrix_.setColor(' + matrixColorChange(value_color_input) + ');\n';
  return code;
};


Blockly.JavaScript['bit_matrix_color_array'] = function (block) {
  let leds = '';
  let toHex = function (num) {
    let str = num.toString(16);
    if (parseInt(num) < 16) {
      str = '0' + str;
    }
    return str;
  };
  let getLedString = function (id, color) {
    return (toHex(id) + color.substring(1)).toLowerCase();
  };

  for (let i = 0; i < 25; i++) {
    let color = block.getFieldValue('led_' + i + '_');
    leds += getLedString(i, color);
  }
  let code = '"' + leds + '"';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bit_matrix_xy'] = function (block) {
  let value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  let value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  let value_color_input = Blockly.JavaScript.valueToCode(block, 'color_input', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  code = '_board_._bit_matrix_.setColor((' + value_x + ' - 1 + ( ' + value_y + ' - 1) * 5 ), ' + matrixColorChange(value_color_input) + ');\n';
  return code;
};

Blockly.JavaScript['bit_matrix_emoji'] = function (block) {
  let dropdown_emoji = block.getFieldValue('emoji');
  let colour_color = Blockly.JavaScript.valueToCode(block, 'color_input', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (dropdown_emoji == 'random') {
    code = 'matrixEmoji_(emojiList_[Math.floor(Math.random() * 60)],' + matrixColorChange(colour_color) + ')';
  } else {
    code = 'matrixEmoji_(\'' + dropdown_emoji + '\',' + matrixColorChange(colour_color) + ')';
  }
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/*
88""Yb 88   88 888888 888888  dP"Yb  88b 88
88__dP 88   88   88     88   dP   Yb 88Yb88
88""Yb Y8   8P   88     88   Yb   dP 88 Y88
88oodP `YbodP'   88     88    YbodP  88  Y8
*/

Blockly.JavaScript['bit_button_event'] = function (block) {
  const Buttons = ['_bit_btnA_', '_bit_btnB_', '_bit_2btn_'];
  let variable_var_ = block.getFieldValue('var_');
  let dropdown_event_ = block.getFieldValue('event_');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  statements_do_ = statements_do_.replace('//_loop_', '_loop_');

  let code;
  switch (variable_var_) {
    case Buttons[0]:
    case Buttons[1]:
      code = `btnEvent_(_board_.${variable_var_}, '${dropdown_event_}',
        async function () { ${statements_do_} }, [_board_.${Buttons[0]}, _board_.${Buttons[1]}]
        );`
      break;
    case Buttons[2]:
      code = `btnsEvent_('${dropdown_event_}',
        async function () { ${statements_do_} }, [_board_.${Buttons[0]}, _board_.${Buttons[1]}]
        );`;
    default:
      break;
  }

  return code;
};


/*
8888b.  888888 888888 888888  dP""b8 888888 888888 8888b.
 8I  Yb 88__     88   88__   dP   `"   88   88__    8I  Yb
 8I  dY 88""     88   88""   Yb        88   88""    8I  dY
8888Y"  888888   88   888888  YboodP   88   888888 8888Y"
*/

let fn_detectState = ['window._detectStart_ = true;'];

Blockly.JavaScript['bit_detected'] = function (block) {
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  Blockly.JavaScript.provideFunction_('fn_detectState', fn_detectState);
  let code = '(async function() {\n' +
    '  while(true){\n' +
    statements_do_ +
    '  await delay(0.1);\n' +
    '  }\n' +
    '})();\n';
  return code;
};

Blockly.JavaScript['bit_photocell_val'] = function (block) {
  let dropdown_name = block.getFieldValue('name_');
  let obj = {
    '_l_': 'left',
    '_r_': 'right'
  };
  let code = '_board_._bit_detected_val_.' + obj[dropdown_name];
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bit_temp_val'] = function (block) {
  let code = '_board_._bit_detected_val_.temp';
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['bit_detected_stop'] = function (block) {
  let code = '_bit_pRight_.off();\n' +
    '_bit_pLeft_.off();\n' +
    '_bit_temp_.off();\n';
  return code;
};


/*
88""Yb 88   88 8888P 8888P 888888 88""Yb
88__dP 88   88   dP    dP  88__   88__dP
88""Yb Y8   8P  dP    dP   88""   88"Yb
88oodP `YbodP' d8888 d8888 888888 88  Yb
*/

Blockly.JavaScript['buzzer_play_plus'] = function (block) {
  let value_tone_ = Blockly.JavaScript.valueToCode(block, 'tone_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_tempos_ = Blockly.JavaScript.valueToCode(block, 'tempos_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = 'await buzzerPlay_(_board_, [' + value_tone_ + '], [' + value_tempos_ + ']);\n';
  return code;
};

Blockly.JavaScript['buzzer_tone'] = function (block) {
  let dropdown_tone_ = block.getFieldValue('tone_');
  let code = '\'' + dropdown_tone_ + '\'';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['buzzer_tempo'] = function (block) {
  let dropdown_tempos_ = block.getFieldValue('tempos_');
  let code = dropdown_tempos_;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['buzzer_play_plus_mute'] = function (block) {
  let value_tempos_ = Blockly.JavaScript.valueToCode(block, 'tempos_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = 'await buzzerPlay_(_board_, [\'0\'],[' + value_tempos_ + ']);\n';
  return code;
};

Blockly.JavaScript['buzzer_play_plus_mute_tone'] = function (block) {
  var code = '\'0\'';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

//新版積木，合併 play 和音符節奏
Blockly.JavaScript['buzzer_play'] = function (block) {
  let dropdown_tone_ = block.getFieldValue('tone_');
  let dropdown_tempos_ = block.getFieldValue('tempos_');
  let code = 'await buzzerPlay_(_board_, [\'' + dropdown_tone_ + '\'],[' + dropdown_tempos_ + ']);\n';
  return code;
};

//新版積木，合併 play 和音符節奏
Blockly.JavaScript['buzzer_play_music'] = function (block) {
  let dropdown_music_ = block.getFieldValue('music_');
  let music;

  if (dropdown_music_ == 'm1') {
    music = ['["E7","E7","0","E7","0","C7","E7","0","G7","0","0","0","G6","0","0","0","C7","0","0","G6","0","0","E6","0","0","A6","0","B6","0","AS6","A6","0","G6","E7","0","G7","A7","0","F7","G7","0","E7","0","C7","D7","B6","0","0","C7","0","0","G6","0","0","E6","0","0","A6","0","B6","0","AS6","A6","0","G6","E7","0","G7","A7","0","F7","G7","0","E7","0","C7","D7","B6","0","0"]',
      '["8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8"]'];
  } else if (dropdown_music_ == 'm2') {
    music = ['["c4","e4","e4","0","e4","g4","g4","0","d4","f4","f4","0","a4","b4","b4","0","c4","d4","e4","c4","e4","c4","e4","0","d4","e4","f4","f4","e4","d4","f4","0","e4","f4","g4","e4","g4","e4","g4","0","f4","g4","a4","a4","g4","f4","a4","0","g4","c4","d4","e4","f4","g4","a4","0","a4","d4","e4","f4","g4","a4","b4","0","b4","e4","f4","g4","a4","b4","c5","0","c5","b4","a4","f4","b4","g4","c5"]',
      '["6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6"]'];
  } else if (dropdown_music_ == 'm3') {
    music = ['["C5","C5","G4","G4","A4","A4","G4","0","E4","G4","C5","A4","G4","0","0","A4","0","G4","0","E4","A4","G4","0","E4","0","G4","0","E4","D4","C4","0","E4","E4","G4","G4","A4","A4","G4","G4","0","D5","0","C5","A4","G4","A4","C5","G4","0","A4","A4","G4","A4","C5","G4","0","A4","A4","G4","A4","D5","C5"]',
      '["6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6", "6"]'];
  } else if (dropdown_music_ == 'm4') {
    music = ['["FS6","FS6","0","FS6","0","D6","FS6","0","B6","0","0","0","G6","0","0","0","G6","0","0","E6","0","0","C6","0","0","F6","0","G6","0","FS6","F6","0","E6","C7","0","E7","F7","0","D7","E7","0","C7","0","A6","B6","G6","0","0","G6","0","0","E6","0","0","C6","0","0","F6","0","G6","0","FS6","F6","0","E6","G6","0","E7","F7","0","D7","E7","0","C7","0","A6","B6","G6","0","0"]',
      '["8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "8"]'];
  } else if (dropdown_music_ == 'm5') {
    music = ['["E5","E5","E5","0","E5","E5","E5","0","E5","G5","C5","D5","E5","0","F5","F5","F5","F5","F5","E5","E5","0","E5","D5","D5","E5","D5","G5","0","G4","E5","D5","C5","G4","0","G4","E5","D5","C5","A4","0","A4","F5","E5","D5","B4","0","G5","G5","F5","D5","E5","C5","0","G4","E5","D5","C5","G4","0","G4","E5","D5","C5","A4","0","A4","F5","E5","D5","G5","G5","G5","G5","A5","G5","F5","D5","C5"]',
      '["8","8","8","8","8","8","8","8","8","8","6","8","8","6","8","8","8","8","8","8","8","6","8","8","8","8","4","8","6","8","8","8","8","5","5","8","8","8","8","5","5","8","8","8","8","5","5","8","8","8","8","5","5","5","8","8","8","8","5","5","8","8","8","8","5","5","8","8","8","8","8","8","8","8","8","8","8","8","8"]'];
  }
  let code = 'await buzzerPlay_(_board_, ' + music[0] + ', ' + music[1] + ');\n';
  return code;
};

//新版積木，合併 play 和音符節奏
Blockly.JavaScript['buzzer_play_mute'] = function (block) {
  let dropdown_tempos_ = block.getFieldValue('tempos_');
  let code = 'await buzzerPlay_(_board_, [\'0\'],[' + dropdown_tempos_ + ']);\n';
  return code;
};

//新版積木，合併 play 和音符節奏
Blockly.JavaScript['buzzer_play_event'] = function (block) {
  let dropdown_event_ = block.getFieldValue('event_');
  let obj = {
    '.stop()': 'stop',
    '.pause()': 'pause',
    '.play()': 'play'
  };
  let code = 'buzzerPlayEvent_(_board_, \'' + obj[dropdown_event_] + '\');\n';
  if (dropdown_event_ == '.stop()') {
    code = code + 'await delay(0.1);\n';
  }

  return code;
};


let fn_buzzer_music = '  let musicNotes = {};\n' +
  '  musicNotes.notes = [];\n' +
  '  musicNotes.tempos = [];\n' +
  '  if (m[0].notes.length > 1) {\n' +
  '    for (var i = 0; i < m.length; i++) {\n' +
  '      if (Array.isArray(m[i].notes)) {\n' +
  '        let cn = musicNotes.notes.concat(m[i].notes);\n' +
  '        musicNotes.notes = cn;\n' +
  '      } else {\n' +
  '        musicNotes.notes.push(m[i].notes);\n' +
  '      }\n' +
  '      if (Array.isArray(m[i].tempos)) {\n' +
  '        let ct = musicNotes.tempos.concat(m[i].tempos);\n' +
  '        musicNotes.tempos = ct;\n' +
  '      } else {\n' +
  '        musicNotes.tempos.push(m[i].tempos);\n' +
  '      }\n' +
  '    }\n' +
  '  } else {\n' +
  '    musicNotes.notes = [m[0].notes];\n' +
  '    musicNotes.tempos = [m[0].tempos];\n' +
  '  }\n' +
  '  return musicNotes;\n' +
  '}\n';

Blockly.JavaScript['buzzer_music'] = function (block) {
  let value_music_name_ = Blockly.JavaScript.valueToCode(block, 'music_name_', Blockly.JavaScript.ORDER_ATOMIC);
  let statements_music_ = Blockly.JavaScript.statementToCode(block, 'music_');
  let functionName = Blockly.JavaScript.provideFunction_(
    'buzzer_music', ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(m) {',
      fn_buzzer_music
    ]);
  let code = value_music_name_ + ' = ' + functionName + '([' + statements_music_ + ']);\n';

  return code;
};

Blockly.JavaScript['buzzer_music_play'] = function (block) {
  let statements_music_ = Blockly.JavaScript.statementToCode(block, 'music_');
  let code = '';

  if (statements_music_.indexOf('"') > 0) {
    code = 'await buzzerPlay_(buzzer_music([' + statements_music_ + ']).notes ,buzzer_music([' + statements_music_ + ']).tempos );\n';
  } else {
    var _vars = statements_music_.trim();
    _vars = _vars.substring(0, _vars.length - 1).split(',');
    var notes = _vars[0].split(':')[1];
    var tempos = _vars[1].split(':')[1];
    code = 'await buzzerPlay_(' + notes + ',' + tempos + ');\n';
  }
  return code;
};

Blockly.JavaScript['buzzer_notes_tempos'] = function (block) {
  let dropdown_tone_ = block.getFieldValue('tone_');
  let dropdown_tempos_ = block.getFieldValue('tempos_');
  let next = block.getNextBlock();
  let code;

  if (dropdown_tone_ == '0') {
    dropdown_pitch_ = '';
  }
  if (next === null) {
    code = '{notes:"' + dropdown_tone_ + '",tempos:"' + dropdown_tempos_ + '"}';
  } else {
    code = '{notes:"' + dropdown_tone_ + '",tempos:"' + dropdown_tempos_ + '"},';
  }
  return code;
};

Blockly.JavaScript['buzzer_mute'] = function (block) {
  let dropdown_tempos = block.getFieldValue('tempos_');
  let next = block.getNextBlock();
  let code;
  if (next === null) {
    code = '{notes:"0",tempos:"' + dropdown_tempos + '"}';
  } else {
    code = '{notes:"0",tempos:"' + dropdown_tempos + '"},';
  }
  return code;
};

Blockly.JavaScript['buzzer_event'] = function (block) {
  let variable_var_ = '_bit_buzzer_';
  let dropdown_event_ = block.getFieldValue('event_');
  let code = variable_var_ + dropdown_event_ + ';\n';

  return code;
};

Blockly.JavaScript['buzzer_state'] = function (block) {
  let variable_var_ = '_bit_buzzer_';
  let dropdown_state_ = block.getFieldValue('state_');
  let code = variable_var_ + '._state == "' + dropdown_state_ + '"';

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['buzzer_load_music'] = function (block) {
  let dropdown_music_ = block.getFieldValue('music_');
  let notes, tempos;
  let next = block.getNextBlock();

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
  let code;
  if (next === null) {
    code = '{notes:' + notes + ' , tempos:' + tempos + '}';
  } else {
    code = '{notes:' + notes + ' , tempos:' + tempos + '},';
  }
  return code;
};

/*
8b    d8 88""Yb 88   88 dP""Yb oP"Yb. 888888  dP"Yb
88b  d88 88__dP 88   88 Ybood8 "' dP' 88oo." dP   Yb
88YbdP88 88"""  Y8   8P   .8P'   dP'     `8b Yb   dP
88 YY 88 88     `YbodP'  .dP'  .d8888 8888P'  YbodP
*/

Blockly.JavaScript['mpu9250_detected'] = function (block) {
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  let code = '(async function(){\n' +
    '  while(true){\n' +
    statements_do_ +
    '  await delay(0.1);\n' +
    '  }\n' +
    '})();\n';

  return code;
};

let fn_mpu9250State = ['window._mpu9250Start_ = true;'];

Blockly.JavaScript['mpu9250_val'] = function (block) {
  let dropdown_val_ = block.getFieldValue('val_');
  let obj = {
    'angVals[0]': 'row',
    'angVals[1]': 'pitch',
    'angVals[2]': 'yaw',
    'aziVals[0]': 'azi',
    'accVals[0]': 'accX',
    'accVals[1]': 'accY',
    'accVals[2]': 'accZ',
    'gyrVals[0]': 'gyrX',
    'gyrVals[1]': 'gyrY',
    'gyrVals[2]': 'gyrZ',
    'magVals[0]': 'magX',
    'magVals[1]': 'magY',
    'magVals[2]': 'magZ'
  }
  let code;
  code = '_board_._bit_mpu9250_val_.' + obj[dropdown_val_];
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['mpu9250_stop'] = function (block) {
  let variable_name_ = '_bit_mpu9250_';
  let dropdown_type_ = block.getFieldValue('type_');
  let code = variable_name_ + '.off(' + dropdown_type_ + ');\n';
  return code;
};

Blockly.JavaScript['mpu9250_detected_type'] = function (block) {
  let dropdown_type_ = block.getFieldValue('type_');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  let fnName = {
    'row_forward': 'rowForward',
    'row_back': 'rowBack',
    'pitch_left': 'pitchLeft',
    'forward_pitch_left': 'turnLeft',
    'pitch_right': 'pitchRight',
    'forward_pitch_right': 'turnRight',
    'face_front': 'faceFront',
    'face_back': 'faceBack',
    'shake': 'shake',
    'peace': 'peace',
    'face_north': 'faceNorth',
    'face_south': 'faceSouth',
    'face_east': 'faceEast',
    'face_west': 'faceWest'
  };
  let code;
  statements_do_ = statements_do_.replace('//_loop_', '_loop_');
  code = 'mpu9250Fn_.' + fnName[dropdown_type_] + '(_board_, async function(){\n' +
    statements_do_ +
    '});\n';
  return code;
};

/*
8888b.  888888 8b    d8  dP"Yb
 8I  Yb 88__   88b  d88 dP   Yb
 8I  dY 88""   88YbdP88 Yb   dP
8888Y"  888888 88 YY 88  YbodP
*/


Blockly.JavaScript['demo_monster_click'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  statements_do_ = statements_do_.replace('//_loop_', '_loop_');
  let code = '$(\'#' + dropdown_name_ + '\').on(\'click\',async function(){\n' +
    statements_do_ +
    '});\n';
  return code;
};

Blockly.JavaScript['demo_monster_hover'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let statements_do1_ = Blockly.JavaScript.statementToCode(block, 'do1_');
  let statements_do2_ = Blockly.JavaScript.statementToCode(block, 'do2_');
  let code = '$(\'#' + dropdown_name_ + '\').hover(async function(){\n' +
    statements_do1_ +
    '},async function(){\n' +
    statements_do2_ +
    '});\n';
  return code;
};

let fn_monsterEmotionRandom =
  ['function math_random_int(a, b) {',
    '  if (a > b) {',
    '    var c = a;',
    '    a = b;',
    '    b = c;',
    '  }',
    '  return Math.floor(Math.random() * (b - a + 1) + a);',
    '}'];

Blockly.JavaScript['demo_monster_emotion'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let dropdown_type_ = block.getFieldValue('type_');
  let code;
  if (dropdown_name_ == 'all') {
    if (dropdown_type_ == 'random') {
      Blockly.JavaScript.provideFunction_('math_random_int', fn_monsterEmotionRandom);
      code = '$(\'#demoMonster01 .m-img\').attr(\'attr-emotion\',math_random_int(0,4));\n' +
        '$(\'#demoMonster02 .m-img\').attr(\'attr-emotion\',math_random_int(0,4));\n' +
        '$(\'#demoMonster03 .m-img\').attr(\'attr-emotion\',math_random_int(0,4));\n' +
        '$(\'#demoMonster04 .m-img\').attr(\'attr-emotion\',math_random_int(0,4));\n';
    } else {
      code = '$(\'#demoMonster01 .m-img\').attr(\'attr-emotion\',\'' + dropdown_type_ + '\');\n' +
        '$(\'#demoMonster02 .m-img\').attr(\'attr-emotion\',\'' + dropdown_type_ + '\');\n' +
        '$(\'#demoMonster03 .m-img\').attr(\'attr-emotion\',\'' + dropdown_type_ + '\');\n' +
        '$(\'#demoMonster04 .m-img\').attr(\'attr-emotion\',\'' + dropdown_type_ + '\');\n';

    }
  } else {
    if (dropdown_type_ == 'random') {
      Blockly.JavaScript.provideFunction_('math_random_int', fn_monsterEmotionRandom);
      code = '$(\'#' + dropdown_name_ + ' .m-img\').attr(\'attr-emotion\',math_random_int(0,4));\n';
    } else {
      code = '$(\'#' + dropdown_name_ + ' .m-img\').attr(\'attr-emotion\',\'' + dropdown_type_ + '\');\n';
    }
  }
  return code;
};

Blockly.JavaScript['demo_monster_zindex'] = function (block) {
  var dropdown_name_ = block.getFieldValue('name_');
  var dropdown_level_ = block.getFieldValue('level_');
  var code = '$(\'#' + dropdown_name_ + '\').indexLevel(' + dropdown_level_ + ');\n';
  return code;
};

Blockly.JavaScript['demo_monster_talk'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').talk(' + value_val_ + ');\n' +
      '$(\'#demoMonster02\').talk(' + value_val_ + ');\n' +
      '$(\'#demoMonster03\').talk(' + value_val_ + ');\n' +
      '$(\'#demoMonster04\').talk(' + value_val_ + ');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').talk(' + value_val_ + ');\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_dont_talk'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').talk(\'\');\n' +
      '$(\'#demoMonster02\').talk(\'\');\n' +
      '$(\'#demoMonster03\').talk(\'\');\n' +
      '$(\'#demoMonster04\').talk(\'\');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').talk(\'\');\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_show_image'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let value_img_ = Blockly.JavaScript.valueToCode(block, 'img_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').talk(' + value_img_ + ');\n' +
      '$(\'#demoMonster02\').talk(' + value_img_ + ');\n' +
      '$(\'#demoMonster03\').talk(' + value_img_ + ');\n' +
      '$(\'#demoMonster04\').talk(' + value_img_ + ');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').talk(' + value_img_ + ');\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_rotate'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let dropdown_rotate_ = block.getFieldValue('rotate_');
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').rotate(\'' + dropdown_rotate_ + '\',' + value_val_ + ');\n' +
      '$(\'#demoMonster02\').rotate(\'' + dropdown_rotate_ + '\',' + value_val_ + ');\n' +
      '$(\'#demoMonster03\').rotate(\'' + dropdown_rotate_ + '\',' + value_val_ + ');\n' +
      '$(\'#demoMonster04\').rotate(\'' + dropdown_rotate_ + '\',' + value_val_ + ');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').rotate(\'' + dropdown_rotate_ + '\',' + value_val_ + ');\n';
  }
  return code;
};


Blockly.JavaScript['demo_monster_faceto'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').faceTo(' + value_val_ + ');\n' +
      '$(\'#demoMonster02\').faceTo(' + value_val_ + ');\n' +
      '$(\'#demoMonster03\').faceTo(' + value_val_ + ');\n' +
      '$(\'#demoMonster04\').faceTo(' + value_val_ + ');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').faceTo(' + value_val_ + ');\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_face_mouse'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let dropdown_type_ = block.getFieldValue('type_');
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').faceToMouse(\'' + dropdown_type_ + '\');\n' +
      '$(\'#demoMonster02\').faceToMouse(\'' + dropdown_type_ + '\');\n' +
      '$(\'#demoMonster03\').faceToMouse(\'' + dropdown_type_ + '\');\n' +
      '$(\'#demoMonster04\').faceToMouse(\'' + dropdown_type_ + '\');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').faceToMouse(\'' + dropdown_type_ + '\');\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_background_color'] = function (block) {
  let value_color_ = Blockly.JavaScript.valueToCode(block, 'color_', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '$(\'#bg\').css({\'background\':' + value_color_ + '}).html(\'\');\n';
  return code;
};

Blockly.JavaScript['demo_monster_background_image'] = function (block) {
  let value_image_ = Blockly.JavaScript.valueToCode(block, 'image_', Blockly.JavaScript.ORDER_ATOMIC);
  let appendHtml;
  if (value_image_.indexOf('\'') != -1 || value_image_.indexOf('"') != -1) {
    value_image_ = value_image_.replace(/\'/g, '');
    value_image_ = value_image_.replace(/"/g, '');
    appendHtml = '"<img src=\'' + value_image_ + '\'>"';
  } else {
    appendHtml = '\'<img src=\'+' + value_image_ + '+\'>\'';
  }
  let code = '$(\'#bg\').css({\'background\':\'#fff\'}).html(' + appendHtml + ');\n';
  return code;
};

let fn_monsterRebound =
  ['let _rebound_ = {',
    '  demoMonster01 : {x:1, y:1},',
    '  demoMonster02 : {x:1, y:1},',
    '  demoMonster03 : {x:1, y:1},',
    '  demoMonster04 : {x:1, y:1},',
    '};'
  ];

Blockly.JavaScript['demo_monster_move'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let dropdown_move_ = block.getFieldValue('move_');
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  Blockly.JavaScript.provideFunction_('fn_monsterRebound', fn_monsterRebound);
  let code;

  switch (dropdown_move_) {
    case 'bottom':
      if (dropdown_name_ == 'all') {
        code = '$(\'#demoMonster01\').move(\'y\',' + value_val_ + ', _rebound_.demoMonster01.y);\n' +
          '$(\'#demoMonster02\').move(\'y\',' + value_val_ + ', _rebound_.demoMonster02.y);\n' +
          '$(\'#demoMonster03\').move(\'y\',' + value_val_ + ', _rebound_.demoMonster03.y);\n' +
          '$(\'#demoMonster04\').move(\'y\',' + value_val_ + ', _rebound_.demoMonster04.y);\n';
      } else {
        code = '$(\'#' + dropdown_name_ + '\').move(\'y\',' + value_val_ + ', _rebound_.' + dropdown_name_ + '.y);\n';
      }
      break;
    case 'top':
      if (dropdown_name_ == 'all') {
        code = '$(\'#demoMonster01\').move(\'y\',(' + value_val_ + '*-1), _rebound_.demoMonster01.y);\n' +
          '$(\'#demoMonster02\').move(\'y\',(' + value_val_ + '*-1), _rebound_.demoMonster02.y);\n' +
          '$(\'#demoMonster03\').move(\'y\',(' + value_val_ + '*-1), _rebound_.demoMonster03.y);\n' +
          '$(\'#demoMonster04\').move(\'y\',(' + value_val_ + '*-1), _rebound_.demoMonster04.y);\n';
      } else {
        code = '$(\'#' + dropdown_name_ + '\').move(\'y\',(' + value_val_ + '*-1), _rebound_.' + dropdown_name_ + '.y);\n';
      }
      break;
    case 'left':
      if (dropdown_name_ == 'all') {
        code = '$(\'#demoMonster01\').move(\'x\',(' + value_val_ + '*-1), _rebound_.demoMonster01.x);\n' +
          '$(\'#demoMonster02\').move(\'x\',(' + value_val_ + '*-1), _rebound_.demoMonster02.x);\n' +
          '$(\'#demoMonster03\').move(\'x\',(' + value_val_ + '*-1), _rebound_.demoMonster03.x);\n' +
          '$(\'#demoMonster04\').move(\'x\',(' + value_val_ + '*-1), _rebound_.demoMonster04.x);\n';
      } else {
        code = '$(\'#' + dropdown_name_ + '\').move(\'x\',(' + value_val_ + '*-1), _rebound_.' + dropdown_name_ + '.x);\n';
      }
      break;
    case 'right':
      if (dropdown_name_ == 'all') {
        code = '$(\'#demoMonster01\').move(\'x\',' + value_val_ + ', _rebound_.demoMonster01.x);\n' +
          '$(\'#demoMonster02\').move(\'x\',' + value_val_ + ', _rebound_.demoMonster02.x);\n' +
          '$(\'#demoMonster03\').move(\'x\',' + value_val_ + ', _rebound_.demoMonster03.x);\n' +
          '$(\'#demoMonster04\').move(\'x\',' + value_val_ + ', _rebound_.demoMonster04.x);\n';
      } else {
        code = '$(\'#' + dropdown_name_ + '\').move(\'x\',' + value_val_ + ', _rebound_.' + dropdown_name_ + '.x);\n';
      }
      break;
    case 'mouse':
      if (dropdown_name_ == 'all') {
        code = '$(\'#demoMonster01\').moveToMouse(' + value_val_ + ');\n' +
          '$(\'#demoMonster02\').moveToMouse(' + value_val_ + ');\n' +
          '$(\'#demoMonster03\').moveToMouse(' + value_val_ + ');\n' +
          '$(\'#demoMonster04\').moveToMouse(' + value_val_ + ');\n';
      } else {
        code = '$(\'#' + dropdown_name_ + '\').moveToMouse(' + value_val_ + ');\n';
      }
      break;
    case 'random':
      if (dropdown_name_ == 'all') {
        code = '$(\'#demoMonster01\').moveRandom(' + value_val_ + ', _rebound_.demoMonster01.x,  _rebound_.demoMonster01.y);\n' +
          '$(\'#demoMonster02\').moveRandom(' + value_val_ + ', _rebound_.demoMonster02.x,  _rebound_.demoMonster02.y);\n' +
          '$(\'#demoMonster03\').moveRandom(' + value_val_ + ', _rebound_.demoMonster03.x,  _rebound_.demoMonster03.y);\n' +
          '$(\'#demoMonster04\').moveRandom(' + value_val_ + ', _rebound_.demoMonster04.x,  _rebound_.demoMonster04.y);\n';
      } else {
        code = '$(\'#' + dropdown_name_ + '\').moveRandom(' + value_val_ + ', _rebound_.' + dropdown_name_ + '.x,  _rebound_.' + dropdown_name_ + '.y);\n';
      }
      break;
  }
  return code;
};

Blockly.JavaScript['demo_monster_moveto'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let value_x_ = Blockly.JavaScript.valueToCode(block, 'x_', Blockly.JavaScript.ORDER_ATOMIC);
  let value_y_ = Blockly.JavaScript.valueToCode(block, 'y_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').moveTo((' + value_x_ + ' - $(\'#demoMonster01\').width()/2),($(window).height() - $(\'#demoMonster01\').height()/2 - ' + value_y_ + '));\n' +
      '$(\'#demoMonster02\').moveTo((' + value_x_ + ' - $(\'#demoMonster02\').width()/2),($(window).height() - $(\'#demoMonster02\').height()/2 - ' + value_y_ + '));\n' +
      '$(\'#demoMonster03\').moveTo((' + value_x_ + ' - $(\'#demoMonster03\').width()/2),($(window).height() - $(\'#demoMonster03\').height()/2 - ' + value_y_ + '));\n' +
      '$(\'#demoMonster04\').moveTo((' + value_x_ + ' - $(\'#demoMonster04\').width()/2),($(window).height() - $(\'#demoMonster04\').height()/2 - ' + value_y_ + '));\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').moveTo((' + value_x_ + ' - $(\'#' + dropdown_name_ + '\').width()/2),($(window).height() - $(\'#' + dropdown_name_ + '\').height()/2 - ' + value_y_ + '));\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_size'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let dropdown_type_ = block.getFieldValue('type_');
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').size(\'' + dropdown_type_ + '\',' + value_val_ + ');\n' +
      '$(\'#demoMonster02\').size(\'' + dropdown_type_ + '\',' + value_val_ + ');\n' +
      '$(\'#demoMonster03\').size(\'' + dropdown_type_ + '\',' + value_val_ + ');\n' +
      '$(\'#demoMonster04\').size(\'' + dropdown_type_ + '\',' + value_val_ + ');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').size(\'' + dropdown_type_ + '\',' + value_val_ + ');\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_sizeto'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let value_val_ = Blockly.JavaScript.valueToCode(block, 'val_', Blockly.JavaScript.ORDER_ATOMIC);
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').sizeTo(' + value_val_ + ');\n' +
      '$(\'#demoMonster02\').sizeTo(' + value_val_ + ');\n' +
      '$(\'#demoMonster03\').sizeTo(' + value_val_ + ');\n' +
      '$(\'#demoMonster04\').sizeTo(' + value_val_ + ');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').sizeTo(' + value_val_ + ');\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_display'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let dropdown_type_ = block.getFieldValue('type_');
  let code;
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').display(\'' + dropdown_type_ + '\');\n' +
      '$(\'#demoMonster02\').display(\'' + dropdown_type_ + '\');\n' +
      '$(\'#demoMonster03\').display(\'' + dropdown_type_ + '\');\n' +
      '$(\'#demoMonster04\').display(\'' + dropdown_type_ + '\');\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').display(\'' + dropdown_type_ + '\');\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_state'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let dropdown_state_ = block.getFieldValue('state_');
  let code;
  switch (dropdown_state_) {
    case 'x':
      code = '$(\'#' + dropdown_name_ + '\').xyPoint(\'x\')';
      break;
    case 'y':
      code = '$(\'#' + dropdown_name_ + '\').xyPoint(\'y\')';
      break;
    case 'deg':
      code = 'JSON.parse(localStorage.monsterData).' + dropdown_name_ + '.deg';
      break;
  }
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['demo_monster_stage_rebound'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  Blockly.JavaScript.provideFunction_('fn_monsterRebound', fn_monsterRebound);
  let code;
  if (dropdown_name_ == 'all') {
    code = 'if ($(\'#demoMonster01\').offset().top < 0) {\n' +
      '  $(\'#demoMonster01\').moveTo($(\'#demoMonster01\').offset().left, 0);\n' +
      '  _rebound_.demoMonster01.y = _rebound_.demoMonster01.y * -1;\n' +
      '} else if (($(\'#demoMonster01\').offset().top + $(\'#demoMonster01\').height()) >= $(window).height()) {\n' +
      '  $(\'#demoMonster01\').moveTo($(\'#demoMonster01\').offset().left, $(window).height() - $(\'#demoMonster01\').height());\n' +
      '  _rebound_.demoMonster01.y = _rebound_.demoMonster01.y * -1;\n' +
      '}\n' +
      'if ($(\'#demoMonster01\').offset().left < 0) {\n' +
      '  $(\'#demoMonster01\').moveTo(0, $(\'#demoMonster01\').offset().top);\n' +
      '  _rebound_.demoMonster01.x = _rebound_.demoMonster01.x * -1;\n' +
      '} else if (($(\'#demoMonster01\').offset().left + $(\'#demoMonster01\').width()) >= $(window).width()) {\n' +
      '  $(\'#demoMonster01\').moveTo($(window).width() - $(\'#demoMonster01\').width(), $(\'#demoMonster01\').offset().top);\n' +
      '  _rebound_.demoMonster01.x = _rebound_.demoMonster01.x * -1;\n' +
      '}\n' +
      'if ($(\'#demoMonster02\').offset().top < 0) {\n' +
      '  $(\'#demoMonster02\').moveTo($(\'#demoMonster02\').offset().left, 0);\n' +
      '  _rebound_.demoMonster02.y = _rebound_.demoMonster02.y * -1;\n' +
      '} else if (($(\'#demoMonster02\').offset().top + $(\'#demoMonster02\').height()) >= $(window).height()) {\n' +
      '  $(\'#demoMonster02\').moveTo($(\'#demoMonster02\').offset().left, $(window).height() - $(\'#demoMonster02\').height());\n' +
      '  _rebound_.demoMonster02.y = _rebound_.demoMonster02.y * -1;\n' +
      '}\n' +
      'if ($(\'#demoMonster02\').offset().left < 0) {\n' +
      '  $(\'#demoMonster02\').moveTo(0, $(\'#demoMonster02\').offset().top);\n' +
      '  _rebound_.demoMonster02.x = _rebound_.demoMonster02.x * -1;\n' +
      '} else if (($(\'#demoMonster02\').offset().left + $(\'#demoMonster02\').width()) >= $(window).width()) {\n' +
      '  $(\'#demoMonster02\').moveTo($(window).width() - $(\'#demoMonster02\').width(), $(\'#demoMonster02\').offset().top);\n' +
      '  _rebound_.demoMonster02.x = _rebound_.demoMonster02.x * -1;\n' +
      '}\n' +
      'if ($(\'#demoMonster03\').offset().top < 0) {\n' +
      '  $(\'#demoMonster03\').moveTo($(\'#demoMonster03\').offset().left, 0);\n' +
      '  _rebound_.demoMonster03.y = _rebound_.demoMonster03.y * -1;\n' +
      '} else if (($(\'#demoMonster03\').offset().top + $(\'#demoMonster03\').height()) >= $(window).height()) {\n' +
      '  $(\'#demoMonster03\').moveTo($(\'#demoMonster03\').offset().left, $(window).height() - $(\'#demoMonster03\').height());\n' +
      '  _rebound_.demoMonster03.y = _rebound_.demoMonster03.y * -1;\n' +
      '}\n' +
      'if ($(\'#demoMonster03\').offset().left < 0) {\n' +
      '  $(\'#demoMonster03\').moveTo(0, $(\'#demoMonster03\').offset().top);\n' +
      '  _rebound_.demoMonster03.x = _rebound_.demoMonster03.x * -1;\n' +
      '} else if (($(\'#demoMonster03\').offset().left + $(\'#demoMonster03\').width()) >= $(window).width()) {\n' +
      '  $(\'#demoMonster03\').moveTo($(window).width() - $(\'#demoMonster03\').width(), $(\'#demoMonster03\').offset().top);\n' +
      '  _rebound_.demoMonster03.x = _rebound_.demoMonster03.x * -1;\n' +
      '}\n' +
      'if ($(\'#demoMonster04\').offset().top < 0) {\n' +
      '  $(\'#demoMonster04\').moveTo($(\'#demoMonster04\').offset().left, 0);\n' +
      '  _rebound_.demoMonster04.y = _rebound_.demoMonster04.y * -1;\n' +
      '} else if (($(\'#demoMonster04\').offset().top + $(\'#demoMonster04\').height()) >= $(window).height()) {\n' +
      '  $(\'#demoMonster04\').moveTo($(\'#demoMonster04\').offset().left, $(window).height() - $(\'#demoMonster04\').height());\n' +
      '  _rebound_.demoMonster04.y = _rebound_.demoMonster04.y * -1;\n' +
      '}\n' +
      'if ($(\'#demoMonster04\').offset().left < 0) {\n' +
      '  $(\'#demoMonster04\').moveTo(0, $(\'#demoMonster04\').offset().top);\n' +
      '  _rebound_.demoMonster04.x = _rebound_.demoMonster04.x * -1;\n' +
      '} else if (($(\'#demoMonster04\').offset().left + $(\'#demoMonster04\').width()) >= $(window).width()) {\n' +
      '  $(\'#demoMonster04\').moveTo($(window).width() - $(\'#demoMonster04\').width(), $(\'#demoMonster04\').offset().top);\n' +
      '  _rebound_.demoMonster04.x = _rebound_.demoMonster04.x * -1;\n' +
      '};';
  } else {
    code = 'if($(\'#' + dropdown_name_ + '\').offset().top < 0){\n' +
      '  $(\'#' + dropdown_name_ + '\').moveTo($(\'#' + dropdown_name_ + '\').offset().left, 0);' +
      '  _rebound_.' + dropdown_name_ + '.y = _rebound_.' + dropdown_name_ + '.y * -1;\n' +
      '}else if(($(\'#' + dropdown_name_ + '\').offset().top + $(\'#' + dropdown_name_ + '\').height()) >= $(window).height()){\n' +
      '  $(\'#' + dropdown_name_ + '\').moveTo($(\'#' + dropdown_name_ + '\').offset().left, $(window).height()-$(\'#' + dropdown_name_ + '\').height());' +
      '  _rebound_.' + dropdown_name_ + '.y = _rebound_.' + dropdown_name_ + '.y * -1;\n' +
      '}\n' +
      'if($(\'#' + dropdown_name_ + '\').offset().left < 0 ){\n' +
      '  $(\'#' + dropdown_name_ + '\').moveTo(0, $(\'#' + dropdown_name_ + '\').offset().top);' +
      '  _rebound_.' + dropdown_name_ + '.x = _rebound_.' + dropdown_name_ + '.x * -1;\n' +
      '}else if(($(\'#' + dropdown_name_ + '\').offset().left + $(\'#' + dropdown_name_ + '\').width()) >= $(window).width()){\n' +
      '  $(\'#' + dropdown_name_ + '\').moveTo($(window).width()-$(\'#' + dropdown_name_ + '\').width(),$(\'#' + dropdown_name_ + '\').offset().top);' +
      '  _rebound_.' + dropdown_name_ + '.x = _rebound_.' + dropdown_name_ + '.x * -1;\n' +
      '}\n';
  }
  return code;
};

Blockly.JavaScript['demo_monster_stage'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let dropdown_stage_ = block.getFieldValue('stage_');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  statements_do_ = statements_do_.replace('//_loop_', '_loop_');
  let code;
  switch (dropdown_stage_) {
    case 'edge':
      code = 'if($(\'#' + dropdown_name_ + '\').offset().left <= 0 || ($(\'#' + dropdown_name_ + '\').offset().left + $(\'#' + dropdown_name_ + '\').width()) >= $(window).width() || $(\'#' + dropdown_name_ + '\').offset().top <=0 || ($(\'#' + dropdown_name_ + '\').offset().top + $(\'#' + dropdown_name_ + '\').height()) >= $(window).height()){\n' +
        statements_do_ +
        '}\n';
      break;
    case 'topOrBottom':
      code = 'if($(\'#' + dropdown_name_ + '\').offset().top <=0 || ($(\'#' + dropdown_name_ + '\').offset().top + $(\'#' + dropdown_name_ + '\').height()) >= $(window).height()){\n' +
        statements_do_ +
        '}\n';
      break;
    case 'letOrRight':
      code = 'if($(\'#' + dropdown_name_ + '\').offset().left <= 0 || ($(\'#' + dropdown_name_ + '\').offset().left + $(\'#' + dropdown_name_ + '\').width()) >= $(window).width()){\n' +
        statements_do_ +
        '}\n';
      break;
      break;
    case 'top':
      code = 'if($(\'#' + dropdown_name_ + '\').offset().top <=0){\n' +
        statements_do_ +
        '}\n';
      break;
    case 'bottom':
      code = 'if(($(\'#' + dropdown_name_ + '\').offset().top + $(\'#' + dropdown_name_ + '\').height()) >= $(window).height()){\n' +
        statements_do_ +
        '}\n';
      break;
    case 'left':
      code = 'if($(\'#' + dropdown_name_ + '\').offset().left <= 0){\n' +
        statements_do_ +
        '}\n';
      break;
    case 'right':
      code = 'if(($(\'#' + dropdown_name_ + '\').offset().left + $(\'#' + dropdown_name_ + '\').width()) >= $(window).width()){\n' +
        statements_do_ +
        '}\n';
      break;
  }
  return code;
};

Blockly.JavaScript['demo_monster_reset'] = function (block) {
  let dropdown_name_ = block.getFieldValue('name_');
  let code
  if (dropdown_name_ == 'all') {
    code = '$(\'#demoMonster01\').reset();\n' +
      '$(\'#demoMonster02\').reset();\n' +
      '$(\'#demoMonster03\').reset();\n' +
      '$(\'#demoMonster04\').reset();\n';
  } else {
    code = '$(\'#' + dropdown_name_ + '\').reset();\n';
  }
  return code;
};

let fn_delayFirst = ['await delay(0.1);'];

Blockly.JavaScript['demo_monster_collision'] = function (block) {
  let dropdown_m1_ = block.getFieldValue('m1_');
  let dropdown_m2_ = block.getFieldValue('m2_');
  let statements_do_ = Blockly.JavaScript.statementToCode(block, 'do_');
  statements_do_ = statements_do_.replace('//_loop_', '_loop_');
  let code = '$(\'#' + dropdown_m1_ + '\').collision($(\'#' + dropdown_m2_ + '\'),async function(){' + statements_do_ + '});\n';
  return code;
};

Blockly.JavaScript['demo_monster_stage_max'] = function (block) {
  let code = 'let demoStage = window.parent.document.getElementById(\'demo-area\');\n' +
    'let demoStageResizeBtn = window.parent.document.getElementById(\'demo-resize-btn\');\n' +
    'if(demoStage.className.indexOf(\'max\')==-1){\n' +
    '  demoStageResizeBtn.click();\n' +
    '}\n';
  return code;
};


Blockly.JavaScript['demo_monster_stage_size'] = function (block) {
  let dropdown_type_ = block.getFieldValue('type_');
  let code = '$(window).' + dropdown_type_ + '()';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

let fn_sound_load = [
  '$(\'.sound\').each(function(){',
  '  let s = $(this).attr(\'data-src\');',
  '  $(this).attr(\'src\',s);',
  '});'
];

/*
.dP"Y8  dP"Yb  88   88 88b 88 8888b.
`Ybo." dP   Yb 88   88 88Yb88  8I  Yb
o.`Y8b Yb   dP Y8   8P 88 Y88  8I  dY
8bodP'  YbodP  `YbodP' 88  Y8 8888Y"
*/

let fn_lists_sound_01 =
  ['var sound_list_01 = [',
    '\'cat-01\',',
    '\'dog-01\',',
    '\'lion-01\',',
    '\'goat-01\',',
    '\'elephant-01\',',
    '\'chicken-01\',',
    '\'chicken-02\',',
    '\'monkey-01\',',
    '\'duck-01\',',
    '\'frog-01\',',
    '\'mouse-01\',',
    '\'pig-01\'',
    '];'];

Blockly.JavaScript['sound_01'] = function (block) {
  let dropdown_sound_ = block.getFieldValue('sound_');
  Blockly.JavaScript.provideFunction_('fn_sound_load', fn_sound_load);
  let code;
  if (dropdown_sound_ == 'random') {
    Blockly.JavaScript.provideFunction_('fn_lists_random_item', fn_lists_random_item);
    Blockly.JavaScript.provideFunction_('fn_lists_sound_01', fn_lists_sound_01);
    code = '$(\'.sound.\'+lists_random_item(sound_list_01, false))[0].play();\n';
  } else {
    code =
      code = '$(\'.sound.' + dropdown_sound_ + '\')[0].pause();\n' +
      '$(\'.sound.' + dropdown_sound_ + '\')[0].currentTime = 0;\n' +
      '$(\'.sound.' + dropdown_sound_ + '\')[0].play();\n';
  }
  return code;
};

let fn_lists_sound_02 =
  ['var sound_list_02 = [',
    '\'sound-01\',',
    '\'sound-02\',',
    '\'sound-03\',',
    '\'sound-04\',',
    '\'sound-05\',',
    '\'sound-06\',',
    '\'sound-08\',',
    '\'sound-07\',',
    '\'sound-09\',',
    '\'sound-10\',',
    '\'sound-11\',',
    '\'coin-01\',',
    '\'jump-01\',',
    '\'death-01\',',
    '\'bell-01\'',
    '];'];

Blockly.JavaScript['sound_02'] = function (block) {
  let dropdown_sound_ = block.getFieldValue('sound_');
  Blockly.JavaScript.provideFunction_('fn_sound_load', fn_sound_load);
  let code;
  if (dropdown_sound_ == 'random') {
    Blockly.JavaScript.provideFunction_('fn_lists_random_item', fn_lists_random_item);
    Blockly.JavaScript.provideFunction_('fn_lists_sound_02', fn_lists_sound_02);
    code = '$(\'.sound.\'+lists_random_item(sound_list_02, false))[0].play();\n';
  } else {
    code =
      code = '$(\'.sound.' + dropdown_sound_ + '\')[0].pause();\n' +
      '$(\'.sound.' + dropdown_sound_ + '\')[0].currentTime = 0;\n' +
      '$(\'.sound.' + dropdown_sound_ + '\')[0].play();\n';
  }
  return code;
};

let fn_lists_sound_03 =
  ['var sound_list_03 = [',
    '\'sneeze-01\',',
    '\'laugth-01\',',
    '\'cough-01\',',
    '\'kiss-01\',',
    '\'applaud-01\',',
    '\'cry-01\',',
    '\'fart-01\',',
    '\'whistle-01\',',
    '\'snore-01\',',
    '\'sigh-01\',',
    '\'sigh-02\'',
    '];'];

Blockly.JavaScript['sound_03'] = function (block) {
  let dropdown_sound_ = block.getFieldValue('sound_');
  Blockly.JavaScript.provideFunction_('fn_sound_load', fn_sound_load);
  let code;
  if (dropdown_sound_ == 'random') {
    Blockly.JavaScript.provideFunction_('fn_lists_random_item', fn_lists_random_item);
    Blockly.JavaScript.provideFunction_('fn_lists_sound_03', fn_lists_sound_03);
    code = '$(\'.sound.\'+lists_random_item(sound_list_03, false))[0].play();\n';
  } else {
    code =
      code = '$(\'.sound.' + dropdown_sound_ + '\')[0].pause();\n' +
      '$(\'.sound.' + dropdown_sound_ + '\')[0].currentTime = 0;\n' +
      '$(\'.sound.' + dropdown_sound_ + '\')[0].play();\n';
  }
  return code;
};


/*
.dP"Y8 88""Yb 888888 888888  dP""b8 88  88
`Ybo." 88__dP 88__   88__   dP   `" 88  88
o.`Y8b 88"""  88""   88""   Yb      888888
8bodP' 88     888888 888888  YboodP 88  88
*/

Blockly.JavaScript['speech_recognition'] = function (block) {
  let dropdown_lang_ = block.getFieldValue('lang_');
  let code = 'await speechRecognition(\'' + dropdown_lang_ + '\');\n';
  return code;
};

Blockly.JavaScript['speech_recognition_value'] = function (block) {
  var code = 'speechValue_';
  return [code, Blockly.JavaScript.ORDER_NONE];
};



Blockly.JavaScript['pin_read_digital'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var code = 'await Pin.init(board, ' + pin + ', 0).read()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['pin_read_analog'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var code = 'await Pin.init(board, ' + pin + ', 2).read()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['pin_write_digital'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var value = Blockly.JavaScript.valueToCode(block, 'value_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Pin.init(board, ' + pin + ', 1).write(' + value + ');\n';
  return code;
};

Blockly.JavaScript['pin_write_analog'] = function (block) {
  var pin = block.getFieldValue('pin_');
  var value = Blockly.JavaScript.valueToCode(block, 'value_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Pin.init(board, ' + pin + ', 3).write(' + value + ');\n';
  return code;
};