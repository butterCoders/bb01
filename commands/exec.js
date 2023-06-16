const { Message } = require("discord.js-selfbot-v13")
const { execSync } = require('child_process')
module.exports = {
	name: "exec",
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
			let executed = execSync(args.join(' ')).toString()
			let out = require('util').inspect(executed)
			message.reply(`success\n\`\`\`${out}\`\`\``)
		} catch (error) {
			message.reply(`error\n\`\`\`${error}\`\`\``)
		}
	}
}