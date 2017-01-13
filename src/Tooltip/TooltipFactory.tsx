/*
let instance = TooltipFactory.getInstance()
function test(event){
	instance.show(message,event.target)
}
<button onClick={test}></button>
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import React = require('react')
// import ReactDom = require('react-dom')
// import Tooltip = require('./Tooltip')
import Tooltip,{ITooltipProps,ITooltipState} from './Tooltip'


function offset(node : HTMLElement){
	let box = node.getBoundingClientRect()
	let win = window
	let docElem = document.documentElement	
	let body = document.body
	return {
	    top: box.top + Math.max(win.pageYOffset|| 0, docElem.scrollTop, body.scrollTop) - (docElem.clientTop || body.clientTop),
	    left: box.left + Math.max(win.pageXOffset|| 0 , docElem.scrollLeft, body.scrollLeft) - (docElem.clientLeft || body.clientLeft),
	    width: (box.width == null ? node.offsetWidth : box.width) || 0,
	    height: (box.height == null ? node.offsetHeight : box.height) || 0
	}
}


function getToolTipStyle(tooltip : Tooltip, target : HTMLElement){
	let placement = tooltip.props.placement || 'top'
	let toolTipNode = ReactDOM.findDOMNode(tooltip) as HTMLElement
	let targetOffset = offset(target)
	let top , left
	if (placement === 'top') {
		top  = (targetOffset.top - toolTipNode.offsetHeight - 15) + 'px',
		left = (targetOffset.left - (toolTipNode.offsetWidth - targetOffset.width ) /2 ) + 'px'
	}else if(placement === 'bottom'){
		top = (targetOffset.top + targetOffset.height + 15) + 'px'
		left = (targetOffset.left - (toolTipNode.offsetWidth - targetOffset.width ) /2 ) + 'px'
	}else if(placement === 'left'){
		top = (targetOffset.top - (toolTipNode.offsetHeight - targetOffset.height ) /2 ) + 'px'
		left = (targetOffset.left - toolTipNode.offsetWidth - 15) + 'px'
	}else if(placement === 'right'){
		top = (targetOffset.top - (toolTipNode.offsetHeight - targetOffset.height ) /2 ) + 'px'
		left = (targetOffset.left + targetOffset.width + 15) + 'px'
	}
	if (top != null) {
		return {
			position : 'absolute',
			visibility : 'visible',
			display : 'block',
			top,
			left
		}
	}
	return null
}


export function getNewInstance(props : ITooltipProps, children : any) {
	let wrap = document.createElement('div')
    let instance : Tooltip
	document.body.appendChild(wrap)
	
	instance = ReactDOM.render(<Tooltip {...props}>{children}</Tooltip>,wrap) as Tooltip
    
	return {
		show(target : HTMLElement){
			let style = getToolTipStyle(instance,target)
			instance._setStyle(style)
		},
		hide(){
			instance.hide()
		}
	}
}