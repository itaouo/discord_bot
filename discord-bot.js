const { Client, GatewayIntentBits } = require('discord.js')

require('dotenv').config()
const LANGUAGE = process.env.LANGUAGE
const TOKEN = process.env.DISCORD_BOT_TOKEN
const COMMAND_FOLDER_PATH = process.env.COMMAND_FOLDER_PATH

const { messages } = require(`./keyword/keyword-${LANGUAGE}.json`)
const loadSlashCommands = require('./slash_command.js')
const [writeFile, readFile, listToString, stringToList, listAllCommands] = require('./tools/file-handler.js')

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

    if (require(filePath).slashCommandName === commandName) {
      await interaction.deferReply()
      let message = await require(filePath).execute(options)

      if (interaction.deferred) {
        await interaction.editReply(message)
      } else {
        await interaction.reply(message)
      }

      console.log(commandName + " command execute.")
    }
  })
})