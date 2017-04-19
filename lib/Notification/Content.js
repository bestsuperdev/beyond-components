"use strict";
exports.__esModule = true;
var React = require("react");
var classnames = require("classnames");
var consts_1 = require("../consts");
var Content = function (props) {
    var _prefix = props.prefix || consts_1.prefix;
    var className = _prefix + "notification-content";
    var style = props.style, extraClassName = props.extraClassName, reverse = props.reverse, children = props.children;
    return React.createElement("div", { style: style, className: classnames(className, extraClassName, reverse && className + "-reverse") }, children);
};
exports["default"] = Content;
