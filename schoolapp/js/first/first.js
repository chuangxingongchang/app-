var service_url = "http://172.19.129.1/";
var schoolname = "";
var user = "";
var phoneno = "";
var avatar  = "";
if(localStorage.getItem("schoolname")!=null){
	   schoolname = localStorage.getItem("schoolname");
   }
if(localStorage.getItem('phone')!=null){
	    phoneno = localStorage.getItem('phone');
 }
var logPage = null;
mui.plusReady(function() {
	logPage = mui.preload({
		url : "../person/login.html",
		id : "../person/login.html"
	})
	var slider = mui('.mui-slider');
	slider.slider({
		interval: 2000
	});
	
	if(phoneno != null&&phoneno!="") {
		mui.ajax({
			url: service_url+'touser/getUser',
			type: 'post',
			async : false,
			timeout : 10000,
			data: {
				phoneno,
				phoneno
			},
			dataType: 'json',
			success: function(data) {
				if(data.scms.status==false){
					mui.openWindow({
						url : 'error.html',
						id  : 'error.html'
					})
				}else{
					user = data.tuser;
				}
			},error  : function(timeout,xhr,type){
				mui.openWindow({
					url : 'error.html',
					id  : 'error.html'
				})
			}
		})
		open("parttp",'part.html');
		open("centertp",'centero.html');
		open("jobtp",'job.html');
		open("forums",'../forum/forum_index.html');
	}else{
		document.getElementById("persons").src = "../../image/header/header.jpg";
		document.getElementById("persons").addEventListener('tap',function(){
			mui.openWindow({
				url : "../person/login.html",
				id : "goback",
				createNew: true,
				waiting: {
					autoShow: true,
					titile: '正在加载...'
				}
			})
		})
		document.getElementById("parttp").addEventListener('tap',function(){
			mui.openWindow({
				url : "../person/login.html",
				id : "goback",
				createNew: true,
				waiting: {
					autoShow: true,
					titile: '正在加载...'
				}
			})
		})
		document.getElementById("centertp").addEventListener('tap',function(){
			mui.openWindow({
				url : "../person/login.html",
				id : "goback",createNew: true,
					waiting: {
						autoShow: true,
						titile: '正在加载...'
					}
			})
		})
		document.getElementById("jobtp").addEventListener('tap',function(){
			mui.openWindow({
				url : "../person/login.html",
				id : "goback",
				createNew: true,
					waiting: {
						autoShow: true,
						titile  : '正在加载...'
					}
			})
		})
		document.getElementById("forums").addEventListener('tap',function(){
			mui.openWindow({ 
				url : "../person/login.html",
				id : "goback",
				createNew: true,
					waiting: {
						autoShow: true,
						titile: '正在加载...'
					}
			})
		})
	}

	if(user!=null&&user!=""){
		if(user.avatar!=null){
			avatar = user.avatar;
		}
		if(avatar!=null&&""!=avatar){
			document.getElementById("persons").src = avatar;
		}else{
			document.getElementById("persons").src = "../../image/percenter/imgno.png";
		}
	}
	if(user!=null){
		phoneno = user.phoneno;
		avatar  = user.avatar ;
	}
	
	
	open("jobmore",'job.html');
	open("activitymore",'../h_activity/activitys.html');
	if(schoolname!=null&&""!=schoolname){
		attrJobByAccountTime();
	}
	toPage("#specialjob","../partjob/job_details/job_one.html");
});

function attrJobByAccountTime(){
	if(schoolname!=null&&""!=schoolname){
		mui.ajax({
			url  : service_url+'plur/plurByaccountAndtimeDesc',
			type : 'post',
			async: false,
			timeout : 20000,
			data : {schoolname :schoolname},
			dataType : 'json',
			success  : function(data){
				var html = template('allJobByaccountTime',data);
				document.getElementById('specialjob').innerHTML = html;
			},error  : function(timeout,xhr,type){
				mui.openWindow({
					url : 'error.html',
					id  : 'error.html'
				})
			}
		})
	}else{
		mui.openWindow({
			url : 'error.html',
			id  : 'error.html'
		})
	}
}