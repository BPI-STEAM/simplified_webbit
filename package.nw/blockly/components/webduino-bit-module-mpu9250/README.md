# webduino-bit-module-mpu9250

Module for MPU9250 of Webduino:bit.

## Installation
#### bower
```sh
bower install https://github.com/webduinoio/webduino-bit-module-mpu9250.git
```
#### Node.js
```sh
$ npm install @webduinoio/bit-mpu9250
```

## Usage
```javascript
let webduino = require('webduino-js');
require('@webduinoio/bit-mpu9250')(webduino);

const opts = {
  board: 'Bit',
  device: 'device_id',
  transport: 'mqtt'
};
  
let board = new webduino.board[opts.board](opts);

board.once(webduino.BoardEvent.READY, (board) => {
  board.samplingInterval = 250;
  const mpu9250 = new webduino.module.MPU9250(board);
  mpu9250.on(webduino.module.MPU9250Event.ACCELEROMETER_MESSAGE, function () {
    console.log(mpu9250.accVals[0]);
    console.log(mpu9250.accVals[1]);
    console.log(mpu9250.accVals[2]);
  });
});
```

## License

This project is licensed under the MIT license, see [LICENSE](LICENSE) for more information.
