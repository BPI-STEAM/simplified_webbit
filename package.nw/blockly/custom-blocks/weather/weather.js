+(function (window, document) {

  'use strict';

  window.getWeather = function (type) {
    if (!window.weatherData) {
      window.weatherData = {};
    }
    let weatherList = {
      aqi: 'https://script.google.com/macros/s/AKfycbwDnYSKxqcastsxTRFgFRHwsF54AD-oVoQPI5QFvVS9I9-7Knt6/exec',
      observe: 'https://script.google.com/macros/s/AKfycbxh4PmUXodFz8fehGy_9HrAGDu22FROTWzDsoNdmhfqye5cYDY/exec',
      forecast: 'https://script.google.com/macros/s/AKfycbxO4ILyFx5JuVX0mSPjvgEGPK-x0XQ4TPZGdTOJrbmq0nIIauo/exec',
      reservoir: 'https://script.google.com/macros/s/AKfycbzfJmiMn3ntcDqxzTr14jK9mvHp8o87qhUHTPcPqwLJedXp_bE/exec',
      quake: 'https://script.google.com/macros/s/AKfycbyZEGX1uj5vkTjKn7UJmi0OFR4m7IQSlFczEABS4fHaJ-WKztc/exec',
      radar: 'https://script.google.com/macros/s/AKfycbxjc_WiH_Cc6uVGqacGOFqM0Xm2-dNKiD4C5tLoZueCNhAJVmE/exec'
    };
    return fetch(weatherList[type], {
      method: 'post',
      body: JSON.stringify({ type: 'weather' }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(res => {
      return res.text();
    }).then(data => {
      if (type == 'radar') {
        weatherData[type] = data;
      } else {
        weatherData[type] = JSON.parse(data);
      }
    });
  };

  window.getWeatherAqi = function (local, type) {
    if (weatherData.aqi) {
      let arr = weatherData.aqi;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].SiteName == local) {
          if (type == 'all') {
            let replyMsg = arr[i].SiteName + '的' + arr[i].note + ' ( AQI：' + arr[i].AQI + '，PM2.5：' + arr[i].PM25 + '，PM10：' + arr[i].PM10 + '，臭氧：' + arr[i].O3 + '，一氧化碳：' + arr[i].CO + '，二氧化氮：' + arr[i].NO2 + '，二氧化硫：' + arr[i].SO2 + ' )';
            return replyMsg;
          } else {
            return arr[i][type];
          }
        }
      }
    } else {
      return '資料格式錯誤，請選擇「空氣品質」。';
    }
  }

  window.getWeatherObserve = function (local, type) {
    if (weatherData.observe) {
      let obj = weatherData.observe;
      let result = obj[local];
      if (type == 0) {
        return local + '現在的溫度 ' + result[0] + ' 度，當日累積雨量 ' + result[4] + ' mm，相對濕度 ' + result[1] + '%，風力 ' + result[2] + ' 級，天氣概況：' + result[3];
      } else {
        return result[type - 1];
      }
    } else {
      return '資料格式錯誤，請選擇「即時觀測」。';
    }
  }

  window.getWeatherForecast = function (local, type) {
    if (weatherData.forecast) {
      let obj = weatherData.forecast;
      let result = obj[local];
      let note;
      if (type == 0) {
        note = '未來 6 小時預報：';
        result = result[0];
      } else if (type == 1) {
        note = '未來 18 小時預報：';
        result = result[1];
      } else if (type == 2) {
        note = '未來 36 小時預報：';
        result = result[2];
      }
      return local + note + '氣溫 ' + result[0] + 'C，降雨機率 ' + result[1] + '，' + result[2];
    } else {
      return '資料格式錯誤，請選擇「氣象預報」。';
    }
  }

  window.getWeatherReservoir = function (local, type) {
    if (weatherData.reservoir) {
      let obj = weatherData.reservoir;
      let result = obj[local];
      if (type == 'all') {
        return local + '蓄水百分比：' + result.CapacityRate + '%，有效蓄水量：' + result.Capacity + ' 萬立方公尺，本日降雨：' + result.Basin_Rain;
      } else {
        return result[type];
      }
    } else {
      return '資料格式錯誤，請選擇「水庫水情」。';
    }
  }

  window.getWeatherQuake = function (num) {
    if (weatherData.quake) {
      let obj = weatherData.quake;
      let result;
      if (num == '0') {
        result = obj[0];
      } else if (num == 1) {
        result = obj[0] + '、' + obj[1];
      } else if (num == 2) {
        result = obj[0] + '、' + obj[1] + '、' + obj[2];
      }
      return result;
    } else {
      return '資料格式錯誤，請選擇「地震資訊」。';
    }
  }

  window.getWeatherRadar = function () {
    if (weatherData.radar) {
      let result = weatherData.radar;
      return result;
    } else {
      return '資料格式錯誤，請選擇「雷達回波」。';
    }
  }

}(window, window.document));
