define(function (require) {
    var LIB = require('lib');
    var api = require("./vuex/api");
    //右侧滑出详细页
    var tpl = require("text!./detail.html");
    /*var examPaperSelectModal = require("componentsEx/selectTableModal/examPaperSelectModal");*/
    var userSelectModal = require("componentsEx/selectTableModal/userSelectModal");
    //选择试卷
    require("componentsEx/selectTableModal/examPaperSelectModal");

    var beginDate = new Date().Format("yyyy-MM-dd 00:00:00");
    //初始化数据模型
    var newVO = function () {
        return {
            //考试id
            id: null,
            //唯一标识
            code: null,
            compId: null,
            ////组织id
            //orgId : null,
            //禁用标识， 1:已禁用，0：未禁用，null:未禁用
            disable: null,
            //考试时间
            examDate: null,
            entryDeadline: null,
            //通过分数
            passLine: null,
            //是否填写评估人 0:否,1:是
            isRaterRequired: '0',
            //备注
            remarks: null,
            //试卷
            examPaper: { id: '', name: '', score: 0 },
            type: 0,
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
                //"code":[LIB.formRuleMgr.require("编码")]
                code: [LIB.formRuleMgr.require("编码")],
                examDate: [
                    LIB.formRuleMgr.require("允许考试时间（开始）"),
                    {
                        validator: function (rule, value, callback) {

                            var start = new Date(),
                                end = new Date(value);
                            if (end <= start) {
                                return callback(new Error("允许考试时间（开始）要大于当前时间"))
                            }
                            return callback()
                        }
                    }
                ],
                entryDeadline: [
                    LIB.formRuleMgr.require("允许考试时间（结束）"),
                    {
                        validator: function (rule, value, callback) {
                            if (!dataModel.mainModel.vo.examDate) {
                                return callback()
                            } else {
                                var start = new Date(dataModel.mainModel.vo.examDate),
                                    end = new Date(value);
                                if (end <= start) {
                                    return callback(new Error("允许考试时间（结束）要大于允许考试时间（开始）"))
                                }
                                return callback()
                            }
                        }
                    }
                ],
                passLine: [
                    LIB.formRuleMgr.require("通过分数"),
                    { type: 'positiveInteger', message: '只能输入正整数' },
                    {
                        validator: function (rule, value, callback) {
                            if (!!dataModel.mainModel.vo.examPaper.id) {

                                if (parseInt(value) > dataModel.mainModel.vo.examPaper.score) {
                                    return callback(new Error('通过分数不能大于试卷总分'));
                                } else {
                                    return callback();
                                }

                            } else {
                                return callback();
                            }

                        }
                    }
                ],
                "examPaper.id": [{ required: true, message: '请选择试卷' }],
                "isRaterRequired": [{ required: true, message: '请选择是否填写评估人' }],
                "compId": [{ required: true, message: '请选择所属公司' }]
            },
            emptyRules: {}
        },
        tableModel: {
            userTableModel: {
                url: "exam/users/list/{curPage}/{pageSize}",
                column:[
                    {
                        title: "名称",
                        fieldName: "name",
                        keywordFilterName: "criteria.strValue.keyWordValue_name"
                    },

                    {   
                        title:'在职',
                        fieldName:'disable',
                        render: function (data) {
                           return data.disable=='0'?'是':'否'
                        },
                    },
                    {
                        title:'岗位',
                        
                        render: function (data) {
                          return  _.pluck(data.positionList, "name").join("，") 
                        //    return data.positionList.join(',')
                        },
                    },
                    //LIB.tableMgr.column.dept,
                    {
                        title: "所属公司",
                        fieldType: "custom",
                        render: function (data) {
                            if (data.compId) {
                                return LIB.getDataDic("org", data.compId)["compName"];
                            }
                        },
                        keywordFilterName: "criteria.strValue.keyWordValue_comp"
                    },
                    {
                        title: "所属部门",
                        fieldType: "custom",
                        render: function (data) {
                            if (data.orgId) {
                                return LIB.getDataDic("org", data.orgId)["deptName"];
                            }
                        },
                        keywordFilterName: "criteria.strValue.keyWordValue_org"
                    },
                    {
                        title: "",
                        fieldType: "tool",
                        toolType: "del"
                    }
                ],
               
                defaultFilterValue: {
                    "criteria.intValue": {
                        'queryPosition':'1',
                        'includeDisableUser':1
                    }
                  }
            },
            userTableModel1: {
                url: "exam/examschedules/list/{curPage}/{pageSize}",
               
                columns: [
                    {
                        title: "名称",
                        fieldName: "user.name",
                        keywordFilterName: "criteria.strValue.keyWordValue_name"
                    },
                    {   
                        title:'在职',
                        fieldName:'disable',
                        render: function (data) {
                           return data.disable=='0'?'是':'否'
                        },
                    },
                    //LIB.tableMgr.column.dept,
                    {
                        title: "所属公司",
                        fieldType: "custom",
                        render: function (data) {
                            if (data.compId) {
                                return LIB.getDataDic("org", data.compId)["compName"];
                            }
                        },
                        keywordFilterName: "criteria.strValue.keyWordValue_comp"
                    },
                    {
                        title: "所属部门",
                        fieldType: "custom",
                        render: function (data) {
                            if (data.orgId) {
                                return LIB.getDataDic("org", data.orgId)["deptName"];
                            }
                        },
                        keywordFilterName: "criteria.strValue.keyWordValue_org"
                    },
                    {
						title: "考试情况",
						render: function (data) {
							if (data.disable == 1) {
								return "已取消";
							} else if (data.status == 0) {
								return '<span style="color: red">待开始</span>';
							} else if (data.status == 1 && data.paperRecord) {
								return "已交卷";
							} else if (data.status == 1 && !data.paperRecord) {
								return '<span style="color: red">已开始</span>';
							} else if (data.status == 2 && data.paperRecord) {
								return "已结束";
							} else if (data.status == 2 && !data.paperRecord) {
								return "缺考";
							}
						}
					},
					// {
					// 	title: "进入测评时间",
					// 	width: 150,
					// 	fieldName: "startTime",
					// 	render: function (data) {
					// 		if (data.paperRecord) {
					// 			return data.startTime
					// 		}

					// 	}
					// },
					{
						title: "提交考试时间",
						width: 150,
						fieldName: "paperRecord.createDate",
					},
					{
						title: "答题时长",
						fieldName: "paperRecord.testTime",
						render: function (data) {
							if (data.paperRecord) {
								var seconds = parseInt(data.paperRecord.testTime);// 秒
								if (_.isNaN(seconds)) {
									return '';
								}
								var hours = Math.floor(seconds / 3600);
								seconds = seconds - hours * 3600;
								var minutes = Math.floor(seconds / 60);
								seconds = seconds - minutes * 60;

								var result = '';
								result += hours > 0 ? hours + '时' : '';
								result += minutes > 0 ? minutes + '分' : '';
								result += seconds > 0 ? seconds + '秒' : '';

								return result;
							} else {
								return '';
							}
						}
					},
					{
                        title: "考试得分",
                        fieldName: "paperRecord.userScore",
                        fieldType: "custom",
                        render: function (data) {
                            if (data.paperRecord) {
                                if (data.paperRecord.userScore) {
                                    return parseInt(data.paperRecord.userScore) + "分";
                                }
                            }else if(data.status == 2){
                                return  "0分";
                            }
                        },
                       
                        orderName: "paperrecord.user_score",
                        width: 120
                    },
                    {
                        title: '通过情况',
                        width: 100,
                        render: function (data) {
                            if (data.paperRecord) {
                                if (parseInt(data.paperRecord.userScore) > parseInt(dataModel.mainModel.vo.passLine) ) {
                                    return '<div class="abilitynl" title="通过" style="color:#fff;background-color:green;height:40px">通过</div>'
                                }
                                

                            }
                            return '<div class="abilitynl" title="未通过" style="color:#fff;background-color:red;height:40px">未通过</div>'
                        }
                    }
                   
                ],
                defaultFilterValue: {
                    "criteria.intValue": {
                        'includeDisableUser':1
                    }
                  }
            }
        },
        includeDisableUser:true,
        formModel: {
            userFormModel: {
                show: false,
                queryUrl: "organization/{id}/user/{userId}"
            }
        },
        selectModel: {
            examPaperSelectModel: {
                visible: false,
                filterData: { orgId: null }
            },
            showUserSelectModel: {
                visible: false,
                filterData: { compId: null }
            }
        },
        hasPaperSelected: false,//是否已选试卷
        beginDate: beginDate,
        leaveWorkerSwitch: false,
        showExamRater: false // 是否显示评估人
    };
    //Vue组件
    /**
     *  请统一使用以下顺序配置Vue参数，方便codeview
     *    el
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
        mixins: [LIB.VueMixin.dataDic, LIB.VueMixin.auth, LIB.VueMixin.detailPanel],
        template: tpl,
        components: {
            /*	"exampaperSelectModal":examPaperSelectModal,*/
            "userSelectModal": userSelectModal

        },
        data: function () {
            return dataModel;
        },
        watch: {
            'includeDisableUser': function (value) {
                var query = {
                    id: this.mainModel.vo.id
                }
                query['criteria.intValue.includeDisableUser'] = value ? '1' : '0'
                if (this.mainModel.vo.disable== 1) {
                    this.$refs.userTable.doQuery(query)
                }else{
                    this.$refs.user1Table.doQuery(query)
                }
               
            }
        },
        methods: {
            doUserExport:function(){
                window.open('/exam/exportUserInfo?id='+this.mainModel.vo.id)
            },
            newVO: newVO,
            doPreview: function (data) {
                window.open(LIB.ctxPath("/front/exampaper/preview/" + data[0].id));
            },
            doShowUserSelectModel: function () {
                this.selectModel.showUserSelectModel.visible = true;
                //				this.selectModel.showUserSelectModel.filterData = {orgId : this.mainModel.vo.compId};
            },
            doShowExamPaperSelectModal: function () {
                this.selectModel.examPaperSelectModel.visible = true;
                this.selectModel.examPaperSelectModel.filterData = { "criteria.intValue.selectWithQuestion": 1, type: 3 };
            },
            doSaveExamPaper: function (selectedDatas) {
                if (selectedDatas) {
                    this.hasPaperSelected = true;
                    this.mainModel.vo.examPaper = selectedDatas[0];
                }
            },
            doSaveUsers: function (selectedDatas) {
                if (selectedDatas) {
                    var param = _.map(selectedDatas, function (data) {
                        return { id: data.id }
                    });
                    var _this = this;
                    api.saveUsers({ id: dataModel.mainModel.vo.id }, param).then(function (res) {
                        if (!!res && !!res.data) {
                            if (!!res.data.id) {
                                _this.mainModel.vo.id = res.data.id;
                            }
                        }
                        if (_this.mainModel.vo.disable == 2) {
                            _this.mainModel.vo.disable = '1';
                        }
                        _this.$refs.userTable.doQuery({ id: _this.mainModel.vo.id});
                        _this.$dispatch("ev_dtUpdate");
                    });
                }
            },
            afterInitData: function () {
                var _this =this
              this.$nextTick(function(){
                if(_this.mainModel.vo.disable== 1){
                    _this.$refs.userTable.doQuery({ id: _this.mainModel.vo.id});
                }else{
                    _this.$refs.user1Table.doQuery({ id: _this.mainModel.vo.id });
                }
              })
               this.includeDisableUser=true
                
                this.mainModel.vo.examSchedules = [];
                if (!!this.mainModel.vo.examPaper.id) {
                    this.hasPaperSelected = true;
                }
                // this.isShowIcon();
                // if (this.leaveWorkerSwitch) {
                //     this.leaveWorkerSwitch = false
                // }
            },
            beforeInit: function () {
                // this.$refs.userTable.doClearData();
               
            },
            doRemoveUsers: function (item) {
                var _this = this;
                var data = item.entry.data;
                api.removeUsers({ id: this.mainModel.vo.id }, [{ id: data.id }]).then(function (res) {
                    LIB.Msg.info("删除人员成功！");
                    if (!!res && !!res.data) {
                        if (!!res.data.id) {
                            _this.mainModel.vo.id = res.data.id;
                        }
                    }
                    if (_this.mainModel.vo.disable == 2) {
                        _this.mainModel.vo.disable = '1';
                    }
                    _this.$refs.userTable.doQuery({ id: _this.mainModel.vo.id });
                    _this.$dispatch("ev_dtUpdate");
                });
            },
            //发布
            doPublish: function () {
                var _this = this;
                this.mainModel.vo.users = null;
                this.mainModel.vo.examSchedules = null;

                api.publish(_this.mainModel.vo).then(function (res) {
                    _this.$dispatch("ev_dtPublish");
                    LIB.Msg.info("已发布!");
                });
            },
            //取消发布
            doCancelPublish: function () {
                var _this = this;

                api.cancelPublish({
                    id: _this.mainModel.vo.id,
                    orgId: _this.mainModel.vo.orgId
                }).then(function (res) {
                    _this.$dispatch("ev_dtPublish");
                    LIB.Msg.info("已取消!");
                });
            },
            isShowIcon: function () {
                var toolCol = _.last(this.tableModel.userTableModel.columns);
                var isToolColShow = this.hasAuth("edit") && (this.mainModel.vo.disable !== "0");
                if (toolCol.visible !== isToolColShow) {
                    toolCol.visible = isToolColShow;
                    this.$refs.userTable.refreshColumns();
                }
            },
            afterDoSave: function (opt, res) {
                this.mainModel.vo.disable = '1';
                // if (opt.type === "C") {
                //     this.isShowIcon();
                // }
                // if (!!res) {
                //     if (!!res.id) {
                //         this.mainModel.vo.id = res.id;
                //         this.$refs.userTable.doQuery({ id: res.id });
                //     }
                // }

            },
            _checkExamRater: function () {
                var _this = this;
                api.getExamRaterConfig().then(function (res) {
                    var result = _.get(res, "data.result");
                    _this.showExamRater = (result === '2');
                })
            }
        },
        events: {},
        init: function () {
            this.$api = api;
        },
        ready: function () {
            this._checkExamRater();
        }
    });

    return detail;
});