var React = require('react')

const Test = React.createClass({
	render() {
		return (
			<div>{this.props.children}</div>
		)
	}
});


module.exports = Test