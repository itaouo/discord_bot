const weatherParser = require('../tools/weather-parser.js')

const slashCommandName = 'weather'

const slashCommand = () => {
    return {
        name: 'weather',
        description: '明日天氣預報',
    }
}

const execute = async (options) => {
    
    let content = ""
    
    const hours = new Date().getHours()
    const datas = await weatherParser()
    
    if (datas.length === 0) { return "沒有任何地點嗚嗚\n快下 /subscribe_weather 新增一個地點" }
    datas.forEach(data => {
        if (hours < 6) { content += `今天 (${data.date}) ${data.name} ${data.minT}~${data.maxT} 度，有 ${data.pop}% 的機率會下雨\n` }
        else{ content += `明天 (${data.date}) ${data.name} ${data.minT}~${data.maxT} 度，有 ${data.pop}% 的機率會下雨\n` }
        console.log(data.name)
    });
    
    return content
}

module.exports =  { slashCommandName, slashCommand, execute }