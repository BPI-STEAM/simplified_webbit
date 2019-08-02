+(function (window, document) {

  'use strict';
  
  window._mySheet_ = {};
  window.sheetInit = function (uri, name) {
    _mySheet_.sheetUrl = uri.split('/edit')[0] + '/edit';
    _mySheet_.sheetName = name;
  };

  window.sheetWriteData = function (type, data, range) {
    let sendData;
    let arrayRow = 0;
    let arrayColumn = 0;
    if (Array.isArray(data)) {
      for (let i in data) {
        if (Array.isArray(data[i])) {
          arrayRow = arrayRow + 1;
          arrayColumn = data[i].length;
        }
      }
      sendData = data.join();
    } else {
      sendData = data;
    }
    let parameter = {
      sheetUrl: _mySheet_.sheetUrl,
      sheetName: _mySheet_.sheetName,
      type: type,
      data: sendData,
      range: range,
      arrayRow: arrayRow,
      arrayColumn: arrayColumn
    }
    return fetch('https://script.google.com/macros/s/AKfycbwBLLmy6R9TIQrzRmoJer7HVn1MXn20vfZ9d3WE9NY3LcIkm37j/exec', {
      method: 'post',
      body: encodeURI(JSON.stringify(parameter)), // fetch 的中文會變亂碼，要用 encodeURI 轉換
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(res => {
      return res.text();
    }).then(data => {
      console.log(data);
    });
  }

  window.sheetReadData = function () {
    let parameter = {
      sheetUrl: _mySheet_.sheetUrl,
      sheetName: _mySheet_.sheetName
    }
    return fetch('https://script.google.com/macros/s/AKfycbyPI3r8HHEbLFFiXQvpRinUGrqSyYkfj5cvZNzshfsZEjIEEg4/exec', {
      method: 'post',
      body: encodeURI(JSON.stringify(parameter)), // fetch 的中文會變亂碼，要用 encodeURI 轉換
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      _mySheet_.data = data;
    });
  }

  window.sheetFeature = function (action, type, num, addNum) {
    let parameter = {
      sheetUrl: _mySheet_.sheetUrl,
      sheetName: _mySheet_.sheetName,
      action: action,
      type: type,
      num: num,
      addNum: addNum,
    }
    return fetch('https://script.google.com/macros/s/AKfycbwTcoeTDtmubhyZIZ6_idtClzvRL5NH7xipOR0P4dBs2yvj1f2L/exec', {
      method: 'post',
      body: encodeURI(JSON.stringify(parameter)), // fetch 的中文會變亂碼，要用 encodeURI 轉換
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(res => {
      return res.text();
    }).then(data => {
      console.log(data);
    });
  }

}(window, window.document));
