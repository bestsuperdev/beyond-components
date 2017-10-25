/*

<TooltipTrigger tooltip={<Tooltip>hello world<Tooltip/>} >
	<button>hover</button>
</TooltipTrigger>
 */

import React = require('react')
import ReactDom = require('react-dom')
import {getNewInstance,ITooltipOperator} from './tooltipFactory'
import Tooltip,{ITooltipProps} from './Tooltip'
import mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs')

export interface ITriggerProps{
	tooltip : JSX.Element;
}

export interface ITriggerState{

}

export default class Trigger extends React.Component<ITriggerProps,ITriggerState> {

    tooltipOperator : ITooltipOperator;

    target : HTMLElement;

    componentDidMount() {
		this.tooltipOperator = getNewInstance(this.props.tooltip)
		this.target = ReactDom.findDOMNode<HTMLElement>(this)
	}

    render() {
		let children = this.props.children as JSX.Element
        let props = {
            onMouseEnter : mergeFuncs(children.props.onMouseEnter,this.show.bind(this)),
            onMouseLeave : mergeFuncs(children.props.onMouseLeave,this.hide.bind(this)) 
        }
		return React.cloneElement(children,props) 
	}

	show(){
		console.log('show')
		if (this.tooltipOperator && this.target) {
			this.tooltipOperator.show(this.target)
		}
	}

	hide(){
		if (this.tooltipOperator && this.target) {
			this.tooltipOperator.hide()
		}
	}
}