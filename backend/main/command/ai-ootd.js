const writePrompt = require('../tools/google-generative-ai.js')
const weatherParser = require('../tools/weather-parser.js')

module.exports = async (options) => {
    let content = ""
    
    const datas = await weatherParser()

    if (datas.length === 0) { return "你沒有任何地點可以用作天氣預報\n下 /subscribe_weather 新增一個吧" }
    for (const data of datas) {
        const prompt = `Please suggest to me just one suit I should wear tomorrow due to "${data.minT}~${data.maxT} 度，有 ${data.pop}% 的機率會下雨"`
        const response = await writePrompt(prompt)
        content += response
    }
    return content
}