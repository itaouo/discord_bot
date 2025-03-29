const { fetchWords, insertWordData } = require('../tools/mysql-vocabularies.js')
const cambridgeCrawler = require('../tools/cambridge-crawler.js')

const parse = (word, data) => {
  const familiarity = 5
  data.forEach(item => {
    const partOfSpeech = item.partOfSpeech
    const definition = item.definition
    const definitionTranslate = item.definitionTranslate
    item.examples.forEach(example => {
      const sentence = example.sentence
      const sentenceTranslate = example.sentenceTranslate
      insertWordData(word, partOfSpeech, definition, definitionTranslate, sentence, sentenceTranslate, familiarity)
    })
  })
}

module.exports = async (options) => {
  let word = options.getString('word')
  let words = await fetchWords()
  if (words.includes(word)) { return `${word} 單字已經儲存過！` }

  const result = await cambridgeCrawler(word)
  if (result.length === 0) { return `${word} 單字不在英漢字典裡！`}
  
  setTimeout(() => {
    parse(word, result)
  }, 100)

  return `新增 ${word} 單字成功`
}