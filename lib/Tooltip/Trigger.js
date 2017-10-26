/*

<TooltipTrigger tooltip={<Tooltip>hello world<Tooltip/>} >
    <button>hover</button>
</TooltipTrigger>
 */
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var ReactDom = require("react-dom");
var tooltipFactory_1 = require("./tooltipFactory");
var mergeFuncs = require("beyond-lib/lib/utilities/mergeFuncs");
var Trigger = (function (_super) {
    tslib_1.__extends(Trigger, _super);
    function Trigger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Trigger.prototype.componentDidMount = function () {
        this.tooltipOperator = tooltipFactory_1.getNewInstance(this.props.tooltip);
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
        if (this.tooltipOperator && this.target) {
            this.tooltipOperator.show(this.target);
        }
    };
    Trigger.prototype.hide = function () {
        if (this.tooltipOperator && this.target) {
            this.tooltipOperator.hide();
        }
    };
    return Trigger;
}(React.Component));
exports["default"] = Trigger;
