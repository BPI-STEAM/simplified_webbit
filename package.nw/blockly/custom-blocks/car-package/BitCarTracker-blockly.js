+(function (scope, webduino) {
  'use strict';
  const bitGPIO = scope.bitGPIO;

  scope.CarTracker = (function () {
    const instances = {};

    return {
      init: function (board) {
        const boardID = board._options.device || board._options.url;

        if (!instances[boardID]) {
          const carTracker = new webduino.module.CarTracker(board, bitGPIO(6), bitGPIO(13), bitGPIO(8), bitGPIO(14));
          carTracker.setTrackPin(bitGPIO(15), 0, bitGPIO(16));
          instances[boardID] = carTracker;
        }
        return instances[boardID];
      }
    }
  })();

}(window, window.webduino));
