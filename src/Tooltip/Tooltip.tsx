import React = require('react')
import assign = require('beyond-lib/lib/assign')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'

export interface ITooltipProps extends IBaseProps{
    defaultVisible? : boolean;
    visible? : boolean;
    placement? : 'top' | 'bottom' | 'left' | 'right';
    style? : React.CSSProperties;
    children? : any;
}

export interface ITooltipState{
    visible? : boolean;
    style? : React.CSSProperties;
}


export default class Tooltip  extends React.Component<ITooltipProps,ITooltipState>{

    static defaultProps : ITooltipProps = {
        prefix : prefix,
        visible : false,
        defaultVisible : false,
        placement : 'top'
    }

    state : ITooltipState;
    
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
        let {prefix,extraClassName,placement,style : _style, children,visible : _visible} = this.props
		let style = assign({},_style,this.state.style)
        let className =  `${prefix}tooltip`
        let visible = _visible != null ? _visible : this.state.visible
		if (!visible) {
			assign(style,{
				opacity : 0,
				position : 'absolute',
				left : '-9999px',
				top : '-9999px',
				visibility : 'hidden'
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