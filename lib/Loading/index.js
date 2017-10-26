/*
<Loading  message={"正在加载中。。。"} maxShowTime={10}>
*/
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
var consts_1 = require("../consts");
var Loading = (function (_super) {
    tslib_1.__extends(Loading, _super);
    // public handle:any
    function Loading(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hidden: false
        };
        _this.hiddenFlag = false;
        _this.boxWidth = 0;
        _this.handler = null;
        _this.resizeWith = _this.resizeWith.bind(_this);
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
                    handle_1.hide();
                }
            };
        }
    };
    Loading.prototype.getBoxWidth = function () {
        this.boxWidth = ReactDOM.findDOMNode(this).clientWidth;
        if (this.boxWidth > 375) {
            this.boxWidth = 375;
        }
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
            this.handler = setTimeout(this.hide.bind(this), this.props.maxShowTime * 1000);
        }
        window.addEventListener('resize', this.resizeWith);
    };
    Loading.prototype.show = function (messageValue, showState) {
        var maxShowTime = showState ? showState.maxShowTime : this.props.maxShowTime;
        var message = messageValue || this.props.message;
        clearTimeout(this.handler);
        this.setState({ hidden: false, message: message });
        this.handler = setTimeout(this.hide.bind(this), maxShowTime * 1000);
    };
    Loading.prototype.hide = function () {
        clearTimeout(this.handler);
        this.handler = null;
        this.setState({ hidden: true });
    };
    Loading.prototype.componentWillUnmount = function () {
        this.hiddenFlag = false;
        window.removeEventListener('resize', this.resizeWith);
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
