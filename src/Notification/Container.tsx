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
import {prefix} from '../consts'
const containerClassName = `${prefix}notification`

export type X =  'center' | 'left' | 'right';
export type Y = 'top' | 'middle' | 'bottom';

export interface IContainerProps {
    className? : string;
    extraClassName? : string;
    x? : X;
    y? : Y;
    children? : any; 
}


const Container = (props : IContainerProps)=> {
	const className = props.className || containerClassName
	let xClassName = ''
    let yClassName = ''
	if(props.x === 'left' || props.x === 'right'){
		xClassName = `${className}-${props.x}`
	}
	if(props.y === 'middle' || props.y === 'bottom'){
		yClassName = `${className}-${props.y}`
	}
	return <div {...props} className={classnames(className, xClassName, yClassName, props.extraClassName)}>{props.children}</div>
}

export default Container