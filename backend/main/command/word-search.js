require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL

const cambridgeCrawler = require('../tools/cambridge-crawler.js')

module.exports = async (options) => {
    const word = options.getString('word')
    const { wordText, classText, meanText, examplesText } = await cambridgeCrawler(CAMBRIDGE_URL + word)
    const sentence = examplesText[0].sentence
    const mean = examplesText[0].mean

    return wordText + "\n" + classText + " " + meanText + "\n\n" + sentence + "\n" + mean
}