const writePrompt = require('../tools/google-generative-ai.js')

module.exports = async (options) => {
    return await writePrompt(options.getString('prompt'))
}