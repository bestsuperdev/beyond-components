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
var assign = require("beyond-lib/lib/assign");
var classnames = require("classnames");
var consts_1 = require("../consts");
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            visible: props.visible,
            style: {}
        };
        return _this;
    }
    Tooltip.prototype.componentDidMount = function () {
        var _this = this;
        var duration = this.props.duration;
        var visible = this.state.visible;
        if (visible && duration > 0) {
            this.handle = setTimeout(function () {
                _this.toggle(false);
                _this.handle = null;
            }, duration * 1000);
        }
    };
    Tooltip.prototype.componentWillReceiveProps = function (nextProps) {
        this.toggle(nextProps.visible);
    };
    Tooltip.prototype.componentDidUpdate = function () {
        this.componentDidMount();
    };
    Tooltip.prototype._setStyle = function (style) {
        if (this.handle != null) {
            clearTimeout(this.handle);
            this.handle = null;
        }
        this.setState(function (state, props) { return ({ style: style, visible: true }); });
    };
    Tooltip.prototype.show = function () {
        this.toggle(true);
    };
    Tooltip.prototype.hide = function () {
        this.toggle(false);
    };
    Tooltip.prototype.toggle = function (visible) {
        if (this.handle != null) {
            clearTimeout(this.handle);
            this.handle = null;
        }
        this.setState(function (state, props) { return ({ visible: visible }); });
    };
    Tooltip.prototype.render = function () {
        var _a = this.props, className = _a.className, extraClassName = _a.extraClassName, placement = _a.placement;
        var style = assign({}, this.props.style, this.state.style);
        if (!this.state.visible) {
            assign(style, {
                opacity: 0,
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                visibility: 'hidden'
            });
        }
        return (React.createElement("div", { className: classnames(className, className + "-" + placement, extraClassName), style: style },
            React.createElement("div", { className: className + "-content" }, this.props.children),
            React.createElement("div", { className: className + "-triangle" })));
    };
    return Tooltip;
}(React.Component));
Tooltip.defaultProps = {
    className: consts_1.prefix + "tooltip",
    visible: false,
    duration: 0,
    placement: 'top'
};
exports["default"] = Tooltip;
