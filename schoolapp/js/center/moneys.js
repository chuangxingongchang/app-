var service_url = "http://192.168.0.101/";
var balance = 0;
mui.plusReady(function() {
	var user = JSON.parse(localStorage.getItem('tuser'));
	if (user != null) {
		balance = user.balance;
	}
	if (balance != null) {
		mui("#my_moneys")[0].innerHTML = balance + "元";
	}
})
