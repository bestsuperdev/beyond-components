"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
    var className = props.className || containerClassName;
    var xClassName = '';
    var yClassName = '';
    if (props.x === 'left' || props.x === 'right') {
        xClassName = className + "-" + props.x;
    }
    if (props.y === 'middle' || props.y === 'bottom') {
        yClassName = className + "-" + props.y;
    }
    return React.createElement("div", __assign({}, props, { className: classnames(className, xClassName, yClassName, props.extraClassName) }), props.children);
};
exports.__esModule = true;
exports["default"] = Container;
