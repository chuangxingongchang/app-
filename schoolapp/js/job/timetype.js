
function totiPage(id,e){
	var detailPage = mui.preload({
		url: e,
		id: e
	});
	mui(id).on('tap', 'li', function() {
		var pagetwo = plus.webview.getWebviewById(e);
		var id = this.getAttribute('href');
		var timetypeid = this.getAttribute("id");
		var tuid   = this.getAttribute("name");
		mui.fire(pagetwo,"timeid",{timetypeid:timetypeid,tuid:tuid});
		mui.openWindow({
			id: e
		});
	});
}
