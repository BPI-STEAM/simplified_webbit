+(function (scope, webduino) {
  'use strict';

  scope.DHT = (function () {
    const bitGPIO = scope.bitGPIO;
    const instances = {};

    return {
      init: function (board, pin) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${pin}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.Dht(board, board.getDigitalPin(bitGPIO(pin)));
          instances[tagetObject].read(value => {
            instances[tagetObject].temp = value.temperature;
            instances[tagetObject].humd = value.humidity;
          }, 500);
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
