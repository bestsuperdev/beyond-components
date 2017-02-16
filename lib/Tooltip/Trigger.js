/*

<TooltipTrigger tooltip={<Tooltip duration={3}>hello world<Tooltip/>} >
    <button>hover</button>
</TooltipTrigger>
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDom = require("react-dom");
var tooltipFactory_1 = require("./tooltipFactory");
function merge(fn1, fn2) {
    return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        var result;
        if (typeof fn1 === 'function') {
            result = fn1.apply(this, args);
        }
        if (typeof fn2 === 'function') {
            fn2.apply(this, args);
        }
        return result;
    };
}
var Trigger = (function (_super) {
    __extends(Trigger, _super);
    function Trigger() {
        return _super.apply(this, arguments) || this;
    }
    Trigger.prototype.componentDidMount = function () {
        var tooltip = this.props.tooltip;
        this.tooltip = tooltipFactory_1.getNewInstance(tooltip.props, tooltip.props.children);
        this.target = ReactDom.findDOMNode(this);
    };
    Trigger.prototype.render = function () {
        var children = this.props.children;
        var props = {
            onMouseEnter: merge(children.props.onMouseEnter, this.show.bind(this)),
            onMouseLeave: merge(children.props.onMouseLeave, this.hide.bind(this))
        };
        return React.cloneElement(children, props);
    };
    Trigger.prototype.show = function () {
        if (this.tooltip && this.target) {
            this.tooltip.show(this.target);
        }
    };
    Trigger.prototype.hide = function () {
        if (this.tooltip && this.target) {
            this.tooltip.hide();
        }
    };
    return Trigger;
}(React.Component));
exports.__esModule = true;
exports["default"] = Trigger;
