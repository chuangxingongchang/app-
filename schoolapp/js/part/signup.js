var service_url = "http://192.168.0.101/";
var user = JSON.parse(localStorage.getItem('tuser'));
var fkPublisher = "";
mui.plusReady(function() {
	if (user != null) {
		fkPublisher = user.id;
	}
	if (!fkPublisher || fkPublisher == "") {
		mui.toast("请登录")
	} else {
		mui.ajax({
			url: service_url+'plur/publisher',
			type: 'post',
			async: false,
			timeout: 10000,
			data: {
				fkPublisher: fkPublisher
			},
			dataType: 'json',
			success: function(data) {
				var html = template("pubsher", data);
				document.getElementById('publisherPlur').innerHTML = html;
			},error : function(timeout,xhr,type){
				mui.openWindow({
					url : 'error.html',
					id  : 'error.html'
				})
			}
		})
	}
	toPage("#publisherPlur", 'relDetails/detailsWork.html');
})
