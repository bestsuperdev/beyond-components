/*
let instance = TooltipFactory.getInstance()
function test(event){
	instance.show(message,event.target)
}
<button onClick={test}></button>
 */
import React = require('react')
import ReactDOM = require('react-dom')
import Tooltip,{ITooltipProps} from './Tooltip'


function offset(node : HTMLElement) : React.CSSProperties {
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
	let wrap = document.createElement('div')
	document.body.appendChild(wrap)
	
	let instance = ReactDOM.render(<Tooltip {...props}>{children}</Tooltip>,wrap) as Tooltip
    
	return {
		show(target : HTMLElement){
			console.log(1)
			let style = getToolTipStyle(instance,target)
			instance._setStyle(style)
		},
		hide(){
			instance.hide()
		}
	}
}