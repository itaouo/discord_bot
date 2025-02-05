const { GoogleGenerativeAI } = require("@google/generative-ai")

require('dotenv').config()
const GOOGLE_AI_API = process.env.GOOGLE_AI_API
const PROMPT_LANGUAGE = process.env.LANGUAGE
const ai = new GoogleGenerativeAI(GOOGLE_AI_API)

const writePrompt = async (prompt) => {
  const model = ai.getGenerativeModel({ model: "gemini-pro" })
  const result = await model.generateContent(`use ${PROMPT_LANGUAGE} and answer ${prompt}, thank you.`)
  const response = await result.response
  return response.text()
}

module.exports = writePrompt
