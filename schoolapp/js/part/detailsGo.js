var service_url = "http://192.168.0.101/";
var id = "";
mui.plusReady(function() {
	window.addEventListener('myid', function(event) {
		id = event.detail.jobid;
		if (id != null) {
			mui.ajax({
				url: service_url+'plur/getGothisplur',
				type: 'post',
				data: {
					id: id
				},
				dataType: 'json',
				success: function(data) {
					var html = template('thisplur', data);
					document.getElementById('thisJob').innerHTML = html;
				}
			})
		} else {
			mui.openWindow({
				url : '../error.html',
				id  : '../error.html'
			})
		}

	}, false);
	document.getElementById('toEnds').addEventListener('tap', function() {
		var moneyReg = /^([1-9]\d*|[0]{1,1})$/;
		var flag = true;
		var inputs = mui(".mui-badge-blue");
		var signlist = new Array();
		for (var i = 0; i < inputs.length; i++) {
			if (moneyReg.test(inputs[i].value)) {
				signlist.push({
					pkPlurid: id,
					pkUid: inputs[i].name,
					signmoney: inputs[i].value
				});
				flag = true;
			} else {
				flag = false;
			}
		}
		console.log("flag:" + flag)
		if (flag) {
			var btnArray = ['取消', '确定'];
			mui.confirm('是否确认，该工作已经完成？', '岗位进行', btnArray, function(e) {
				if (e.index == 1) {
					mui.ajax({
						url: service_url+'sign/updateGotoEnd',
						type: 'post',
						data: JSON.stringify(signlist),
						timeout: 10000,
						contentType: 'application/json;charset=utf-8',
						dataType: 'json',
						success: function(data) {
							if (data.mes.status == true) {
								mui.openWindow({
									url: '../endParttime.html',
									id: '../endParttime.html'
								})
							} else {
								mui.alert("提交失败");
							}
						},
						error: function(timeout, xhr, type, errorThrown) {
							mui.openWindow({
								url : '../error.html',
								id  : '../error.html'
							})
						}
					})
				} else {}
			})
		} else {
			mui.alert("请输入人员工资");
		}
	})
})

