function errorAJAX(http) {
	if(http.timeout) {
		mui.alert('网络环境差', ' ', '确认', 'div')
	}
	if(http.status == 500) {
		mui.alert('服务器发生异常', ' ', '确认', 'div')
	}
	if(http.status == 404) {
		mui.alert('网页未找到', ' ', '确认', 'div')
	}
}