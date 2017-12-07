/*
<Document onClick={this.outClick} title="">
	<div onClick={this.innerClick}></div>
</Document>
*/

import React = require('react')
import ReactDOM = require('react-dom')

export interface IDocumentProps {
	delay? : number;
	children? : any;
	onClick? : (event? : React.MouseEvent<Element> ) => void;
}


export default class Document extends React.Component<IDocumentProps,{}> {

	private innerClick : boolean

	static defaultProps : IDocumentProps = {
		delay : 100
	}

	constructor(props : IDocumentProps){
		super(props)
		this.innerClick = false
		this.handlerInnerClick = this.handlerInnerClick.bind(this)
		this.handlerOutClick = this.handlerOutClick.bind(this)
		
	}

	
	componentDidMount() {
		let wrap = ReactDOM.findDOMNode(this)
		if (wrap && wrap.nodeName) {
			if (wrap.addEventListener) {
				wrap.addEventListener('click',this.handlerInnerClick,false)
				document.addEventListener('click',this.handlerOutClick,false)
			}else{
				wrap.attachEvent('onclick',this.handlerInnerClick)
				document.attachEvent('onclick',this.handlerOutClick)
			}
		}
	}

	componentWillUnmount() {
		let wrap = ReactDOM.findDOMNode(this)
		if (wrap && wrap.nodeName) {
			if (wrap.addEventListener) {
				wrap.removeEventListener('click',this.handlerInnerClick,false)
				document.removeEventListener('click',this.handlerOutClick,false)
			}else{
				wrap.detachEvent('onclick',this.handlerInnerClick)
				document.detachEvent('onclick',this.handlerOutClick)
			}
		}
	}

	handlerInnerClick(){
		this.innerClick = true
	}

	handlerOutClick(){
		const {onClick,delay} = this.props
		setTimeout(()=>{
			if (!this.innerClick && typeof onClick === 'function') {
				onClick()
			}
			this.innerClick = false
		}, delay)
	}

	render() {
		return this.props.children
	}
}