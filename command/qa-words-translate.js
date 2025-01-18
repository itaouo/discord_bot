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
    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const wordText = await page.evaluate(() => {
            const word = document.querySelector('span.hw.dhw');
            return word ? word.innerText.trim() : '單字不在英漢字典裡!';
        });
        
        const classText = await page.evaluate(() => {
            const clazz = document.querySelector('span.pos.dpos');
            return clazz ? clazz.innerText.trim() : '';
        });

        const meanText = await page.evaluate(() => {
            const clazz = document.querySelector('span.trans.dtrans.dtrans-se.break-cj');
            return clazz ? clazz.innerText.trim() : '';
        });

        console.log(wordText + " " + classText + "\n || " + meanText + " ||")
        await browser.close();
        
        return wordText + " " + classText + "\n|| " + meanText + " ||"
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

module.exports =  { slashCommandName, slashCommand, execute }