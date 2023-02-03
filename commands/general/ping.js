const { MessageEmbed } = require('discord.js');

module.exports = {
	name: ["ping"],
    expectedArgs: "",
    description: '查看bot的延遲',
    minArgs: 0,
    maxArgs: 0,
	async execute(msg, args, bot) {
        try {
			const { 
				client, 
				setting: {
					embedColor,
					allowedMentions,
					emojis
				}
			} = bot;
			
            msg.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Pong !")
                        .setColor(embedColor.normal)
                        .setDescription(`API Latency: ${Math.round(client.ws.ping)} ms\nLatency: ${Date.now() - msg.createdTimestamp} ms`)
                        .setTimestamp()
                ],
                allowedMentions: allowedMentions
            }).then(() => {
                msg.react(emojis[":x_fire:"]);
            });
        } catch (err) {
            console.log(err);
        }
    }
}