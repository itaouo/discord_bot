const slashCommandName = 'quack'

const slashCommand = () => {
    return {
        name: 'quack',
        description: '呱',
    }
}

const execute = (options) => {
    return "呱！"
}

module.exports =  { slashCommandName, slashCommand, execute }