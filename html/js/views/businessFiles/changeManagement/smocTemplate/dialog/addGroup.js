define(function (require) {

    var LIB = require('lib');
    var tpl = require("text!./addGroup.html");
    var userSelectModal = require("componentsEx/selectTableModal/userSelectModal");
    var multiInputSelect = require("componentsEx/multiInputSelector/main");
    var api = require("../vuex/api");
    var newVO = function () {
        return {
            id: null,
            //
           
            name: null,
            measure: null,
            //禁用标识 0未禁用，1已禁用
            result: 0,
            orderNo:null
         
        }
    };
    var initDataModel = {
            isDisable: false,
            mainModel: {
                vo: newVO(),
                title: "新增",
                rules: {
                    'name':[ LIB.formRuleMgr.require("风险项"),LIB.formRuleMgr.length(100)],
                    
                    // "measure": [
                    //     LIB.formRuleMgr.require("控制措施"),LIB.formRuleMgr.length(200)
                    // ],
                    // 'handler.id':[
                    //     {
                    //         validator: function (rule, val, callback) {
                    //             var vo = initDataModel.mainModel.vo;

                    //             return  callback();

                    //             /*  暂时不需要 */
                    //             if (vo.result == 1) {
                    //                 if (_.isEmpty(val)) {
                    //                     callback(new Error("请选择落实人"))
                    //                 }else{
                    //                     callback()
                    //                 }

                    //             } else {
                    //                 callback()
                    //             }

                    //         },
                    //         required: false,
                    //     }
                    // ],

                }
            },
            userSelectModel: {
                show: false,
                filterData: {}
            },
            rules: {

            },
            user: []
        };
    

    var opts = {
        template: tpl,
        data: function () {
            var data = initDataModel;
            return data;
        },
        watch: {
          "mainModel.vo.result": function (val) {
              this.mainModel.vo.result = val;
              var obj = this.mainModel.rules['measure'];
              obj = [];
              if(val == '1'){
                  obj=[LIB.formRuleMgr.require("控制措施"),LIB.formRuleMgr.length(200)]
              }else {
                  obj=[LIB.formRuleMgr.length(200)]
              }
              this.$set('mainModel.rules.measure', obj);
          }
        },
        components: {
            "userSelectModal": userSelectModal,
            'multiInputSelect': multiInputSelect
        },
        // watch: {
        //     visible: function (val) {
        //         if (!val) {

        //           }
        //     },

        // },
        props: {
            visible: {
                type: Boolean,
                default: false
            },

        },
        computed: {

        },
        methods: {
            dochange: function (val) {
                val == true ? this.mainModel.vo.mocRiskResult = 1 : this.mainModel.vo.mocRiskResult = 0
            },
            doShowSelectUserModal: function () {
                this.userSelectModel.show = true;
            },
            doCancel: function () {
                this.visible = false;
            },
            doSave: function () {
                var _this = this
                // if (this.mainModel.vo.result!=1) {
                //     this.mainModel.vo.handler={id:''}
                //     this.mainModel.vo.measure = null;
                // }
                this.$refs.ruleform.validate(function (valid) {
                    if (valid) {
                        _this.$emit('do-save', _this.mainModel.vo, _this.mainModel.title)
                        _this.visible = false
                    }
                })
            },
            doSaveSelect: function (val) {
                this.mainModel.vo.handler = val[0]
            },
        },
        events: {
            doCeateGroup: function (group) {

                this.visible = true
                this.mainModel.title = '新增'
                this.mainModel.vo.id = null
                // this.mainModel.vo.groupId = group.id
                // this.mainModel.vo.result
                this.mainModel.vo.code=null
                // this.mainModel.vo.measure = null
                this.mainModel.vo.name = null
                this.mainModel.vo.result = 0
            },
            doUpdateGroup: function (group, disable) {
                this.isDisable = !!disable;
                this.visible = true
                this.mainModel.title = '编辑'
                // this.mainModel.vo.handler = {}
                this.mainModel.vo=newVO()
                _.extend(this.mainModel.vo, group)
            },
        },
    };

    var component = LIB.Vue.extend(opts);
    return component;

});