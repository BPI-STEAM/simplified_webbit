+(function (window, webduino) {

  'use strict';

  window.getGPS = function (board, rx, tx) {
    return new webduino.module.GPS(board, rx, tx);
  };

}(window, window.webduino));
