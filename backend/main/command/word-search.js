const cambridgeCrawler = require('../tools/cambridge-crawler.js')

const parse = (word, data) => {
  let result = `**${word}**\n`
  data.forEach(item => {
    const partOfSpeech = item.partOfSpeech
    const definitionTranslate = item.definitionTranslate
    const sentence = (item.examples?.[0]?.sentence !== undefined) ? `${item.examples[0].sentence}\n` : ""
    result += `${partOfSpeech} ${definitionTranslate}\n${sentence}\n`
  })
  return result
}

module.exports = async (options) => {
  let word = options.getString('word')

  const data = await cambridgeCrawler(word)
  if (data.length === 0) { return `${word} 單字不在英漢字典裡！`}

  return parse(word, data)
}
