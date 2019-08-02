+(function (window, webduino) {

  'use strict';

  window.getLORA = function (board, rstPin, address) {
    return new webduino.module.LORA(board, rstPin, address);
  };

}(window, window.webduino));