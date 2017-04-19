"use strict";
exports.__esModule = true;
/*
<Notification y="left" top="30px">
    <Content></Content>
    <Content></Content>
    <Content></Content>
</Notification>

x : center(default)/left/right
y : top(default)/bottom/middle

 */
var React = require("react");
var classnames = require("classnames");
var consts_1 = require("../consts");
var Container = function (props) {
    var _prefix = props.prefix || consts_1.prefix;
    var className = _prefix + "notification";
    var xClassName;
    var yClassName;
    var x = props.x, y = props.y, extraClassName = props.extraClassName, children = props.children;
    if (x === 'left' || x === 'right') {
        xClassName = className + "-" + x;
    }
    if (y === 'middle' || y === 'bottom') {
        yClassName = className + "-" + y;
    }
    return React.createElement("div", { style: props.style, className: classnames(className, xClassName, yClassName, extraClassName) }, children);
};
exports["default"] = Container;
