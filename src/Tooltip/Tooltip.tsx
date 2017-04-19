import React = require('react')
import assign = require('beyond-lib/lib/assign')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'

export interface ITooltipProps extends IBaseProps{
    visible? : boolean;
    duration? : number;
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
        // className : `${prefix}tooltip`,
        visible : false,
        duration : 0,
        placement : 'top'
    }

    state : ITooltipState;
    
    handle : number;

    constructor(props : ITooltipProps){
        super(props)
        this.state = {
            visible : props.visible,
            style : {}
        }
    }

	componentDidMount() {
        const {duration} = this.props
        const {visible} = this.state
		if (visible && duration > 0) {
			this.handle = setTimeout(()=> {
				this.toggle(false)			
				this.handle = null 
			}, duration * 1000)
		}
	}

    componentWillReceiveProps(nextProps : ITooltipProps) {
        this.toggle(nextProps.visible)
	}

	componentDidUpdate() {
		this.componentDidMount()
	}

	_setStyle(style : Object){
		if (this.handle != null) {
			clearTimeout(this.handle)
			this.handle = null
		}
		this.setState((state, props) => ({style, visible : true}))
	}

    show(){
        this.toggle(true)
    }

    hide(){
        this.toggle(false)
    }

	toggle(visible : boolean){
		if (this.handle != null) {
			clearTimeout(this.handle)
			this.handle = null
		}
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