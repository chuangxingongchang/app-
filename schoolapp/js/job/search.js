var service_url = "http://192.168.43.4/";
var schoolname = "";
var seachna = "";
if (localStorage.getItem("schoolname") != null) {
	schoolname = localStorage.getItem("schoolname");
}
mui.plusReady(function() {
	window.addEventListener('tosearchs', function(event) {
		seachna = event.detail.searchf;
		if (schoolname != null && schoolname != "") {
			if (seachna != null && seachna != "") {
				mui.ajax({
					url: service_url+'plur/jobsearch',
					type: 'post',
					data: {
						searchname: seachna,
						schoolname: schoolname
					},
					dataType: 'json',
					success: function(data) {
						var html = template('allJobBySearch', data);
						document.getElementById('jobSearch').innerHTML = html;
					}
				})
			} else {
				mui.openWindow({
					url: 'error.html',
					id: 'error.html'
				})
			}
		} else {
			mui.openWindow({
				url: 'error.html',
				id: 'error.html'
			})
		}

	}, false);
	toPage("#jobSearch","job_details/job_one.html");
})
