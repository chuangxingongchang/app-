var service_url = "106.13.35.57/myschool/";
var user = JSON.parse(localStorage.getItem('tuser'));
var id = "";
if (user != null) {
	id = user.id;
}
mui.plusReady(function() {
	if (id != null && "" != id) {
		mui.ajax({
			url: service_url+'plur/myPlur',
			type: 'post',
			data: {
				id: id
			},
			dataType: 'json',
			success: function(data) {
				var html = template('myAllJob', data);
				document.getElementById('job_content').innerHTML = html;
			}
		})
	} else {
		mui.openWindow({
			url : 'error.html',
			id  : 'error.html'
		})
	}
	toPage("#job_content", "job_details/job_two.html");
})
