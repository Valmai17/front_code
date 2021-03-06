define(function (require) {
    if(window.location.protocol == 'https')
        require("https://api.map.baidu.com/getscript?v=3.0&ak=ZjeNT2GfetESSxg3ynE0pmRmWn730NGp&services=&t=20190123102315");
    else
        require("http://api.map.baidu.com/getscript?v=3.0&ak=ZjeNT2GfetESSxg3ynE0pmRmWn730NGp&services=&t=20190123102315");
    // require("./baiduMapApi");
// console.log(window.location.protocol)
    var Overlay = {};

    /**
     * 圆形自定义覆盖物
     * @param point
     * @param text
     * @constructor
     */
    function CircleOverlay(point, item) {
        this._point = point;
        this._item = item;
    }
    // 继承API的BMap.Overlay
    CircleOverlay.prototype = new BMap.Overlay();
    // 实现初始化方法
    CircleOverlay.prototype.initialize = function(map){
        // 保存map对象实例
        this._map = map;
        // 创建div元素，作为自定义覆盖物的容器
        var div = document.createElement("div");
        div.classList.add("bdm-overlay-circle");
        div.textContent = this._item.name;
        div.dataset.id = this._item.id;
        div.style.backgroundColor = Overlay.colorMap[this._item.riskLevel];

        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div);
        // 保存div实例
        this._div = div;
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
        // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
        return div;
    };
    CircleOverlay.prototype.draw = function(){
        var position = this._map.pointToOverlayPixel(this._point);
        this._div.style.left = position.x - 42 + "px";
        this._div.style.top = position.y - 42 + "px";
    };
    CircleOverlay.prototype.addEventListener = function(event,fun){
        this._div.addEventListener(event, fun, false);
    };


    /**
     * 矩形自定义覆盖物
     * @param point
     * @param text
     * @constructor
     */
    function RectOverlay(point, item, parentName) {
        this._point = point;
        this._item = item;
        this._parentName = parentName;
    }
    RectOverlay.prototype = new BMap.Overlay();
    RectOverlay.prototype.initialize = function(map){

        var item = this._item;
        var color =  Overlay.colorMap[item.riskLevel];
        this._map = map;
        var div = document.createElement("div");
        div.classList.add("bdm-overlay-rect");
        div.dataset.id = item.id;

        var span = document.createElement("span");
        span.classList.add("bdm-overlay-rect-text");
        // span.textContent = this._parentName + "-" + this._item.name;
        span.style.fontSize = "16px";
        span.style.padding = "5px";
        span.style.fontWeight = "00";

        if (item.defalutLevel) {//默认等级
            span.textContent = item.name;
            span.style.backgroundColor = Overlay.colorMap[item.defalutLevel];
            if(item.defalutLevel == '1' || item.defalutLevel == '3'){
                span.style.color = "#676363";
            }
        } else {
            span.textContent = item.name;
            span.style.backgroundColor = color;
            span.style.color = "#676363";
        }
        div.appendChild(span);

        var arrowEl = document.createElement("i");
        arrowEl.classList.add("bdm-overlay-arrow");
        arrowEl.style.borderTopColor = color;
        div.appendChild(arrowEl);

        map.getPanes().markerPane.appendChild(div);
        this._div = div;
        return div;
    };
    RectOverlay.prototype.draw = function(){
        var position = this._map.pointToOverlayPixel(this._point);
        this._div.style.left = position.x - 42 + "px";
        this._div.style.top = position.y - 42 + "px";
    };
    RectOverlay.prototype.addEventListener = function(event,fun){
        this._div.addEventListener(event, fun, false);
    };



    function ZoomControl(action, cb, x, y, text) {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
        this.defaultOffset = new BMap.Size(x, y);
        this.action = action;
        this.callback = cb;
        this.text = text;
    }

    // 通过JavaScript的prototype属性继承于BMap.Control
    ZoomControl.prototype = new BMap.Control();

    ZoomControl.prototype.initialize = function(map){
        var _this = this;
        // 创建一个DOM元素
        var div = document.createElement("div");
        // 添加文字说明
        div.appendChild(document.createTextNode(this.text));
        // 设置样式
        div.style.cursor = "pointer";
        div.style.border = "1px solid gray";
        div.style.backgroundColor = "white";
        div.style.height = "30px";
        div.style.width = "30px";
        div.style.textAlign = "center";
        div.style.lineHeight = "28px";
        div.style.fontSize = "30px";
        // 绑定事件,点击一次放大两级
        div.onclick = function(e){
            _this.callback(_this.action);
            // map.setZoom(map.getZoom() + 2);
        };
        // 添加DOM元素到地图中
        map.getContainer().appendChild(div);
        // 将DOM元素返回
        return div;
    };

    Overlay.CircleOverlay = CircleOverlay;
    Overlay.RectOverlay = RectOverlay;
    Overlay.ZoomControl = ZoomControl;

    Overlay.colorMap = {};
    // "1": "#0033cc",
    // "2": "#e5e514",
    // "3": "#ff0000"

    Overlay.setColorMap = function (obj) {
        Overlay.colorMap = obj;
    };


    return Overlay;
});
