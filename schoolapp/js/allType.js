//工作类型
function addworkPicker() {
	var attWorkpick = new mui.PopPicker();
	attWorkpick.setData([{
		value: "1",
		text: '早餐派送'
	}, {
		value: "2",
		text: '图书管理'
	}, {
		value: "3",
		text: '卫生管理'
	}, {
		value: "4",
		text: '学习辅导'
	}, {
		value: "5",
		text: '论文指导'
	}, {
		value: "6",
		text: '文艺演出'
	}, {
		value: "7",
		text: '其他'
	}]);
	var showattWork = document.getElementById('attWork');
	var userResult = document.getElementById('attworkContent');
	showattWork.addEventListener('tap', function(event) {
		attWorkpick.show(function(items) {
			userResult.value = items[0].text;
		});
	}, false);
}
//时间类型
function addtimePicker() {
	var attTime = new mui.PopPicker();
	attTime.setData([{
		value: "1",
		text: '短期'
	}, {
		value: "2",
		text: '长期'
	}, {
		value: "3",
		text: '周末'
	}, {
		value: "4",
		text: '不限'
	}]);
	var attTimes = document.getElementById('attTime');
	var timeResult = document.getElementById('atttimeContent');
	attTimes.addEventListener('tap', function(event) {
		attTime.show(function(items) {
			timeResult.value = items[0].text;
			//返回 false 可以阻止选择框的关闭
			//return false;
		});
	}, false);
}
//Unit类型
function addunitPicker() {
	var attUnits = new mui.PopPicker();
	attUnits.setData([{
		value: "1",
		text: '元/时'
	}, {
		value: "2",
		text: '元/天'
	}, {
		value: "3",
		text: '元/月'
	}, {
		value: "4",
		text: '/不限'
	}]);
	var attunits = document.getElementById('attUnit');
	var unitResult = document.getElementById('attunitContent');
	attunits.addEventListener('tap', function(event) {
		attUnits.show(function(items) {
			unitResult.value = items[0].text;
		});
	}, false);
}
//结算类型
function addsettlePicker() {
	var attSettle = new mui.PopPicker();
	attSettle.setData([{
		value: "1",
		text: '当天结算'
	}, {
		value: "2",
		text: '周末结算'
	}, {
		value: "3",
		text: '月末结算'
	}, {
		value: "4",
		text: '完工结算'
	}]);
	var attSettles = document.getElementById('attSettle');
	var settleResult = document.getElementById('attsettleContent');
	attSettles.addEventListener('tap', function(event) {
		attSettle.show(function(items) {
			settleResult.value = items[0].text;
		});
	}, false);
}
