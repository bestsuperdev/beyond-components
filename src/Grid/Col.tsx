import React = require('react')
import classnames = require('classnames')
import assign = require('beyond-lib/lib/assign')
import { prefix, IBaseProps } from '../consts'

function percentage(num : number) {
	return (num * 100) + '%'
}

export type NS = number | string;

export interface IColProps extends IBaseProps {
    width? : NS;
    offsetWidth? : NS;
    col? : number;
    offsetCol? : number;
    style? :  React.CSSProperties;
    grids? : number;
	children? : any;
}

function getStyle(props : IColProps) : Object{
	const style : {width? : NS; marginRight? : NS; } = {}
	let {width,offsetWidth,col,offsetCol,grids} = props
	if (width != null) {
		style.width = width
	}
	if (offsetWidth != null) {
		style.marginRight = offsetWidth
	}
	if (col != null) {
		style.width = percentage(col/grids)
	}
	if (offsetCol != null) {
		style.marginRight = percentage(offsetCol/grids)
	}
	return style
}

const Col = (props : IColProps)=>{
	props = assign({},props) as IColProps
	props.prefix = props.prefix || prefix
	props.grids = props.grids || 12
	let {extraClassName, style : _style, prefix : _prefix} = props
	let className =  `${_prefix}col`

	const style = getStyle(props)
	return (
		<div style={assign({},style,_style)} className={classnames(className,extraClassName)}>
			{props.children}
		</div>
	)
}

export default Col