const axios = require('axios').default;
const { WebEmbed } = require('discord.js-selfbot-v13')
module.exports = {
	name: "userinfo",
	async execute(message, args) {
		const id = args[0]
		if (isNaN([parseInt(id)])) return message.reply(`ID składa się z cyfer, powinno mieć długość 18 lub 19 znaków, które są cyframi.`)
		if (id.length < 18) return message.reply("To nie jest prawidłowe ID") 
		const axiosrequest = await axios.get(`https://discord.com/api/v9/users/${id}`, {headers: {"Content-Type": "application/json", Authorization: `${message.client.token}`}})
		const content = `**Tag:** ${axiosrequest.data.username}#${axiosrequest.data.discriminator}\n**ID:** ${axiosrequest.data.id}\n**Nazwa wyświetlana:** ${axiosrequest.data.global_name}\n**Link do awataru:** https://cdn.discordapp.com/avatars/${axiosrequest.data.id}/${axiosrequest.data.avatar}.png?size=512`
		message.reply(content)

	}
}