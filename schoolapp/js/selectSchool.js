var schoolname = "";
mui.ready(function() {
	var header = document.querySelector('header.mui-bar');
	var list = document.getElementById('list');
	var done = document.getElementById('dones');
	//calc hieght
	list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
	//create
	window.indexedList = new mui.IndexedList(list);
	mui('.mui-input-group').on('tap','li',function(){
		schoolname = this.innerText;
	})
	done.addEventListener('tap', function() {
		var btnArray = ['取消', '确定'];
		mui.confirm("是否确认选择学校:"+schoolname+"？", '', btnArray, function(e) {
			if (e.index == 1) {
				localStorage.setItem('schoolname',schoolname);
				mui.openWindow({
					url : 'first.html',
					id  : 'first.html'
				})
			} else {
				mui.toast("您没有选择");
			}
		})
	});
})
