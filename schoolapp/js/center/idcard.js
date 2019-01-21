// 			var now = new Date();
// 			//格式化日，如果小于9，前面补0
// 			var day = ("0" + now.getDate()).slice(-2);
// 			//格式化月，如果小于9，前面补0
// 			var month = ("0" + (now.getMonth() + 1)).slice(-2);
// 			//拼装完整日期格式
// 			var today = now.getFullYear() + "-" + (month) + "-" + (day);
// 			//完成赋值
var service_url = "http://172.19.129.6/";
mui.plusReady(function() {
	addsexPicker();
});
//结算类型
function addsexPicker() {
	var attsex = new mui.PopPicker();
	attsex.setData([{
		value: "1",
		text: '男'
	}, {
		value: "2",
		text: '女'
	}]);
	var attsexs = document.getElementById('mysexs');
	var sexResult = document.getElementById('sex');
	attsexs.addEventListener('tap', function(event) {
		attsex.show(function(items) {
			sexResult.value = items[0].text;
		});
	}, false);
}
document.getElementById("mydate").addEventListener('tap', function() {
	var dDate = new Date();
	var minDate = new Date();
	minDate.setFullYear(1970, 2, 1);
	var maxDate = new Date();
	plus.nativeUI.pickDate(function(e) {
		var d = e.date;
		mui("#date")[0].value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	}, function(e) {
		mui.toast("您没有选择日期");
	}, {
		title: "请选择日期",
		date: dDate,
		minDate: minDate,
		maxDate: maxDate
	});
})
document.getElementById("complete").addEventListener('tap', function() {
	var sex = mui("#sex")[0].value;
	var brithday = mui('#date')[0].value;
	var truename = mui("#truename")[0].value;
	var idcard = mui("#idcard")[0].value;
	var user = JSON.parse(localStorage.getItem('tuser'));
	//姓名正则表达式
	var truenameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
	//身份证正则表达式
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
	var idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (!sex || "" == sex) {
		mui.toast("您没有选择性别");
	} else {
		if (!brithday || "" == brithday) {
			mui.toast("您没有设置出生日期");
		} else {
			if (truenameReg.test(truename)) {
				if (idcardReg.test(idcard)) {
					mui.ajax({
						url: service_url+'touser/updateUser',
						type: 'post',
						dataType: 'json',
						data: {
							id: user.id,
							truename: truename,
							idcard: idcard,
							sex: sex,
							brithday: brithday
						},
						success: function(data) {
							if (data.ms.status == true) {
								mui.openWindow({
									url: '../sets.html',
									id: '../sets.html'
								});
							} else {
								alert(data.ms.msg);
							}
						}
					})
				} else {
					mui.alert("身份证号输入错误");
				}
			} else {
				mui.alert("姓名输入有误");
			}
		}
	}
})
