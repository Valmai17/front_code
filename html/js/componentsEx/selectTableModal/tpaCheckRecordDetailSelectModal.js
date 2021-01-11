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
	                url: "tpacheckrecorddetail/list{/curPage}{/pageSize}",
	                selectedDatas: [],
	                columns: [{
	                    title: "",
	                    fieldName: "id",
	                    fieldType: "cb",
	                }, 
					{
						//编码
						title: "编码",
						fieldName: "code",
					},
					{
						//检查结果 0:不合格,1:合格,2:不涉及
						title: "检查结果",
						fieldName: "checkResult",
					},
					{
						//是否禁用 0启用,1禁用
						title: "是否禁用",
						fieldName: "disable",
					},
//					{
//						//
//						title: "",
//						fieldName: "groupName",
//					},
//					{
//						//组排序
//						title: "组排序",
//						fieldName: "groupOrderNo",
//					},
//					{
//						//是否现场立即整改 0否,1是
//						title: "是否现场立即整改",
//						fieldName: "isRectification",
//					},
//					{
//						//是否被分享 0:未分享,1:已分享
//						title: "是否被分享",
//						fieldName: "isShared",
//					},
//					{
//						//项排序
//						title: "项排序",
//						fieldName: "itemOrderNo",
//					},
//					{
//						//问题描述
//						title: "问题描述",
//						fieldName: "problem",
//					},
//					{
//						//是否立即整改 0-是,1-否
//						title: "是否立即整改",
//						fieldName: "reformType",
//					},
//					{
//						//备注(临时控制措施)
//						title: "备注(临时控制措施)",
//						fieldName: "remark",
//					},
//					{
//						//分享范围
//						title: "分享范围",
//						fieldName: "shareScope",
//					},
//					{
//						//分享类型 文字:1006,图片:1007,视频:1008
//						title: "分享类型",
//						fieldName: "shareType",
//					},
//					{
//						//修改日期
//						title: "修改日期",
//						fieldName: "modifyDate",
//					},
//					{
//						//创建日期
//						title: "创建日期",
//						fieldName: "createDate",
//					},
	                ],

	                defaultFilterValue : {"criteria.orderValue" : {fieldName : "modifyDate", orderType : "1"}},
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
		name:"tpaCheckRecordDetailSelectTableModal"
	};
	
	var component = LIB.Vue.extend(opts);
	return component;
//	var component = LIB.Vue.extend(opts);
//	LIB.Vue.component('checkplan-select-modal', component);
});