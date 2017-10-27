import * as React from 'react';
import assign = require('beyond-lib/lib/assign')


const baseStyle = {
    position : 'absolute',
    left : 0,
    top : 0,
    bottom : 0,
    width : '100%',
	overflowX : 'hidden',
	overflowY : 'auto'
}

const Main = (props : React.HTMLProps<HTMLDivElement>) : JSX.Element =>{
	let {className,style,children,...rests} = this.props
	style = assign({},baseStyle,style)
	return (
		<div style={style}  {...rests}>{children}</div>
	)
}

export default Main