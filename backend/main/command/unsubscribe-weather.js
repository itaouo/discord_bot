require('dotenv').config()
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE

const { writeFile, readFile, listToString, stringToList } = require('../tools/file-handler.js')

module.exports = async (options) => {
  let spot = options.getString('spot')
  let citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE))
  if (await !citys.includes(spot)) {return '地點不存在！'}

  citys.pop(spot)
  if(await !writeFile(WEATHER_SPOTS_SAVE, listToString(citys))) { return '保存紀錄失敗！'}
  return `刪除 ${spot} 成功`
}
