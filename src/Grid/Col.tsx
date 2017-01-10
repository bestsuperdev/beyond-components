import React = require('react')
import classnames = require('classnames')
import assign = require('beyond-lib/lib/assign')

function percentage(num : number) {
	return (num * 100) + '%'
}

type NS = number | string;

interface IColProps {
    width? : NS;
    offsetWidth? : NS;
    col? : number;
    offsetCol? : number;
    style? :  any;
    className? :  string;
    extraClassName? :  string;
    grids? : number;
}

interface IColState {};



class Col extends React.Component<IColProps,IColState> {

    static defaultProps : IColProps = {
		className : 'col',
		grids : 12
	}
	
    render() {
		const style = this.getStyle()
        const {className, extraClassName, style : _style,children} = this.props
		return (
			<div style={assign({},style,_style)} className={classnames(className,extraClassName)}>
				{children}
			</div>
		)
	}

	getStyle(){
		
		const style : {width? : NS; marginRight? : NS; } = {}
        let {width,offsetWidth,col,offsetCol,grids} = this.props
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
}

export = Col
