var service_url = "http://192.168.0.101/";
var user = JSON.parse(localStorage.getItem('tuser'));
var fkPublisher = "";
var phoneno = "";
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
	toPage("#publisherPlur", '../parttime/relDetails/detailsWork.html');
	open("firstp", 'first.html');
	open("parttp", 'part.html');
	open("jobtp", 'job.html');
	open("centertp", 'centero.html');
	open("newcreate", '../parttime/newParttime.html');
	open("gojob", '../parttime/goParttime.html');
	open("endjob", '../parttime/endParttime.html');
});

