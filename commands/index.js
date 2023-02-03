const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

module.exports = () => {
	return new Promise((resolve, reject) => {
		const commands = new Collection();
		let commandList = [];
		
		let commandFolders = fs.readdirSync(__dirname).filter(f => {
			return path.join(__dirname, f) !== __filename
		});
		
		for (let folder of commandFolders) {
			let folderPath = path.join(__dirname, folder);
		  	let commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));
			let num = 0;
		  	for (let file of commandFiles) {
				let filePath = path.join(folderPath, file);
		    	let command = require(filePath);
		    	commands.set(num, command);
		    	commandList.push(`${num}. ${command.name.join(" | ")} ${command.description}`);
				num++;
		  	}
		}

		commandList = commandList.sort((a, b) => {
		  return Number(a.split('.')[0]) - Number(b.split('.')[0]);
		}).join('\n');
		
		fs.writeFile(path.join(__dirname, "./../cmdList.txt"), commandList, (err) => {
		  if (err) {
				reject(err);
			}
			resolve(commands);
		});
	});
}