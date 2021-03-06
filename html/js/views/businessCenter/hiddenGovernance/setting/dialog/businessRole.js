define(function (require) {
    var LIB = require('lib');

    //数据模型
    var api = require("../vuex/api");

    //选择人组件
    var personComponent = require("./personComponent");
    //选择条件组件
    var conditionComponent = require("./condition");
    //选择角色组件
    var roleComponent = require("./roleComponent");

    //右侧滑出详细页
    var tpl = require("text!./businessRole.html");
    //弹窗选人
    var userSelectModal = require("../../../../../componentsEx/userSelect/userSelectModal");
    //初始化数据模型
    var newVO = function () {
        return {
            id: null,
            //人员结果值
            attr1: null,
            //角色结果值
            attr2: null,
            //角色部门
            attr3: null,
            //运算规则
            attr4: null,
            //流程设置记录id
            attr5: null,
            //审批阶段
            name: null,
            //组
            filterGroupId: null,
            //排序
            conditionSeq: null,
            //编码
            code:null
        }
    };
    //Vue数据
    var dataModel = {
        mainModel: {
            vo: newVO()
        },
        approvalStatus: LIB.getDataDicList("approval_stage"),
        tableModel: {
            itemColumns: [
                {
                    title: "编码",
                    fieldName: "code"
                },
                {
                    title: "名称",
                    fieldName: "name"
                },
                {
                    title:"详情",
                    fieldType:"datail",
                    showTip:true
                },
                {
                    title:"过滤条件",
                    fieldType:"custom",
                    render: function (data) {
                        return '<span class="text-link">编辑条件</span>';
                    }
                },
                {
                    title: "",
                    fieldType: "tool",
                    toolType: "del"
                }
            ],
            showFilter: false,
            showColumnPicker: false,
            showPager: true,
            urlDelete: "filterlookup",
            resetTriggerFlag: false,
            pageSizeOpts: [3]
        },
        personModel: {
            show: false,
            title: '选择人员',
            person: {
                id: null,
                name: null
            }
        },
        roleModel: {
            show: false,
            title: '选择角色',
            role: {
                id: null,
                name: null
            },
            orgId: ''
        },
        conditionModel: {
            show: false,
            title: '编辑条件',
            model: [],
            express: null
        },
        //哪个审批阶段
        rowIndex: 0,
        //审批阶段中第几行数据
        itemIndex: 0,
        //table 2016.12.22
        popTableModel:{
            index:null,
            id: null,
            name:null,
            attr1:null,
            conditionSeq:null,
            parentId:null,
            code:null
        },
        showModal:false

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
        template: tpl,
        components: {
            "person-component": personComponent,
            "condition-component": conditionComponent,
            "role-component": roleComponent,
            "userSelectModal":userSelectModal
        },
        props: {
            groups: {
                type: Array,
                required: true,
                'default': function () {
                    return [];
                }
            }
        },
        data: function () {
            return dataModel;
        },
        methods: {
            doTableCellClick: function (data) {
                if (data.cell.colId == 3) {
                    this.itemIndex = data.cell.rowId;
                    this.$broadcast('ev_conditionModel', data.entry.data);
                    this.conditionModel.show = true;
                }
            },
            doClose: function () {
                this.$dispatch("ev_editCanceled");
            },
            doAddPerson: function (index, group) {
                this.rowIndex = index;
                this.popTableModel.parentId=group.id;
                this.popTableModel.conditionSeq=group.filterLookups?group.filterLookups.length:0;
                this.popTableModel.index=index;
                this.$broadcast('ev_personReload', group.id, this.popTableModel.conditionSeq,index);
                this.showModal = true;
            },
            doAddRole: function (index, group) {
                this.rowIndex = index;
                this.popTableModel.parentId=group.id;
                this.popTableModel.conditionSeq=group.filterLookups?group.filterLookups.length:0;
                this.$broadcast('ev_roleReloadData', group.id, this.popTableModel.conditionSeq,index);
                this.roleModel.show = true;
            },
            delItemRelRowHandler: function (data) {
                var _this = this;
                var ids = [];
                ids[0] = data.entry.data.id;
                api._deleteFilterLookup(null, ids).then(function () {
                    LIB.Msg.success("删除成功");
                    _.each(_this.groups, function (item, i) {
                        if (item.id == data.entry.data.parentId) {
                            _.each(item.filterLookups,function(entry){
                                if(data.entry.data.id == entry.id){
                                    item.filterLookups.splice(0, 1);
                                    return
                                }
                            })
                            return
                        }
                    });
                })
            },
            doDel:function(index,group){
                if(group.filterLookups.length>0){
                    LIB.Msg.warning("不能删除");
                }
            },
            doSaveSelect: function (selectedDatas) {
                var _this=this;
                _this.mainModel.selectedDatas=selectedDatas;
                api.getUUID().then(function (res) {
                    _this.popTableModel.id = res.data;
                });

                var row = this.mainModel.selectedDatas[0];
                if (!row) {
                    LIB.Msg.warning("请选择人员");
                    return;
                }
                _this.popTableModel.attr1=row.id;
                _this.popTableModel.name=row.username;
                _this.popTableModel.code=row.code;
                //保存条件分组
                api.saveFilterLookup(_.pick(_this.popTableModel,"attr1", "name","conditionSeq",'parentId','id',"code")).then(function (res) {
                    _this.$dispatch("ev_personSaved", _this.popTableModel,_this.popTableModel.index);
                    LIB.Msg.info("添加人员成功");
                });
            }
        },
        events: {
            "ev_roleSaved": function (role,index) {
                var item = this.groups[index];
                var roleData={
                    "attr2":role.attr1,
                    "attr3":role.attr3,
                    "name":role.name,
                    "conditionSeq":role.conditionSeq,
                    'parentId':role.parentId,
                    'id':role.id,
                    'code':role.code
                };
                item.filterLookups.push(roleData);
                this.roleModel.show = false;
                this.tableModel.resetTriggerFlag = true;
            },
            "ev_personSaved": function (person,index) {
                var item = this.groups[index];
                var personData={
                    "attr1":person.attr1,
                    "name":person.name,
                    "conditionSeq":person.conditionSeq,
                    'parentId':person.parentId,
                    'id':person.id,
                    'code':person.code
                };;
                item.filterLookups.push(personData);

                this.tableModel.resetTriggerFlag = true;
                this.personModel.show = false;
            },
            "ev_conditionSaved": function (conditions, express) {
                var item = this.groups[this.rowIndex];
                item.filterLookups[this.itemIndex].datail = this.conditionModel.express;
                item.filterLookups[this.itemIndex].filterConditions = conditions;
                this.conditionModel.show = false;


                this.tableModel.resetTriggerFlag = true;
            }
        }
    });

    return detail;
});