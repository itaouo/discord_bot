require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL

const cambridgeCrawler = require('../tools/cambridge-crawler.js')

const slashCommandName = 'qa_sentences_translate'

const slashCommand = () => {
    return {
        name: 'qa_sentences_translate',
        description: '寫出題庫內的所有單字的例句和翻譯',
    }
}

const execute = async (options) => {
    const word = 'prospective'
    const { examplesText } = await cambridgeCrawler(CAMBRIDGE_URL + word)
    const sentence = examplesText[0].sentence
    const mean = examplesText[0].mean

    return sentence + "\n||" + mean + "||"
}

module.exports =  { slashCommandName, slashCommand, execute }