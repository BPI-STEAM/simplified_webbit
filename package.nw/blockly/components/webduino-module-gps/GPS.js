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

  var GPS_MESSAGE = [0x04, 0x0C],
    MIN_READ_INTERVAL = 1000,
    MIN_RESPONSE_TIME = 30,
    RETRY_INTERVAL = 6000;

  var GPSEvent = {
    READ: 'read',
    READ_ERROR: 'readError'
  };

  function GPS(board, rx, tx) {
    Module.call(this);
    this._type = 'GPS';
    this._board = board;
    this._rx = rx;
    this._tx = tx;
    this._longitude = null;
    this._latitude = null;
    this._date = null;
    this._time = null;
    this._lastRecv = null;
    this._readTimer = null;
    this._readCallback = function () {};
    this._board.on(BoardEvent.BEFOREDISCONNECT, this.stopRead.bind(this));
    this._messageHandler = onMessage.bind(this);
    this._board.on(BoardEvent.ERROR, this.stopRead.bind(this));
    board.send([0xF0, 0x04, 0x0C, 0x0 /*init*/ , rx, tx, 0xF7]);
  }

  function onMessage(event) {
    var message = event.message;

    if (message[0] !== GPS_MESSAGE[0] || message[1] !== GPS_MESSAGE[1]) {
      return;
    } else {
      processGPSData(this, message);
    }
  }

  function toDateTime(date, time) {
    var t = Date.parse(date + ' ' + time) + 8 * 60 * 60 * 1000; //GMT+8
    var date = new Date(t);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    var mm = date.getMonth() + 1;
    var dd = "0" + date.getDate();
    var yyyy = date.getFullYear();
    var date = mm + '/' + dd.substr(-2) + '/' + yyyy;
    return [date, time];
  }

  function processGPSData(self, data) {
    var str = '';
    for (var i = 3; i < data.length; i++) {
      str += String.fromCharCode(data[i]);
    }
    str = str.split(' ');
    var location = str[0].split(',');
    self._lastRecv = Date.now();
    self._longitude = location[0];
    self._latitude = location[1];
    var date_time = toDateTime(str[1], str[2]);
    self._date = date_time[0];
    self._time = date_time[1];
    self.emit(GPSEvent.READ, location[0], location[1], date_time[0], date_time[1]);
  }

  GPS.prototype = proto = Object.create(Module.prototype, {
    constructor: {
      value: GPS
    },
    longitude: {
      get: function () {
        return this._longitude;
      }
    },
    latitude: {
      get: function () {
        return this._latitude;
      }
    },
    date: {
      get: function () {
        return this._date;
      }
    },
    time: {
      get: function () {
        return this._time;
      }
    }
  });

  proto.read = function (callback, interval) {
    var self = this,
      timer;

    self.stopRead();

    if (typeof callback === 'function') {
      self._readCallback = function (longitude, latitude, date, time) {
        self._date = date;
        self._time = time;
        callback({
          longitude: longitude,
          latitude: latitude,
          date: date,
          time: time
        });
      };
      self._board.on(BoardEvent.SYSEX_MESSAGE, self._messageHandler);
      self.on(GPSEvent.READ, self._readCallback);

      timer = function () {
        self._board.sendSysex(GPS_MESSAGE[0], [GPS_MESSAGE[1], 1]);
        if (interval) {
          interval = Math.max(interval, MIN_READ_INTERVAL);
          if (self._lastRecv === null || Date.now() - self._lastRecv < 5 * interval) {
            self._readTimer = setTimeout(timer, interval);
          } else {
            self.stopRead();
            setTimeout(function () {
              self.read(callback, interval);
            }, RETRY_INTERVAL);
          }
        }
      };

      timer();
    } else {
      return new Promise(function (resolve, reject) {
        self.read(function (data) {
          self._longitude = data.longitude;
          self._latitude = data.latitude;
          self._time = data.time;
          self._date = data.date;
          setTimeout(function () {
            resolve(data);
          }, MIN_RESPONSE_TIME);
        });
      });
    }
  };

  proto.stopRead = function () {
    this.removeListener(GPSEvent.READ, this._readCallback);
    this._board.removeListener(BoardEvent.SYSEX_MESSAGE, this._messageHandler);
    this._lastRecv = null;

    if (this._readTimer) {
      clearTimeout(this._readTimer);
      delete this._readTimer;
    }
  };

  scope.module.GPSEvent = GPSEvent;
  scope.module.GPS = GPS;
}));