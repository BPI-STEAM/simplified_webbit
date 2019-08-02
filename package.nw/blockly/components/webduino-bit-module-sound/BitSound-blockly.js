+(function (window, webduino) {

  'use strict';

  window.getSound = function (board, pin) {
    return new webduino.module.Sound(board, board.getDigitalPin(pin));
  }

}(window, window.webduino));
