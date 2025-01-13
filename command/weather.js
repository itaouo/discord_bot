const axios = require('axios');

require('dotenv').config()
const WEATHER_URL = process.env.WEATHER_URL;

const fetchTomorrowWeather = async () => {
  try {
    const response = await axios.get(WEATHER_URL)
    const locations = response.data.records.location;

    let name = "NaN"
    let date ="NaN"
    let minT = "NaN"
    let maxT = "NaN"
    let pop = "NaN"

    locations.forEach((location) => {
      if(location.locationName === "新北市"){
        name = location.locationName
        const elements = location.weatherElement
        date = elements[0].time[1].startTime.split(' ')[0];
        
        elements.forEach((element) => {
          if(element.elementName === "MinT"){
            minT = element.time[1].parameter.parameterName
          }
          if(element.elementName === "MaxT"){
            maxT = element.time[1].parameter.parameterName
          }
          if(element.elementName == "PoP"){
            pop = element.time[1].parameter.parameterName
          }
        })
      }
    })
    return `明天${name} ${minT}~${maxT} 度，有 ${pop}% 的機率會下雨鴨`
  } catch (error) {
    console.error('Get weather failed:', error.message);
    return 'Get weather failed.';
  }
};

module.exports = fetchTomorrowWeather;