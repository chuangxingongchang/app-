var service_url = "http://192.168.43.4/";
var id = "";
mui.plusReady(function() {
	window.addEventListener('myid', function(event) {
	    id = event.detail.jobid;
		var uid = event.detail.uid;
		if (id != null) {
			mui.ajax({
				url: service_url+'plur/getThisPlur',
				type: 'post',
				async : false,
				data: {
					id: id,
					fkPublisher: uid
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
	toBefore('../../zmain/part.html');
	var detailPages = mui.preload({
		url: "workHandle/viewPerson.html",
		id: "workHandle/viewPerson.html"
	});
	document.getElementById('delplur').addEventListener('tap',function(){
		var btnArray = ['取消', '确定'];
		mui.confirm('是否删除该项发布，确认？', '我的校园', btnArray, function(e) {
			if (e.index == 1) {
				mui.ajax({
					url      : service_url +'plur/delthisPlur',
					type     : 'post',
				    timeout  : 10000,
					data     : {id : id},
					dataType : 'json',
					success  : function(data){
						if(data.delms.status==true){
							mui.openWindow({
								url : '../../zmain/part.html',
								id  : '../../zmain/part.html',
								createNew: true,
								waiting: {
									autoShow: true,
									titile: '正在加载...'
								}
							})
						}else{
							mui.toast("删除失败，请稍后重试")
						}
					},error(xhr,type,errorThrown){
						mui.openWindow({
							url : '../error.html',
							id  : '../error.html'
						})
					}
				})
			} else {
				mui.toast("欢迎回来");
			}
		})
	})
})
