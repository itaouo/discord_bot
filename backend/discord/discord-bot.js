const { Client, GatewayIntentBits } = require('discord.js')
const schedule = require('node-schedule')

require('dotenv').config()
const LANGUAGE = process.env.LANGUAGE
const TOKEN = process.env.DISCORD_BOT_TOKEN
const COMMAND_FOLDER_PATH = process.env.COMMAND_FOLDER_PATH
const CHANNEL_ID = process.env.CHANNEL_ID
const MAIN_PATH = process.env.MAIN_PATH

const scheduleWeather = async () => {
  schedule.scheduleJob({ hour: 22, minute: 0 }, async function() {
    const channel = client.channels.cache.get(CHANNEL_ID)
    let options = ""
    let message = await require(COMMAND_FOLDER_PATH + "weather").execute(options)
    channel.send("🔔 " + message)
  })
}

const { messages } = require(`./keyword/keyword-${LANGUAGE}.json`)
const loadSlashCommands = require('./slash-command.js')
const { listAllCommands } = require('../main/tools/file-handler.js')

const client = new Client({
intents:
  [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ]
})

client.login(TOKEN)

client.on('ready', async () => {
  client.user.setPresence({ activities: [{ name: '耍廢' }], status: 'online' })
  console.log('Bot is online.')

  loadSlashCommands()
  scheduleWeather()
})

client.on('messageCreate', async msg => {
  if (msg.author.bot) return

  let reply = messages.filter(item => msg.content.includes(item.keyword))
  if (reply.length > 0) {
    msg.reply(reply[0].botmessage)
    console.log(`Bot reply.`)
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return
  const { commandName, options } = interaction
  const commands = await listAllCommands()

  commands.forEach(async command => {
    let filePath = COMMAND_FOLDER_PATH + command
    let commandPath = MAIN_PATH + command

    if (require(filePath).slashCommandName === commandName) {
      let message = ""
      await interaction.deferReply()

      try{
        message = await require(commandPath).execute(options)
      } catch (error){
        message = error.message
      }
      
      if (interaction.deferred) {
        await interaction.editReply(message)
      } else {
        await interaction.reply(message)
      }

      console.log(commandName + " command execute.")
    }
  })
})