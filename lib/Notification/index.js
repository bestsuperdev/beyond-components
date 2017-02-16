"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
var React = require("react");
var ReactDOM = require("react-dom");
var Content_1 = require("./Content");
var Container_1 = require("./Container");
var Notification = (function (_super) {
    __extends(Notification, _super);
    function Notification(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            visible: props.visible,
            message: ''
        };
        _this.hide = _this.hide.bind(_this);
        _this.show = _this.show.bind(_this);
        return _this;
    }
    Notification.getInstance = function (notification) {
        if (notification) {
            var wrap = document.createElement('div');
            document.body.appendChild(wrap);
            var handle_1 = ReactDOM.render(notification, wrap);
            return {
                show: function (message) {
                    handle_1.show(message);
                },
                hide: function () {
                    handle_1.hide();
                }
            };
        }
    };
    Notification.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(function (state, props) { return ({ visible: nextProps.visible }); });
    };
    Notification.prototype.componentDidUpdate = function (prevProps, prevState) {
        var duration = this.props.duration;
        if (duration > 0 && this.state.visible) {
            clearTimeout(this.handle);
            this.handle = setTimeout(this.hide, duration * 1000);
        }
    };
    Notification.prototype.componentDidMount = function () {
        var duration = this.props.duration;
        if (duration > 0 && this.state.visible) {
            this.handle = setTimeout(this.hide, duration * 1000);
        }
    };
    Notification.prototype.show = function (message) {
        if (message === void 0) { message = ''; }
        this.setState(function (state, props) { return ({ visible: true, message: message }); });
    };
    Notification.prototype.hide = function () {
        this.setState(function (state, props) { return ({ visible: false, message: '' }); });
    };
    Notification.prototype.render = function () {
        var _a = this.props, reverse = _a.reverse, children = _a.children, extraClassName = _a.extraClassName, x = _a.x, y = _a.y;
        var message = this.state.message;
        var child = this.state.visible ? (React.createElement(Content_1["default"], { extraClassName: extraClassName, reverse: reverse }, children || message)) : null;
        return (React.createElement(Container_1["default"], { x: x, y: y },
            React.createElement(ReactCSSTransitionGroup, { transitionName: "notification-animation", transitionEnterTimeout: 300, transitionLeaveTimeout: 300 }, child)));
    };
    return Notification;
}(React.Component));
Notification.defaultProps = {
    duration: 2,
    visible: false,
    reverse: false
};
exports.__esModule = true;
exports["default"] = Notification;
