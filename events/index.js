const fs = require("fs");
const path = require("path");

module.exports = (bot) => {
	let eventFiles = fs.readdirSync(__dirname).filter(file => {
			return file != __filename.replace(__dirname, "");
		});

	for(let file of eventFiles) {
		let event = require(path.join(__dirname, file));
		if(event.once) {
			bot.client.once(event.name, (...args) => {
				return event.execute(...args, bot);
			});
		} else {
			bot.client.on(event.name, (...args) => {
				return event.execute(...args, bot);
			});
		}
	}
}