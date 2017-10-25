import * as React from 'react';
import assign = require('beyond-lib/lib/assign')
export interface IMainProps {
	className? : string;
	style? : React.CSSProperties
	children? : any;	
};

export interface IMainState {};

const baseStyle = {
    position : 'absolute',
    left : 0,
    top : 0,
    bottom : 0,
    width : '100%',
	overflowX : 'hidden',
	overflowY : 'auto'
}

export default class Main extends React.Component<IMainProps, IMainState> {

	public render(): JSX.Element {
        let {className,style,children} = this.props
        style = assign({},baseStyle,style)
		return (
			<div style={style} className={className}>{children}</div>
		)
	}
}