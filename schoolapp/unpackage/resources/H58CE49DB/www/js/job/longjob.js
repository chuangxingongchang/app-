var service_url = "106.13.35.57/myschool/";
var fkSchoolId = "";
var schoolname = "";
if (localStorage.getItem("schoolname") != null) {
	schoolname = localStorage.getItem("schoolname");
}
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
							fkTimetype: 2
						},
						async: false,
						timeout: 10000,
						dataType: 'json',
						success: function(data) {
							var html = template("longjob", data);
							document.getElementById("longcontent").innerHTML = html;
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

	toPage("#longcontent", "job_details/job_four.html");
	toBefore("../zmain/job.html");
})
