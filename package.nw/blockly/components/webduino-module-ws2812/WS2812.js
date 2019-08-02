+(function(factory) {
    if (typeof exports === 'undefined') {
        factory(webduino || {});
    } else {
        module.exports = factory;
    }
}(function(scope) {
    'use strict';

    var self;
    var proto;
    var sendLength = 50;
    var sendArray = [];
    var sendAck = '';
    var sendCallback;
    var Module = scope.Module;
    var _backlight;

    function WS2812(board, pin, leds) {
        Module.call(this);
        this._board = board;
        self = this;
        self._pin = pin;
        self._leds = leds;
        var cmd = '';
        if (leds <= 64) {
            cmd = [0xF0, 0x04, 0x21, 0x0 /*init*/ , leds, pin, 0xF7];
        } else {
            var h6bit = leds >>> 6;
            var l6bit = leds & 0x3F;
            cmd = [0xF0, 0x04, 0x21, 0x4 /*init*/ , h6bit, l6bit, pin, 0xF7];
        }
        board.send(cmd);
        board.on(webduino.BoardEvent.SYSEX_MESSAGE,
            function(event) {
                var m = event.message;
            });
    }

    WS2812.prototype = proto = Object.create(Module.prototype, {
        constructor: {
            value: WS2812
        },
        backlight: {
            get: function() {
                return _backlight;
            },
            set: function(val) {
                _backlight = val;
            }
        }
    });

    proto.setColor = function(led, color) {
        if (led > 64) {
            this.setColor64(led, color);
            return;
        }
        var data = '';
        var cmd = [0xF0, 0x04, 0x21, 0x03];
        if (arguments.length == 1) {
            data = led;
        } else {
            data = data.concat(toHex(led));
            data = data.concat(color.substring(1));
        }
        for (var i = 0; i < data.length; i++) {
            cmd.push(data.charCodeAt(i))
        }
        cmd.push(0xF7);
        this._board.send(cmd);
        this._board.flush();
    }

    proto.setColor64 = function(led, color) {
        var data = '';
        var cmd = [0xF0, 0x04, 0x21, 0x05];
        cmd.push(led >>> 6);
        cmd.push(led & 0x3F);
        data = data.concat(color.substring(1));
        for (var i = 0; i < data.length; i++) {
            cmd.push(data.charCodeAt(i))
        }
        cmd.push(0xF7);
        this._board.send(cmd);
        this._board.flush();
    }

    proto.off = function() {
        this._board.send([0xF0, 0x04, 0x21, 0x02, 0xF7]);
    }

    proto.brightness = function(b) {
        var data = toHex(b);
        this._board.send([0xF0, 0x04, 0x21, 0x01, b, 0xF7]);
        this._board.flush();
    }

    function toHex(num) {
        var str = num.toString(16);
        if (parseInt(num) < 16) {
            str = '0' + str;
        }
        return str;
    }

    scope.module.WS2812 = WS2812;
}));