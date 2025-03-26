const { REST, Routes } = require('discord.js')

require('dotenv').config()
const TOKEN = process.env.DISCORD_BOT_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID
const COMMAND_FOLDER_PATH = process.env.COMMAND_FOLDER_PATH

const { listAllCommands } = require('../main/tools/file-handler.js')

const slashCommands = async () => 
{
  let result = []
  const commands = await listAllCommands()

  commands.forEach(async command => {
    let filePath = COMMAND_FOLDER_PATH + command
    result.push(await require(filePath).slashCommand())
  })
  return result  
}

const rest = new REST({ version: '10' }).setToken(TOKEN)

const loadSlashCommands = async () => {
  await rest.put(
  Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: await slashCommands() },
  )
  console.log('Successfully loaded application slash commands.')
}

module.exports = loadSlashCommands