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
exports.__esModule = true;
var tslib_1 = require("tslib");
var React = require("react");
var assign = require("beyond-lib/lib/assign");
var supportFormData = typeof FormData !== 'undefined';
var id = 0;
function getIframeName() {
    id++;
    return "beyondcomponentsForm"; // + id
}
var Form = (function (_super) {
    tslib_1.__extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.handlerIframeLoad = _this.handlerIframeLoad.bind(_this);
        if (!supportFormData) {
            _this.iframeName = getIframeName();
        }
        return _this;
    }
    Form.prototype.componentDidMount = function () {
        if (!supportFormData) {
            this.iframe = document.createElement('iframe');
            this.iframe.name = this.iframeName;
            this.iframe.id = this.iframeName;
            assign(this.iframe.style, { width: '0px', height: '0px', border: 'none' });
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
        var _a = this.props, children = _a.children, dataType = _a.dataType, onComplete = _a.onComplete, onError = _a.onError, onSuccess = _a.onSuccess, rests = tslib_1.__rest(_a, ["children", "dataType", "onComplete", "onError", "onSuccess"]);
        return React.createElement("form", tslib_1.__assign({ target: this.iframeName }, rests), children);
    };
    return Form;
}(React.Component));
Form.defaultProps = {
    encType: 'multipart/form-data',
    dataType: 'json',
    method: 'POST'
};
exports["default"] = Form;
