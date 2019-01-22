var idnum = "";
var service_url = "106.13.35.57/myschool/";
mui.plusReady(function(){
	window.addEventListener("detailsPageEvent", function(e) {
		//从当前的父页面li标签get id
		idnum = e.detail.id;
		
		if(idnum!=null&&""!=idnum){
			mui.ajax({
				type: "post",
				url: service_url + "activity/getthisActivity",
				data: {
					id: idnum
				},
				dataType: "json",
				async: false,
				success: function(data) {
					if(data.aums.status==true){
						var html = template('tpl',data);
						document.getElementById('tpl_html').innerHTML = html;
					}else{
						mui.openWindow({
							url : 'error.html',
							id  : 'error.html'
						})
					}
				}
			});
		}else{
			mui.openWindow({
				url : 'error.html',
				id  : 'error.html'
			})
		}
	});
})
