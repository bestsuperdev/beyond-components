/*
<Placeholder color="grey">
    <input type="text"/>
</Placeholder>
*/
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs');
var assign = require("beyond-lib/lib/assign");
// declare const mergeFuncs : ()=> void; 
var support = null;
function isPlaceholderSupport() {
    if (support == null) {
        support = typeof window !== 'undefined' && 'placeholder' in document.createElement('input');
    }
    return support;
}
var Placeholder = (function (_super) {
    __extends(Placeholder, _super);
    function Placeholder(props) {
        var _this = _super.call(this, props) || this;
        var children = props.children;
        var isPlaceholder = false;
        var value = null;
        if (children && children.props) {
            var _a = children.props, _value = _a.value, defaultValue = _a.defaultValue;
            isPlaceholder = !_value && !defaultValue;
            value = defaultValue || _value || '';
        }
        _this.state = { isPlaceholder: isPlaceholder, value: value };
        return _this;
    }
    Placeholder.prototype.render = function () {
        var children = this.props.children;
        if (!isPlaceholderSupport() && children && children.props && children.props.placeholder && (children.type === 'input' || children.type === 'textarea')) {
            var props = children.props;
            var _a = this.state, isPlaceholder = _a.isPlaceholder, value = _a.value;
            var nextProps = {
                value: isPlaceholder ? props.placeholder : value,
                onChange: mergeFuncs(props.onChange, this.handleChange.bind(this)),
                onFocus: mergeFuncs(props.onFocus, this.handleFocus.bind(this)),
                onBlur: mergeFuncs(props.onBlur, this.handleBlur.bind(this))
            };
            if (isPlaceholder) {
                nextProps.style = assign({}, props.style, { color: this.props.color });
            }
            if (children.type === 'input' && children.props.type === 'password' && isPlaceholder) {
                nextProps.type = 'text';
            }
            return React.cloneElement(children, nextProps);
        }
        else {
            return children;
        }
    };
    Placeholder.prototype.handleChange = function (event) {
        var value = event.target.value;
        this.setState({ value: value });
    };
    Placeholder.prototype.handleBlur = function (event) {
        var value = event.target.value;
        if (!value) {
            this.setState({ isPlaceholder: true, value: value });
        }
    };
    Placeholder.prototype.handleFocus = function (event) {
        if (this.state.isPlaceholder) {
            this.setState({ isPlaceholder: false, value: '' });
        }
    };
    return Placeholder;
}(React.Component));
// state : any;
Placeholder.defaultProps = {
    color: '#999'
};
exports.__esModule = true;
exports["default"] = Placeholder;
