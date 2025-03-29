const { fetchAllSentencesAndTranslates } = require('../tools/mysql-vocabularies.js')
const { randomPickListIndex } = require('../tools/random-generator.js')

module.exports = async (options) => {
    const amount = options.getInteger('amount') || 3
    const words = await fetchAllSentencesAndTranslates()
    const randomNums = randomPickListIndex(words.length, amount)

    let result = ""
    for (const i of randomNums) {
        const sentence = words[i].sentence
        const mean = words[i].sentenceTranslate

        result += sentence + "\n||" + mean + "||\n\n"
    }
    return result
}