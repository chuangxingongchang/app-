var service_url = "http://172.19.129.6/"
var tuser = { //模拟用户登录
	"id": '1',
	"uname": 'xitao'
}
tuser = JSON.stringify(tuser)
localStorage.setItem('tuser', tuser)
var user = JSON.parse(localStorage.getItem("tuser"))
mui.plusReady(function() {

})
var u_id
window.addEventListener('listener_personal_sign', function(event) {
	u_id = event.detail.u_id
	mui.ajax({
		url: service_url + 'sign/meSign',
		data: {
			userId: u_id
		},
		dataType: 'json',
		type: 'post',
		success: function(data, su, http) {
			if(data != null && data.articleAllSign != null && data.articleAllSign.length != 0) {
				var rander = template('temp', data)
				document.getElementById('main').innerHTML = rander
			}
		},
		erro: function(http) {
			errorAJAX(http)
		}

	})
})
/*---------------------自定义 监听事件-----end---------------------------------------*/
//文章
mui('#main').on('tap', 'ul>li>content>div>coen', function() {
	var article_id = this.getAttribute('name')
	open('forum_article_main_content.html', 'listener_aritcle_id', {
		article_id: article_id
	})
})
//个人用户信息
mui('#main').on('tap', 'ul>li>content>div>p>span>a', function() {
	open('forum_personal.html', 'listener_personal_id', {
		userId: user.id
	})
})

function open(id, name, data) {
	console.log(id + ',' + name + ',' + data)
	var pageTo = plus.webview.getWebviewById(id)
	mui.fire(pageTo, name, data)
	mui.openWindow({
		id: id
	})
}

function errorAJAX(http) {
	if(http.status == 404) {
		mui.alert('找不到网页', ' ', '确认', 'div')
	} else if(http.status == 500) {
		mui.alert('数据异常', ' ', '确认', 'div')
	} else if(http.timeout) {
		mui.alert('网络环境不好', ' ', '确认', 'div')
	}

}