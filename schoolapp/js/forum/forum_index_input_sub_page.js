var service_url = "http://172.19.129.6:86/"
var count = 0 //查询过点两次 没查询点一次
mui.plusReady(function() {
	//查询下有没有搜索记录
	var history = localStorage.getItem('history')
	var render = template('temp', JSON.parse(history))
	//console.log(history)
	document.getElementById('history').innerHTML = render

})
//返回
document.getElementById('input_clear').addEventListener('tap', function() {
	if(count >= 1) {
		document.getElementById('center').style.display = "none"
		document.getElementById('content').style.display = 'none'
		document.getElementById('history-content').style.display = 'block'
		document.getElementById('input_clear').classList.add("mui-action-back")
	}
})
//获取光标
document.getElementById('input').addEventListener('tap', function() {
	document.getElementById('input').focus()
})
//搜索
var json //新的json
var b = false //自动触发搜索
var start = 0
var end = 0
var value
document.getElementById('input').addEventListener('keydown', function(event) {
	value = document.getElementById('input').value
	//提交搜索
	if(event.keyCode == 13 || b) {

		var data = {
			"name": [{
				"title": value
			}]
		}

		var da = {
			"title": value
		}
		//如果是来自 历史记录就不追加 和 不添加到localStorage
		if(!b) {
			var history = localStorage.getItem('history') //旧的值
			//console.log(history)
			var obj = JSON.parse(history)
			if(history != null) {
				json = JSONcomposeString(obj, da) //如果有值 就拼接
			} else {
				json = JSON.stringify(data)
			}
			localStorage.setItem('history', json)
			//追加历史记录
			var table = document.getElementById('history')
			var ul = document.createElement('ul')
			ul.className = "mui-table-view"
			var li = '<li class="mui-table-view-cell ">'
			li += '<span class="mui-icon mui-icon-refresh"></span>'
			li += '<label>' + value + '</label>'
			li += '<a name="' + value + '" class="mui-pull-right mui-icon mui-icon-closeempty"> </a>'
			li += '</li>'
			ul.innerHTML = li
			table.appendChild(ul)

		}

		document.getElementById('history-content').style.display = 'none'
		mui.ajax({
			url: service_url + 'forum/article/like',
			data: {
				title: value,
				start: 0,
				end: 10
			},
			dataType: 'json',
			type: 'post',
			success: function(data, su, http) {
				count++
				var rander = template('contentTemp', data)
				document.getElementById('content').innerHTML = rander
				document.getElementById('input').value = value
				document.getElementById('input_clear').classList.remove("mui-action-back")
				//显示内容框
				document.getElementById('content').style.display = 'block'
				if(data.farticle.length != 0) {
					start = data.farticle.length
					end = start + 3
					mui('#content').pullRefresh().enablePullupToRefresh();
				} else {
					document.getElementById('center').style.display = "block"
					mui('#content').pullRefresh().endPullupToRefresh(true)
				}
			},
			error: function(http, er) {
				errorAJAX(http)
			}
		})

	}
})
//josn拼接
function JSONcomposeString(json1, json2) {
	var json1 = JSON.stringify(json1)
	var json2 = JSON.stringify(json2)
	var newsJSON
	if(json1.length <= 11) {
		newsJSON = json1.substring(0, json1.length - 2)
	} else {
		newsJSON = json1.substring(0, json1.length - 2) + ","
	}
	newsJSON = newsJSON + json2 + "]}"
	return newsJSON
}

//监听删除
mui('#history').on('tap', 'ul>li>a', function() {
	var name = this.getAttribute('name') //值
	var item = localStorage.getItem('history')
	var obj = JSON.parse(item)

	for(var i = 0; i <= obj.name.length - 1; i++) {
		if(name == obj.name[i].title) {
			obj.name.splice(i, 1)
			localStorage.setItem('history', JSON.stringify(obj))
		}
	}
	this.parentNode.parentNode.style.display = 'none'
})
//监听点击历史记录搜索
mui('#history').on('tap', 'ul>li>label', function() {
	var name = this.innerText
	var input = document.getElementById('input')
	input.value = name
	b = true
	mui.trigger(input, 'keydown')
})
//监听 li
mui('#content').on('tap', 'li', function() {
	var article_id = this.getAttribute("name")
	var pageTo = plus.webview.getWebviewById('forum_article_main_content.html')
	mui.fire(pageTo, 'listener_aritcle_id', {
		article_id: article_id
	})
	mui.openWindow({
		id: 'forum_article_main_content.html'
	})
})

function pullupfresh() {
	mui.toast("正在加载", 200)
	mui.ajax({
		url: service_url + 'forum/article/like',
		data: {
			title: value,
			start: start,
			end: end
		},
		type: 'post',
		dataType: 'json',
		success: function(data, su, http) {

			if(data != null && data.farticle != null && data.farticle.length != 0) {
				var table = document.getElementById('content')
				for(var i = 0; i <= data.farticle.length - 1; i++) {
					var ul = document.createElement('ul')
					ul.className = 'mui-table-view'
					var li = '<li name="' + data.farticle[i].id + '" class="mui-table-view-cell mui-media">'
					li += '<div class="mui-media-body">'
					li += '<h4>' + data.farticle[i].title + '</h4>'
					li += '<p class="mui-ellipsis">' + data.farticle[i].contentDescribe + '</p>'
					li += '<p class="mui-ellipsis "><span>'
					li += '<img class="difination-img-radius" src="' + data.farticle[i].fkUserKey.avatar + '"/>'
					li += '</span><span class="difination-span-left">' + data.farticle[i].fkUserKey.nickname + '</span>'
					li += '<span class="difination-span-left">' + data.farticle[i].createTime + '</span>'
					li += '<span class=" mui-icon mui-icon-chatbubble difination-left-7px">' + data.farticle[i].browseConut + '</span>'
					li += '</p></div></li>'
					ul.innerHTML = li
					table.appendChild(ul)
				}

				mui.toast("加载" + data.farticle.length + "条数据", 500)
			} else {
				mui('#content').pullRefresh().disablePullupToRefresh();
				mui.toast("没有更多数据", 200)
			}
			mui('#content').pullRefresh().endPullup();

		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})

}

function errorAJAX(http) {
	mui('#content').pullRefresh().endPullup();
	if(http.status == 404) {
		mui.alert('找不到网页', ' ', '确认', 'div')
	} else if(http.status == 500) {
		mui.alert('数据异常', ' ', '确认', 'div')
	} else if(http.timeout) {
		mui.alert('网络环境不好', ' ', '确认', 'div')
	}

}