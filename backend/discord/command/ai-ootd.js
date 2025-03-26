const slashCommandName = 'ai_ootd'

const slashCommand = () => {
    return {
        name: 'ai_ootd',
        description: '用 AI 幫你預測明日穿著',
    }
}

module.exports =  { slashCommandName, slashCommand }