/*
<Notification y="left" top="30px">
	<Content></Content>
	<Content></Content>
	<Content></Content>
</Notification>

x : center(default)/left/right 
y : top(default)/bottom/middle

 */
import * as React from 'react'
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'
// const containerClassName = `${prefix}notification`

export type X =  'center' | 'left' | 'right'
export type Y = 'top' | 'middle' | 'bottom'

export interface IContainerProps extends IBaseProps {
	x? : X;
	y? : Y;
}


// tslint:disable-next-line:variable-name
const Container = (props : IContainerProps)=> {
	let _prefix =  `${props.prefix || prefix}notification`  
	let xClassName
	let yClassName
	let {x,y,extraClassName,children} = props
	if(x === 'left' || x === 'right'){
		xClassName = `${_prefix}-${x}`
	}
	if(y === 'middle' || y === 'bottom'){
		yClassName = `${_prefix}-${y}`
	}
	let className = classnames(_prefix, xClassName, yClassName,extraClassName)
	return <div style={props.style}  className={className}>{children}</div>
}

export default Container