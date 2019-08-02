+(function (scope, webduino) {
  'use strict';
  const bitGPIO = scope.bitGPIO;

  scope.WS2812 = (function () {
    const instances = {};

    return {
      init: function (board) {
        const boardID = board._options.device || board._options.url;

        if (!instances[boardID]) {
          instances[boardID] = new webduino.module.WS2812(board, bitGPIO(10), 8);
        }
        return instances[boardID];
      }
    }
  })();

}(window, window.webduino));
