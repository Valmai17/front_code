define(function(require){
	var LIB = require('lib');
	var api = require("./vuex/api");
	//右侧滑出详细页
	var tpl = require("text!./detail-xl.html");
	
	//初始化数据模型
	var newVO = function() {
		return {
            id : null,
			//编码
			code : null,
			//巡检结果名称
			name : null,
			//禁用标识 0:未禁用,1:已禁用
			disable : null,
			standard: null,
			chemicalName: null,
			enName: null,
			category: null,
			latentNo: null,
			toxic: null,
			sortNo: null,
			useAt: null,
			storeAt: null,
			storeUnit: null,
			maxStore: null,
			capacity: null,
			package: null,
			danger: null,
			registerNo: null,
			registerDate: null,
            orgId: null
		}
	};
	//Vue数据
	var dataModel = {
		mainModel : {
			vo : newVO(),
			opType : 'view',
			isReadOnly : true,
			title:"",
			
			//验证规则
	        rules:{
				"name" : [LIB.formRuleMgr.require("化学品名称"),
						  LIB.formRuleMgr.length()
				],
				"sortNo" :[LIB.formRuleMgr.require("状态")],
				"standard" : [LIB.formRuleMgr.require("是否正确")],
				"useAt" : [LIB.formRuleMgr.require("生产或使用地点")],
                "storeAt" : [LIB.formRuleMgr.require("储存地点")],

                "storeUnit" : [LIB.formRuleMgr.require("储量单位")],
                "maxStore" : [LIB.formRuleMgr.require("最大储量")],
                "capacity" : [LIB.formRuleMgr.require("生产能力")],
                "package" : [LIB.formRuleMgr.require("包装类别")],
                "danger" : [LIB.formRuleMgr.require("构成最大危险源")],
                "registerNo" : [LIB.formRuleMgr.require("登记号")],
                "registerDate" : [LIB.formRuleMgr.require("登记日期")],
                "orgId" : [LIB.formRuleMgr.require("登记部门")]
            }
		},

        //无需附件上传请删除此段代码
		/*
		fileModel:{
			default : {
				cfg: {
					params: {
						recordId: null,
						dataType: 'XXX1', // 文件关联的业务对象的类型标识，需要根据数据库的注释进行对应的修改
						fileType: 'XX'    // 文件类型标识，需要根据数据库的注释进行对应的修改
					}
				},
				data : []
			}
		}
		*/
	};
	//Vue组件
	/**
	 *  请统一使用以下顺序配置Vue参数，方便codeview
	 *	 el
		 template
		 components
		 componentName
		 props
		 data
		 computed
		 watch
		 methods
			 _XXX    			//内部方法
			 doXXX 				//事件响应方法
			 beforeInit 		//初始化之前回调
			 afterInit			//初始化之后回调
			 afterInitData		//请求 查询 接口后回调
			 afterInitFileData  //请求 查询文件列表 接口后回调
			 beforeDoSave		//请求 新增/更新 接口前回调，返回false时不进行保存操作
			 afterFormValidate	//表单rule的校验通过后回调，，返回false时不进行保存操作
			 buildSaveData		//请求 新增/更新 接口前回调，重新构造接口的参数
			 afterDoSave		//请求 新增/更新 接口后回调
			 beforeDoDelete		//请求 删除 接口前回调
			 afterDoDelete		//请求 删除 接口后回调
		 events
		 vue组件声明周期方法
		 init/created/beforeCompile/compiled/ready/attached/detached/beforeDestroy/destroyed
	 **/
	var detail = LIB.Vue.extend({
		mixins : [LIB.VueMixin.dataDic,LIB.VueMixin.auth,LIB.VueMixin.detailPanel],
		template: tpl,
		components : {
			
        },
		data:function(){
			return dataModel;
		},
		methods:{
			newVO : newVO,

		},
		events : {
		},
    	init: function(){
        	this.$api = api;
        }
	});

	return detail;
});