mui.plusReady(function() {
	var _self = plus.webview.currentWebview();
	var group = new webviewGroup(_self.id, {
		items: [{
			id: "../parttime/signup.html",
			url: "../parttime/signup.html",
			extras: {}
		}, {
			id: "../parttime/goParttime.html",
			url: "../parttime/goParttime.html",
			extras: {}
		}, {
			id: "../parttime/endParttime.html",
			url: "../parttime/endParttime.html",
			extras: {}
		}],
		onChange: function(obj) {
			var c = document.querySelector(".mui-control-item.mui-active");
			if (c) {
				c.classList.remove("mui-active");
			}
			var target = document.querySelector(".mui-scroll .mui-control-item:nth-child(" + (parseInt(obj.index) + 1) +
				")");
			target.classList.add("mui-active");
			if (target.scrollIntoView) {
				target.scrollIntoView();
			}
		}
	});
	mui(".mui-scroll").on("tap", ".mui-control-item.ss", function(e) {
		var wid = this.getAttribute("data-wid");
		group.switchTab(wid);
	});
	open("firstp", 'first.html');
	open("parttp", 'part.html');
	open("jobtp", 'job.html');
	open("centertp", 'centero.html');
});

mui.back = function() {
	var _self = plus.webview.currentWebview();
	_self.close("auto");
}
