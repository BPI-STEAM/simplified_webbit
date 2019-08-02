const matrix = require('./BitLedMatrix');
const matrixBlockly = require('./BitLedMatrix-blockly');

// Add to webduino-blockly
if (global.boardReady) {
  matrix(global.webduino);
  matrixBlockly(global, global.webduino);
}

module.exports = matrix;
