define(function (require) {
    var LIB = require('lib');
    var api = require("./vuex/api");
    //右侧滑出详细页
    var tpl = require("text!./detail-xl.html");
    var userSelectModal = require("componentsEx/selectTableModal/userSelectModal");
    var multiInputSelect = require("componentsEx/multiInputSelector/main");

    LIB.registerDataDic("bgfw", [
        ["1", "永久变更"],
        ["2", "紧急变更"],
        ["3", "临时变更"]
    ]);

    LIB.registerDataDic("smoc_pass_opinion_result", [
        ["0", "-"],
        ["1", "通过"],
        ["2", "不通过"]
    ]);

    LIB.registerDataDic("smoc_pass_opinion_type", [
        ["1", "审批"],
        ["2", "评估"],
        ["3", "验收"]
    ]);
    //初始化数据模型
    var newVO = function () {
        return {
            id: null,
            //编码
            code: null,
            //变更性质 0:增加,1:删减,2:更改
            nature: null,
            //地点
            position: null,
            //项目名称
            name: null,
            //禁用标识 0:未禁用,1:已禁用
            disable: "0",
            //公司id
            compId: null,
            //部门id
            orgId: null,
            //变更类型 0:设备设施,1:原料,2:作业方式,3:技术工艺,4:其他
            changeMode: null,
            //变更期限
            deadLine: null,
            //变更结束时间
            endTime: null,
            //变更说明
            illustrate: null,
            //备注
            remark: null,
            //变更范围 0:永久变更,1:紧急变更,2:临时变更
            scope: null,
            //变更开始时间
            startTime: null,
            //状态 0:申请待提交,1:待评估,2待审批,3:待实施,4:培训,5:待验收,6:已完成
            status: '0',
            //流程意见记录
            cultivateRecords: [],
            //流程意见记录
            passOpinions: [],
            //风险辨识组
            riskItemGroups: [],
            applicant: {},
            //实施人
            handlers: [],
            //审批人
            approvers: [],
            //评估人
            assessors: [],
            //培训人
            trainers: [],
            //验收人
            acceptors: [],
            smocTemplate:null
        }
    };
    //Vue数据
    var dataModel = {
        mainModel: {
            vo: newVO(),
            opType: 'view',
            isReadOnly: true,
            title: "",

            //验证规则
            rules: {
                "code": [LIB.formRuleMgr.length(100)],
                "nature": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.require("变更性质")),
                "position": [LIB.formRuleMgr.require("地点"),
                LIB.formRuleMgr.length(255)
                ],
                "name": [LIB.formRuleMgr.require("项目名称"),
                LIB.formRuleMgr.length(255)
                ],
                "disable": LIB.formRuleMgr.require("状态"),
                "compId": [LIB.formRuleMgr.require("公司")],
                "orgId": [LIB.formRuleMgr.length(10)],
                "changeMode": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),

                "endTime": [LIB.formRuleMgr.allowStrEmpty],
                "illustrate": [LIB.formRuleMgr.length(1000)],
                "remark": [LIB.formRuleMgr.length(1000)],
                "scope": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "startTime": [LIB.formRuleMgr.allowStrEmpty],
                "status": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "deadLine": [{
                    validator: function (rule, val, callback) {
                        var vo = dataModel.mainModel.vo;
                        if (_.isEmpty(vo.scope)) {
                            callback(new Error("请填写变更期限"))
                        } else if (vo.scope != '0') {
                            if (_.isEmpty(vo.deadLine)) {
                                callback(new Error("请填写期限时间"))
                            } else {
                                callback()
                            }
                        } else {
                            vo.deadLine = null;
                            _.set(vo, 'criteria.strValue.deadLine', 0);
                            // vo['criteria.strValue.changeDeadline_empty']= 1
                            callback()
                        }
                    }
                }],
                'applicant.id': LIB.formRuleMgr.require("申请人"),
                'approvers': [{
                    validator: function (rule, val, callback) {
                        var vo = dataModel.mainModel.vo;

                        if (vo.approvers.length == 0) {
                            callback(new Error("请选择审批人"))
                        } else {
                            callback()
                        }

                    }
                }],
            },
            activeTabName: '1',
            pgyjValues: [],
            groups2: []
        },
        tableModel: {

            checkBasisTableModel: LIB.Opts.extendDetailTableOpt({

                columns: [
                    {
                        title: "风险项",
                        fieldName: "name",
                        width: 400
                    },
                    {
                        title: "辨识结果",
                        fieldName: "result",
                        fieldType: "custom",
                        renderClass: 'text-center',
                        showTip: false,
                        render: function (data) {
                            if (data.result == 1) {
                                return '<label  class="ivu-checkbox-wrapper result1"><span class="ivu-checkbox ivu-checkbox-checked result1" ><span class="ivu-checkbox-inner result1"></span></span><span></span>是</label><label class="ivu-checkbox-wrapper result2"><span class="ivu-checkbox result2"><span class="ivu-checkbox-inner result2"></span></span><span></span>否</label>'
                            } else if (data.result == 0) {
                                return '<label class="ivu-checkbox-wrapper result1"><span class="ivu-checkbox result1"><span class="ivu-checkbox-inner result1"></span></span><span></span>是</label><label class="ivu-checkbox-wrapper result2"><span class="ivu-checkbox result2"><span class="ivu-checkbox-inner result2"></span></span><span></span>否</label>';
                            } else if (data.result == 2) {
                                return '<label class="ivu-checkbox-wrapper result1"><span class="ivu-checkbox result1"><span class="ivu-checkbox-inner result1"></span></span><span></span>是</label><label class="ivu-checkbox-wrapper result2"><span class="ivu-checkbox ivu-checkbox-checked result2" ><span class="ivu-checkbox-inner result2" style="background:red;border-color:red"></span></span><span></span>否</label>'
                            }
                        },
                        width: 120
                    },
                    {
                        title: "控制措施",
                        fieldName: "measure",
                    },
                    {
                        title: "落实人",
                        fieldName: "handler.name",
                        width: 100
                    },
                
                    
                ]
            }),
            //评估
            pgyjModel: LIB.Opts.extendDetailTableOpt({
                url: "changemanagement/passopinions/list/1/2000",
                columns: [
                    // LIB.tableMgr.ksColumn.code,
                    {
                        title: "评估部门",
                        render: function (data) {
                            if (data.handler) {
                                return LIB.tableMgr.rebuildOrgName(data.handler.orgId, 'dept');
                            }

                        },
                    },
                    {
                        title: "评估人",
                        fieldName: "handler.name",
                        width: 100
                    },
                    {
                        //结果 0:未辨识,1:通过,2:不通过
                        title: "审批结果",
                        fieldName: "result",

                        render: function (data) {
                            if (data.attr5) {
                                return LIB.getDataDic("smoc_pass_opinion_result", data.attr5);
                            }else{
                                return LIB.getDataDic("smoc_pass_opinion_result", data.result);
                            }
                        }
                    },
                    {
                        title: "评估意见内容",
                        fieldName: "opinion",
                    },
                
                ],
                defaultFilterValue: { 'criteria.intsValue': { type: [2] } }
            }),
            //验收
            ssjlModel: LIB.Opts.extendDetailTableOpt({
                // url : "testequipment/checkbases/list/{curPage}/{pageSize}",
                columns: [
                    // LIB.tableMgr.ksColumn.code,

                    {
                        title: "风险项",
                        fieldName: "mocRiskItem",
                        width: 400
                    },

                    {
                        title: "控制措施",
                        fieldName: "mocRiskHandle",
                    },

                    {
                        title: "落实情况",
                        fieldName: "pgyj",
                    },
                    {
                        title: "落实人",
                        fieldName: "pgyj",
                        width: 100
                    },

                ]
            }),

            //培训
            pxjlModel: LIB.Opts.extendDetailTableOpt({
                // url : "testequipment/checkbases/list/{curPage}/{pageSize}",
                columns: [
                    // LIB.tableMgr.ksColumn.code,
                    {
                        title: "姓名",
                        fieldName: "pgbm",
                    },
                    {
                        title: "所属部门",
                        fieldName: "pgyj",
                    },
                    {
                        title: "培训日期",
                        fieldName: "pgyj",
                    },
                    {
                        title: "培训结果",
                        fieldName: "pgyj",
                    },
                   ]
            }),
            //审批
            spyjModel: LIB.Opts.extendDetailTableOpt({
                url: "changemanagement/passopinions/list/1/2000",
                columns: [
                    // LIB.tableMgr.ksColumn.code,
                    {
                        title: "审批人",
                        fieldName: "handler.name",
                        width: 100
                    },
                    _.extend(_.clone(LIB.tableMgr.column.modifyDate), { title: '审批时间', filterType: null }),
                    {
                        //结果 0:未辨识,1:通过,2:不通过
                        title: "审批结果",
                        fieldName: "result",

                        render: function (data) {
                            if (data.attr5) {
                                return LIB.getDataDic("smoc_pass_opinion_result", data.attr5);
                            }else{
                                return LIB.getDataDic("smoc_pass_opinion_result", data.result);
                            }
                        }
                    },
                    {
                        //意见
                        title: "审批意见",
                        fieldName: "opinion",

                    },
                 
                    
                ],
                defaultFilterValue: { 'criteria.intsValue': { type: [1] } }
            }),
            //验收
            ysyjModel: LIB.Opts.extendDetailTableOpt({
                // url : "testequipment/checkbases/list/{curPage}/{pageSize}",
                columns: [
                    // LIB.tableMgr.ksColumn.code,
                    {
                        title: "验收人",
                        fieldName: "spr",
                        width: 100
                    },
                    {
                        title: "验收时间",
                        fieldName: "spsj",
                        width: 100
                    },
                    {
                        title: "验收结果",
                        fieldName: "pgyj",
                        width: 100
                    },
                    {
                        title: "验收意见",
                        fieldName: "pgyj",
                    }
                ]
            }),

        },
        selectModel: {
            userSelectModel: {
                visible: false,
                filterData: {
                    compId: null,
                    type: 0
                }
            },

        },
        //无需附件上传请删除此段代码
        fileModel: {
            file: {
                cfg: {
                    params: {
                        recordId: null,
                        dataType: 'SMOC1', // 文件关联的业务对象的类型标识，需要根据数据库的注释进行对应的修改
                        fileType: 'SMOC'    // 文件类型标识，需要根据数据库的注释进行对应的修改
                    },
                    filters: {
                        max_file_size: '10mb',
                    },
                },
                data: []
            },
            pic: {
                cfg: {
                    params: {
                        recordId: null,
                        dataType: 'SMOC2', // 文件关联的业务对象的类型标识，需要根据数据库的注释进行对应的修改
                        fileType: 'SMOC'    // 文件类型标识，需要根据数据库的注释进行对应的修改
                    },
                    filters: {
                        max_file_size: '10mb',
                        mime_types: [{ title: "files", extensions: "png,jpg,jpeg" }]
                    }
                },
                data: []
            },
            video: {
                cfg: {
                    params: {
                        recordId: null,
                        dataType: 'SMOC3', // 文件关联的业务对象的类型标识，需要根据数据库的注释进行对应的修改
                        fileType: 'SMOC'    // 文件类型标识，需要根据数据库的注释进行对应的修改
                    },
                    filters: {
                        max_file_size: '50mb',
                        mime_types: [{ title: "files", extensions: "mp4,avi,flv,3gp" }]
                    }
                },
                data: []
            }
        },
        userType: 1,
        user: [],
        add: {
            visible: false,
            name: null,
            id: null,
            opType: 'create',
            rules: {
                "name": LIB.formRuleMgr.require("分组名"),
            }
        },
        groupUser: {
            visible: false,
            name: null,
            id: null,
            user: {},
            rules: {
                "user.id": LIB.formRuleMgr.require("落实人"),
            }
        },
        opinionModel: {
            visible: false,
            result: null,
            opinion: null,
            title: '评估',
            rules: {
                "result": [
                    {
                        validator: function (rule, val, callback) {
                            
    
                            if (val == 0) {
                                callback(new Error("请选择评估结果"))
                            } else {
                                callback()
                            }
    
                        }
                    }
                ],
                'opinion': LIB.formRuleMgr.length(200)
            }
        },
        addGroup: {
            visible: false,
        },
        cardModel: {

            showContent: true

        },
        isSP:false,
        groups1: []
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
        mixins: [LIB.VueMixin.dataDic, LIB.VueMixin.auth, LIB.VueMixin.detailPanel],
        template: tpl,
        components: {
            'userSelectModal': userSelectModal,
            'multiInputSelect': multiInputSelect,
           
        },
        data: function () {
            return dataModel;
        },
        computed: {
            users: function () {
                var str = ''
                _.each(this.user, function (item) {
                    str += item.name + ','
                })
                return str.substring(0, str.length - 1)
            },
        },
        methods: {
       
            doOpinion: function () {
                this.opinionModel.title = '评估'
                this.opinionModel.visible = true
                this.opinionModel.result = 0
                this.opinionModel.opinion = null

                this.$refs.opinionform.resetFields()
            },
            newVO: newVO,
            doLoadTableData:function(data){
                var arr=  _.filter(data,function(item){
                    return item.handler.id == LIB.user.id
                })
                if (arr.length>0) {
                    if ( arr[0].result!=0) {
                        this.isSP=false
                    }else{
                        this.isSP=true 
                    }
                   
                }else{
                    this.isSP=false
                }
            },
    
            changeTab: function (tabEle) {
                this.mainModel.activeTabName = tabEle.key;
            },
       
            doSaveOpinionModel: function () {
                var _this = this
                this.$refs.opinionform.validate(function (val) {
                    if (val) {
                        var data = _.filter(_this.$refs.pgyj.values, function (item) {
                            return item.handler.id == LIB.user.id
                        })
                        
                            api.updatePassOpinion({ id: _this.mainModel.vo.id }, { id: data[0].id, opinion: _this.opinionModel.opinion, result: _this.opinionModel.result }).then(function(res){
                                LIB.Msg.success('评估成功')
                                _this.opinionModel.visible = false
                                _this.$dispatch("ev_dtCreate");
                                _this.doClose()
                            })
                    }
                })
            },
           
        
       
            afterInitData: function () {
                var _this = this
            
                api.queryRiskItemGroups({ id: this.mainModel.vo.id }).then(function (res) {
                    _this.groups1 = res.data
                    // _.each(  _this.groups1,function(item){
                    //     _this.mainModel.vo.smocTemplates.push({ id:item.id,name:item.name})
                    // })
                })
                _this.$refs.pgyj.doQuery({ id: this.mainModel.vo.id })
                _this.$refs.spyj.doQuery({ id: this.mainModel.vo.id })
              
            }
        },
        events: {
        },
        init: function () {
            this.$api = api;
        }
    });

    return detail;
});