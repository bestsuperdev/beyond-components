// import React = require("react")
import * as React from 'react';
import classnames = require("classnames");
import assign = require("beyond-lib/lib/assign");
import { prefix as _prefix, IBaseProps } from "../consts";

function percentage(num : number):string {
	return (num * 100) + "%";
}

export type NS = number | string;

export interface IColProps extends React.HTMLProps<HTMLDivElement> {
    width? : NS;
    offsetWidth? : NS;
    col? : number;
    offsetCol? : number;
	grids? : number;
	extraClassName? : string;
	prefix? : string;
}

function getStyle(props : IColProps): React.CSSProperties {
	const style : {width? : NS; marginRight? : NS; } = {};
	let {width,offsetWidth,col,offsetCol,grids} = props;
	if (width != null) {
		style.width = width;
	}
	if (offsetWidth != null) {
		style.marginRight = offsetWidth;
	}
	if (col != null) {
		style.width = percentage(col/grids);
	}
	if (offsetCol != null) {
		style.marginRight = percentage(offsetCol/grids);
	}
	return style;
}

const Col = (props : IColProps)=>  {
	props = assign({},props) as IColProps;
	props.prefix = props.prefix || _prefix;
	props.grids = props.grids || 12;
	let {extraClassName, style , prefix, width,offsetWidth,col,offsetCol,grids,...rests} = props;
	let className =  `${prefix}col`;

	const _style = getStyle(props);

	return (
		<div {...rests} style={assign({},_style,style)} className={classnames(className,extraClassName)}>
			{props.children}
		</div>
	);
};

export default Col;