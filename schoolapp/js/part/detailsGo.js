var service_url = "http://192.168.43.4/";
var id = "";
mui.plusReady(function() {
	window.addEventListener('myid', function(event) {
		id = event.detail.jobid;
		if (id != null) {
			mui.ajax({
				url: service_url+'plur/getGothisplur',
				type: 'post',
				data: {
					id: id
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
})

