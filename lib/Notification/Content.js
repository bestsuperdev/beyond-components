"use strict";
exports.__esModule = true;
var React = require("react");
var classnames = require("classnames");
var consts_1 = require("../consts");
var contentClassName = consts_1.prefix + "notification-content";
var Content = function (props) {
    var className = props.className || contentClassName;
    return React.createElement("div", { style: props.style, className: classnames(className, props.extraClassName, props.reverse && className + "-reverse") }, props.children);
};
exports["default"] = Content;
