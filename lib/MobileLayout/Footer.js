"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var assign = require("beyond-lib/lib/assign");
;
;
var footerBaseStyle = {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%'
};
var Footer = (function (_super) {
    tslib_1.__extends(Footer, _super);
    function Footer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Footer.prototype.render = function () {
        var _a = this.props, height = _a.height, className = _a.className, style = _a.style, children = _a.children;
        style = assign({ height: height }, footerBaseStyle, style);
        return (React.createElement("div", { style: style, className: className }, children));
    };
    return Footer;
}(React.Component));
Footer.defaultProps = {
    height: 50
};
exports["default"] = Footer;
