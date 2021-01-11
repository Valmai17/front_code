define(function(require){
    var LIB = require("lib");
	var customActions = {
		//受检项-公司-日期范围-不合格项-绝对值
		invalidCompAbs : {method: 'GET', url: 'rpt/stats/checkitem/invalid/comp/all'},
		//受检项-公司-日期范围-不合格项-平均值
		invalidCompAvg: {method: 'GET', url: 'rpt/stats/checkitem/invalid/comp/avg'},
		//受检项-公司-日期范围-不合格项-趋势
		invalidCompTrend: {method: 'GET', url: 'rpt/stats/checkitem/invalid/comp/all/trend'},
		//受检项-公司-日期范围-合格率-绝对值、平均值
		passrateCompAbs : {method: 'GET', url: 'rpt/stats/checkitem/passrate/comp/all'},
		//受检项-公司-日期范围-合格率-趋势
		passrateCompTrend: {method: 'GET', url: 'rpt/stats/checkitem/passrate/comp/all/trend'},


		//受检项-部门-日期范围-不合格项-绝对值
		invalidDepAbs : {method: 'GET', url: 'rpt/stats/checkitem/invalid/dep/all'},
		//受检项-部门-日期范围-不合格项-平均值
		invalidDepAvg: {method: 'GET', url: 'rpt/stats/checkitem/invalid/dep/avg'},
		//受检项-部门-日期范围-不合格项-趋势
		invalidDepTrend: {method: 'GET', url: 'rpt/stats/checkitem/invalid/dep/all/trend'},
		//受检项-部门-日期范围-合格率-绝对值、平均值
		passrateDepAbs : {method: 'GET', url: 'rpt/stats/checkitem/passrate/dep/all'},
		//受检项-部门-日期范围-合格率-趋势
		passrateDepTrend: {method: 'GET', url: 'rpt/stats/checkitem/passrate/dep/all/trend'},


		//受检项-设备设施-日期范围-不合格项-绝对值
		invalidEquipAbs: {method: 'GET', url: 'rpt/stats/checkitem/invalid/equip/all'},
		//受检项-设备设施-日期范围-不合格项-平均
		invalidEquipAvg: {method: 'GET', url: 'rpt/stats/checkitem/invalid/equip/avg'},
		//受检项-设备设施-日期范围-不合格项-趋势
		invalidEquipTrend: {method: 'GET', url: 'rpt/stats/checkitem/invalid/equip/all/trend'},
		//受检项-设备设施-日期范围-合格率-绝对值、平均值
		passrateEquipAbs : {method: 'GET', url: 'rpt/stats/checkitem/passrate/equip/all'},
		//受检项-设备设施-日期范围-合格率-趋势
		passrateEquipTrend: {method: 'GET', url: 'rpt/stats/checkitem/passrate/equip/all/trend'}
	};
	var resource = LIB.Vue.resource(null,{}, customActions);
    return resource;
});