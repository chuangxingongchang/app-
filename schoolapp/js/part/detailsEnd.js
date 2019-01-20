var service_url = "http://192.168.0.101/";
mui.plusReady(function() {
	window.addEventListener('myid', function(event) {
		var id = event.detail.jobid;
		var uid = event.detail.uid;
		if (id != null) {
			mui.ajax({
				url: service_url+'plur/getThisPlur',
				type: 'post',
				data: {
					id: id,
					fkPublisher: uid
				},
				dataType: 'json',
				success: function(data) {
					var html = template('thisplur', data);
					document.getElementById('thisJob').innerHTML = html;
				}
			})
		} else {
			mui.openWindow({
				url : '../error.html',
				id  : '../error.html'
			})
		}

	}, false);
	var detailPages = mui.preload({
		url: "workHandle/payWage.html",
		id: "workHandle/payWage.html"
	});
	document.getElementById("topay").addEventListener('tap', function() {
		var pageSign = plus.webview.getWebviewById("workHandle/payWage.html");
		var signstate = "完成";
		var pkPlurid = mui(".word_one")[0].id;
		mui.fire(pageSign, "topayWage", {
			pkPlurid: pkPlurid,
			signstate: signstate
		});
		mui.openWindow({
			id: "workHandle/payWage.html"
		})
	})
	
})
