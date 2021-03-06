define(function(require){
	var LIB = require('lib');
	var api = require("./vuex/api");
	//右侧滑出详细页
	var tpl = require("text!./detail-tab-xl.html");
	var regulationChapterFormModal = require("componentsEx/formModal/regulationChapterFormModal");
	var regulationFormModal = require("componentsEx/formModal/regulationFormModal");
	
	//初始化数据模型
	var newVO = function() {
		return {
            id : null,
			//角色编码
			code : null,
			//文件名称
			name : null,
			//批准人
			approver : null,
			//专业审核人
			audit : null,
			//文件作者
			author : null,
			//禁用标识 0未禁用，1已禁用
			disable : "0",
			//废止信息
			annulment : null,
			//废止日期
			annulmentDate : null,
			//文件概述
			content : null,
			//实施日期
			effectiveDate : null,
			//文件级别 1:机密,2:内部公开,3:外部公开,4:其他
			fileLevel : null,
			//文件类型 1:管理手册,2:管理程序,3:操作规程,4:作业指导书,5:其他
			fileType : null,
			//是否是已修订 0:不是,1:是(页面只显示未修订的)
			isRevise : null,
			//文件时效 1:现行,2:废止,3:即将实施
			limitation : null,
			//管理要素 1:目标职责,2:制度化管理,3教育培训,4:现场管理,5:安全风险管控和隐患排查治理,6:应急管理,7:事故管理,8:持续改进,9:其他
			manageElement : null,
			//管理范围 1:职业健康(H),2:安全生产(S),3:社会治安(S),4:环境保护(E),5:社会责任(SP),6:其他
			manageScope : null,
			//管理部门
			managerOrg : null,
			//文件编号
			number : null,
			//发布日期
			publishDate : null,
			//修订信息
			revise : null,
			//归口部门
			underOrg : null,
			//章节
			regulationChapters : [],
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
				"name" : [LIB.formRuleMgr.require("文件名称"),
						  LIB.formRuleMgr.length(100)
				],
				"approver" : [LIB.formRuleMgr.require("批准人"),
						  LIB.formRuleMgr.length(100)
				],
				"audit" : [LIB.formRuleMgr.require("专业审核人"),
						  LIB.formRuleMgr.length(100)
				],
				"author" : [LIB.formRuleMgr.require("文件作者"),
						  LIB.formRuleMgr.length(100)
				],
				"disable" :LIB.formRuleMgr.require("状态"),
				"annulment" : [LIB.formRuleMgr.length(500)],
				"annulmentDate" : [LIB.formRuleMgr.allowStrEmpty],
				"content" : [LIB.formRuleMgr.length(500)],
				"effectiveDate" : [LIB.formRuleMgr.allowStrEmpty],
				"fileLevel" : [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
				"fileType" : [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
				"isRevise" : [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
				"limitation" : [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
				"manageElement" : [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
				"manageScope" : [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
				"managerOrg" : [LIB.formRuleMgr.length(100)],
				"number" : [LIB.formRuleMgr.length(100)],
				"publishDate" : [LIB.formRuleMgr.allowStrEmpty],
				"revise" : [LIB.formRuleMgr.length(500)],
				"underOrg" : [LIB.formRuleMgr.length(100)],
	        }
		},
		tableModel : {
			regulationChapterTableModel : LIB.Opts.extendDetailTableOpt({
				url : "regulation/regulationchapters/list/{curPage}/{pageSize}?criteria.orderValue.fieldName=orderNo&criteria.orderValue.orderType=0",
				columns : [
					LIB.tableMgr.ksColumn.code,
				{
					title : "名称",
					fieldName : "name",
					keywordFilterName: "criteria.strValue.keyWordValue_name"
				},{
					title : "",
					fieldType : "tool",
					toolType : "move,edit,del"
				}]
			}),
		},
		formModel : {
			regulationChapterFormModel : {
				show : false,
				hiddenFields : ["regulationId"],
				queryUrl : "regulation/{id}/regulationchapter/{regulationChapterId}"
			},
			regulationFormModel : {
				show : false,
				queryUrl : "regulation/{id}"
			}
		},
		cardModel : {
			regulationChapterCardModel : {
				showContent : true
			},
		},
		selectModel : {
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
			beforeInit 			//初始化之前回调
			afterInit			//初始化之后回调
			afterInitData		//请求 查询 接口后回调
			afterInitFileData   //请求 查询文件列表 接口后回调
			beforeDoSave		//请求 新增/更新 接口前回调，返回false时不进行保存操作
			afterFormValidate	//表单rule的校验通过后回调，，返回false时不进行保存操作
			buildSaveData		//请求 新增/更新 接口前回调，重新构造接口的参数
			afterDoSave			//请求 新增/更新 接口后回调
			beforeDoDelete		//请求 删除 接口前回调
			afterDoDelete		//请求 删除 接口后回调
		 events
		 vue组件声明周期方法
		 init/created/beforeCompile/compiled/ready/attached/detached/beforeDestroy/destroyed
	 **/
	var detail = LIB.Vue.extend({
		mixins : [LIB.VueMixin.dataDic,LIB.VueMixin.auth,LIB.VueMixin.detailTabXlPanel],
		template: tpl,
		components : {
			"regulationchapterFormModal":regulationChapterFormModal,
			"regulationFormModal":regulationFormModal,
			
        },
		data:function(){
			return dataModel;
		},
		methods:{
			newVO : newVO,
			doShowRegulationChapterFormModal4Update : function(param) {
				this.formModel.regulationChapterFormModel.show = true;
				this.$refs.regulationchapterFormModal.init("update", {id: this.mainModel.vo.id, regulationChapterId: param.entry.data.id});
			},
			doShowRegulationChapterFormModal4Create : function(param) {
				this.formModel.regulationChapterFormModel.show = true;
				this.$refs.regulationchapterFormModal.init("create");
			},
			doSaveRegulationChapter : function(data) {
				if (data) {
					var _this = this;
					api.saveRegulationChapter({id : this.mainModel.vo.id}, data).then(function() {
						_this.refreshTableData(_this.$refs.regulationchapterTable);
					});
				}
			},
			doUpdateRegulationChapter : function(data) {
				if (data) {
					var _this = this;
					api.updateRegulationChapter({id : this.mainModel.vo.id}, data).then(function() {
						_this.refreshTableData(_this.$refs.regulationchapterTable);
					});
				}
			},
			doRemoveRegulationChapter : function(item) {
				var _this = this;
				var data = item.entry.data;
				LIB.Modal.confirm({
					title: '删除当前数据?',
					onOk: function () {
						api.removeRegulationChapters({id : _this.mainModel.vo.id}, [{id : data.id}]).then(function() {
							_this.$refs.regulationchapterTable.doRefresh();
						});
					}
				});
			},
			doMoveRegulationChapter : function(item) {
				var _this = this;
				var data = item.entry.data;
				var param = {
					id : data.id,
					regulationId : dataModel.mainModel.vo.id
				};
				_.set(param, "criteria.intValue.offset", item.offset);
				api.moveRegulationChapters({id : this.mainModel.vo.id}, param).then(function() {
					_this.$refs.regulationchapterTable.doRefresh();
				});
			},
			doShowRegulationFormModal4Update : function(data) {
				this.formModel.regulationFormModel.show = true;
				this.$refs.regulationFormModal.init("update", {id: this.mainModel.vo.id});
			},
			doUpdateRegulation : function(data) {
				this.doUpdate(data);
			},
			afterInitData : function() {
				this.$refs.regulationchapterTable.doQuery({id : this.mainModel.vo.id});
			},
			beforeInit : function() {
				this.$refs.regulationchapterTable.doClearData();
			},

		},
		events : {
		},
    	init: function(){
        	this.$api = api;
        }
	});

	return detail;
});