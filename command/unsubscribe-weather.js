require('dotenv').config()
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE;

const [writeFile, readFile, listToString, stringToList, listAllCommands] = require('./fileHandler.js'); 

const slashCommandName = 'unsubscribe_weather'

const slashCommand = () => {
  return {
      name: 'unsubscribe_weather',
      description: '取消天氣預報地點',
      options: [
        {
          name: 'spot',
          type: 3,
          description: '地點',
          required: true,
        },
      ]
  }
}

const execute = async (options) => {
  let spot = options.getString('spot')
  let citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE));
  if (await !citys.includes(spot)) {return '地點不存在！'}

  citys.pop(spot);
  if(await !writeFile(WEATHER_SPOTS_SAVE, listToString(citys))) { return '保存紀錄失敗！'}
  return `刪除 ${spot} 成功鴨`
}

module.exports =  { slashCommandName, slashCommand, execute }
