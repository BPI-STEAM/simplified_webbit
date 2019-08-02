+(function (scope, webduino) {

  'use strict';

  scope.Photocell = (function () {
    const instances = {};

    return {
      init: function (board, pin) {
        const boardID = board._options.device || board._options.url;
        const tagetObject = `${boardID}_${pin}`;

        if (!instances[tagetObject]) {
          instances[tagetObject] = new webduino.module.Photocell(board, pin);
          instances[tagetObject].measure((value) => {
            instances[tagetObject].value = value;
          });
        }
        return instances[tagetObject];
      }
    }
  })();

}(window, window.webduino));
