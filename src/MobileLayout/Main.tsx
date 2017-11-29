import * as React from 'react';
import assign = require('beyond-lib/lib/assign')


const baseStyle = {
	overflowX : 'hidden',
	overflowY : 'auto'
}

const Main = (props : React.HTMLProps<HTMLDivElement>) : JSX.Element =>{
	let {className,style,children,...rests} = props
	style = assign({},baseStyle,style)
	return (
		<div style={style}  {...rests}>{children}</div>
	)
}

export default Main