/*

<TooltipTrigger tooltip={<Tooltip duration={3}>hello world<Tooltip/>} >
    <button>hover</button>
</TooltipTrigger>
 */
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
var ReactDom = require("react-dom");
var tooltipFactory_1 = require("./tooltipFactory");
var mergeFuncs = require("beyond-lib/lib/utilities/mergeFuncs");
var Trigger = (function (_super) {
    __extends(Trigger, _super);
    function Trigger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Trigger.prototype.componentDidMount = function () {
        var tooltip = this.props.tooltip;
        this.tooltip = tooltipFactory_1.getNewInstance(tooltip.props, tooltip.props.children);
        this.target = ReactDom.findDOMNode(this);
    };
    Trigger.prototype.render = function () {
        var children = this.props.children;
        var props = {
            onMouseEnter: mergeFuncs(children.props.onMouseEnter, this.show.bind(this)),
            onMouseLeave: mergeFuncs(children.props.onMouseLeave, this.hide.bind(this))
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
exports["default"] = Trigger;
