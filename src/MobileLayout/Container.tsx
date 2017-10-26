import * as React from 'react';
import assign = require('beyond-lib/lib/assign')
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
export interface IMobileLayoutContainerProps extends React.HTMLProps<HTMLDivElement> {
	height? : string | number;
};


const baseStyle = {
	position : 'relative',
	height : window.innerHeight
}


function isInherit(el : JSX.Element, Base : any){
	return el && el.type && (el.type as any).prototype instanceof Base
}


const Container = (props : IMobileLayoutContainerProps) : JSX.Element =>{
	let {style,height,...rests} = props
	let mainStyle
	let top = 0
	let bottom = 0
	style = assign({},baseStyle,{height},style)
	let children : any
	if(props.children){
		children = !Array.isArray(props.children) ? [props.children] : props.children
		children.forEach((item : JSX.Element)=>{
			if(isInherit(item,Header)){
				top = item.props.height
			}else if(isInherit(item,Footer)){
				bottom = item.props.height
			}
		})
		children = (children as JSX.Element[]).map((item : JSX.Element,i)=> {
			let props : any = {key : i}
			if(isInherit(item,Main)){
				props.style = assign({top,bottom},item.props.style)
			}
			return React.cloneElement(item,props)
		})

	}

	return (
		<div {...rests} style={style}>
			{children}
		</div>
	)
}

export default Container