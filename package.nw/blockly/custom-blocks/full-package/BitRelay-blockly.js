+(function (scope, webduino) {
  'use strict';

  scope.Relay = (function () {
    const bitGPIO = scope.bitGPIO;
    const instances = {};

    return {
      init: function (board, pin) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${pin}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.Relay(board, board.getDigitalPin(bitGPIO(pin)));
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
