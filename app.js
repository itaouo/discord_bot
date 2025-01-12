const { Client, GatewayIntentBits } = require('discord.js');

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