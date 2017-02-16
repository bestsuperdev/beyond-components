"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 
import Tabs , {Tab} from 'beyond-components'

<Tabs activeKey="1" >
    <Tabs.Tab disabled key="1">1</Tabs.Tab>
    <Tabs.Tab key="2" eventType="">2</Tab>
    <Tabs.Tab key="3" onChange={}>3</Tab>
</Tabs>
 */
var classnames = require("classnames");
var React = require("react");
var Tab = (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super.apply(this, arguments) || this;
    }
    Tab.prototype.render = function () {
        return React.createElement("div", null);
    };
    return Tab;
}(React.Component));
exports.Tab = Tab;
var Tabs = (function (_super) {
    __extends(Tabs, _super);
    function Tabs(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeKey: props.activeKey || props.defaultActiveKey || ""
        };
        return _this;
    }
    Tabs.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.activeKey != null) {
            this.setState({ activeKey: nextProps.activeKey });
        }
    };
    Tabs.prototype.render = function () {
        var _a = this.props, className = _a.className, extraClassName = _a.extraClassName;
        return (React.createElement("div", __assign({}, this.props, { className: classnames(className, extraClassName) }),
            this.renderNavs(),
            this.renderTabs()));
    };
    Tabs.prototype.renderNavs = function () {
        var _this = this;
        var children;
        var _a = this.props, _children = _a.children, prefix = _a.className;
        var activeKey = this.state.activeKey;
        if (!_children) {
            children = [];
        }
        else if (!Array.isArray(_children)) {
            children = [_children];
        }
        else {
            children = _children;
        }
        var navs = children.filter(function (child) { return child != null; }).map(function (child) {
            var key = child.key;
            var _a = child.props, title = _a.title, disabled = _a.disabled, navExtraClassName = _a.navExtraClassName;
            var events = {};
            if (!disabled) {
                events.onClick = _this.handleClick.bind(_this, key);
            }
            return (React.createElement("li", __assign({ key: key, className: classnames(prefix + "-nav", { active: key == activeKey }, navExtraClassName) }, events), title));
        });
        return React.createElement("ul", { className: prefix + "-navs" }, navs);
    };
    Tabs.prototype.renderTabs = function () {
        var children;
        var _a = this.props, _children = _a.children, prefix = _a.className;
        var activeKey = this.state.activeKey;
        if (!_children) {
            children = [];
        }
        else if (!Array.isArray(_children)) {
            children = [_children];
        }
        else {
            children = _children;
        }
        var panes = children.filter(function (child) { return child != null; }).map(function (child) {
            var key = child.key;
            var active = activeKey == key;
            var paneExtraClassName = child.props.paneExtraClassName;
            return React.createElement("div", { key: key, className: classnames(prefix + "-pane", { active: active }, paneExtraClassName) }, child.props.children);
        });
        return React.createElement("div", { className: prefix + "-panes" }, panes);
    };
    Tabs.prototype.handleClick = function (activeKey, event) {
        // let result
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(activeKey);
        }
        if (this.props.activeKey == null) {
            this.setState({ activeKey: activeKey });
        }
    };
    return Tabs;
}(React.Component));
Tabs.defaultProps = {
    className: 'tabs'
};
exports.__esModule = true;
exports["default"] = Tabs;
