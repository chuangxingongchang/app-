
function tosePage(id,e){
	var detailPage = mui.preload({
		url: e,
		id: e
	});
	mui(id).on('tap', 'li', function() {
		var pagetwo = plus.webview.getWebviewById(e);
		var id = this.getAttribute('href');
		var settleid = this.getAttribute("id");
		var suid   = this.getAttribute("name");
		mui.fire(pagetwo,"settleid",{settleid:settleid,suid:suid});
		mui.openWindow({
			id: e
		});
	});
}
