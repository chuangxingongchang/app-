var service_url = "http://172.19.129.1/"
var leng = 0
var user = JSON.parse(localStorage.getItem("tuser"))
//清除(每次加载 就执行ready查询)
var count = 0
//类型
var type_id = 1
//判断是否 还有数据
var b = true
//数据当前最大时间
var dateTime

mui.plusReady(function() {

	if(count == 0) {
		//查询推荐
		mui.ajax({
			url: service_url + 'forum/singleTypeAll',
			data: {
				id: type_id,
				start: 0,
				end: 20,
				dateTime: "2888-88-88"
			},
			dataType: 'json',
			type: 'post',
			success: function(data, su, http) {
				if(http.readyState == 4 && http.status == 200) {
					if(data.listTypeForumVo.length != 0) {
						dateTime = data.listTypeForumVo[0].createTime
					}
					sessionStorage.setItem('start', data.listTypeForumVo.length)
					sessionStorage.setItem('end', data.listTypeForumVo.length + 6)
					sessionStorage.setItem('type_id', type_id)
					if(data.listTypeForumVo.length < 6) {
						b = false
					}
					var renders = template('templates', data)
					document.getElementById('templates_li').innerHTML = renders
					count++
				}

			},
			error: function(http, er) {
			sessionStorage.clear() //清空
			errorAJAX(http)
			}
				
		})
	}

})
/*------------------------init----end---------------------------------------------*/
/*监听类型数据*/
window.addEventListener('listen_ftype_id', function(event) {
	//获取每次点击的 类型_id
	type_id = event.detail.ftype_id
	//console.log(type_id)
	b = true //重写开发上拉加载
	sessionStorage.clear()
	mui.ajax({
		url: service_url + 'forum/singleTypeAll',
		data: {
			id: type_id,
			start: 0,
			end: 20,
			dateTime: "2888-88-88"
		},
		dataType: 'json',
		type: 'post',
		success: function(data, su, http) {
			if(http.status == 200 && http.readyState == 4) {
				//console.log(data)
				//console.log(data.listTypeForumVo.length)
				//后台返回的是Model对象 Null不能判断
				if(data.listTypeForumVo.length != 0) {
					dateTime = data.listTypeForumVo[0].createTime
					console.log(dateTime)
					sessionStorage.setItem('start', data.listTypeForumVo.length)
					sessionStorage.setItem('end', data.listTypeForumVo.length + 6)
					sessionStorage.setItem('type_id', type_id)
					if(data.listTypeForumVo.length < 6) {
						b = false
					}
				}
				var render = template('templates', data)
				document.getElementById('templates_li').innerHTML = render
			}
		},
		error: function(http, er) {
			sessionStorage.clear()
			errorAJAX(http)
		}
	})
})

/*------------------------------监听类型数据----end-----------------------------------*/
//下拉刷新
function pullDownRefresh() {
	console.log(dateTime)
	mui.ajax({
		url: service_url + 'forum/singleTypeAll',
		dataTyep: 'json',
		type: 'post',
		data: {
			id: type_id,
			start: 0,
			end: 20,
			dateTime: dateTime
		},
		success: function(data, su, http) {
			//console.log(data.listTypeForumVo.length)
			if(data.listTypeForumVo.length != 0) {
				if(http.status == 200 && http.readyState == 4) {
					dateTime = data.listTypeForumVo[0].createTime
					console.log(dateTime)
					addDownData(data);
					//console.log (data.listTypeForumVo.length)
					leng = data.listTypeForumVo.length
				}
				mui.toast("为你推荐了" + leng + "篇文章", 500)
			}

			try {
				mui('#templates_li').pullRefresh().endPulldown()
			} catch(e) {}

			if(data.listTypeForumVo.length == 0) {
				mui.toast("没有最新文章")
			}

		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})
}

//添加数据 down
function addDownData(data) {
	var table = document.body.querySelector('.mui-table-view');
	for(var i = 0; i < data.listTypeForumVo.length; i++) {
		var li = document.createElement('li');
		li.innerHTML =
			'<li class="mui-table-view-cell mui-media">' +
			'<div class="mui-media-body">' +
			'<span>' + data.listTypeForumVo[i].title + '</span>' +
			'<p class="mui-ellipsis">' + data.listTypeForumVo[i].contentDescribe + '</p></div>' +
			'<div class="difination-div-top5px"><p class="mui-ellipsis">' +
			'<img class="difination-img-radius" src="' + data.listTypeForumVo[i].fkUserKey.avatar + '" />' +
			'<span>' + data.listTypeForumVo[i].fkUserKey.nickname + '</span>' +
			'<span class="difination-span-left">' + data.listTypeForumVo[i].createTime + '</span>' +
			'<span class="difination-span-left mui-icon mui-icon-chatbubble difination-span-font">' + data.listTypeForumVo[i].browseConut + '</span>' +
			'<span class="difination-span-left mui-icon mui-icon-chatboxes difination-span-font">' + data.listTypeForumVo[i].commentCount + '</span>' +
			'</p></div></li>'
		table.insertBefore(li, table.firstChild)
	}
}

//上拉加载
function pullUpRefresh() {
	// 每次加载6条 count++（一个屏幕容纳6条）
	var start = sessionStorage.getItem('start')
	var end = sessionStorage.getItem('end')
	//console.log(start + "," + end + "," + type_id)
	if(start != null && end != null && type_id != null) {
		mui.ajax({
			url: service_url + 'forum/singleTypeAll',
			type: 'post',
			dataTyep: 'json',
			data: {
				id: type_id,
				start: start,
				end: end,
				dateTime: "2888-88-88"
			},
			success: function(data, su, http) {
				if(http.status == 200 && http.readyState == 4) {
					if(data.listTypeForumVo.length != 0) {
						sessionStorage.setItem('start', parseInt(start) + data.listTypeForumVo.length)
						sessionStorage.setItem('end', parseInt(end) + data.listTypeForumVo.length)
						sessionStorage.setItem('type_id', type_id)
						addUpData(data);
						leng = data.listTypeForumVo.length
						if(data.listTypeForumVo.length < 6) {
							b = false
						}
						mui.toast("为你推荐了" + leng + "篇文章");
					} else {
						mui.toast("没有更多数据");
					}
				}
				mui('#templates_li').pullRefresh().endPullup();

			},
			error: function(http, er) {
				mui('#templates_li').pullRefresh().endPullup();
				errorAJAX(http)
			}
		})
	} else {
		mui('#templates_li').pullRefresh().endPullup();
		mui.toast("没有更多数据");
	}


}
//up 添加数据
function addUpData(data) {
	var table = document.body.querySelector('.mui-table-view');
	for(var i = 0; i < data.listTypeForumVo.length; i++) {
		//console.log(data.listTypeForumVo[i].fkUserKey.id)  
		var li = document.createElement('li');
		li.innerHTML =
			'<li class="mui-table-view-cell mui-media">' +
			'<label name="'+data.listTypeForumVo[i].id+'">'+
			'<div class="mui-media-body">' +
			'<span>' + data.listTypeForumVo[i].title + '</span>' +
			'<p class="mui-ellipsis">' + data.listTypeForumVo[i].contentDescribe + '</p></div></label>' +
			'<div class="difination-div-top5px"><p class="mui-ellipsis">' +
			'<img class="difination-img-radius" src="' + data.listTypeForumVo[i].fkUserKey.avatar + '" />' +
			'<span>' + data.listTypeForumVo[i].fkUserKey.nickname + '</span>' +
			'<span class="difination-span-left">' + data.listTypeForumVo[i].createTime + '</span>' +
			'<span class="difination-span-left mui-icon mui-icon-chatbubble difination-span-font">' + data.listTypeForumVo[i].browseConut + '</span>' +
			'<span class="difination-span-left mui-icon mui-icon-chatboxes difination-span-font">' + data.listTypeForumVo[i].commentCount + '</span>' +
			'</p></div></li>'
		table.appendChild(li);
	}
}
/*------------------------------上拉----下拉-----加载--------------------------------------*/
//获取每个文章 _id
mui('#templates_li').on('tap', 'label', function() {
	var article_id = this.getAttribute('name')
	//console.log(article_id)
	var pageTo = plus.webview.getWebviewById('forum_article_main_content.html')
	mui.fire(pageTo, 'listener_aritcle_id', {
		article_id: article_id
	})
	mui.openWindow({
		id:'forum_article_main_content.html'
	})

})
//获取每个文章  作者_id
mui('#templates_li').on('tap', 'img', function() {
	var u_id = this.getAttribute('name')
	console.log(u_id)
	var pageTo = plus.webview.getWebviewById('forum_personal.html')
	mui.fire(pageTo, 'listener_personal_id', {
		u_id: u_id
	})
	mui.openWindow({
		id:'forum_personal.html'
	})
})