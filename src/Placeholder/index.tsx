/*
<Placeholder color="grey">
	<input type="text"/>
</Placeholder>
*/

import React = require('react')
const mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs')
import assign = require('beyond-lib/lib/assign')

// declare const mergeFuncs : ()=> void; 

let support : boolean = null;


function isPlaceholderSupport() {
	if (support == null) {
		support = typeof window !== 'undefined' && 'placeholder' in document.createElement('input');
	}
	return support;
}


export interface IPlaceholderProps {
	children? : any;
	color? : string | number;
}

export interface IPlaceholderState {
	isPlaceholder? : boolean;
	value? : string;
}

export default class Placeholder extends React.Component<IPlaceholderProps,IPlaceholderState> {

	// state : any;

	static defaultProps : IPlaceholderProps = {
		color : '#999'
	}

	constructor(props : IPlaceholderProps){
		super(props)
		let children = props.children
		let isPlaceholder = false
		let value : string = null
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
			let nextProps = {
				value : isPlaceholder ? props.placeholder : value,
				onChange : mergeFuncs(props.onChange,this.handleChange.bind(this)),
				onFocus : mergeFuncs(props.onFocus,this.handleFocus.bind(this)),
				onBlur : mergeFuncs(props.onBlur,this.handleBlur.bind(this)) 				
			}
			if (isPlaceholder) {
				(nextProps as any).style = assign({},props.style,{color : this.props.color})
			}
			if (children.type === 'input' &&  children.props.type === 'password' && isPlaceholder) {
				(nextProps as any).type = 'text'	
			}
			return React.cloneElement(children,nextProps)
		}else{
			return children
		}
	}

	handleChange(event : React.SyntheticEvent<Element>){
		let value = (event.target as HTMLInputElement).value
		this.setState({value})
	}

	handleBlur(event : React.SyntheticEvent<Element>){
		let value = (event.target as HTMLInputElement).value
		if (!value) {
			this.setState({isPlaceholder : true, value})
		}
	}

	handleFocus(event : React.SyntheticEvent<Element>){
		if (this.state.isPlaceholder) {
			this.setState({isPlaceholder : false, value : ''})
		}
	}

}