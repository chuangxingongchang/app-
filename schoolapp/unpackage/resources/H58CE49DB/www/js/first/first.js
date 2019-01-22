var service_url = "106.13.35.57/myschool/";
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
		open("forums",'../forum/forum_index.html');
	}else{
		document.getElementById("persons").src = "../../image/header/header.jpg";
		open("persons",'../person/login.html');
		open("parttp",'../person/login.html');
		open("centertp",'../person/login.html');
		open("forums",'../person/login.html');
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
	
	open("jobtp",'job.html');
	open("jobmore",'job.html');
	open("activitymore",'../h_activity/activitys.html');
	open('activity', "../h_activity/activitys.html");
	if(schoolname!=null&&""!=schoolname){
		attrJobByAccountTime();
	}
	if(schoolname!=null&&""!=schoolname){
		getActivityByTime();
	}
	toPage("#specialjob","../partjob/job_details/job_one.html");
    toAcTtivity("#specialActivity","../h_activity/activitydetails.html");
	var detailPage = mui.preload({
		url : '../h_activity/activitydetails.html',
		id  : '../h_activity/activitydetails.html'
	});
	mui("#slider").on('tap','div>div',function(){
		var id   = this.getAttribute("name");
		var pagetwos = plus.webview.getWebviewById('../h_activity/activitydetails.html');
		mui.fire(pagetwos,"detailsPageEvent",{id:id});
		mui.openWindow({
			id: '../h_activity/activitydetails.html'
		});
	})
});

function attrJobByAccountTime(){
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
}
function getActivityByTime(){
		mui.ajax({
			url  : service_url+'activity/selectActivityByTimeDesc',
			type : 'post',
			async: false,
			timeout : 20000,
			data : {schoolname :schoolname},
			dataType : 'json',
			success  : function(data){
				var html = template('specialac',data);
				document.getElementById('specialActivity').innerHTML = html;
			},error  : function(timeout,xhr,type){
				mui.openWindow({
					url : 'error.html',
					id  : 'error.html'
				})
			}
		})
}