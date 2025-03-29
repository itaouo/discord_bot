require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL

const cambridgeCrawler = require('../tools/cambridge-crawler.js')

module.exports = async (options) => {
    const word = 'prospective'
    const { wordText, classText, meanText } = await cambridgeCrawler(CAMBRIDGE_URL + word)

    return wordText + "\n|| " + classText + " " + meanText + " ||"
}