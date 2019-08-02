Blockly.JavaScript['get_weather'] = function (block) {
  let dropdown_type_ = block.getFieldValue('type_');
  let code = 'await getWeather(\'' + dropdown_type_ + '\');\n';
  return code;
};

Blockly.JavaScript['get_weather_aqi'] = function (block) {
  let location = block.getFieldValue('location');
  let type = block.getFieldValue('type');
  let code = 'getWeatherAqi(\'' + location + '\',\'' + type + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['get_weather_observe'] = function (block) {
  let location = block.getFieldValue('location');
  let type = block.getFieldValue('type');
  let code = 'getWeatherObserve(\'' + location + '\',\'' + type + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['get_weather_forecast'] = function (block) {
  let location = block.getFieldValue('location');
  let type = block.getFieldValue('type');
  let code = 'getWeatherForecast(\'' + location + '\',\'' + type + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['get_weather_reservoir'] = function (block) {
  let location = block.getFieldValue('location');
  let type = block.getFieldValue('type');
  let code = 'getWeatherReservoir(\'' + location + '\',\'' + type + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['get_weather_quake'] = function (block) {
  let num = block.getFieldValue('num');
  let code = 'getWeatherQuake(\'' + num + '\')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['get_weather_radar'] = function (block) {
  let code = 'getWeatherRadar()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};