
var fkSchoolId = "";
var schoolname = "";
if(localStorage.getItem("schoolname")!=null){
	   schoolname = localStorage.getItem("schoolname");
   }
mui.plusReady(function() {
	if(schoolname!=null&&schoolname!=""){
		mui("#backs")[0].innerHTML = schoolname;
		mui.ajax({
			url: 'http://172.19.129.6:86/school/getSchool',
			type: 'post',
			async : false,
			data: {
				schoolname: schoolname
			},
			dataType: 'json',
			success: function(data) {
				if(data.sms.status==true){
					fkSchoolId = data.fkSchoolId;
				}else{
					mui.openWindow({
						url : "error.html",
						id  : "error.html"
					})
				}
			}
		})
	}
	
	attrMainJob();
	attrPopularJob();
	attrRestJob();
	open('job_myjob', "../partjob/myjob.html");
	open('shortjob', "../partjob/shortjob.html");
	open('longjob', "../partjob/longjob.html");
	open('job_income', "../partjob/income.html");
	open('toschool', "../percenter/controll/controllchild/school.html");
	open("firstp",'first.html');
	open("parttp",'part.html');
	open("jobtp",'job.html');
	open("centertp",'centero.html');
	toPage('#item1mobile', '../partjob/job_details/job_one.html');
	toPage('#item2mobile', '../partjob/job_details/job_one.html');
	toPage('#item3mobile', '../partjob/job_details/job_one.html');
	
})
	
//获取所有兼职信息，并按照时间进行排序（先显示后面发布的，后查看先发布的）
function attrMainJob() {
	if (fkSchoolId != null && fkSchoolId != "") {
		mui.ajax({
			url: 'http://172.19.129.6:86/plur/selectPlurSchool',
			type: 'post',
			data: {
				fkSchoolId: fkSchoolId
			},
			dataType: 'json',
			success: function(data) {
				var html = template('allJobByTime', data);
				document.getElementById('item1mobile').innerHTML = html;
			},
			error: function() {}
		})
	}
}
//获取所有热门兼职信息，并按照count进行排序（先显示后面发布的，后查看先发布的）
function attrPopularJob() {
	if (fkSchoolId != null && fkSchoolId != "") {
		mui.ajax({
			url: 'http://172.19.129.6:86/plur/selectPlurSchoolByCount',
			type: 'post',
			data: {
				fkSchoolId: fkSchoolId
			},
			dataType: 'json',
			success: function(data) {
				var html = template('allJobByCount', data);
				document.getElementById('item2mobile').innerHTML = html;
			},
			error: function() {}
		})
	}
}
//获取所有高信用度发布者兼职信息，并按照进行排序（先显示后面发布的，后查看先发布的）
function attrRestJob() {
	
	if (fkSchoolId != null && fkSchoolId != "") {
		mui.ajax({
			url: 'http://172.19.129.6:86/plur/selectPlurSchoolBycredit',
			type: 'post',
			data: {
				fkSchoolId: fkSchoolId
			},
			dataType: 'json',
			success: function(data) {
				var html = template('allJobByCredit', data);
				document.getElementById('item3mobile').innerHTML = html;
			},
			error: function() {}
		})
	}
}

