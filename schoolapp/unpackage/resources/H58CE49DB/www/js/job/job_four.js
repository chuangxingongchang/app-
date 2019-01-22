var service_url = "106.13.35.57/myschool/";
var id = "";
var user = JSON.parse(localStorage.getItem('tuser'));
mui.plusReady(function() {
	window.addEventListener('myid', function(event) {
		id = event.detail.jobid;
		uid = event.detail.uid;
		if (id != null) {
			mui.ajax({
				url: service_url+'plur/getThisPlur',
				type: 'post',
				timeout : 10000,
				async   : false,
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
	toBefore('../longjob.html');
})

