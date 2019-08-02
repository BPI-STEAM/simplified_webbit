'use strict';

goog.provide('Blockly.Blocks.blockly-edu');
goog.require('Blockly.Blocks');

var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/webbit/';
var utmUrl = '?utm_source=webbit&utm_medium=contextMenu&utm_campaign=tutorials';


Blockly.Blocks['variables_change'] = {
  init: function () {
    this.appendValueInput("var_")
      .setCheck(null)
      .appendField(new Blockly.FieldVariable(Blockly.Msg.BIT_VARIABLES), "name_")
      .appendField(Blockly.Msg.BIT_VARIABLES_CHANGE, "改變");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_VARIABLES_CHANGE_HELPURL);
  }
};

//把一些分散的邏輯集中到邏輯區塊內
Blockly.Blocks['logic_is_empty'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_LOGIC_IS_EMPTY, "為空 ( 沒有值 )");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_LOGIC_IS_EMPTY_HELPURL);
  }
};

Blockly.Blocks['logic_is_even'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_LOGIC_IS_EVEN, "是")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_LOGIC_IS_EVEN_EVEN, "even"],
        [Blockly.Msg.BIT_LOGIC_IS_EVEN_ODD, "odd"],
        [Blockly.Msg.BIT_LOGIC_IS_EVEN_INTEGER, "integer"],
        [Blockly.Msg.BIT_LOGIC_IS_EVEN_FLOAT, "float"],
        [Blockly.Msg.BIT_LOGIC_IS_EVEN_STRING, "string"],
        [Blockly.Msg.BIT_LOGIC_IS_EVEN_ARRAY, "array"]
      ]), "type_");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_LOGIC_IS_EVEN_HELPURL);
  }
};

//新增陣列積木，改善原本的問題
Blockly.Blocks['lists_get_2'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_ARRAY_GET, "自陣列");
    this.menu();
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_ARRAY_GET_HELPURL);
  },
  dynamic1: function () {
    this.removeInput('num_');
    this.removeInput('dynamic_Dummy_');
    this.appendDummyInput('dynamic_Dummy_')
      .appendField(Blockly.Msg.BIT_ARRAY_GET_NUM1, "項目");
  },
  dynamic2: function () {
    this.removeInput('dynamic_Dummy_');
    this.appendValueInput("num_")
      .setCheck(null);
    this.appendDummyInput('dynamic_Dummy_')
      .appendField(Blockly.Msg.BIT_ARRAY_GET_NUM2, "個項目");
  },
  menu: function () {
    let this_ = this;
    let menuType_ = 0;
    let menuItem = new Blockly.FieldDropdown([
      [Blockly.Msg.BIT_ARRAY_GET_NUM, "num"],
      [Blockly.Msg.BIT_ARRAY_GET_ENDNUM, "endnum"],
      [Blockly.Msg.BIT_ARRAY_GET_FIRST, "first"],
      [Blockly.Msg.BIT_ARRAY_GET_LAST, "last"],
      [Blockly.Msg.BIT_ARRAY_GET_RANDOM, "random"]
    ], function (value) {
      if (value.indexOf('num') == -1) {
        if (menuType_ == 0) {
          this_.dynamic1();
          menuType_ = 1;
        }
      } else {
        if (menuType_ == 1) {
          this_.dynamic2();
          menuType_ = 0;
        }
      }
    });
    this.appendDummyInput('pos_input_')
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_ARRAY_GET_GET, "get"],
        [Blockly.Msg.BIT_ARRAY_GET_GETANDREMOVE, "getAndRemove"]
      ]), "type_")
      .appendField(menuItem, "pos_");
    this.appendValueInput("num_")
      .setCheck(null);
    this.appendDummyInput('dynamic_Dummy_')
      .appendField(Blockly.Msg.BIT_ARRAY_GET_NUM2, "個項目");
    this_ = this;
    setTimeout(function () {
      let value_ = this_.inputList[1].fieldRow[1].value_;
      if (value_.indexOf('num') == -1) {
        this_.removeInput('num_');
        this_.removeInput('dynamic_Dummy_');
        this_.appendDummyInput('dynamic_Dummy_')
          .appendField(Blockly.Msg.BIT_ARRAY_GET_NUM1, "項目");
        menuType_ = 1;
      }
    });
  }
};

Blockly.Blocks['lists_set_2'] = {
  init: function () {
    this.appendDummyInput("head_")
      .appendField(Blockly.Msg.BIT_ARRAY_SET, "自陣列");
    this.appendValueInput("name_")
      .setCheck(null);
    this.menu();
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_ARRAY_SET_HELPURL);
  },
  menu: function () {
    let this_ = this;
    let isNum = 1;
    let isRemove = 0;
    let menuType_ = 'num';
    let menuType2_ = 'set';
    let menuItem = new Blockly.FieldDropdown([
      [Blockly.Msg.BIT_ARRAY_SET_NUM, "num"],
      [Blockly.Msg.BIT_ARRAY_SET_ENDNUM, "endnum"],
      [Blockly.Msg.BIT_ARRAY_SET_FIRST, "first"],
      [Blockly.Msg.BIT_ARRAY_SET_LAST, "last"],
      [Blockly.Msg.BIT_ARRAY_SET_RANDOM, "random"]
    ], function (value) {
      menuType_ = value;
      if (menuType_.indexOf('num') < 0) {
        if (isNum == 1) {
          isNum = 0;
          this_.removeInput('dynamic_Dummy_');
          this_.removeInput('num_');
          if (isRemove == 0) {
            this_.appendDummyInput('dynamic_Dummy_')
              .appendField(Blockly.Msg.BIT_ARRAY_SET_NUMIS1, "項目為");
            this_.moveInputBefore('dynamic_Dummy_', 'val_');
          } else {
            this_.appendDummyInput('dynamic_Dummy_')
              .appendField(Blockly.Msg.BIT_ARRAY_SET_NUM1, "項目");
          }
        }
      } else {
        if (isNum == 0) {
          isNum = 1;
          this_.removeInput('dynamic_Dummy_');
          this_.appendValueInput("num_")
            .setCheck(null);
          if (isRemove == 0) {
            this_.appendDummyInput('dynamic_Dummy_')
              .appendField(Blockly.Msg.BIT_ARRAY_SET_NUMIS2, "個項目為");
            this_.moveInputBefore('dynamic_Dummy_', 'val_');
            this_.moveInputBefore('num_', 'dynamic_Dummy_');
          } else {
            this_.appendDummyInput('dynamic_Dummy_')
              .appendField(Blockly.Msg.BIT_ARRAY_SET_NUM2, "個項目");
          }
        }
      }
    });
    let menuItem2 = new Blockly.FieldDropdown([
      [Blockly.Msg.BIT_ARRAY_SET_SET, "set"],
      [Blockly.Msg.BIT_ARRAY_SET_INSERT, "insert"],
      [Blockly.Msg.BIT_ARRAY_SET_REMOVE, "remove"]
    ], function (value) {
      menuType2_ = value;
      if (menuType2_ == 'remove') {
        if (isRemove == 0) {
          isRemove = 1;
          this_.removeInput('dynamic_Dummy_');
          this_.removeInput('val_');
          if (isNum == 1) {
            this_.appendDummyInput('dynamic_Dummy_')
              .appendField(Blockly.Msg.BIT_ARRAY_SET_NUM2, "個項目");
          } else {
            this_.appendDummyInput('dynamic_Dummy_')
              .appendField(Blockly.Msg.BIT_ARRAY_SET_NUM1, "項目");
          }
        }
      } else {
        if (isRemove == 1) {
          isRemove = 0;
          this_.removeInput('dynamic_Dummy_');
          if (isNum == 1) {
            this_.appendDummyInput('dynamic_Dummy_')
              .appendField(Blockly.Msg.BIT_ARRAY_SET_NUMIS2, "個項目為");
          } else {
            this_.appendDummyInput('dynamic_Dummy_')
              .appendField(Blockly.Msg.BIT_ARRAY_SET_NUMIS1, "項目為");
          }
          this_.appendValueInput("val_")
            .setCheck(null);
        }
      }
    });

    this.appendDummyInput('type_input_')
      .appendField(menuItem2, "type_")
      .appendField(menuItem, "pos_");
    this.appendValueInput("num_")
      .setCheck(null);
    this.appendDummyInput('dynamic_Dummy_')
      .appendField(Blockly.Msg.BIT_ARRAY_SET_NUMIS2, "個項目為");
    this.appendValueInput("val_")
      .setCheck(null);
    this_ = this;
    setTimeout(function () {
      menuType_ = this_.inputList[2].fieldRow[1].value_;
      menuType2_ = this_.inputList[2].fieldRow[0].value_;
      if (menuType2_ == 'remove') {
        this_.removeInput('dynamic_Dummy_');
        this_.removeInput('val_');
        isRemove = 1;
        if (menuType_.indexOf('num') < 0) {
          isNum = 0;
          this_.removeInput('num_');
          this_.appendDummyInput('dynamic_Dummy_')
            .appendField(Blockly.Msg.BIT_ARRAY_SET_NUM1, "項目");
        } else {
          isNum = 1;
          this_.appendDummyInput('dynamic_Dummy_')
            .appendField(Blockly.Msg.BIT_ARRAY_SET_NUM2, "個項目");
        }
      } else {
        isRemove = 0;
        if (menuType_.indexOf('num') < 0) {
          isNum = 0;
          this_.removeInput('dynamic_Dummy_');
          this_.removeInput('num_');
          this_.appendDummyInput('dynamic_Dummy_')
            .appendField(Blockly.Msg.BIT_ARRAY_SET_NUMIS1, "項目為");
          this_.moveInputBefore('dynamic_Dummy_', 'val_');
        } else {
          isNum = 1;
        }
      }
    });
  }
};

Blockly.Blocks['lists_indexOf_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_ARRAY_INDEXOF, "自陣列");
    this.appendValueInput("val_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_ARRAY_INDEXOF_FIND, "找出")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_ARRAY_INDEXOF_FIRST, "indexOf"],
        [Blockly.Msg.BIT_ARRAY_INDEXOF_LAST, "lastIndexOf"]
      ]), "type_")
      .appendField(Blockly.Msg.BIT_ARRAY_INDEXOF_NUM, "項目出現");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_ARRAY_INDEXOF_POSITION, "的位置");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_ARRAY_INDEXOF_HELPURL);
  }
};

Blockly.Blocks['lists_sort_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_ARRAY_SORT, "自陣列");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_ARRAY_SORT_DEPEND, "按照")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_ARRAY_SORT_NUMERIC, "NUMERIC"],
        [Blockly.Msg.BIT_ARRAY_SORT_TEXT, "TEXT"],
        [Blockly.Msg.BIT_ARRAY_SORT_IGNORE_CASE, "IGNORE_CASE"]
      ]), "type1_")
      .appendField(Blockly.Msg.BIT_ARRAY_SORT_DO, "進行")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_ARRAY_SORT_TYPE1, '1'],
        [Blockly.Msg.BIT_ARRAY_SORT_TYPE2, '-1']
      ]), "type2_")
      .appendField(Blockly.Msg.BIT_ARRAY_SORT_TYPE, "排列");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_ARRAY_SORT_HELPURL);
  }
};

Blockly.Blocks['lists_split_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_ARRAY_SPLIT, "在");
    this.appendValueInput("mark_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_ARRAY_SPLIT_USE, "用分隔符");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_ARRAY_SPLIT_SPLIT, "split"],
        [Blockly.Msg.BIT_ARRAY_SPLIT_JOIN, "join"]
      ]), "type_");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_ARRAY_SPLIT_HELPURL);
  }
};

//修正文字積木錯誤

Blockly.Blocks['text_indexOf_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_TEXT_INDEXOF, "在字串");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_TEXT_INDEXOF_FIND, "找出")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_TEXT_INDEXOF_FIRST, "indexOf"],
        [Blockly.Msg.BIT_TEXT_INDEXOF_LAST, "lastIndexOf"]
      ]), "type_")
      .appendField(Blockly.Msg.BIT_TEXT_INDEXOF_STRING, "出現字串");
    this.appendValueInput("val_")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_TEXT_INDEXOF_POSITION, "的位置");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_TEXT_INDEXOF_HELPURL);
  }
};

Blockly.Blocks['text_charAt_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_TEXT_CHARAT, "取得字串");
    this.menu();
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_TEXT_CHARAT_HELPURL);
  },
  dynamic1: function () {
    this.removeInput('num_');
    this.removeInput('dynamic_Dummy_');
    this.appendDummyInput('dynamic_Dummy_')
      .appendField(Blockly.Msg.BIT_TEXT_CHARAT_NUM1, "字元");
  },
  dynamic2: function () {
    this.removeInput('dynamic_Dummy_');
    this.appendValueInput("num_")
      .setCheck(null);
    this.appendDummyInput('dynamic_Dummy_')
      .appendField(Blockly.Msg.BIT_TEXT_CHARAT_NUM2, "個字元");
  },
  menu: function () {
    let this_ = this;
    let menuType_ = 0;
    let menuItem = new Blockly.FieldDropdown([
      [Blockly.Msg.BIT_TEXT_CHARAT_NUM, "num"],
      [Blockly.Msg.BIT_TEXT_CHARAT_ENDNUM, "endnum"],
      [Blockly.Msg.BIT_TEXT_CHARAT_FIRST, "first"],
      [Blockly.Msg.BIT_TEXT_CHARAT_LAST, "last"],
      [Blockly.Msg.BIT_TEXT_CHARAT_RANDOM, "random"]
    ], function (value) {
      if (value.indexOf('num') == -1) {
        if (menuType_ == 0) {
          this_.dynamic1();
          menuType_ = 1;
        }
      } else {
        if (menuType_ == 1) {
          this_.dynamic2();
          menuType_ = 0;
        }
      }
    }); this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_TEXT_CHARAT_S, "的")
      .appendField(menuItem, "type_");
    this.appendValueInput("num_")
      .setCheck(null);
    this.appendDummyInput('dynamic_Dummy_')
      .appendField(Blockly.Msg.BIT_TEXT_CHARAT_NUM2, "個字元");
    this_ = this;
    setTimeout(function () {
      let value_ = this_.inputList[1].fieldRow[1].value_;
      if (value_.indexOf('num') == -1) {
        this_.removeInput('num_');
        this_.removeInput('dynamic_Dummy_');
        this_.appendDummyInput('dynamic_Dummy_')
          .appendField(Blockly.Msg.BIT_TEXT_CHARAT_NUM1, "字元");
        menuType_ = 1;
      }
    });
  }
};

Blockly.Blocks['text_getSubstring_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_TEXT_GETSTR, "取得字串");
    this.menu();
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_TEXT_GETSTR_HELPURL);
  },
  menu: function () {
    let this_ = this;
    let menuType1_ = 0;
    let menuType2_ = 0;
    let menuItem = new Blockly.FieldDropdown([
      [Blockly.Msg.BIT_TEXT_GETSTR_NUM, "num"],
      [Blockly.Msg.BIT_TEXT_GETSTR_ENDNUM, "endnum"],
      [Blockly.Msg.BIT_TEXT_GETSTR_FIRST, "first"]
    ], function (value) {
      if (value.indexOf('num') == -1) {
        if (menuType1_ == 0) {
          this_.removeInput('num1_');
          this_.removeInput('dynamic_Dummy1_');
          this_.appendDummyInput('dynamic_Dummy1_')
            .appendField(Blockly.Msg.BIT_TEXT_GETSTR_FROM1, "字元到");
          this_.moveInputBefore('dynamic_Dummy1_', 'dynamic_type2_');
          menuType1_ = 1;
        }
      } else {
        if (menuType1_ == 1) {
          this_.removeInput('dynamic_Dummy1_');
          this_.appendValueInput("num1_")
            .setCheck(null);
          this_.appendDummyInput('dynamic_Dummy1_')
            .appendField(Blockly.Msg.BIT_TEXT_GETSTR_FROM2, "個字元到");
          this_.moveInputBefore('dynamic_Dummy1_', 'dynamic_type2_');
          this_.moveInputBefore('num1_', 'dynamic_Dummy1_');
          menuType1_ = 0;
        }
      }
    });
    let menuItem2 = new Blockly.FieldDropdown([
      [Blockly.Msg.BIT_TEXT_GETSTR_NUM, "num"],
      [Blockly.Msg.BIT_TEXT_GETSTR_ENDNUM, "endnum"],
      [Blockly.Msg.BIT_TEXT_GETSTR_LAST, "last"]
    ], function (value) {
      if (value.indexOf('num') == -1) {
        if (menuType2_ == 0) {
          this_.removeInput('num2_');
          this_.removeInput('dynamic_Dummy2_');
          this_.appendDummyInput('dynamic_Dummy2_')
            .appendField(Blockly.Msg.BIT_TEXT_GETSTR_TO1, "字元");
          menuType2_ = 1;
        }
      } else {
        if (menuType2_ == 1) {
          this_.removeInput('dynamic_Dummy2_');
          this_.appendValueInput("num2_")
            .setCheck(null);
          this_.appendDummyInput('dynamic_Dummy2_')
            .appendField(Blockly.Msg.BIT_TEXT_GETSTR_TO2, "個字元");
          menuType2_ = 0;
        }
      }
    });
    this.appendDummyInput("dynamic_type1_")
      .appendField(Blockly.Msg.BIT_TEXT_GETSTR_S, "的")
      .appendField(menuItem, "type1_");
    this.appendValueInput("num1_")
      .setCheck(null);
    this.appendDummyInput("dynamic_Dummy1_")
      .appendField(Blockly.Msg.BIT_TEXT_GETSTR_FROM2, "個字元到");
    this.appendDummyInput("dynamic_type2_")
      .appendField(menuItem2, "type2_");
    this.appendValueInput("num2_")
      .setCheck(null);
    this.appendDummyInput("dynamic_Dummy2_")
      .appendField(Blockly.Msg.BIT_TEXT_GETSTR_TO2, "個字元");
    this_ = this;
    setTimeout(function () {
      let value1_ = this_.inputList[1].fieldRow[1].value_;
      let value2_ = this_.inputList[4].fieldRow[0].value_;
      if (value1_.indexOf('num') == -1) {
        this_.removeInput('num1_');
        this_.removeInput('dynamic_Dummy1_');
        this_.appendDummyInput('dynamic_Dummy1_')
          .appendField(Blockly.Msg.BIT_TEXT_GETSTR_FROM1, "字元到");
        this_.moveInputBefore('dynamic_Dummy1_', 'dynamic_type2_');
        menuType1_ = 1;
      }
      if (value2_.indexOf('num') == -1) {
        this_.removeInput('num2_');
        this_.removeInput('dynamic_Dummy2_');
        this_.appendDummyInput('dynamic_Dummy2_')
          .appendField(Blockly.Msg.BIT_TEXT_GETSTR_TO1, "字元");
        menuType2_ = 1;
      }
    });
  }
};

Blockly.Blocks['text_replace'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_TEXT_REPLACE, "把字串");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_TEXT_REPLACE_WHICH, "的")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_TEXT_REPLACE_FIRST, "first"],
        [Blockly.Msg.BIT_TEXT_REPLACE_ALL, "all"]
      ]), "type_");
    this.appendValueInput("input_")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_TEXT_REPLACE_TO, "取代為");
    this.appendValueInput("output_")
      .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_TEXT_REPLACE_HELPURL);
  }
};

Blockly.Blocks['text_append_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_TEXT_APPEND, "在字串");
    this.appendValueInput("text_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_TEXT_APPEND_TO, "後方加入文字");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_TEXT_APPEND_HELPURL);
  }
};

//增加長度的積木

Blockly.Blocks['lists_length_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck("Array")
      .appendField(Blockly.Msg.BIT_ARRAY_LENGTH, "陣列");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_ARRAY_LENGTH_LENGTH, "的長度");
    this.setOutput(true, null);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_ARRAY_LENGTH_HELPURL);
  }
};

Blockly.Blocks['text_length_2'] = {
  init: function () {
    this.appendValueInput("name_")
      .setCheck("String")
      .appendField(Blockly.Msg.BIT_TEXT_LENGTH_STRING, "字串");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_TEXT_LENGTH, "的長度");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_TEXT_LENGTH_HELPURL);
  }
};


//簡化版無窮迴圈積木
Blockly.Blocks['controls_loop_forever'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_LOOP_FOREVER, "重複無限次，背景執行")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "async");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOREVER_DO, "執行");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(110);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_LOOP_FOREVER_HELPURL);
  }
};

Blockly.Blocks['controls_loop_forever_while_do'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOREVER_WHILEDO_IF, "如果");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_LOOP_FOREVER_WHILEDO, "就重複無限次，背景執行")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "async");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOREVER_WHILEDO_DO, "執行");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(110);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_LOOP_FOREVER_WHILEDO_HELPURL);
  }
};

Blockly.Blocks['controls_loop_stop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_LOOP_STOP, "停止")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_LOOP_STOP_ALL, "all"],
        [Blockly.Msg.BIT_LOOP_STOP_THIS, "this"]
      ]), "type_")
      .appendField(Blockly.Msg.BIT_LOOP_STOP_REPEAT, "重複");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(110);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_LOOP_STOP_HELPURL);
  }
};

Blockly.Blocks['controls_repeat_ext_can_stop'] = {
  init: function () {
    this.appendValueInput("times_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_EXT_REPEAT, "重複");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_LOOP_EXT, "次，背景執行")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "async");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_EXT_DO, "執行");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(110);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_LOOP_EXT_HELPURL);
  }
};

Blockly.Blocks['controls_for_can_stop'] = {
  init: function () {
    this.appendValueInput("from_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOR, "計數")
      .appendField(new Blockly.FieldVariable("i"), "item_")
      .appendField(Blockly.Msg.BIT_LOOP_FOR_FROM, "從");
    this.appendValueInput("to_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOR_TO, "到");
    this.appendValueInput("num_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOR_NUM, "每隔");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_LOOP_FOR_ASYNC, "背景執行")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "async");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOR_DO, "執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(110);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_LOOP_FOR_HELPURL);
  }
};

Blockly.Blocks['controls_foreach_can_stop'] = {
  init: function () {
    this.appendValueInput("array_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOREACH, "取出每個")
      .appendField(new Blockly.FieldVariable("i"), "item_")
      .appendField(Blockly.Msg.BIT_LOOP_FOREACH_ARRAY, "自陣列");
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_LOOP_FOREACH_ASYNC, "背景執行")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "async");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_LOOP_FOREACH_DO, "執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(110);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_LOOP_FOREACH_HELPURL);
  }
};

//把除號放大
Blockly.Blocks['math_modulo_big_icon'] = {
  init: function () {
    this.appendValueInput("a_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATH_REMAINDER, "取餘數自");
    this.appendValueInput("b_")
      .setCheck(null)
      .appendField(new Blockly.FieldImage("media/icon-divided.png", 12, 12, "÷"));
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_MATH_REMAINDER_HELPURL);
  }
};

//簡化鍵盤事件積木
Blockly.Blocks['bit_document_keycode'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_KEYCODE, "當鍵盤")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_KEYCODE_KEYDOWN, "keyDownCode"],
        [Blockly.Msg.BIT_KEYCODE_KEYUP, "keyUpCode"]
      ]), "event_")
      .appendField(new Blockly.FieldDropdown([
        ["A", "65"],
        ["B", "66"],
        ["C", "67"],
        ["D", "68"],
        ["E", "69"],
        ["F", "70"],
        ["G", "71"],
        ["H", "72"],
        ["I", "73"],
        ["J", "74"],
        ["K", "75"],
        ["L", "76"],
        ["M", "77"],
        ["N", "78"],
        ["O", "79"],
        ["P", "80"],
        ["Q", "81"],
        ["R", "82"],
        ["S", "83"],
        ["T", "84"],
        ["U", "85"],
        ["V", "86"],
        ["W", "87"],
        ["X", "88"],
        ["Y", "89"],
        ["Z", "90"],
        [Blockly.Msg.BIT_KEYCODE_SPACE, "32"],
        ["enter", "13"],
        [Blockly.Msg.BIT_KEYCODE_UP, "38"],
        [Blockly.Msg.BIT_KEYCODE_DOWN, "40"],
        [Blockly.Msg.BIT_KEYCODE_LEFT, "37"],
        [Blockly.Msg.BIT_KEYCODE_RIGHT, "39"],
        ["0", "48"],
        ["1", "49"],
        ["2", "50"],
        ["3", "51"],
        ["4", "52"],
        ["5", "53"],
        ["6", "54"],
        ["7", "55"],
        ["8", "56"],
        ["9", "57"],
        ["shift", "16"],
        ["alt", "18"],
        ["ctrl", "17"],
        ["command(R)", "93"],
        ["command(L)", "91"],
        ["tab", "9"],
        ["+ -", "187"],
        ["- _", "189"],
        ["{ [", "219"],
        ["} ]", "221"],
        ["|", "220"],
        ["; :", "186"],
        ["\' \"", "222"],
        ["< ,", "188"],
        ["> .", "190"],
        ["? /", "191"]
      ]), "keycode_");
    this.appendStatementInput("do_")
      .appendField(Blockly.Msg.BIT_KEYCODE_DO, "執行");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(10);
    this.setHelpUrl(Blockly.Msg.BIT_KEYCODE_HELPURL);
  }
};

Blockly.Blocks['input_text_async'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_INPUT, "在對話框輸入文字");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_INPUT_HELPURL);
    this.setCommentText(Blockly.Msg.BIT_INPUT_COMMENT, "輸入文字之後，才會繼續執行下方程式");
  }
};

Blockly.Blocks['input_text_async_val'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_INPUT_VAL, "輸入的文字");
    this.setOutput(true, null);
    this.setColour(5);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_INPUT_HELPURL);
  }
};

Blockly.Blocks['input_text'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("在對話框輸入文字");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField("執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(10);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['input_text_val'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("輸入的文字");
    this.setOutput(true, null);
    this.setColour(5);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['speak_async'] = {
  init: function () {
    this.appendValueInput("text_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_SPEAK_TEXT, "朗讀文字");
    this.appendValueInput("setting_")
      .setAlign(Blockly.ALIGN_RIGHT)
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_SPEAK_SETTING, "參數設定");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(40);
    this.setHelpUrl(Blockly.Msg.BIT_SPEAK_HELPURL);
    this.setCommentText(Blockly.Msg.BIT_SPEAK_TOOLTIPS, "朗讀結束後，才會繼續執行下方程式");
  }
};

Blockly.Blocks['speak_async_setting'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_SPEAK_SETTING_LANG, "語言")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_SPEAK_SETTING_ZHTW, "zh-TW"],
        [Blockly.Msg.BIT_SPEAK_SETTING_EN, "en-US"],
        [Blockly.Msg.BIT_SPEAK_SETTING_JP, "ja-JP"]
      ]), "lang_")
      .appendField(Blockly.Msg.BIT_SPEAK_SETTING_T, " 音調")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_SPEAK_SETTING_T2, "2"],
        [Blockly.Msg.BIT_SPEAK_SETTING_T15, "1.5"],
        [Blockly.Msg.BIT_SPEAK_SETTING_T1, "1"],
        [Blockly.Msg.BIT_SPEAK_SETTING_T05, "0.5"],
        [Blockly.Msg.BIT_SPEAK_SETTING_T01, "0.1"]
      ]), "pitch_")
      .appendField(Blockly.Msg.BIT_SPEAK_SETTING_S, " 速度")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_SPEAK_SETTING_S2, "2"],
        [Blockly.Msg.BIT_SPEAK_SETTING_S15, "1.5"],
        [Blockly.Msg.BIT_SPEAK_SETTING_S1, "1"],
        [Blockly.Msg.BIT_SPEAK_SETTING_S07, "0.7"],
        [Blockly.Msg.BIT_SPEAK_SETTING_S05, "0.5"]
      ]), "rate_");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip('');
    this.setColour(45);
    this.setHelpUrl(Blockly.Msg.BIT_SPEAK_SETTING_HELPURL);
  }
};

/*
88""Yb  dP"Yb     db    88""Yb 8888b.
88__dP dP   Yb   dPYb   88__dP  8I  Yb
88""Yb Yb   dP  dP__Yb  88"Yb   8I  dY
88oodP  YbodP  dP""""Yb 88  Yb 8888Y"
*/

Blockly.Blocks['board'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_BOARD_USE, "使用")
    this.menu();
    this.appendStatementInput("callbacks_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_BOARD_DO, "執行");
    this.setInputsInline(true);
    this.setColour(240);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_BOARD_HELPURL);
  },
  menu: function () {
    let board_ = 'b' + new Date().getTime();
    let this_ = this;
    let menuText = '';
    let menuItem2 = new Blockly.FieldTextInput(menuText, function (value) {
      menuText = value;
    });
    let menuItem = new Blockly.FieldDropdown([
      [Blockly.Msg.BIT_BOARD_BIT, "bit"],
      [Blockly.Msg.BIT_BOARD_USB, "usb"],
      [Blockly.Msg.BIT_BOARD_WIFI, "wifi"]
    ], function (value) {
      switch (value) {
        case 'bit':
          this_.removeInput('Dummy_device_');
          break;
        case 'wifi':
          if (menuText.length == 0) {
            if (window.boardDeviceId_) {
              menuText = window.boardDeviceId_;
            } else {
              menuText = 'Web:Bit';
            }
            menuItem2 = new Blockly.FieldTextInput(menuText, function (value) {
              menuText = value;
            });
            this_.appendDummyInput('Dummy_device_')
              .appendField(menuItem2, "device_");
          } else {
            this_.appendDummyInput('Dummy_device_')
              .appendField(menuItem2, "device_");
          }
          this_.moveInputBefore('Dummy_device_', 'callbacks_');

          break;
        case 'usb':
          this_.removeInput('Dummy_device_');
          break;
      }
    });
    this.appendDummyInput()
      .appendField(menuItem, "type_")
    this.appendDummyInput('Dummy_control_')
      .appendField(Blockly.Msg.BIT_BOARD_CONTROL, "控制");
    this_.appendDummyInput('Dummy_device_')
      .appendField(menuItem2, "device_");
    setTimeout(function () {
      let menuType_ = this_.inputList[1].fieldRow[0].value_;
      switch (menuType_) {
        case 'bit':
          this_.removeInput('Dummy_device_');
          break;
        case 'wifi':
          Code.cloudHostCheck(board_, 'wifi');
          break;
        case 'usb':
          this_.removeInput('Dummy_device_');
          break;
      }
    })
  }
};


/*
8b    d8    db    888888 88""Yb 88 Yb  dP
88b  d88   dPYb     88   88__dP 88  YbdP
88YbdP88  dP__Yb    88   88"Yb  88  dPYb
88 YY 88 dP""""Yb   88   88  Yb 88 dP  Yb
*/

Blockly.Blocks['bit_matrix_color_output'] = {
  init: function () {
    this.appendValueInput("color_input")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_COLOR, '矩陣 LED 燈光為');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_COLOR_HELPURL);
  }
};

Blockly.Blocks['bit_matrix_color_array'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_MATRIX_COLOR_ARRAY, "繪製圖案")
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
    this.setColour(255);
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_COLOR_ARRAY_HELPURL);
  }
};

//圖形產生：https://jsbin.com/yubolugoti/1/edit?html,js,output
//圖形產生 part2：https://jsbin.com/qucofuyaxe/1/edit?html,css,js,output
//圖形產生 part3：https://jsbin.com/winejihewi/1/edit?html,css,js,output
let emoji_list = [
  [' {"class":"bit-matrix-icon icon-55", "title":"☺ ( ' + Blockly.Msg.BIT_MATRIX_EMOJI_HAPPY + ' ) ", "showTitle":"false"}', "0000001010000001000101110"],
  ['{"class":"bit-matrix-icon icon-56", "title":"☹ ( ' + Blockly.Msg.BIT_MATRIX_EMOJI_CRY + ' ) ", "showTitle":"false"}', "0000001010000000111010001"],
  ['{"class":"bit-matrix-icon icon-57", "title":"✌🏾 ( ' + Blockly.Msg.BIT_MATRIX_EMOJI_01 + ' ) ", "showTitle":"false"}', "1000101010001001101111011"],
  ['{"class":"bit-matrix-icon icon-58", "title":"✊🏾 ( ' + Blockly.Msg.BIT_MATRIX_EMOJI_02 + ' ) ", "showTitle":"false"}', "0111011111111110111001110"],
  ['{"class":"bit-matrix-icon icon-59", "title":"🖐🏾 ( ' + Blockly.Msg.BIT_MATRIX_EMOJI_03 + ' ) ", "showTitle":"false"}', "1010101110111110111010101"],
  ['{"class":"bit-matrix-icon icon-60", "title":"♥", "showTitle":"false"}', "0000001010011100010000000"],
  ['{"class":"bit-matrix-icon icon-32", "title":"❤", "showTitle":"false"}', "0101011111111110111000100"],
  ['{"class":"bit-matrix-icon icon-33", "title":"♡", "showTitle":"false"}', "0101010101100010101000100"],
  ['{"class":"bit-matrix-icon icon-06", "title":"▲", "showTitle":"false"}', "0000000100011101111100000"],
  ['{"class":"bit-matrix-icon icon-07", "title":"▼", "showTitle":"false"}', "0000011111011100010000000"],
  ['{"class":"bit-matrix-icon icon-08", "title":"◀", "showTitle":"false"}', "0001000110011100011000010"],
  ['{"class":"bit-matrix-icon icon-09", "title":"▶", "showTitle":"false"}', "0100001100011100110001000"],
  ['{"class":"bit-matrix-icon icon-10", "title":"◢", "showTitle":"false"}', "0000000001000110011101111"],
  ['{"class":"bit-matrix-icon icon-11", "title":"◣", "showTitle":"false"}', "0000010000110001110011110"],
  ['{"class":"bit-matrix-icon icon-12", "title":"◥", "showTitle":"false"}', "0111100111000110000100000"],
  ['{"class":"bit-matrix-icon icon-13", "title":"◤", "showTitle":"false"}', "1111011100110001000000000"],
  ['{"class":"bit-matrix-icon icon-14", "title":"↑", "showTitle":"false"}', "0010001110101010010000100"],
  ['{"class":"bit-matrix-icon icon-15", "title":"↓", "showTitle":"false"}', "0010000100101010111000100"],
  ['{"class":"bit-matrix-icon icon-16", "title":"←", "showTitle":"false"}', "0010001000111110100000100"],
  ['{"class":"bit-matrix-icon icon-17", "title":"→", "showTitle":"false"}', "0010000010111110001000100"],
  ['{"class":"bit-matrix-icon icon-18", "title":"↖", "showTitle":"false"}', "1110011000101000001000001"],
  ['{"class":"bit-matrix-icon icon-19", "title":"↗", "showTitle":"false"}', "0011100011001010100010000"],
  ['{"class":"bit-matrix-icon icon-20", "title":"↙", "showTitle":"false"}', "0000100010101001100011100"],
  ['{"class":"bit-matrix-icon icon-21", "title":"↘", "showTitle":"false"}', "1000001000001010001100111"],
  ['{"class":"bit-matrix-icon icon-28", "title":"⧓", "showTitle":"false"}', "1000111011111111101110001"],
  ['{"class":"bit-matrix-icon icon-29", "title":"⧗", "showTitle":"false"}', "1111101110001000111011111"],
  ['{"class":"bit-matrix-icon icon-30", "title":"⧔", "showTitle":"false"}', "1000111010111001101010001"],
  ['{"class":"bit-matrix-icon icon-31", "title":"⧕", "showTitle":"false"}', "1000101011001110101110001"],
  ['{"class":"bit-matrix-icon icon-22", "title":"·", "showTitle":"false"}', "0000000000001000000000000"],
  ['{"class":"bit-matrix-icon icon-23", "title":"∶", "showTitle":"false"}', "0000000100000000010000000"],
  ['{"class":"bit-matrix-icon icon-24", "title":"∴", "showTitle":"false"}', "0000000100000000101000000"],
  ['{"class":"bit-matrix-icon icon-25", "title":"∶∶", "showTitle":"false"}', "0000001010000000101000000"],
  ['{"class":"bit-matrix-icon icon-26", "title":"∶·∶", "showTitle":"false"}', "0000001010001000101000000"],
  ['{"class":"bit-matrix-icon icon-27", "title":"⋮⋮", "showTitle":"false"}', "0101000000010100000001010"],
  ['{"class":"bit-matrix-icon icon-34", "title":"□", "showTitle":"false"}', "0000001110010100111000000"],
  ['{"class":"bit-matrix-icon icon-35", "title":"■", "showTitle":"false"}', "0000001110011100111000000"],
  ['{"class":"bit-matrix-icon icon-36", "title":"○", "showTitle":"false"}', "0111010001100011000101110"],
  ['{"class":"bit-matrix-icon icon-37", "title":"◆", "showTitle":"false"}', "0010001110111110111000100"],
  ['{"class":"bit-matrix-icon icon-38", "title":"◇", "showTitle":"false"}', "0010001010100010101000100"],
  ['{"class":"bit-matrix-icon icon-39", "title":"⊡", "showTitle":"false"}', "1111110001101011000111111"],
  ['{"class":"bit-matrix-icon icon-40", "title":"⊞", "showTitle":"false"}', "1111110101111111010111111"],
  ['{"class":"bit-matrix-icon icon-41", "title":"⟐", "showTitle":"false"}', "0010001010101010101000100"],
  ['{"class":"bit-matrix-icon icon-42", "title":"★", "showTitle":"false"}', "0010010101011100101010001"],
  ['{"class":"bit-matrix-icon icon-43", "title":"✔", "showTitle":"false"}', "0000100010101000100000000"],
  ['{"class":"bit-matrix-icon icon-44", "title":"♪", "showTitle":"false"}', "0011000101001001110011100"],
  ['{"class":"bit-matrix-icon icon-45", "title":"♫", "showTitle":"false"}', "0111101001010011101111011"],
  ['{"class":"bit-matrix-icon icon-46", "title":"⌗", "showTitle":"false"}', "0101011111010101111101010"],
  ['{"class":"bit-matrix-icon icon-47", "title":"⚑", "showTitle":"false"}', "0111101111011110100001000"],
  ['{"class":"bit-matrix-icon icon-48", "title":"⊠", "showTitle":"false"}', "1111111011101011101111111"],
  ['{"class":"bit-matrix-icon icon-49", "title":"♀", "showTitle":"false"}', "0111001110001001111100100"],
  ['{"class":"bit-matrix-icon icon-50", "title":"♂", "showTitle":"false"}', "0010100010111011010011100"],
  ['{"class":"bit-matrix-icon icon-51", "title":"※", "showTitle":"false"}', "1010101010101010101010101"],
  ['{"class":"bit-matrix-icon icon-52", "title":"✈", "showTitle":"false"}', "0010010110111111011000100"],
  ['{"class":"bit-matrix-icon icon-53", "title":"♕", "showTitle":"false"}', "1010110101111111000111111"],
  ['{"class":"bit-matrix-icon icon-54", "title":"≡", "showTitle":"false"} ', "1111100000111110000011111"],
  ['{"class":"bit-matrix-icon icon-05", "title":"=", "showTitle":"false"}', "0000011111000001111100000"],
  ['{"class":"bit-matrix-icon icon-01", "title":"+", "showTitle":"false"}', "0010000100111110010000100"],
  ['{"class":"bit-matrix-icon icon-02", "title":"–", "showTitle":"false"}', "0000000000111110000000000"],
  ['{"class":"bit-matrix-icon icon-03", "title":"×", "showTitle":"false"}', "1000101010001000101010001"],
  ['{"class":"bit-matrix-icon icon-04", "title":"÷", "showTitle":"false"}', "0010000000111110000000100"],
  ['{"class":"bit-matrix-icon icon-00", "title":"' + Blockly.Msg.BIT_MATRIX_EMOJI_RANDOM + '", "showTitle":"false"} ', "random"]
];

Blockly.Blocks['bit_matrix_emoji'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_MATRIX_EMOJI, "圖案")
      .appendField(new Blockly.FieldDropdown(emoji_list), "emoji")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('color_input')
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_EMOJI_COLOR, "燈光顏色")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_EMOJI_HELPURL);
  }
};

Blockly.Blocks['bit_matrix_character'] = {
  init: function () {
    this.appendValueInput('char_')
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_CHARACTER, '矩陣 LED 顯示一個字');
    this.appendValueInput('color_')
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_CHARACTER_COLOR, '燈光顏色')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_CHARACTER_HELPURL);
  }
};

Blockly.Blocks['bit_matrix_string_once'] = {
  init: function () {
    this.appendValueInput("str_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_STRING, "矩陣 LED 跑馬燈")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("color_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_STRING_COLOR, "燈光顏色")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_MATRIX_STRING_PLAY, "播放")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_MATRIX_STRING_ONCE, "1"],
        [Blockly.Msg.BIT_MATRIX_STRING_UNLIMITED, "2"]
      ]), "type_")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_MATRIX_STRING_SPEED, ' 速度')
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_MATRIX_STRING_FAST, "0"],
        [Blockly.Msg.BIT_MATRIX_STRING_NORMAL, "2"],
        [Blockly.Msg.BIT_MATRIX_STRING_SLOW, "4"]
      ]), 'speed_')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_STRING_HELPURL);
    this.setCommentText(Blockly.Msg.BIT_MATRIX_STRING_COMMENT, "若選擇一次，在跑馬燈結束後才會繼續執行下方程式");
  }
};

Blockly.Blocks['bit_matrix_string'] = {
  init: function () {
    this.appendValueInput('str_')
      .setCheck(null)
      .appendField('矩陣 LED 跑馬燈')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('color_')
      .setCheck(null)
      .appendField('燈光顏色')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendDummyInput()
      .appendField('速度')
      .appendField(new Blockly.FieldDropdown([
        ["150", "0"],
        ["200", "1"],
        ["250", "2"],
        ["500", "3"],
        ["1000", "4"]
      ]), 'speed_')
      .appendField("ms")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['bit_matrix_color_single'] = {
  init: function () {
    this.appendValueInput('led_')
      .setCheck('Number')
      .appendField(Blockly.Msg.BIT_MATRIX_SINGLE, '矩陣 LED 第');
    this.appendValueInput('color_')
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_SINGLE_NUM, '顆的燈光顏色');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_SINGLE_HELPURL);
  }
};

Blockly.Blocks['bit_matrix_xy'] = {
  init: function () {
    this.appendValueInput("x")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_XY, '矩陣 LED')
      .appendField(Blockly.Msg.BIT_MATRIX_XY_X, "x")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("y")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_XY_Y, "y")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("color_input")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_XY_COLOR, '燈光顏色')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_XY_HELPURL);
  }
};

Blockly.Blocks['bit_matrix_brightness'] = {
  init: function () {
    this.appendValueInput('brightness_')
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MATRIX_BRIGHTNESS, '矩陣 LED 的亮度為 (0~20)');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_BRIGHTNESS_HELPURL);
  }
};

Blockly.Blocks['bit_matrix_off'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_MATRIX_OFF, '關閉矩陣 LED ( 關燈 )');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_MATRIX_HELPURL);
  }
};


/*
88""Yb 88   88 888888 888888  dP"Yb  88b 88
88__dP 88   88   88     88   dP   Yb 88Yb88
88""Yb Y8   8P   88     88   Yb   dP 88 Y88
88oodP `YbodP'   88     88    YbodP  88  Y8
*/

Blockly.Blocks['bit_button_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_AB_BUTTON, "當按鈕開關")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_AB_BUTTON_A, "_bit_btnA_"],
        [Blockly.Msg.BIT_AB_BUTTON_B, "_bit_btnB_"],
        [Blockly.Msg.BIT_AB_BUTTON_AB, "_bit_2btn_"]
      ]), "var_")
      .appendField(Blockly.Msg.BIT_AB_BUTTON_S, "被")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_AB_BUTTON_PRESSED, "pressed"],
        [Blockly.Msg.BIT_AB_BUTTON_RELEASE, "released"],
        [Blockly.Msg.BIT_AB_BUTTON_LONGPRESS, "longPress"]
      ]), "event_");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_AB_BUTTON_DO, "執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_AB_BUTTON_HELPURL);
  }
};


/*
8888b.  888888 888888 888888  dP""b8 888888 888888 8888b.
 8I  Yb 88__     88   88__   dP   `"   88   88__    8I  Yb
 8I  dY 88""     88   88""   Yb        88   88""    8I  dY
8888Y"  888888   88   888888  YboodP   88   888888 8888Y"
*/

Blockly.Blocks['bit_detected'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_DETECTED, "偵測光線＆溫度 ( 重複無限次 )");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_DETECTED_DO, "執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bit_photocell_val'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_DETECTED_PHOTOCELL, "亮度")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_DETECTED_PHOTOCELL_LEFT, "_l_"],
        [Blockly.Msg.BIT_DETECTED_PHOTOCELL_RIGHT, "_r_"]
      ]), "name_")
      .appendField(Blockly.Msg.BIT_DETECTED_PHOTOCELL_VAL, "的數值 ( 流明 )");
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_DETECTED_PHOTOCELL_HELPURL);
  }
};

Blockly.Blocks['bit_temp_val'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_DETECTED_TEMP, "溫度的數值 ( 度 C )");
    this.setOutput(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_DETECTED_TEMP_HELPURL);
  }
};


Blockly.Blocks['bit_detected_stop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("停止偵測");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


/*
88""Yb 88   88 8888P 8888P 888888 88""Yb
88__dP 88   88   dP    dP  88__   88__dP
88""Yb Y8   8P  dP    dP   88""   88"Yb
88oodP `YbodP' d8888 d8888 888888 88  Yb
*/

let notesAndTempos = [
  [' {"class":"bit-buzzer-icon icon-w", "frequency":"262", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' C", "showTitle":"false", "keyboard":"true"}', 'C4'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"277", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' C#", "showTitle":"false", "keyboard":"true"}', 'CS4'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"294", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' D", "showTitle":"false", "keyboard":"true"}', 'D4'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"311", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' D#", "showTitle":"false", "keyboard":"true"}', 'DS4'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"330", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' E", "showTitle":"false", "keyboard":"true"}', 'E4'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"349", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' F", "showTitle":"false", "keyboard":"true"}', 'F4'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"370", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' F#", "showTitle":"false", "keyboard":"true"}', 'FS4'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"392", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' G", "showTitle":"false", "keyboard":"true"}', 'G4'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"415", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' G#", "showTitle":"false", "keyboard":"true"}', 'GS4'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"440", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' A", "showTitle":"false", "keyboard":"true"}', 'A4'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"466", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' A#", "showTitle":"false", "keyboard":"true"}', 'AS4'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"494", "title":"' + Blockly.Msg.BIT_BUZZER_4 + ' B", "showTitle":"false", "keyboard":"true"} ', 'B4'],
  [' {"class":"bit-buzzer-icon icon-w", "frequency":"523", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' C", "showTitle":"false", "keyboard":"true"}', 'C5'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"554", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' C#", "showTitle":"false", "keyboard":"true"}', 'CS5'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"587", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' D", "showTitle":"false", "keyboard":"true"}', 'D5'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"622", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' D#", "showTitle":"false", "keyboard":"true"}', 'DS5'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"659", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' E", "showTitle":"false", "keyboard":"true"}', 'E5'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"698", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' F", "showTitle":"false", "keyboard":"true"}', 'F5'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"740", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' F#", "showTitle":"false", "keyboard":"true"}', 'FS5'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"784", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' G", "showTitle":"false", "keyboard":"true"}', 'G5'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"831", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' G#", "showTitle":"false", "keyboard":"true"}', 'GS5'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"880", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' A", "showTitle":"false", "keyboard":"true"}', 'A5'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"932", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' A#", "showTitle":"false", "keyboard":"true"}', 'AS5'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"988", "title":"' + Blockly.Msg.BIT_BUZZER_5 + ' B", "showTitle":"false", "keyboard":"true"} ', 'B5'],
  [' {"class":"bit-buzzer-icon icon-w", "frequency":"1047", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' C", "showTitle":"false", "keyboard":"true"}', 'C6'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"1109", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' C#", "showTitle":"false", "keyboard":"true"}', 'CS6'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"1175", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' D", "showTitle":"false", "keyboard":"true"}', 'D6'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"1245", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' D#", "showTitle":"false", "keyboard":"true"}', 'DS6'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"1319", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' E", "showTitle":"false", "keyboard":"true"}', 'E6'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"1397", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' F", "showTitle":"false", "keyboard":"true"}', 'F6'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"1480", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' F#", "showTitle":"false", "keyboard":"true"}', 'FS6'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"1568", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' G", "showTitle":"false", "keyboard":"true"}', 'G6'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"1661", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' G#", "showTitle":"false", "keyboard":"true"}', 'GS6'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"1760", "title":"' + Blockly.Msg.BIT_BUZZER_6 + '音 A", "showTitle":"false", "keyboard":"true"}', 'A6'],
  ['{"class":"bit-buzzer-icon icon-b", "frequency":"1865", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' A#", "showTitle":"false", "keyboard":"true"}', 'AS6'],
  ['{"class":"bit-buzzer-icon icon-w", "frequency":"1976", "title":"' + Blockly.Msg.BIT_BUZZER_6 + ' B", "showTitle":"false", "keyboard":"true"} ', 'B6']
];

Blockly.Blocks['buzzer_play_plus'] = {
  init: function () {
    this.appendValueInput("tone_")
      .setCheck("buzzer_tone")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.BIT_BUZZER_PLAY, "演奏 音階");
    this.appendValueInput("tempos_")
      .setCheck("buzzer_tempo")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.BIT_BUZZER_PLAY_CONTINUE, "持續");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_HELPURL);
  }
};

Blockly.Blocks['buzzer_tone'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(notesAndTempos), 'tone_');
    this.setInputsInline(true);
    this.setOutput(true, "buzzer_tone");
    this.setColour(180);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_HELPURL);
  }
};

Blockly.Blocks['buzzer_tempo'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['2', '1'],
        ['1', '2'],
        ['1/2', '4'],
        ['1/4', '6'],
        ['1/8', '8'],
        ['1/16', '10']
      ]), 'tempos_')
      .appendField(Blockly.Msg.BIT_BUZZER_TEMPO, '拍')
    this.setInputsInline(true);
    this.setOutput(true, "buzzer_tempo");
    this.setColour(180);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_HELPURL);
  }
};

Blockly.Blocks['buzzer_play_plus_mute_tone'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_BUZZER_MUTE, "休止符");
    this.setOutput(true, "buzzer_tone");
    this.setColour(180);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_HELPURL);
  }
};

Blockly.Blocks['buzzer_play_plus_mute'] = {
  init: function () {
    this.appendValueInput("tempos_")
      .setCheck("buzzer_tempo")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.BIT_BUZZER_PLAY_MUTE, "演奏 休息");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_MUTE_HELPURL);
  }
};

//新版積木，合併 play 和音符節奏
Blockly.Blocks['buzzer_play'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_BUZZER_PLAY, '演奏 音階')
      .appendField(new Blockly.FieldDropdown(notesAndTempos), 'tone_')
      .appendField(Blockly.Msg.BIT_BUZZER_PLAY_CONTINUE, '持續')
      .appendField(new Blockly.FieldDropdown([
        ['2', '1'],
        ['1', '2'],
        ['1/2', '4'],
        ['1/4', '6'],
        ['1/8', '8'],
        ['1/16', '10']
      ]), 'tempos_')
      .appendField(Blockly.Msg.BIT_BUZZER_TEMPO, '拍');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_HELPURL);
    this.setColour(180);
  }
};

//新版積木，合併 play 和音符節奏
Blockly.Blocks['buzzer_play_music'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_BUZZER_PLAY_MUSIC, '演奏 音樂')
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_BUZZER_PLAY_MUSIC_M1, 'm1'],
        [Blockly.Msg.BIT_BUZZER_PLAY_MUSIC_M2, 'm4'],
        [Blockly.Msg.BIT_BUZZER_PLAY_MUSIC_M3, 'm2'],
        [Blockly.Msg.BIT_BUZZER_PLAY_MUSIC_M4, 'm3'],
        [Blockly.Msg.BIT_BUZZER_PLAY_MUSIC_M5, 'm5']
      ]), 'music_');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_MUSIC_HELPURL);
    this.setColour(180);
  }
};

//新版積木，合併 play 和音符節奏
Blockly.Blocks['buzzer_play_mute'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_BUZZER_PLAY_MUTE, "演奏 休息")
      .appendField(new Blockly.FieldDropdown([
        ['2', '1'],
        ['1', '2'],
        ['1/2', '4'],
        ['1/4', '6'],
        ['1/8', '8'],
        ['1/16', '10']
      ]), 'tempos_')
      .appendField(Blockly.Msg.BIT_BUZZER_TEMPO, '拍');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

//新版積木，合併 play 和音符節奏
Blockly.Blocks['buzzer_play_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.BIT_BUZZER_PLAY_EVENT_STOP, '.stop()'],
        [Blockly.Msg.BIT_BUZZER_PLAY_EVENT_PAUSE, '.pause()'],
        [Blockly.Msg.BIT_BUZZER_PLAY_EVENT_PLAY, '.play()']
      ]), 'event_')
      .appendField(Blockly.Msg.BIT_BUZZER_PLAY_EVENT, '演奏');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_EVENT_HELPURL);
    this.setColour(180);
  }
};


Blockly.Blocks['buzzer_mute'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_BUZZER_MUTE, "休止符")
      .appendField(new Blockly.FieldDropdown([
        ['2', '1'],
        ['1', '2'],
        ['1/2', '4'],
        ['1/4', '6'],
        ['1/8', '8'],
        ['1/16', '10']
      ]), 'tempos_')
      .appendField(Blockly.Msg.BIT_BUZZER_TEMPO, '拍');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(185);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_HELPURL);
  }
};

Blockly.Blocks['buzzer_notes_tempos'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('音符')
      .appendField(new Blockly.FieldDropdown(notesAndTempos), 'tone_')
      .appendField('持續')
      .appendField(new Blockly.FieldDropdown([
        ['2', '1'],
        ['1', '2'],
        ['1/2', '4'],
        ['1/4', '6'],
        ['1/8', '8'],
        ['1/16', '10']
      ]), 'tempos_')
      .appendField('拍');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.BIT_BUZZER_PLAY_HELPURL);
    this.setColour(185);
  }
};

Blockly.Blocks['buzzer_music_play'] = {
  init: function () {
    this.appendStatementInput('music_')
      .setCheck(null)
      .appendField('開始演奏');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl("");
    this.setColour(180);
  }
};

Blockly.Blocks['buzzer_event'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['停止', '.stop()'],
        ['暫停', '.pause()'],
        ['繼續', '.play()']
      ]), 'event_')
      .appendField('演奏');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl("");
    this.setColour(180);
  }
};

Blockly.Blocks['buzzer_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('判斷演奏')
      .appendField(new Blockly.FieldDropdown([
        ['已經停止', 'stopped'],
        ['暫停中', 'paused'],
        ['進行中', 'playing']
      ]), 'state_');
    this.setOutput(true);
    this.setTooltip('');
    this.setHelpUrl("");
    this.setColour(185);
  }
};

Blockly.Blocks['buzzer_load_music'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('音樂')
      .appendField(new Blockly.FieldDropdown([
        ['超級瑪琍', 'm1'],
        ['超級瑪琍和弦', 'm4'],
        ['真善美', 'm2'],
        ['哥哥爸爸真偉大', 'm3'],
        ['叮叮噹', 'm5']
      ]), 'music_');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl("");
    this.setColour(185);
  }
};

/*
8b    d8 88""Yb 88   88 dP""Yb oP"Yb. 888888  dP"Yb
88b  d88 88__dP 88   88 Ybood8 "' dP' 88oo." dP   Yb
88YbdP88 88"""  Y8   8P   .8P'   dP'     `8b Yb   dP
88 YY 88 88     `YbodP'  .dP'  .d8888 8888P'  YbodP
*/

Blockly.Blocks['mpu9250_detected'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('九軸體感偵測 ( 重複無限次 )');
    this.appendStatementInput("do_")
      .appendField('執行')
      .appendField(Blockly.Msg.WEBDUINO_MPU9250_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(130);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  onchange: function () {
    if (this.getFieldValue('type_') === 'webduino.module.MPU9250Event.MAGNETOMETER_MESSAGE') {
      this.setFieldValue('webduino.module.MPU9250Event.ACCELEROMETER_MESSAGE', 'type_');
    }
  }
};

Blockly.Blocks['mpu9250_val'] = {
  init: function () {
    function getDropDownValue() {
      return [
        [Blockly.Msg.BIT_MPU9250_VAL_ROLL, 'angVals[0]'],
        [Blockly.Msg.BIT_MPU9250_VAL_PITCH, 'angVals[1]'],
        [Blockly.Msg.BIT_MPU9250_VAL_YAW, 'angVals[2]'],
        [Blockly.Msg.BIT_MPU9250_VAL_AZI, 'aziVals[0]'],
        [Blockly.Msg.BIT_MPU9250_VAL_ACCX, 'accVals[0]'],
        [Blockly.Msg.BIT_MPU9250_VAL_ACCY, 'accVals[1]'],
        [Blockly.Msg.BIT_MPU9250_VAL_ACCZ, 'accVals[2]'],
        [Blockly.Msg.BIT_MPU9250_VAL_GYRX, 'gyrVals[0]'],
        [Blockly.Msg.BIT_MPU9250_VAL_GYRY, 'gyrVals[1]'],
        [Blockly.Msg.BIT_MPU9250_VAL_GYRZ, 'gyrVals[2]'],
        [Blockly.Msg.BIT_MPU9250_VAL_MAGX, 'magVals[0]'],
        [Blockly.Msg.BIT_MPU9250_VAL_MAGY, 'magVals[1]'],
        [Blockly.Msg.BIT_MPU9250_VAL_MAGZ, 'magVals[2]']
      ];
    }
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(getDropDownValue), "val_")
      .appendField(Blockly.Msg.BIT_MPU9250_VAL, '的數值');
    this.setOutput(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_MPU9250_VAL_HELPURL);
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
    this.appendDummyInput()
      .appendField('停止偵測');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(130);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  onchange: function () {
    if (this.getFieldValue('type_') === 'webduino.module.MPU9250Event.MAGNETOMETER_MESSAGE') {
      this.setFieldValue('webduino.module.MPU9250Event.ACCELEROMETER_MESSAGE', 'type_');
    }
  }
};

let mpu9250_type = [
  [' {"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-01", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_SHAKE + '", "showTitle":"false"}', "shake"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-02", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_UP + '", "showTitle":"false"}', "face_front"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-03", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_ROLLBACK + '", "showTitle":"false"}', "row_back"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-04", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_ROLLRIGHT + '", "showTitle":"false"}', "pitch_right"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-05", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_TURNRIGHT + '", "showTitle":"false"}', "forward_pitch_right"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-06", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_PEACE + '", "showTitle":"false"}', "peace"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-07", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_BACK + '", "showTitle":"false"}', "face_back"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-08", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_ROLLFRONT + '", "showTitle":"false"}', "row_forward"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-09", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_ROLLLEFT + '", "showTitle":"false"}', "pitch_left"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-10", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_TRUNLEFT + '", "showTitle":"false"}', "forward_pitch_left"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-11", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_NORTH + '", "showTitle":"false"}', "face_north"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-12", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_WEST + '", "showTitle":"false"}', "face_west"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-13", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_SOUTH + '", "showTitle":"false"}', "face_south"],
  ['{"class":"' + Blockly.Msg.BIT_MPU9250_ICON + ' icon-14", "title":"' + Blockly.Msg.BIT_MPU9250_TYPE_TITLE_EAST + '", "showTitle":"false"} ', "face_east"]
];

Blockly.Blocks['mpu9250_detected_type'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.BIT_MPU9250_IF, "如果開發板")
      .appendField(new Blockly.FieldDropdown(mpu9250_type), "type_");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.BIT_MPU9250_DO, "執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.BIT_MPU9250_HELPURL);
    this.setCommentText(Blockly.Msg.BIT_MPU9250_COMMENT, "獨立使用，不需放在迴圈積木內");
  }
};



/*
8888b.  888888 8b    d8  dP"Yb
 8I  Yb 88__   88b  d88 dP   Yb
 8I  dY 88""   88YbdP88 Yb   dP
8888Y"  888888 88 YY 88  YbodP
*/

var monsterList = [
  ['{"src":"media/demo-edu-a1-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_GREEN + '", "showTitle":"true"}', 'demoMonster01'],
  ['{"src":"media/demo-edu-a2-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_RED + '", "showTitle":"true"}', 'demoMonster02'],
  ['{"src":"media/demo-edu-a3-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_YELLOW + '", "showTitle":"true"}', 'demoMonster03'],
  ['{"src":"media/demo-edu-a4-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_BLUE + '", "showTitle":"true"} ', 'demoMonster04']
];
var monsterList_all = [
  ['{"src":"media/demo-edu-a1-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_GREEN + '", "showTitle":"true"}', 'demoMonster01'],
  ['{"src":"media/demo-edu-a2-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_RED + '", "showTitle":"true"}', 'demoMonster02'],
  ['{"src":"media/demo-edu-a3-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_YELLOW + '", "showTitle":"true"}', 'demoMonster03'],
  ['{"src":"media/demo-edu-a4-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_BLUE + '", "showTitle":"true"}', 'demoMonster04'],
  ['{"src":"media/demo-edu-all-s.png", "width":"30", "height":"42", "title":"' + Blockly.Msg.MONSTER_ALL + '", "showTitle":"true"} ', 'all']
];

Blockly.Blocks['demo_monster_talk'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_TALK, "說");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_TALK_HELPURL);
  }
};

Blockly.Blocks['demo_monster_dont_talk'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_DONT_TALK, "不說話");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_TALK_HELPURL);
  }
};

Blockly.Blocks['demo_monster_show_image'] = {
  init: function () {
    this.appendValueInput("img_")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_SHOWIMG, "展示圖片");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_SHOWIMG_HELPURL);
  }
};

Blockly.Blocks['demo_monster_emotion'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_EMOTION, "的情緒為")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_EMOTION_NORMAL, "0"],
        [Blockly.Msg.MONSTER_EMOTION_HAPPY, "1"],
        [Blockly.Msg.MONSTER_EMOTION_SUPRISED, "2"],
        [Blockly.Msg.MONSTER_EMOTION_SAD, "3"],
        [Blockly.Msg.MONSTER_EMOTION_ANGRY, "4"],
        [Blockly.Msg.MONSTER_EMOTION_RANDOM, "random"]
      ]), "type_");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_EMOTION_HELPURL);
  }
};

Blockly.Blocks['demo_monster_move'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_MOVE_TO, "往")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_MOVE_TOP, "top"],
        [Blockly.Msg.MONSTER_MOVE_BOTTOM, "bottom"],
        [Blockly.Msg.MONSTER_MOVE_LEFT, "left"],
        [Blockly.Msg.MONSTER_MOVE_RIGHT, "right"],
        [Blockly.Msg.MONSTER_MOVE_RANDOM, "random"],
        [Blockly.Msg.MONSTER_MOVE_MOUSE, "mouse"]
      ]), "move_")
      .appendField(Blockly.Msg.MONSTER_MOVE, "移動");
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_MOVE_PIXEL, "點");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_MOVE_HELPURL);
  }
};

Blockly.Blocks['demo_monster_moveto'] = {
  init: function () {
    this.appendValueInput("x_")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_MOVETO_X, "定位到 x")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("y_")
      .setCheck(null)
      .appendField(Blockly.Msg.MONSTER_MOVETO_Y, "y")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_MOVETO_HELPURL);
  }
};

Blockly.Blocks['demo_monster_rotate'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_ROTATE_LEFT, "left"],
        [Blockly.Msg.MONSTER_ROTATE_RIGHT, "right"]
      ]), "rotate_");
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_ROTATE_ANGLE, "度");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_ROTATE_HELPURL);
  }
};

Blockly.Blocks['demo_monster_faceto'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_FACETO, "面朝");
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_FACETO_ANGLE, "度");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_FACETO_HELPURL);
  }
};

Blockly.Blocks['demo_monster_face_mouse'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_FACE_MOUSE_AUTO, "auto"],
        [Blockly.Msg.MONSTER_FACE_MOUSE_STOP, "stop"]
      ]), "type_")
      .appendField(Blockly.Msg.MONSTER_FACE_MOUSE, "面朝滑鼠方向");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_FACE_MOUSE_HELPURL);
  }
};

Blockly.Blocks['demo_monster_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(monsterList), "name_")
      .appendField(Blockly.Msg.MONSTER_STATE_S, "的")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_STATE_X, "x"],
        [Blockly.Msg.MONSTER_STATE_Y, "y"],
        [Blockly.Msg.MONSTER_STATE_ANGLE, "deg"]
      ]), "state_");
    this.setOutput(true, null);
    this.setColour(105);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_STATE_HELPURL);
  }
};

Blockly.Blocks['demo_monster_size'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck("Number")
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_SIZE, "的尺寸")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_SIZE_BIG, "big"],
        [Blockly.Msg.MONSTER_SIZE_SMALL, "small"]
      ]), "type_");
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_SIZE_PIXEL, "點");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_SIZE_HELPURL);
  }
};

Blockly.Blocks['demo_monster_sizeto'] = {
  init: function () {
    this.appendValueInput("val_")
      .setCheck("Number")
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_SIZETO, "的尺寸設定為");
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_SIZETO_PERCENT, "%");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_SIZETO_HELPURL);
  }
};

Blockly.Blocks['demo_monster_display'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_DISPLAY, "在舞台畫面中")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_DISPLAY_HIDE, "hide"],
        [Blockly.Msg.MONSTER_DISPLAY_SHOW, "show"]
      ]), "type_");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_DISPLAY_HELPURL);
  }
};

Blockly.Blocks['demo_monster_zindex'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(monsterList), "name_")
      .appendField(Blockly.Msg.MONSTER_ZINDEX, "的階層移到")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_ZINDEX_TOP, "1"],
        [Blockly.Msg.MONSTER_ZINDEX_BOTTOM, "2"]
      ]), "level_");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_ZINDEX_HELPURL);
  }
};

Blockly.Blocks['demo_monster_reset'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_RESET, "回到原始狀態");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_RESET_HELPURL);
  }
};

Blockly.Blocks['demo_monster_click'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_CLICK, "當滑鼠點擊")
      .appendField(new Blockly.FieldDropdown(monsterList), "name_");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.MONSTER_CLICK_DO, "執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_CLICK_HELPURL);
  }
};

Blockly.Blocks['demo_monster_hover'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_HOVER, "當滑鼠接觸")
      .appendField(new Blockly.FieldDropdown(monsterList), "name_");
    this.appendStatementInput("do1_")
      .setCheck(null)
      .appendField(Blockly.Msg.MONSTER_HOVER_ENTER, "碰到時，執行");
    this.appendStatementInput("do2_")
      .setCheck(null)
      .appendField(Blockly.Msg.MONSTER_HOVER_LEAVE, "離開時，執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_HELPURL);
  }
};

Blockly.Blocks['demo_monster_collision'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_COLLISION_WHEN, "當")
      .appendField(new Blockly.FieldDropdown(monsterList), "m1_")
      .appendField(Blockly.Msg.MONSTER_COLLISION, "碰到")
      .appendField(new Blockly.FieldDropdown(monsterList), "m2_");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.MONSTER_COLLISION_DO, "執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_COLLISION_HELPURL);
  }
};

Blockly.Blocks['demo_monster_stage'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_STAGE_WHEN, "當")
      .appendField(new Blockly.FieldDropdown(monsterList), "name_")
      .appendField(Blockly.Msg.MONSTER_STAGE, "碰到舞台畫面的")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_STAGE_EDGE, "edge"],
        [Blockly.Msg.MONSTER_STAGE_TOP_BOTTOM, "topOrBottom"],
        [Blockly.Msg.MONSTER_STAGE_LEFT_RIGHT, "letOrRight"],
        [Blockly.Msg.MONSTER_STAGE_TOP, "top"],
        [Blockly.Msg.MONSTER_STAGE_BOTTOM, "bottom"],
        [Blockly.Msg.MONSTER_STAGE_LEFT, "left"],
        [Blockly.Msg.MONSTER_STAGE_RIGHT, "right"]
      ]), "stage_");
    this.appendStatementInput("do_")
      .setCheck(null)
      .appendField(Blockly.Msg.MONSTER_STAGE_DO, "執行");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_STAGE_HELPURL);
  }
};

Blockly.Blocks['demo_monster_stage_rebound'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown(monsterList_all), "name_")
      .appendField(Blockly.Msg.MONSTER_STAGE_REBOUND, "碰到舞台邊緣就反彈");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_STAGE_REBOUND_HELPURL);
  }
};

Blockly.Blocks['demo_monster_background_color'] = {
  init: function () {
    this.appendValueInput("color_")
      .setCheck(null)
      .appendField(Blockly.Msg.MONSTER_BACKGROUND_COLOR, "更換怪獸舞台背景顏色為");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_BACKGROUND_COLOR_HELPURL);
  }
};

Blockly.Blocks['demo_monster_background_image'] = {
  init: function () {
    this.appendValueInput("image_")
      .setCheck(null)
      .appendField(Blockly.Msg.MONSTER_BACKGROUND_IMG, "更換怪獸舞台背景圖片為");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_BACKGROUND_IMG_HELPURL);
  }
};

Blockly.Blocks['demo_monster_stage_max'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_STAGE_MAX, "設定怪獸舞台為全螢幕");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_STAGE_MAX_HELPURL);
  }
};

Blockly.Blocks['demo_monster_stage_size'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.MONSTER_STAGE_SIZE, "怪獸舞台的")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.MONSTER_STAGE_SIZE_WIDTH, "width"],
        [Blockly.Msg.MONSTER_STAGE_SIZE_HEIGHT, "height"]
      ]), "type_");
    this.setOutput(true, null);
    this.setColour(105);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.MONSTER_STAGE_SIZE_HELPURL);
  }
};

let sound_01 = [
  [Blockly.Msg.SOUND_01_CAT, "cat-01"],
  [Blockly.Msg.SOUND_01_DOG, "dog-01"],
  [Blockly.Msg.SOUND_01_LION, "lion-01"],
  [Blockly.Msg.SOUND_01_GOAT, "goat-01"],
  [Blockly.Msg.SOUND_01_ELEPHANT, "elephant-01"],
  [Blockly.Msg.SOUND_01_CHICKEN, "chicken-01"],
  [Blockly.Msg.SOUND_01_CHICK, "chicken-02"],
  [Blockly.Msg.SOUND_01_DUCK, "duck-01"],
  [Blockly.Msg.SOUND_01_CROW, "crow-01"],
  [Blockly.Msg.SOUND_01_MONKEY, "monkey-01"],
  [Blockly.Msg.SOUND_01_FROG, "frog-01"],
  [Blockly.Msg.SOUND_01_MOUSE, "mouse-01"],
  [Blockly.Msg.SOUND_01_PIG, "pig-01"],
  [Blockly.Msg.SOUND_01_RANDOM, "random"]
];

Blockly.Blocks['sound_01'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.SOUND_01, "播放動物音效")
      .appendField(new Blockly.FieldDropdown(sound_01), "sound_");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.SOUND_HELPURL);
  }
};

let sound_02 = [
  [Blockly.Msg.SOUND_02_01, "sound-01"],
  [Blockly.Msg.SOUND_02_02, "sound-02"],
  [Blockly.Msg.SOUND_02_03, "sound-03"],
  [Blockly.Msg.SOUND_02_04, "sound-04"],
  [Blockly.Msg.SOUND_02_05, "sound-05"],
  [Blockly.Msg.SOUND_02_06, "sound-06"],
  [Blockly.Msg.SOUND_02_07, "sound-07"],
  [Blockly.Msg.SOUND_02_08, "sound-08"],
  [Blockly.Msg.SOUND_02_09, "sound-09"],
  [Blockly.Msg.SOUND_02_10, "sound-10"],
  [Blockly.Msg.SOUND_02_11, "sound-11"],
  [Blockly.Msg.SOUND_02_12, "coin-01"],
  [Blockly.Msg.SOUND_02_13, "jump-01"],
  [Blockly.Msg.SOUND_02_14, "death-01"],
  [Blockly.Msg.SOUND_02_15, "bell-01"],
  [Blockly.Msg.SOUND_02_RANDOM, "random"]
];

Blockly.Blocks['sound_02'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.SOUND_02, "播放特殊音效")
      .appendField(new Blockly.FieldDropdown(sound_02), "sound_");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.SOUND_HELPURL);
  }
};

let sound_03 = [
  [Blockly.Msg.SOUND_03_01, "sneeze-01"],
  [Blockly.Msg.SOUND_03_02, "laugth-01"],
  [Blockly.Msg.SOUND_03_03, "cough-01"],
  [Blockly.Msg.SOUND_03_04, "kiss-01"],
  [Blockly.Msg.SOUND_03_05, "applaud-01"],
  [Blockly.Msg.SOUND_03_06, "cry-01"],
  [Blockly.Msg.SOUND_03_07, "snoring-01"],
  [Blockly.Msg.SOUND_03_08, "fart-01"],
  [Blockly.Msg.SOUND_03_09, "whistle-01"],
  [Blockly.Msg.SOUND_03_10, "snore-01"],
  [Blockly.Msg.SOUND_03_11, "sigh-01"],
  [Blockly.Msg.SOUND_03_12, "sigh-02"],
  [Blockly.Msg.SOUND_03_RANDOM, "random"]
];

Blockly.Blocks['sound_03'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.SOUND_03, "播放人聲音效")
      .appendField(new Blockly.FieldDropdown(sound_03), "sound_");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.SOUND_HELPURL);
  }
};


/*
.dP"Y8 88""Yb 888888 888888  dP""b8 88  88
`Ybo." 88__dP 88__   88__   dP   `" 88  88
o.`Y8b 88"""  88""   88""   Yb      888888
8bodP' 88     888888 888888  YboodP 88  88
*/

Blockly.Blocks['speech_recognition'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.SPEECH, "語音辨識，語言")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.SPEECH_TW, "cmn-Hant-TW"],
        [Blockly.Msg.SPEECH_EN, "en-US"]
      ]), "lang_")
      .appendField(Blockly.Msg.SPEECH_SUPPORT, " ( 僅支援 Chrome、Android )");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.SPEECH_HELPURL);
    this.setCommentText(Blockly.Msg.SPEECH_COMMENT, "語音辨識之後，才會繼續執行下方程式");
  }
};

Blockly.Blocks['speech_recognition_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.SPEECH_VAL, "語音辨識的文字");
    this.setOutput(true, null);
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.SPEECH_HELPURL);
  }
};



Blockly.Blocks['pin_read_digital'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_PIN_READ)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), 'pin_')
      .appendField(Blockly.Msg.WEBDUINO_PIN_DIN);
    this.setOutput(true);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.WEBDUINO_PIN_READ_DIGITAL_HELPURL);
  }
};

Blockly.Blocks['pin_read_analog'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBDUINO_PIN_READ)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('analog')), 'pin_')
      .appendField(Blockly.Msg.WEBDUINO_PIN_AIN);
    this.setOutput(true);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.WEBDUINO_PIN_READ_ANALOG_HELPURL);
  }
};

Blockly.Blocks['pin_write_digital'] = {
  init: function () {
    this.appendValueInput("value_")
      .appendField(Blockly.Msg.WEBDUINO_PIN_DIGITAL_WRITE)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('digital')), 'pin_')
      .appendField(Blockly.Msg.WEBDUINO_PIN_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.WEBDUINO_PIN_WRITE_HELPURL);
  }
};

Blockly.Blocks['pin_write_analog'] = {
  init: function () {
    this.appendValueInput("value_")
      .appendField(Blockly.Msg.WEBDUINO_PIN_ANALOG_WRITE)
      .appendField(new Blockly.FieldDropdown(Code.getPinDropdown('pwm')), 'pin_')
      .appendField(Blockly.Msg.WEBDUINO_PIN_VALUE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl(Blockly.Msg.WEBDUINO_PIN_WRITE_HELPURL);
  }
};
