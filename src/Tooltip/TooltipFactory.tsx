/*
let instance = TooltipFactory.getInstance()
function test(event){
	instance.show(message,event.target)
}
<button onClick={test}></button>
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Tooltip from './Tooltip'


function offset(node : HTMLElement) : React.CSSProperties {
	let box = node.getBoundingClientRect()
	let {pageYOffset,pageXOffset} = window
	let {scrollTop,clientTop,scrollLeft,clientLeft} = document.documentElement
	let body = document.body
	return {
		top: box.top + Math.max(pageYOffset || 0, scrollTop, body.scrollTop) - (clientTop || body.clientTop),
		// tslint:disable-next-line:max-line-length
		left: box.left + Math.max(pageXOffset || 0, scrollLeft, body.scrollLeft) - (clientLeft || body.clientLeft),
		width: (box.width == null ? node.offsetWidth : box.width) || 0,
		height: (box.height == null ? node.offsetHeight : box.height) || 0
	}
}


function getToolTipStyle(tooltip : any, target : HTMLElement) : React.CSSProperties{
	let placement = tooltip.props.placement || 'top'
	let toolTipNode = ReactDOM.findDOMNode(tooltip) as HTMLElement
	toolTipNode.style.display = 'block'
	let {offsetHeight,offsetWidth} = toolTipNode
	toolTipNode.style.display = 'none'
	let targetOffset = offset(target)
	let top:string , left:string
	if (placement === 'top') {
		top  = (targetOffset.top - offsetHeight - 15) + 'px',
		left = (targetOffset.left - (offsetWidth - targetOffset.width ) /2 ) + 'px'
	}else if(placement === 'bottom'){
		top = (targetOffset.top + targetOffset.height + 15) + 'px'
		left = (targetOffset.left - (offsetWidth - targetOffset.width ) /2 ) + 'px'
	}else if(placement === 'left'){
		top = (targetOffset.top - (offsetHeight - targetOffset.height ) /2 ) + 'px'
		left = (targetOffset.left - offsetWidth - 15) + 'px'
	}else if(placement === 'right'){
		top = (targetOffset.top - (offsetHeight - targetOffset.height ) /2 ) + 'px'
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

export interface ITooltipOperator{
	show : (target : HTMLElement)=> void;
	hide : ()=> void;
}


export function getNewInstance(tooltip : JSX.Element) : ITooltipOperator {
	let {props} = tooltip
	let {children} = props
	let instance : Tooltip = null
	let wrap = document.createElement('div')
	document.body.appendChild(wrap)
	
	ReactDOM.render(<Tooltip ref={(ref)=> instance = ref } {...props} defaultVisible={false} />,wrap)

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