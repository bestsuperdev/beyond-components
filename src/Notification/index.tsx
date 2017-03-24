import React = require('react')
import ReactDOM = require('react-dom')
import Content from './Content'
import Container,{X,Y} from './Container'
import {getNewInstance} from '../Tooltip/tooltipFactory';
import {prefix} from '../consts'
import classnames = require('classnames')

const nprefix = `${prefix}notification`

export enum States {
	none,
	entering,
	entered,
	leaveing,
	leaved
}


const contentClassNames = {
	[States.none] : '',
	[States.entering] : `${nprefix}-animation-entering`, 
	[States.entered] : `${nprefix}-animation-entering ${nprefix}-animation-entered`, 
	[States.leaveing] : `${nprefix}-animation-leaving`, 
	[States.leaved] : `${nprefix}-animation-leaving ${nprefix}-animation-leaved`
}

export interface INotificationProps{
    visible? : boolean;
    duration? : number;
    reverse? : boolean;
    x? : X
    y? : Y;
	extraClassName? : string;
	style? : object;
}

export interface INotificationState{
	message? : string;
	state? : States;
	// isMounted : boolean;
}


export default class Notification extends React.Component<INotificationProps,INotificationState> {

    static defaultProps : INotificationProps = {
        duration : 2,
        visible : false,
        reverse : false
    }

    static state : INotificationState


	static getInstance(notification : JSX.Element){
		if(notification){
			let wrap = document.createElement('div')
			document.body.appendChild(wrap)
			let handle = ReactDOM.render(notification,wrap) as Notification
			return {
				show(message? : string){
					handle.show(message)
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
			state : props.visible ? States.entering : States.none
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
		clearTimeout(this.handle)
		if(state === States.entering){
			this.handle = setTimeout(()=>{
				this.setState({state : States.entered})
			},0)
		}else if (duration > 0 && state === States.entered) {
			this.handle = setTimeout(()=>{
				this.setState({state : States.leaveing})
			},(duration+0.3) * 1000)
		}else if(state === States.leaveing){
			this.setState({state : States.leaved})
		}else if(state === States.leaved){
			this.handle = setTimeout(()=>{
				this.setState({state : States.none})
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

    show(message=''){
		let {state} = this.state
		let {duration} = this.props
		clearTimeout(this.handle)

		if(state === States.none){
			this.setState({message,state : States.entering})
		}else if(state === States.entering || (state === States.entered && duration > 0)){
			this.setState({message})
		}else if(state === States.leaveing){
			this.setState({message,state : States.entered})
		}else if(state === States.leaved){
			setTimeout(()=>{
				this.setState({message,state : States.entering})
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
		let {reverse,children,extraClassName,x,y,style} = this.props
		let {message,state} = this.state
		let child : JSX.Element = null
		if(state !== States.none){
			let className = classnames(extraClassName,contentClassNames[state]) 
			child = <Content style={style} extraClassName={className} reverse={reverse}>{message || children}</Content>
		}
		return (
			<Container x={x} y={y}>{child}</Container>
		)
	}
}