/*
<Placeholder color="grey">
	<input type="text"/>
</Placeholder>
*/

const React = require('react')
const mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs')
const assign = require('beyond-lib/lib/assign')

let support = null;


function isPlaceholderSupport() {
	if (support == null) {
		support = typeof window !== 'undefined' && 'placeholder' in document.createElement('input');
	}
	return support;
}


class Placeholder extends React.Component {

	constructor(props){
		super(props)
		let children = props.children
		let isPlaceholder = false
		let value = null
		if (children && children.props) {
			const {value : _value ,defaultValue} = children.props
			isPlaceholder = !_value && !defaultValue
			value = defaultValue || _value || ''
		}
		this.state = { isPlaceholder, value}
	}

	render() {	
		let children = this.props.children
		if (!isPlaceholderSupport() && children && children.props && children.props.placeholder && (children.type === 'input' || children.type === 'textarea') ) {
			let props = children.props
			const {isPlaceholder,value} = this.state
			// let value = this.state.isPlaceholder ? props.placeholder : this.state.value
			let nextProps = {
				value : isPlaceholder ? props.placeholder : value,
				onChange : mergeFuncs(props.onChange,this.handleChange.bind(this)),
				onFocus : mergeFuncs(props.onFocus,this.handleFocus.bind(this)),
				onBlur : mergeFuncs(props.onBlur,this.handleBlur.bind(this))
			}
			// alert(props.style)
			if (isPlaceholder) {
				nextProps.style =  assign({},props.style,{color : this.props.color})
			}
			if (children.type === 'input' &&  children.props.type === 'password' && isPlaceholder) {
				nextProps.type = 'text'	
			}
			return React.cloneElement(children,nextProps)
		}else{
			return children
		}
	}

	handleChange(event){
		let value = event.target.value
		this.setState((state, props) => ({value }))
	}

	handleBlur(event){
		let value = event.target.value
		if (!value) {
			this.setState((state, props) => ({isPlaceholder : true, value}))
		}
	}

	handleFocus(event){
		if (this.state.isPlaceholder) {
			this.setState((state, props) => ({isPlaceholder : false, value : ''}))
		}
	}

}


Placeholder.defaultProps = {
	color : '#999'
}

module.exports = Placeholder