// import React = require('react')
import * as React from 'react'
import assign = require('beyond-lib/lib/assign')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'

export interface ITooltipProps extends IBaseProps{
	defaultVisible? : boolean;
	placement? : 'top' | 'bottom' | 'left' | 'right';
	children? : any;
}

export interface ITooltipState{
	visible? : boolean;
	style? : React.CSSProperties;
}


export default class Tooltip  extends React.Component<ITooltipProps,ITooltipState>{

	static defaultProps : ITooltipProps = {
		prefix,
		defaultVisible : false,
		placement : 'top'
	}

	state : ITooltipState
	
	constructor(props : ITooltipProps){
		super(props)
		this.state = {
			visible : props.defaultVisible,
			style : {}
		}
	}

	_setStyle(style : React.CSSProperties){
		this.setState({style, visible : true})
	}

	show(){
		this.toggle(true)
	}

	hide(){
		this.toggle(false)
	}

	toggle(visible : boolean){
		this.setState({visible})
	}

	render() {
		let {prefix : _prefix, extraClassName, placement, style : _style, children} = this.props
		let style = assign({},_style,this.state.style)
		let className =  `${_prefix}tooltip`
		if (!this.state.visible) {
			assign(style,{
				opacity : 0,
				position : 'absolute',
				left : '-9999px',
				top : '-9999px',
				visibility : 'hidden',
				display: 'none'
			})
		}   
		return (
			<div className={classnames(className,`${className}-${placement}`,extraClassName)} style={style} >
				<div className={`${className}-content`}>
					{children}
				</div>
				<div className={`${className}-triangle`}></div>
			</div>

		)
	}
}