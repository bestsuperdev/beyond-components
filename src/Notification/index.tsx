import React = require('react')
import ReactDOM = require('react-dom')
import Content from './Content'
import Container,{X,Y} from './Container'
import {getNewInstance} from '../Tooltip/tooltipFactory';
import { prefix, IBaseProps } from '../consts'
import classnames = require('classnames')

const nprefix = `${prefix}notification`

export enum States {
	none,
	entering,
	entered,
	leaveing,
	leaved
}


const getAnimationClassName = (prefix : string, state : States)=>{
	prefix = `${prefix}notification`
	let states = {
		[States.none] : '',
		[States.entering] : `${prefix}-animation-entering`, 
		[States.entered] : `${prefix}-animation-entering ${prefix}-animation-entered`, 
		[States.leaveing] : `${prefix}-animation-leaving`, 
		[States.leaved] : `${prefix}-animation-leaving ${prefix}-animation-leaved`
	}
	return states[state]
}



export interface INotificationProps  extends IBaseProps<HTMLDivElement>{
    visible? : boolean;
    duration? : number;
    reverse? : boolean;
    x? : X
    y? : Y;
	style? : object;
}

export interface INotificationShowState{
    duration? : number;
    reverse? : boolean;
    x? : X
    y? : Y;
	// style? : object;	
}

export interface INotificationState{
	message? : string;
	state? : States;
	// isMounted : boolean;
	showState? :INotificationShowState
	
}


export default class Notification extends React.Component<INotificationProps,INotificationState> {

    static defaultProps : INotificationProps = {
        duration : 2,
        visible : false,
        reverse : false,
		prefix  : prefix	
    }

    static state : INotificationState


	static getInstance(notification : JSX.Element){
		if(notification){
			let wrap = document.createElement('div')
			document.body.appendChild(wrap)
			let handle = ReactDOM.render(notification,wrap) as Notification
			return {
				show(message? : string,tempShowState? :INotificationShowState){
					handle.show(message,tempShowState)
				},

				hide(){	
					handle.hide()
				}
			}
		}
	}

    handle : number

    constructor(props : INotificationProps){
        super(props)
        this.state = {
			message : '',
			state : props.visible ? States.entering : States.none,
			showState:null
        }
        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)
    }


	componentWillReceiveProps(nextProps : INotificationProps) {
		let {visible} = nextProps
		if(visible){
			this.show()
		}else{
			this.hide()
		}
	}

	componentDidUpdate(prevProps : INotificationProps, prevState : INotificationState) {
		let {duration,visible} = this.props
		let {state} = this.state

		let showState:any
		let tempShowState = this.state.showState
		if(tempShowState !=null){
			showState = tempShowState
			if(showState.duration != undefined){
				duration = showState.duration
			}			
		}else{
			showState = null
		}

		clearTimeout(this.handle)
		if(state === States.entering){
			this.handle = setTimeout(()=>{
				this.setState({state : States.entered,showState})
			},0)
		}else if (duration > 0 && state === States.entered) {
			this.handle = setTimeout(()=>{
				this.setState({state : States.leaveing,showState})
			},(duration+0.3) * 1000)
		}else if(state === States.leaveing){
			this.setState({state : States.leaved,showState})
		}else if(state === States.leaved){
			this.handle = setTimeout(()=>{
				this.setState({state : States.none,showState})
			} , 300);
		}
	}

	componentDidMount() {
		let {state} = this.state
		if(state === States.entering){
			setTimeout(()=>{
				this.setState({state : States.entered})
			}, 0);
		}
	}

    show(message='',tempShowState? :INotificationShowState){
		let {state} = this.state
		let {duration} = this.props
		// let {duration,reverse,x,y} = tempShowState
		let showState:any
		if(tempShowState !=null){
			showState = tempShowState
			if(showState.duration != undefined){
				duration = showState.duration
			}			
		}else{
			showState = null
		}

		clearTimeout(this.handle)

		if(state === States.none){
			this.setState({message,state : States.entering,showState})
		}else if(state === States.entering || (state === States.entered && duration > 0)){
			this.setState({message})
		}else if(state === States.leaveing){
			this.setState({message,state : States.entered,showState})
		}else if(state === States.leaved){
			setTimeout(()=>{
				this.setState({message,state : States.entering,showState})
			},300)
		}
    }

	hide(){
		let {state} = this.state
		if(state !== States.none && state !== States.leaved && state !== States.leaveing){
			clearTimeout(this.handle)
			this.setState({state : States.leaveing})
		}
	}

	render() {
		let {reverse,children,extraClassName,x,y,style,prefix} = this.props
		if(this.state.showState != null){
			x = this.state.showState.x
			y = this.state.showState.y
			reverse = this.state.showState.reverse
		}
		let {message,state} = this.state
		let child : JSX.Element = null
		if(state !== States.none){
			let className = classnames(getAnimationClassName(prefix,state),extraClassName) 
			child = <Content prefix={prefix} style={style} extraClassName={className} reverse={reverse}>{message || children}</Content>
		}
		return (
			<Container prefix={prefix} x={x} y={y}>{child}</Container>
		)
	}
}