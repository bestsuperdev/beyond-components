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

const prefix = 'notification'

type X =  'center' | 'left' | 'right';
type Y = 'top' | 'middle' | 'bottom';

interface IContainerProps {
    className? : string;
    extraClassName? : string;
    x? : X;
    y? : Y;
    children? : any; 
}


const Container = (props : IContainerProps)=> {
	const className = props.className || prefix
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

export = Container