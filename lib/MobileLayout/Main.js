"use strict";
var _this = this;
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var assign = require("beyond-lib/lib/assign");
var baseStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
};
var Main = function (props) {
    var _a = _this.props, className = _a.className, style = _a.style, children = _a.children, rests = tslib_1.__rest(_a, ["className", "style", "children"]);
    style = assign({}, baseStyle, style);
    return (React.createElement("div", tslib_1.__assign({ style: style }, rests), children));
};
exports["default"] = Main;
