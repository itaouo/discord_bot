require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL

const cambridgeCrawler = require('../../backend/main/tools/cambridge-crawler.js')

const slashCommandName = 'word_search'

const slashCommand = () => {
    return {
        name: 'word_search',
        description: '寫出英文單字對應的翻譯和例句',
        options: [
            {
            name: 'word',
            type: 3,
            description: '要查詢的單字',
            required: true,
            },
        ]
    }
}

const execute = async (options) => {
    const word = options.getString('word')
    const { wordText, classText, meanText, examplesText } = await cambridgeCrawler(CAMBRIDGE_URL + word)
    const sentence = examplesText[0].sentence
    const mean = examplesText[0].mean

    return wordText + "\n" + classText + " " + meanText + "\n\n" + sentence + "\n" + mean
}

module.exports =  { slashCommandName, slashCommand, execute }