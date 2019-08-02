+(function (scope, webduino) {

  'use strict';

  scope.IrLed = (function () {
    const instances = {};

    return {
      init: function (board, pin) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${pin}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.IRLed(board, 'ffffffff');
        }
        return instances[tagetObject];
      }
    }
  })();

  scope.IrRecv = (function () {
    const instances = {};

    return {
      init: function (board, pin) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${pin}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.IRRecv(board, board.getDigitalPin(scope.bitGPIO(pin)));
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
