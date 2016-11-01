const React = require('react')
const Test = require('src/index.js')
class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<Test>hello</Test>
			</div>
		)
	}
}

module.exports = App