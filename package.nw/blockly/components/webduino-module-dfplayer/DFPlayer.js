+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(function (scope) {
  'use strict';
  var SENSOR_DFPLAYER = 0x19;//dec:25

  var self;
  var proto;
  var sendLength = 50;
  var sendArray = [];
  var sending = false;
  var sendAck = '';
  var sendCallback;
  var Module = scope.Module;
  var sendAndAckCount = 0;
  var waitAckAndSend = [];
  var _play;

  function DFPlayer(board, RX, TX) {
    Module.call(this);
    this._board = board;
    this._rx = RX;
    this._tx = TX;
    self = this;
    board.on(webduino.BoardEvent.BEFOREDISCONNECT, this.stop.bind(this));
    board.on(webduino.BoardEvent.ERROR, this.stop.bind(this));
    board.on(webduino.BoardEvent.SYSEX_MESSAGE,
      function (event) {
        var m = event.message;
        if (m[0] == 0x04 && m[1] == SENSOR_DFPLAYER) {
          console.log("mp3 response:",m);
        }
      });
    self.init();
    console.log("MP3 ready...");
  }

  DFPlayer.prototype = proto = Object.create(Module.prototype, {
    constructor: {
      value: DFPlayer
    },
    play: {
      get: function () {
        return _play;
      },
      set: function (val) {
        _play = val;
      }
    }
  });

  proto.init = function () {
    var cmd = [0xF0, 0x04, SENSOR_DFPLAYER, 0x0 /*init*/ , this._rx, this._tx, 0xF7];
    this._board.send(cmd);
  }

  proto.play = function (num) {
    var cmd = [0xF0, 0x04, SENSOR_DFPLAYER, 0x01, num, 0xF7];
    this._board.send(cmd);
  }

  proto.start = function () {
    this._board.send([0xF0, 0x04, SENSOR_DFPLAYER, 0x02 /*Start*/ , 0xF7]);
  }

  proto.stop = function () {
    this._board.send([0xF0, 0x04, SENSOR_DFPLAYER, 0x03 /*Stop*/ , 0xF7]);
  }

  proto.pause = function () {
    this._board.send([0xF0, 0x04, SENSOR_DFPLAYER, 0x04 /*Pause*/ , 0xF7]);
  }

  proto.volume = function (volume) {
    this._board.send([0xF0, 0x04, SENSOR_DFPLAYER, 0x05, volume, 0xF7]);
  }

  proto.previous = function () {
    this._board.send([0xF0, 0x04, SENSOR_DFPLAYER, 0x06 /*Previous*/ , 0xF7]);
  }

  proto.next = function () {
    this._board.send([0xF0, 0x04, SENSOR_DFPLAYER, 0x07 /*Next*/ , 0xF7]);
  }

  proto.loop = function (num) {
    this._board.send([0xF0, 0x04, SENSOR_DFPLAYER, 0x08, num, 0xF7]);
  }
  scope.module.DFPlayer = DFPlayer;
}));
