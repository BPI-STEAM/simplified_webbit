+(function (window, webduino) {

  'use strict';

  window.getwabot = function (board) {
    return new webduino.module.wabot(board);
  };

}(window, window.webduino));
