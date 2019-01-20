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
		url: "workHandle/viewPerson.html",
		id: "workHandle/viewPerson.html"
	});
	document.getElementById("toSignup").addEventListener('tap', function() {
		var pageSign = plus.webview.getWebviewById("workHandle/viewPerson.html");
		var signstate = "报名";
		var pkPlurid = mui(".word_one")[0].id;
		var persons = mui(".word_two")[0].id;
		mui.fire(pageSign, "toSign", {
			pkPlurid: pkPlurid,
			signstate: signstate,
			persons: persons
		});
		mui.openWindow({
			id: "workHandle/viewPerson.html"
		})
	})
	
})
