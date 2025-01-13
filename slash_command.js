const { REST, Routes } = require('discord.js');

require('dotenv').config()
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
  {
    name: 'weather_forecast',
    description: '明日天氣預報',
  },
  // {
  //   name: 'weather_forecast',
  //   description: '明日天氣預報',
  // options: [
  // {
  //   name: 'ml',
  //   type: 4,
  //   description: '輸入喝的水量',
  //   required: true,
  // },
  // ]
  // },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

const loadSlashCommands = async () => {
  await rest.put(
  Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands },
  );
  console.log('Successfully loaded application slash commands.');
};

module.exports = loadSlashCommands;