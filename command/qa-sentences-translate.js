require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL

const cambridgeCrawler = require('../tools/cambridge-crawler.js')

const slashCommandName = 'qa_sentences_translate'

const slashCommand = () => {
    return {
        name: 'qa_sentences_translate',
        description: '寫出題庫內的例句和對應的翻譯',
    }
}

const execute = async (options) => {
    const word = 'prospective'
    const { wordText, classText, meanText, examplesText } = await cambridgeCrawler(CAMBRIDGE_URL + word)
    const sentence = examplesText[0].sentence
    const mean = examplesText[0].mean

    return sentence + "\n||" + mean + "||"
}

module.exports =  { slashCommandName, slashCommand, execute }