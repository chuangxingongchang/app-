var service_url = "http://192.168.0.101/";
var user = JSON.parse(localStorage.getItem('tuser'));
var code = "";
var phoneno = "";
mui.plusReady(function() {
	document.getElementById("sends").addEventListener("tap", function() {
		phoneno = mui("#phoneno")[0].value;
		var phReg = /^1(3|4|5|7|8)\d{9}$/;
		if (phReg.test(phoneno)) {
			mui.ajax({
				type: "post",
				url: service_url + "touser/mycodetoRegister",
				data: {
					phoneno: mui("#phoneno")[0].value
				},
				dataType: "json",
				success: function(data) {
					if (!data.mgs.status) {
						mui.toast(data.mgs.msg);
					} else {
						mui.toast("发送成功")
						code = data.mgs.data;
					}
				}
			})
		} else {
			mui.toast("输入电话号码错误");
		}
	});

	document.getElementById("complete").addEventListener('tap', function() {
		var codes = mui("#codes")[0].value;
		if (!code || "" == code) {
			mui.toast("请获取验证码");
		} else {
			if (!codes || "" == codes) {
				mui.toast("请输入验证码");
			} else {
				if (code != codes) {
					mui.alert("验证码输入错误");
				} else {
					mui.ajax({
						url: service_url + 'touser/updateUser',
						type: 'post',
						dataType: 'json',
						data: {
							id: user.id,
							phoneno: phoneno
						},
						success: function(data) {
							if (data.ms.status == true) {
								localStorage.removeItem('phone');
								localStorage.setItem('phone', phoneno);
								mui.openWindow({
									url: '../sets.html',
									id: '../sets.html',
									createNew: true,
									waiting: {
										autoShow: true,
										titile: '正在加载...'
									}
								});
							} else {
								mui.toast(data.ms.msg);
							}
						}
					})
				}
			}
		}
	})

})
