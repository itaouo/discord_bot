const puppeteer = require('puppeteer');

require('dotenv').config()
const CAMBRIDGE_URL = process.env.CAMBRIDGE_URL;

const slashCommandName = 'qa_words_translate'

const slashCommand = () => {
    return {
        name: 'qa_words_translate',
        description: '寫出題庫內的例句和對應的翻譯',
    }
}

const execute = async (options) => {
    const word = 'prospective';
    return await cambridgeCrawler(CAMBRIDGE_URL + word)
}

const cambridgeCrawler = async (url) => {
    let browser = null
    let page = null
    try {
        browser = await puppeteer.launch();

        page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'domcontentloaded' });
    } catch (error) {
        console.error("CambridgeCrawler load page failed: " + error)
        return "載入英漢字典的時候發生錯誤"
    }

    try {
        await page.evaluate(() => {
            const word = document.querySelector('span.hw.dhw');
            return word ? word.innerText.trim() : 'No word found';
        });
    } catch (error) {
        console.error("The dictionary doesn't have this word: " + error.message)
        return "單字不在英漢字典裡!"
    }
    
    try {
        const wordText = await page.evaluate(() => {
            return word = document.querySelector('span.hw.dhw').innerText.trim()
        });
        
        const classText = await page.evaluate(() => {
            return clazz = document.querySelector('span.pos.dpos').innerText.trim()
        });

        const meanText = await page.evaluate(() => {
            return mean = document.querySelector('span.trans.dtrans.dtrans-se.break-cj').innerText.trim()
        });

        const examplesText = await page.evaluate(() => {
            const examples = document.querySelectorAll('div.examp.dexamp');
            return Array.from(examples).map(example => {
                const sentence = example.querySelector('span.eg.deg').innerText.trim()
                const mean = example.querySelector('span.trans.dtrans.dtrans-se.break-cj').innerText.trim()
                return { sentence, mean }
            });
        });

        await browser.close();
        return { wordText, classText, meanText, examplesText }
    } catch (error) {
        console.error('cambridgeCrawler analysis page failed:', error.message);
    }
}

module.exports = cambridgeCrawler