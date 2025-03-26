const slashCommandName = 'weather_spot'

const slashCommand = () => {
    return {
        name: 'weather_spot',
        description: '查看所有天氣預報地點',
    }
}

module.exports =  { slashCommandName, slashCommand }