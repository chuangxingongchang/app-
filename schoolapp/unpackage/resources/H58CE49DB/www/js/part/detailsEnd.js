var service_url = "106.13.35.57/myschool/";
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
})
