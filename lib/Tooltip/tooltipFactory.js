"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
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
    var targetOffset = offset(target);
    var top, left;
    if (placement === 'top') {
        top = (targetOffset.top - toolTipNode.offsetHeight - 15) + 'px',
            left = (targetOffset.left - (toolTipNode.offsetWidth - targetOffset.width) / 2) + 'px';
    }
    else if (placement === 'bottom') {
        top = (targetOffset.top + targetOffset.height + 15) + 'px';
        left = (targetOffset.left - (toolTipNode.offsetWidth - targetOffset.width) / 2) + 'px';
    }
    else if (placement === 'left') {
        top = (targetOffset.top - (toolTipNode.offsetHeight - targetOffset.height) / 2) + 'px';
        left = (targetOffset.left - toolTipNode.offsetWidth - 15) + 'px';
    }
    else if (placement === 'right') {
        top = (targetOffset.top - (toolTipNode.offsetHeight - targetOffset.height) / 2) + 'px';
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
function getNewInstance(props, children) {
    var wrap = document.createElement('div');
    var instance;
    document.body.appendChild(wrap);
    instance = ReactDOM.render(React.createElement(Tooltip_1["default"], __assign({}, props), children), wrap);
    return {
        show: function (target) {
            var style = getToolTipStyle(instance, target);
            instance._setStyle(style);
        },
        hide: function () {
            instance.hide();
        }
    };
}
exports.getNewInstance = getNewInstance;
