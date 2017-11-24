"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var classnames = require("classnames");
var consts_1 = require("../consts");
// const nprefix ="searchSelector"
var assign = require("beyond-lib/lib/assign");
var nprefix = consts_1.prefix + "searchSelector";
var Option = (function (_super) {
    tslib_1.__extends(Option, _super);
    function Option() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Option.prototype.renderText = function (matchValue, str) {
        if (!matchValue) {
            return null;
        }
        var startX = str.indexOf(matchValue);
        var strBegin = str.substring(0, startX);
        var strEnd = str.substr(startX + matchValue.length);
        return (React.createElement("div", null,
            strBegin,
            React.createElement("b", null, matchValue),
            strEnd));
    };
    Option.prototype.render = function () {
        var _a = this.props, matchValue = _a.matchValue, indent = _a.indent, index = _a.index, activeIndex = _a.activeIndex, text = _a.text;
        var _style = indent ? {} : assign({}, { textIndent: '20px' });
        return (React.createElement("div", { className: classnames(nprefix + "-option", activeIndex == index && 'active'), style: _style, onClick: this.props.onClick }, (this.renderText(matchValue, text)) || this.props.children));
    };
    return Option;
}(React.Component));
exports.Option = Option;
var SearchSelector = (function (_super) {
    tslib_1.__extends(SearchSelector, _super);
    function SearchSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showOption: false,
            selectOption: { value: '', text: '' },
            searchContent: '',
            searchOptions: [],
            temp_activeIndex: 0
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
        // debugger
        var selectOption = this.getDefaultSelect(this.props);
        // console.log(selectOption)
        var options = this.getOptions(this.props);
        console.log(this.options);
        if (selectOption != null) {
            var searchContent = selectOption.text;
            this.setState({ selectOption: selectOption, searchOptions: this.options }); //,searchContent,options       
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
        if (this.props.onSearch) {
            var options = this.getOptions(nextprops);
            this.setState({ searchOptions: this.options }); //selectOption, searchContent,        
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
            if (typeof this.props.onChange === 'function') {
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
        return { value: value, text: text, isPlaceholder: false, index: option.props.index };
    };
    SearchSelector.prototype.getOptions = function (props) {
        var _this = this;
        var children = (Array.isArray(props.children) ? props.children : [props.children]).filter(function (child) { return child != null; });
        console.log('searchOptions', this.state.searchOptions);
        var displaySearchInput = this.props.displaySearchInput;
        var options = [];
        var indent = (displaySearchInput || false);
        children = children.map(function (child, i) {
            var _a = _this.getOptionObject(child), value = _a.value, text = _a.text;
            options.push(React.cloneElement(child, { value: value, text: text, index: i, key: i, indent: indent,
                onClick: _this.handlerClickOption.bind(_this, { value: value, text: text, i: i }),
                onMouseOver: _this.handlerMouseoverSelectorOption.bind(_this, { value: value, text: text, i: i })
            }));
        });
        this.options = options;
        return options;
    };
    SearchSelector.prototype.handlerTextClick = function () {
        //更改showOption
        this.innerClick = true;
        var showOption = !this.state.showOption;
        this.setState({ showOption: showOption });
        //有text框和input框，input清空
        if (this.props.clickInputEmpty) {
            var searchOptions = this.options;
            if (this.props.onSearch) {
                this.options = [];
                searchOptions = [];
            }
            console.log(searchOptions);
            this.setState({ showOption: showOption, searchContent: "", searchOptions: searchOptions, temp_activeIndex: 0 });
        }
    };
    SearchSelector.prototype.handlerInputClick = function () {
        // debugger
        ////更改searchOptions
        this.innerClick = true;
        var showOption = true;
        this.setState({ showOption: showOption });
        //只有input框，input清空
        if (this.props.displaySearchInput) {
            if (this.props.clickInputEmpty) {
                //   debugger
                var searchOptions = this.options;
                if (this.props.onSearch) {
                    this.options = [];
                    searchOptions = [];
                }
                this.setState({ showOption: showOption, searchContent: "", searchOptions: searchOptions, temp_activeIndex: 0 });
            }
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
        console.log(this.state.searchOptions);
        //找到temp_activeIndex
        var temp_activeIndex = 0;
        console.log('this.state.searchOptions', this.state.searchOptions);
        this.state.searchOptions.map(function (item, i) {
            console.log(i);
            console.log('obj', obj);
            console.log('value', item.value, obj.value);
            if (item.props.value == obj.value) {
                temp_activeIndex = i;
            }
        });
        console.log('temp_active', temp_activeIndex);
        console.log('index', obj.index);
        if (this.props.displaySearchInput) {
            this.setState({ showOption: showOption, selectOption: selectOption, searchContent: obj.text, temp_activeIndex: temp_activeIndex }); //,searchContent,searchOptions,temp_activeIndex:0,searchOptions:this.options
        }
        else {
            this.setState({ showOption: showOption, selectOption: selectOption, temp_activeIndex: temp_activeIndex }); //,searchContent:'',searchOptions:this.options,temp_activeIndex:0
        }
        if (this.refs.myinput)
            this.refs.myinput.blur();
    };
    SearchSelector.prototype.handlerKeydownSelectorOption = function (event) {
        console.log('keydown');
        console.log(event.keyCode);
        var keyCode = event.keyCode;
        console.log(this.options);
        var temp_activeIndex = this.state.temp_activeIndex;
        // this.setState({showOption:true,selectOption:this.options[1]})
        if (keyCode == '38') {
            console.log('向上选');
            if (temp_activeIndex > 0) {
                temp_activeIndex--;
            }
            this.setState({ showOption: true, temp_activeIndex: temp_activeIndex });
        }
        else if (keyCode == '40') {
            console.log('向下选');
            if (temp_activeIndex < this.state.searchOptions.length - 1) {
                temp_activeIndex++;
            }
            console.log(temp_activeIndex, 'temp_activeIndex');
            this.setState({ showOption: true, temp_activeIndex: temp_activeIndex });
        }
        else if (keyCode == '13') {
            console.log('回车选择确定选项');
            // this.setState({showOption:false,selectOption:this.options[this.state.temp_activeIndex]})
            var child = this.state.searchOptions[this.state.temp_activeIndex];
            var obj = this.getOptionObject(child);
            this.handlerClickOption(obj, null);
        }
        else {
            return;
        }
        event.preventDefault();
    };
    SearchSelector.prototype.scrollTo = function (index) {
        console.log(this.refs.optionsWrap);
        if (this.refs.optionsWrap) {
            this.refs.optionsWrap.scrollTop = (this.state.temp_activeIndex * 40);
        }
    };
    SearchSelector.prototype.componentDidUpdate = function () {
        this.scrollTo(this.state.temp_activeIndex);
    };
    SearchSelector.prototype.handlerMouseoverSelectorOption = function (obj, event) {
        console.log('mouseover');
        console.log(obj);
    };
    SearchSelector.prototype.renderOptions = function () {
        var _this = this;
        // debugger
        console.log('searchOptions', this.state.searchOptions);
        var _a = this.props, showMaxCount = _a.showMaxCount, displaySearchInput = _a.displaySearchInput;
        if (this.state.showOption) {
            var options = this.state.searchOptions;
            options = options.map(function (child, i) {
                return React.cloneElement(child, { activeIndex: _this.state.searchOptions[_this.state.temp_activeIndex].props.index });
            });
            console.log(options);
            if (options.length == 0) {
                return React.createElement("div", { className: classnames(nprefix + "-no-options") },
                    "No results match \"",
                    this.state.searchContent,
                    "\"");
            }
            return React.createElement("div", { className: classnames(nprefix + "-options"), ref: 'optionsWrap', style: { maxHeight: showMaxCount * 40 } }, options);
        }
        else {
            // debugger
            return null;
        }
    };
    SearchSelector.prototype.getMatchOptions = function (matchValue) {
        var _this = this;
        // debugger
        console.log(this.props);
        var children = this.options;
        console.log(this.options);
        var matchOptions = [];
        var matchNum = 0;
        // debugger
        console.log('mathValue', matchValue);
        children.map(function (child, i) {
            var _a = _this.getOptionObject(child), value = _a.value, text = _a.text;
            var patt = new RegExp(matchValue, 'ig');
            if (patt.exec(text) != null) {
                matchOptions.push(React.cloneElement(child, { key: matchNum, matchValue: matchValue })); //,{value,text,key:i}
                matchNum++;
            }
        });
        console.log('matchOptions', matchOptions);
        return matchOptions;
    };
    SearchSelector.prototype.judgeMatchState = function (event) {
        if (this.props.onSearch && typeof this.props.onSearch == 'function') {
            // debugger
            this.props.onSearch(event.target.value);
            this.setState({ showOption: true, searchContent: event.target.value, temp_activeIndex: 0 });
        }
        else {
            var searchContent = event.target.value;
            // debugger
            var searchOptions = this.getMatchOptions(event.target.value);
            console.log(searchOptions);
            this.searchOptions = searchOptions;
            this.setState({ showOption: true, searchContent: searchContent, searchOptions: searchOptions, temp_activeIndex: 0 }); //,temp_activeIndex:0
        }
    };
    SearchSelector.prototype.renderInput = function () {
        var icon = React.createElement("img", { src: require('./images/icon_search.png'), alt: '图标' });
        var _a = this.props, displaySearchInput = _a.displaySearchInput, placeholder = _a.placeholder;
        var showOption = this.state.showOption;
        var displaySearchInputContainerStyle = {};
        var inputStyle = {};
        if (!displaySearchInput) {
            assign(displaySearchInputContainerStyle, {
                border: '1px solid grey',
                margin: '0 10px'
            });
            assign(inputStyle, {
                paddingLeft: '10px'
            });
        }
        console.log(displaySearchInputContainerStyle);
        if (displaySearchInput || (!displaySearchInput && showOption)) {
            return (React.createElement("div", { className: classnames(nprefix + "-input"), style: displaySearchInputContainerStyle },
                React.createElement("input", { ref: 'myinput', type: "text", autoFocus: true, placeholder: (displaySearchInput && placeholder) || (!displaySearchInput && "搜索"), style: inputStyle, onChange: this.judgeMatchState.bind(this), onClick: this.handlerInputClick.bind(this), value: this.state.searchContent, onKeyDown: this.handlerKeydownSelectorOption.bind(this) }),
                React.createElement("span", { className: nprefix + "-icon-container" }, icon)));
        }
        else {
            return null;
        }
    };
    SearchSelector.prototype.render = function () {
        console.log(this.state.temp_activeIndex);
        var text = this.state.selectOption != null ? this.state.selectOption.text : null;
        var _a = this.props, extraClassName = _a.extraClassName, displaySearchInput = _a.displaySearchInput, style = _a.style;
        return (React.createElement("div", { ref: 'wrap', className: classnames("" + nprefix, (!displaySearchInput) && ((this.state.showOption && nprefix + "-arrowUp") || (!this.state.showOption && nprefix + "-arrowDown")), extraClassName), style: style },
            !displaySearchInput &&
                (React.createElement("div", { className: classnames(nprefix + "-text"), onClick: this.handlerTextClick.bind(this) }, text || this.props.placeholder)),
            React.createElement("div", { className: classnames(nprefix + "-container", displaySearchInput && 'container-relative') },
                this.renderInput(),
                this.renderOptions())));
    };
    return SearchSelector;
}(React.Component));
SearchSelector.defaultProps = {
    showMaxCount: 3,
    clickInputEmpty: false,
    // withoutText:false,
    displaySearchInput: false
};
exports["default"] = SearchSelector;
