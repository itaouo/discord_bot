const slashCommandName = 'schedule_weather'

const slashCommand = () => {
    return {
        name: 'schedule_weather',
        description: '每天定時傳送天氣預報',
    }
}

const execute = (options) => {
    return "呱！"
}

module.exports =  { slashCommandName, slashCommand, execute }