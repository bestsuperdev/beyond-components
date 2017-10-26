"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
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
var consts_1 = require("../consts");
;
;
exports.Tab = function (props) { return React.createElement("div", null); };
var Tabs = (function (_super) {
    tslib_1.__extends(Tabs, _super);
    function Tabs(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeKey: props.defaultActiveKey || ""
        };
        return _this;
    }
    Tabs.prototype.getActiveKey = function () {
        return this.props.activeKey || this.state.activeKey;
    };
    Tabs.prototype.render = function () {
        var _a = this.props, prefix = _a.prefix, extraClassName = _a.extraClassName, style = _a.style;
        var className = prefix + "tabs";
        return (React.createElement("div", { style: style, className: classnames(className, extraClassName) },
            this.renderNavs(),
            this.renderTabs()));
    };
    Tabs.prototype.renderNavs = function () {
        var _this = this;
        var children;
        var _a = this.props, _children = _a.children, prefix = _a.prefix;
        var activeKey = this.getActiveKey();
        var className = prefix + "tabs";
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
            var _a = child.props, title = _a.title, disabled = _a.disabled;
            var navClassName = classnames(className + "-nav", { active: child.key == activeKey });
            return (React.createElement("li", { key: child.key, className: navClassName, onClick: disabled ? null : _this.handlerClick.bind(_this, child.key) }, title));
        });
        return React.createElement("ul", { className: className + "-navs" }, navs);
    };
    Tabs.prototype.renderTabs = function () {
        var children;
        var _a = this.props, _children = _a.children, prefix = _a.prefix;
        var activeKey = this.getActiveKey();
        var className = prefix + "tabs";
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
            var active = activeKey == child.key;
            return React.createElement("div", { key: child.key, className: classnames(className + "-pane", { active: active }) }, child.props.children);
        });
        return React.createElement("div", { className: className + "-panes" }, panes);
    };
    Tabs.prototype.handlerClick = function (activeKey) {
        var result;
        if (typeof this.props.onChange === 'function') {
            result = this.props.onChange(activeKey);
        }
        if (result !== false) {
            this.setState({ activeKey: activeKey });
        }
    };
    return Tabs;
}(React.Component));
Tabs.defaultProps = {
    prefix: consts_1.prefix
};
exports["default"] = Tabs;
