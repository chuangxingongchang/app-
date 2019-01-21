var service_url = "http://172.19.129.6/";
var pkPlurid;
mui.plusReady(function() {
	window.addEventListener('topayWage', function(ew) {
		var signstate = ew.detail.signstate;
		pkPlurid = ew.detail.pkPlurid;
		mui.ajax({
			url: service_url+'sign/signupEnd',
			type: 'post',
			timeout : 10000,
			async   : false,
			data: {
				pkPlurid: pkPlurid,
				signstate: signstate
			},
			dataType: 'json',
			success: function(data) {
				mui("#moneyno")[0].innerHTML = data.mm.data;
				var html = template('thisign', data);
				document.getElementById('signUser').innerHTML = html;
			},
			error: function(xhr, type, errorThrown) {
				console.log(type)
			}
		})
	})
	document.getElementById('topays').addEventListener('tap', function() {
		var summoney = mui("#moneyno")[0].innerText;
		var btnArray = ['取消', '确定'];
		mui.confirm("是否确认支付" + summoney + "元？", '', btnArray, function(e) {
			if (e.index == 1) {
				mui.ajax({
					url: service_url+'sign/updateUserMoney',
					type: 'post',
					data: {
						pkPlurid: pkPlurid,
						summoney: summoney
					},
					timeout: 10000,
					dataType: 'json',
					success: function(data) {
						if (data.upMoney.status == false) {
							mui.alert(data.upMoney.msg);
						} else {
							mui.alert("支付成功");
							mui.openWindow({
								url: '../../../zmain/part.html',
								id: '../../../zmain/part.html'
							})
						}
					}
				})
			} else {
				mui.toast("支付失败");
			}
		})
	})
	
})
