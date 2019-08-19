+(function(factory) {
  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(function(scope) {
  'use strict';

  var Module = scope.Module,
  BoardEvent = scope.BoardEvent,
  proto;

  var TCS34725_MESSAGE = [0x04, 0x45];

  var TCS34725Event = {
    MESSAGE: 'message'
  };

  function TCS34725(board) {
    Module.call(this);
    this._board = board;
    this._init = false;
    this._color = 0;
    this._id = 0;
    this._callback = function() {};
    this._messageHandler = onMessage.bind(this);
    this._board.send([0xf0, 0x04, 0x45, 0x00, 0xf7]);
  }

  function onMessage(event) {
    var msg = event.message;
    if (msg[0] == TCS34725_MESSAGE[0] && msg[1] == TCS34725_MESSAGE[1]) {
      this.emit(TCS34725Event.MESSAGE, msg.slice(2));
    }
  }

  TCS34725.prototype = proto = Object.create(Module.prototype, {});

  proto.on = function(callback) {
    this._board.send([0xf0, 0x04, 0x45, 0x03, 0xf7]);
    if (typeof callback !== 'function') {
      callback = function() {};
    }
    this._callback = function(rawData) {
      var val = rawData;
      this._id = val;
      callback(this._id);
    };
    this.state = 'on';
    this._board.on(BoardEvent.SYSEX_MESSAGE, this._messageHandler);
    this.addListener(TCS34725Event.MESSAGE, this._callback);
  };

  proto.off = function() {
    this.state = 'off';
    this._board.send([0xf0, 0x04, 0x45, 0x02, 0xf7]);
    this._board.removeListener(BoardEvent.SYSEX_MESSAGE, this._messageHandler);
    this.removeListener(TCS34725Event.MESSAGE, this._callback);
    this._callback = null;
  };

  scope.module.TCS34725 = TCS34725;
}));
