/*
 模拟用户登录
 * */
var service_url = "http://172.19.129.6/"
var user = JSON.parse(localStorage.getItem("tuser"))
/*第一次初始化*/

mui.plusReady(function() {
	//获取类型
	var personalPage = mui.preload({ 
		url : 'forum_personal.html',
		id : 'forum_personal.html'
	})
	mui.ajax({
		url: service_url + 'type/all',
		dataTyep: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data, su, http) {
			if(su == 'success' && http.readyState == 4 && http.status == 200) {
				var render = template("type_template", data)
				document.getElementById('type_template_body').innerHTML = render
			}
		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})

})
/*---------------------------init------end--------------------------------------*/
//个人中心
document.getElementById('personal').addEventListener('tap', function() {
	var pageTo = plus.webview.getWebviewById('forum_personal.html')
	mui.fire(pageTo, 'listener_personal_id', {
		user_id: user.id
	})
	mui.openWindow({
		id: "forum_personal.html",
		show:{
	      autoShow:true,//页面loaded事件发生后自动显示，默认为true
	      duration:200//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
	    },
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在加载...' //等待对话框上显示的提示内容
		}

	})
	/*---------------------------user-------------end---------------------------------------------------------------*/

	//显示搜索栏
	document.getElementById('input_block').addEventListener('tap', function(e) {
		mui.openWindow({
			url: 'forum_index_input_sub_page.html',
			id: 'forum_index_input_sub_page.html'
		})
	})
	/*---------------------input-------end-------------------------------------------*/
	//监听类型 ——
	mui('#type_template_body').on('tap', 'a', function() {
		var ftype_id = this.getAttribute('name')
		var pageTo = plus.webview.getWebviewById('forum_index_content_subPage.html')
		mui.fire(pageTo, 'listen_ftype_id', {
			ftype_id: ftype_id
		})
		try {
			mui.openWindow({
				url: 'forum_index_content_subPage.html',
				id: 'forum_index_content_subPage.html',
				styles: {
					top: '145px',
					bottom: '100px'
				},
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				show: { //加入show 返回键就不会返回到上次加载的页面  要的就是这个效果
					autoShow: trye, //页面loaded事件发生后自动显示，默认为true
					aniShow: 'none', //页面显示动画，默认为”slide-in-right“；
					duration: 100 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在加载...', //等待对话框上显示的提示内容
					options: {
						width: waiting - dialog - widht, //等待框背景区域宽度，默认根据内容自动计算合适宽度
						height: waiting - dialog - height, //等待框背景区域高度，默认根据内容自动计算合适高度
					}
				}
			})
		} catch(e) {}

	})
})