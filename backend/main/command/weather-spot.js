require('dotenv').config()
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE

const { readFile, stringToList } = require('../tools/file-handler.js')
const slashCommandName = 'weather_spot'

module.exports = async (options) => {
    let citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE))
    if(citys.length === 0) { return '你沒有任何地點可以用作天氣預報\n下 /subscribe_weather 新增一個吧' }
    let content = '你訂閱了 '
    citys.forEach((city) => {
        content += city + ' '
    })
    return content
}