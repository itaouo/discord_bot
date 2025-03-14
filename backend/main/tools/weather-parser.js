const axios = require('axios')

require('dotenv').config()
const WEATHER_URL = process.env.WEATHER_URL
const WEATHER_SPOTS_SAVE = process.env.WEATHER_SPOTS_SAVE

const { readFile, stringToList } = require('./file-handler.js')

const weatherParser = async () => {
    let citys = await stringToList(await readFile(WEATHER_SPOTS_SAVE))
    let datas = []
    
    const response = await axios.get(WEATHER_URL)
    const locations = response.data.records.location
    
    locations.forEach((location) => {
        if(citys.includes(location.locationName)){
            const elements = location.weatherElement

            let date = elements[0].time[1].startTime.split(' ')[0]
            let name = location.locationName
            let minT = "NaN"
            let maxT = "NaN"
            let pop = "NaN"

            elements.forEach((element) => {
            if (element.elementName === "MinT") { minT = element.time[1].parameter.parameterName }
            if (element.elementName === "MaxT") { maxT = element.time[1].parameter.parameterName }
            if (element.elementName == "PoP"){ pop = element.time[1].parameter.parameterName }
            })
            datas.push({ date, name, minT, maxT, pop })
        }
    })
    return datas
}

module.exports = weatherParser