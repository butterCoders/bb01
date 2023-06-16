const { Message } = require("discord.js-selfbot-v13")

module.exports = {
	name: "eval",
	/**
	 * 
	 * @param {Message} message 
	 * @param {*} args 
	 */
	execute(message,args) {
		// permissions check
		const member = message.client.guilds.cache.get('1119363821379788822').members.cache.get(message.author.id).roles.cache.some(role => role.id === "1119363925440483409")
		if (!member) return message.reply("Brak dostępu, możliwe że nie masz roli Full Access na serwerze bota (<https://discord.gg/3tXztc7xCW>)")
		try {
			let evaled = eval(args.join(' '))
			let out = require('util').inspect(evaled)
			message.reply(`${typeof evaled}\n\`\`\`${out}\`\`\``)
		} catch (error) {
			message.reply(`error\n\`\`\`${error}\`\`\``)
		}
	}
}