
function toAcTtivity(id,e){
	var detailPage = mui.preload({
		url: e,
		id: e
	});
	mui(id).on('tap', 'li', function() {
		var pagetwo = plus.webview.getWebviewById(e);
		var id = this.getAttribute("id");
		mui.fire(pagetwo,"detailsPageEvent",{id:id});
		mui.openWindow({
			id: e
		});
	});
}
