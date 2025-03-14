require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL
const ENGLISH_WORDS_SAVE = process.env.ENGLISH_WORDS_SAVE

const { readFile, stringToList } = require('../tools/file-handler.js')
const { randomNum, randomPickListIndex } = require('../tools/random-generator.js')

const cambridgeCrawler = require('../tools/cambridge-crawler.js')

const slashCommandName = 'qa_sentences_translate'

const slashCommand = () => {
    return {
        name: 'qa_sentences_translate',
        description: '從題庫內的單字出例句翻譯題（預設 3 題）',
        options: [
            {
            name: 'amount',
            type: 4,
            description: '要出幾題',
            required: false,
            },
        ]
    }
}

const execute = async (options) => {
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

module.exports =  { slashCommandName, slashCommand, execute }