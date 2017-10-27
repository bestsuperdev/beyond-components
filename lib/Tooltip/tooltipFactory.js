"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
/*
let instance = TooltipFactory.getInstance()
function test(event){
    instance.show(message,event.target)
}
<button onClick={test}></button>
 */
var React = require("react");
var ReactDOM = require("react-dom");
var Tooltip_1 = require("./Tooltip");
function offset(node) {
    var box = node.getBoundingClientRect();
    var win = window;
    var docElem = document.documentElement;
    var body = document.body;
    return {
        top: box.top + Math.max(win.pageYOffset || 0, docElem.scrollTop, body.scrollTop) - (docElem.clientTop || body.clientTop),
        left: box.left + Math.max(win.pageXOffset || 0, docElem.scrollLeft, body.scrollLeft) - (docElem.clientLeft || body.clientLeft),
        width: (box.width == null ? node.offsetWidth : box.width) || 0,
        height: (box.height == null ? node.offsetHeight : box.height) || 0
    };
}
function getToolTipStyle(tooltip, target) {
    var placement = tooltip.props.placement || 'top';
    var toolTipNode = ReactDOM.findDOMNode(tooltip);
    toolTipNode.style.display = 'block';
    var offsetHeight = toolTipNode.offsetHeight, offsetWidth = toolTipNode.offsetWidth;
    toolTipNode.style.display = 'none';
    var targetOffset = offset(target);
    var top, left;
    if (placement === 'top') {
        top = (targetOffset.top - offsetHeight - 15) + 'px',
            left = (targetOffset.left - (offsetWidth - targetOffset.width) / 2) + 'px';
    }
    else if (placement === 'bottom') {
        top = (targetOffset.top + targetOffset.height + 15) + 'px';
        left = (targetOffset.left - (offsetWidth - targetOffset.width) / 2) + 'px';
    }
    else if (placement === 'left') {
        top = (targetOffset.top - (offsetHeight - targetOffset.height) / 2) + 'px';
        left = (targetOffset.left - offsetWidth - 15) + 'px';
    }
    else if (placement === 'right') {
        top = (targetOffset.top - (offsetHeight - targetOffset.height) / 2) + 'px';
        left = (targetOffset.left + targetOffset.width + 15) + 'px';
    }
    if (top != null) {
        return {
            position: 'absolute',
            visibility: 'visible',
            display: 'block',
            top: top,
            left: left
        };
    }
    return null;
}
function getNewInstance(tooltip) {
    var props = tooltip.props;
    var children = props.children;
    var wrap = document.createElement('div');
    document.body.appendChild(wrap);
    var instance = ReactDOM.render(React.createElement(Tooltip_1["default"], tslib_1.__assign({}, props), children), wrap);
    return {
        show: function (target) {
            console.log(1);
            var style = getToolTipStyle(instance, target);
            instance._setStyle(style);
        },
        hide: function () {
            instance.hide();
        }
    };
}
exports.getNewInstance = getNewInstance;
