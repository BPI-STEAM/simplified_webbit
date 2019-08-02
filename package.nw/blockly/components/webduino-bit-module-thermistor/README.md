# webduino-bit-module-thermistor

Module for thermistor of Webduino:bit.

## Installation

#### bower

```sh
bower install https://github.com/webduinoio/webduino-bit-module-thermistor.git
```

#### Node.js

```sh
$ npm install webduino-bit-module-thermistor
```

## Usage

```javascript
let webduino = require('webduino-js');
require('webduino-bit-module-thermistor')(webduino);

const opts = {
  board: 'Bit',
  device: 'device_id',
  transport: 'mqtt'
};
  
let board = new webduino.board[opts.board](opts);

board.once(webduino.BoardEvent.READY, (board) => {
  board.samplingInterval = 250;
  const thermistor = new webduino.module.Thermistor(board, 6);

  thermistor.measure(function (val) {
    console.log((Math.round(val * 100)) / 100);
  });
});
```


## License

This project is licensed under the MIT license, see [LICENSE](LICENSE) for more information.
