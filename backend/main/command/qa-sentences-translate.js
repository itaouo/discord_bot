require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL
const ENGLISH_WORDS_SAVE = process.env.ENGLISH_WORDS_SAVE

const { readFile, stringToList } = require('../tools/file-handler.js')
const { randomNum, randomPickListIndex } = require('../tools/random-generator.js')

const cambridgeCrawler = require('../tools/cambridge-crawler.js')

module.exports = async (options) => {
    let result = ""

    const amount = options.getInteger('amount') || 1
    const words = await stringToList(await readFile(ENGLISH_WORDS_SAVE))
    const randomNums = randomPickListIndex(words.length, amount)
    for (const i of randomNums) {
        const word = words[i]
        const { examplesText } = await cambridgeCrawler(CAMBRIDGE_URL + word)
        const examplesLength = randomNum(examplesText.length)

        const sentence = examplesText[examplesLength].sentence
        const mean = examplesText[examplesLength].mean

        result += sentence + "\n||" + mean + "||\n"
    }
    return result
}