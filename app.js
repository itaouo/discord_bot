const { Client, GatewayIntentBits } = require('discord.js');
const express = require("express");

require('dotenv').config()

const LANGUAGE = process.env.LANGUAGE;
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const { messages } = require(`./keyword/keyword-${LANGUAGE}.json`);

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

client.on('ready', () => { // bot is ready
    client.user.setPresence({ activities: [{ name: '耍廢' }], status: 'online' });
    console.log('Bot is online.')
});

client.on('messageCreate', async msg => { // client send message in chat
    if (msg.author.bot)
        return;

    let reply = messages.filter(item => msg.content.includes(item.keyword));
    if (reply.length > 0) {
        msg.reply(reply[0].botmessage);
    }
});

const PORT = process.env.PORT; // || 3000
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