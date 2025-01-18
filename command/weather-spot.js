require('dotenv').config()
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE

const [writeFile, readFile, listToString, stringToList, listAllCommands] = require('../tools/file-handler.js')
const slashCommandName = 'weather_spot'

const slashCommand = () => {
    return {
        name: 'weather_spot',
        description: '查看所有天氣預報地點',
    }
}

const execute = async (options) => {
    citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE))
    if(citys.length === 0) { return '沒有任何地點嗚嗚\n快下 /subscribe_weather 新增一個地點鴨' }
    let content = '你訂閱了 '
    citys.forEach((city) => {
        content += city + ' '
    })
    return content + '鴨'
}

module.exports =  { slashCommandName, slashCommand, execute }