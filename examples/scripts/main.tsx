import '../styles/style.less'


if (process.env.NODE_ENV !== 'production') {
	console.log('this is dev mode')
}

/*
	动态设置publicPath，在正式环境运行的时候为绝对路径，如果需要手动指定，可以直接设置
	__webpack_public_path__的值，如  __webpack_public_path__ = '/base/bundles/'

 */
var scripts = document.getElementsByTagName('script')
for (var i = scripts.length - 1; i >= 0; i--) {
	if(scripts[i].src.indexOf('.bundle.js') >= 0){
		var src = scripts[i].getAttribute('src')
		__webpack_public_path__ = src.substr(0, src.lastIndexOf('/') + 1)
		break
	}
}

import React = require('react')
import ReactDOM = require('react-dom')
import App = require('../scripts/components/App')
import { AppContainer } from "react-hot-loader";

const $root = document.querySelector('#root')

ReactDOM.render(<App/>, $root)

if(module.hot) {
	module.hot.accept("../scripts/components/App", () => {
		const NextApp = require("../scripts/components/App")
		console.log(NextApp)
		ReactDOM.render(<AppContainer><App/></AppContainer>,$root)
	})
}