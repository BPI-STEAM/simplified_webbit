+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(function (scope) {
  'use strict';

  var self;
  var proto;
  var sendArray = [];
  var sending = false;
  var sendAck = '';
  var sendCallback;
  var Module = scope.Module;
  var _backlight;

  function LORA(board, rstPin, address) {
    Module.call(this);
    this._board = board;
    self = this;
    self._rstPin = rstPin;
    self._address = address;
    self._callbackAckOK = function () {}
    self._callbackAckErr = function () {}
    self._callbackRecvAckOK = function () {}
    self.recvData = '';
    var cmd = [0xF0, 0x04, 0x22, 0x0 /*init*/ , rstPin, address, 0xF7];
    board.send(cmd);
    board.on(webduino.BoardEvent.SYSEX_MESSAGE,
      function (event) {
        var m = event.message;
        //send Ack response
        if (m.length == 4 && m[2] == 2) {
          var state = m[3] - 48; //ascii to int
          if (state == 0) {
            self._callbackAckOK();
          } else {
            self._callbackAckErr();
          }
        }
        //recv Ack response
        if (m[2] == 4) {
          var data = '';
          for (var i = 3; i < m.length; i++) {
            data += String.fromCharCode(m[i]);
          }
          self.recvData = data;
          self._callbackRecvAckOK();
        }
        sending = false;
      });
  }

  LORA.prototype = proto = Object.create(Module.prototype, {
    constructor: {
      value: LORA
    }
  });

  proto.send = function (strData) {
    var cmd = [0xF0, 0x04, 0x22, 0x01, this._address /*Address*/ ];
    cmd = cmd.concat(toASCII(strData));
    cmd.push(0xF7);
    this._board.send(cmd);
  }

  proto.sendAck = function (strData, ackOK, ackErr) {
    if (arguments.length == 2) {
      self._callbackAckOK = ackOK;
    }
    if (arguments.length == 3) {
      self._callbackAckOK = ackOK;
      self._callbackAckErr = ackErr;
    }
    var cmd = [0xF0, 0x04, 0x22, 0x02, this._address /*Address*/ ];
    cmd = cmd.concat(toASCII(strData));
    cmd.push(0xF7);
    this._board.send(cmd);
  }

  proto.recvAck = function (ackOK) {
    if (arguments.length == 1) {
      self._callbackRecvAckOK = ackOK;
    }
    var cmd = [0xF0, 0x04, 0x22, 0x04, this._address /*Address*/ , 0xF7];
    this._board.send(cmd);
  }

  function toASCII(str) {
    var data = [];
    for (var i = 0; i < str.length; i++) {
      data.push(str.charCodeAt(i));
    }
    return data;
  }

  scope.module.LORA = LORA;
}));