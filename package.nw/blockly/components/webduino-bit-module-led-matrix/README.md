# webduino-bit-module-led-matrix

Module for LED matrix of Webduino:bit.

## ⚠️ Note

This module may not works in most scenario since it uses non-standard field type.

## Installation
#### bower
```sh
bower install https://github.com/webduinoio/webduino-bit-module-led-matrix.git
```
#### Node.js
```sh
$ npm install webduino-bit-module-led-matrix
```

## Usage
```javascript
let webduino = require('webduino-js');
require('webduino-bit-module-led-matrix')(webduino);

const opts = {
  board: 'Bit',
  device: 'device_id',
  transport: 'mqtt'
};
  
let board = new webduino.board[opts.board](opts);

board.once(webduino.BoardEvent.READY, (board) => {
  board.samplingInterval = 250;
  const matrix = new webduino.module.Matrix(board, 4, 25);
  matrix.setCharacter('1', '#ffff66');
});
```

## License

This project is licensed under the MIT license, see [LICENSE](LICENSE) for more information.
