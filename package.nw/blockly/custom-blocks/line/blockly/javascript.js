Blockly.JavaScript['line_ifttt'] = function (block) {
  let event = Blockly.JavaScript.valueToCode(block, 'line_ifttt_event', Blockly.JavaScript.ORDER_ATOMIC);
  let key = Blockly.JavaScript.valueToCode(block, 'line_ifttt_key', Blockly.JavaScript.ORDER_ATOMIC);
  let v1 = Blockly.JavaScript.valueToCode(block, 'line_ifttt_value1', Blockly.JavaScript.ORDER_ATOMIC);
  let v2 = Blockly.JavaScript.valueToCode(block, 'line_ifttt_value2', Blockly.JavaScript.ORDER_ATOMIC);
  let v3 = Blockly.JavaScript.valueToCode(block, 'line_ifttt_value3', Blockly.JavaScript.ORDER_ATOMIC);

  if (v1.length == 0) {
    v1 = "''";
  }
  if (v2.length == 0) {
    v2 = "''";
  }
  if (v3.length == 0) {
    v3 = "''";
  }

  let code = 'line_ifttt(' + event + ',' + key + ',' + v1 + ',' + v2 + ',' + v3 + ');\n' +
    'await delay(1);\n';

  return code;
};


Blockly.JavaScript['line_notify'] = function (block) {
  let token = Blockly.JavaScript.valueToCode(block, 'line_notify_token', Blockly.JavaScript.ORDER_ATOMIC);
  let msg = Blockly.JavaScript.valueToCode(block, 'line_notify_msg', Blockly.JavaScript.ORDER_ATOMIC);

  if (msg.length == 0) {
    msg = "''";
  }

  var code = 'await line_notify(' + token + ',' + msg + ');\n';

  return code;
};


Blockly.JavaScript['line_bot'] = function (block) {
  let token = Blockly.JavaScript.valueToCode(block, 'line_bot_token', Blockly.JavaScript.ORDER_ATOMIC);
  let uid = Blockly.JavaScript.valueToCode(block, 'line_bot_uid', Blockly.JavaScript.ORDER_ATOMIC);
  let msg = Blockly.JavaScript.valueToCode(block, 'line_bot_msg', Blockly.JavaScript.ORDER_ATOMIC);

  if (msg.length == 0) {
    msg = "''";
  }
  let code = 'line_bot(' + token + ',' + uid + ',' + msg + ');\n' +
    'await delay(1);\n';

  return code;
};

Blockly.JavaScript['line_sticker'] = function (block) {
  let package = Blockly.JavaScript.valueToCode(block, 'package', Blockly.JavaScript.ORDER_ATOMIC);
  let sticker = Blockly.JavaScript.valueToCode(block, 'sticker', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '{message:" ",stickerPackageId:' + package + ',stickerId:' + sticker + ',type:"sticker"}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['line_image'] = function (block) {
  let value_img_url = Blockly.JavaScript.valueToCode(block, 'img_url', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '{message:" ",imageUri:' + value_img_url + ',type:"image"}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['line_chat'] = function (block) {
  let channel = Blockly.JavaScript.valueToCode(block, 'channel', Blockly.JavaScript.ORDER_ATOMIC);
  let statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  statements_do = statements_do.replace('//_loop_','_loop_');
  if (channel.length == 0) {
    channel = "''";
  }
  let code = 'let _chatChannel = line_channel(' + channel + ');\n' +
    '_chatChannel.on("value", async function(_e){\n' +
    '  let _msg = "";\n' +
    '  if(_e.val()){\n' +
    '    _msg = _e.val().msg;\n' +
    '  }\n' +
    '  if(_msg){\n' + 
    statements_do +
    '  }\n' +
    '});\n';
  return code;
};

Blockly.JavaScript['line_chat_msg'] = function (block) {
  let code = '_msg';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['line_chat_reply'] = function (block) {
  let msg = Blockly.JavaScript.valueToCode(block, 'msg', Blockly.JavaScript.ORDER_ATOMIC);
  if (msg.length == 0) {
    msg = "''";
  }
  let code = 'await line_reply(_e.val().uid , ' + msg + ', _e.val().rt);\n';

  return code;
};
