
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
	var worktype = document.getElementById('worktype');
	worktype.addEventListener('tap', function(event) {
		attWorkpick.show(function(items) {
			worktype.value = items[0].text;
			workId   = items[0].value;
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
	var attTimes = document.getElementById('timetype');
	attTimes.addEventListener('tap', function(event) {
		attTime.show(function(items) {
			attTimes.value = items[0].text;
			timeid  = items[0].value;
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
	var attunits = document.getElementById('moneyday');
	attunits.addEventListener('tap', function(event) {
		attUnits.show(function(items) {
			attunits.value = items[0].text;
			moneyid = items[0].value;
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
	var attSettles = document.getElementById('settles');
	attSettles.addEventListener('tap', function(event) {
		attSettle.show(function(items) {
			attSettles.value = items[0].text;
			settleid  = items[0].value;
		});
	}, false);
}
