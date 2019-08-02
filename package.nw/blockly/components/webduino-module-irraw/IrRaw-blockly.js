+(function (window, webduino) {

  'use strict';

  window.getIrRaw = function (board, pinMapping) {
    return new webduino.module.IrRaw(board, pinMapping);
  };

}(window, window.webduino));
