const webduinoModule = require('./BitThermistor');
const supportBlockly = require('./BitThermistor-blockly');

// Add to webduino-blockly
if (global.boardReady) {
  webduinoModule(global.webduino);
  supportBlockly(global, global.webduino);
}

module.exports = webduinoModule;
