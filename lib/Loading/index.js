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
    // public handle:any
    function Loading(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            rotate: 0,
            hidden: false
        };
        _this.hiddenFlag = false;
        _this.boxWidth = 0;
        _this.handler = null;
        return _this;
    }
    Loading.getInstance = function (loading) {
        if (loading) {
            var wrap = document.createElement('div');
            document.body.appendChild(wrap);
            var handle_1 = ReactDOM.render(loading, wrap);
            return {
                show: function (message, showState) {
                    handle_1.show(message, showState);
                },
                hide: function () {
                    // console.log("123")
                    handle_1.hide();
                }
            };
        }
    };
    Loading.prototype.getBox = function () {
        this.box = ReactDOM.findDOMNode(this);
        return this.box;
    };
    Loading.prototype.getBoxWidth = function () {
        this.boxWidth = this.box.clientWidth;
        if (this.boxWidth > 375) {
            this.boxWidth = 375;
        }
        return this.boxWidth;
    };
    Loading.prototype.resizeWith = function () {
        // if(this.getBox() != null) {
        // debugger
        this.getBox();
        this.getBoxWidth();
        this.setState(function (props, state) { return state; });
        // }    
    };
    Loading.prototype.componentDidMount = function () {
        this.getBox();
        this.getBoxWidth();
        this.setState(function (props, state) { return state; });
        if (!this.hiddenFlag && this.props.maxShowTime) {
            this.hiddenFlag = true;
            this.handler = setTimeout(this.hide.bind(this), this.props.maxShowTime * 1000);
        }
        window.addEventListener('resize', this.resizeWith.bind(this));
    };
    Loading.prototype.show = function (messageValue, showState) {
        var maxShowTime = showState ? showState.maxShowTime : this.props.maxShowTime;
        var message = messageValue || this.props.message;
        clearTimeout(this.handler);
        this.setState({ hidden: false, message: message });
        this.handler = setTimeout(this.hide.bind(this), maxShowTime * 1000);
    };
    Loading.prototype.hide = function () {
        console.log("clear it");
        clearTimeout(this.handler);
        this.handler = null;
        this.setState({ hidden: true });
    };
    Loading.prototype.componentWillUnmount = function () {
        this.hiddenFlag = false;
        window.removeEventListener('resize', this.resizeWith.bind(this));
    };
    Loading.prototype.render = function () {
        var message = this.props.message;
        message = this.state.message || message;
        var nprefix = consts_1.prefix + "loading";
        return (React.createElement("div", { className: "" + nprefix, style: { fontSize: 14 } }, !this.state.hidden && React.createElement("div", { className: nprefix + "-content", style: { width: this.boxWidth * 0.4, minHeight: this.boxWidth * 0.4 } },
            React.createElement("div", { className: nprefix + "-image", style: { width: this.boxWidth * 0.2, height: this.boxWidth * 0.2 } },
                React.createElement("img", { src: require('./images/loading.jpg') })),
            React.createElement("div", { className: nprefix + "-message" }, message))));
    };
    return Loading;
}(React.Component));
exports["default"] = Loading;
