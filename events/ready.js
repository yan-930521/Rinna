module.exports = {
	name: "ready",
	once: true,
	execute: async (_client, bot) => {
		await bot.initSetting();
		await bot.setRichPresence("online", "歌燐かりん's live", "WATCHING")
		let date = new Date();
		let date_tw = date.toLocaleString("zh-TW", {timeZone: "Asia/Taipei"});
		let date_jp = date.toLocaleString("ja-JP", {timeZone: "JST"});
		console.log(
			"\n[ " + _client.user.tag + " ] is ready.\n" + 
			`now time:\n` +
			`	tw: ${date_tw}\n` +
			`	jp: ${date_jp}\n\n\n` +
			`\n              (((((((` +
			`\n           /((((((((###*` +
			`\n         (###((((###((((((` +
			`\n      *((((((#####(((((((,....` +
			`\n    /(((((((######(((((........%(` +
			`\n     (((((###(((((##,.........%####` +
			`\n       .###(((((((...........%#######(` +
			`\n          (((((,...........%%###########` +
			`\n            ..............%%##############(` +
			`\n           ..............%%#################` +
			`\n             ..........%%%##################` +
			`\n               .......%%%#################` +
			`\n                  ...%%%###############` +
			`\n                       (#############` +
			`\n                          ########`
		);
	}
}