const cambridgeCrawler = require('../tools/cambridge-crawler.js')

module.exports = async (options) => {
    const word = 'prospective'
    const { wordText, classText, meanText } = await cambridgeCrawler(word)

    return wordText + "\n|| " + classText + " " + meanText + " ||"
}