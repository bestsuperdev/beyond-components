"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
;
;
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        return _super.apply(this, arguments) || this;
    }
    Row.prototype.render = function () {
        var style = {};
        var _a = this.props, width = _a.width, className = _a.className, extraClassName = _a.extraClassName, _style = _a.style;
        if (width != null) {
            style.width = width;
        }
        return (React.createElement("div", { style: assign(style, _style), className: classnames(className, extraClassName) }, this.renderCols()));
    };
    Row.prototype.renderCols = function () {
        var _a = this.props, gutter = _a.gutter, verticalGutter = _a.verticalGutter, grids = _a.grids;
        var children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter(function (child) { return child != null; });
        var style = {};
        if (gutter > 0) {
            style.paddingLeft = gutter / 2;
            style.paddingRight = gutter / 2;
        }
        if (verticalGutter > 0) {
            style.paddingTop = verticalGutter / 2;
            style.paddingBottom = verticalGutter / 2;
        }
        return children.map(function (child) { return React.cloneElement(child, { style: assign({}, style, child.props.style), grids: grids }); });
    };
    return Row;
}(React.Component));
Row.defaultProps = {
    grids: 12,
    className: 'row',
    gutter: 0,
    verticalGutter: 0
};
exports.__esModule = true;
exports["default"] = Row;