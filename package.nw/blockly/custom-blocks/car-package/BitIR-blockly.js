+(function (scope, webduino) {

  'use strict';

  scope.IrLed = (function () {
    const instances = {};

    return {
      init: function (board) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = boardID;

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
      init: function (board) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = boardID;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.IRRecv(board, board.getDigitalPin(scope.bitGPIO(1)));
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
