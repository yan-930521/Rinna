const URL = "https://api.countapi.xyz/hit/website.karirino3o.repl.co/visits";

var CLICK = document.getElementById('click');

var clickCount = 0;
var totalCount = null;
CLICK.onClick = () => {
	clickCount++;
	fetch(url).then(res=>res.json()).then(data=>{
		totalCount = data.value;
		CLICK.innerHTML = ``
	});
}