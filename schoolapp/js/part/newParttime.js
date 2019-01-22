var service_url = "http://192.168.43.4/";
var workType = "";
var workId = 0;
var startDate = "";
var endDate = "";
var deadline = "";
var persono = "";
var pay = "";
var moneyday = "";
var moneyid = 0;
var settles = "";
var settleid = 0;
var timetype = "";
var timeid = 0;
var contents = "";
var addr = "";
var id = 0;
var school = 0;
var user = "";
var arr = new Array();
mui.plusReady(function() {
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
					mui.alert("main获取用户失败");
				} else {
					user = data.tuser;
				}
			}
		})
	}
	mui("#thisUser")[0].value = user.truename;
	mui("#thisPhone")[0].value = user.phoneno;
	addtimePicker();
	addunitPicker();
	addsettlePicker();
	addworkPicker();
	document.getElementById('startdate').addEventListener('tap', function() {
		var dDate = new Date();
		var minDate = new Date();
		plus.nativeUI.pickDate(function(e) {
			var d = e.date;
			arr[0] = d.getFullYear();
			arr[1] = (d.getMonth() + 1);
			arr[2] = d.getDate();
			mui("#startdate")[0].value = (d.getMonth() + 1) + "/" + d.getDate();
		}, function(e) {
			mui.toast("您没有选择日期");
		}, {
			title: "请选择日期",
			date: dDate,
			minDate: minDate
		});
	
	})
	document.getElementById('enddate').addEventListener('tap', function() {
		if (arr.length > 0) {
			var dDate = new Date();
			var minDate = new Date();
			minDate.setFullYear(arr[0], arr[1] - 1, arr[2]);
			plus.nativeUI.pickDate(function(e) {
				var d = e.date;
				mui("#enddate")[0].value = (d.getMonth() + 1) + "/" + d.getDate();
			}, function(e) {
				mui.toast("您没有选择日期");
			}, {
				title: "请选择日期",
				date: dDate,
				minDate: minDate
			});
		} else {
			mui.alert("请选择开始日期");
		}
	
	})
	
	document.getElementById('deadline').addEventListener('tap', function() {
		var dDate = new Date();
		var minDate = new Date();
		plus.nativeUI.pickDate(function(e) {
			var d = e.date;
			mui("#deadline")[0].value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		}, function(e) {
			mui.toast("您没有选择日期");
		}, {
			title: "请选择日期",
			date: dDate,
			minDate: minDate
		});
	})
	document.getElementById('toMypart').addEventListener('tap', function() {
		contents = mui("#theContent")[0].value;
		persono = mui("#persono")[0].value;
		pay = mui("#pays")[0].value;
		addr = mui("#addr")[0].value;
		workType = mui("#worktype")[0].value;
		startDate = mui("#startdate")[0].value;
		endDate = mui("#enddate")[0].value;
		deadline = mui("#deadline")[0].value;
		moneyday = mui("#moneyday")[0].value;
		settles = mui("#settles")[0].value;
		timetype = mui("#timetype")[0].value;
		id = user.id;
		school = user.fkSchoolId;
		var cycletime = startDate + "-" + endDate;
		var title = mui("#newtitle")[0].value;
		var titleReg = /^[\u4e00-\u9fa5\w]{3,20}$/;
		var personReg = /^[1-9]\d*$/;
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = myDate.getMonth() + 1;
		var date = myDate.getDate();
		var now = year + "-" + month + "-" + date;
		if (titleReg.test(title)) {
			if ("" != workType) {
				if ("" != startDate && "" != endDate) {
					if ("" != deadline) {
						if (personReg.test(persono)) {
							if (personReg.test(pay) && moneyday != "" && settles != "" && timetype != "") {
								if ("" != contents) {
									if ("" != addr) {
										mui.ajax({
											url: service_url+"plur/insertPlur",
											type: 'post',
											data: {
												subject: title,
												fkWorktype: workId,
												wordtime: cycletime,
												endtime: deadline,
												persons: persono,
												money: pay,
												fkUnit: moneyid,
												fkSettle: settleid,
												fkTimetype: timeid,
												workcontent: contents,
												workaddress: addr,
												fkPublisher: id,
												fkSchool: school,
												releasetime: now,
												fkWorkstate: 1
											},
											dataType: 'json',
											success: function(data) {
												if (data.ms.status == true) {
													mui.openWindow({
														url: '../zmain/part.html',
														id : '../zmain/part.html',
														createNew: true,
														waiting: {
															autoShow: true,
															titile: '正在加载...'
														}
													})
												} else {
													mui.openWindow({
														url : 'error.html',
														id  : 'error.html'
													})
												}
											},
											error: function(xhr, type, errorThrown) {
												console.log(type);
											}
										})
									} else {
										mui.alert("请输入集合所在地")
									}
								} else {
									mui.alert("工作内容不能为空")
								}
							} else {
								mui.alert("请输入正确的报酬方式")
							}
						} else {
							mui.alert("总人数设置错误");
						}
					} else {
						mui.alert("请选择报名截止日期")
					}
				} else {
					mui.alert("开始时间或结束日期没有选择")
				}
			} else {
				mui.alert("岗位类型不能为空")
			}
		} else {
			mui.alert("您的主题输入有误");
		}
	})
	
})
