define(function(require){
	var LIB = require('lib');
	var api = require("./vuex/api");
	//右侧滑出详细页
	var tpl = require("text!./detail-xl.html");
	
	//初始化数据模型
	var newVO = function() {
		return {
            id : null,
			//角色编码
			code : null,
			//禁用标识 0未禁用，1已禁用
			disable : "0",
			//
			compId : null,
			//
			orgId : null,
			//处罚对象
			applicable : null,
			//处罚依据
			basis : null,
			//公示期限
			endDate : null,
			//处罚机关
			government : null,
			//处罚文号
			number : null,
			//处罚事由
			reason : null,
			//备注
			remark : null,
			//处罚结果
			result : null,
			//处罚决定日期
			startDate : null,
			//当前状态 1:正常,2:异议,3:撤销,10:其他
			status : null,
			//处罚类别 1:警告,2:罚款,3:没收违法所得或者没收非法财物,4:责令停产停业,5:暂扣或者吊销许可,6:暂扣或者吊销执照
			type : null,
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
				"code" : [LIB.formRuleMgr.length(100)],
				"disable" :LIB.formRuleMgr.require("状态"),
				"compId" : [LIB.formRuleMgr.require("")],
				"orgId" : [LIB.formRuleMgr.length(10)],
				"applicable" : [LIB.formRuleMgr.length(200)],
				"basis" : [LIB.formRuleMgr.length(500)],
				"endDate" : [LIB.formRuleMgr.allowStrEmpty],
				"government" : [LIB.formRuleMgr.length(500)],
				"number" : [LIB.formRuleMgr.length(200)],
				"reason" : [LIB.formRuleMgr.length(500)],
				"remark" : [LIB.formRuleMgr.length(500)],
				"result" : [LIB.formRuleMgr.length(500)],
				"startDate" : [LIB.formRuleMgr.allowStrEmpty],
				"status" : [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
				"type" : [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
	        }
		},


//无需附件上传请删除此段代码
/*
		fileModel:{
			file : {
				cfg: {
					params: {
						recordId: null,
						dataType: 'XXX1', // 文件关联的业务对象的类型标识，需要根据数据库的注释进行对应的修改
						fileType: 'XX'    // 文件类型标识，需要根据数据库的注释进行对应的修改
					},
					filters: {
						max_file_size: '10mb',
					},
				},
				data : []
			},
			pic : {
				cfg: {
					params: {
						recordId: null,
						dataType: 'XXX2', // 文件关联的业务对象的类型标识，需要根据数据库的注释进行对应的修改
						fileType: 'XX'    // 文件类型标识，需要根据数据库的注释进行对应的修改
					},
					filters: {
						max_file_size: '10mb',
						mime_types: [{title: "files", extensions: "png,jpg,jpeg"}]
					}
				},
				data : []
			},
			video : {
				cfg: {
					params: {
						recordId: null,
						dataType: 'XXX3', // 文件关联的业务对象的类型标识，需要根据数据库的注释进行对应的修改
						fileType: 'XX'    // 文件类型标识，需要根据数据库的注释进行对应的修改
					},
					filters: {
						max_file_size: '10mb',
						mime_types: [{title: "files", extensions: "mp4,avi,flv,3gp"}]
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