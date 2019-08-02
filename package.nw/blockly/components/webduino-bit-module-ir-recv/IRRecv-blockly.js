+(function (window, webduino) {

  'use strict';

  window.getIRRecv = function (board, pin) {
    return new webduino.module.IRRecv(board, board.getDigitalPin(pin));
  }
}(window, window.webduino));
