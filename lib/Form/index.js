/**
 * fetch-ie8
 *
 * onSubmit 只有支持 FormData 的浏览器才会触发
 * dataType : 'json'/'text'/'html'
 *
 * handlerSubmit(event){
 * 		submitForm(data)
 * 		.then((res)=>{
 * 			console.log(res)
 * 		})
 * }
 *
 * handlerSuccess(res){
 * 	if(res.Sucess){
 * 		alert('success loaded')
 * 	}
 * }
 *
 * <Form className timeout={10} encType="multipart/form-data" userFormData action="example.com" method="POST" onSubmit={this.handlerSubmit} onSuccess  onError onComplete>
 *      <input name="file1" type="file"/>
 *      <input name="file2" type="file"/>
 *      <input type="text"/>
 *      <button type="submit">submit</button>
 * </Form>
 *
 */
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
var React = require("react");
var assign = require("beyond-lib/lib/assign");
var supportFormData = typeof FormData !== 'undefined';
var id = 0;
function getIframeName() {
    id++;
    return "beyondcomponentsForm"; // + id
}
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.iframeName = getIframeName();
        _this.handlerIframeLoad = _this.handlerIframeLoad.bind(_this);
        return _this;
    }
    Form.prototype.componentDidMount = function () {
        if (!supportFormData || true) {
            this.iframe = document.createElement('iframe');
            this.iframe.name = this.iframeName;
            this.iframe.id = this.iframeName;
            this.iframe.style.width = '0px';
            this.iframe.style.height = '0px';
            this.iframe.style.border = 'none';
            document.body.appendChild(this.iframe);
            this.iframe.onload = this.handlerIframeLoad;
        }
    };
    Form.prototype.componentWillUnmount = function () {
        if (this.iframe) {
            this.iframe.onload = null;
            document.body.removeChild(this.iframe);
            this.iframe = null;
        }
    };
    Form.prototype.handlerIframeLoad = function () {
        var _this = this;
        var body = null;
        if (this.iframe.contentDocument) {
            body = this.iframe.contentDocument.getElementsByTagName('body')[0];
        }
        else if (this.iframe.contentWindow) {
            body = this.iframe.contentWindow.document.getElementsByTagName('body')[0];
        }
        if (body) {
            var dataType = this.props.dataType;
            var content = body.textContent || body.innerText || '';
            var cb = function (data, type) {
                if (typeof _this.props[type] === 'function') {
                    _this.props[type](data);
                }
            };
            if (dataType === 'json') {
                try {
                    content = JSON.parse(content);
                    cb(content, 'onSuccess');
                    cb(content, 'onComplete');
                }
                catch (e) {
                    cb(content, 'onError');
                    cb(content, 'onComplete');
                }
            }
            else {
                cb(content, 'onSuccess');
                cb(content, 'onComplete');
            }
        }
    };
    Form.prototype.render = function () {
        var props = assign({}, this.props);
        var children = this.props.children;
        delete props.dataType;
        delete props.onComplete;
        delete props.onError;
        delete props.onSuccess;
        return (React.createElement("form", __assign({ target: "" + this.iframeName }, props), children));
    };
    return Form;
}(React.Component));
Form.defaultProps = {
    encType: 'multipart/form-data',
    dataType: 'json',
    method: 'POST'
};
exports.__esModule = true;
exports["default"] = Form;
