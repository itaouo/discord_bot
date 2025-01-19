require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL

const cambridgeCrawler = require('../tools/cambridge-crawler.js')

const slashCommandName = 'qa_words_translate'

const slashCommand = () => {
    return {
        name: 'qa_words_translate',
        description: '寫出題庫內的所有英文單字和對應的翻譯',
    }
}

const execute = async (options) => {
    const word = 'prospective'
    const { wordText, classText, meanText, examplesText } = await cambridgeCrawler(CAMBRIDGE_URL + word)

    return wordText + "\n|| " + classText + " " + meanText + " ||"
}

module.exports =  { slashCommandName, slashCommand, execute }