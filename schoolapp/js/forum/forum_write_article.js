var service_url = "http://172.19.129.1/"
var render = '' //art-template
var range; //光标位置
var user = JSON.parse(localStorage.getItem("tuser"))
/*-----------------------------------end---------------------------------------*/
mui.plusReady(function() {
	/**
	 * 
	 * 第一次初始化数据
	 * */
	//初始化 类型选择栏
	//console.log(user.uname)
	//console.log(service_url + 'type/option')
	mui.ajax({
		url: service_url + 'type/option',
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data, su, http) {
			//console.log(http.status)
			if(su == 'success' && http.readyState == 4 && http.status == 200) {
				render = template('select_template', data)
				document.getElementById('select_template_body').innerHTML = render
			}
		},
		error: function(http, er) {
			//console.log(http.status)
			errorAJAX(http)
		}
	})

})
/*------------------------ready--------------end---------------------------------------*/
/*
	 帮助文档 监听
	 * */
document.getElementById('help').addEventListener('tap', function() {

	//帮助文档显示
	$('#display-help').fadeIn(500)
})
document.getElementById('display-help').addEventListener('tap', function() {
	//帮助文档显示
	$('#display-help').fadeOut(500)
})
/*选择类型按钮*/
function optioin_onchange() {
	mui.toast("选择成功", 500)
}
/*---------------------------help-------end----------------------------------------*/
/*submit 监听*/
document.getElementById('submit').addEventListener('tap', function() {
	try{
			//获取类型
	var type = document.getElementById('options').value
	//标题
	var title = document.getElementById('title').value
	}catch(e){
		//TODO handle the exception
	}

	//标题长度大于5
	if(title.length >= 5) {
		var b = false
		var raE = /[`~!@#$%^&*_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*——\|“”【】‘’]/
		if(!(raE.test(title))) {
			//描述
			var content_describe = document.getElementById('content').innerText;
			//内容长度大于10
			if(content_describe.length >= 10) {
				//内容
				var content = document.getElementById('content').innerHTML
				//console.log(content_describe)
				//描述超过20 就截取
				if(content_describe.length >= 20) {
					content_describe = content_describe.substring(0, 20)
				}

				var datas = {
					title: title,
					fkForumTypeKey: type,
					contentText: content,
					fkUserKey: user.id,
					contentDescribe: content_describe
				}
				//提交文章
				mui.ajax({
					url: service_url + 'forum/addArticle',
					data: datas,
					dataType: 'json',
					type: 'post',
					timeout: 10000,
					success: function(data, su, http) {
						var time = 8000
						//添加成功过后 做的事情
						if(su == "success" && http.readyState == 4 && http.status == 200) {
							if(data == true) {
								setInterval(function() {
									//time = time - 1000
									$('#tips').show()
									clearInterval()
									$('#tips').animate({
										top: '250px',
										opacity: '0.8'
									});
								}, 500)
								//计算秒

								setInterval(function() {
									time = time - 1000
									document.getElementById('time').innerHTML = time / 1000
									if(time / 1000 == 0) {
										mui.trigger(document.getElementById('personal_id'),'tap')
									}
								}, 1000)
								location.reload()
							}
						}

					},
					error: function(http, er) {
						errorAJAX(http)
					}

				})

			} else if(title.length == 0 || title.length == "") {
				mui.alert('请填写内容', " ", "确认", "", "div")
			} else {
				mui.alert('内容不少于10个字说明', " ", "确认", "", "div")
			}
		} else {
			mui.alert('标题包含敏感字符', " ", "确认", "", "div")
		}
	} else if(title.length == 0 || title.length == "") {
		mui.alert('请填写标题', " ", "确认", "", "div")
	} else {
		mui.alert('标题不少于5个字说明', " ", "确认", "", "div")
	}

})
/*--------------------------submit-----end------------------------------------------*/
//添加图片
document.getElementById('phone_img_insert').addEventListener('tap', function(e) {

	if(mui.os.plus) {
		var a = [{
			title: '拍照'
		}, {
			title: '从手机相册选择'
		}];
		plus.nativeUI.actionSheet({
			cancel: '取消',
			buttons: a
		}, function(b) {
			switch(b.index) {
				case 0:
					break;
				case 1:
					//拍照
					getImages();
					break;
				case 2:
					//打开相册
					galleryImages();
					break;
				default:
					break;
			}
		}, false);
	}

})

//从本地相册选择
function galleryImages() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			var path = entry.fullPath + '?version=' + new Date().getTime();
			//添加照片
			uploadHeadImg(path);
		});
	}, function(err) {
		//  console.log("读取拍照文件失败: ",err);
	}, {
		filter: 'image'
	});
};
//拍照
function getImages() {
	var mobileCamera = plus.camera.getCamera();
	mobileCamera.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var path = entry.toLocalURL() + '?version=' + new Date().getTime();
			//添加照片
			uploadHeadImg(path);
		}, function(err) {
			console.log("读取拍照文件错误");
		});
	}, function(e) {
		console.log("er", err);
	}, function() {
		filename: '_doc/head.png';
	});
}
//上传图片
function uploadHeadImg(imgPath) {
	//获取图片后缀
	var type = imgPath.substring(imgPath.lastIndexOf('.'), imgPath.lastIndexOf('?'))
	//判断是否是图片
	if(type == ".jpg" || type == ".gif" || type == ".JPG" || type == ".GIF" || type == ".bmp" || type == ".BMP" ||
		type == ".jpeg" || type == ".JPEG" || type == ".PNG" || type == ".png") {
		var Img = new Image()
		var dataURL = ''
		Img.src = imgPath;
		var dataImg = ""
		Img.onload = function() { //要先确保图片完整获取到，这是个异步事件

			var canvas = document.createElement("canvas"); //创建canvas元素
			var width = Img.width;
			var height = Img.height;

			//console.log(width)
			//console.log(height)

			canvas.width = width;
			canvas.height = height;
			//console.log(Img.width)
			canvas.getContext("2d").drawImage(Img, 0, 0, canvas.width, canvas.height); //将图片绘制到canvas中
			dataURL = canvas.toDataURL('image/png'); //转换图片为dataURL
			dataImg = dataURL.replace('data:image/png;base64,', '')
			//流文件大小计算
			var strLen = dataImg.length;
			var fileSize = strLen - (strLen / 8) * 2 //图片打kb
			//console.log(fileSize)
			//控制上传图片的大小
			if(fileSize < 1048576) {

				$.ajax({
					url: service_url + "file/upload",
					type: "post",
					data: {
						baseData: dataImg,
					},
					async: false,
					success: function(data, su, http) {
						//console.log(data)
						if(http.readyState == 4 && http.status == 200) {
							mui.toast('添加成功', 500)
							var img = document.createElement('img')
							img.src = data
							console.log(data)
							console.log(data)
							img.style.width = '300px'
							img.style.height = '400px'
							var div = document.getElementById('content')
							div.style.height = 400 + div.offsetHeight + 'px'
							range.insertNode(img)

						}

					},
					error: function(html) {
						mui.alert('图片大于1M', "图片", "取消", "div")
						errorAJAX(http)
					}

				});

			} else {
				mui.alert('图片大于1M', "图片", "取消", "div")
			}

		}

	}

}

/*--------------------------------upload--- end --------------------------*/
//实时监听换行
$('#content').keyup(function() {
	//自动换行
	var off = this.offsetHeight;
	var scr = this.scrollHeight
	if(scr > off) {
		this.style.height = (off + 15) + "px"
	}
})
$('#content').click(function() {
	var span = document.getElementById('span')
	var html = '主要内容'
	try{
		if(span.innerText == html) {
		span.style.display = "none"
	}

	}catch(e){
		//TODO handle the exception
	}
	
	range = window.getSelection().getRangeAt(0); //找到焦点位置
})
$('#content').blur(function() {
	var span = document.getElementById('span')
	var texts = document.getElementById('content').innerText
	if(texts == '') {
		span.style.display = "block"
	}

})
//字体的监听
$('#content').keyup(function(event) {
	var texts = document.getElementById('content').innerHTML
	var _index__1 = -1
	var _1  = false
	var _2  = false
	var _3  = false
	var _4  = false
	
	if(texts.indexOf('# ')!=-1){
		_1 = true
		_2 = false
		_3 =false
		_4 =false
		_index__1 =  texts.indexOf('# ')
	}
	
	if(texts.indexOf('## ')!= -1){
		_1 = false
		_2 = true
		_3 =false
		_4 =false
		_index__1 = texts.indexOf('## ')
	}
	
	if(texts.indexOf('### ')!= -1){
		_1 = false
		_2 =false
		_3 =true
		_4 =false
		_index__1 = texts.indexOf('### ')
	}
	
	if(texts.indexOf('#### ')!= -1){
		_1 = false
		_2 =false
		_3 =false
		_4 =true
		_index__1 =  texts.indexOf('#### ')   
	}
	if(_index__1 != -1) { 
		var texts_sub_ = texts.substring(0,_index__1)//前面部分
		//console.log(texts_sub_)
		var texts_sub_1 = texts.substring(_index__1, texts.length)//抛出前面 截取新的
		var br_index = texts_sub_1.indexOf('<br>')//新的字符串是否出现<br>
		if(br_index!=-1){//如果出现
			var texts_sub_2 = texts_sub_1.substring(br_index,texts_sub_1.length)//后半部分
			var  text_r  //需要替换的字符串
			
			var conetent = document.getElementById('content')
			var html 
			if (_1){
				text_r =texts_sub_1.substring(1,br_index)
				 html = '<h1>'+text_r+'</h1>'
			}else if(_2){
				text_r =texts_sub_1.substring(2,br_index)
				html = '<h2>'+text_r+'</h2>'
			}else if(_3){
				text_r =texts_sub_1.substring(3,br_index)
				html = '<h3>'+text_r+'</h3>'
			}else if(_4){
				text_r =texts_sub_1.substring(4,br_index)
				html = '<h4>'+text_r+'</h4>'
			}
			conetent.innerHTML = texts_sub_+html+texts_sub_2
		}
		//如果没出现<br> 则不生效
	} else {
		//没有

	}
})
/*----------------------content----end--------------------------------*/

//查看文章
document.getElementById('personal_id').addEventListener('tap', function() {
	//添加查看文章
	var pageTo = plus.webview.getWebviewById('forum_personal.html')
	mui.fire(pageTo, 'listener_personal_id', {
		user_id: user.id
	})
	mui.openWindow({
		id: 'forum_personal.html'
	})
	

})

/*------------------------------content-----end-----------------------------------------------------*/
//返回箭头
document.getElementById('back_a').addEventListener('tap', function() {
	location.reload()
})