/*

	 12 grid, Col.xs 表示百分比
	 <Row width={1200} gutter={30} verticalGutter={20}>
	 	<Col xs={6}  width={600} offset={100}></Col>
	 	<Col xs={6} width={600}></Col>
	 </Row>
	 <Row  gutter={30}>
	 	<Col xs={6} xsOffset={}></Col>
	 	<Col xs={6}></Col>
	 </Row>
 */
import React = require('react')
import classnames = require('classnames')
import assign = require('beyond-lib/lib/assign')
// import Col from './Col'
import { prefix as _prefix, IBaseProps } from '../consts'

export interface IRowProps extends IBaseProps {
	width?: number | string;
	gutter?: number;
	verticalGutter?: number;
	grids?: number;
};

export interface IRowState { };

const Row = (props : IRowProps)=>{

	let {width, gutter = 0, verticalGutter = 0, grids = 12, prefix, extraClassName, style : _style} = props
	prefix = prefix || _prefix

	let children = (Array.isArray(props.children) ? props.children : [props.children]).filter((child) => child != null)

	let colStyle : React.CSSProperties = {}
	let rowStyle : React.CSSProperties = {}
	if (gutter > 0) {
		colStyle.paddingLeft = gutter / 2
		colStyle.paddingRight = gutter / 2
	}
	if (verticalGutter > 0) {
		colStyle.paddingTop = verticalGutter / 2
		colStyle.paddingBottom = verticalGutter / 2
	}
	let className = `${prefix}row`
	

	children = children.map((child : JSX.Element) => {
		let style = assign({}, colStyle, child.props.style)
		return React.cloneElement(child, { style, grids, prefix})
	})

	if (width != null) {
		rowStyle.width = width
	}
	return (
		<div style={assign(rowStyle, _style)} className={classnames(className, extraClassName)}>
			{children}
		</div>
	)
}

export default Row