const webduinoModule = require('./BitMPU9250');
const supportBlockly = require('./BitMPU9250-blockly');

// Add to webduino-blockly
if (global.boardReady) {
  webduinoModule(global.webduino);
  supportBlockly(global, global.webduino);
}

module.exports = webduinoModule;
