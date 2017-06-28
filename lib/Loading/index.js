"use strict";
/*
<Loading  message={"正在加载中。。。"} maxShowTime={10}>
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var consts_1 = require("../consts");
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            rotate: 0,
            hidden: false
        };
        _this.hiddenFlag = false;
        _this.boxWidth = 0;
        return _this;
    }
    Loading.getInstance = function (loading) {
        if (loading) {
            var wrap = document.createElement('div');
            document.body.appendChild(wrap);
            var handle = ReactDOM.render(loading, wrap);
        }
    };
    Loading.prototype.getBoxWidth = function () {
        var box = ReactDOM.findDOMNode(this);
        this.boxWidth = box.clientWidth;
        if (this.boxWidth > 375) {
            this.boxWidth = 375;
        }
        return this.boxWidth;
    };
    Loading.prototype.resizeWith = function () {
        this.getBoxWidth();
        this.setState(function (props, state) { return state; });
    };
    Loading.prototype.componentDidMount = function () {
        this.getBoxWidth();
        this.setState(function (props, state) { return state; });
        if (!this.hiddenFlag && this.props.maxShowTime) {
            this.hiddenFlag = true;
            setTimeout(this.hide.bind(this), this.props.maxShowTime * 1000);
        }
        window.addEventListener('resize', this.resizeWith.bind(this));
    };
    Loading.prototype.hide = function () {
        this.setState({ hidden: true });
    };
    Loading.prototype.componentWillUnmount = function () {
        this.hiddenFlag = false;
        window.removeEventListener('resize', this.resizeWith.bind(this));
    };
    Loading.prototype.render = function () {
        var message = this.props.message;
        var nprefix = consts_1.prefix + "loading";
        if (!this.state.hidden) {
            return (React.createElement("div", { className: "" + nprefix, style: { fontSize: 14 } },
                React.createElement("div", { className: nprefix + "-content", style: { width: this.boxWidth * 0.4, minHeight: this.boxWidth * 0.4 } },
                    React.createElement("div", { className: nprefix + "-image", style: { width: this.boxWidth * 0.2, height: this.boxWidth * 0.2 } },
                        React.createElement("img", { src: require('./images/timg0.jpg') })),
                    React.createElement("div", { className: nprefix + "-message" }, message))));
        }
        else {
            return null;
        }
    };
    return Loading;
}(React.Component));
exports["default"] = Loading;
