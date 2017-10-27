import * as React from 'react';
import assign = require('beyond-lib/lib/assign')
export interface IMobileLayoutHeaderProps extends React.HTMLProps<HTMLDivElement> {
	height? : number | string;
};


const baseStyle = {
	position : 'relative'
}

export interface IHeaderState {};

const Header = (props : IMobileLayoutHeaderProps) : JSX.Element =>{
	props.height = props.height || 50
	let {height,style,className,children, ...rests} = props
	style = assign({height},baseStyle,style)
	return (
		<div {...rests} style={style}>{children}</div>
	)
}

export default Header