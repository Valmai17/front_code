define(function(require) {
    var LIB = require('lib');
    var api = require("./vuex/api");
    //右侧滑出详细页
    var tpl = require("text!./detail.html");
    //初始化数据模型
    var newVO = function() {
        return {
            //主键
            id: null,
            //唯一标识
            code: null,
            //名称
            name: null,
            //禁用标识 0未禁用，1已禁用
            disable: null,
            //发布状态 1未发布 2已发布
            status: null,
            //结束时间
            endDate: null,
            //发布时间
            publishDate: null,
            //开始时间
            startDate: null,
            //修改日期
            modifyDate: null,
            //创建日期
            createDate: null,
            //审核表
            auditTable: { id: '', name: '' },
            //负责人
            user: { id: '', name: '', username: '' },
        }
    };
    //Vue数据
    var dataModel = {
        mainModel: {
            vo: newVO(),
            opType: 'view',
            isReadOnly: true,
            title: "",
            emptyRules: {}
        },
        tableModel: {},
        formModel: {},
        selectModel: {
            auditTableSelectModel: {
                visible: false,
                filterData: { orgId: null }
            },
            userSelectModel: {
                visible: false,
                filterData: { orgId: null }
            },
        },
        cardModel: {
            showLevelContent: true,
            showFactorContent: true
        },
        factors: null
    };
    //Vue组件
    var detail = LIB.Vue.extend({
        mixins: [LIB.VueMixin.dataDic, LIB.VueMixin.auth, LIB.VueMixin.detailPanel],
        template: tpl,
        data: function() {
            return dataModel;
        },
        methods: {
            newVO: newVO,
            afterInitData: function(flag) {
                var _this = this;
                this.$api.getTreeData({ id: this.mainModel.vo.id, types: [1] }).then(function(data) {
                    _this.factors = data.data;
                    if(flag) {
                        LIB.Msg.info("刷新成功");
                    }
                })
            },
            getFactors: function() {
                this.afterInitData(1);
            }
        },
        events: {},
        init: function() {
            this.$api = api;
        }
    });

    return detail;
});
