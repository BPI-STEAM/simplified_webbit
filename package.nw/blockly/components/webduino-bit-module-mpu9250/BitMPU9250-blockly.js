+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(window, window.webduino);
  } else {
    module.exports = factory;
  }
}(function (scope, webduino) {

  'use strict';

  scope.getMPU9250 = function (board) {
    return new webduino.module.MPU9250(board);
  };
}));
