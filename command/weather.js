const axios = require('axios');

require('dotenv').config()
const WEATHER_URL = process.env.WEATHER_URL;
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE;

const [writeFile, readFile, listToString, stringToList] = require('./fileHandler.js'); 
let citys = []

const fetchTomorrowWeather = async () => {
  citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE));
  if (citys.length === 0) { return "沒有任何地點嗚嗚\n快下 /subscribe_weather 新增一個地點鴨" }

  const response = await axios.get(WEATHER_URL)
  const locations = response.data.records.location;
  const hours = new Date().getHours();
  let content = ""

  locations.forEach((location) => {
    if(citys.includes(location.locationName)){
      const elements = location.weatherElement
      let name = location.locationName
      let date = elements[0].time[1].startTime.split(' ')[0];
      let minT = "NaN"
      let maxT = "NaN"
      let pop = "NaN"

      elements.forEach((element) => {
        if (element.elementName === "MinT") { minT = element.time[1].parameter.parameterName }
        if (element.elementName === "MaxT") { maxT = element.time[1].parameter.parameterName }
        if (element.elementName == "PoP"){ pop = element.time[1].parameter.parameterName }
      })
      
      if (hours < 6) { content += `今天(${date}) ${name} ${minT}~${maxT} 度，有 ${pop}% 的機率會下雨鴨\n` }
      else{ content += `明天(${date}) ${name} ${minT}~${maxT} 度，有 ${pop}% 的機率會下雨鴨\n` }
    }
  })
  return content
};

const addWeatherCity = async (city) => {
  citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE));
  if (citys.includes(city)) { return '地點已經存在！' }
  if (!await isLocationInWeatherAPI(city)) { return '找不到地點！' }

  citys.push(city);
  if(await !writeFile(WEATHER_SPOTS_SAVE, listToString(citys))) { return '保存紀錄失敗！'}
  return `新增${city}成功鴨`
}

const deleteWeatherCity = async (city) => {
  citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE));
  if (await !citys.includes(city)) {return '地點不存在！'}

  citys.pop(city);
  if(await !writeFile(WEATHER_SPOTS_SAVE, listToString(citys))) { return '保存紀錄失敗！'}
  return `刪除${city}成功鴨`
}

const checkWeatherCity = async () => {
  citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE));
  if(citys.length === 0) { return '沒有任何地點嗚嗚\n快下 /subscribe_weather 新增一個地點鴨' }
  let content = '你訂閱了 '
  citys.forEach((city) => {
    content += city + ' '
  })
  return content + '鴨'
}

const isLocationInWeatherAPI = async (city) => {
  try {
    const response = await axios.get(WEATHER_URL)
    const locations = response.data.records.location
    locations.forEach((location) => {
      if(city === location){ return true } 
    })
  } catch (error) {}
  return false
}

module.exports = [fetchTomorrowWeather, addWeatherCity, deleteWeatherCity, checkWeatherCity];