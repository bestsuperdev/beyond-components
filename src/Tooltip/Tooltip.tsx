import React = require('react')
import assign = require('beyond-lib/lib/assign')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'

export interface ITooltipProps extends IBaseProps<HTMLDivElement>{
    visible? : boolean;
    // duration? : number;
    placement? : 'top' | 'bottom' | 'left' | 'right';
    style? : Object;
}

export interface ITooltipState{
    visible? : boolean;
    style? : Object;
}


export default class Tooltip  extends React.Component<ITooltipProps,ITooltipState>{

    static defaultProps : ITooltipProps = {
        prefix : prefix,
        visible : false,
        placement : 'top'
    }

    state : ITooltipState;
    
    constructor(props : ITooltipProps){
        super(props)
        this.state = {
            visible : props.visible,
            style : {}
        }
    }

	_setStyle(style : Object){
		this.setState((state, props) => ({style, visible : true}))
	}

    show(){
        this.toggle(true)
    }

    hide(){
        this.toggle(false)
    }

	toggle(visible : boolean){
		this.setState((state, props) => ({visible}))
	}

	render() {
        let {prefix,extraClassName,placement,style : _style, children} = this.props
		let style = assign({},_style,this.state.style)
		let className =  `${prefix}tooltip`
		if (!this.state.visible) {
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