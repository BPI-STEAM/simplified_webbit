+(function(factory) {
    if (typeof exports === 'undefined') {
        factory(webduino || {});
    } else {
        module.exports = factory;
    }
}(function(scope) {
    'use strict';
    var SENSOR_WABOT = 0x2A; //dec:42
    var self;
    var proto;
    var Module = scope.Module;
    var action = [
        0x0, 
        0x1, //walk
        0x2, //goBack
        0x3, //moonWalkLeft
        0x4, //moonWalkRight
        0x5, //turnLeft
        0x6, //turnRight
        0x7, //backyard
        0x8, //run
        0x9, //swing
        0xA, //upDown
        0xB, //flapping
        0xC, //crusaito
        0xD, //standard
        0xE, //kickLeft
        0xF, //kickRight
        0x10,//goingUp
        0x11,//noGravity
        0x12,//drunk
        0x13,//dance
        0x14,//stop
        0x15 //servo
    ];
    function wabot(board, rx, tx) {
        console.log('wabot');
        Module.call(this);
        this._board = board;
        this._time = [];
        self = this;
        self.callback = {};
        board.send([0xF0, 0x04, SENSOR_WABOT, action[0xD] /*standard*/ , 0xF7]);
        board.on(webduino.BoardEvent.SYSEX_MESSAGE, function(event) {
            var m = event.message;
            if (m[0] == 0x04 && m[1] == SENSOR_WABOT) {
                var callbackType = m[2];
                //console.log("waBot response:",m);
                switch (callbackType) {
                    case 0:
                        //console.log("waBot create OK...");
                        break;
                        /*walk done*/
                    // case 2:
                    //     console.log("walk callback:", m[3]);
                    //     if ('walk' in self.callback) {
                    //         self.callback['walk']();
                    //     }
                    //     break;
                }
            }
        });
        //*/
    }

    wabot.prototype = proto = Object.create(Module.prototype, {
        constructor: {
            value: wabot
        }
    });

    proto.walk = function(step = 0, callback) {
        if(this._status != action[1]){
            this.callback['walk'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[1], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }  
        }
        this._status = action[1]; 
    }
    proto.goBack = function(step = 0, callback) {
        if(this._status != action[2]){
            this.callback['goBack'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[2], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[2]; 
    }
    proto.moonWalkLeft = function(step = 0, callback) {
        if(this._status != action[3]){
            this.callback['moonWalkLeft'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[3], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[3]; 
    }
    proto.moonWalkRight = function(step = 0, callback) {
        if(this._status != action[4]){
            this.callback['moonWalkRight'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[4], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[4];
    }
    proto.turnLeft = function(step = 0, callback) {
        if(this._status != action[5]){
            this.callback['turnLeft'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[5], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[5];
    }
    proto.turnRight = function(step = 0, callback) {
        if(this._status != action[6]){
            this.callback['turnRight'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[6], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[6];
    }
    proto.backyard = function(step = 0, callback) {
        if(this._status != action[7]){
            this.callback['backyard'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[7], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[7];
    }
    proto.run = function(step, callback) {
        if(this._status != action[8]){
            this.callback['swing'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[8], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[8];
    }
    proto.swing = function(step, callback) {
        if(this._status != action[9]){
            this.callback['run'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[9], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[9];
    }
    proto.upDown = function(step, callback) {
        if(this._status != action[0xA]){
            this.callback['upDown'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0xA], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[0xA];
    }
    proto.flapping = function(step, callback) {
        if(this._status != action[0xB]){
            this.callback['swing'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0xB], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[0xB];
    }
    proto.crusaito = function(step, callback) {
        if(this._status != action[0xC]){
            this.callback['crusaito'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0xC], step, 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }
        }
        this._status = action[0xC];
    }   
    
    proto.standard = function(step, callback) {
        this.callback['standard'] = callback;
        var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0xD], 0xF7];
        this._board.send(cmd);
    }
    proto.kickLeft = function(tempo, callback) {
        this.callback['kickLeft'] = callback;
        var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0xE], tempo, 0xF7];
        this._board.send(cmd);
    }
    proto.kickRight = function(tempo, callback) {
        this.callback['kickRight'] = callback;
        var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0xF], tempo, 0xF7];
        this._board.send(cmd);
    }
    proto.goingUp = function(tempo, callback) {
        this.callback['goingUp'] = callback;
        var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0x10], tempo, 0xF7];
        this._board.send(cmd);
    }
    proto.noGravity = function(tempo, callback) {
        this.callback['noGravity'] = callback;
        var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0x11], tempo, 0xF7];
        this._board.send(cmd);
    }
    proto.drunk = function(tempo, callback) {
        this.callback['drunk'] = callback;
        var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0x12], tempo, 0xF7];
        this._board.send(cmd);
    }
    proto.dance = function(step, callback) {
        this.callback['dance'] = callback;
        var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0x13], 0xF7];
        this._board.send(cmd);
    }
    proto.stop = function(callback) {
        if(this._status != action[0x14]){
            this.callback['stop'] = callback;
            var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0x14], 0xF7];
            this._board.send(cmd);
            if(typeof(callback) == 'function'){
                callback();
            }   
        }
        this._status = action[0x14]
    }
    proto.servo = function(n, pos, callback) {
        this.callback['servo'] = callback;
        var a1 = (pos & 0xf0) >> 4,
            a2 = (pos & 0x0f);
        var cmd = [0xF0, 0x04, SENSOR_WABOT, action[0x15], n, a1, a2, 0xF7];
        this._board.send(cmd);
    }

    scope.module.wabot = wabot;
}));