+(function (scope, webduino) {

  'use strict';

  scope.TCS34725 = (function () {
    const instances = {};

    return {
      init: function (board) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = boardID;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.TCS34725(board);
          instances[tagetObject].on(_id => {
            instances[tagetObject]._id = _id;
          });
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
