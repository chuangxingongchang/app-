var service_url = "http://172.19.129.6/";
	mui.plusReady(function() {
		addressInit('cmbProvince', 'cmbCity', 'cmbArea');
		document.getElementById("complete").addEventListener('tap', function() {
			var addressBig  = mui("#cmbProvince")[0].value + mui("#cmbCity")[0].value + mui("#cmbArea")[0].value;
			var detailsAddr = mui("#detailaddress")[0].value;
			var address     = addressBig+detailsAddr;
			var id = "";
			var user = JSON.parse(localStorage.getItem('tuser'));
			if(user!=null){
				id = user.id;
			}
			if (id != null && "" != id) {
				if(detailsAddr != null && "" != detailsAddr){
					if (address != null && "" != address) {
						
						mui.ajax({
							url: service_url + 'touser/updateUser',
							type: 'post',
							dataType: 'json',
							data: {
								id: id,
								address: address
							},
							success: function(data) {
								if (data.ms.status == true) {
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
					
					} else {
						mui.toast("您输入的地址有误");
					}
				}else{
					mui.toast("请输入详细地址")
				}
				
			} else {
				mui.openWindow({
					url: '../error.html',
					id: '../error.html'
				})
			}
		})
	})
