define(function (require) {
    var LIB = require('lib');
    var api = require("./vuex/api");
    var commonApi = require("../api");
    var model = require("../model");
    //右侧滑出详细页
    var tpl = require("text!./detail.html");
    var pwtInfo = require("../comonents/pwt_info/pwt_base");
    var ptwCatalogSelectModal = require("../selectTableModal/ptwCatalogSelectModal");
    var ptwCardStuffFormModal = require("../formModal/ptwCardStuffFormModal");
    //初始化数据模型
    //Vue数据
    var dataModel = {
        mainModel: {
            baseSetting:null,
            // useMainData:true,
            untilCopy:true,
            vo: model.cardTpl(),
            opType: 'view',
            isReadOnly: true,
            title: "",
            //验证规则
            rules: {
                "code": [LIB.formRuleMgr.length(255)],
                "name": [LIB.formRuleMgr.require("作业票模板名称"),
                    LIB.formRuleMgr.length(200)
                ],
                "disable": LIB.formRuleMgr.require("状态"),
                "compId": [LIB.formRuleMgr.require("公司")],
                "orgId": [LIB.formRuleMgr.require("部门"),
                    LIB.formRuleMgr.length(10)
                ],
                "columnSetting": [LIB.formRuleMgr.length(1000)],
                "enableDeptPrin": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableElectricIsolation": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableGasDetection": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableMechanicalIsolation": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableProcessIsolation": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableProdPrin": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableRelPin": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableSafetyEducator": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableSecurityPrin": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableSupervisor": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "enableSystemMask": [LIB.formRuleMgr.allowIntEmpty].concat(LIB.formRuleMgr.allowIntEmpty),
                "ppeCatalogSetting": [LIB.formRuleMgr.length(500)],
                "workCatalog.id": [LIB.formRuleMgr.require("作业类型")],
            }
        },
        tableModel: {
            ptwCardStuffTableModel: LIB.Opts.extendDetailTableOpt({
                url: "ptwcardtpl/ptwcardstuffs/list/{curPage}/{pageSize}",
                columns: [
                    LIB.tableMgr.ksColumn.code,
                    {
                        title: "名称",
                        fieldName: "name",
                        keywordFilterName: "criteria.strValue.keyWordValue_name"
                    }, {
                        title: "",
                        fieldType: "tool",
                        toolType: "edit,del"
                    }]
            }),
        },
        formModel: {
            ptwCardStuffFormModel: {
                show: false,
                hiddenFields: ["tplId"],
                queryUrl: "ptwcardtpl/{id}/ptwcardstuff/{ptwCardStuffId}"
            },
        },
        cardModel: {
            ptwCardStuffCardModel: {
                showContent: true
            },
        },
        selectModel: {
            workCatalogSelectModel: {
                visible: false,
                filterData: {orgId: null}
            },
        },
        isSaveBtnAvailable: true,//保存按钮是否可点击


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
     *     el
     template
     components
     componentName
     props
     data
     computed
     watch
     methods
     _XXX                //内部方法
     doXXX                //事件响应方法
     beforeInit        //初始化之前回调
     afterInit            //初始化之后回调
     afterInitData        //请求 查询 接口后回调
     afterInitFileData  //请求 查询文件列表 接口后回调
     beforeDoSave        //请求 新增/更新 接口前回调，返回false时不进行保存操作
     afterFormValidate    //表单rule的校验通过后回调，，返回false时不进行保存操作
     buildSaveData        //请求 新增/更新 接口前回调，重新构造接口的参数
     afterDoSave        //请求 新增/更新 接口后回调
     beforeDoDelete        //请求 删除 接口前回调
     afterDoDelete        //请求 删除 接口后回调
     events
     vue组件声明周期方法
     init/created/beforeCompile/compiled/ready/attached/detached/beforeDestroy/destroyed
     **/
    var detail = LIB.Vue.extend({
        mixins: [LIB.VueMixin.dataDic, LIB.VueMixin.auth, LIB.VueMixin.detailPanel],
        template: tpl,
        components: {
            "pwtInfo": pwtInfo,
            "ptwcatalogSelectModal": ptwCatalogSelectModal,
            "ptwcardstuffFormModal": ptwCardStuffFormModal,

        },
        data: function () {
            return dataModel;
        },
        methods: {
            newVO: model.cardTpl,

            doEnableDisableSave: function () {
                this.doSave('disable')
            },

            doEnableDisable: function () {
                var _this = this;
                var data = _this.mainModel.vo;
                var params = {
                    id: data.id,
                    orgId: data.orgId,
                    disable: data.disable === "0" ? "1" : "0"
                };
                if (this.$api.updateDisable) {
                    this.$api.updateDisable(null, params).then(function (res) {
                        data.disable = (data.disable === "0") ? "1" : "0";
                        LIB.Msg.info((data.disable === "0") ? "启用成功" : "停用成功");
                        _this.$dispatch("ev_dtUpdate");
                    });
                } else {
                    this.$api.update(null, params).then(function (res) {
                        data.disable = (data.disable === "0") ? "1" : "0";
                        LIB.Msg.info((data.disable === "0") ? "启用成功" : "停用成功");
                        _this.$dispatch("ev_dtUpdate");
                    });
                }
            },

            getListCheck: function (data, type, code) {
                var jsonList = JSON.parse(data.columnSetting);
                // 校验作业方式
                var operatingTypesList = data.ptwCardStuffs.filter(function (item) {
                    return  item.type==type;
                }) || [];
                var operatingTypesObj = _.find(jsonList, function (item) {
                    return item.code==code;
                });
                if(operatingTypesObj && operatingTypesObj.disable == '0' && operatingTypesList.length==0){
                    return '请填写' + operatingTypesObj.name;
                }
                if(operatingTypesObj && operatingTypesObj.disable == '1'){
                    data.ptwCardStuffs =_.filter(data.ptwCardStuffs, function (item) {
                        return  item.type!=type;
                    }) || [];
                }
            },

            doSaveValiRoles: function (data) {
                var select = true;
                _.each(data.ptwCardSignRoles, function (item) {
                    if(item.enableCtrlMeasureVerification == '1'){
                        if(!_.find(data.ptwCardStuffs, function (stuff) {
                                return stuff.cardSignRoleId == item.id ;
                            })){
                            select = false;
                        }
                    }
                });
                if(!select) return '签发人未选择控制措施';
            },

            doSaveVali:function(data){

                var str = this.getListCheck(data, 9, 'operatingType');
                if(str) return str;
                var str = this.getListCheck(data, 1, 'mainEquipment');
                if(str) return str;
                var str = this.getListCheck(data, 2, 'specialWorker');
                if(str) return str;

                if(!data.name){
                    return "请填写许可证模板名称";
                }
                else if(data.name.length>20){
                    return "许可证模板名称请不要超过20个字符";
                }
                if(data.enableProcessIsolation=="1" || data.enableProcessIsolation=='2'){
                    var has=data.ptwCardStuffs.some(function(item){
                        return item.type=="5"
                    })
                    if(!has){
                        return "能量隔离中，启用了工艺隔离的情况下需要定制隔离方法";
                    }
                }
                if(data.enableGasDetection=="1" || data.enableGasDetection=="2" ){
                    var has=data.ptwCardStuffs.some(function(item){
                        return  item.gasType;
                    })
                    if(!has){
                        return "气体检测中，启用气体检检测必须定制需要检测的气体";
                    }
                }
                if(!data.extensionType){
                    return "作业关闭中,作业续签和作业延期必须选择一个";
;               }
                if(data.extensionTime){
                    if(isNaN(data.extensionTime) || data.extensionTime.indexOf('.')>-1) return '作业有效期为整数';
                    if(data.extensionTime.toString().length>10) return '作业有效期为10位以内的整数';
                    if(data.extensionTime%1>0) return '作业有效期为整数';
                }
                if(data.enableGasDetectionSigner == '1' && !data.gasDetectionRoleId){
                    return '请选择气体检测的执行人';
                }
                if(data.enableGasDetectionSigner == '1' && data.enableGasDetection=='0'){
                    return '请选择气体检测';
                }
                var select = true;
                _.each(data.ptwCardSignRoles, function (item) {
                    if(item.enableCtrlMeasureVerification == '1'){
                        if(!_.find(data.ptwCardStuffs, function (stuff) {
                            return stuff.cardSignRoleId == item.id ;
                        })){
                            select = false;
                        }
                    }
                    // if(item.enableCtrlMeasureVerification == '1' && item.type!='1'){
                    //     if(!_.find(data.ptwCardStuffs, function (stuff) {
                    //             return stuff.cardSignRoleId == item.id && (stuff.type=='11' )
                    //         })){
                    //         select = false;
                    //     }
                    // }
                });
                if(!select) return '签发人未选择控制措施';

                var isAllVerification = true;
                var enableCtrlMeasureVerifier = data.enableCtrlMeasureVerifier;
                var isAllChildren = true;
                var isAllGroupName = true;
                var isHasGroup = false;
                _.each(data.ptwCardStuffs, function (group) {
                    if(group.type == '4' && group.children){
                        isHasGroup = true;
                        if(!group.name) isAllGroupName = false;
                        if(group.children.length == 0){
                            isAllChildren = false;
                        }
                        else if(enableCtrlMeasureVerifier == '1'){
                            _.each(group.children, function (child) {
                                if(!child.ptwCardVerifiers)  {
                                    isAllVerification = false;
                                }
                                var obj = _.find(child.ptwCardVerifiers, function (verifier) {
                                    return !verifier.name
                                });
                                if(obj) {isAllVerification = false;}
                            })
                        }else if(enableCtrlMeasureVerifier != '1'){
                            _.each(group.children, function (child) {
                                child.ptwCardVerifiers = [];
                            })
                        }
                    }
                });
                // if(data.enableCtrlMeasureGroup == '1' && !isAllGroupName){
                //     return '请填写分组名';
                // }
                if(!isHasGroup){
                    return '未添加安全措施';
                }
                if(!isAllVerification){
                    return '控制措施存在未设置的核对人';
                }
                if(!isAllChildren){
                    return '控制措施存在组未设置条目';
                }


                // if(!select){
                //     return '请选择签发人控制措施'
                // }

            },
            doAdd4Copy: function() {
                var data = _.cloneDeep(this.mainModel.vo);
                var opts = { opType: "update", action: "copy" };
                this.init("update", data.id, data, opts)
                this.mainModel.vo.name = this.mainModel.vo.name + "（复制）";

            },
            doSave: function (str) {
                var sign = false;
                if (!this.isSaveBtnAvailable) {
                    LIB.Msg.warning("操作过于频繁，请稍后再试");
                    return;
                }
                var _this = this;
                // if(str!='disable' && this.mainModel.vo.disable){
                //     sign =
                //     this.mainModel.vo.disable = '1';
                // }
                if(str!='disable' ){
                    if(this.mainModel.vo.disable == '0')
                        sign = true;
                    this.mainModel.vo.disable = '1'
                }
                var data = JSON.parse(JSON.stringify(this.mainModel.vo)); // 复制信息进行校验
                var msg=this.doSaveVali(data);
                if(msg) {
                    LIB.Msg.error(msg);
                    return;
                }
                model.saveHandleTpl(data);
                var msg = this.doSaveValiRoles(data);
                if(msg){
                    LIB.Msg.error(msg);
                    return;
                }
                this.isSaveBtnAvailable = false;
                if (this.mainModel.action === "copy") {
                    api.create4copy({id: data.id}, data).then(function (res) {
                        LIB.Msg.success("复制成功");
                        _this.init("view", res.data.id, res.data);
                        _this.mainModel.vo.id = res.data.id;
                        _this.$dispatch("ev_dtCreate");
                        _this.isSaveBtnAvailable = true;
                    }, function () {
                        _this.isSaveBtnAvailable = true;
                    })
                } else {
                    var savefun = api.update;
                    if (this.mainModel.action == "create" && !this.mainModel.vo.id) {
                        savefun = api.create;
                    }
                    savefun(data).then(function (res) {
                        // 嵌套了 停用启用前  先调保存接口
                        if(str=='disable'){
                            setTimeout(function () {
                                _this.doEnableDisable()
                            }, 300)
                        }else{
                            LIB.Msg.success("保存成功");
                            if(sign){
                                setTimeout(function () {
                                    LIB.Msg.success("模板已经自动切换为停用状态");
                                },1000)
                            }
                        }

                        if (_this.mainModel.action == "create" && !_this.mainModel.vo.id) {
                            _this.mainModel.vo.id = res.data.id;
                            _this.mainModel.vo.code = res.data.code;
                            _this.changeView("view");
                            _this.$dispatch("ev_dtCreate");
                        } else {
                            _this.afterDoSave({type: "U"}, res.body);
                            _this.changeView("view");
                            _this.$dispatch("ev_dtUpdate");
                        }
                        _this.isSaveBtnAvailable = true;
                    }, function () {
                        _this.isSaveBtnAvailable = true;
                    })
                }
            },
            afterInitData: function () {
                // this.mainModel.isReadOnly=false;

                //处理数据，和子组件数据一致
                this.mainModel.vo.ptwCardStuffs = this.mainModel.vo.ptwCardStuffs.map(function (item) {
                    var pms = {
                        id: item.stuffId || item.id,
                        type: item.gasCatalog ? 4 : item.stuffType,//4 是为了查询其气体的接口
                        ppeCatalogId: item.ppeCatalogId,
                        gasType: item.gasCatalog ? item.gasCatalog.gasType : null,
                        name: item.gasCatalog ? item.gasCatalog.name : (item.ptwStuff? item.ptwStuff.name : ''),
                    };
                    if(item.children && item.stuffType=='4'){
                        pms.children = item.children;
                        pms.name = item.name;
                    }
                    if(item.cardSignRoleId && item.stuffType=='10'){
                        pms.cardSignRoleId = item.cardSignRoleId;
                    }
                    if(item.cardSignRoleId && item.stuffType=='11'){
                        pms.cardSignRoleId = item.cardSignRoleId;
                    }
                    return pms;
                });
                if (this.mainModel.action === "copy") {
                    this.mainModel.vo.code=this.mainModel.beforeEditVo.code;
                    this.storeBeforeEditVo();//  应为这了map原来的对象需要手动缓存一下
                    this.mainModel.vo.code='';
                    this.mainModel.vo.name = this.mainModel.vo.name + "（复制）";
                }
                model.handleTpl(this.mainModel.vo);
                if(this.mainModel.opType != 'create')
                    this.$broadcast("initData");//应为设计的问题，只能下发事件让他跟新内部属性置

                if(this.mainModel.vo.columnSetting.length <5){
                    this.getBaseSetting();
                }

            },
            beforeInit: function () {
                this.$refs.pwtInfo.changepwtInfoTypeSelectedIndex(0);
                // this.mainModel.vo  = model.cardTpl();
                // this.$refs.ptwcardstuffTable.doClearData();
            },
            afterInit: function (vo,pms) {
                var _this = this;
                commonApi.getCatalogList({type: 5}).then(function (data) {
                    var promise = {};
                    data.forEach(function (item) {
                        promise[item.commitmentType] = item.content;
                    });
                    LIB.Vue.set(_this.mainModel.vo, 'promiseList', promise);
                });

                if(pms.opType==="create"){
                    this.getBaseSetting()
                    this.$broadcast("initData", 'create');//应为设计的问题，只能下发事件让他跟新内部属性置
                }
            },
            getBaseSetting: function () {
                var _this = this;
                if(_this.mainModel.vo.columnSetting.length>5) return ;

                if(!_this.mainModel.baseSetting){
                    api.queryDefaultSetting().then(function (res) {
                        _this.mainModel.baseSetting = JSON.stringify(res.body);
                        _this.mainModel.vo.columnSetting = JSON.stringify(res.body);
                    });
                    return ;
                }
                _this.mainModel.vo.columnSetting = _this.mainModel.baseSetting;
            },
            doDelete: function() {
                //当beforeDoDelete方法明确返回false时,不继续执行doDelete方法, 返回undefine和true都会执行后续方法
                if (this.beforeDoDelete() === false) {
                    return;
                }

                var _vo = this.mainModel.vo;
                var _this = this;
                LIB.Modal.confirm({
                    title: '删除当前数据?',
                    onOk: function() {
                        // 从vo里面取orgid
                        _this.$api.remove(null, {id:_vo.id,orgId:_vo.orgId}).then(function() {
                            _this.afterDoDelete(_vo);
                            _this.$dispatch("ev_dtDelete");
                            LIB.Msg.info("删除成功");
                        });
                    }
                });
            },
            beforeDoDelete:function () {
                // delete this.mainModel.vo.closeRoles;
                // delete this.mainModel.vo.comments;
                // delete this.mainModel.vo.promiseList;
                // delete this.mainModel.vo.signRole;
                // delete this.mainModel.vo.workCatalog;
                // delete this.mainModel.vo.workLevel;
                // delete this.mainModel.vo.ptwCardSignRoles;
                // delete this.mainModel.vo.ptwCardStuffs;
            },
            doShowCopy: function () {
                this.$dispatch('do-show-copy', this.mainModel.vo);
            },
            _initCopy: function (id) {
                var _this = this;
                this.$api.get({id: id}).then(function (res) {
                    var data = res.data;
                    var tmpVo = _this.newVO();
                    _.extend(tmpVo, data);
                    _.extend(_this.mainModel.vo, tmpVo);
                    _this.storeBeforeEditVo();
                    _this.afterInitData();
                    _this.doAdd4Copy();
                })
            }
        },
        events: {
            'ev_doCopy':function (id) {
                this._initCopy(id)
            }
        },
        init: function () {
            this.$api = api;
        }
    });

    return detail;
});