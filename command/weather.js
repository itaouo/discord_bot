const axios = require('axios')

require('dotenv').config()
const WEATHER_URL = process.env.WEATHER_URL
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE

const { readFile, stringToList } = require('../tools/file-handler.js')
const slashCommandName = 'weather'

const slashCommand = () => {
    return {
        name: 'weather',
        description: '明日天氣預報',
    }
}

const execute = async (options) => {
    let citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE))
    if (citys.length === 0) { return "沒有任何地點嗚嗚\n快下 /subscribe_weather 新增一個地點鴨" }

    const response = await axios.get(WEATHER_URL)
    const locations = response.data.records.location
    const hours = new Date().getHours()
    let content = ""

    locations.forEach((location) => {
        if(citys.includes(location.locationName)){
            const elements = location.weatherElement
            let name = location.locationName
            let date = elements[0].time[1].startTime.split(' ')[0]
            let minT = "NaN"
            let maxT = "NaN"
            let pop = "NaN"
    
            elements.forEach((element) => {
            if (element.elementName === "MinT") { minT = element.time[1].parameter.parameterName }
            if (element.elementName === "MaxT") { maxT = element.time[1].parameter.parameterName }
            if (element.elementName == "PoP"){ pop = element.time[1].parameter.parameterName }
            })
            
            if (hours < 6) { content += `今天 (${date}) ${name} ${minT}~${maxT} 度，有 ${pop}% 的機率會下雨鴨\n` }
            else{ content += `明天 (${date}) ${name} ${minT}~${maxT} 度，有 ${pop}% 的機率會下雨鴨\n` }
        }
    })
    return content
}

module.exports =  { slashCommandName, slashCommand, execute }