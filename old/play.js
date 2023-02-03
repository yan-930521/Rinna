const { Client, Intents } = require("discord.js");
const { Player, QueryType, } = require("discord-player");
const playdl = require("play-dl");

const {
    guild: {
        id: guildId
    },
    channel: {
        id: channelId
    },
    urls,
    presetVolume,
    host,
	test,
	times,
    start_msg,
	list_msg,
	msgs
} = require("./config.js");

let client = null;
let guild = null;
let channel = null;
let player = null;

const initSetting = async (opt) => {
    guild = client.guilds.cache.get(guildId);

    channel = await client.channels.fetch(channelId);

    player = new Player(client, {
        ytdlOptions: {
            requestOptions: {
                headers: {
                    cookie: opt.YOUTUBE_COOKIE
                }
            }
        }
    });

    if(guild && channel && player)  return true;

    return false;
}

const connect = () => {
    return new Promise(async (resovle, reject) => {
        let queue = player.getQueue(guildId);
        if (!queue) {
            queue = player.createQueue(guild, {
                leaveOnEnd: false,
                autoSelfDeaf: true,
                metadata: {
                    channel: channel
                },
                async onBeforeCreateStream(track, source, _queue) {
                    if (source === "youtube") {
                        return (await playdl.stream(track.url, { discordPlayerCompatibility: true })).stream;
                    }
                }
            });
        }
        if (!queue.connection) {
            await queue.connect(channel).catch((error) => {
                this.player.deleteQueue(guildId);
                resovle(null);
            });
            if (channel.type == "GUILD_STAGE_VOICE") {
                await guild.me.voice.setSuppressed(false);
            }
        }
        resovle(queue);
    });
}

const fetchSong = async (url) => {

    let res = await player.search(url, {
            requestedBy: client.user,
            searchEngine: QueryType.AUTO
        });

    return res.tracks[0];
}

const play = async (songs) => {
    let queue = await connect();

    queue.addTracks(songs);

    if (!queue.playing) await queue.play();

    queue.setVolume(presetVolume);
}

(async (token, YOUTUBE_COOKIE, argv) => {
    
    client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_VOICE_STATES
        ]
    });

    client.login(token);

    client.on("ready", async () => {
		console.log("bot is ready.")
        let isInit = await initSetting({YOUTUBE_COOKIE: YOUTUBE_COOKIE});

        if(!isInit || argv.length < 3) {
            throw new Error("init failed.");
        }

		let allSongs = [];

		let song = await fetchSong(argv[2]);
		allSongs.push(song);

		if(allSongs.length == 0) return;
    
        play(allSongs);
    });
})(process.env.token_karirin, process.env.YOUTUBE_COOKIE, process.argv);