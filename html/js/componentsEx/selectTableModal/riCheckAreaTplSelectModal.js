define(function(require) {

	var LIB = require('lib');
	
	var initDataModel = function () {
        return {
        	mainModel:{
				title:"选择",
				selectedDatas:[]
			},
            tableModel: (
	            {
	                url: "richeckareatpl/list{/curPage}{/pageSize}",
	                selectedDatas: [],
	                columns: [
					 LIB.tableMgr.ksColumn.cb,
					 LIB.tableMgr.ksColumn.code,
					{
						//巡检区域名称
						title: "巡检区域名称",
						fieldName: "name",
						keywordFilterName: "criteria.strValue.keyWordValue_name",
					},
					 LIB.tableMgr.ksColumn.company,
//					 LIB.tableMgr.ksColumn.dept,
					{
						title: "属地",
						fieldName: "dominationArea.name",
						keywordFilterName: "criteria.strValue.keyWordValue_dominationArea_name"
					},
//					{
//						//备注
//						title: "备注",
//						fieldName: "remarks",
//						keywordFilterName: "criteria.strValue.keyWordValue_remarks",
//					},
//					 LIB.tableMgr.ksColumn.modifyDate,
////					 LIB.tableMgr.ksColumn.createDate,
//
	                ],

	                defaultFilterValue : {
	                	"criteria.orderValue" : {fieldName : "modifyDate", orderType : "1"},
						"disable" : 0
	                },
	                resetTriggerFlag:false
	            }
            )
        };
    }
	
	var opts = {
		mixins : [LIB.VueMixin.selectorTableModal],
		data:function(){
			var data = initDataModel();
			return data;
		},
		name:"riCheckAreaTplSelectTableModal"
	};
	
	var component = LIB.Vue.extend(opts);
	return component;
});