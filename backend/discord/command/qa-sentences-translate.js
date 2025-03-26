module.exports = () => {
    return {
        name: 'qa_sentences_translate',
        description: '從題庫內的單字出例句翻譯題（預設 3 題）',
        options: [
            {
            name: 'amount',
            type: 4,
            description: '要出幾題',
            required: false,
            },
        ]
    }
}