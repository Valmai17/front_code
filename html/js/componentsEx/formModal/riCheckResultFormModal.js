define(function(require){
	var LIB = require('lib');
 	//数据模型
	var tpl = require("text!./riCheckResultFormModal.html");

	//初始化数据模型
	var newVO = function() {
		return {
			//编码
			code : null,
			//巡检结果名称
			name : null,
			//禁用标识 0:未禁用,1:已禁用
			disable : null,
			//是否正确 0:错误,1:正确
			isRight : null,
			//是否默认选项 0:否,1:是
			isDefault : null,
			//序号
			orderNo : null,
			//修改日期
			modifyDate : null,
			//创建日期
			createDate : null,
		}
	};

	//Vue数据
	var dataModel = {
		mainModel : {
			vo : newVO(),
			opType : 'create',
			isReadOnly : false,
			title:"添加",

			//验证规则
	        rules:{
	        	//"code":[LIB.formRuleMgr.require("编码")]
				"code" : [LIB.formRuleMgr.length()],
				"name" : [LIB.formRuleMgr.require("巡检结果名称"),
						  LIB.formRuleMgr.length()
				],
				"disable" : LIB.formRuleMgr.range(1, 100).concat(LIB.formRuleMgr.require("状态")),
				"isRight" : LIB.formRuleMgr.range(1, 100).concat(LIB.formRuleMgr.require("是否正确")),
				"isDefault" : LIB.formRuleMgr.range(1, 100),
				"orderNo" : LIB.formRuleMgr.range(1, 100),	
	        },
	        emptyRules:{}
		},

	};
	
	var detail = LIB.Vue.extend({
		mixins : [LIB.VueMixin.dataDic, LIB.VueMixin.formModal],
		template: tpl,
		components : {
			
		},
		data:function(){
			return dataModel;
		},
		methods:{
			newVO : newVO,
			
		}
	});
	
	return detail;
});