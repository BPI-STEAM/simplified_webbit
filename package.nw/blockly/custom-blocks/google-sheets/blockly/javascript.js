Blockly.JavaScript['sheet_init'] = function (block) {
  let value_sheeturl = Blockly.JavaScript.valueToCode(block, 'sheetUrl', Blockly.JavaScript.ORDER_ATOMIC);
  let value_sheetname = Blockly.JavaScript.valueToCode(block, 'sheetName', Blockly.JavaScript.ORDER_ATOMIC);
  let code = 'sheetInit(' + value_sheeturl + ', ' + value_sheetname + ');\n';
  return code;
};


Blockly.JavaScript['sheet_write_easy'] = function (block) {
  let dropdown_type = block.getFieldValue('type');
  let code;
  if (block.itemCount_ > 1) {
    let data = '[';
    for (let n = 0; n < block.itemCount_; n++) {
      let val = Blockly.JavaScript.valueToCode(block, 'data_' + n) || '""';
      let newVal;
      if (val.indexOf(',') != -1 && val.indexOf('(') == -1 && val.indexOf(')') == -1) {
        newVal = "'" + val.replace(/\'/g, '').replace(/ /g, '') + "'";
      } else {
        newVal = val;
      }
      if (n < (block.itemCount_ - 1)) {
        data = data + newVal + ',';
      } else {
        data = data + newVal;
      }
    }
    code = 'await sheetWriteData(\'' + dropdown_type + '\', ' + data + '], \'auto\');\n';
  } else {
    let val = Blockly.JavaScript.valueToCode(block, 'data_' + 0) || '""';
    let newVal;
    if (val.indexOf(',') != -1 && val.indexOf('(') == -1 && val.indexOf(')') == -1) {
      newVal = "'" + val.replace(/\'/g, '').replace(/ /g, '') + "'";
    } else {
      newVal = val;
    }
    code = 'await sheetWriteData(\'' + dropdown_type + '\', ' + newVal + '], \'auto\');\n';
  }
  return code;
};

Blockly.JavaScript['sheet_write_normal'] = function (block) {
  let value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  let value_range = Blockly.JavaScript.valueToCode(block, 'range', Blockly.JavaScript.ORDER_ATOMIC);
  let code = 'await sheetWriteData(\'auto\', ' + value_data + ', ' + value_range + ');\n';
  return code;
};

Blockly.JavaScript['sheet_read'] = function (block) {
  let code = 'await sheetReadData();';
  return code;
};

Blockly.JavaScript['sheet_read_data'] = function (block) {
  let value_range = Blockly.JavaScript.valueToCode(block, 'range', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '_mySheet_.data.cell[' + value_range + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sheet_read_data_all'] = function (block) {
  let code = '_mySheet_.data.data';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sheet_read_data_last'] = function (block) {
  let dropdown_type = block.getFieldValue('type');
  let code = '_mySheet_.data.' + dropdown_type;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['sheet_delete_row'] = function (block) {
  let value_num = Blockly.JavaScript.valueToCode(block, 'num', Blockly.JavaScript.ORDER_ATOMIC);
  let value_delete_num = Blockly.JavaScript.valueToCode(block, 'delete_num', Blockly.JavaScript.ORDER_ATOMIC);
  let code = 'await sheetFeature(\'delete\',\'row\',' + value_num + ',' + value_delete_num + ');\n';
  return code;
};

Blockly.JavaScript['sheet_delete_column'] = function (block) {
  let value_num = Blockly.JavaScript.valueToCode(block, 'num', Blockly.JavaScript.ORDER_ATOMIC);
  let value_delete_num = Blockly.JavaScript.valueToCode(block, 'delete_num', Blockly.JavaScript.ORDER_ATOMIC);
  let code = 'await sheetFeature(\'delete\',\'column\',' + value_num + ',' + value_delete_num + ');\n';
  return code;
};

Blockly.JavaScript['sheet_add_row'] = function (block) {
  let value_num = Blockly.JavaScript.valueToCode(block, 'num', Blockly.JavaScript.ORDER_ATOMIC);
  let value_add_num = Blockly.JavaScript.valueToCode(block, 'add_num', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_add_type = block.getFieldValue('add_type');
  let code = 'await sheetFeature(\'addRow\',\'' + dropdown_add_type + '\',' + value_num + ',' + value_add_num + ');\n';
  return code;
};

Blockly.JavaScript['sheet_add_column'] = function (block) {
  let value_num = Blockly.JavaScript.valueToCode(block, 'num', Blockly.JavaScript.ORDER_ATOMIC);
  let value_add_num = Blockly.JavaScript.valueToCode(block, 'add_num', Blockly.JavaScript.ORDER_ATOMIC);
  let dropdown_add_type = block.getFieldValue('add_type');
  let code = 'await sheetFeature(\'addColumn\',\'' + dropdown_add_type + '\',' + value_num + ',' + value_add_num + ');\n';
  return code;
};