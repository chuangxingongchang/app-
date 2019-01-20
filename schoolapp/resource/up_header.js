var service_url = "http://192.168.0.101/";
var user = JSON.parse(localStorage.getItem('tuser'));
var id  = "";
mui.plusReady(function() {
	if(user!=null){
		id = user.id;
	}
	document.getElementById('userImg').addEventListener('tap', function() {
		if(mui.os.plus) {
			var a = [{
				title: '拍照'
			}, {
				title: '从手机相册选择'
			}];
			plus.nativeUI.actionSheet({
				title: '修改头像',
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
	});

	//拍照
	function getImages() {
		var mobileCamera = plus.camera.getCamera();
		mobileCamera.captureImage(function(e) {
			plus.io.resolveLocalFileSystemURL(e, function(entry) {
				var path = entry.toLocalURL() + '?version=' + new Date().getTime();
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

	//从本地相册选择
	function galleryImages() {
		console.log("你选择了从相册选择");
		plus.gallery.pick(function(a) {
			plus.io.resolveLocalFileSystemURL(a, function(entry) {
				plus.io.resolveLocalFileSystemURL('_doc/', function(root) {
					root.getFile('head.png', {}, function(file) {
						//文件已经存在
						file.remove(function() {
							console.log("文件移除成功");
							entry.copyTo(root, 'head.png', function(e) {
								var path = e.fullPath + '?version=' + new Date().getTime();
								uploadHeadImg(path);
							}, function(err) {
								console.log("copy image fail: ", err);
							});
						}, function(err) {
							console.log("删除图片失败：（" + JSON.stringify(err) + ")");
						});
					}, function(err) {
						//打开文件失败
						entry.copyTo(root, 'head.png', function(e) {
							var path = e.fullPath + '?version=' + new Date().getTime();
							uploadHeadImg(path);
						}, function(err) {

							console.log("上传图片失败：（" + JSON.stringify(err) + ")");
						});
					});
				}, function(e) {
					console.log("读取文件夹失败：（" + JSON.stringify(err) + ")");
				});
			});
		}, function(err) {
			console.log("读取拍照文件失败: ", err);
		}, {
			filter: 'image'
		});
	};

	//上传图片
	function uploadHeadImg(imgPath) {
		//选中图片之后，头像当前的照片变为选择的照片
		var mainImg = document.getElementById('userImg');
		mainImg.src = imgPath;
		var images = new Image();
		images.src = imgPath;
		if(""!=id&&id!=null){
		images.onload = function(){
			var imgData = getBase64Image(images);
			mui.ajax({
			    url: service_url+'file/upload',
				data: {
					'baseData': imgData
				},
				type: 'post', //HTTP请求类型
				timeout: 100000, //超时时间设置为10秒；
				success: function(datas) {
						if(datas != null) {
							mui.ajax({
								url : service_url+"touser/updateUser",
								type: 'post',
								data: {id :id,avatar:datas},
								dataType : 'json',
								success  : function(udata){
									if(udata.ms.status==true){
										mui.toast("图片上传成功")
									}else{
										mui.toast("图片上传失败")
									}
								}
							})
						}else{
							console.log("获取上传data图片失败")
						}
				},
				error: function(xhr, type, errorThrown) {
					if(type == 'timeout') {
						mui.alert('服务器连接超时，请稍后再试');
					}
				}
			});
		}
		}else{
						console.log("上传获取用户失败")
					}
	}

	//压缩图片转成base64
	function getBase64Image(img) {
		var canvas = document.createElement("canvas");
		var width = img.width;
		var height = img.height;
		if(width > height) {
			if(width > 100) {
				height = Math.round(height *= 100 / width);
				width = 100;
			}
		} else {
			if(height > 100) {
				width = Math.round(width *= 100 / height);
			}
			height = 100;
		}

		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, width, height);

		var dataUrl = canvas.toDataURL('image/png', 0.8);
		return dataUrl.replace('data:image/png;base64,', '');
	}
});