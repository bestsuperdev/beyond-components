"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var classnames = require("classnames");
var assign = require("beyond-lib/lib/assign");
var consts_1 = require("../consts");
var scrollBarWidth = null;
var originBodyPaddingRight = null;
var modalBodyOpenClassName = consts_1.prefix + "modal-body-open";
var isSetBodyPadding = false;
var count = 0;
function bodyIsOverflowing() {
    //以下代码摘自bootstrap modal.js
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    return Math.max((document.body.clientWidth || 0), (document.documentElement.clientWidth || 0)) < fullWindowWidth;
}
function measureScrollBar() {
    if (!scrollBarWidth) {
        var scrollDiv = document.createElement('div');
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        scrollDiv.style.width = '50px';
        scrollDiv.style.height = '50px';
        scrollDiv.style.overflow = 'scroll';
        document.body.appendChild(scrollDiv);
        // this.$body.append(scrollDiv)
        scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
    }
    return scrollBarWidth;
}
function setBodyPadding() {
    // console.log(bodyIsOverflowing())
    if (bodyIsOverflowing() && !isSetBodyPadding) {
        originBodyPaddingRight = document.body.style.paddingRight;
        document.body.style.paddingRight = measureScrollBar() + "px";
        document.body.className = document.body.className ? (document.body.className + (" " + modalBodyOpenClassName)) : modalBodyOpenClassName;
        isSetBodyPadding = true;
        return true;
    }
    return false;
}
function resetBodyPadding() {
    if (isSetBodyPadding && count === 0) {
        document.body.style.paddingRight = originBodyPaddingRight;
        document.body.className = document.body.className.replace(modalBodyOpenClassName, ' ').trim().replace(/\s+/, ' ');
        isSetBodyPadding = false;
        return true;
    }
    return false;
}
function getHeight(height) {
    if (typeof height === 'number' && height < 1) {
        if (typeof window !== 'undefined') {
            return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.7;
        }
        else {
            return 0;
        }
    }
    else if (typeof height === 'string' && /%$/.test(height)) {
        return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * parseInt(height, 10) / 100;
    }
    return height;
}
;
var Modal = (function (_super) {
    tslib_1.__extends(Modal, _super);
    function Modal(props) {
        return _super.call(this, props) || this;
    }
    Modal.prototype.componentDidMount = function () {
        // this.isSetBodyPadding = false
        if (this.props.visible) {
            count++;
            setBodyPadding();
        }
        else {
            if (count > 0) {
                count--;
            }
            resetBodyPadding();
        }
    };
    Modal.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!prevProps.visible !== !this.props.visible) {
            this.componentDidMount();
        }
    };
    Modal.prototype.componentWillUnmount = function () {
        if (count > 0) {
            count--;
        }
        resetBodyPadding();
    };
    Modal.prototype.handlerClose = function () {
        if (this.props.visible && typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
    };
    Modal.prototype.render = function () {
        var _a = this.props, prefix = _a.prefix, style = _a.style, visible = _a.visible, extraClassName = _a.extraClassName, maskClickClose = _a.maskClickClose, width = _a.width, maxWidth = _a.maxWidth, bodyHeight = _a.bodyHeight, maxBodyHeight = _a.maxBodyHeight;
        var className = prefix + "modal";
        style = assign({}, style);
        if (!visible) {
            style.display = 'none';
        }
        var mask;
        if (this.props.mask !== false) {
            mask = React.createElement("div", { onClick: maskClickClose ? this.handlerClose.bind(this) : null, className: className + "-mask" });
        }
        var dialogStyle = { width: width, maxWidth: maxWidth };
        var bodyStyle = { height: getHeight(bodyHeight), maxHeight: getHeight(maxBodyHeight) };
        return (React.createElement("div", { className: classnames(className, extraClassName), style: style },
            mask,
            React.createElement("div", { className: className + "-dialog", style: dialogStyle },
                this.renderHeader(),
                React.createElement("div", { className: className + "-body", style: bodyStyle }, this.props.children),
                this.renderFooter())));
    };
    Modal.prototype.renderHeader = function () {
        var title, closeBtn;
        var _a = this.props, _title = _a.title, close = _a.close, prefix = _a.prefix, closeIcon = _a.closeIcon;
        var className = prefix + "modal";
        if (_title || close !== false) {
            if (_title != null) {
                title = React.createElement("h4", { title: _title, className: className + "-title" }, _title);
            }
            if (close !== false) {
                closeBtn = React.createElement("span", { onClick: this.handlerClose.bind(this), className: className + "-close" }, closeIcon);
            }
            return (React.createElement("div", { className: className + "-header" },
                title,
                closeBtn));
        }
    };
    Modal.prototype.renderFooter = function () {
        if (this.props.footer != null) {
            var _a = this.props, prefix_1 = _a.prefix, footer = _a.footer;
            var className = prefix_1 + "modal";
            return React.createElement("div", { className: className + "-footer" }, footer);
        }
    };
    return Modal;
}(React.Component));
Modal.defaultProps = {
    prefix: consts_1.prefix,
    maxBodyHeight: 0.7,
    visible: false,
    maskClickClose: true,
    mask: true,
    closeIcon: 'X'
};
exports["default"] = Modal;
