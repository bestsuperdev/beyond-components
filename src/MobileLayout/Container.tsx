import * as React from 'react';
import assign = require('beyond-lib/lib/assign')
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
interface ContainerProps {
	style? : React.CSSProperties
	className? : string;
	height? : string | number;

	children? : JSX.Element[];

};

// window.Header = Header
interface ContainerState {};

const baseStyle = {
	position : 'relative',
	height : window.innerHeight
}


function isInherit(el : JSX.Element, Base : any){
	return el && el.type && (el.type as any).prototype instanceof Base
}

export default class Container extends React.Component<ContainerProps, ContainerState> {

	componentDidMount(){

	}

	public render(): JSX.Element {
		
		let {children,style,className,height} = this.props
		let mainStyle
		let top = 0
		let bottom = 0
		style = assign({},baseStyle,height != null ? {height} : null ,style)
		if(children){
			children = !Array.isArray(children) ? [children] : children
			children.forEach((item)=>{
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
			<div style={style} className={className} >
				{children}
			</div>
		)
	}
}