var service_url = "http://192.168.43.4/"
var user = JSON.parse(localStorage.getItem("tuser"))
mui.plusReady(function() {
	
})
/*----------------init -----end---------------------------*/
//返回刷新
var count = 0 //是否进行过操作
document.getElementById('back').addEventListener('tap', function() {
	location.reload()
	plus.webview.currentWebview().show('slide-in-right',400)
	if(count != 0) {
		setTimeout(function(){
			var pageTo = plus.webview.getWebviewById('forum_personal.html')
			mui.fire(pageTo, 'listener_personal_id', {
				user_id: u_id
			})
			pageTo.show("slide-in-left",1000)
			mui.openWindow({
				id: 'forum_personal.html'
			})
		},400)
		
	}
})


//监听窗口
var u_id;
window.addEventListener('listener_user_fans_mind', function(event) {
	//plus.webview.show('forum_personale_mind_fans.html','fade-in',3000)
	//关注1  粉丝2
	u_id = event.detail.u_id
	var name = event.detail.name
	
	if(name == 2) {
		document.getElementById('sliderProgressBar').style.webkitTransform = 'translate3d(94px, 0px, 0px) translateZ(0px)'
		document.getElementById('sliderGroup').style.webkitTransform = 'translate3d(-440px, 0px, 0px) translateZ(0px)'
		document.getElementById('sliderGroup').style.webkitTransition = '0ms cubic-bezier(0.165, 0.84, 0.44, 1)'
		document.getElementById('sliderGroup').style.transition = '0ms cubic-bezier(0.165, 0.84, 0.44, 1)'
		document.getElementById('item1').classList.remove('mui-active')
		document.getElementById('fans_hand').classList.add('mui-active')
		document.getElementById('item2').classList.add('mui-active')
		document.getElementById('mind_hand').style.color = '#000000'
	}
	if(name == 1) {
		document.getElementById('sliderProgressBar').style.webkitTransform = 'translate3d(0px, 0px, 0px) translateZ(0px)'
		document.getElementById('sliderGroup').style.webkitTransform = 'translate3d(0px, 0px, 0px) translateZ(0px)'
		document.getElementById('sliderGroup').style.webkitTransition = '0ms'
		document.getElementById('sliderGroup').style.transition = '0ms'
		document.getElementById('fans_hand').style.color = '#000000'
		document.getElementById('item2').classList.remove('mui-active')
		document.getElementById('item1').className += ' ' + 'mui-active'
		document.getElementById('mind_hand').className += ' ' + 'mui-active'
	}

	//获取 粉丝、关注用户信息
	mui.ajax({
		url: service_url + 'mind/mindUser',
		data: {
			userId: u_id,
			start: 0,
			end: 20
		},
		dataType: 'json',
		type: 'post',
		async: false,
		success: function(dataMind, su, http) {
			if(http.status == 200 && http.readyState == 4) {
				if(dataMind.mindUserList.length != 0) {
					//判断作者的关注是否是我的关注
					mui.ajax({
						url: service_url + 'mind/mindUser2',
						data: {
							userId: user.id
						},
						async: false,
						dataType: 'json',
						type: 'post',
						success: function(data, su, http) {
							var newsJson = JSONcompose(dataMind, data)
							var rander = template("temp", newsJson)
							document.getElementById('item1').innerHTML = rander
						},
						error: function(http, er) {
							errorAJAX(http)
						}

					})

				}
			}
		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})
	//作者的粉丝
	mui.ajax({
		url: service_url + 'fans/fansUser',
		data: {
			userId: u_id,
			start: 0,
			end: 20
		},
		dataType: 'json',
		type: 'post',
		success: function(datafans, su, http) {
			//console.log(datafans)
			if(http.status == 200 && http.readyState == 4) {
				if(datafans.fansUserList.length != 0) {
					//判断作者的粉丝是否是我的关注
					mui.ajax({
						url: service_url + 'mind/mindUser2',
						data: {
							userId: user.id
						},
						dataType: 'json',
						type: 'post',
						success: function(data, su, http) {
							var newsJson = JSONcompose(datafans, data)
							//console.log(JSON.stringify(newsJson))
							var rander = template("temp2", newsJson)
							document.getElementById('item2').innerHTML = rander

						},
						error: function(http, er) {
							errorAJAX(http)
						}

					})

				}
			}

		},
		error: function(http, er) {
			errorAJAX(http)
		}
	})
})

//关注 或者取消关注
mui('#sliderGroup').on('tap', 'button', function() {
	var this_user_id = this.getAttribute('name') //选择的用户id
	var type = this.getAttribute('set') //选择的是关注还是取消关注
	var classname = this.classList[0] //唯一标识
	var index = document.querySelectorAll("." + classname)
	console.log(this_user_id + "," + type + "," + classname + ',' + index)
	console.log(index.length)
	//添加
	//console.log(type)
	count++
	if(type == 'no') {
		setTimeout(function() {
			index[0].setAttribute("set", "yes")
			index[0].classList.remove("mui-btn-warning")
			index[0].innerText = "已关注"
			if(index.length >= 2) {
				index[1].setAttribute("set", "yes")
				index[1].classList.remove("mui-btn-warning")
				index[1].innerText = "已关注"
			}
		}, 300)
		mui.ajax({
			url: service_url + 'mind/addMind',
			data: {
				mindUserId: user.id,
				decideUserId: this_user_id
			},
			timeout: 10000,
			success: function(data, su, http) {
				console.log(data)
			},
			error: function(http, er) {
				errorAJAX(http)
			}
		})
	} else {
		setTimeout(function() {
			index[0].setAttribute("set", "no")
			index[0].className += " mui-btn-warning"
			index[0].innerText = "关注"
			if(index.length >= 2) {
				index[1].setAttribute("set", "no")
				index[1].className += " mui-btn-warning"
				index[1].innerText = "关注"
			}
		}, 300)

		count++
		//删除关注
		mui.ajax({
			url: service_url + 'fans/deleteFans',
			data: {
				userId: user.id,
				deid: this_user_id
			},
			timeout: 10000,
			success: function(data, su, http) {
				console.log(data == true)
			},
			error: function(http, er) {
				errorAJAX(http)
			}
		})
	}
})
/*----------------------------粉丝---关注-----end------------------------------------------------*/
//点击用户进入用户界面
mui('#sliderGroup').on('tap', 'div>ul>li>img', function() {
	var user_id = this.getAttribute('name') //点击的用户id
	var pageTo = plus.webview.getWebviewById('forum_personal.html')
	mui.fire(pageTo, 'listener_personal_id', {
		user_id: user_id
	})
	mui.openWindow({
		id: 'forum_personal.html'
	})
})
/*-----------------------user psersonal----------end------------------------------------------------*/