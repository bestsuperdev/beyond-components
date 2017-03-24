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
var containerClassName = consts_1.prefix + "notification";
var Container = function (props) {
    var className = containerClassName;
    var xClassName = '';
    var yClassName = '';
    if (props.x === 'left' || props.x === 'right') {
        xClassName = className + "-" + props.x;
    }
    if (props.y === 'middle' || props.y === 'bottom') {
        yClassName = className + "-" + props.y;
    }
    return React.createElement("div", { style: props.style, className: classnames(className, xClassName, yClassName, props.extraClassName) }, props.children);
};
exports["default"] = Container;
