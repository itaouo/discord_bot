const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	console.log("UptimeRobot enter");
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

require('./discord-bot.js')