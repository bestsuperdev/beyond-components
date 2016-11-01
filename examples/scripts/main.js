require("../styles/style.less")
//组件样式
require("styles/index.less")

var ReactDom = require('react-dom') 
var React = require('react') 
/*
	动态设置publicPath，在正式环境运行的时候为绝对路径，如果需要手动指定，可以直接设置
	__webpack_public_path__的值

 */
var scripts = document.getElementsByTagName("script");
for (var i = scripts.length - 1; i >= 0; i--) {
	if(scripts[i].src.indexOf('.bundle.js') >= 0){
		var src = scripts[i].getAttribute("src");
		__webpack_public_path__ = src.substr(0, src.lastIndexOf("/") + 1);
		break;
	}
};

var App = require('./components/app')
ReactDom.render(<App/>, document.querySelector('#root'));
