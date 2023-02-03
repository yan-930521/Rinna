var images = [
	"https://cdn.discordapp.com/emojis/960186560882561054.webp",
	"https://cdn.discordapp.com/emojis/960512725832847420.webp",
	"https://cdn.discordapp.com/emojis/960509132237045800.webp",
	"https://cdn.discordapp.com/emojis/960509173928456242.webp",
	"https://cdn.discordapp.com/emojis/960186560555393076.webp",
	"https://cdn.discordapp.com/emojis/960494862954803220.webp",
	"https://cdn.discordapp.com/emojis/960859875955605524.webp",
	"https://cdn.discordapp.com/emojis/960859875380957196.webp",
	"https://cdn.discordapp.com/emojis/960180948903809064.webp",
	"https://cdn.discordapp.com/emojis/960859420928143430.webp",
	"https://cdn.discordapp.com/emojis/960191036586594324.webp",
	"https://cdn.discordapp.com/emojis/960509249111355432.webp",
	"https://cdn.discordapp.com/emojis/960515893757100073.webp",
	"https://cdn.discordapp.com/emojis/960515937319129098.webp",
	"https://cdn.discordapp.com/emojis/960859875934617611.webp",
	"https://cdn.discordapp.com/emojis/960859788311412777.webp"
]
var marquee = document.getElementById('marquee');
var emojiLink = "?size=56&quality=lossless"
let n = 5;
let str = "";
while(n--) {
	for(let i in images) {
		str += `<img src="${images[i] + emojiLink}" alt="Image">`
	}
}
marquee.innerHTML = str