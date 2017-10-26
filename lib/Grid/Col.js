"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
// import React = require("react")
var React = require("react");
var classnames = require("classnames");
var assign = require("beyond-lib/lib/assign");
var consts_1 = require("../consts");
function percentage(num) {
    return (num * 100) + "%";
}
function getStyle(props) {
    var style = {};
    var width = props.width, offsetWidth = props.offsetWidth, col = props.col, offsetCol = props.offsetCol, grids = props.grids;
    if (width != null) {
        style.width = width;
    }
    if (offsetWidth != null) {
        style.marginRight = offsetWidth;
    }
    if (col != null) {
        style.width = percentage(col / grids);
    }
    if (offsetCol != null) {
        style.marginRight = percentage(offsetCol / grids);
    }
    return style;
}
var Col = function (props) {
    props = assign({}, props);
    props.prefix = props.prefix || consts_1.prefix;
    props.grids = props.grids || 12;
    var extraClassName = props.extraClassName, style = props.style, prefix = props.prefix, width = props.width, offsetWidth = props.offsetWidth, col = props.col, offsetCol = props.offsetCol, grids = props.grids, rests = tslib_1.__rest(props, ["extraClassName", "style", "prefix", "width", "offsetWidth", "col", "offsetCol", "grids"]);
    var className = prefix + "col";
    var _style = getStyle(props);
    return (React.createElement("div", tslib_1.__assign({}, rests, { style: assign({}, _style, style), className: classnames(className, extraClassName) }), props.children));
};
exports["default"] = Col;
