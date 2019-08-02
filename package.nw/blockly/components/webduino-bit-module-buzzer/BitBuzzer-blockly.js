+(function (window, webduino) {

  'use strict';

  window.getBuzzer = function (board, pin) {
    return new webduino.module.Buzzer(board, board.getDigitalPin(pin));
  }

}(window, window.webduino));
