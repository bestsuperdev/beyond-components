/**
 *
    let notice = Notification.getInstance(<Notification />)
    notice.show("hello world",{duration : 3})

    <Notification ref={(n)=> this.n = n } >hello notification</Notification>
    this.n.show()
 */
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
var Content_1 = require("./Content");
var Container_1 = require("./Container");
var consts_1 = require("../consts");
var classnames = require("classnames");
var assign = require('beyond-lib/lib/assign');
var nprefix = consts_1.prefix + "notification";
var States;
(function (States) {
    States[States["none"] = 0] = "none";
    States[States["entering"] = 1] = "entering";
    States[States["entered"] = 2] = "entered";
    States[States["leaveing"] = 3] = "leaveing";
    States[States["leaved"] = 4] = "leaved";
})(States = exports.States || (exports.States = {}));
var getAnimationClassName = function (prefix, state) {
    prefix = prefix + "notification";
    var states = (_a = {},
        _a[States.none] = '',
        _a[States.entering] = prefix + "-animation-entering",
        _a[States.entered] = prefix + "-animation-entering " + prefix + "-animation-entered",
        _a[States.leaveing] = prefix + "-animation-leaving",
        _a[States.leaved] = prefix + "-animation-leaving " + prefix + "-animation-leaved",
        _a);
    return states[state];
    var _a;
};
var Notification = (function (_super) {
    tslib_1.__extends(Notification, _super);
    function Notification(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            message: '',
            state: States.none,
            showState: null
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
                show: function (message, showState) {
                    handle_1.show(message, showState);
                },
                hide: function () {
                    handle_1.hide();
                }
            };
        }
    };
    Notification.prototype.componentDidUpdate = function () {
        var _this = this;
        var _a = this.state, state = _a.state, showState = _a.showState;
        var duration = showState && showState.duration != null ? showState.duration : this.props.duration;
        clearTimeout(this.handle);
        if (state === States.entering) {
            this.handle = setTimeout(function () {
                _this.setState({ state: States.entered });
            }, 0);
        }
        else if (state === States.entered && duration > 0) {
            this.handle = setTimeout(function () {
                _this.setState({ state: States.leaveing });
            }, (duration + 0.3) * 1000);
        }
        else if (state === States.leaveing) {
            this.setState({ state: States.leaved });
        }
        else if (state === States.leaved) {
            this.handle = setTimeout(function () {
                _this.setState({ state: States.none, showState: null });
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
    Notification.prototype.show = function (message, showState) {
        var _this = this;
        if (message === void 0) { message = ''; }
        var state = this.state.state;
        if (showState != null) {
            showState = assign({}, showState);
        }
        var duration = showState && showState.duration != null ? showState.duration : this.props.duration;
        clearTimeout(this.handle);
        if (state === States.none) {
            this.setState({ message: message, state: States.entering, showState: showState });
        }
        else if (state === States.entering || (state === States.entered && duration > 0)) {
            this.setState({ message: message });
        }
        else if (state === States.leaveing) {
            this.setState({ message: message, state: States.entered, showState: showState });
        }
        else if (state === States.leaved) {
            setTimeout(function () {
                _this.setState({ message: message, state: States.entering, showState: showState });
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
        var _a = this.props, reverse = _a.reverse, children = _a.children, extraClassName = _a.extraClassName, x = _a.x, y = _a.y, style = _a.style, prefix = _a.prefix;
        var _b = this.state, showState = _b.showState, message = _b.message, state = _b.state;
        if (showState != null) {
            x = showState.x || x;
            y = showState.y || y;
            reverse = showState.reverse != null ? showState.reverse : reverse;
        }
        var child = null;
        if (state !== States.none) {
            var className = classnames(getAnimationClassName(prefix, state), extraClassName);
            child = React.createElement(Content_1["default"], { prefix: prefix, style: style, extraClassName: className, reverse: reverse }, message || children);
        }
        return (React.createElement(Container_1["default"], { prefix: prefix, x: x, y: y }, child));
    };
    return Notification;
}(React.Component));
Notification.defaultProps = {
    duration: 2,
    reverse: false,
    prefix: consts_1.prefix
};
exports["default"] = Notification;
