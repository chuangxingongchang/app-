var service_url = "106.13.35.57/myschool/";
var user = JSON.parse(localStorage.getItem('tuser'));
var fkPus = "";
if (user != null) {
	fkPus = user.id;
}
mui.plusReady(function() {
	toBefore("../zmain/part.html");
	if (fkPus!=null && fkPus != "") {
		mui.ajax({
			url: service_url+'plur/publisher',
			type: 'post',
			data: {
				fkPublisher: fkPus
			},
			dataType: 'json',
			success: function(data) {
				var html = template("pubsher", data);
				document.getElementById('publisherPlur').innerHTML = html;
			}
		})
	}
	toPage("#publisherPlur", 'relDetails/detailsEnd.html');
})
