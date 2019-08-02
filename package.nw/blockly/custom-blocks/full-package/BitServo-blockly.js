+(function (scope, webduino) {

  'use strict';

  scope.Servo = (function () {
    const instances = {};

    return {
      init: function (board, pin) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${pin}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.Servo(board, board.getDigitalPin(scope.bitGPIO(pin)));
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
