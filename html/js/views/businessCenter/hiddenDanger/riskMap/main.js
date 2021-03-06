define(function (require) {
    var LIB = require('lib');
    var template = require("text!./main.html");

    var riskMapArea = require("../riskMapArea/main");
    var riskMapOverview = require("../riskMapOverview/main");

    //首页效果
    var component = LIB.Vue.extend({
        mixins: [LIB.VueMixin.dataDic, LIB.VueMixin.auth],
        template: template,
        components: {
            riskMapArea: riskMapArea,
            riskMapOverview: riskMapOverview
        },
        data: function () {
            return {
                pictureId:  ''
            };
        },
        methods: {
            go: function (id, orgId) {
                this.pictureId = id;
                this.$route.query.pictureId = id;
                this.$route.query.orgId = orgId;
                this.$router.go(this.$route)
            },
            back: function () {
                var paths = this.$route.path.split("?");
                this.pictureId = '';
                this.$router.go({path: paths[0]});
            }
        },
        //初始化
        created: function () {
            this.pictureId = this.$route.query.pictureId;
        }
    });
    return component;
});
