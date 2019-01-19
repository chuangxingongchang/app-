var service_url = "http://192.168.0.101/";
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

mui.plusReady(function() {
	var slider = mui('.mui-slider');
	slider.slider({
		interval: 2000
	});
   
	if(phoneno != null&&phoneno!="") {
		mui.ajax({
			url: service_url+'touser/getUser',
			type: 'post',
			async : false,
			data: {
				phoneno,
				phoneno
			},
			dataType: 'json',
			success: function(data) {
				if(data.scms.status==false){
					mui.alert("main获取用户失败");
				}else{
					user = data.tuser;
				}
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
				id : "../person/login.html"
			})
		})
		document.getElementById("parttp").addEventListener('tap',function(){
			mui.openWindow({
				url : "../person/login.html",
				id : "../person/login.html"
			})
		})
		document.getElementById("centertp").addEventListener('tap',function(){
			mui.openWindow({
				url : "../person/login.html",
				id : "../person/login.html"
			})
		})
		document.getElementById("jobtp").addEventListener('tap',function(){
			mui.openWindow({
				url : "../person/login.html",
				id : "../person/login.html"
			})
		})
		document.getElementById("forums").addEventListener('tap',function(){
			mui.openWindow({
				url : "../person/login.html",
				id : "../person/login.html"
			})
		})
	}
	if(user!=null&&user!=""){
		if(avatar!=null){
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
	attrJobByAccountTime();
	toPage("#specialjob","../partjob/job_details/job_one.html");
});

function attrJobByAccountTime(){
	if(schoolname!=null&&""!=schoolname){
		mui.ajax({
			url  : service_url+'plur/plurByaccountAndtimeDesc',
			type : 'post',
			data : {schoolname :schoolname},
			dataType : 'json',
			success  : function(data){
				var html = template('allJobByaccountTime',data);
				document.getElementById('specialjob').innerHTML = html;
			}
		})
	}else{
		mui.openWindow({
			url : 'error.html',
			id  : 'error.html'
		})
	}
}