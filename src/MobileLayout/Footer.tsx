import * as React from 'react';
import assign = require('beyond-lib/lib/assign')
export interface IFooterProps {
	className? : string;
	style? : React.CSSProperties
	children? : any,
	height? : number | string;
};

export interface IFooterState {};

const footerBaseStyle = {
    position : 'absolute',
    left : 0,
    bottom : 0,
    width : '100%'
}

export default class Footer extends React.Component<IFooterProps, IFooterState> {

	static defaultProps : IFooterProps = {
		height : 50
	}

	public render(): JSX.Element {
        let {height,className,style,children} = this.props
        style = assign({height},footerBaseStyle,style)
		return (
			<div style={style} className={className}>{children}</div>
		)
	}
}