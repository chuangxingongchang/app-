var service_url = "106.13.35.57/myschool/";
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
