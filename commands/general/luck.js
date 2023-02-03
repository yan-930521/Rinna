const { MessageEmbed } = require('discord.js');
const sleep = require("./../../utils/sleep");

module.exports = {
	name: ["luck"],
    expectedArgs: "",
    description: '查看每日運勢',
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

			const {
				author,
				member
			} = msg;
			
			const emoji = emojis[
				Object.keys(emojis)[
					Math.floor(
						Math.random() * Object.keys(emojis).length
					)
				]
			];

			const luckEmbed = new MessageEmbed()
            	.setTitle("今日の運勢^3^") 
                .setColor(embedColor.normal)
				.setImage(
					"https://media.discordapp.net/" + 
					"attachments/929912089148010508/1052519943196905483/" + 
					"manymanypantsapng.gif")
                .setTimestamp()
				.setFooter({ text: member.nickname || author.username, iconURL: author.displayAvatarURL });

			// 歌燐可以把字串改成自己喜歡燐的樣子^3^
			
            msg.reply({
                embeds: [
                    luckEmbed
                ],
                allowedMentions: allowedMentions
            }).then(async (newMsg) => {
				await sleep(3000);
				luckEmbed
					.setImage(
						"https://media.discordapp.net/" + 
						"attachments/919500216028266536/960902258860646470/" + 
						"ca69af16-7a43-403a-bfdf-f7c4eaa2e4ca.gif")
					.setDescription(`${emoji} ${emoji} ${emoji} `)
				
				await newMsg.edit({
					embeds: [
	                    luckEmbed
	                ],
	                allowedMentions: allowedMentions
				});
				
                msg.react(emojis[":x_fire:"]).then(() => {
					msg.react(emoji);
				})
            });
        } catch (err) {
            console.log(err);
        }
    }
}