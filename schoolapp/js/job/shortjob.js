var service_url = "http://192.168.0.101/";
var fkSchoolId = "";
var schoolname = "";
if (localStorage.getItem("schoolname") != null) {
	schoolname = localStorage.getItem("schoolname");
}
var user = JSON.parse(localStorage.getItem('tuser'));
mui.plusReady(function() {
	if (schoolname != null && schoolname != "") {
		mui.ajax({
			url: service_url+'school/getSchool',
			type: 'post',
			async: false,
			data: {
				schoolname: schoolname
			},
			dataType: 'json',
			success: function(data) {
				if (data.sms.status == true) {
					fkSchoolId = data.fkSchoolId;
					mui.ajax({
						url: service_url+'plur/SLjob',
						type: 'post',
						data: {
							fkSchool: fkSchoolId,
							fkTimetype: 1
						},
						async: false,
						timeout: 10000,
						dataType: 'json',
						success: function(data) {
							var html = template("shortjob", data);
							document.getElementById("shortcontent").innerHTML = html;
						},
						error: function(timeout, xhr, type, errorThrown) {
							mui.openWindow({
								url: "error.html",
								id: "error.html"
							})
						}
					})
				} else {
					mui.openWindow({
						url: "error.html",
						id: "error.html"
					})
				}
			}
		})
	}
	toPage("#shortcontent", "job_details/job_one.html");
})
