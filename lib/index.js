'use strict';

var React = require('react');

var Test = React.createClass({
	displayName: 'Test',
	render: function render() {
		return React.createElement(
			'div',
			null,
			this.props.children
		);
	}
});

module.exports = Test;