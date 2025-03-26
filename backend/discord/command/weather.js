const slashCommandName = 'weather'

const slashCommand = () => {
    return {
        name: 'weather',
        description: '明日天氣預報',
    }
}

module.exports =  { slashCommandName, slashCommand }