define(function (require) {
    //基础js
    var LIB = require('lib');
    var api = require("./vuex/api");

    // require("components/iviewTreeGrid");

    //编辑弹框页面
    // var detailComponent = require("./detail");
    //vue数据 配置url地址 拉取数据
    var dataModel = {
        moduleCode: LIB.ModuleCode.BS_BaC_MenM,
        //table组件的写法
        url: "authoritySetting/list",
        // updateModel: {
        //     //显示弹框
        //     show: false,
        //     title: "修改",
        //     id: null
        // },
        // addModel: {
        //     //显示弹框
        //     show: false,
        //     title: "修改",
        //     id: null
        // },
        data: null,
        selectedDatas: [],
        //控制展开
        showHide: false,
        //修改name
        treeGridName: null,
        // innerAddFun: {
        //     type: Function
        // },
        treedata: null,
        assistFunc: function (item) {
            if (item.code && item.value) {
                return '<span style="display: inline-block;width: 180px;">' + item.code + '</span><span style="display: inline-block;width: 150px;">' + item.value + '</span>';
            }
            return '';
        }
    };
    var vm = LIB.VueEx.extend({
        //引入html页面
        template: require("text!./main.html"),
        //mixins: [LIB.VueMixin.dataDic, LIB.VueMixin.auth, LIB.VueMixin.mainPanel],
        // components: {
        //     "detailcomponent": detailComponent
        // },
        data: function () {
            return dataModel;
        },
        methods: {
            //全部显示
            treeShowList: function () {
                this.$refs.treegrid.$children[0].doShowNode(function () {
                })
            },
            //全部隐藏
            treeHide: function () {
                this.$refs.treegrid.$children[0].doHideNode(function () {
                })
            },
            // //新增
            // doAddNode: function (value, innerAddFun) {
            //     this.innerAddFun = innerAddFun;
            //     this.addModel.title = "新增"
            //     this.$broadcast('ev_detailReload', value, "add");
            //     this.addModel.show = true;
            // },
            // //修改
            // doEditNode: function (value) {
            //     this.addModel.title = "修改";
            //     this.treeGridName = value;
            //     this.$broadcast('ev_detailReload', value, "update");
            //     this.addModel.show = true;
            // },
            // //删除
            // doDelNode: function (value) {
            //     var _data = value.data;
            //     var _this = this;
            //     var callback = function (res) {
            //         LIB.Msg.info("删除成功");
            //         value.parentChildren.splice(value.parentChildren.indexOf(value.data), 1);
            //     };
            //     api.del(null, _data).then(callback)
            // },

            doTreeDataReady: function (data) {
                this.treedata = data;
            },
            //获取数据
            retrieveData: function () {
                var _this = this;
                api.list().then(function (res) {
                    _this.data = res.data;
                })
            },
            refreshData: function () {
                api.init();
                this.retrieveData();
                LIB.Msg.info("刷新成功");
            }
            // doupdate: function (value, flag) {
            //     if (flag == "add") {
            //         var obj = {
            //             id: value.vo.id,
            //             code: value.vo.code,
            //             key: value.vo.key,
            //             value: value.vo.value,
            //             name: value.vo.name,
            //             remarks: value.vo.remarks
            //         }
            //         if (this.innerAddFun) {
            //             this.innerAddFun(obj);
            //         } else {
            //             this.retrieveData();
            //         }
            //     } else {
            //         this.treeGridName.data.name = value.vo.name;
            //         this.treeGridName.data.code = value.vo.code;
            //         this.treeGridName.data.key = value.vo.key;
            //         this.treeGridName.data.value = value.vo.value;
            //         this.treeGridName.data.remarks = value.vo.remarks;
            //         this.treeGridName.data.disable = value.vo.disable;
            //     }
            //     this.addModel.show = false;
            // },

        },
        /*events: {

		},*/
        ready: function () {
            this.retrieveData();
        },

    })
    return vm;
})