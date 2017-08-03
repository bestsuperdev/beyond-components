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
var React = require("react");
var classnames = require("classnames");
var consts_1 = require("../consts");
// const nprefix ="searchSelector"
var nprefix = consts_1.prefix + "searchSelector";
var Option = (function (_super) {
    __extends(Option, _super);
    function Option() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Option.prototype.getSeparateString = function (matchValue, str) {
        var startX = str.indexOf(matchValue);
        var len = matchValue.length;
        var strBegin = str.substring(0, startX);
        var strEnd = str.substr(startX + len);
        return { strBegin: strBegin, strEnd: strEnd };
    };
    Option.prototype.render = function () {
        var _a = this.props, matchValue = _a.matchValue, indent = _a.indent;
        var text = this.props.text || this.props.children;
        // console.log(matchValue)
        // console.log(text)
        if (matchValue) {
            // debugger
            var strObj = this.props.matchValue && this.getSeparateString(matchValue, this.props.text); //{!matchValue && text}
            return (React.createElement("div", { className: classnames(nprefix + "-option", indent && 'text-ind10'), onClick: this.props.onClick, key: this.props.key && this.props.key }, (matchValue && (React.createElement("div", null,
                strObj.strBegin,
                React.createElement("b", null, matchValue),
                strObj.strEnd))) || text));
        }
        else {
            return (React.createElement("div", { className: classnames(nprefix + "-option", indent && 'text-ind10'), onClick: this.props.onClick, key: this.props.key && this.props.key }, text));
        }
    };
    return Option;
}(React.Component));
exports.Option = Option;
var SearchSelector = (function (_super) {
    __extends(SearchSelector, _super);
    function SearchSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showOption: false,
            selectOption: { value: '', text: '' },
            searchContent: '',
            searchOptions: []
        };
        _this.options = [];
        _this.innerClick = false;
        _this.hideOptionFun = _this.hideOption.bind(_this);
        return _this;
    }
    SearchSelector.prototype.hideOption = function () {
        var _this = this;
        // debugger
        this.handle = setTimeout(function () {
            if (!_this.innerClick) {
                _this.setState({ showOption: false });
            }
            _this.handle = null;
            _this.innerClick = false;
        }, 50);
    };
    SearchSelector.prototype.componentDidMount = function () {
        var selectOption = this.getDefaultSelect(this.props);
        console.log(selectOption);
        var options = this.getOptions(this.props);
        if (selectOption != null) {
            var searchContent = selectOption.text;
            this.setState({ selectOption: selectOption, searchContent: searchContent, searchOptions: this.options }); //,options       
        }
        else {
            this.setState({ searchOptions: this.options }); //,options
        }
        var wrap = this.refs.wrap;
        if (document.addEventListener) {
            document.addEventListener('click', this.hideOptionFun);
        }
    };
    SearchSelector.prototype.componentWillReceiveProps = function (nextprops) {
        if (this.props.searchFun) {
            var options = this.getOptions(nextprops);
            this.setState({ searchOptions: this.options }); //selectOption, searchContent,        
            if (document.addEventListener) {
                document.addEventListener('click', this.hideOptionFun);
            }
        }
    };
    SearchSelector.prototype.componentWillUnmount = function () {
        clearTimeout(this.handle);
        this.handle = null;
        var wrap = this.refs.wrap;
        if (document.removeEventListener) {
            document.removeEventListener('click', this.hideOptionFun);
        }
    };
    SearchSelector.prototype.getDefaultSelect = function (props) {
        var children = (Array.isArray(props.children) ? props.children : [props.children]).filter(function (child) { return child != null; });
        var selectChildren = children.filter(function (child) { return (child.props.selected === undefined) ? (false) : (child.props.selected === true); });
        var selectChild = selectChildren[0] || null;
        // console.log(selectChild)
        if (selectChild != null) {
            var result = selectChild;
            var selectObj = { value: '', text: '' };
            selectObj.text = selectChild.props.children;
            selectObj.value = selectChild.props.value;
            if (this.props.onChange !== undefined) {
                this.props.onChange(selectObj);
            }
            return selectObj;
        }
        else {
            return null;
        }
    };
    SearchSelector.prototype.getOptionObject = function (option) {
        if (!option) {
            var value_1 = null;
            var text_1 = null;
            return { value: value_1, text: text_1 };
        }
        var text = option.props.children == null ? '' : option.props.children;
        var value = option.props.value != null ? option.props.value : text;
        return { value: value, text: text, isPlaceholder: false };
    };
    SearchSelector.prototype.getOptions = function (props) {
        var _this = this;
        var children = (Array.isArray(props.children) ? props.children : [props.children]).filter(function (child) { return child != null; });
        var withoutText = this.props.withoutText;
        var options = [];
        var indent = (withoutText || false);
        children = children.map(function (child, i) {
            var _a = _this.getOptionObject(child), value = _a.value, text = _a.text;
            options.push(React.cloneElement(child, { value: value, text: text, key: i, onClick: _this.handlerClickOption.bind(_this, { value: value, text: text, i: i }), indent: indent }));
        });
        this.options = options;
        return options;
    };
    SearchSelector.prototype.handlerTextClick = function () {
        var showOption = !this.state.showOption;
        this.innerClick = true;
        var searchOptions = this.options;
        if (this.props.clickInputEmpty) {
            this.setState({ showOption: showOption, searchContent: "", searchOptions: searchOptions });
        }
        else {
            this.setState({ showOption: showOption, searchOptions: searchOptions });
        }
    };
    SearchSelector.prototype.handlerInputClick = function () {
        var showOption = true;
        this.innerClick = true;
        var searchOptions = this.options;
        if (this.props.clickInputEmpty) {
            this.setState({ showOption: showOption, searchContent: "", searchOptions: searchOptions });
        }
        else {
            this.setState({ showOption: showOption, searchOptions: searchOptions });
        }
    };
    SearchSelector.prototype.handlerClickOption = function (obj, event) {
        // debugger
        console.log(obj);
        var selectOption = obj;
        // debugger
        var showOption = false;
        if (this.props.onChange !== undefined && typeof this.props.onChange == "function") {
            this.props.onChange(selectOption);
        }
        if (this.props.withoutText) {
            this.setState({ showOption: showOption, selectOption: selectOption, searchContent: obj.text }); //,searchContent,searchOptions
        }
        else {
            this.setState({ showOption: showOption, selectOption: selectOption });
        }
    };
    SearchSelector.prototype.renderOptions = function () {
        var _a = this.props, showMaxCount = _a.showMaxCount, withoutText = _a.withoutText;
        if (this.state.showOption) {
            var options = this.state.searchOptions;
            if (options.length == 0) {
                return React.createElement("div", { className: classnames(nprefix + "-no-options") },
                    "No results match \"",
                    this.state.searchContent,
                    "\"");
            }
            return React.createElement("div", { className: classnames(nprefix + "-options"), style: { maxHeight: showMaxCount * 40 } }, options);
        }
        else {
            // debugger
            return null;
        }
    };
    SearchSelector.prototype.getMatchOptions = function (matchValue) {
        var _this = this;
        console.log(this.props);
        var children = this.options;
        var matchOptions = [];
        var matchNum = 0;
        children = children.map(function (child, i) {
            var _a = _this.getOptionObject(child), value = _a.value, text = _a.text;
            var patt = new RegExp(matchValue, 'ig');
            if (patt.exec(text) != null) {
                matchOptions.push(React.cloneElement(child, { key: matchNum, matchValue: matchValue })); //,{value,text,key:i}
                matchNum++;
            }
        });
        return matchOptions;
    };
    SearchSelector.prototype.judgeMatchState = function (event) {
        if (this.props.searchFun && typeof this.props.searchFun == 'function') {
            // debugger
            this.props.searchFun(event.target.value);
            this.setState({ showOption: true, searchContent: event.target.value });
        }
        else {
            var searchContent = event.target.value;
            var searchOptions = this.getMatchOptions(event.target.value);
            console.log(searchOptions);
            this.setState({ showOption: true, searchContent: searchContent, searchOptions: searchOptions });
        }
    };
    SearchSelector.prototype.renderInput = function () {
        var icon = React.createElement("img", { src: require('./images/icon_search.png'), alt: '图标' });
        var _a = this.props, withoutText = _a.withoutText, placeholder = _a.placeholder;
        var showOption = this.state.showOption;
        if (withoutText || (!withoutText && showOption)) {
            return (React.createElement("div", { className: classnames(nprefix + "-input", !withoutText && 'mlr-10 bd') },
                React.createElement("input", { placeholder: (withoutText && placeholder) || (!withoutText && "搜索"), type: "text", onChange: this.judgeMatchState.bind(this), value: this.state.searchContent, onClick: this.handlerInputClick.bind(this) }),
                React.createElement("span", { className: nprefix + "-icon-container" }, icon)));
        }
        else {
            return null;
        }
    };
    SearchSelector.prototype.render = function () {
        // console.log(this.state.selectOption)
        var text = this.state.selectOption != null ? this.state.selectOption.text : null;
        var _a = this.props, extraClassName = _a.extraClassName, withoutText = _a.withoutText;
        return (React.createElement("div", { ref: 'wrap', className: classnames("" + nprefix, this.state.showOption && "border-bottom-none", (!withoutText) && ((this.state.showOption && nprefix + "-arrowUp") || (!this.state.showOption && nprefix + "-arrowDown")), extraClassName) },
            !withoutText &&
                (React.createElement("div", { className: classnames(nprefix + "-text"), onClick: this.handlerTextClick.bind(this) }, text || this.props.placeholder)),
            this.renderInput(),
            this.renderOptions()));
    };
    SearchSelector.defaultProps = {
        showMaxCount: 3,
        clickInputEmpty: false,
        withoutText: false
    };
    return SearchSelector;
}(React.Component));
exports.SearchSelector = SearchSelector;
