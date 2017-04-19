"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
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
var Tab = (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        var activeKey = this.state.activeKey;
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
            var key = child.key;
            var _a = child.props, title = _a.title, disabled = _a.disabled;
            var navClassName = classnames(className + "-nav", { active: key == activeKey });
            return (React.createElement("li", { key: key, className: navClassName, onClick: disabled ? null : _this.handlerClick.bind(_this, key) }, title));
        });
        return React.createElement("ul", { className: className + "-navs" }, navs);
    };
    Tabs.prototype.renderTabs = function () {
        var children;
        var _a = this.props, _children = _a.children, prefix = _a.prefix;
        var activeKey = this.state.activeKey;
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
            var key = child.key;
            var active = activeKey == key;
            // const {paneExtraClassName} = child.props
            return React.createElement("div", { key: key, className: classnames(className + "-pane", { active: active }) }, child.props.children);
        });
        return React.createElement("div", { className: className + "-panes" }, panes);
    };
    Tabs.prototype.handlerClick = function (activeKey, event) {
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
    prefix: consts_1.prefix // `${prefix}tabs`
};
exports["default"] = Tabs;
