const puppeteer = require('puppeteer')

const cambridgeCrawler = async (url) => {
    let browser = null
    let page = null
    try {
        browser = await puppeteer.launch()

        page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
        await page.goto(url, { waitUntil: 'domcontentloaded' })
    } catch (error) {
        await browser.close()
        console.log("CambridgeCrawler load page failed: " + error)
        throw new Error("載入英漢字典的時候發生錯誤！")
    }

    try {
        await page.evaluate(() => {
            document.querySelector('span.hw.dhw').innerText.trim()
        })
    } catch (error) {
        await browser.close()
        console.log("The dictionary doesn't have this word: " + error.message)
        throw new Error("單字不在英漢字典裡！")
    }
    
    try {
        const wordText = await page.evaluate(() => {
            return document.querySelector('span.hw.dhw').innerText.trim()
        })
        
        const classText = await page.evaluate(() => {
            return document.querySelector('span.pos.dpos').innerText.trim()
        })

        const meanText = await page.evaluate(() => {
            return document.querySelector('span.trans.dtrans.dtrans-se.break-cj').innerText.trim()
        })

        const examplesText = await page.evaluate(() => {
            const examples = document.querySelectorAll('div.examp.dexamp')
            return Array.from(examples).map(example => {
                const sentence = example.querySelector('span.eg.deg').innerText.trim()
                const mean = example.querySelector('span.trans.dtrans.dtrans-se.break-cj').innerText.trim()
                return { sentence, mean }
            })
        })

        await browser.close()
        return { wordText, classText, meanText, examplesText }
    } catch (error) {
        await browser.close()
        console.log('cambridgeCrawler analysis page failed:', error.message)
        throw new Error("網站解析格式的時候發生錯誤！")
    }
}

module.exports = cambridgeCrawler