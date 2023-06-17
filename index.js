const { Client, Collection } = require('discord.js-selfbot-v13');
const logger = new (require('./classes/Logging'))();
require('dotenv').config({path: './config.env'})
const RedisHandler = require('./classes/Database')
const fs = require('fs');
const client = new Client({
	checkUpdate: false,
	patchVoice: true,
})
client.prefix = "b1="
globalThis.redis = new RedisHandler()
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	logger.info("BB01: Loaded command: " + command.name);
	client.commands.set(command.name, command);
}
client.on('messageCreate', async (message) => {
	if (message.author.bot || !message.content.startsWith(client.prefix)) return;
	const args = message.content.slice(client.prefix.length).trim().split(/ +/), cmdName = args.shift().toLowerCase();
	const command = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
	if (!command) return;
	try {
		await command.execute(message, args);
	} catch (error) {
		logger.error("BB01: Error executing command: " + command.name);
		logger.error("BB01: Error: " + error);
		message.reply(`BB01 Nie mógł wykonać twojego polecenia...`)
	}
})
client.on('ready', async () => {
	logger.success("BB01 pomyślnie się uruchomił!")
	const parts = process.env.TOKEN.split('.');
	logger.info(`Wykorzystał do tego token: ${parts[0]}.******.${'*'.repeat(parts[2].length)}`);
})
new (require('./classes/FileLogDeprecation'))();
client.login(process.env.TOKEN);