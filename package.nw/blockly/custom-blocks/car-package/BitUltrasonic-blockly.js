+(function (scope, webduino) {

  'use strict';

  scope.Ultrasonic = (function () {
    const instances = {};

    return {
      init: async function (board) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = boardID;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.Ultrasonic(
            board,
            board.getDigitalPin(scope.bitGPIO(3)),
            board.getDigitalPin(scope.bitGPIO(9))
          );
          await new Promise(resolve => {
            instances[tagetObject].ping(resolve, 500);
          });
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
