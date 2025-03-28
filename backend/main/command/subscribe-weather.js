const axios = require('axios')

require('dotenv').config()
const WEATHER_URL = process.env.WEATHER_URL
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE

const { writeFile, readFile, listToString, stringToList } = require('../tools/file-handler.js')

module.exports = async (options) => {
  let spot = options.getString('spot')
  let citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE))

  if (citys.includes(spot)) { return '地點已經存在！' }
  if (!await isLocationInWeatherAPI(spot)) { return '找不到地點！' }

  citys.push(spot)
  if(!await writeFile(WEATHER_SPOTS_SAVE, listToString(citys))) { return '保存紀錄失敗！'}
  return `新增 ${spot} 成功`
}

const isLocationInWeatherAPI = async (city) => {
  try {
    const response = await axios.get(WEATHER_URL)
    const locations = response.data.records.location
    for (let location of locations) {
      if(city === location.locationName) { return true } 
    }
  } catch (error) {
    console.log('Failed to get weather API: ' + error.message.message)
  }
  return false
}