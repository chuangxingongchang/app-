var service_url = "106.13.35.57/myschool/";
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

