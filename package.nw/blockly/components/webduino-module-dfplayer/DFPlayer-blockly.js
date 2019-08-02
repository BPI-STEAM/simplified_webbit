+(function (window, webduino) {

  'use strict';

  window.getDFPlayer = function (board, rx, tx) {
    return new webduino.module.DFPlayer(board, rx, tx);
  };

}(window, window.webduino));
