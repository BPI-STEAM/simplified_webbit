+(function (window, webduino) {

  'use strict';

  window.getSoil = function (board, analogpin) {
    return new webduino.module.Soil(board, analogpin);
  }

}(window, window.webduino));
