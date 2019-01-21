var service_url = "http://172.19.129.6/";
var user = JSON.parse(localStorage.getItem('tuser'));
mui.plusReady(function() {
	mui.ajax({
		url: service_url+'income/myincome',
		type: 'post',
		data: {
			fkUid: user.id
		},
		async: false,
		timeout: 10000,
		dataType: 'json',
		success: function(data) {
			var html = template('myicome', data);
			document.getElementById('incomes').innerHTML = html;
		},
		error: function(timeout, xhr, type, errorThrown) {
			mui.openWindow({
				url : 'error.html',
				id  : 'error.html'
			})
		}
	})
	open("gotoJob", "../zmain/job.html");
})
