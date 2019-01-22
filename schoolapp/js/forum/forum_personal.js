var service_url = "http://192.168.43.4/"
var user = JSON.parse(localStorage.getItem("tuser"))
/*第一次初始化*/
mui.plusReady(function() {

})

/*----------------------------init------end-------------------------------------------------------------*/
//窗口监听自定义事件 param u_id
var u_id //作者  
window.addEventListener('listener_personal_id', function(event) {
	document.getElementById('main').style.display='none'
	document.getElementById('article_write').style.display='none'
	document.getElementById('loaded').style.display='block'
	u_id = event.detail.user_id
	mui.ajax({
		url: service_url + 'forum/personalAllInfo',
		data: {
			userId: u_id
		},
		dataType: 'json',
		type: 'post',
		success: function(data, su, http) {
			data = JSONcompose(data, {
				"thisUser": user.id
			})   
			if(http.status == 200 && http.readyState == 4) {
				var rander = template('temp', data)
				document.getElementById('main').innerHTML = rander
				document.getElementById('loaded').style.display='none'
				document.getElementById('main').style.display='block'
				document.getElementById('article_write').style.display='block'
			}
			document.getElementById('article_write').style.display='block'

		},
		error: function(http, er) {
		errorAJAX(http)
		}
	})
})

//写文章 openWindows
document.getElementById('article_write').addEventListener('tap', function() {
	mui.openWindow({
		id: 'forum_write_article.html'
	})
})
/*------------------------write--article--end-----------------------------------*/
//头像 签名 openWindows
mui('#main').on('tap', 'user>ul', function() {
	alert("跳转个人中心")
	/*mui.openWindow({
		url:'',
		id''
	})*/
})
/*--------------------------in----personal----end-----------------------*/
//粉丝-关注
mui('#main').on('tap', 'mind>nav>a', function() {
	//获取点了  是粉丝    是关注
	var name = this.getAttribute('name')
	var pageTo = plus.webview.getWebviewById('forum_personale_mind_fans.html')
	mui.fire(pageTo, 'listener_user_fans_mind', {
		name: name,
		u_id: u_id
	})
	pageTo.show('slide-in-bottom',500)
	
	mui.openWindow({
		id: 'forum_personale_mind_fans.html'
	})
	
})
/*------------------------fans----mind----end--------------------------------------*/
//论坛入口
mui('#main').on('tap', 'article', function() {
	var size = this.getAttribute('name')
	var pageTo = plus.webview.getWebviewById('forum_emit_article.html')
	mui.fire(pageTo, 'listener_user_emit', {
		u_id: u_id,size:size
	})
	mui.openWindow({
		id: 'forum_emit_article.html'
	})
})
/*--------------------article-------end------------------------------------------*/
//sign
mui('#main').on('tap', 'sign', function() {
	var size = this.getAttribute('name')
	var pageTo = plus.webview.getWebviewById('forum_article_sign.html')
	mui.fire(pageTo, 'listener_personal_sign', {
		u_id: user.id,size:size
	})
	mui.openWindow({
		id: 'forum_article_sign.html'
	})

})
/*------------------sign------end--------------------------*/
//最新动态
mui('#main').on('tap','hot>ul',function(){
	var article_id = this.getAttribute('name')
	var pageTo = plus.webview.getWebviewById('forum_article_main_content.html')
	mui.fire(pageTo,'listener_aritcle_id',{article_id:article_id})
	mui.openWindow({
		id:'forum_article_main_content.html'
	})
})

