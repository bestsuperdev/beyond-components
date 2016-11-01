const React = require('react')
const Test = require('src/index.js')
const Placeholder = require('src/Placeholder')

class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<h1>beyond components for react</h1>
				
				<Placeholder>
					<input type="text" placeholder="请输入名称" style={{fontSize : 12,height : 20}}/>
				</Placeholder>
				<Placeholder>
					<input type="password" placeholder="请输入密码" style={{fontSize : 12,height : 20}}/>
				</Placeholder>
				<Test>hello</Test>
			</div>
		)
	}
}

module.exports = App