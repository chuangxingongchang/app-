var service_url = "http://172.19.129.6/";
mui.plusReady(function() {
	addressInit('cmbProvince', 'cmbCity', 'cmbArea');
	document.getElementById("complete").addEventListener('tap', function() {
		var schoolcity = mui("#cmbProvince")[0].value;
		var school = mui("#cmbArea")[0].value;
		var user = JSON.parse(localStorage.getItem('tuser'));
		var id = "";
		if (user != null) {
			id = user.id
		}
		if (school != null && school != "") {
			if (id != null && "" != id) {
				mui.ajax({
					url: service_url + 'school/updateMyschool',
					type: 'post',
					dataType: 'json',
					data: {
						id: user.id,
						schoolname: school,
						schoolcity: schoolcity
					},
					success: function(data) {
						if (data.ms.status == true) {
							localStorage.removeItem('schoolname');
							localStorage.setItem('schoolname',school);
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
							alert(data.ms.msg);
						}
					}
				})
			}
		} else {
			mui.alert("输入学校错误");
		}
	})
})
