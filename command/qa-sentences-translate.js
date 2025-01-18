const puppeteer = require('puppeteer');

require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL;

const slashCommandName = 'qa_sentences_translate'

const slashCommand = () => {
    return {
        name: 'qa_sentences_translate',
        description: '寫出題庫內的例句和對應的翻譯',
    }
}

const execute = async (options) => {
    const word = 'prospective';
    const data = await cambridgeCrawler(CAMBRIDGE_URL + word)
    const sentence = data[0].sentence;
    const mean = data[0].mean;
    return sentence + "\n||" + mean + "||"
}

const cambridgeCrawler = async (url) => {
    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        const wordText = await page.evaluate(() => {
            const word = document.querySelector('span.hw.dhw');
            return word ? word.innerText.trim() : 'No word found';
        });
        console.log(wordText)

        const examplesText = await page.evaluate(() => {
            const examples = document.querySelectorAll('div.examp.dexamp');
            return Array.from(examples).map(example => {
                const sentence = example.querySelector('span.eg.deg').innerText.trim()
                const mean = example.querySelector('span.trans.dtrans.dtrans-se.break-cj').innerText.trim()
                return { sentence, mean }
            });
        });

        console.log(examplesText)
        await browser.close();
        return examplesText
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

module.exports =  { slashCommandName, slashCommand, execute }