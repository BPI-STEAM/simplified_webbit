+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(function (scope) {
  'use strict';

  var Module = scope.Module,
    BoardEvent = scope.BoardEvent,
    proto;

  var MPU9250Event = {
    ACCELEROMETER_MESSAGE: 'a',
    GYROSCOPE_MESSAGE: 'g',
    MAGNETOMETER_MESSAGE: 'm',
    ANGLE_MESSAGE: 'o',   // Attitude angle : Orientation
    AZIMUTH_MESSAGE: 'c',   // Azimuth : compass
  };

  var COMMAND = {
    "START_DETECT": [0xf0, 0x04, 0x60, 0x02 /*start*/, 0xf7],
    "STOP_DETECT": [0xf0, 0x04, 0x60, 0x03, 0xf7],
    "START_ACC": [0xf0, 0x04, 0x60, 0x11, 0x1, 0xf7],
    "STOP_ACC": [0xf0, 0x04, 0x60, 0x11, 0x0, 0xf7],
    "START_GYR": [0xf0, 0x04, 0x60, 0x12, 0x1, 0xf7],
    "STOP_GYR": [0xf0, 0x04, 0x60, 0x12, 0x0, 0xf7],
    "START_MAG": [0xf0, 0x04, 0x60, 0x13, 0x1, 0xf7],
    "STOP_MAG": [0xf0, 0x04, 0x60, 0x13, 0x0, 0xf7],
    "START_ANG": [0xf0, 0x04, 0x60, 0x14, 0x1, 0xf7],
    "STOP_ANG": [0xf0, 0x04, 0x60, 0x14, 0x0, 0xf7],
    "START_AZI": [0xf0, 0x04, 0x60, 0x15, 0x1, 0xf7],
    "STOP_AZI": [0xf0, 0x04, 0x60, 0x15, 0x0, 0xf7]
  };

  /**
   * The MPU9250 class.
   * @namespace webduino.module
   * @class MPU9250
   * @constructor
   * @param {webduino.Board} board The board that the MPU9250 accelerometer is attached to.
   * @extends webduino.Module
   */
  function MPU9250(board) {
    Module.call(this);
    this._board = board;
    this._detectTimeType = 3; // 0: 50ms, 1: 100ms, 2: 250ms, 3: 500ms, 4: 1000ms
    this._messageHandler = onMessage.bind(this);
    this._startDetect = startDetect.bind(this);
    this._stopDetect = stopDetect.bind(this);
    this._stopDetectAll = stopDetectAll.bind(this);
    this._a_handlers = [];
    this._g_handlers = [];
    this._m_handlers = [];
    this._o_handlers = [];
    this._c_handlers = [];
  }

  function parseMPU9250Info(q) {
    if (q[0] != 0x60) return "";
    var info = String.fromCharCode(q[1] + 0x20) + " ";
    for (var i = 2; i < q.length; i++) {
      info += String.fromCharCode(q[i]);
    }
    info = info.trim().split(/\s+/);
    return info;
  }

  function onMessage(event) {
    var msg = event.message;
    if (msg[0] != 0x60) return;
    var info = parseMPU9250Info(msg);
    var handle = function (handlers, valAry) {
      handlers.forEach(function (cb) {
        cb.call(null, valAry[0], valAry[1], valAry[2], new Date().getTime());
      });
    };
    var commandType = msg[1];
    var vals = info.slice(1, 4);
    console.log(vals);
    switch (commandType) {
      case 0x02: //start
        console.log("Start mpu9250 detect...");
        break;
      case 0x03: //stop
        console.log("Stop mpu9250 detect.");
        break;
      case 0x11: //accelerometer data
        this._accVals = vals;
        handle(this._a_handlers, vals);
        break;
      case 0x12: //gyroscope data
        this._gyrVals = vals;
        handle(this._g_handlers, vals);
        break;
      case 0x13: //magnetometer data
        this._magVals = vals;
        handle(this._m_handlers, vals);
        break;
      case 0x14: //Attitude angle data
        this._angVals = vals;
        handle(this._o_handlers, vals);
        break;
      case 0x15: //Attitude angle data
        this._aziVals = vals;
        handle(this._c_handlers, vals);
        break;
    }
  }

  function startDetect(sensorType, handler) {
    if (typeof handler !== 'function') {
      return false;
    }
    switch (sensorType) {
      case MPU9250Event.ACCELEROMETER_MESSAGE:
        if (this._a_handlers.length === 0) {
          this._board.send(COMMAND.START_ACC);
        }
        this._a_handlers.push(handler);
        break;
      case MPU9250Event.GYROSCOPE_MESSAGE:
        if (this._g_handlers.length === 0) {
          this._board.send(COMMAND.START_GYR);
        }
        this._g_handlers.push(handler);
        break;
      case MPU9250Event.MAGNETOMETER_MESSAGE:
        if (this._m_handlers.length === 0) {
          this._board.send(COMMAND.START_MAG);
        }
        this._m_handlers.push(handler);
        break;
      case MPU9250Event.ANGLE_MESSAGE:
        if (this._o_handlers.length === 0) {
          this._board.send(COMMAND.START_ANG);
        }
        this._o_handlers.push(handler);
        break;
      case MPU9250Event.AZIMUTH_MESSAGE:
        if (this._c_handlers.length === 0) {
          this._board.send(COMMAND.START_AZI);
        }
        this._c_handlers.push(handler);
        break;
      default:
        return false;
        break;
    }
    return true;
  }

  function stopDetect(sensorType, handler) {
    switch (sensorType) {
      case MPU9250Event.ACCELEROMETER_MESSAGE:
        var idx = this._a_handlers.indexOf(handler);
        this._a_handlers.splice(idx, 1);
        if (this._a_handlers.length === 0) {
          this._board.send(COMMAND.STOP_ACC);
        }
        break;
      case MPU9250Event.GYROSCOPE_MESSAGE:
        var idx = this._g_handlers.indexOf(handler);
        this._g_handlers.splice(idx, 1);
        if (this._g_handlers.length === 0) {
          this._board.send(COMMAND.STOP_GYR);
        }
        break;
      case MPU9250Event.MAGNETOMETER_MESSAGE:
        var idx = this._m_handlers.indexOf(handler);
        this._m_handlers.splice(idx, 1);
        if (this._m_handlers.length === 0) {
          this._board.send(COMMAND.STOP_MAG);
        }
        break;
      case MPU9250Event.ANGLE_MESSAGE:
        var idx = this._o_handlers.indexOf(handler);
        this._o_handlers.splice(idx, 1);
        if (this._o_handlers.length === 0) {
          this._board.send(COMMAND.STOP_ANG);
        }
        break;
      case MPU9250Event.AZIMUTH_MESSAGE:
        var idx = this._c_handlers.indexOf(handler);
        this._c_handlers.splice(idx, 1);
        if (this._c_handlers.length === 0) {
          this._board.send(COMMAND.STOP_AZI);
        }
        break;
      default:
        return false;
        break;
    }
    return true;
  }

  function stopDetectAll(sensorType) {
    switch (sensorType) {
      case MPU9250Event.ACCELEROMETER_MESSAGE:
        this._a_handlers.length = 0;
        this._board.send(COMMAND.STOP_ACC);
        break;
      case MPU9250Event.GYROSCOPE_MESSAGE:
        this._g_handlers.length = 0;
        this._board.send(COMMAND.STOP_GYR);
        break;
      case MPU9250Event.MAGNETOMETER_MESSAGE:
        this._m_handlers.length = 0;
        this._board.send(COMMAND.STOP_MAG);
        break;
      case MPU9250Event.ANGLE_MESSAGE:
        this._o_handlers.length = 0;
        this._board.send(COMMAND.STOP_ANG);
        break;
      case MPU9250Event.AZIMUTH_MESSAGE:
        this._c_handlers.length = 0;
        this._board.send(COMMAND.STOP_AZI);
        break;
      default:
        return false;
        break;
    }
    return true;
  }

  MPU9250.prototype = proto = Object.create(Module.prototype, {
    constructor: {
      value: MPU9250
    },
    state: {
      get: function () {
        return this._state;
      },
      set: function (val) {
        this._state = val;
      }
    },
    accVals: {
      get: function () {
        return this._accVals || [];
      }
    },
    gyrVals: {
      get: function () {
        return this._gyrVals || [];
      }
    },
    magVals: {
      get: function () {
        return this._magVals || [];
      }
    },
    angVals: {
      get: function () {
        return this._angVals || [];
      }
    },
    aziVals: {
      get: function () {
        return this._aziVals || [];
      }
    }
  });

  proto.on = function (sensorType, handler) {
    if (arguments.length !== 2) {
      return false;
    }
    var result = this._startDetect(sensorType, handler);
    if (result && this._state !== 'on') {
      this._state = 'on';
      this._board.send(COMMAND.START_DETECT);
      this._board.on(BoardEvent.SYSEX_MESSAGE, this._messageHandler);
    }
  };

  proto.off = function (sensorType, handler) {
    var result;
    if (arguments.length === 1) {
      result = this._stopDetectAll(sensorType);
    } else {
      result = this._stopDetect(sensorType, handler);
    }
    if (result && !this._a_handlers.length && !this._g_handlers.length && !this._m_handlers.length && !this._o_handlers.length && !this._c_handlers.length) {
      this._state = 'off';
      this._board.send(COMMAND.STOP_DETECT);
      this._board.removeListener(BoardEvent.SYSEX_MESSAGE, this._messageHandler);
    }
  };

  proto.setDetectTimeType = function (detectTimeType) {
    if (detectTimeType !== this._detectTimeType) {
      this._detectTimeType = detectTimeType;
      this._board.send([0xf0, 0x04, 0x60, 0x01, detectTimeType, 0xf7]);
    }
  };

  scope.module.MPU9250 = MPU9250;
  scope.module.MPU9250Event = MPU9250Event;
}));
