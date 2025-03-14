const cambridgeCrawler = require('../../tools/cambridge-crawler.js')

test('I would like to search for the word "contain" from Cambridge.', async () => {
    const { wordText, classText, meanText, examplesText } = await cambridgeCrawler("https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/contain")
    expect(wordText).toBe("contain")
    expect(classText).toBe("verb")
    expect(meanText).toBe("包含；容納；盛")
    expect(examplesText[0].sentence).toBe("How much liquid do you think this bottle contains?")
    expect(examplesText[0].mean).toBe("你認爲這個瓶可裝多少液體？")
})

test('I would like to search for the word "notExist" from Cambridge.', async () => {
    try {
        await cambridgeCrawler("https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/notexist")
    } catch (error){
        expect(error.message).toBe("單字不在英漢字典裡！")
    }
})