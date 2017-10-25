/*
<Notification y="left" top="30px">
	<Content></Content>
	<Content></Content>
	<Content></Content>
</Notification>

x : center(default)/left/right 
y : top(default)/bottom/middle

 */
import React = require('react')
import ReactDOM = require('react-dom')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'
// const containerClassName = `${prefix}notification`

export type X =  'center' | 'left' | 'right';
export type Y = 'top' | 'middle' | 'bottom';

export interface IContainerProps extends IBaseProps {
    x? : X;
    y? : Y;
    children? : any; 
	style? : React.CSSProperties;
}


const Container = (props : IContainerProps)=> {
	let _prefix = props.prefix || prefix 
	let className = `${_prefix}notification`
	let xClassName
    let yClassName
	let {x,y,extraClassName,children} = props
	if(x === 'left' || x === 'right'){
		xClassName = `${className}-${x}`
	}
	if(y === 'middle' || y === 'bottom'){
		yClassName = `${className}-${y}`
	}
	
	return <div style={props.style}  className={classnames(className, xClassName, yClassName,extraClassName)}>{children}</div>
}

export default Container