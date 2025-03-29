require('dotenv').config() 
const ENGLISH_WORDS_SAVE = process.env.ENGLISH_WORDS_SAVE

const { writeFile, readFile, listToString, stringToList } = require('../tools/file-handler.js')

module.exports =  async (options) => {
  let word = options.getString('word')
  let words = await stringToList(await readFile(ENGLISH_WORDS_SAVE))

  if (words.includes(word)) { return '單字已經儲存過！' }

  words.push(word)
  if(!await writeFile(ENGLISH_WORDS_SAVE, listToString(words))) { return '保存紀錄失敗！'}
  return `新增 ${word} 成功`
}