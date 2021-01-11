define(function (require) {

    var LIB = require('lib');

    var initDataModel = function () {
        return {
            mainModel: {
                title: "选择",
                selectedDatas: []
            },
            tableModel: {
                url: "checktaskgroup/list/{curPage}/{pageSize}",
                selectedDatas: [],
                columns: [
                    {
                        title: "",
                        fieldName: "id",
                        fieldType: "cb"
                    },
                    {
                        title: "检查任务",
                        filterType: "text",
                        fieldName:"groupName",
                        render: function (data) {
                            return data.groupName + "#" + data.num;
                        },
                        width: 240
                    },
                    {
                        title: "检查表",
                        filterType: "text",
                        fieldType: "custom",
                        filterName: "criteria.strValue.checkTableName",
                        sortable :false,
                        render: function (data) {
                            // if (data.checkPlan) {
                            //     return _.pluck(data.checkPlan.checkObjectTableBeans, 'checkTableName').join(', ')
                            // }
                            if (data.checkPlan) {
                                var list = _.pluck(data.checkPlan.checkObjectTableBeans, 'checkTableName');
                                list = list.filter(function (item) {
                                    return item && item!='' && item!=null && item!=undefined
                                });
                                return list.join("，");
                            }
                        },
                        width: 240
                    },
                    {
                        title: "检查对象",
                        filterType: "text",
                        fieldType: "custom",
                        filterName: "criteria.strValue.checkObjName",
                        sortable :false,
                        render: function (data) {
                            // if (data.checkPlan) {
                            //     return _.pluck(data.checkPlan.checkObjectTableBeans, 'checkObjName').join(', ')
                            // }
                            if (data.checkPlan) {
                                var list = _.pluck(data.checkPlan.checkObjectTableBeans, 'checkObjName');
                                list = _.union(list).join("，")
                                return list;
                            }
                        },
                        width: 240
                    },
                    {
                        //检查人
                        title: "检查人",
                        fieldName: "checkUser.name",
                        orderName: "checkerId",
                        filterType: "text",
                        filterName: "criteria.strValue.checkUserName",
                        width: 100,
                        render: function (data) {
                            if (data.checkUser) {
                                return data.checkUser.name;
                            }else if(data.checkerNames){
                                return data.checkerNames;
                            }
                        }
                    },
                    {
                        //任务状态 默认0未到期 1待执行 2按期执行 3超期执行 4未执行
                        title: "任务状态",
                        fieldType: "custom",
                        orderName: "status",
                        filterType: "enum",
                        render: function (data) {
                            return LIB.getDataDic("task_group_status", data.status);
                        },
                        filterName: "criteria.intsValue.status",
                        popFilterEnum: LIB.getDataDicList("task_group_status"),
                        width: 100
                    },
                    {
                        //开始时间
                        title: "开始时间",
                        fieldName: "startDate",
                        filterType: "date",
                        width: 180
                    },
                    {
                        //结束时间
                        title: "结束时间",
                        fieldName: "endDate",
                        filterType: "date",
                        width: 180
                    }
                ],
                defaultFilterValue: {"criteria.orderValue": {fieldName: "start_date",orderType: "1"}}
            }
        };
    }

    var opts = {
        mixins: [LIB.VueMixin.selectorTableModal],
        data: function () {
            return initDataModel();
        }
    };

    var component = LIB.Vue.extend(opts);
    return component;
});