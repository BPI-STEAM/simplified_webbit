+(function (scope, webduino) {

  'use strict';

  scope.Ultrasonic = (function () {
    const instances = {};

    return {
      init: async function (board, trig, echo) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${trig}_${echo}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.Ultrasonic(
            board,
            board.getDigitalPin(scope.bitGPIO(trig)),
            board.getDigitalPin(scope.bitGPIO(echo))
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
