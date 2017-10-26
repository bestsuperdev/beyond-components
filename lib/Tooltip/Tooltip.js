"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var assign = require("beyond-lib/lib/assign");
var classnames = require("classnames");
var consts_1 = require("../consts");
var Tooltip = (function (_super) {
    tslib_1.__extends(Tooltip, _super);
    function Tooltip(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            visible: props.defaultVisible,
            style: {}
        };
        return _this;
    }
    Tooltip.prototype._setStyle = function (style) {
        this.setState({ style: style, visible: true });
    };
    Tooltip.prototype.show = function () {
        this.toggle(true);
    };
    Tooltip.prototype.hide = function () {
        this.toggle(false);
    };
    Tooltip.prototype.toggle = function (visible) {
        this.setState({ visible: visible });
    };
    Tooltip.prototype.render = function () {
        var _a = this.props, prefix = _a.prefix, extraClassName = _a.extraClassName, placement = _a.placement, _style = _a.style, children = _a.children;
        var style = assign({}, _style, this.state.style);
        var className = prefix + "tooltip";
        if (!this.state.visible) {
            assign(style, {
                opacity: 0,
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                visibility: 'hidden',
                display: 'none'
            });
        }
        return (React.createElement("div", { className: classnames(className, className + "-" + placement, extraClassName), style: style },
            React.createElement("div", { className: className + "-content" }, children),
            React.createElement("div", { className: className + "-triangle" })));
    };
    return Tooltip;
}(React.Component));
Tooltip.defaultProps = {
    prefix: consts_1.prefix,
    defaultVisible: false,
    placement: 'top'
};
exports["default"] = Tooltip;
