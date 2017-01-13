import React = require('react')
import assign = require('beyond-lib/lib/assign')
import classnames = require('classnames')
export interface ITooltipProps{
    visible? : boolean;
    duration? : number;
    placement? : 'top' | 'bottom' | 'left' | 'right';
    style? : Object;
    extraClassName? : string;
    className? : string;
}

export interface ITooltipState{
    visible? : boolean;
    style? : Object;
}


export default class Tooltip  extends React.Component<ITooltipProps,ITooltipState>{

    static defaultProps : ITooltipProps = {
        className : 'tooltip',
        visible : false,
        duration : 3,
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
        let {className,extraClassName,placement} = this.props
		let style = assign({},this.props.style,this.state.style)
		
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
            <div  {...this.props} className={classnames(className,`${className}-${placement}`,extraClassName)} style={style} >
                <div className={`${className}-content`}>
                    {this.props.children}
                </div>
                <div className={`${className}-triangle`}></div>
            </div>

        )
	}
}