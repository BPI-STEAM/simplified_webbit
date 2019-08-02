+(function (window, document) {

  'use strict';

  function line_ifttt(event, key, v1, v2, v3) {
    var obj = {};
    if (v1 != "''" || v1.length > 0) {
      obj.value1 = v1;
    }
    if (v2 != "''" || v1.length > 0) {
      obj.value2 = v2;
    }
    if (v3 != "''" || v1.length > 0) {
      obj.value3 = v3;
    }
    var uri = 'https://maker.ifttt.com/trigger/' + event + '/with/key/' + key;
    $.post(uri, obj, function (e) {
      console.log(e);
    });
  }

  function line_notify(token, msg) {
    let data = {
      token: token
    };
    if (typeof msg != 'object') {
      msg = msg + '';
      if (msg.indexOf('.jpg') != -1 || msg.indexOf('.png') != -1 || msg.indexOf('.gif') != -1 || msg.indexOf('.jpeg') != -1) {
        data.message = ' ';
        data.imageThumbnail = msg;
        data.imageFullsize = msg;
      } else {
        data.message = msg;
      }
    } else {
      if (msg.type == 'sticker') {
        data.message = msg.message;
        data.stickerPackageId = msg.stickerPackageId + '';
        data.stickerId = msg.stickerId + '';
      } else if (msg.type == 'image') {
        data.message = msg.message;
        data.imageThumbnail = msg.imageUri;
        data.imageFullsize = msg.imageUri;
      }
    }
    return fetch('https://script.google.com/macros/s/AKfycbyhqPHD-fwl9Iou_FzYk3CpDHUbZMctiG_bcrgSR5WCKfz2OXi5/exec', {
      method: 'post',
      body: encodeURI(JSON.stringify(data)), // fetch 的中文會變亂碼，要用 encodeURI 轉換
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(res => {
      return res.text();
    }).then(reply => {
      console.log(reply);
    });
  }

  function line_bot(token, uid, msg) {
    var data = {
      token: token,
      uid: uid
    };
    if (typeof msg != 'object') {
      msg = msg + '';
      if (msg.indexOf('.jpg') != -1 || msg.indexOf('.png') != -1 || msg.indexOf('.gif') != -1 || msg.indexOf('.jpeg') != -1) {
        data.type = 'image';
        data.text = ' ';
        data.previewImageUrl = msg;
        data.originalContentUrl = msg;
      } else {
        data.type = 'text';
        data.text = msg;
      }
    } else {
      if (msg.type == 'sticker') {
        data.type = 'sticker';
        data.text = '';
        data.packageId = msg.stickerPackageId + '';
        data.stickerId = msg.stickerId + '';
      } else if (msg.type == 'image') {
        data.type = 'image';
        data.text = '';
        data.previewImageUrl = msg.imageUri;
        data.originalContentUrl = msg.imageUri;
      }
    }
    $.post('https://script.google.com/macros/s/AKfycbxqsSMTWrJhnQI1GiNO2h2WwyTrWxr0eE4hwU9PrvTsFMOsffg/exec',
      data,
      function (e) {
        console.log(e);
      });
  }

  function line_reply(uid, msg, token) {
    console.log(token);
    if (token) {
      var data = {
        token: token,
        uid: uid
      };
      if (typeof msg != 'object') {
        msg = msg + '';
        if (msg.indexOf('.jpg') != -1 || msg.indexOf('.png') != -1 || msg.indexOf('.gif') != -1 || msg.indexOf('.jpeg') != -1) {
          data.type = 'image';
          data.text = '';
          data.previewImageUrl = msg;
          data.originalContentUrl = msg;
        } else {
          data.type = 'text';
          data.text = msg;
        }
      } else {
        if (msg.type == 'sticker') {
          data.type = 'sticker';
          data.text = '';
          data.packageId = msg.stickerPackageId + '';
          data.stickerId = msg.stickerId + '';
        } else if (msg.type == 'image') {
          data.type = 'image';
          data.text = '';
          data.previewImageUrl = msg.imageUri;
          data.originalContentUrl = msg.imageUri;
        }
      }
      return fetch('https://script.google.com/macros/s/AKfycbyP576FXSattUxVv_nQH9QFqNDUf0V4zeVsMeB9VqrpySI10yE/exec', {
        method: 'post',
        body: encodeURI(JSON.stringify(data)), // fetch 的中文會變亂碼，要用 encodeURI 轉換
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }).then(res => {
        return res.text();
      }).then(reply => {
        console.log(reply);
      });
    }
  }

  function line_channel(name) {
    let channel = new Firebase('https://webduino-robot101.firebaseio.com/message/' + name);
    channel.set({ time: '', uid: '', msg: '' });
    return channel;
  }

  window.line_channel = line_channel;
  window.line_reply = line_reply;
  window.line_ifttt = line_ifttt;
  window.line_notify = line_notify;
  window.line_bot = line_bot;

}(window, window.document));
