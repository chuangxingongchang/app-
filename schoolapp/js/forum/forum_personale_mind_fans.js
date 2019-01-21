/*
 模拟用户登录
 * */
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
/*----------------init -----end---------------------------*/

//监听程序
window.addEventListener('listener_user_fans_mind', function(event) {
	//关注1  粉丝2
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

	var u_id = event.detail.u_id
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
		success: function(dataMind, su, http) {
			if(http.status == 200 && http.readyState == 4) {
				if(dataMind != null) {
					var rander = template("temp", dataMind)
					document.getElementById('item1').innerHTML = rander
					var mind_buttomn = document.querySelectorAll('.difination-mind')
					//判断作者的关注是否是我的关注
					mui.ajax({
						url: service_url + 'fans/fansAll',
						data: {
							userId: user.id
						},
						dataType: 'json',
						type: 'post',
						success: function(data, su, http) {
							if(http.status == 200 && http.readyState == 4) {
								if(data != null) {
									var count = 0
									for(var i = 0; i < dataMind.mindUserList.length; i++) {
										for(var j = 0; j < data.meFans.length; j++) {
											if(dataMind.mindUserList[i].id == data.meFans[j].fkDecideUser) {
												mind_buttomn[0].style.display = 'none'
												mind_buttomn[1].style.display = 'block'
												count = 0
											}
											count++
											if(count == data.length) {
												mind_buttomn[0].style.display = 'block'
												mind_buttomn[1].style.display = 'none'
											}
										}
									}
								} else {
									mind_buttomn[0].style.display = 'none'
									mind_buttomn[1].style.display = 'block'
								}
							}

						},
						error: function(http, er) {
							if(http.status == 404) {
								mui.alert('页面找不到3', " ", "确认", 'div')
							} else if(http.timeout) {
								mui.alert('访问超时', " ", "确认", 'div')
							} else if(er) {
								mui.alert('服务器爆炸', " ", "确认", 'div')
							}
						}

					})

				}
			}
		},
		error: function(http, er) {
			if(http.status == 404) {
				mui.alert('页面找不到1', " ", "确认", 'div')
			} else if(http.timeout) {
				mui.alert('访问超时', " ", "确认", 'div')
			} else if(er) {
				mui.alert('服务器爆炸', " ", "确认", 'div')
			}
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
			if(http.status == 200 && http.readyState == 4) {
				if(datafans != null) {
					var rander = template("temp2", datafans)
					document.getElementById('item2').innerHTML = rander
					var mind_buttomn = document.querySelectorAll('.difination-fans')
					//判断作者的粉丝是否是我的关注
					mui.ajax({
						url: service_url + 'fans/fansAll',
						data: {
							userId: user.id
						},
						dataType: 'json',
						type: 'post',
						success: function(data, su, http) {
							if(http.status == 200 && http.readyState == 4) {
								if(data != null) {
									var count = 0
									for(var i = 0; i < datafans.fansUserList.length; i++) {
										for(var j = 0; j < data.meFans.length; j++) {
											if(datafans.fansUserList[i].id == data.meFans[j].fkDecideUser) {
												mind_buttomn[0].style.display = 'none'
												mind_buttomn[1].style.display = 'block'
												count = 0
											}
											count++
											if(count == data.length) {
												mind_buttomn[0].style.display = 'block'
												mind_buttomn[1].style.display = 'none'
											}
										}
									}
								} else {
									mind_buttomn[0].style.display = 'none'
									mind_buttomn[1].style.display = 'block'
								}
							}

						},
						error: function(http, er) {
							if(http.status == 404) {
								mui.alert('页面找不到3', " ", "确认", 'div')
							} else if(http.timeout) {
								mui.alert('访问超时', " ", "确认", 'div')
							} else if(er) {
								mui.alert('服务器爆炸', " ", "确认", 'div')
							}
						}

					})

				}
			}

		},
		error: function(http, er) {
			if(http.status == 404) {
				mui.alert('页面找不到2', " ", "确认", 'div')
			} else if(http.timeout) {
				mui.alert('访问超时', " ", "确认", 'div')
			} else if(er) {
				mui.alert('服务器爆炸', " ", "确认", 'div')
			}
		}
	})
})
//关注 或者取消关注
mui('#sliderGroup').on('tap','button',function(){
	var this_user_id = this.getAttribute('name')//选择的用户id
	var type=this.getAttribute('set')//选择的是关注还是取消关注
	var classname = this.classList[0]//唯一标识
	var index = document.querySelectorAll("."+classname)
	console.log(this_user_id+","+type+","+classname+','+index)
	//添加
	console.log(type)
	if(type == 'no'){
		mui.ajax({
			url:service_url+'mind/addMind',
			data:{mindUserId:user.id,decideUserId:this_user_id},
			type:'post',
			timeout:10000,
			success:function(data,su,http){
				if(data == true && http.readyState == 4 && http.status ==200){
					index[0].style.display = 'none'
					index[1].style.display = 'block'
					index[2].style.display = 'none'
					index[3].style.display = 'block'
				}
			},
			error: function(http, er) {
			if(http.status == 404) {
				mui.alert('页面找不到2', " ", "确认", 'div')
			} else if(http.timeout) {
				mui.alert('访问超时', " ", "确认", 'div')
			} else if(er) {
				mui.alert('服务器爆炸', " ", "确认", 'div')
			}
		}
		})
	}else{
		//删除关注
		mui.ajax({
			url:service_url+'fans/deleteFans',
			data:{userId:user.id,deid:this_user_id},
			type:'post',
			timeout:10000, 
			success:function(data,su,http){
				console.log(data == true)
				if(data == true && http.readyState == 4 && http.status ==200){
					index[0].style.display = 'block'
					index[1].style.display = 'none'
					index[2].style.display = 'block'
					index[3].style.display = 'none'
				}
			},
			error: function(http, er) {
			if(http.status == 404) {
				mui.alert('页面找不到2', " ", "确认", 'div')
			} else if(http.timeout) {
				mui.alert('访问超时', " ", "确认", 'div')
			} else if(er) {
				mui.alert('服务器爆炸', " ", "确认", 'div')
			}
		}
		})
	}
})
/*----------------------------粉丝---关注-----end------------------------------------------------*/
//点击用户进入用户界面
mui('#sliderGroup').on('tap','div>ul>li>img',function(){
	var user_id = this.getAttribute('name')//点击的用户id
	var pageTo = plus.webview.getWebviewById('forum_personal.html')
	mui.fire(pageTo,'listener_personal_id',{user_id:user_id})
	mui.openWindow({
		id:'forum_personal.html'
	})
})
/*-----------------------user psersonal----------end------------------------------------------------*/



