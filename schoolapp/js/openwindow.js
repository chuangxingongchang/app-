
function open(id, e) {
	document.getElementById(id).addEventListener('tap', function() {
		mui.openWindow({
			url : e,
			id  : e,
			createNew : true,
			waiting: {
				autoShow : true,
				titile   : '正在加载...'
			}
		});
	});
}

function bottomopen(id, e, f) {
	var detailPage = mui.preload({
		url: e,
		id: e
	});
	var detailPageTwo = mui.preload({
		url : f,
		id  :f
	})
	document.getElementById(id).addEventListener('tap', function() {
		var phoneno = localStorage.getItem('phone');
		if(phoneno == null) {
			var pageTwo = plus.webview.getWebviewById(f);
			mui.openWindow({
				id: f
			})
		} else {
			var pageone = plus.webview.getWebviewById(e);
			mui.openWindow({
				id: e
			})
		}
	})
}
function toBefore(beforehtml){
	document.getElementById('topart').addEventListener('tap',function(){
			mui.openWindow({
				url : beforehtml,
				id  : beforehtml,
				createNew : true,
				waiting: {
					autoShow : true,
					titile   : '正在加载...'
				}
			});	
		})
}
