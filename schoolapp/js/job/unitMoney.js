
function tounPage(id,e){
	var detailPage = mui.preload({
		url: e,
		id: e
	});
	mui(id).on('tap', 'li', function() {
		var pagetwo = plus.webview.getWebviewById(e);
		var id = this.getAttribute('href');
		var unitid = this.getAttribute("id");
		var unid   = this.getAttribute("name");
		mui.fire(pagetwo,"monyid",{unitid:unitid,unid:unid});
		mui.openWindow({
			id: e
		});
	});
}
