const { Client, Intents } = require("discord.js");
const { Player, QueryType, } = require("discord-player");
const playdl = require("play-dl");

module.exports = class Bot {
	constructor(config) {
		this.client = new Client({
	        intents: [
	            Intents.FLAGS.GUILDS,
	            Intents.FLAGS.GUILD_MESSAGES,
	            Intents.FLAGS.GUILD_VOICE_STATES
	        ]
	    });

		this.setting = {
			guildId: config.guild.id,
			channelId: config.channel.id,
			guild: null,
			channel: null,
			YOUTUBE_COOKIE: null,
			urls: config.urls,
			presetVolume: config.presetVolume,
			times: config.times,
		    host: config.host,
			test: config.test,
		    start_msg: config.start_msg,
			list_msg: config.list_msg,
			msgs: config.msgs,
			embedColor: config.embedColor,
			allowedMentions: config.allowedMentions,
			emojis: config.emojis,
			prefix: config.prefix
		};

		this.musicPlayer = null;

		this.isInit = false;
	}

	init = async (setting) => {
		console.log("init settings...");
		let { TOKEN, YOUTUBE_COOKIE } = setting;

		// 備份
		this.setting.YOUTUBE_COOKIE = YOUTUBE_COOKIE;

		this.client.login(TOKEN);

		this.registerEvents();
		this.registerCommands();
	}

	initSetting = async () => {
		this.setting.guild = await this.client.guilds.fetch(
			this.setting.guildId
		);

	    this.setting.channel = await this.client.channels.fetch(
			this.setting.channelId
		);
	
	    this.musicPlayer = new Player(this.client, {
	        ytdlOptions: {
	            requestOptions: {
	                headers: {
	                    cookie: this.setting.YOUTUBE_COOKIE
	                }
	            }
	        }
	    });
	
	    if(
			this.setting.guild || 
			this.setting.channel || 
			this.setting.musicPlayer
		)  {
			this.isInit = true;
			return true;
		} else {
			throw new Error("fail in initSetting.");
		}
	}

	registerEvents = () => {
		console.log("loading events...");
		require("./events/index")(this);
	}

	registerCommands = async () => {
		console.log("loading commands...");
		this.client.commands = await require("./commands/index")();
	}

	setRichPresence = async (status, activity, type) => {
		console.log("setting rich presence...");
		await this.client.user.setPresence({
            status: status
        });
        await this.client.user.setActivity(activity, {
            type: type
        });
	}

	connect = async () => {
		if(!this.isInit) return;
	
	    return new Promise(async (resovle, reject) => {
			const {
				guildId,
				guild,
				channel
			} = this.setting;
	        let queue = this.musicPlayer.getQueue(guildId);
	        if (!queue) {
	            queue = this.musicPlayer.createQueue(guild, {
	                leaveOnEnd: false,
	                autoSelfDeaf: true,
	                metadata: {
	                    channel: channel
	                },
	                async onBeforeCreateStream(
						track, source, _queue
					) {
	                    if (source === "youtube") {
	                        return (
								await playdl.stream(
									track.url, { 
										discordPlayerCompatibility: true 
									}
								)
							).stream;
	                    }
	                }
	            });
	        }
	        if (!queue.connection) {
	            await queue.connect(channel).catch((error) => {
	                this.musicPlayer.deleteQueue(guildId);
	                resovle(null);
	            });
	            if (channel.type == "GUILD_STAGE_VOICE") {
	                await guild.me.voice.setSuppressed(false);
	            }
	        }
	        resovle(queue);
	    });
	}

	fetchSong = async (url) => {
		if(!this.isInit) return;
	    let res = await this.musicPlayer.search(url, {
	            requestedBy: this.client.user,
	            searchEngine: QueryType.AUTO
	        });
	
	    return res.tracks[0];
	}
	
	playSongs = async (songs) => {
	    let queue = await this.connect();
	
	    queue.addTracks(songs);
	
	    if (!queue.playing) {
			await queue.play();
			queue.setVolume(this.setting.presetVolume);
		}
	}
}
/*
                                                                    
                                                  
              (((((((                             
           /((((((((###*                          
         (###((((###((((((                        
      *((((((#####(((((((,....                    
    /(((((((######(((((........%(                 
     (((((###(((((##,.........%####               
       .###(((((((...........%#######(            
          (((((,...........%%###########          
            ..............%%##############(       
           ..............%%#################      
             ..........%%%##################      
               .......%%%#################        
                  ...%%%###############           
                       (#############             
                          ########                
 */