define(function (require) {
    var LIB = require('lib');
    //数据模型
    var api = require("../vuex/api");
    var mainOpt = require("./main-opt");
    //右侧滑出详细页
    var detailComponent = require("../detail");
    //回转风险库弹框页面
    var riskComponent = require("./dialog/risk-modal");

    var exportTemplate = require("componentsEx/exportTemplate/index");
    var printModal = require("./dialog/preivew");
    var filterStatusArray = [
        {
            id: 10,
            name: '超期未提交'
        },
        {
            id: 11,
            name: '超期未审批'
        },
        {
            id: 12,
            name: '超期未整改'
        },
        {
            id: 13,
            name: '超期未验证'
        },

    ];
    //Vue数据模型
    var dataModel = function () {
        var _this = this;
        var columsCfg = LIB.setting.fieldSetting["BC_HaG_HazT"] ? LIB.setting.fieldSetting["BC_HaG_HazT"] : [];
        var renderTableModel = _.bind(LIB.tableRenderMgr.renderModel, _this, columsCfg);
        return {

            moduleCode: LIB.ModuleCode.BC_HaG_HazT,
            tableModel: LIB.Opts.extendMainTableOpt(renderTableModel(
                {
                    url: "pool/list{/curPage}{/pageSize}",
                    selectedDatas: [],
                    isSingleCheck: false,
                    columns: [
                        {
                            title: "",
                            fieldName: "id",
                            fieldType: "cb",
                        }, {
                            //title: "编号",
                            title: this.$t("gb.common.code"),
                            fieldName: "title",
                            width: 180,
                            fieldType: "link",
                            filterName: "title",
                            filterType: "text"
                        },
                        //    {
                        //    //title: "受检对象",
                        //    title: this.$t("gb.common.subjectObj"),
                        //    orderName:"checkObject.name",
                        //    fieldName : "checkObject.name",
                        //    filterType: "text",
                        //    filterName : "criteria.strValue.name",
                        //},
                        LIB.tableMgr.column.company,
                        LIB.tableMgr.column.dept,
                        {
                            title: "属地",
                            fieldName: "dominationArea.name",
                            orderName: "dominationAreaId",
                            filterType: "text"
                        },
                        {
                            title: "检查对象",
                            fieldName: "checkObj.name",
                            orderName: "ifnull(e.check_object_id,e.equipment_id)",
                            filterType: "text"
                        },
                        {
                            title: this.$t("gb.common.checkUser"),
                            orderName: "attr1",
                            fieldName: "user.name",
                            filterType: "text",
                            filterName: "criteria.strValue.checkUserName",
                            width: 100
                        },
                        {
                            title: this.$t("gb.common.problemFinder"),
                            fieldName: "problemFinder",
                            filterType: "text",
                            filterName: "criteria.strValue.problemFinder",
                        },
                        // {
                        //     //title: "信息来源",
                        //     title: this.$t("gb.common.infoSource"),
                        //     orderName: "infoSource",
                        //     fieldType: "custom",
                        //     filterType: "enum",
                        //     filterName: "criteria.intsValue.infoSource",
                        //     popFilterEnum: LIB.getDataDicList("info_source"),
                        //     render: function (data) {
                        //         return LIB.getDataDic("info_source", data.infoSource);
                        //     }
                        // }, {
                        //     //title: "体系要素",
                        //     title: this.$t("gb.common.systemElement"),
                        //     orderName: "systemElement",
                        //     fieldType: "custom",
                        //     filterType: "enum",
                        //     filterName: "criteria.intsValue.systemElement",
                        //     popFilterEnum: LIB.getDataDicList("system_element"),
                        //     render: function (data) {
                        //         return LIB.getDataDic("system_element", data.systemElement);
                        //     }
                        // },{
                        //     //title: "专业",
                        //     title: this.$t("gb.common.profession"),
                        //     orderName: "profession",
                        //     fieldType: "custom",
                        //     filterType: "enum",
                        //     filterName: "criteria.intsValue.profession",
                        //     popFilterEnum: LIB.getDataDicList("profession"),
                        //     render: function (data) {
                        //         return LIB.getDataDic("profession", data.profession);
                        //     }
                        // },
                        {
                            //title: "问题描述",
                            title: this.$t("gb.common.problemDesc"),
                            fieldName: "problem",
                            filterName: "criteria.strValue.problem",
                            filterType: "text",
                            renderClass: "textarea",
                            width: 320
                        },
                        {
                            title: this.$t("gb.common.latentDefect"),
                            fieldName: "latentDefect",
                            filterType: "text",
                            width: 180
                        },
                        {
                            //title: "建议措施",
                            title: this.$t("gb.common.recMeasure"),
                            fieldName: "danger",
                            filterName: "criteria.strValue.danger",
                            filterType: "text",
                            renderClass: "textarea",
                            width: 320
                        }, {
                            //title: "登记日期",
                            title: this.$t("bc.hal.registratDate"),
                            fieldName: "registerDate",
                            filterType: "date",
                            width: 180
                        }, {
                            //title: "隐患等级",
                            title: this.$t("hag.hazc.hiddenGrade"),
                            orderName: "type",
                            fieldType: "custom",
                            filterType: "enum",
                            filterName: "criteria.strsValue.riskType",
                            popFilterEnum: LIB.getDataDicList("risk_type"),
                            render: function (data) {
                                return LIB.getDataDic("risk_type", data.riskType);
                            },
                            width: 120
                        }, {
                            //title: "风险等级",
                            title: this.$t("gb.common.riskGrade"),
                            orderName: "riskLevel",
                            fieldType: "custom",
                            filterType: "text",
                            showTip: false,
                            filterName: "criteria.strValue.riskLevel",
                            render: function (data) {
                                if (data.riskLevel) {
                                    var riskLevel = JSON.parse(data.riskLevel);
                                    var resultColor = _.propertyOf(JSON.parse(data.riskModel))("resultColor");
                                    if (riskLevel && riskLevel.result) {
                                        //return riskLevel.result;
                                        if (resultColor) {
                                            return "<span style='background:\#" + resultColor + ";color:\#" + resultColor + ";margin-right: 5px;padding-right: 13px;border-radius: 3px;'></span>" + riskLevel.result;
                                        } else {
                                            return "<span style='background:#F5F5F5;color:#F5F5F5;opacity: 1;margin-right: 5px;padding-right: 13px;'></span>" + riskLevel.result;
                                        }
                                    } else {
                                        return "<span style='background:#F5F5F5;color:#F5F5F5;opacity: 1;margin-right: 5px;padding-right: 13px;'></span>" + "无";
                                        //return "无";
                                    }
                                }  else if (data.riskLevelResult) {
                                    return LIB.getDataDic("risk_level_result", data.riskLevelResult);
                                } else {
                                    return "<span style='background:#F5F5F5;color:#F5F5F5;opacity: 1;margin-right: 5px;padding-right: 13px;'></span>" + "无";
                                    //return "无";
                                }
                            },
                            width: 120
                        }, {
                            title: this.$t("gb.common.state"),
                            orderName: "status",
                            fieldType: "custom",
                            filterType: "enum",
                            filterName: "criteria.intsValue.status",
                            popFilterEnum: LIB.getDataDicList("pool_status"),
                            render: function (data) {
                                return LIB.getDataDic("pool_status", data.status);
                            },
                            width: 120
                        },
                        {
                            title: "整改状态",
                            sortable: false,
                            width: 120,
                            filterType: "enum",
                            filterName: "criteria.intsValue.reformStatus",
                            popFilterEnum: LIB.getDataDicList("pool_reform_status"),
                            render: function (data) {
                                var maxDealDate;
                                var dealDate;
                                if (data && data.lastReform) {
                                    if (data.lastReform.maxDealDate) {
                                        maxDealDate = new Date(data.lastReform.maxDealDate);
                                    }
                                    if (data.lastReform.dealDate) {
                                        dealDate = new Date(data.lastReform.dealDate);
                                    }
                                } else {
                                    return "<span style='background:#F5F5F5;color:#F5F5F5;margin-right: 5px;padding-right: 13px;border-radius: 3px;'></span>" + "其他";
                                }
                                var status = data.status;
                                var now = new Date();
                                if (status === "2" && maxDealDate) {//待整改
                                    if (now > maxDealDate) {
                                        return "<span style='background:red;color:red;margin-right: 5px;padding-right: 13px;border-radius: 3px;'></span>" + "逾期未整改";
                                    } else {
                                        return "<span style='background:#F5F5F5;color:#F5F5F5;margin-right: 5px;padding-right: 13px;border-radius: 3px;'></span>" + "其他";
                                    }
                                } else if ((status === "3" || status === "100") && maxDealDate) {//待验证 //验证合格
                                    if (dealDate > maxDealDate) {
                                        return "<span style='background:yellow;color:yellow;margin-right: 5px;padding-right: 13px;border-radius: 3px;'></span>" + "逾期整改";
                                    } else {
                                        return "<span style='background:#0F0;color:#0F0;margin-right: 5px;padding-right: 13px;border-radius: 3px;'></span>" + "期限内整改";
                                    }
                                } else {
                                    return "<span style='background:#F5F5F5;color:#F5F5F5;margin-right: 5px;padding-right: 13px;border-radius: 3px;'></span>" + "其他";
                                }
                            },

                        },
                        {
                            title: "来源",
                            orderName: "sourceType",
                            fieldType: "custom",
                            filterType: "enum",
                            filterName: "criteria.intsValue.sourceType",
                            popFilterEnum: LIB.getDataDicList("pool_sourceType").filter(function (item) {

                                return item.id != 6;//过滤掉 id:6 "风险研判"
                            }),
                            render: function (data) {
                                return LIB.getDataDic("pool_sourceType", data.sourceType);
                            },
                            width: 100
                        },
                        {
                            title: "整改类型",
                            orderName: "reformType",
                            fieldType: "custom",
                            filterType: "enum",
                            filterName: "criteria.strsValue.reformType",
                            popFilterEnum: LIB.getDataDicList("pool_reformType"),
                            render: function (data) {
                                return LIB.getDataDic("pool_reformType", data.reformType);
                            },
                            width: 100
                        },
                        {
                            title: this.$t("gb.common.businessSource"),
                            orderName: "bizType",
                            fieldType: "custom",
                            filterType: "enum",
                            filterName: "criteria.intsValue.bizType",
                            popFilterEnum: LIB.getDataDicList("pool_biz_source_type"),
                            render: function (data) {
                                return LIB.getDataDic("pool_biz_source_type", data.bizType);
                            },
                            width: 100
                        },
                        {
                            //title: "类型",
                            title: this.$t("gb.common.type"),
                            orderName: "type",
                            fieldType: "custom",
                            filterType: "enum",
                            filterName: "criteria.intsValue.type",
                            popFilterEnum: LIB.getDataDicList("pool_type"),
                            render: function (data) {
                                return LIB.getDataDic("pool_type", data.type);
                            },
                            width: 80
                        },
                        {
                            title: "审批人",
                            fieldName: "auditorName",
                            filterName: "criteria.strValue.auditorName",
                            filterType: "text",
                            renderClass: "textarea",
                            width: 100
                        },
                    ],
                    defaultFilterValue: {
                        "criteria.orderValue": {fieldName: "registerDate", orderType: "1"},
                        "orgId": LIB.user.orgId == "9999999999" ? '' : LIB.user.orgId,
                        "isMajorDanger":"1"
                    }

                }
            )),
            //控制全部分类组件显示
            mainModel: {
                //显示分类
                showCategory: false,
                showHeaderTools: false,
                //当前grid所选中的行
                selectedRow: [],
                showTempSetting: true,
                bizType: null
            },
            riskModel: {
                //控制编辑组件显示
                title: "回转风险库",
                //显示编辑弹框
                show: false,
                //编辑模式操作类型
                type: "create",
                id: null
            },
            detailModel: {
                //控制右侧滑出组件显示
                show: false
            },
            poolId: null,
            exportModel: {
                url: "/pool/exportExcel"
            },
            filterTabId: 'todo',
            uploadModel: {
                url: "/pool/importExcel?type=1"
            },
            templete: {
                url: "/pool/file/down?type=1"
            },

            templateModel: {
                visible: false
            },
            filterModel: {
                checkedExpiredStatus: '',
                filterStatusArray: filterStatusArray,
            },
            // importProgress: {
            //     show: false,
            //     maxFileSize:"500mb"
            // },
        }
    };


    //使用Vue方式，对页面进行事件和数据绑定
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
    var tpl = LIB.renderHTML(require("text!./main.html"));
    var vm = LIB.VueEx.extend({
        mixins: [LIB.VueMixin.auth, LIB.VueMixin.mainPanel, mainOpt],
        template: tpl,
        components: {
            "detail-component": detailComponent,
            "risk-component": riskComponent,
            "export-template": exportTemplate,
            "print-modal":printModal,
        },
        data: dataModel,
        methods: {
            // doImport: function () {
            //     var url = "/pool/importExcel?type=1";
            //     if (this.$route.query.bizType) {
            //         url = "/pool/importExcel?type=1&bizType=" + this.$route.query.bizType.split(",")[0];
            //     }
            //     this.$broadcast("ev_update_url", url);
            //     this.importProgress.show = true;
            // },
            //显示详情
            showDetail: function (row) {
                this.detailModel.show = true;
                this.$broadcast('ev_detailDataReload', row.id, 1);
                this.$broadcast('ev_detailButton');
            },
            doFilterBySpecial: function (v) {
                this.filterTabId = 'todo' + (v || '');
                this._normalizeFilterParam(v);
            },
            _normalizeFilterParam: function (v) {
                var params = [];
                var name = 'criteria.strValue.todo';
                if (v) {
                    params.push({
                        value: {
                            columnFilterName: name,
                            columnFilterValue: v
                        },
                        type: "save"
                    });
                    params.push({
                        value: {
                            columnFilterName: 'orgId',
                            columnFilterValue: LIB.user.compId
                        },
                        type: "save"
                    })
                } else {
                    params.push({
                        type: "remove",
                        value: {
                            columnFilterName: name
                        }
                    })
                }
                this.$refs.mainTable.doQueryByFilter(params);
            },
            showTemplateSetting: function () {
                this.templateModel.visible = true;
            },
            doDelete: function () {
                if (this.beforeDoDelete() == false) {
                    return;
                }
                var _this = this;
                var deleteIds = _.map(_this.tableModel.selectedDatas, function (row) {
                    return row.id
                });
                LIB.Modal.confirm({
                    title: '确定删除数据?',
                    onOk: function () {
                        api.deleteMajorDanger(null, deleteIds).then(function (res) {
                            _this.emitMainTableEvent("do_update_row_data", {
                                opType: "remove",
                                value: _this.tableModel.selectedDatas
                            });
                            LIB.Msg.info("删除成功");
                        });
                    }
                });
            },
            // doCreateExport: function () {
            //     var _this = this;
            //     if (_this.tableModel.selectedDatas.length > 1) {
            //         var checkedCompanyIsOne = true;
            //         var _tempCompId = undefined;
            //         for (var i = 0; i < _this.tableModel.selectedDatas.length; i++) {
            //             var compid = _this.tableModel.selectedDatas[i].compId;
            //             if (_tempCompId && _tempCompId != compid) {
            //                 checkedCompanyIsOne = false;
            //                 break;
            //             } else if (!_tempCompId) {
            //                 _tempCompId = compid;
            //             }
            //         }
            //         if (!checkedCompanyIsOne) {
            //             LIB.Msg.warning("所选数据的受检公司必须相同");
            //             return;
            //         }
            //     }
            //     var rowIds = _.map(_this.tableModel.selectedDatas, function (row) {
            //         return row.id
            //     });
            //     LIB.globalLoader.show();
            //     api.createReport({ids: rowIds}).then(function (res) {
            //         LIB.globalLoader.hide();
            //         _this.$refs.printModal.init(res.data);
            //     });
            // },
            initFilterBoxData: function () {
                this.filterModel.checkedExpiredTypeId = '';
                this.filterModel.checkedExpiredStatus = '';
            },
            doChangeExpiredtatusFilter: function (id) {
                this.filterModel.checkedExpiredStatus = id;
            },
            _normalizeExpiryStatusFilterData: function () {
                if (!this.filterModel.checkedExpiredStatus) {
                    return null;
                }
                var param = {
                    value: {
                        columnFilterName: "criteria.intValue",
                        columnName: "status",
                        columnFilterValue: {status: this.filterModel.checkedExpiredStatus}
                    },
                    type: "save"
                };
                var displayMap = {
                    displayTitle: '',
                    displayValue: '',
                    columnFilterName: "status",
                    columnFilterValue: 1
                };

                displayMap.displayValue = _.find(filterStatusArray, "id", this.filterModel.checkedExpiredStatus).name;
                return {
                    param: param,
                    displayMap: displayMap
                }
            },
            doFilterFromBox: function () {
                var params = [];
                var status = this._normalizeExpiryStatusFilterData();
                if (!status) {
                    return LIB.Msg.warning("请选择过滤条件");
                }
                if (status) {
                    params.push(status.param);
                    this.doAddDisplayFilterValue(status.displayMap);
                }

                this.$refs.mainTable.doQueryByFilter(params);
                this.doFilterBoxClose();
            },
            doFilterBoxClose: function () {
                this.$refs.filterBox.handleClose();
            }
        },
        created:function() {
            var _this = this;
            if(LIB.getBusinessSetStateByNamePath("poolGovern.isShowEquName")){
                var length = _this.tableModel.columns.length;
                var columns1 = _this.tableModel.columns.slice(0,6);
                var columns2 = _this.tableModel.columns.slice(6,length);
                columns1.push({
                    title: "设备名称",
                    fieldName: "equName",
                    filterType: "text",
                    width: 100
                });
                _this.tableModel.columns = columns1.concat(columns2);
            }
            if(LIB.getBusinessSetStateByNamePath("radomObserSet.enableHSEType")){
                _this.tableModel.columns.push({
                    title: "HSE类型",
                    fieldName: "hseType",
                    orderName: "hseType",
                    fieldType: "custom",
                    filterType: "enum",
                    visible:true,
                    filterName: "criteria.intsValue.hseType",
                    popFilterEnum : LIB.getDataDicList("random_observe_hse_type"),
                    render: function (data) {
                        return LIB.getDataDic("random_observe_hse_type",data.hseType);
                    },
                    width: 100
                });
            }
        },
        ready: function () {
            if (!LIB.user.compId) {
                this.mainModel.showTempSetting = false;
            }
            //首页跳转时根据首页对应搜索条件查询
            if (this.$route.query.method === "filterByUser") {
                this.doFilterBySpecial("1");
                this.$refs.categorySelector.setDisplayTitle({type: "org", value: LIB.user.compId});//此处不能默认显示本部门，否则显示的数据与首页工作任务数据条数不对应
            } else {
                this.$refs.categorySelector.setDisplayTitle({type: "org", value: LIB.user.orgId});
            }
            var _this = this;
            if (LIB.getBusinessSetByNamePath('common.enableCheckLevel').result === '2') {
                _this.tableModel.columns.push({
                    title: "检查级别",
                    fieldName: "checkLevel",
                    orderName: "checkLevel",
                    fieldType: "custom",
                    filterType: "enum",
                    filterName: "criteria.intsValue.checkLevel",
                    popFilterEnum: LIB.getDataDicList("checkLevel"),
                    render: function (data) {
                        return LIB.getDataDic("checkLevel", data.checkLevel);
                    },
                    width: 100
                });
            }
        },
        init: function () {
            this.$api = api;
        },
    });

    return vm;
});