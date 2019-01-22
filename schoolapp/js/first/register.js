var codes = "";
var service_url = "http://192.168.43.4/";
var code    = "";
var phoneno = "";
var pwReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,20}$/;
var phReg = /^1(3|4|5|7|8)\d{9}$/;
mui.plusReady(function(){
	document.getElementById("sends").addEventListener("tap", function() {
		phoneno = mui("#phoneno")[0].value;
		if(phoneno!=null&&""!=phoneno){
			if(phReg.test(phoneno)){
				mui.ajax({
					type: "post",
					url: service_url + "touser/mycodetoRegister",
					data: {
						phoneno: mui("#phoneno")[0].value
					},
					dataType: "json",
					success: function(data) {
						if (!data.mgs.status) {
							mui.alert(data.mgs.msg)
						} else {
							mui.toast("验证码发送成功")
							codes = data.mgs.data;
						}
					}
				})
			}else{
				mui.toast("您输入手机号码错误")
			}
		}else{
			mui.toast("您没有输入手机号")
		}
	});
	document.getElementById("register").addEventListener("tap", function() {
		addKeyEvent();
	});
})


function addKeyEvent() {
	phoneno = mui("#phoneno")[0].value;
	code      = mui("#codes")[0].value;
	var pword = mui("#password")[0].value;
	if (phoneno != null && phReg.test(phoneno)) {
		if (code != null && code != "") {
			if (codes == code) {
				if (pword != null) {
					if (pwReg.test(pword)) {
						mui.ajax({
							url: service_url + "touser/registers",
							type: 'post',
							dataType: 'json',
							data: {
								phoneno: mui("#phoneno")[0].value,
								code: mui("#codes")[0].value,
								pword: mui("#password")[0].value
							},
							success: function(data) {
								if (!data.mss.status) {
									mui.alert(data.mss.msg);
								} else {
									mui.openWindow({
										url: 'login.html',
										id: 'login.html'
									})
								}
							}
						})
					}else {
					mui.toast("密码输入不符合")
				  }
					
				} else {
					mui.toast("密码不能为空或输入有误")
				}
			} else {
				mui.toast("验证码输入有误");
			}
		} else {
			mui.toast("请输入验证码")
		}
	} else {
		mui.toast("电话号码为空或输入有误")
	}
}
