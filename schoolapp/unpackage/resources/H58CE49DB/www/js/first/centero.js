var service_url = "106.13.35.57/myschool/";
var phoneno = localStorage.getItem('phone');
var nickname = "";
var balance = "";
var avatar = "";
var user = "";
var schoolname = "";
mui.plusReady(function() {
	
	if (phoneno != null) {
		mui.ajax({
			url: service_url+'touser/getUser',
			type: 'post',
			async: false,
			data: {
				phoneno,
				phoneno
			},
			dataType: 'json',
			success: function(data) {
				if (data.scms.status == false) {
					mui.toast("设置获取用户失败");
				} else {
					user = data.tuser;
					schoolname = data.scms.msg;
				}
			}
		})
	}
	if (user != null) {
		nickname = user.nickname;
		phoneno = user.phoneno;
		balance = user.balance;
		avatar = user.avatar;
	}
	if (avatar != null && avatar != "") {
		mui("#myImg")[0].src = user.avatar;
	} else {
		mui("#myImg")[0].src = "../../image/percenter/imgno.png";
	}
	if (nickname != null && nickname != "") {
		mui("#my_nickname")[0].innerHTML = user.nickname;
	}
	if (phoneno != null && phoneno != "") {
		mui("#my_account")[0].innerHTML = user.phoneno;
	}
	if (balance != null && balance != "") {
		mui("#my_money")[0].innerHTML = user.balance + "元";
	}
	
	open('sets', "../percenter/controll/sets.html");
	open('moneys', "../percenter/controll/moneys.html");
	open('my_activity', "../h_activity/myActivity.html");
	// open('myMass', "../mass/mass_next/WDST.html");
	open('myWork', "../partjob/myjob.html");
	open("firstp", 'first.html');
	open("parttp", 'part.html');
	open("jobtp", 'job.html');
})
