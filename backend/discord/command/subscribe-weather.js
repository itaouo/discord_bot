const slashCommandName = 'subscribe_weather'

const slashCommand = () => {
  return {
    name: 'subscribe_weather',
    description: '新增天氣預報地點',
    options: [
        {
        name: 'spot',
        type: 3,
        description: '地點',
        required: true,
        },
    ]
  }
}

module.exports =  { slashCommandName, slashCommand }