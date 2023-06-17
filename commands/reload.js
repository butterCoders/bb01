const { Message } = require('discord.js-selfbot-v13')
const { readdirSync } = require('fs');
const logger = new (require('../classes/Logging'))();
module.exports = {
	name: "reload",
	/**
	 * 
	 * @param {Message} message 
	 * @param {*} args 
	 */
	execute(message,args) {
		// permissions check
		const member = message.client.guilds.cache.get('1119363821379788822').members.cache.get(message.author.id).roles.cache.some(role => role.id === "1119363925440483409")
		if (!member) return message.reply("Brak dostępu, możliwe że nie masz roli Full Access na serwerze bota (<https://discord.gg/3tXztc7xCW>)")
        const commandFiles = readdirSync('./commands').filter(x => x.endsWith('.js'))
        for (const file of commandFiles) {
            delete require.cache[require.resolve(`./${file}`)]
			logger.info(`Próba przeładowania pliku ${file}`)
            const command = require(`./${file}`)
            message.client.commands.set(command.name, command)
        }
        message.reply('Wykonano').then((msg) => {
        logger.success("Przeładowano komendy.")
		})
	}
}