define(function (require) {
    var LIB = require('lib');
    var api = require("./vuex/api-notplan");
    var Vue = require("vue");
    //右侧滑出详细页
    var tpl = require("text!./detail-random.html");
    //查看不合格检查项弹框页面
    var viewDetailComponent = require("../../hiddenDanger/checkRecord/dialog/viewDetail");
    //编辑检查结果弹框
    var viewEditComponent = require("../../hiddenDanger/checkRecord/dialog/editCheckResult");
    var userSelectModal = require("componentsEx/selectTableModal/userSelectModal");
    var checkObjectSelect = require("../../hiddenDanger/inspectionPlan/dialog/task");  // 选择检查对象

    var checkObjectUnitySelect = require("../../hiddenDanger/checkRecord/dialog/checkObjectSelect");

    var getNowDateStr = function () {
        return new Date().Format("yyyy-MM-dd hh:mm:ss");
    };
    //初始化数据模型
    var newVO = function () {
        return {
            id: null,
            orgId: null,
            compId: null,
            checkDate: null,
            checkSource: null,
            checkResultDetail: null,
            checkResult: "1",
            checkerId: null,
            checkObjectId: null,
            checkTableId: null,
            checkPlanId: null,
            checkUser: {username: null, id: '', compId: ''},
            checkObject: {name: null},
            checkRecordDetailVoList: [],
            checkTable: {name: null},
            checkPlan: {name: null},
            behaviorCommList: [],
            detailList: [],
            type: '0',
            checkTaskId: null,
            //检查任务
            checkTask: {},
            startDate: null,
            endDate: null,
            checkBeginDate: null,
            checkEndDate: null,
            code: null,
            checkObj: {},
            checkObjectName:null,
            remarks:null
        }
    };
    //Vue数据
    var dataModel = {
        mainModel: {
            vo: newVO(),
            userDetail: null,
            selectedUser: [],
            selectedList: [],
            selectedPlan: [],
            selectedObject: [],
            selectedCheckItem: {},
            checkRecordDetail: {},
            checkDetailList: [],
            groupOrderNo: null,
            groupName: null,
            opType: '',
            checkplanSelectFilterValue: {disable: 1},
            checkTableFilterValue: {"disable": 0, "criteria.strValue.selectWithExistCheckItem": "true", "type": 0},
            // checkItemIds: [],
            typeList: [{id: '0', name: "非计划检查"}, {id: '1', name: "计划检查"}],
            showCheckTaskSelectModal: false,
            showUserSelectModal: false,
            //showCheckObjectSelectModal : false,
            showCheckPlanSelectModal: false,
            isReadOnly: true, //是否只读
            checkEndDate: null
        },

        itemColumns: [
            {
                title: "检查项",
                fieldName: "name",
                width: 680
            },
            // {
            //     title: "检查对象",
            //     fieldType: "custom",
            //     render: function (data) {
            //         return data.checkObjectName;
            //     },
            //     width: 200
            // },
            {
                title: "否决项",
                fieldType: "custom",
                width: 80,
                showTip: false,
                render: function (data) {
                    if (data.vetoItem == 1) {
                        return '是'
                    }else {
                        return '否';
                    }
                }
            },
            {
                title: "类型",
                fieldName: "type",
                fieldType: "custom",
                render: function (data) {
                    return LIB.getDataDic("pool_type", [data.type]);
                },
                width: 80
            },
            {
                title: "结果",
                fieldType: "custom",
                width: 100,
                render: function (data) {
                    if (data.checkResult === '1') {
                        return '<a style="color:#33a6ff;">合格</a>';
                    } else if (data.checkResult === '0') {
                        return '<a style="color:#f00;">不合格</a>';
                    } else if (data.checkResult === '2') {
                        return '<span style="color:#cecece;">不涉及</span>';
                    } else {
                        return '<a style="color:red;">选择</a>';
                    }
                },
                tipRender: function (data) {
                    if (data.checkResult === '1') {
                        return "合格";
                    } else if (data.checkResult === '0') {
                        return "不合格";
                    } else if (data.checkResult === '2') {
                        return "不涉及";
                    } else {
                        return "选择";
                    }
                }
            }
        ],
        itemColumns1: [
            {
                title: "检查项内容",
                fieldName: "name",
                width: 540
            },
            {
                title: "类型",
                fieldName: "type",
                fieldType: "custom",
                render: function (data) {
                    return LIB.getDataDic("pool_type", [data.type]);
                },
                width: 80
            },
            {
                title: "否决项",
                fieldType: "custom",
                width: 80,
                showTip: false,
                render: function (data) {
                    if (data.vetoItem == 1) {
                        return '是'
                    }else {
                        return '否';
                    }
                }
            },
            {
                title: "结果",
                fieldType: "custom",
                fieldName: "operation1",
                width: "80px",
                render: function (data) {
                    var textColor = '#cecece',
                        iconColor = '#cecece';

                    if(data.checkResult === '1') {
                        textColor = 'blue';
                        if(data._content) {
                            iconColor = 'blue';
                        }
                    }
                    return "<a href='javascript:void(0);' class='record-cell-text' style='color:" + textColor + ";'>合格</a><a href='javascript:void(0);' class='record-cell-icon' style='color:" + iconColor + ";'><i class='ivu-icon ivu-icon-ios-information'></i></a>"
                },
                tipRender: function (data) {
                    return "合格";
                }
            },
            {
                title: "",
                fieldType: "custom",
                fieldName: "operation2",
                width: "80px",
                render: function (data) {
                    if (data.checkResult === '0') {
                        return "<a href='javascript:void(0);' style='color:red;'>不合格</a>";
                    } else {
                        return "<a href='javascript:void(0);' style='color:#cecece;'>不合格</a>";
                    }
                },
                tipRender: function (data) {
                    return "不合格";
                }
            }
        ],
        viewDetailModel: {
            //控制编辑组件显示
            title: "详情",
            //显示编辑弹框
            show: false,
            id: null
        },
        viewDetailModel1: {
            //控制编辑组件显示
            title: "详情",
            //显示编辑弹框
            show: false,
            id: null
        },
        detailModel: {
            //控制编辑组件显示
            title: "新增",
            //显示编辑弹框
            show: true,
            //编辑模式操作类型
            type: "create",
            id: null
        },
        //控制检查表
        showModal: false,
        opType: null,
        //验证规则
        rules: {
            "checkUser.username": [{required: true, message: '请选择检查人名称'}],
            "checkTable.name": [{required: true, message: '请选择检查表'}],
            'checkDate': [{required: true, message: '请选择检查时间'}],
            "checkObj.id": [{required: true, message: '请选择受检对象'}],
            "orgId": [{required: true, message: '请选择所属部门'}],
            "compId": [{required: true, message: '请选择所属公司'}],
            "checkTask.name": [{required: true, message: '请选择检查任务'}]
        },
        emptyRules: {},
        selectModal: {
            checkTableSelectModal: {
                filterData: {
                    type: 0,
                    "criteria.strValue.selectWithExistCheckItem": "true"
                }
            },
            taskSelectModel: {
                visible: false
            },
            checkObjectSelectModel: {
                visible: false,
                checkObjectType: '',
                checkObjId: ''
            }
        },
        //选择计划类型的时候 禁用公司部门
        isDisabled: false,
        envConfig: {},
        checkObjModel: {
            index: 0,
            checkObjects: [],
            checkObjectsLength: 0,
            firstIndex: 0,
            items: []
        },
        picFiles:[],
        signatureImgs:[],
        exportModel: {
            visible: false,
            title: "导出数据?",
            exportType:"3"//0:不合格;1:合格;2:不涉及;3:全部
        },
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
            "viewdetailcomponent": viewDetailComponent,
            "viewEditComponent": viewEditComponent,
            "userSelectModal": userSelectModal,
            checkObjectSelect: checkObjectSelect,
            checkObjectUnitySelect: checkObjectUnitySelect
        },
        data: function () {
            return dataModel;
        },
        methods: {
            newVO: newVO,
            convertPicPath: LIB.convertPicPath,
            //导出pdf
            // doExportPdf: function () {
            //
            //     var id = this.mainModel.vo.id;
            //     window.open('/checkrecord/' + id + '/exportExcel');
            // },
            doExportPdf: function () {
                this.exportModel.exportType = "3";
                this.exportModel.visible = true;
            },
            doExport: function(){
                this.exportModel.visible = false;
                window.open('/checkrecord/' + this.mainModel.vo.id + '/exportExcel/'+ this.exportModel.exportType);
            },
            /**
             * @param id 检查项id
             * @param result 检查项检查结果
             * @param type 检查项类型
             */
            onGridRefresh: function (id, result, type, groupId) {
                this.$dispatch(
                    "ev_gridRefresh",
                    '',
                    result,
                    null,
                    null,
                    id,
                    null,
                    type,
                    null,
                    null,
                    groupId
                );
            },
            /**
             * 修改检查项检查结果， 触发Modal
             * @param vo 数据对象
             * @param fieldName 点击的字段名
             * @param str  behaviorCommList或者detailList中的匹配项
             */
            onEditCheckResult: function (vo, fieldName, str) {
                this.viewDetailModel1.show = true;
                this.$broadcast(
                    'ev_editCheckResult',
                    vo,
                    this.mainModel.vo.id,
                    this.envConfig,
                    fieldName,
                    str
                );
            },
            /**
             * 判断检查项是否有必填项
             * 不合格： 必有必填项
             * 不涉及： 没有必填项
             * 合格： 可能有必填项
             * => 只判断合格的情况
             * @param checkItemId 检查项id
             * @return {Boolean} 是否有必填项
             */
            isCheckItemHasRequired: function (checkItemId) {
                var legals = this.envConfig.legal.children,
                    result = false;

                for(var i = 0, item; item = legals[i++];) {
                    if(item.result === '3') {
                        result = true;
                        break;
                    }
                    if(item.result === '2' && _.includes(_.pluck(item.systemBusinessSetDetails, 'result'), checkItemId)) {
                        result = true;
                        break;
                    }
                }

                return result;
            },
            editDetail: function (obj) {
                var _vo = obj.entry.data,
                    fieldName = obj.cell.fieldName,
                    target = obj.event.target,
                    isClickIcon = false,
                    _this = this;

                _.each(_this.checkObjModel.items, function (result) {
                    _.each(result.itemList, function (checkItemList) {
                        if (checkItemList.id === _vo.id && checkItemList.groupId == _vo.groupId) {
                            dataModel.mainModel.groupName = result.groupName;
                            dataModel.mainModel.groupOrderNo = result.groupOrderNo;
                        }
                    })
                });

                // 选择检查对象个体 需要保存一些数据
                if(target.classList.contains("cr-co-select")) {
                    // console.log("选择检查对象个体");
                    // console.log(_vo);

                    var model = this.selectModal.checkObjectSelectModel,
                        checkObjectType = _vo.checkObject.dataType;

                    model.visible = true;
                    model.checkObjectType = checkObjectType; // 传递给组件
                    model.checkObjId = _vo.checkObject.id; // 传递给组件
                    model.vo = _vo; // 选择之后处理数据需要
                    return;
                }

                this.mainModel.selectedCheckItem = obj.entry.data;
                this.viewDetailModel1.title = "结果";

                if (!_.contains(['operation1', 'operation2', 'operation3'], fieldName)) {
                    return;
                }

                //设置检查记录的检查开始时间
                this.mainModel.vo.checkBeginDate = getNowDateStr();

                var _data = this._saveData[this.checkObjModel.index];

                var str = null;
                if (_vo.type === '0') {
                    if (_data.behaviorCommList && _data.behaviorCommList.length > 0) {
                        str = _.find(_data.behaviorCommList, function (item) {
                            return item.checkItemId === _vo.id && item.groupId == _vo.groupId;
                        });
                    }
                } else {
                    if (_data.detailList && _data.detailList.length > 0) {
                        str = _.find(_data.detailList, function (item) {
                            return item.checkItemId === _vo.id && item.groupId == _vo.groupId;
                        });
                    }
                }
                if (target.classList.contains('record-cell-text')) {
                    isClickIcon = false;
                } else if (target.parentNode.classList.contains('record-cell-icon')) {
                    isClickIcon = true;
                }
                var oRmap = {
                    operation1: '1',
                    operation2: '0',
                    operation3: '2'
                };
                // 如果点击的是图标，则必定是修改检查结果
                if (isClickIcon) {
                    if(oRmap[fieldName] === _vo.checkResult) {
                        this.onEditCheckResult(_vo, fieldName, str);
                    } else {
                        this.onEditCheckResult(_vo, fieldName, null);
                    }
                    return;
                }

                /**
                 * 点击文字
                 * operation1 合格: 须判断 是否必填
                 * operation2 不合格
                 * operation3 不涉及
                 */

                if ('operation1' === fieldName) {
                    // 合格并且有必填项
                    if (this.isCheckItemHasRequired(_vo.id)) {
                        if (_vo.checkResult !== '1') {
                            this.onEditCheckResult(_vo, fieldName, null);
                        } else {
                            this.onEditCheckResult(_vo, fieldName, str);
                        }
                    } else {
                        // 合格并且没有必填项
                        this.onGridRefresh(obj.entry.data.id, '1', _vo.type,_vo.groupId);
                    }
                } else if ('operation2' === fieldName) {
                    if (_vo.checkResult !== '0') {
                        this.onEditCheckResult(_vo, fieldName, null);
                    } else {
                        this.onEditCheckResult(_vo, fieldName, str);
                    }
                    // 不合格并且没有必填项, 暂时没有这种情况
                    // this.onGridRefresh(obj.entry.data.id, 0, _vo.type,_vo.groupId);
                } else {
                    // 不涉及(没有必填项)
                    this.onGridRefresh(obj.entry.data.id, '2', _vo.type,_vo.groupId);
                }

            },
            // 保存检查人
            doSaveUser: function (selectedDatas) {
                if (selectedDatas) {
                    var _vo = this.mainModel.vo;
                    _vo.checkerId = selectedDatas[0].id;
                    _vo.checkUser = selectedDatas[0];
                }
            },

            // 查看检查项结果详情
            doViewDetail: function (obj) {
                var _vo = obj.entry.data;
                this.viewDetailModel.show = true;
                this.viewDetailModel.title = "检查项";
                this.viewDetailModel.id = null;
                this.$broadcast('ev_viewDetailReload', _vo);
            },


            displayInspectTask: function () {
                var data = this.mainModel.vo;
                if (data.checkPlan) {
                    var str = data.checkPlan.name;
                    if (data.checkTask && data.checkTask.num) {
                        str += '-';
                        str += data.checkTask.num;
                    }
                    return str;
                }
                return data.checkTask;
            },

            changeIconColor: function (id, hasContent) {
                _.each(this.checkObjModel.items, function (checkItemGroup) {
                    var item = _.find(checkItemGroup.itemList, function (checkItem) {
                        return checkItem.id === id
                    });
                    if (item) {
                        item._content = hasContent;
                        return false;
                    }
                });
            },

            // 检查项表格添加不涉及列
            pushNotRefer: function () {
                this.itemColumns1 = this.itemColumns1.slice(0, 5);
                this.itemColumns1.push({
                    title: "",
                    fieldType: "custom",
                    fieldName: "operation3",
                    width: "80px",
                    render: function (data) {
                        var textColor = '#cecece',
                            iconColor = '#cecece';

                        if(data.checkResult === '2') {
                            textColor = '#1e90ff';
                            if(data._content) {
                                iconColor = '#1e90ff';
                            }
                        }
                        return "<a href='javascript:void(0);' class='record-cell-text' style='color:" + textColor + ";'>不涉及</a><a href='javascript:void(0);' class='record-cell-icon' style='color:" + iconColor + ";'><i class='ivu-icon ivu-icon-ios-information'></i></a>"
                    },
                    tipRender: function (data) {
                        return "不涉及";
                    }
                });
            },

            doShowCheckObjSelectModal: function () {
                if(!this.mainModel.vo.checkUser.id) {
                    return LIB.Msg.warning("请先选择检查人");
                }
                this.selectModal.taskSelectModel.visible = true;
            },
            // 保存检查对象
            doSaveCheckObj: function (obj) {
                this._checkObj = {
                    id: obj.checkObj.id,
                    type: obj.checkObjType,
                    areaId: obj.checkObj.dominationAreaId || obj.checkObj.id
                };
                this._saveData = [];
                this.mainModel.vo.orgId = obj.checkObj.orgId;
                this.mainModel.vo.checkObj = obj.checkObj;
                this.mainModel.vo.checkObjectId = obj.checkObj.id;
                this.mainModel.vo.checkObjectType = obj.checkObjType;
                this.mainModel.vo.checkTable = obj.checkTable;
                this.selectModal.taskSelectModel.visible = false;
                this._afterSaveCheckTable(obj.checkTable)
            },
            // 保存检查表
            _afterSaveCheckTable: function (row) {

                var _vo = this.mainModel.vo;

                _vo.checkTableId = row.id;
                _vo.checkTable = row;
                _vo.checkPlanId = null;
                _vo.checkPlan = {};
                _vo.compId = row.compId;
                // _vo.orgId = row.orgId;

                this.getEnvConfig(row.id);
            },
            // 获取检查表设置
            getEnvConfig: function (checkTableId) {
                var _this = this;

                api.getEnvConfig({checkTableId: checkTableId}).then(function (res) {
                    var notRefer = null,
                        illegal = null,
                        legal = null,
                        defaultValue = '';

                    _.each(res.data.children, function (item) {
                        if (item.name === 'notRefer') {
                            notRefer = item;
                            if(item.result === '3' && item.isDefault === '2') {
                                defaultValue = '2';
                            }
                        } else if (item.name === 'illegal') {
                            illegal = item;
                            if(item.isDefault === '2') {
                                defaultValue = '0';
                            }
                        } else if (item.name === 'legal') {
                            legal = item;
                            if(item.isDefault === '2') {
                                defaultValue = '1';
                            }
                        }

                    });

                    // 配置了不涉及列时，向检查项表格中添加结果不涉及列
                    if(notRefer.result === '3') {
                        _this.pushNotRefer();
                    }

                    _this.envConfig = {
                        illegal: illegal,
                        legal: legal,
                        defaultValue: defaultValue
                    };

                    _this.queryCheckItem(checkTableId);

                });
            },

            // 通过检查表id获取检查项
            queryCheckItem: function (id) {
                // this.mainModel.checkItemIds = [];
                this.checkObjModel.items = null;

                var _data = this._saveData[this.checkObjModel.index];

                if(_data) {
                    this.checkObjModel.items = _data.data.tirList;
                    // this.mainModel.vo.behaviorCommList = _data.behaviorCommList;
                    // this.mainModel.vo.detailList = _data.detailList;
                    return;
                }

                var _this = this;

                // this.mainModel.vo.behaviorCommList = [];
                // this.mainModel.vo.detailList = [];
                var behaviorCommList = [],
                    detailList = [];

                api.getCheckTable({id: id}).then(function (data) {

                    var _list = data.data.tirList;

                    _.each(_list, function (checkItemGroup) {
                        _.each(checkItemGroup.itemList, function (checkItem) {

                            checkItem._content = false;
                            checkItem.groupId = checkItemGroup.groupId;
                            var checkRecord = {};

                            checkItem['checkResult'] = _this.envConfig.defaultValue;
                            checkRecord['checkResult'] = _this.envConfig.defaultValue;
                            checkRecord['checkItemId'] = checkItem.id;
                            checkRecord['checkRecordId'] = _this.mainModel.vo.id;
                            checkRecord ['isRectification'] = 0;
                            checkRecord ['checkItemType'] = checkItem.type;
                            checkRecord['itemOrderNo'] = checkItem.itemOrderNo;
                            checkRecord['groupId'] = checkItemGroup.groupId;
                            checkRecord['groupName'] = checkItemGroup.groupName;
                            checkRecord['groupOrderNo'] = checkItemGroup.groupOrderNo;

                            checkRecord["checkObjId"] = _this._checkObj.id;
                            checkRecord["checkObjType"] = _this._checkObj.type;
                            checkRecord['dominationAreaId'] = _this._checkObj.areaId;

                            _this.mainModel.checkRecordDetail = {};

                            // 行为类: type = 0
                            // 状态类， 管理类
                            if (checkItem.type === "0") {
                                behaviorCommList.push(checkRecord);
                            } else {
                                detailList.push(checkRecord);
                            }
                        })
                    });
                    _this.checkObjModel.items = _list;
                    _this._saveData[_this.checkObjModel.index] = {
                        data: data.data,
                        behaviorCommList: behaviorCommList,
                        detailList: detailList,
                        checkItemIds: []
                    };
                    // _this.mainModel.vo.behaviorCommList = _this._saveData[_this.checkObjModel.index].behaviorCommList;
                    // _this.mainModel.vo.detailList = _this._saveData[_this.checkObjModel.index].detailList;
                });
            },

            // 选择检查对象个体后（执行操作时， 检查项检查对象为类型时， 需要选择检查对象个体）
            doSaveCheckObjUnity: function (items) {
                var vo = this.selectModal.checkObjectSelectModel.vo;
                var item = items[0];

                Vue.set(vo, "checkObjectName", item.name);
                this._setCheckObject(item.id);
                this.selectModal.checkObjectSelectModel.visible = false;
            },

            // 选择检查对象个体后处理数据（在保存时需要传给后台的数据中加入检查对象信息）
            _setCheckObject: function (id) {
                var _data = this._saveData[this.checkObjModel.index],
                    _model = this.selectModal.checkObjectSelectModel,
                    _vo = _model.vo,
                    str = null;

                if (_vo.type === '0') {
                    if (_data.behaviorCommList && _data.behaviorCommList.length > 0) {
                        str = _.find(_data.behaviorCommList, function (item) {
                            return item.checkItemId === _vo.id;
                        });
                    }
                } else {
                    if (_data.detailList && _data.detailList.length > 0) {
                        str = _.find(_data.detailList, function (item) {
                            return item.checkItemId === _vo.id;
                        });
                    }
                }
                // console.log(str);
                var types = {
                    '3': '4',
                    '9': '7',
                    '10': '6'
                };
                str.checkObjType = types[_model.checkObjectType];
                str.checkObjId = id;
            },
            beforeInit: function () {
                this.checkObjModel = {
                    index: 0,
                    checkObjects: [],
                    checkObjectsLength: 0,
                    firstIndex: 0,
                    items: []
                };
            },
            afterInit: function () {
                var _this = this;
                this.$refs.ruleform.resetFields();

                var _vo = dataModel.mainModel.vo;
                var _select = dataModel.selectModal;

                //清空数据
                _.extend(_vo, newVO());

                if (this.mainModel.opType === "create") {

                    //组织机构id
                    // _vo.orgId=LIB.user.compId;
                    this.mainModel.checkEndDate = (new Date()).Format("yyyy-MM-dd");
                    this.mainModel.isReadOnly = false;
                    this.mainModel.vo.compId = LIB.user.compId;
                    this.mainModel.vo.checkUser = {
                        id: LIB.user.id,
                        username: LIB.user.username,
                        compId: LIB.user.compId
                    }
                    this.mainModel.vo.checkerId = LIB.user.id;

                    this.mainModel.vo.checkBeginDate = getNowDateStr();
                }

                api.getUUID().then(function (res) {
                    _vo.id = res.data;
                });
                // 最后要提交的数据
                this._saveData = [];
            },
            afterInitData: function () {
                this.picFiles = [];
                //初始化图片
                api.listFile({recordId: this.mainModel.vo.id}).then(function (res) {
                    dataModel.picFiles = [];
                    dataModel.signatureImgs = [];
                    var fileData = res.data;
                    _.each(fileData, function (pic) {
                        if(pic.dataType == 'E4') {
                            dataModel.picFiles.push({fileId: pic.id, fileExt: pic.ext});
                        }else if(pic.dataType == 'E6') {
                            dataModel.signatureImgs.push({fileId: pic.id, fileExt: pic.ext});
                        }
                    });
                });
            },
            beforeDoSave: function () {
                var _this = this,
                    vo = this.mainModel.vo,
                    orgId = this.mainModel.vo.orgId,
                    compId = this.mainModel.vo.compId;

                if (orgId && compId && orgId === compId) {
                    this.mainModel.vo.orgId = null;
                }

                if (dataModel.mainModel.opType === "check") {
                    if (!_this.mainModel.vo.checkTaskId) {
                        LIB.Msg.info("请选择检查任务");
                        return;
                    }
                }

                var detailErrorMsg =  "检查结果有误";
                var isCheckResultValid = true;

                // 循环数据
                _.each(this._saveData, function (item, index) {

                    item.id = vo.id;
                    item.orgId = vo.orgId;
                    item.compId = vo.compId;
                    item.checkDate =  vo.checkDate;
                    item.checkTableId = vo.checkTableId;
                    item.checkerId = vo.checkerId;
                    item.checkObjectId = vo.checkObjectId;
                    item.checkObjectType = vo.checkObjectType;
                    item.checkPlanId =  vo.checkPlanId;
                    item.checkTaskId = vo.checkTaskId;
                    item.type = vo.type;
                    item.checkBeginDate = vo.checkBeginDate;
                    item.remarks = vo.remarks;

                    var allCheckItemIds = [],
                        nums = 0,
                        sum = 0, // 总数
                        disqualification = 0, //不合格数
                        checkResultHint = null;


                    // 统计检查项总数和不合格项
                    _.each(item.data.tirList, function (itemList) {
                        //总数
                        sum += itemList.itemList.length;

                        _.each(itemList.itemList, function (checkItems) {
                            allCheckItemIds.push(itemList.groupId + checkItems.id);

                            //不合格项
                            if (checkItems.checkResult === '0') {
                                item.checkResult = "0";
                                disqualification = disqualification + 1;
                            }
                        });
                    });

                    var remainingCheckItemId = _.difference(allCheckItemIds, item.checkItemIds)[0];


                    _.each(item.data.tirList, function (itemList) {
                        _.each(itemList.itemList, function (checkItems) {
                            nums++;
                            if (!checkItems.checkResult) {
                                if (itemList.groupId+checkItems.id === remainingCheckItemId) {
                                    isCheckResultValid = false;
                                    checkResultHint = itemList.groupName + "第" + Math.ceil(nums / 10) + "页第" + nums % 10 + "行";
                                    detailErrorMsg = "检查记录未设置检查结果";
                                    return false;
                                }
                            }
                        });
                        if (isCheckResultValid === false) {
                            return false;
                        }
                        nums = 0;
                    });

                    if (!isCheckResultValid) {
                        LIB.Msg.error(checkResultHint + detailErrorMsg, 5);
                        return false;
                    }

                    item.checkResultDetail = sum + "/" + disqualification;

                    // 判断检查结果 0: 不合格, 1: 合格
                    if (disqualification > 0) {
                        item.checkResult = "0";
                    } else {
                        item.checkResult = "1";
                    }

                    //设置检查记录的检查结束时间
                    item.checkEndDate = getNowDateStr();

                    //判断是否检查开始时间有值（执行editDetail）
                    if (!_this.mainModel.vo.checkBeginDate) {
                        item.checkBeginDate = _this.mainModel.vo.checkEndDate;
                    }
                });

                return isCheckResultValid;

            },
            doSave: function () {
                var _this = this;
                if(this.beforeDoSave() === false) {
                    this.$refs.ruleform.validate();
                    return;
                }

                var params = _.map(this._saveData, function (item) {
                    return _.omit(item, ['data', 'checkItemIds']);
                });

                this.$refs.ruleform.validate(function (valid) {
                    if(valid) {
                        api.create(params).then(function (res) {
                            _this.doClose();
                            _this.$dispatch("ev_dtCreate");
                            LIB.Msg.success("保存成功");
                        })
                    }
                })
            },
            doClose: function() {
                this.$dispatch("ev_dtRandomClose");
            },
        },
        events: {
            "ev_gridRefresh": function (id, checkResult, problem, remark, checkItemId, latentDefect, type, hasContent, legalRegulationId, groupId) {

                var _data = this._saveData[this.checkObjModel.index];
                // console.log(checkResult);

                _data.checkItemIds.push(groupId + checkItemId);

                this.mainModel.selectedCheckItem.checkResult = checkResult;
                this.viewDetailModel1.show = false;

                if(type === '0') {
                    var behaviorComm = _.find(_data.behaviorCommList, function (item) {
                        return item.checkItemId === checkItemId && item.groupId == groupId;
                    });
                    if (behaviorComm) {
                        behaviorComm.id = id;
                        behaviorComm.checkResult = checkResult;
                        behaviorComm.talkResult = problem;
                        behaviorComm.suggestStep = remark;
                        behaviorComm.latentDefect = latentDefect;
                    }
                } else {
                    var detail = _.find(_data.detailList, function (item) {
                        return item.checkItemId === checkItemId && item.groupId == groupId;
                    });
                    if (detail) {
                        detail.id = id;
                        detail.checkResult = checkResult;
                        detail.problem = problem;
                        detail.remark = remark;
                        detail.latentDefect = latentDefect;
                    }
                }

                this.changeIconColor(checkItemId, hasContent);

            },
            //detail框点击关闭后事件处理
            "ev_viewDetailClose": function () {
                this.viewDetailModel.show = false;
            },
            "ev_dtRandomReload": function() {
                //this.init(opType, nVal);
                this.init.apply(this, arguments);
            }
        },
        init: function () {
            this.$api = api;
        },
        ready: function () {
        }
    });
    return detail;
});