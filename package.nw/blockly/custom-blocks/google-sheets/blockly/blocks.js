Blockly.Blocks['sheet_init'] = {
  init: function () {
    this.appendValueInput("sheetUrl")
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_INIT_URL, "載入 Google 試算表網址")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("sheetName")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_INIT_NAME, "工作表名稱");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_INIT_HELPURL);
  }
};

Blockly.Blocks['sheet_write_normal'] = {
  init: function () {
    this.appendValueInput("range")
      .setCheck(null)
      .setCheck("String")
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_FROM, "從 Google 試算表的");
    this.appendValueInput("data")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE, "寫入資料");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_HELPURL);
    this.setCommentText(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_COMMENT, "試算表寫入資料之後，才會繼續執行下方程式");
  }
};


Blockly.Blocks['sheet_write_easy'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_FROM, "從 Google 試算表的")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_FIRST, "first"],
        [Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_LAST, "last"]
      ]), "type")
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY, "寫入資料");
    this.appendValueInput('data_0')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_COLUMN_A, '欄位 A 值:');
    this.appendValueInput('data_1')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_COLUMN_B, '欄位 B 值:');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['sheet_write_easy_item']));
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_HELPURL);
    this.setCommentText(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_COMMENT, "試算表寫入資料之後，才會繼續執行下方程式");
    this.itemCount_ = 2;
  },
  mutationToDom: function (workspace) {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function (container) {
    var Alphabet = ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('data_' + x);
    }
    this.itemCount_ = parseInt(container.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      if (x < 27) {
        var input = this.appendValueInput('data_' + x)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.WEBDUINO_GOOGLESHEETS_COLUMNWITE + Alphabet[x + 1] + Blockly.Msg.WEBDUINO_GOOGLESHEETS_COLUMNVALUE);
      } else {
        var input = this.appendValueInput('data_' + x)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.WEBDUINO_GOOGLESHEETS_COLUMNWITE + (x + 1) + Blockly.Msg.WEBDUINO_GOOGLESHEETS_COLUMNVALUE);
      }
    }
  },
  decompose: function (workspace) {
    var containerBlock = Blockly.Block.obtain(workspace, 'sheet_write_easy_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var optionBlock = Blockly.Block.obtain(workspace, 'sheet_write_easy_item');
      optionBlock.initSvg();
      connection.connect(optionBlock.previousConnection);
      connection = optionBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function (containerBlock) {
    var Alphabet = ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var x = this.itemCount_ - 1; x >= 0; x--) {
      this.removeInput('data_' + x);
    }
    this.itemCount_ = 0;
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    while (optionBlock) {
      if (this.itemCount_ < 27) {
        var input = this.appendValueInput('data_' + this.itemCount_)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.WEBDUINO_GOOGLESHEETS_COLUMNWITE + Alphabet[this.itemCount_ + 1] + Blockly.Msg.WEBDUINO_GOOGLESHEETS_COLUMNVALUE);
      } else {
        var input = this.appendValueInput('data_' + this.itemCount_)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(Blockly.Msg.WEBDUINO_GOOGLESHEETS_COLUMNWITE + (this.itemCount_ + 1) + Blockly.Msg.WEBDUINO_GOOGLESHEETS_COLUMNVALUE);
      }
      if (optionBlock.dataData_) {
        input.connection.connect(optionBlock.dataData_);
      }
      this.itemCount_++;
      optionBlock = optionBlock.nextConnection &&
        optionBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function (containerBlock) {
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (optionBlock) {
      var name = this.getFieldValue('name_' + x);
      var data = this.getInput('data_' + x);
      optionBlock.nameData_ = name;
      optionBlock.dataData_ = data && data.connection.targetConnection;
      x++;
      optionBlock = optionBlock.nextConnection &&
        optionBlock.nextConnection.targetBlock();
    }
  },
  newQuote_: Blockly.Blocks['text'].newQuote_
};


Blockly.Blocks['sheet_write_easy_container'] = {
  init: function () {
    this.setColour(100);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_COLUMN_ADD, '增加資料欄位');
    this.appendStatementInput('STACK');
    this.setTooltip('');
    this.setColour(90);
    this.contextMenu = false;
  }
};

Blockly.Blocks['sheet_write_easy_item'] = {
  init: function () {
    this.setColour(100);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_WRITE_EASY_COLUMN, '欄位');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setColour(95);
    this.contextMenu = false;
  }
};

Blockly.Blocks['sheet_read'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_READ, "從 Google 試算表讀取資料");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_READ_COMMENT_HELPURL);
    this.setCommentText(Blockly.Msg.WEBBIT_SPREADSHEET_READ_COMMENT, "讀取試算表所有的資料，讀取之後，才會繼續執行下方程式");
  }
};


Blockly.Blocks['sheet_read_data'] = {
  init: function () {
    this.appendValueInput("range")
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_READ_CELL, "儲存格")
      .setCheck(null);
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_READ_CELL_DATA, "的資料");
    this.setOutput(true, null);
    this.setColour(95);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_READ_COMMENT_HELPURL);
  }
};

Blockly.Blocks['sheet_read_data_all'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_READ_ALL, "所有的資料");
    this.setOutput(true, null);
    this.setColour(95);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_READ_COMMENT_HELPURL);
  }
};

Blockly.Blocks['sheet_read_data_last'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_READ_LAST, "最後一")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBBIT_SPREADSHEET_READ_LAST_ROW, "lastRow"], 
        [Blockly.Msg.WEBBIT_SPREADSHEET_READ_LAST_COLUMN,  "lastColumn"]
      ]), "type")
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_READ_LAST_NUM, "的號碼");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(95);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_READ_COMMENT_HELPURL);
  }
};

Blockly.Blocks['sheet_delete_row'] = {
  init: function () {
    this.appendValueInput("num")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_ROW, "從 Google 試算表刪除第");
    this.appendValueInput("delete_num")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_ROW_FROM, "列到第");
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_ROW_TO, "列");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_HELPURL);
    this.setCommentText(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_COMMENT, "刪除之後，才會繼續執行下方程式");
  }
};

Blockly.Blocks['sheet_delete_column'] = {
  init: function () {
    this.appendValueInput("num")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_COLUMN, "從 Google 試算表刪除第");
    this.appendValueInput("delete_num")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_COLUMN_FROM, "欄到第");
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_COLUMN_TO, "欄");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_HELPURL);
    this.setCommentText(Blockly.Msg.WEBBIT_SPREADSHEET_DELETE_COMMENT, "刪除之後，才會繼續執行下方程式");
  }
};

Blockly.Blocks['sheet_add_row'] = {
  init: function () {
    this.appendValueInput("num")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_ROW, "從 Google 試算表的第");
    this.appendValueInput("add_num")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_ROW_FROM, "列的")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBBIT_SPREADSHEET_ADD_ROW_ABOVE, "above"], 
        [Blockly.Msg.WEBBIT_SPREADSHEET_ADD_ROW_AFTER, "after"]
      ]), "add_type")
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_ROW_ADD, "增加");
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_ROW_TO, "列");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_HELPURL);
    this.setCommentText(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_COMMENT, "增加之後，才會繼續執行下方程式");
  }
};

Blockly.Blocks['sheet_add_column'] = {
  init: function () {
    this.appendValueInput("num")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_COLUMN, "從 Google 試算表的第");
    this.appendValueInput("add_num")
      .setCheck(null)
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_COLUMN_FROM, "欄的")
      .appendField(new Blockly.FieldDropdown([
        [Blockly.Msg.WEBBIT_SPREADSHEET_ADD_COLUMN_LEFT, "above"], 
        [Blockly.Msg.WEBBIT_SPREADSHEET_ADD_COLUMN_RIGHT, "after"]
      ]), "add_type")
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_COLUMN_ADD, "增加");
    this.appendDummyInput()
      .appendField(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_COLUMN_TO, "欄");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(90);
    this.setTooltip("");
    this.setHelpUrl(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_HELPURL);
    this.setCommentText(Blockly.Msg.WEBBIT_SPREADSHEET_ADD_COMMENT, "增加之後，才會繼續執行下方程式");
  }
};