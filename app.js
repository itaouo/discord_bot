const { Client, GatewayIntentBits } = require('discord.js');
const express = require("express");

require('dotenv').config()

const LANGUAGE = process.env.LANGUAGE;
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const PORT = process.env.PORT; // || 3000

const { messages } = require(`./keyword/keyword-${LANGUAGE}.json`);
const loadSlashCommands = require('./slash_command.js');
const fetchData = require('./command/weather.js'); 

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
  if (commandName === 'weather_forecast') {
    await interaction.reply('weather');
  } else {
    await interaction.reply('Command not recognized.');
  }
});

const app = express();

app.get('/', (req, res) => {
	console.log("uptimeRobot enter");
	res.send("DiscordBot");
});

app.get('/healthz', (req, res) => {
	res.status(200).send('OK');
});

app.listen(PORT, () => {
	console.log("Start Server");
	setInterval(() => {
		let mUsage = process.memoryUsage();
        let memorySum = mUsage.rss + mUsage.heapUsed + mUsage.heapTotal + mUsage.external + mUsage.arrayBuffers;
		let memoryMB = (memorySum/(1024*1024)).toFixed(2) + " MB";
		console.log(`Live...${memoryMB} ` + new Date());
		gc();
	}, 60000);
});