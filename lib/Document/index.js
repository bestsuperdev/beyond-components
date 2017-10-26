/*
<Document onClick={this.outClick} title="">
    <div onClick={this.innerClick}></div>
</Document>
*/
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var ReactDOM = require("react-dom");
;
;
var Document = (function (_super) {
    tslib_1.__extends(Document, _super);
    function Document(props) {
        var _this = _super.call(this, props) || this;
        _this.innerClick = false;
        _this.handlerInnerClick = _this.handlerInnerClick.bind(_this);
        _this.handlerOutClick = _this.handlerOutClick.bind(_this);
        return _this;
    }
    Document.prototype.componentDidMount = function () {
        var wrap = ReactDOM.findDOMNode(this);
        if (wrap && wrap.nodeName) {
            if (wrap.addEventListener) {
                wrap.addEventListener('click', this.handlerInnerClick, false);
                document.addEventListener('click', this.handlerOutClick, false);
            }
            else {
                wrap.attachEvent('onclick', this.handlerInnerClick);
                document.attachEvent('onclick', this.handlerOutClick);
            }
        }
    };
    Document.prototype.componentWillUnmount = function () {
        var wrap = ReactDOM.findDOMNode(this);
        if (wrap && wrap.nodeName) {
            if (wrap.addEventListener) {
                wrap.removeEventListener('click', this.handlerInnerClick, false);
                document.removeEventListener('click', this.handlerOutClick, false);
            }
            else {
                wrap.detachEvent('onclick', this.handlerInnerClick);
                document.detachEvent('onclick', this.handlerOutClick);
            }
        }
    };
    Document.prototype.handlerInnerClick = function () {
        this.innerClick = true;
    };
    Document.prototype.handlerOutClick = function () {
        var _this = this;
        var _a = this.props, onClick = _a.onClick, delay = _a.delay;
        setTimeout(function () {
            if (!_this.innerClick && typeof onClick === 'function') {
                onClick();
            }
            _this.innerClick = false;
        }, delay);
    };
    Document.prototype.render = function () {
        return this.props.children;
    };
    return Document;
}(React.Component));
Document.defaultProps = {
    delay: 100
};
exports["default"] = Document;
