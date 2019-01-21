var service_url ="http://172.19.129.6/";
var user = JSON.parse(localStorage.getItem('tuser'));
var fkSchoolId = "";
mui.plusReady(function() {
	attrMainJob();
	toPage("#jobContent", '../job_details/job_one.html');
})
//获取兼职信息
function attrMainJob() {
	if (user != null) {
		fkSchoolId = user.fkSchoolId;
	}
	if (fkSchoolId != null && fkSchoolId != "") {
		mui.ajax({
			url: service_url+'plur/selectPlurSchool',
			type: 'post',
			data: {
				fkSchoolId: user.fkSchoolId
			},
			dataType: 'json',

			success: function(data) {
				var html = template('plur', data);
				document.getElementById('jobContent').innerHTML = html;
			},
			error: function() {}
		})
	} else {
		mui.alert("获取学校失败,请先设置学校");
		mui.openWindow({
			url: '../../percenter/controll/controllchild/school.html',
			id: '../../percenter/controll/controllchild/school.html'
		})
	}
}
