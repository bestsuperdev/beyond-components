import * as React from 'react';
import assign = require('beyond-lib/lib/assign')
interface IHeaderProps {
	className? : string;
	style? : React.CSSProperties
	children? : any,
	height? : number | string;
};


const baseStyle = {
	position : 'relative'
}

interface IHeaderState {};

export default class Header extends React.Component<IHeaderProps, IHeaderState> {

	static defaultProps : IHeaderProps = {
		height : 50
	}

	public render(): JSX.Element {
		 let {height,className,style,children} = this.props
        style = assign({height},baseStyle,style)
		return (
			<div style={style} className={className} >{children}</div>
		)
	}
}