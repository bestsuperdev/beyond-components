/*

<TooltipTrigger tooltip={<Tooltip duration={3}>hello world<Tooltip/>} >
	<button>hover</button>
</TooltipTrigger>
 */

import React = require('react')
import ReactDom = require('react-dom')
import {getNewInstance} from './tooltipFactory'
import mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs')

// function merge(fn1 : Function, fn2 : Function) : Function {
// 	return function(){
// 		let args = Array.prototype.slice.call(arguments,0)
// 		let result : any
// 		if (typeof fn1 === 'function') {
// 			result = fn1.apply(this,args)
// 		}
// 		if (typeof fn2 === 'function') {
// 			fn2.apply(this,args)
// 		}
// 		return result
// 	}
// }

export interface ITriggerProps{
    tooltip : any;
}

export interface ITriggerState{

}

export default class Trigger extends React.Component<ITriggerProps,ITriggerState> {

    tooltip : {show : (node : Element)=>void; hide : ()=>void;};

    target : Element;

    componentDidMount() {
        let tooltip = this.props.tooltip
		this.tooltip = getNewInstance(tooltip.props, tooltip.props.children)

		this.target = ReactDom.findDOMNode(this)
	}

    render() {
		let children = this.props.children as any
        let props = {
            onMouseEnter : mergeFuncs(children.props.onMouseEnter,this.show.bind(this)),
            onMouseLeave : mergeFuncs(children.props.onMouseLeave,this.hide.bind(this)) 
        }
		return React.cloneElement(children,props) 
	}

	show(){
		if (this.tooltip && this.target) {
			this.tooltip.show(this.target)
		}
	}

	hide(){
		if (this.tooltip && this.target) {
			this.tooltip.hide()
		}
	}
}