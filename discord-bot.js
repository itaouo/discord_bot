const { Client, GatewayIntentBits } = require('discord.js');

require('dotenv').config()
const LANGUAGE = process.env.LANGUAGE;
const TOKEN = process.env.DISCORD_BOT_TOKEN; 

const { messages } = require(`./keyword/keyword-${LANGUAGE}.json`);
const loadSlashCommands = require('./slash_command.js');
const [fetchTomorrowWeather, addWeatherCity, deleteWeatherCity, checkWeatherCity] = require('./command/weather.js'); 

const client = new Client({
intents:
  [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ]
});

client.login(TOKEN);

client.on('ready', () => {
  client.user.setPresence({ activities: [{ name: '耍廢' }], status: 'online' });
  console.log('Bot is online.');

  loadSlashCommands();
});

client.on('messageCreate', async msg => {
  if (msg.author.bot) return;

  let reply = messages.filter(item => msg.content.includes(item.keyword));
  if (reply.length > 0) {
    msg.reply(reply[0].botmessage);
  }
  console.log(`Bot reply.`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const {commandName, options } = interaction;
  if (commandName === 'weather') {
    await interaction.reply(await fetchTomorrowWeather());
  } else if (commandName === 'subscribe_weather'){
    await interaction.reply(await addWeatherCity(options.getString('spot')));
  } else if (commandName === 'unsubscribe_weather'){
    await interaction.reply(await deleteWeatherCity(options.getString('spot')));
  } else if (commandName === 'weather_spot'){
    await interaction.reply(await checkWeatherCity());
  } else if (commandName === 'quack'){
    await interaction.reply('呱');
  } else {
    await interaction.reply('Command not recognized.');
  }
});