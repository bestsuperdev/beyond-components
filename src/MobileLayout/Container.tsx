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


function getHeight(child : JSX.Element){
	let height = child.props.style && child.props.style.height ? child.props.style.height : (child.props.height || 0)
	return typeof height === 'string' ? parseInt(height,10) : height
}



const Container = (props : IMobileLayoutContainerProps) : JSX.Element =>{
	let {style,height,...rests} = props
	let mainStyle,top,bottom 
	style = assign({},baseStyle,style)
	let children = props.children as JSX.Element[]
	if(children && children.length === 3){
		let top = getHeight(children[0])
		let bottom = getHeight(children[2])

		children = (children as JSX.Element[]).map((item : JSX.Element,i)=> {
			let props : any = {key : i}
			if(i === 1){
				props.style = assign({height : window.innerHeight - top - bottom},item.props.style)
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