var service_url = "http://172.19.129.6/";
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
