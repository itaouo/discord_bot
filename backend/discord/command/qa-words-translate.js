
const slashCommandName = 'qa_words_translate'

const slashCommand = () => {
    return {
        name: 'qa_words_translate',
        description: '寫出題庫內的所有英文單字和對應的翻譯',
    }
}

module.exports =  { slashCommandName, slashCommand }