var firstPage = mui.preload({
	url: "first.html",
	id: "first.html"
});
var partPage = mui.preload({
	url: "part.html",
	id: "part.html"
});
var jobPage = mui.preload({
	url: "job.html",
	id: "job.html"
});
var centeroPage = mui.preload({
	url: "centero.html",
	id: "centero.html"
});

	document.getElementById('firstp').addEventListener('tap',function(){
		mui.openWindow({
			id: "first.html"
		})
	})
	document.getElementById('parttp').addEventListener('tap',function(){
		mui.openWindow({
			id: "part.html"
		})
	})
	document.getElementById('jobtp').addEventListener('tap',function(){
		mui.openWindow({
			id: "job.html"
		})
	})
	document.getElementById('centertp').addEventListener('tap',function(){
		mui.openWindow({
			id: "centero.html"
		})
	})
