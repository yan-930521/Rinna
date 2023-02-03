var YTvideos = document.getElementById('YTvideos');
var load = document.getElementById('loading');
var loaded = false;

async function showYT() {
	const url = `https://rinna.karirino3o.repl.co/getvideos`;
	let res = await axios.get(url).catch(err=>console.log(err));
	if(!res.data) return;
	let { items } = res.data;
	let content = "";
	for(let i in items) {
		content += `
			<figure class="effect-julia item">
			    <img src="${items[i].snippet.thumbnails.medium.url}" alt="Image">
			    <figcaption>
			        <div>
			            <p>${items[i].snippet.title}</p>
			        </div>
			        <a href="https://www.youtube.com/watch?v=${items[i].id.videoId}" target="_blank">View more</a>
			    </figcaption>
			</figure>
		`
	}
    YTvideos.removeChild(load);
    YTvideos.innerHTML = content;
    if(!loaded) setupGallery();
    loaded = true;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
