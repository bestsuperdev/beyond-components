"use strict";
exports.__esModule = true;
var React = require("react");
var classnames = require("classnames");
var assign = require("beyond-lib/lib/assign");
var consts_1 = require("../consts");
function percentage(num) {
    return (num * 100) + '%';
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
    props.className = props.className || consts_1.prefix + "col";
    props.grids = props.grids || 12;
    var style = getStyle(props);
    var className = props.className, extraClassName = props.extraClassName, _style = props.style;
    return (React.createElement("div", { style: assign({}, style, _style), className: classnames(className, extraClassName) }, props.children));
};
exports["default"] = Col;
