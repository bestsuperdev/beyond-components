"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var assign = require("beyond-lib/lib/assign");
var Header_1 = require("./Header");
var Footer_1 = require("./Footer");
var Main_1 = require("./Main");
;
var baseStyle = {
    position: 'relative',
    height: window.innerHeight
};
function isInherit(el, Base) {
    return el && el.type && el.type.prototype instanceof Base;
}
var Container = function (props) {
    var style = props.style, height = props.height, rests = tslib_1.__rest(props, ["style", "height"]);
    var mainStyle;
    var top = 0;
    var bottom = 0;
    style = assign({}, baseStyle, { height: height }, style);
    var children;
    if (props.children) {
        children = !Array.isArray(props.children) ? [props.children] : props.children;
        children.forEach(function (item) {
            if (isInherit(item, Header_1["default"])) {
                top = item.props.height;
            }
            else if (isInherit(item, Footer_1["default"])) {
                bottom = item.props.height;
            }
        });
        children = children.map(function (item, i) {
            var props = { key: i };
            if (isInherit(item, Main_1["default"])) {
                props.style = assign({ top: top, bottom: bottom }, item.props.style);
            }
            return React.cloneElement(item, props);
        });
    }
    return (React.createElement("div", tslib_1.__assign({}, rests, { style: style }), children));
};
exports["default"] = Container;
