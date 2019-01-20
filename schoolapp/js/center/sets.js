var service_url = "http://192.168.0.104/";
var user = "";
var id = "";
mui.plusReady(function() {
   toBefore("../../zmain/centero.html");
	var user = "";
	var schoolname = "";
	var phoneno = localStorage.getItem('phone');
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
					mui.alert("设置获取用户失败");
				} else {
					user = data.tuser;
					schoolname = data.scms.msg;
				}
			}
		})
	}
	if (user != "" && user != null) {
		id = user.id;
		if (user.avatar != null) {
			mui("#userImg")[0].src = user.avatar;
		} else {
			mui("#userImg")[0].src = "../../../image/percenter/imgno.png";
		}
		if (user.nickname != null) {
			mui("#my_nickname")[0].innerHTML = user.nickname;
		}
		if (user.sex != null) {
			mui("#my_sex")[0].innerHTML = user.sex;
		}
		if (user.brithday != null) {
			mui("#my_brithday")[0].innerHTML = user.brithday;
		}
		if (user.address != null) {
			mui("#my_address")[0].innerHTML = user.address;
		}

		if (user.truename != null) {
			mui("#my_idcard")[0].innerHTML = user.idcard;
		} else {
			open('idcard', "controllchild/idcard.html");
		}
		mui("#my_tel")[0].innerHTML = user.phoneno;
	}
	if (schoolname != null && "" != schoolname) {
		mui("#my_school")[0].innerHTML = schoolname;
	}

	open('pass', "controllchild/upassword.html");
	open('address', "controllchild/address.html");
	open('tels', "controllchild/tels.html");
	open('school', "controllchild/school.html");
	document.getElementById("nickname").addEventListener('tap', function() {
		var mynickname = mui("#my_nickname")[0].innerHTML;
		var btnArray = ['取消', '确定'];
		mui.prompt('请输入您的新昵称？', mynickname, " ", new Array('取消', '确定'), function(e) {
			if (e.index == 1) {
				if (e.value != null || "" != e.value) {
					mui.ajax({
						url: service_url+'touser/updateUser',
						type: 'post',
						dataType: 'json',
						data: {
							id: id,
							nickname: e.value
						},
						success: function(data) {
							mui("#my_nickname")[0].innerHTML = e.value;
						}
					})
				}
			} else {
				mui.toast('您取消了输入');
			}
		}, 'div');
	})
	document.getElementById('idcard').addEventListener('tap', function() {
		var card = mui("#my_idcard")[0].innerHTML;
		if (card != "验证") {
			mui.alert("您已经实名认证了");
		}
	});
	document.getElementById('sexs').addEventListener('tap', function() {
		var sex = mui("#my_sex")[0].innerHTML
		if (sex == "未设置") {
			mui.alert("请进行身份认证!");
		}else{
			mui.toast('请去身份认证修改');
		}
	});
	document.getElementById('brithdays').addEventListener('tap', function() {
		var brithday = mui("#my_brithday")[0].innerHTML
		if (brithday == "未设置") {
			mui.alert("请进行身份认证!");
		}
	});
	
	document.getElementById('loginout').addEventListener('tap', function() {
		var btnArray = ['取消', '确定'];
		mui.confirm('是否退出我的校园，确认？', '我的校园', btnArray, function(e) {
			if (e.index == 1) {
				localStorage.removeItem('phone');
				localStorage.removeItem('tuser');
				plus.webview.create('../../zmain/first.html').show();
			} else {
				mui.toast("欢迎回来");
			}
		})
	})
})
