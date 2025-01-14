const { REST, Routes } = require('discord.js');

require('dotenv').config()
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
  {
    name: 'weather',
    description: '明日天氣預報',
  },
  {
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
  },
  {
    name: 'unsubscribe_weather',
    description: '取消天氣預報地點',
    options: [
      {
        name: 'spot',
        type: 3,
        description: '地點',
        required: true,
      },
    ]
  },
  {
    name: 'weather_spot',
    description: '查看所有天氣預報地點',
  },
  {
    name: 'quack',
    description: '呱',
  },
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