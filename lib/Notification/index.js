"use strict";
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
var Content_1 = require("./Content");
var Container_1 = require("./Container");
var consts_1 = require("../consts");
var classnames = require("classnames");
var nprefix = consts_1.prefix + "notification";
var States;
(function (States) {
    States[States["none"] = 0] = "none";
    States[States["entering"] = 1] = "entering";
    States[States["entered"] = 2] = "entered";
    States[States["leaveing"] = 3] = "leaveing";
    States[States["leaved"] = 4] = "leaved";
})(States = exports.States || (exports.States = {}));
var contentClassNames = (_a = {},
    _a[States.none] = '',
    _a[States.entering] = nprefix + "-animation-entering",
    _a[States.entered] = nprefix + "-animation-entering " + nprefix + "-animation-entered",
    _a[States.leaveing] = nprefix + "-animation-leaving",
    _a[States.leaved] = nprefix + "-animation-leaving " + nprefix + "-animation-leaved",
    _a);
var Notification = (function (_super) {
    __extends(Notification, _super);
    function Notification(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            message: '',
            state: props.visible ? States.entering : States.none
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
        var visible = nextProps.visible;
        if (visible) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    Notification.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        var _a = this.props, duration = _a.duration, visible = _a.visible;
        var state = this.state.state;
        clearTimeout(this.handle);
        if (state === States.entering) {
            this.handle = setTimeout(function () {
                _this.setState({ state: States.entered });
            }, 0);
        }
        else if (duration > 0 && state === States.entered) {
            this.handle = setTimeout(function () {
                _this.setState({ state: States.leaveing });
            }, (duration + 0.3) * 1000);
        }
        else if (state === States.leaveing) {
            this.setState({ state: States.leaved });
        }
        else if (state === States.leaved) {
            this.handle = setTimeout(function () {
                _this.setState({ state: States.none });
            }, 300);
        }
    };
    Notification.prototype.componentDidMount = function () {
        var _this = this;
        var state = this.state.state;
        if (state === States.entering) {
            setTimeout(function () {
                _this.setState({ state: States.entered });
            }, 0);
        }
    };
    Notification.prototype.show = function (message) {
        var _this = this;
        if (message === void 0) { message = ''; }
        var state = this.state.state;
        var duration = this.props.duration;
        clearTimeout(this.handle);
        if (state === States.none) {
            this.setState({ message: message, state: States.entering });
        }
        else if (state === States.entering || (state === States.entered && duration > 0)) {
            this.setState({ message: message });
        }
        else if (state === States.leaveing) {
            this.setState({ message: message, state: States.entered });
        }
        else if (state === States.leaved) {
            setTimeout(function () {
                _this.setState({ message: message, state: States.entering });
            }, 300);
        }
    };
    Notification.prototype.hide = function () {
        var state = this.state.state;
        if (state !== States.none && state !== States.leaved && state !== States.leaveing) {
            clearTimeout(this.handle);
            this.setState({ state: States.leaveing });
        }
    };
    Notification.prototype.render = function () {
        var _a = this.props, reverse = _a.reverse, children = _a.children, extraClassName = _a.extraClassName, x = _a.x, y = _a.y, style = _a.style;
        var _b = this.state, message = _b.message, state = _b.state;
        var child = null;
        if (state !== States.none) {
            var className = classnames(extraClassName, contentClassNames[state]);
            child = React.createElement(Content_1["default"], { style: style, extraClassName: className, reverse: reverse }, message || children);
        }
        return (React.createElement(Container_1["default"], { x: x, y: y }, child));
    };
    return Notification;
}(React.Component));
Notification.defaultProps = {
    duration: 2,
    visible: false,
    reverse: false
};
exports["default"] = Notification;
var _a;
