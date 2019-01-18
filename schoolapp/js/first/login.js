mui.plusReady(function(){
	open('reg',"register.html");
	open('forgetPassword',"forget.html");
	
})
function myLogin(){
	
	mui.ajax({
		url  : 'http://172.19.129.6:86/touser/logins',
		type : 'post',
		async : false,
		timeout : 10000,
		dataType : 'json',
		data  : {phoneno:mui("#phoneno")[0].value,pword:mui("#password")[0].value},
		success : function(data){
			if(!data.ms.status){
				mui.alert(data.ms.msg);
			}else{
				if(phoneno != null) {
					mui.ajax({
						url: 'http://172.19.129.6:86/touser/getUser',
						type: 'post',
						async : false,
						data: {
							phoneno:
							mui("#phoneno")[0].value
						},
						dataType: 'json',
						success: function(data) {
							if(data.scms.status==false){
								mui.alert("获取第一页用户失败");
							}else{
								var tuser = JSON.stringify(data.tuser);
								localStorage.setItem('phone',data.tuser.phoneno);
								localStorage.setItem('tuser',tuser);
								plus.webview.create('../zmain/first.html').show();
							}
						}
					})
				}
			}
		},error : function(timeout,xhr,type,errorThrown){
			mui.openWindow({
				url : '../zmain/error.html',
				id  : '../zmain/error.html'
			})
		}
	})
}
