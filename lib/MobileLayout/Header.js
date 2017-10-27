"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var assign = require("beyond-lib/lib/assign");
;
var baseStyle = {
    position: 'relative'
};
;
var Header = function (props) {
    props.height = props.height || 50;
    var height = props.height, style = props.style, className = props.className, children = props.children, rests = tslib_1.__rest(props, ["height", "style", "className", "children"]);
    style = assign({ height: height }, baseStyle, style);
    return (React.createElement("div", tslib_1.__assign({}, rests, { style: style }), children));
};
exports["default"] = Header;
