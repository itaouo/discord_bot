require('dotenv').config()
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE

const { readFile, stringToList } = require('../../backend/main/tools/file-handler.js')
const slashCommandName = 'weather_spot'

const slashCommand = () => {
    return {
        name: 'weather_spot',
        description: '查看所有天氣預報地點',
    }
}

const execute = async (options) => {
    let citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE))
    if(citys.length === 0) { return '你沒有任何地點可以用作天氣預報\n下 /subscribe_weather 新增一個吧' }
    let content = '你訂閱了 '
    citys.forEach((city) => {
        content += city + ' '
    })
    return content
}

module.exports =  { slashCommandName, slashCommand, execute }