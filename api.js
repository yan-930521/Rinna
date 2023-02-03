const axios = require("axios");
const Database = require("@replit/database");

const db = new Database();

const getData = async () => {
	let data = await db.get("data");
	if(!data) {
		let videos = await update();
		return videos;
	}
	let old = new Date(data.timestamp);
	if((Date.now() - old) >= ( 20 * 60 * 1000)) {
		let videos = await update();
		if(!videos) return data.data;
		return videos;
	}
	return data.data;
}
const update = async () => {
	let videos = await getVideos();
	if(videos) {
		await db.set("data", {
			data: videos,
			timestamp: Date.now()
		});
		return videos;
	}
	return null;
}
const getVideos = async () => {
	const url = `https://www.googleapis.com/youtube/v3/search?&part=snippet,id&order=date&channelId=UCr6Zz5TL7EpRzGssPCe7zGA&key=${process.env.ytKey}&maxResults=20`;
	let res = await axios(url).catch(err =>{});
	if(res.errors) return null;
	return res.data;
}

module.exports.getData = getData;