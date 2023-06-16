const { WebEmbed } = require("discord.js-selfbot-v13")

module.exports = {
	name: 'ping',
	execute(message, args) {
		const embed = new WebEmbed()
			.setTitle("Pong!")
			.setDescription(`Mój ping to ${message.client.ws.ping}ms`)
			.setColor('BLURPLE')
		message.reply({embeds: [embed]})
	}
}