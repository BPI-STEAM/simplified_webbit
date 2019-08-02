+(function (window, webduino) {

  'use strict';

  window.getWS2812 = function (board, pin, leds) {
    return new webduino.module.WS2812(board, pin, leds);
  };

}(window, window.webduino));
