define(function(require){
	var LIB = require('lib');
	var api = require("./vuex/api");
	//右侧滑出详细页
	var tpl = require("text!./detail-xl.html");
	var checkBasisTypeSelectModal = require("componentsEx/selectTableModal/checkBasisTypeSelectModal");
	
	//初始化数据模型
	var newVO = function() {
		return {
			//ID
			id : null,
			//
			code : null,
			//章节名称
			name : null,
			//
			compId : null,
			//组织id
			orgId : null,
			//内容
			content : null,
			//是否禁用，0启用，1禁用
			disable : null,
			//修改日期
			modifyDate : null,
			//创建日期
			createDate : null,
			//检查依据分类
			checkBasisType : {id:'', name:''},
		}
	};
	//Vue数据
	var dataModel = {
		mainModel : {
			vo : newVO(),
			opType : 'view',
			isReadOnly : true,
			title:"",
			showCheckBasisTypeSelectModal : false,
			
			//验证规则
	        rules:{
	        	//"code":[LIB.formRuleMgr.require("编码")]
				"code" : [LIB.formRuleMgr.require(""),
						  LIB.formRuleMgr.length()
				],
				"name" : [LIB.formRuleMgr.require("章节名称"),
						  LIB.formRuleMgr.length()
				],
				"content" : [LIB.formRuleMgr.length()],
				"disable" : [LIB.formRuleMgr.length()],
				"modifyDate" : [LIB.formRuleMgr.length()],
				"createDate" : [LIB.formRuleMgr.length()],	
	        },
	        emptyRules:{}
		},
		tableModel : {
		},
		formModel : {
		},
		cardModel : {
		},

	};
	//Vue组件
	/**
	 *  请统一使用以下顺序配置Vue参数，方便codeview
	 *	el
	 template
	 components
	 componentName
	 props
	 data
	 computed
	 watch
	 methods
	 events
	 vue组件声明周期方法
	 created/beforeCompile/compiled/ready/attached/detached/beforeDestroy/destroyed
	 **/
	var detail = LIB.Vue.extend({
		mixins : [LIB.VueMixin.dataDic,LIB.VueMixin.auth,LIB.VueMixin.detailPanel],
		template: tpl,
		components : {
			"checkbasistypeSelectModal":checkBasisTypeSelectModal,
			
        },
		data:function(){
			return dataModel;
		},
		methods:{
			newVO : newVO,
			doSaveCheckBasisType : function(selectedDatas) {
				if (selectedDatas) {
					this.mainModel.vo.checkBasisType = selectedDatas[0];
				}
			},

		},
		events : {
		},
        ready: function(){
        	this.$api = api;
        }
	});

	return detail;
});