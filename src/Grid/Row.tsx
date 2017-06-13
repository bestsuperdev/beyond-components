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
import Col from './Col'
import { prefix, IBaseProps } from '../consts'

export interface IRowProps extends IBaseProps<HTMLDivElement> {
	width?: number | string;
	gutter?: number;
	verticalGutter?: number;
	style?: any;
	// className?: string;
	// extraClassName?: string;
	grids?: number;
};

export interface IRowState { };

export default class Row extends React.Component<IRowProps, IRowState> {
	static defaultProps: IRowProps = {
		grids: 12,
		prefix : prefix,  //`${prefix}row`,
		gutter: 0,
		verticalGutter: 0
	}


	render() {
		let style : {width? : string | number} = {}
		let {width,extraClassName,style : _style, prefix} = this.props

		let className = `${prefix}row`
		if (width != null) {
			style.width = width
		}
		return (
			<div style={assign(style, _style)} className={classnames(className, extraClassName)}>
				{this.renderCols()}
			</div>
		)
	}

	renderCols() {
		let {gutter, verticalGutter,grids,prefix} = this.props
		let children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child) => child != null)
		let style : {paddingLeft? : number; paddingRight? : number; paddingTop? : number; paddingBottom? : number;} = {}

		if (gutter > 0) {
			style.paddingLeft = gutter / 2
			style.paddingRight = gutter / 2
		}
		if (verticalGutter > 0) {
			style.paddingTop = verticalGutter / 2
			style.paddingBottom = verticalGutter / 2
		}
		return children.map((child : JSX.Element) => React.cloneElement(child, { style: assign({}, style, child.props.style), grids,prefix}))
	}
}