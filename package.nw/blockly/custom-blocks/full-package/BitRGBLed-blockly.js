+(function (scope, webduino) {
  'use strict';

  scope.RGBLED = (function () {
    const bitGPIO = scope.bitGPIO;
    const instances = {};

    return {
      init: function (board, red, green, blue) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${red}_${green}_${blue}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.RGBLed(
            board,
            board.getDigitalPin(bitGPIO(red)),
            board.getDigitalPin(bitGPIO(green)),
            board.getDigitalPin(bitGPIO(blue))
          );
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
