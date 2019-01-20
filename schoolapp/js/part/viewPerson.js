var service_url = "http://192.168.0.101/";
var personCount = 0;
var persons = 0;
var pkPlurid = "";
var list = new Array();
mui.plusReady(function() {
	window.addEventListener('toSign', function(ef) {
		var signstate = ef.detail.signstate;
		pkPlurid = ef.detail.pkPlurid;
		persons = ef.detail.persons;
		mui.ajax({
			url: service_url+'sign/getSignupAll',
			type: 'post',
			timeout: 10000,
			async: false,
			data: {
				pkPlurid: pkPlurid,
				signstate: signstate
			},
			dataType: 'json',
			success: function(data) {
				var html = template('thisign', data);
				document.getElementById('signUser').innerHTML = html;
			},
			error: function(xhr, type, errorThrown) {
				
			}
		})
	})
	document.getElementById('updateSignstate').addEventListener('tap', function() {
		var btnArray = ['取消', '确定'];
		if (0 == personCount) {
			mui.alert("您没有选择工作人员");
		} else if (personCount > 0 && personCount < persons) {
			mui.confirm('工作人员尚未满员，是否进行该工作？', '岗位接取', btnArray, function(e) {
				if (e.index == 1) {
					mui.ajax({
						url: service_url+'sign/updateSigns',
						type: 'post',
						data: {
							pkPlurid: pkPlurid,
							list: list
						},
						timeout: 10000,
						dataType: 'json',
						success: function(data) {
							if (data.mss.status == true) {
								mui.alert("提交成功")
							} else {
								mui.alert("提交失败")
							}
							mui.openWindow({
								url: '../../goParttime.html',
								id: '../../goParttime.html',
								createNew: true,
								waiting: {
									autoShow: true,
									titile: '正在加载...'
								}
							})
						},
						error: function(timeout, xhr, type, errorThrown) {
							mui.openWindow({
								url : '../../error.html',
								id  : '../../error.html'
							})
						}
					})
				}
			})
		} else {
			mui.confirm('工作人员满员，是否进行该工作？', '岗位接取', btnArray, function(e) {
				if (e.index == 1) {
					mui.ajax({
						url: service_url+'sign/updateSigns',
						type: 'post',
						data: {
							pkPlurid: pkPlurid,
							"list": list
						},
						timeout: 10000,
						dataType: 'json',
						success: function(data) {
							if (data.mss.status == true) {
								mui.alert("提交成功")
							} else {
								mui.alert("提交失败")
							}
							mui.openWindow({
								url: '../../goParttime.html',
								id: '../../goParttime.html',
								createNew: true,
								waiting: {
									autoShow: true,
									titile: '正在加载...'
								}
							})
						},
						error: function(timeout, xhr, type, errorThrown) {
							mui.openWindow({
								url : '../../error.html',
								id  : '../../error.html'
							})
						}
					})
				}
			})
		}
	})
	
	
	mui("#signUser").on('tap', 'li', function() {
		var pkUid = this.getAttribute('id');
		var truename = this.getAttribute('name');
		var btnArray = ['取消', '确定'];
		var thisclass = this;
		if (personCount <= (persons - 1)) {
			mui.confirm('是否确认，由' + truename + '接取该工作？', '岗位接取', btnArray, function(e) {
				list.push(pkUid);
				if (e.index == 1) {
					thisclass.style.display = "none";
					personCount++;
					mui("#counts")[0].innerText = personCount;
				} else {
					mui("#counts")[0].innerText = personCount;
				}
			})
		} else {
			mui.alert("您的需求人员已经满员");
		}
	})
	
})
