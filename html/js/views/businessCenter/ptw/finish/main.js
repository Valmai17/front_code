define(function (require) {
    //基础js
    var LIB = require('lib');
    var api = require("../todo/vuex/api");
    var commonApi = require("../api");
    var tpl = LIB.renderHTML(require("text!./main.html"));
    var contactPtw=require("../components/modalPtwFill/contactPtw/contactPtw");
    //编辑弹框页面fip (few-info-panel)
    // var detailPanel = require("./detail");      //修改 detailPanelClass : "middle-info-aside"
    //编辑弹框页面bip (big-info-panel)
//	var detailPanel = require("./detail-xl");   //修改 detailPanelClass : "large-info-aside"
    //编辑弹框页面bip (big-info-panel) Legacy模式
 var detailPanel = require("../todo/detail-tab-xl");//修改 detailPanelClass : "large-info-aside"
    var workCardApi = require("../workCard/vuex/api");
    var preview = require("../todo/dialog/preview");
    var model = require("../model");

    //Legacy模式
//	var ptwWorkCardFormModal = require("componentsEx/formModal/ptwWorkCardFormModal");

	// LIB.registerDataDic("iptw_work_card_enable_reservation", [
	// 	["0","否"],
	// 	["1","是"]
	// ]);
    //
	// LIB.registerDataDic("iptw_work_card_audit_result", [
	// 	["1","通过"],
	// 	["2","不通过"]
	// ]);

    
    var initDataModel = function () {
        return {
            moduleCode: "ptwWorkCardFinish1",
            //控制全部分类组件显示
            mainModel: {
                vo:null,
                previewShow:false,
                showHeaderTools: false,
                //当前grid所选中的行
                selectedRow: [],
                // detailPanelClass : "middle-info-aside"
				detailPanelClass : "large-info-aside"
            },
            tableModel: LIB.Opts.extendMainTableOpt(
                {
                    url: "ptwworkcard/list{/curPage}{/pageSize}",
                    selectedDatas: [],
                    defaultFilterValue: {'criteria.intValue.dealt':1},
                    columns: [
                        LIB.tableMgr.column.cb,
                        LIB.tableMgr.column.code,
                        LIB.tableMgr.column.company,
                        {
                            title: "作业类型",
                            fieldName: "workCatalog.name",
                            orderName: "workCatalog.name",
                            filterType: "text",
                            render: function (data) {
                                if (data.workCatalog) {
                                    return data.workCatalog.name;
                                }
                                return '';
                            },
                            width:"130"
                        },
                        {
                            title: "作业级别",
                            fieldName: "workLevel.name",
                            orderName: "workLevel.name",
                            filterType: "text",
                            width:"130"
                        },
                        {
                            title: "作业申请人",
                            fieldName: "applicant.name",
                            orderName: "applicant.name",
                            filterType: "text",
                            width: "118"
                        },
                        {
                            title: "状态",
                            fieldName: "status",
                            orderName: "status",
                            filterType: "enum",
                            fieldType: "custom",
                            filterName: "criteria.intsValue.status",
                            width: '85',
                            popFilterEnum: LIB.getDataDicList("iptw_work_status"),
                            render: function (data) {
                                if (data.status) {
                                    return LIB.getDataDic('iptw_work_status', data.status)
                                }
                            },
                        },
                        {
                            title: "作业内容",
                            fieldName: "workContent",
                            orderName: "workContent",
                            filterType: "text",
                            width: 270,
                            render: function (data) {
                                if (data.workPermit) {
                                    return    data.workPermit.workContent
                                }
                                return data.workContent;
                            },
                        },
                        {
                            title: "作业地点",
                            fieldName: "workPlace",
                            orderName: "workPlace",
                            filterType: "text",
                            width: 270,
                            render: function (data) {
                                if (data.workPermit) {
                                    return    data.workPermit.workPlace
                                }
                                return data.workPlace;
                            },
                        },
                        {
                            title: "作业所在的设备",
                            fieldName: "workEquipment",
                            orderName: "workEquipment",
                            filterType: "text",
                            width: 270,
                            render: function (data) {
                                if (data.workPermit) {
                                    return    data.workPermit.workEquipment
                                }
                                return data.workEquipment;
                            },
                        },

                        LIB.tableMgr.column.createDate,

                    ]
                }
            ),
            detailModel: {
                show: false
            },
            uploadModel: {
                url: "/ptwworkcard/importExcel"
            },
            exportModel : {
                url: "/ptwworkcard/exportExcel",
                withColumnCfgParam: true
            },
			//Legacy模式
//			formModel : {
//				ptwWorkCardFormModel : {
//					show : false,
//				}
//			}

        };
    };

    var vm = LIB.VueEx.extend({
		mixins : [LIB.VueMixin.dataDic, LIB.VueMixin.auth, LIB.VueMixin.mainPanel],
		//Legacy模式
//		mixins : [LIB.VueMixin.dataDic, LIB.VueMixin.auth, LIB.VueMixin.mainLegacyPanel],
    	template: tpl,
        data: initDataModel,
        components: {
            "detailPanel": detailPanel,
			//Legacy模式
//			"ptwworkcardFormModal":ptwWorkCardFormModal,
            contactPtw:contactPtw,
            preview:preview
        },
        watch: {
            "tableModel.selectedDatas": function (val) {
                this.mainModel.vo = val[0];
            }
        },
        methods: {
            doConcatPtw:function(){
                this.$refs.contactPtw.init(this.tableModel.selectedDatas[0]);
            },
			//Legacy模式
//			doAdd : function(data) {
//				this.formModel.ptwWorkCardFormModel.show = true;
//				this.$refs.ptwworkcardFormModal.init("create");
//			},
//			doSavePtwWorkCard : function(data) {
//				this.doSave(data);
//			}
            gotoPreview:function () {
                var _this = this;
                api.getWorkCardDetail({id:this.mainModel.vo.id}).then(function (item) {
                    var vo = item.data;
                    workCardApi.tplDetail(_this.mainModel.vo.workPermit.cardTplId).then(function (model1) {
                        workCardApi.getWorkPermit(_this.mainModel.vo.workPermit.id).then(function (permit1) {
                            commonApi.getCatalogList({'criteria.intsValue':JSON.stringify({type:[6,7,8,9,10]})}).then(function (pro) {
                                    var promise = {};
                                    pro.forEach(function (item) {
                                        if((item.type == 10 || item.type==8 || item.type==9) && item.enableCommitment==1)
                                            promise[item.type] = item.content || item.name;
                                        else if(item.type != 10 && item.type!=8 && item.type!=9){
                                            promise[item.type] = item.content || item.name;
                                        }
                                    });

                                    permit1.promiseList = promise;
                                    model.getViewData(permit1, model1);
                                    _this.showPreview(vo, permit1);

                            });
                        });
                    })
                });
            },

            showPreview:function (vo, permit) {
                this.$refs.preview.init(vo, permit);
                this.mainModel.previewShow = true;
            }

        },
        events: {
        },
        init: function () {
            api.__auth__ = {
                "create": "7080003001",//发起作业
                'delete': '7080003003',//删除
                'deal': '7080003007',//处理
                'relate': '7080003008',//关联作业
                'preview': '7080003009',//预览
            };
            this.$api = api;

        },
    });

    return vm;
});
