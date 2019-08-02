+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(window, window.webduino);
  } else {
    module.exports = factory;
  }
}(function (scope, webduino) {

  'use strict';

  scope.getThermistor = function (board, analogpin) {
    return new webduino.module.Thermistor(board, analogpin);
  };
}));