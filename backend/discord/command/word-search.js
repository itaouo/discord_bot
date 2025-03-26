const slashCommandName = 'word_search'

const slashCommand = () => {
    return {
        name: 'word_search',
        description: '寫出英文單字對應的翻譯和例句',
        options: [
            {
            name: 'word',
            type: 3,
            description: '要查詢的單字',
            required: true,
            },
        ]
    }
}

module.exports =  { slashCommandName, slashCommand }