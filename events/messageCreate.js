const custom = async (msg, bot) => {
	const { 
		setting: {
			urls,
			host,
			test,
			start_msg,
			list_msg,
			msgs,
			times
		},
		fetchSong,
		playSongs
	} = bot;

	if(msg.author.id != host && msg.author.id != test) return;
		
		let allSongs = [];

		if(msg.content.includes(start_msg)) {
			// 發送隨機的一首歌
			let random = urls[
					Math.floor(
						Math.random() * urls.length
					)
				];
			let song = await fetchSong(random);
		
			allSongs.push(song);
		} 
		if(msg.content.includes(list_msg)) {
			for(let i in urls) {
				let song = await fetchSong(urls[i]);
				allSongs.push(song);
			}
		}

		for(let i in msgs) {
			if(msg.content.includes(i)) {
				let song = await fetchSong(msgs[i]);
				for(let j = 0 ; j < times ; j++)
					allSongs.push(song);
			}
		}

		let args = msg.content.trim().split(" ");
		let cmd = args.shift();
		
		if(cmd.includes("play燐") && args.length > 0) {
			let song = await fetchSong(args.join(" "));
			allSongs.push(song);
		}

		if(allSongs.length == 0) return;
    
        playSongs(allSongs);
}
module.exports = {
	name: "messageCreate",
	once: false,
	execute: async (msg, bot) => {
		try {
	
			// async function
			custom(msg, bot);
	
			const { author, channel, content, guild } = msg;
			const { 
				client,
				setting: {
					prefix
				}
			} = bot;

			
			if(author == client.user) return;

	
			if(!content.startsWith(prefix)) return;
	
			const args = content.slice(prefix.length)
	            .trim()
	            .split(/ +/);
			
			const cmdName = args.shift().toLowerCase();

			const cmd = client.commands.find(cmd => {
				return cmd.name.includes(cmdName);
			});
	
			if(!cmd) return;
	
			if(
				args.length < (cmd.minArgs? cmd.minArgs : 0) ||
	        	(cmd.maxArgs !== null && args.length > cmd.maxArgs)
			) {
				msg.reply({
	                embeds: [
	                    new MessageEmbed()
	                        .setTitle("參數錯誤")
	                        .setColor(embedColor.error)
	                        .setDescription(`需求 :**<command> ${cmd.expectedArgs}**`)
	                        .setTimestamp()
	                ],
	                allowedMentions: allowedMentions
	            });
				return;
			}
	
			cmd.execute(msg, args, bot);
		} catch(err) {
			console.log(err);
		}
	}
}