 /*
 模拟用户登录
 * */
var service_url = "http://172.19.129.1/"
var user = JSON.parse(localStorage.getItem("tuser"))
var comment_user_name //评论人
var comment_user_id //评论人_ID
var comment_ranks //楼层 添加回复
var comment_id //评论id
var article_user_id //文章作者_id
/*第一次初始化*/
mui.plusReady(function() {})
//返回箭头
document.getElementById('back').addEventListener('tap',function(){
	location.reload()
})
/*-------------------------init------end--- ----------------------------------------------------*/
//监听_article_id 
window.addEventListener('listener_aritcle_id', function(event) {
	
	//文章_id
	var article_id = event.detail.article_id
	//console.log( article_id)
	mui.ajax({
		url: service_url + 'forum/articleIdToArticle',
		data: {
			article_id: article_id
		},
		dataTyep: 'json',
		type: 'post',
		success: function(data, su, http) {
			if(http.readyState == 4 && http.status == 200) {
				var render = template('tempMain', data)
				//console.log(render)
				//console.log(data.articleVo.contentText)
				//console.log(data.articleListComment.length)
				//console.log(data.articleCommentReplyList.length)
				document.getElementById('main').innerHTML = render
				document.getElementById('loaded').style.display='none'
				document.getElementsByClassName('mui-content')[0].innerHTML = data.articleVo.contentText
				sessionStorage.setItem('article_id', data.articleVo.id)
				article_user_id = data.articleVo.fkUserKey.id
			}
			mindYesNot()
			signWhether()
			applaudWhether()
			//var taple = document.querySelector('.difination-comment-supper')
			//console.log(taple)
		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})
})
/*--------------------------listener-----end-------------------------------------------------------*/
//type 1=评论 2=回复
mui('.mui-bar-tab').on('keydown', 'input', function(event) {
	//console.log(sessionStorage.getItem('article_id'))
	//console.log(user.id)
	//console.log(event.keyCode)
	///console.log(this.value)
	//console.log(ranks(document.querySelectorAll('.difination-comment').length))

	//楼
	var rank = ranks(document.querySelectorAll('.difination-comment').length)
	//内容
	var reply = this.value
	//console.log(reply)
	if(event.keyCode == 13) {
		if(reply != "") {
			//type 1=评论 2=回复
			var type = sessionStorage.getItem('type')
			//评论
			if(type == 1) {
				//文章_id
				var article_id = parseInt(sessionStorage.getItem('article_id'))
				mui.ajax({
					url: service_url + 'comment/addComment',
					data: {
						articleId: article_id,
						userId: user.id,
						ranks: rank,
						content: reply
					},
					type: 'post',
					async: false,
					success: function(data, su, http) {
						if(http.readyState == 4 && http.status == 200) {
							//追加数据
							//data主键
							if(data != 0 ) {
								var taple = document.querySelector('.difination-comment-supper')
								//console.log(taple)
								var ul = document.createElement('ul')
								ul.classList.add("mui-table-view")
								ul.classList.add('difination-comment')
								ul.setAttribute("id",rank)
								var li='<comment type="2" set="'+data+'" ranks="'+rank+'"  title="'+user.id+'" name="'+user.nickname+'">'
								li += '<li  class="mui-table-view-cell mui-media">'
								li += '<div class="mui-media-body"><p class="mui-ellipsis "><span>'
								li += '<img class="difination-img-radius" src="' + user.avatar + '"/></span>'
								li += '<span class="difination-span-left">' + user.nickname + '</span>'
								li += '<span class="difination-span-left">' + new Date().Format('yyyy-MM-dd hh:mm:ss') + '</span>'
								li+='<span class="difination-span-left">'+rank+'</span></p>'
								li += '<label style="font-size: 13px;">' + reply + '</label></div></li><a style="display=none" id="' + reply + '" href="javascript:;"></a><comment>'
								ul.innerHTML = li
								taple.appendChild(ul)
								//修改没有评论  
								document.querySelectorAll('.difination-maggin-top40px')[1].innerText = '评论'
							}
						}

					},
					error: function(http, er) {
					errorAJAX(http)
					}
				})
				//定位
				document.getElementById(""+reply).scrollIntoView(false)
				/*document.getElementById(""+reply).scrollIntoView()*/
				this.blur()

			} else if(type == 2) { //回复
				console.log(comment_user_id)
				console.log(reply)
				console.log(user.id)
				mui.ajax({
					url: service_url + 'comment/reply/add',
					data: {
						commentKey: comment_id,
						content: reply,
						userId: user.id,
						ranks: comment_ranks
					},
					type: 'post',
					success: function(data, su, http) {
						console.log(data)
						if(http.readyState == 4 && http.status == 200) {
							if(data == true) {
								
								var reply_table = document.getElementById(comment_ranks)
								console.log(reply_table)
								console.log(comment_ranks+",")
								var li = document.createElement("li")
								var co = document.getElementById('comment-supper')
								var span = ''
								var date = new Date().Format('yyyy-MM-dd hh:mm:ss')
								span += '<li name="' + user.nickname + '" class=" mui-table-view-cell mui-media">'
								span += '<span style="float: left;color: #929292;font-size: 13px;">回复:</span> '
								span += '<div style="margin-left:40px ;margin-top: -20px;float:right;width: 90%;">'
								span += '<span style="font-size: 13px;">' + reply + '</span>'
								span += '<p class="mui-ellipsis ">'
								span += '<span><img class="difination-img-radius" src="' + user.avatar + '"/></span>'
								span += '<span class="difination-span-left">' + user.nickname + '</span>'
								span += '<span class="difination-span-left">' + date + '</span>'
								span += '</p></div><a style="display=none" id="'+date+'" href="javascript:;"></a></li>'
								li.innerHTML = span
								reply_table.appendChild(li)

							}
						}
							document.getElementById(date).scrollIntoView()
					},
					error: function(http, er) {
					errorAJAX(http)
					}
					

				})

			}
			this.blur()
			this.value = ""
			sessionStorage.setItem("type",1)
		

		}
	}

})
//监听评论输入框 
document.getElementById('input_comment').addEventListener('tap', function() {
	if(y == 0) {
		console.log(y)
		//如果不是通过长按获取光标 那就是评论
		sessionStorage.setItem('type', 1)
	}

})

//评论回复
mui('#main').on('longtap', 'comment', function(event) {
	i = 0
	sessionStorage.setItem("type", this.getAttribute("type"))
	//console.log(article_id)
	comment_id = this.getAttribute('set')
	comment_user_name = this.getAttribute('name')
	comment_user_id = this.getAttribute('title')
	comment_ranks = this.getAttribute('ranks')
	//console.log(comment_ranks)
	//console.log(document.getElementById(comment_ranks))
	var input = document.getElementById('input_comment')
	input.focus()
})
//控制 longtap光标消失
var i = 0
var y = 0 //控制是否在按下回复的时候再次点击 评论
function longtapFocus() {
	var input = document.getElementById('input_comment')
	input.setAttribute("placeholder", "想对Ta说点什么")
	if(y != 0) {
		y = 0
	}
	if(i == 0) {
		input.setAttribute("placeholder", "回复:" + comment_user_name)
		input.focus()
		y++
	}
	i++
}

/*------------------------------------article_comment_reply-----end--------------------------------------------------------------*/
//文章关注——监听
mui('#main').on('tap', 'mind>button', function() {
	var button = document.querySelectorAll('.mui-btn-outlined')
	var type = this.getAttribute('name')
	//console.log(type)
	if(type == 'yes') {
		button[0].style.display = 'none'
		button[1].style.display = 'block'
		mui.ajax({
			url: service_url + 'fans/deleteFans',
			dataType: 'json',
			type: 'post',
			data: {
				userId: user.id,
				deid: article_user_id
			},
			success: function(data, su, http) {
				console.log(http.readyState + "," + http.status + "," + data)
				/*if(http.readyState == 4 && http.status == 200 && data==true) {
					//
					
				}*/
			},
			error: function(http, er) {
			errorAJAX(http)
			}

		})

	}
	if(type == 'no') {
		button[0].style.display = 'block'
		button[1].style.display = 'none'
		mui.ajax({
			url: service_url + 'mind/addMind',
			dataType: 'json',
			type: 'post',
			data: {
				mindUserId: user.id,
				decideUserId: article_user_id
			},
			success: function(data, su, http) {
				/*if(http.readyState == 4 && http.status == 200) {
					//
				
				}*/
			},
			error: function(http, er) {
			errorAJAX(http)
			}

		})
	}
})

//文章关注 判断
function mindYesNot() {
	mui.ajax({
		url: service_url + 'mind/booleanMind',
		data: {
			userId: user.id,
			deId: article_user_id
		},
		type: 'post',
		timeout: 10000,
		success: function(data, su, http) {
			if(http.readyState == 4 && http.status == 200) {
				var button = document.querySelectorAll('.mui-btn-outlined')
				if(data == true) {
					button[0].style.display = 'block'
				} else {
					button[1].style.display = 'block'
				}

			}
		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})

}
/*-----------------------------mind-----end--------------------------------------*/
//监听收藏
mui('.difination-maggin15px').on('tap', 'label', function() {
	var type = this.getAttribute('name')
	var sign = document.querySelectorAll('.difination-maggin15px>label')
	var id_article = parseInt(sessionStorage.getItem('article_id'))
	console.log(type)
	if(type == 'yes') {
		sign[0].style.display = 'none'
		sign[1].style.display = 'block'

		mui.ajax({
			url: service_url + 'sign/delete',
			data: {
				userId: user.id,
				articleId: id_article
			},
			timeout: 10000,
			dataType: 'json',
			type: 'post',
			success: function(data, su, http) {
				if(http.readyState == 4 && http.status == 200) {}
			},
			error: function(http, er) {
			errorAJAX(http)
			}

		})
	} else if(type == 'no') {
		sign[0].style.display = 'block'
		sign[1].style.display = 'none'
		mui.ajax({
			url: service_url + 'sign/add',
			data: {
				userId: user.id,
				articleId: id_article
			},
			timeout: 10000,
			dataType: 'json',
			type: 'post',
			success: function(data, su, http) {
				if(http.readyState == 4 && http.status == 200) {

				}
			},
			error: function(http, er) {
				errorAJAX(http)
			}

		})
	}

})

//判断是否收藏
function signWhether() {
	var id_article = parseInt(sessionStorage.getItem('article_id'))
	mui.ajax({
		url: service_url + 'sign/boolean',
		data: {
			userId: user.id,
			articleId: id_article
		},
		type: 'post',
		timeout: 10000,
		success: function(data, su, http) {
			if(http.readyState == 4 && http.status == 200) {
				var sign = document.querySelectorAll('.difination-maggin-left50px')
				if(data == true) {
					sign[0].style.display = 'block'
					sign[1].style.display = 'none'
				} else {
					sign[0].style.display = 'none'
					sign[1].style.display = 'block'
				}

			}
		},
		error: function(http, er) {
		errorAJAX(http)
		}
	})
}
/*------------------------------------sign----end-----------------------------------------*/
//监听赞
mui('.difination-maggin15px').on('tap', 'span', function() {
	var type = this.getAttribute('name')
	var applaud = document.querySelectorAll('.difination-maggin15px>span')
	var id_article = parseInt(sessionStorage.getItem('article_id'))
	console.log(type)
	if(type == 'yes') {
		applaud[0].style.display = 'none'
		applaud[1].style.display = 'block'

		mui.ajax({
			url: service_url + 'applaud/delete',
			data: {
				userId: user.id,
				articleId: id_article
			},
			timeout: 10000,
			dataType: 'json',
			type: 'post',
			success: function(data, su, http) {
				if(http.readyState == 4 && http.status == 200) {
					
				}
			},
			error: function(http, er) {
			errorAJAX(http)
			}

		})
	} else if(type == 'no') {
		applaud[0].style.display = 'block'
		applaud[1].style.display = 'none'
		mui.ajax({
			url: service_url + 'applaud/add',
			data: {
				userId: user.id,
				articleId: id_article
			},
			timeout: 10000,
			dataType: 'json',
			type: 'post',
			success: function(data, su, http) {
				if(http.readyState == 4 && http.status == 200) {
					console.log(data)

				}
			},
			error: function(http, er) {
				errorAJAX(http)
			}

		})
	}

})
//判断是否赞
function applaudWhether() {
	var id_article = parseInt(sessionStorage.getItem('article_id'))
	mui.ajax({
		url: service_url + 'applaud/boolean',
		data: {
			userId: user.id,
			articleId: id_article
		},
		type: 'post',
		timeout: 10000,
		success: function(data, su, http) {
			if(http.readyState == 4 && http.status == 200) {
				var applaud = document.querySelectorAll('.difination-maggin-left10px')
				if(data == true) {
					applaud[0].style.display = 'block'
					applaud[1].style.display = 'none'
				} else {
					applaud[0].style.display = 'none'
					applaud[1].style.display = 'block'
				}

			}
		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})
}

/*----------------------------------applaud----end-------------------------------------------*/
//监听用户头像
mui('#main').on('tap','user>ul>li>img',function(){
	//作者id
	//console.log(article_user_id)
	var pageTo = plus.webview.getWebviewById('forum_personal.html')
	mui.fire(pageTo,'listener_personal_id',{user_id:article_user_id})
	mui.openWindow({
		id:'forum_personal.html'  
	})
})
//相关文章推荐 监听
mui('#main').on('tap','relevant>ul',function(){
	var pageTo = plus.webview.getWebviewById('forum_article_main_content.html')
	var article_id = this.getAttribute('name')
	mui.fire(pageTo,'listener_aritcle_id',{article_id:article_id})
	mui.toast("正在加载",600)
	mui.openWindow({
		id:'forum_article_main_content.html'
	})
})
//计算楼层
function ranks(ranks) {
	if(ranks == 0) {
		return "沙发"
	} else if(ranks == 1) {
		return "椅子"
	} else if(ranks == 2) {
		return "板凳"
	} else {
		return(parseInt(ranks) + 1) + '楼'
	}
}
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}