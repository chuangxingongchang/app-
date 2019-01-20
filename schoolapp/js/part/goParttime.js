
var service_url = "http://192.168.0.101/";
var user = JSON.parse(localStorage.getItem('tuser'));
var fkPublishers = "";
if (user != null) {
	fkPublishers = user.id;
}
mui.plusReady(function() {
	if (fkPublishers != null && "" != fkPublishers) {
		mui.ajax({
			url: service_url+'plur/publisher',
			type: 'post',
			async: false,
			data: {
				fkPublisher: fkPublishers
			},
			dataType: 'json',
			success: function(data) {
				var html = template("pubsher", data);
				document.getElementById('publisherPlur').innerHTML = html;
			}
		})
	}

	toPage("#publisherPlur", 'relDetails/detailsGo.html');
})
