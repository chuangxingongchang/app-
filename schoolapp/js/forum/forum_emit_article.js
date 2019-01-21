var service_url = "http://172.19.129.1/"
var user = JSON.parse(localStorage.getItem("tuser"))
//第一次初始
mui.plusReady(function() {
	sessionStorage.setItem('swipe', 'left')
})
//返回箭头
document.getElementById('back').addEventListener("tap",function(){
	setTimeout(function(){
		location.reload()
	},500)
})
//作者_id
var u_id
var article_start = 0 //发帖 
var article_end = 0
var comment_start = 0 //回帖
var comment_end = 0
var article_max_time //文章最新时间
var comment_max_time //回复文章最新时间


function winscroll() {
    var top = document.getElementById('nav')
    var top = document.documentElement.scrollTop || document.body.scrollTop;
 
    if (top >= stop) {
        top.className = "fixed";
    } else {
        top.className = "";
    }
}




window.addEventListener('listener_user_emit', function(event) {
	u_id = event.detail.u_id
	/*document.getElementById('loaded').style.display='block'*/
	mui.ajax({
		url: service_url + 'forum/personalAllArticle',
		data: {
			userId: u_id,
			start: 0,
			end: 20
		},
		dataType: 'json',
		type: 'post',
		success: function(data, su, http) {
			if(http.status == 200 && http.readyState == 4) {
				if(data.personalArticle.length!=0) {
					article_start = article_start + data.personalArticle.length
					article_end = article_start + 6
					article_max_time = data.personalArticle[0].createTime
				}else{
			//	document.getElementById('none').style.display='block'
				}
				document.getElementById('loaded').style.display='none'
				var rander = template('article', data)
				document.getElementById('item1').innerHTML = rander
			}

		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})
	//评论过的文章
	mui.ajax({
		url: service_url + 'forum/personalAllComment',
		data: {
			userId: u_id,
			start: 0,
			end: 20
		},
		dataType: 'json',
		type: 'post',
		success: function(data, su, http) {
			if(http.status == 200 && http.readyState == 4) {
				if(data.articleList != null) {
					if(data.articleList.length != 0) {
						comment_max_time = data.articleList[0].createTime
						comment_start = comment_start + data.articleList.length
						comment_end = comment_start + 6
					}
				}
				var rander = template('comment', data)
				document.getElementById('item2').innerHTML = rander

			}

		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})
})

/*----------------------swipe----end------------------------------*/
//刷新
//table.insertBefore(li, table.firstChild);
function pullupfresh() {
	var swipe = sessionStorage.getItem('swipe')
	
	//console.log(swipe)
	if(swipe == 'left') {
		mui.ajax({
			url: service_url + 'forum/personalAllArticle',
			data: {
				userId: u_id,
				start: article_start,
				end: article_end
			},
			type: 'post',
			dataType: 'json',
			success: function(data, su, http) {
				if(http.status == 200 && http.readyState == 4) {
					if(data.personalArticle.length != 0) {
						article_start = article_start + data.personalArticle.length
						article_end = article_start + 6
						
						setTimeout(function(){
							articlePullupDataLoade(data)
						},700)
						mui.toast('加载' + data.personalArticle.length + '条数据', 500)
					} else {
						mui.toast('没有更多数据', 500)
					}
					mui('#content').pullRefresh().endPullup();
				}
			},
			error: function(http, er) {
				errorAJAX(http, er)
			}
		})
		mui('#content').pullRefresh().endPullup();

	} else if(swipe == 'right') {
		console.log(u_id)
		console.log(comment_start)
		console.log(comment_end)
		mui.ajax({
			url: service_url + 'forum/personalAllComment',
			data: {
				userId: u_id,
				start: comment_start,
				end: comment_end
			},
			type: 'post',
			dataType: 'json',
			success: function(data, su, http) {
				if(http.status == 200 && http.readyState == 4) {
					if(data.articleList != null) {
						article_start = article_start + data.articleList.length
						article_end = article_end + data.articleList.length + 6
						setTimeout(function(){
							commentPullupdataLoade(data)
						},700)
						
						mui.toast('加载' + data.articleList.length + '条数据', 500)
					} else {
						mui.toast('你没有最新的', 500)
					}
					mui('#content').pullRefresh().endPullup();
				}
			},
			error: function(http, er) {
				mui('#content').pullRefresh().endPullup();
				errorAJAX(http, er)
			}
		})

	}
}

function pulldownfresh() {
	var swipe = sessionStorage.getItem('swipe')
	//console.log(swipe + ',')
	//我发过的文章下拉
	if(swipe == 'left') {
		mui.ajax({
			url: service_url + 'forum/pulldownFreshArticle',
			data: {
				userId: u_id,
				start: article_start,
				end: article_end,
				createTime: article_max_time
			},
			type: 'post',
			dataType: 'json',
			success: function(data, su, http) {
				if(http.status == 200 && http.readyState == 4) {
					if(data.newsTimePersonalArticle.length != 0) {
						if(data.newsTimePersonalArticle.length != 0) {
							article_start = article_start + data.newsTimePersonalArticle.length
							article_end = article_end + data.newsTimePersonalArticle.length + 6
							articlePulldownDataLoade(data)
							mui.toast('加载' + data.newsTimePersonalArticle.length + '篇文章', 500)
						} else {
							mui.toast('你没有最新的数据', 500)
						}
					} else {
						mui.toast('你没有最新的数据', 500)
					}
					mui('#content').pullRefresh().endPulldown();
				}
			},
			error: function(http, er) {
				mui('#content').pullRefresh().endPulldown();
				errorAJAX(http, er)
			}
		})

	} else if(swipe == 'right') {
		//console.log(u_id + ',' + comment_start + ',' + comment_end + ',' + comment_max_time)
		mui.ajax({
			url: service_url + 'forum/pulldownFreshComment',
			data: {
				userId: u_id,
				start: comment_start,
				end: comment_end,
				createTime: comment_max_time
			},
			type: 'post',
			dataType: 'json',
			success: function(data, su, http) {
				if(http.status == 200 && http.readyState == 4) {
					if(data.articleList != null) {
						article_start = article_start + data.personalArticle.length
						article_end = article_end + data.personalArticle.length + 6
						commentPulldownDataLoade(data)
						mui.toast('加载' + data.personalArticle.length + '篇文章', 500)
					} else {
						mui.toast('你没有最新的数据', 500)
					}
					mui('#content').pullRefresh().endPulldown();
				}
			},
			error: function(http, er) {
				mui('#content').pullRefresh().endPullup();
				errorAJAX(http, er)
			}
		})
	}
}
//发过的文章下拉刷新
function articlePulldownDataLoade(data) {
	var article = document.getElementById('article_id')
	//console.log(data.newsTimePersonalArticle.lenght)
	//console.log(article)
	for(var i = 0; i < data.newsTimePersonalArticle.lenght; i++) {
		var ul = document.createElement('ul')
		ul.className = 'mui-table-view'
		ul.style.borderBottom = '1px solid #6D6D72'
		var li = '<li name="' + data.newsTimePersonalArticle[i].id + '" class="mui-table-view-cell mui-media">'
		li += '<div class="mui-media-body"><b>' + data.newsTimePersonalArticle[i].title + '</b>'
		li += '<p class="mui-ellipsis">' + data.newsTimePersonalArticle[i].contentDescribe + '</p>'
		li += '<p class="mui-ellipsis "><span>' + data.newsTimePersonalArticle[i].createTime + '</span>'
		li += '<span class=" mui-icon mui-icon-chatbubble difination-span-left difination-p-color">' + data.newsTimePersonalArticle[i].browseConut + '</span>'
		li += '<span class="difination-p-color difination-span-left mui-icon mui-icon-chat">' + data.newsTimePersonalArticle[i].commentCount + '</span>'
		li += '</p></div></li>'
		ul.innerHTML = li
		article.insertBefore(ul, article.firstChild);

	}
}
//comment 下拉刷新
function commentPulldownDataLoade(data) {
	var article = document.getElementById('comment_id')
	for(var i = 0; i < data.articleList.lenght; i++) {
		for(var j = 0; j < data.articleUserList.length; j++) {
			if(data.articleUserList[j].id == data.articleList[i].fkUserKey) {
				var ul = document.createElement('ul')
				ul.className = 'mui-table-view'
				ul.style.borderBottom = '1px solid #6D6D72'
				var li = '<li name="' + data.personalArticle[i].id + '" class="mui-table-view-cell mui-media">'
				li += '<div class="mui-media-body"><b>' + data.personalArticle[i].title + '</b>'
				li += '<p class="mui-ellipsis">' + data.personalArticle[i].contentDescribe + '</p>'
				li += '<p class="mui-ellipsis difination-p-color difination-span-left">'
				li += '<span class="difination-p-color"><a name="' + data.personalArticle[i].id + '" href="javascript.void(0)">' + data.personalArticle[i].nickname + '</a></span>'
				li += '<span>' + data.personalArticle[i].createTime + '</span>'
				li += '<span class="difination-p-color difination-span-left mui-icon mui-icon-chat">' + data.personalArticle[i].commentCount + '</span>'
				li += '</p></div></li>'
				ul.innerHTML = li
				article.insertBefore(ul, article.firstChild);
			}
		}
	}
}
//article 上拉加载
function articlePullupDataLoade(data) {
	if(article_start == 0) {
		mui('#content').pullRefresh().endPullup(true);
	} else {
		mui('#content').pullRefresh().refresh(true);
	}
	var article = document.getElementById('article_id')
	//console.log(article)
	//console.log(data.personalArticle.length)
	for(var i = 0; i < data.personalArticle.length; i++) {
		var ul = document.createElement('ul')
		ul.className = 'mui-table-view'
		ul.style.borderBottom = '1px solid #6D6D72'
		var li = '<li name="' + data.personalArticle[i].id + '" class="mui-table-view-cell mui-media">'
		li += '<div class="mui-media-body"><b>' + data.personalArticle[i].title + '</b>'
		li += '<p class="mui-ellipsis">' + data.personalArticle[i].contentDescribe + '</p>'
		li += '<p class="mui-ellipsis "><span>' + data.personalArticle[i].createTime + '</span>'
		li += '<span class=" mui-icon mui-icon-chatbubble difination-span-left difination-p-color">' + data.personalArticle[i].browseConut + '</span>'
		li += '<span class="difination-p-color difination-span-left mui-icon mui-icon-chat">' + data.personalArticle[i].commentCount + '</span>'
		li += '</p></div></li>'
		ul.innerHTML = li
		article.appendChild(ul)
	}
}
//comment 上拉加载
function commentPullupdataLoade(data) {
	if(comment_start == 0) {
		mui('#content').pullRefresh().endPullup(true);
	} else {
		mui('#content').pullRefresh().refresh(true);
	}
	var article = document.getElementById('comment_id')
	for(var i = 0; i < data.articleList.lenght; i++) {
		for(var j = 0; j < data.articleUserList.length; j++) {
			if(data.articleUserList[j].id == data.articleList[i].fkUserKey) {
				var ul = document.createElement('ul')
				ul.className = 'mui-table-view'
				ul.style.borderBottom = '1px solid #6D6D72'
				var li = '<li name="' + data.personalArticle[i].id + '" class="mui-table-view-cell mui-media">'
				li += '<div class="mui-media-body"><b>' + data.personalArticle[i].title + '</b>'
				li += '<p class="mui-ellipsis">' + data.personalArticle[i].contentDescribe + '</p>'
				li += '<p class="mui-ellipsis difination-p-color difination-span-left">'
				li += '<span class="difination-p-color"><a name="' + data.personalArticle[i].id + '" href="javascript.void(0)">' + data.personalArticle[i].nickname + '</a></span>'
				li += '<span>' + data.personalArticle[i].createTime + '</span>'
				li += '<span class="difination-p-color difination-span-left mui-icon mui-icon-chat">' + data.personalArticle[i].commentCount + '</span>'
				li += '</p></div></li>'
				ul.innerHTML = li
				article.appendChild(ul);
			}
		}
	}
}

//跳转主内容页面
mui('#main').on('tap', 'article>ul>li', function() {
	var article_id = this.getAttribute('name')
	//console.log(article_id)
	//alert(article_id)
	var pageTo = plus.webview.getWebviewById('forum_article_main_content.html')
	mui.fire(pageTo, 'listener_aritcle_id', {
		article_id: article_id
	})
	mui.openWindow({
		id: 'forum_article_main_content.html'
	})

})
//跳转用户个人中心
mui('#main').on('tap', 'comment>ul>li>content>div>p>span>a', function() {
	var user_id = this.getAttribute('name')
	var pageTo = plus.webview.getWebviewById('forum_personal.html')
	mui.fire(pageTo, 'listener_personal_id', {
		user_id: user_id
	})
	mui.openWindow({
		id: 'forum_personal.html'
	})

})

//跳转主内容页面
mui('#main').on('tap', 'comment>ul>li>content>div>coen', function() {
	var article_id = this.getAttribute('name')
	alert(article_id)
	var pageTo = plus.webview.getWebviewById('forum_article_main_content.html')
	mui.fire(pageTo, 'listener_aritcle_id', {
		article_id: article_id
	})
	mui.openWindow({
		id: 'forum_article_main_content.html'
	})

})
/*-------------------------跳转-----end----------------------------------------*/

//监听左右移动
mui('#main').on('swiperight', 'comment', function() {
	document.getElementById('article_id').style.display = 'block'
	document.getElementById('comment_id').style.display = 'none'
	sessionStorage.setItem('swipe', 'left')
	console.log(sessionStorage.getItem('swipe'))
})
document.getElementById('main').addEventListener('swipeleft', function() {
	sessionStorage.setItem('swipe', 'right')
	document.getElementById('article_id').style.display = 'none'
	document.getElementById('comment_id').style.display = 'block'
	console.log(sessionStorage.getItem('swipe'))
})
mui('.mui-segmented-control-inverted').on('tap', 'a', function() {
	var name = this.getAttribute('name')
	if(name == 'article') {
		document.getElementById('article_id').style.display = 'block'
		document.getElementById('comment_id').style.display = 'none'
		sessionStorage.setItem('swipe', 'left')
		console.log(sessionStorage.getItem('swipe'))
	} else if(name == 'comment') {
		if(article_start != 0) {
			document.getElementById('article_id').style.display = 'none'
			document.getElementById('comment_id').style.display = 'block'
			sessionStorage.setItem('swipe', 'right')
			console.log(sessionStorage.getItem('swipe'))
		}

	}
})

