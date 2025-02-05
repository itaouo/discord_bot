const writePrompt = require('../tools/google-generative-ai.js')

const slashCommandName = 'ai'

const slashCommand = () => {
  return {
    name: 'ai',
    description: '問 AI 一個問題',
    options: [
        {
        name: 'prompt',
        type: 3,
        description: '問題',
        required: true,
        },
    ]
  }
}

const execute = async (options) => {
    return await writePrompt(options.getString('prompt'))
}

module.exports =  { slashCommandName, slashCommand, execute }