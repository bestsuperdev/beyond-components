"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var classnames = require("classnames");
var Content = function (props) {
    var className = props.className || 'notification-content';
    return React.createElement("div", __assign({}, props, { className: classnames(className, props.extraClassName, props.reverse && className + "-reverse") }), props.children);
};
exports.__esModule = true;
exports["default"] = Content;
