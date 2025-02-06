const { ConsoleMessage } = require('puppeteer')
const writePrompt = require('../tools/google-generative-ai.js')
const weatherParser = require('../tools/weather-parser.js')

const slashCommandName = 'ai_ootd'

const slashCommand = () => {
    return {
        name: 'ai_ootd',
        description: '用 AI 幫你預測明日穿著',
    }
}

const execute = async (options) => {
    let content = ""
    
    const hours = new Date().getHours()
    const datas = await weatherParser()

    if (datas.length === 0) { return "沒有任何地點嗚嗚\n快下 /subscribe_weather 新增一個地點" }
    for (const data of datas) {
        const prompt = `Please suggest to me just one suit I should wear tomorrow due to "${data.minT}~${data.maxT} 度，有 ${data.pop}% 的機率會下雨"`
        const response = await writePrompt(prompt)
        content += response
    }
    return content
}

module.exports =  { slashCommandName, slashCommand, execute }