var initMQTTClient = `
if (!webduinoBroadcastor) {
  var webduinoBroadcastor = new webduino.module.mqttClient();
  await webduinoBroadcastor.connect({ server: 'wss://mqtt1.webduino.io/mqtt' });
}\n`;

Blockly.JavaScript['radio_channel_get'] = function (block) {
  var channel = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  var callback = Blockly.JavaScript.statementToCode(block, 'do_', Blockly.JavaScript.ORDER_FUNCTION_CALL);
  callback = callback.replace('//_loop_','_loop_');
  var code = `
${initMQTTClient}
await webduinoBroadcastor.subscribe(${channel});
webduinoBroadcastor.on('message', async (mqttData) => {
${callback}});\n`;
  return code;
};

Blockly.JavaScript['radio_channel_set'] = function (block) {
  var message = Blockly.JavaScript.valueToCode(block, 'msg_', Blockly.JavaScript.ORDER_ATOMIC);
  var topic = Blockly.JavaScript.valueToCode(block, 'name_', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `
${initMQTTClient}
webduinoBroadcastor.send({
  topic: ${topic}, 
  message: (${message}).toString()
});\n`;
  return code;
};

Blockly.JavaScript['radio_channel_value'] = function (block) {
  return ['mqttData.payloadString', Blockly.JavaScript.ORDER_ATOMIC];
};
