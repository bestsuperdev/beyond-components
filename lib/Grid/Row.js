"use strict";
exports.__esModule = true;
/*

     12 grid, Col.xs 表示百分比
     <Row width={1200} gutter={30} verticalGutter={20}>
        <Col xs={6}  width={600} offset={100}></Col>
        <Col xs={6} width={600}></Col>
     </Row>
     <Row  gutter={30}>
        <Col xs={6} xsOffset={}></Col>
        <Col xs={6}></Col>
     </Row>
 */
var React = require("react");
var classnames = require("classnames");
var assign = require("beyond-lib/lib/assign");
var consts_1 = require("../consts");
;
;
var Row = function (props) {
    var width = props.width, _a = props.gutter, gutter = _a === void 0 ? 0 : _a, _b = props.verticalGutter, verticalGutter = _b === void 0 ? 0 : _b, _c = props.grids, grids = _c === void 0 ? 12 : _c, prefix = props.prefix, extraClassName = props.extraClassName, _style = props.style;
    prefix = prefix || consts_1.prefix;
    var children = (Array.isArray(props.children) ? props.children : [props.children]).filter(function (child) { return child != null; });
    var colStyle = {};
    var rowStyle = {};
    if (gutter > 0) {
        colStyle.paddingLeft = gutter / 2;
        colStyle.paddingRight = gutter / 2;
    }
    if (verticalGutter > 0) {
        colStyle.paddingTop = verticalGutter / 2;
        colStyle.paddingBottom = verticalGutter / 2;
    }
    var className = prefix + "row";
    children = children.map(function (child) {
        var style = assign({}, colStyle, child.props.style);
        return React.cloneElement(child, { style: style, grids: grids, prefix: prefix });
    });
    if (width != null) {
        rowStyle.width = width;
    }
    return (React.createElement("div", { style: assign(rowStyle, _style), className: classnames(className, extraClassName) }, children));
};
exports["default"] = Row;
