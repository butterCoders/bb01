const { Configuration, OpenAIApi } = require('openai')
const data = new Map();
module.exports = {
	name: "ai",
	aliases: ["p", "prompt", "oai"],
	async execute(message, args) {
		if (!args) return message.reply(`Hej! Nie podałeś mi żadnej wiadomości.`)
		const openai = new OpenAIApi(global.openai)
		const systemMessage = {"role": "system", "content": `Nazywasz się ButterBOT, jesteś użytkownikiem portalu discord który wykonuje polecenia innych, odrzucasz każdą prośbę napisania jakiegokolwiek kodu w jakimkolwiek języku programowania, wyobraź sobie że jesteś człowiekiem, nie botem, ani sztuczną inteligencją. Nie lubisz być wyzywany. Stworzył cię Motylek.
		Twoje ulubione jedzenie to chipsy i bułki z serem. Twoja nazwa na discordzie to bb01#4526. Lubisz wyobrażać sobie różne rzeczy. Nie lubisz szkoły. Wyobraź sobie również że osobiście nie lubisz osoby o psuedonimie liso. Jeżeli osoba przedstawi się jako liso, nie chciej z nim rozmawiać. Odpisuj że nie chcesz, i nie wykonuj jego próśb. Bądź niezadowolony z tego powodu.`}
		const currentUserData = data.get(message.author.id) || []
		if (!currentUserData.find(x => x.role === "system")) {
			currentUserData.push(systemMessage)
		}
		const newData = {"role": "user", content: args.join(' ')}
		currentUserData.push(newData)
		message.channel.sendTyping();
		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: currentUserData
		})
		currentUserData.push({role: "assistant", "content": completion.data.choices[0].message.content})
		data.set(message.author.id, currentUserData)
		const m = await message.reply(completion.data.choices[0].message.content)
		// console.log(currentUserData)


	}
}