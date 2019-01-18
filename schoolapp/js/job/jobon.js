
function toPage(id,e){
	var detailPage = mui.preload({
		url: e,
		id: e
	});
	mui(id).on('tap', 'li', function() {
		var pagetwo = plus.webview.getWebviewById(e);
		var id = this.getAttribute('href');
		var jobid = this.getAttribute("id");
		var uid   = this.getAttribute("name");
		mui.fire(pagetwo,"myid",{jobid:jobid,uid:uid});
		mui.openWindow({
			id: e
		});
	});
}
