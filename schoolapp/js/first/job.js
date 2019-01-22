var service_url = "http://192.168.43.4/";
var fkSchoolId = "";
var schoolname = "";
var phoneno = "";
if(localStorage.getItem("schoolname")!=null){
	   schoolname = localStorage.getItem("schoolname");
   }

if(localStorage.getItem('phone')!=null){
	phoneno = localStorage.getItem('phone');
}
mui.plusReady(function() {
	if(schoolname!=null&&schoolname!=""){
		mui("#Myschool")[0].innerText = schoolname;
		mui.ajax({
			url: service_url+'school/getSchool',
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
	
	if(phoneno != null&&phoneno!="") {
		open('job_myjob', "../partjob/myjob.html");
		open('job_income', "../partjob/income.html");
		open("parttp", 'part.html');
		open("centertp", 'centero.html');
	}else{
		open('job_myjob', "../person/login.html");
		open('job_income', "../person/login.html");
		open("parttp",'../person/login.html');
		open("centertp",'../person/login.html');
	}
	attrMainJob();
	attrPopularJob();
	attrRestJob();
	open("firstp", 'first.html');
	open('shortjob', "../partjob/shortjob.html");
	open('longjob', "../partjob/longjob.html");
	toPage('#item1mobile', '../partjob/job_details/job_one.html');
	toPage('#item2mobile', '../partjob/job_details/job_one.html');
	toPage('#item3mobile', '../partjob/job_details/job_one.html');
})
	
//获取所有兼职信息，并按照时间进行排序（先显示后面发布的，后查看先发布的）
function attrMainJob() {
	if (fkSchoolId != null && fkSchoolId != "") {
		mui.ajax({
			url: service_url+'plur/selectPlurSchool',
			type: 'post',
			timeout : 10000,
			data: {
				fkSchoolId: fkSchoolId
			},
			dataType: 'json',
			success: function(data) {
				var html = template('allJobByTime', data);
				document.getElementById('item1mobile').innerHTML = html;
			},
			error: function(timeout,xhr,type) {
				mui.openWindow({
					url : 'error.html',
					id  : 'error.html'
				})
			}
		})
	}
}
//获取所有热门兼职信息，并按照count进行排序（先显示后面发布的，后查看先发布的）
function attrPopularJob() {
	if (fkSchoolId != null && fkSchoolId != "") {
		mui.ajax({
			url: service_url+'plur/selectPlurSchoolByCount',
			type: 'post',
			timeout : 10000,
			data: {
				fkSchoolId: fkSchoolId
			},
			dataType: 'json',
			success: function(data) {
				var html = template('allJobByCount', data);
				document.getElementById('item2mobile').innerHTML = html;
			},
			error: function(timeout,xhr,type) {
				mui.openWindow({
					url : 'error.html',
					id  : 'error.html'
				})
			}
		})
	}
}
//获取所有高信用度发布者兼职信息，并按照进行排序（先显示后面发布的，后查看先发布的）
function attrRestJob() {
	
	if (fkSchoolId != null && fkSchoolId != "") {
		mui.ajax({
			url: service_url+'plur/selectPlurSchoolBycredit',
			type: 'post',
			timeout : 10000,
			data: {
				fkSchoolId: fkSchoolId
			},
			dataType: 'json',
			success: function(data) {
				var html = template('allJobByCredit', data);
				document.getElementById('item3mobile').innerHTML = html;
			},
			error: function(timeout,xhr,type) {
				mui.openWindow({
					url : 'error.html',
					id  : 'error.html'
				})
			}
		})
	}
}

