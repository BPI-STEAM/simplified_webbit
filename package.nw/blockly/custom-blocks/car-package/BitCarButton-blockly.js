+(function (scope, webduino) {

  'use strict';
  const bitGPIO = scope.bitGPIO;

  scope.CarButton = (function () {
    const instances = {};

    return {
      init: function (board) {
        const boardID = board._options.device || board._options.url;

        if (!instances[boardID]) {
          const button = new webduino.module.Button(board, board.getDigitalPin(bitGPIO(7)), webduino.module.Button.PULL_UP);
          instances[boardID] = button;
        }
        return instances[boardID];
      }
    }
  })();

}(window, window.webduino));
