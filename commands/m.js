module.exports = {
	name: "mm11",
	async execute(message, args) {
		// comment return to enable this experiment
		return
		const play = require('play-dl');
const {
	createAudioPlayer,
	createAudioResource,
  NoSubscriberBehavior,
} = require('@discordjs/voice');
// const channel = (await (message.member.user.dmChannel || message.member.user.createDM()));
const connection = await message.channel.call()
let stream;
if (!args[0]) {
	return message.channel.send('Enter something to search for.');
} else if (args[0].startsWith('https://www.youtube.com/watch?v=')) {
	stream = await play.stream(args.join(' '));
} else {
	const yt_info = await play.search(args, {
		limit: 1
	});
	stream = await play.stream(yt_info[0].url);
}
const resource = createAudioResource(stream.stream, {
	inputType: stream.type,
	inlineVolume: true,
});
resource.volume.setVolume(0.25);
const player = createAudioPlayer({
	behaviors: {
		noSubscriber: NoSubscriberBehavior.Play,
	},
});
let i = setInterval(() => {
	// const m = channel.voiceUsers.get(message.author.id);
		player.play(resource);
		connection.subscribe(player);
		clearInterval(i);
}, 250);
	}
}