require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL

const puppeteer = require('puppeteer')

module.exports = async (word) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  const url = CAMBRIDGE_URL + word
  await page.goto(url, { waitUntil: 'domcontentloaded' })

  const extractedData = await page.evaluate(() => {
    const definitions = []

    const outerPartOfSpeech = document.querySelector('.pos.dpos')?.textContent.trim() || ''
    const definitionBlocks = document.querySelectorAll('.dsense')

    definitionBlocks.forEach(block => {
      const definitionText = block.querySelector('.def.ddef_d.db')?.textContent.trim() || ''
      const partOfSpeech = block.querySelector('.pos.dsense_pos')?.textContent.trim() || outerPartOfSpeech
      const definitionTranslate = block.querySelector('.trans.dtrans-se')?.textContent.trim() || ''

      const examples = Array.from(block.querySelectorAll('.examp.dexamp')).map(example => {
        const sentence = example.querySelector('.eg.deg')?.textContent.trim() || ''
        const sentenceTranslate = example.querySelector('.trans.dtrans-se')?.textContent.trim() || ''
        return { sentence, sentenceTranslate: sentenceTranslate }
      })

      definitions.push({
        definition: definitionText,
        partOfSpeech: partOfSpeech,
        definitionTranslate: definitionTranslate,
        examples: examples
      })
    })

    return definitions
  })

  await browser.close()
  return extractedData
}