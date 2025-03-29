const weatherParser = require('../tools/weather-parser.js')

module.exports = async (options) => {
    
    let content = ""
    
    const hours = new Date().getHours()
    const datas = await weatherParser()
    
    if (datas.length === 0) { return "你沒有任何地點可以用作天氣預報\n下 /subscribe_weather 新增一個吧" }
    datas.forEach(data => {
        if (hours < 6) { content += `今天 (${data.date}) ${data.name} ${data.minT}~${data.maxT} 度，有 ${data.pop}% 的機率會下雨\n` }
        else{ content += `明天 (${data.date}) ${data.name} ${data.minT}~${data.maxT} 度，有 ${data.pop}% 的機率會下雨\n` }
        console.log(data.name)
    })
    
    return content
}