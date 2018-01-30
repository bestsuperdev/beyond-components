/*

<TooltipTrigger tooltip={<Tooltip>hello world<Tooltip/>} >
	<button>hover</button>
</TooltipTrigger>
 */

import * as React from 'react'
import {findDOMNode} from 'react-dom'
import {getNewInstance,ITooltipOperator} from './tooltipFactory'
import mergeFuncs = require('beyond-lib/lib/utilities/mergeFuncs')

export interface ITriggerProps{
	tooltip : JSX.Element;
}

export default class Trigger extends React.Component<ITriggerProps,{}> {

	tooltipOperator : ITooltipOperator

	target : HTMLElement

	constructor(props :ITriggerProps){
		super(props)
		this.show = this.show.bind(this)
		this.hide = this.hide.bind(this)
	}

	componentDidMount() {
		if(this.props.tooltip){
			this.tooltipOperator = getNewInstance(this.props.tooltip)
			this.target = findDOMNode(this) as HTMLElement
		}
	}

	render() {
		let children = this.props.children as JSX.Element
		let props = {
			onMouseEnter : mergeFuncs(children.props.onMouseEnter,this.show),
			onMouseLeave : mergeFuncs(children.props.onMouseLeave,this.hide) 
		}
		return React.cloneElement(children,props) 
	}

	show(){
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