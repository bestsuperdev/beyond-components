import ReactCSSTransitionGroup = require('react-addons-css-transition-group')
import React = require('react')
import ReactDOM = require('react-dom')
import Content from './Content'
import Container,{X,Y} from './Container'
import {getNewInstance} from '../Tooltip/tooltipFactory';
import {prefix} from '../consts'

/**
 let n = Notification.getHandle(<Notification visible duration >show</Notification>)
 n.show
 <Notification visible duration >show</Notification>
 */

// type X =  'center' | 'left' | 'right';
// type Y = 'top' | 'middle' | 'bottom';

export interface INotificationProps{
    visible? : boolean;
    duration? : number;
    reverse? : boolean;
    x? : X
    y? : Y;
	extraClassName? : string;
}

export interface INotificationState{
    visible? : boolean;
	message? : string;
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
            visible : props.visible,
			message : ''
        }
        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)
    }


	componentWillReceiveProps(nextProps : INotificationProps) {
		this.setState((state, props) => ({visible : nextProps.visible}));	
	}

	componentDidUpdate(prevProps : INotificationProps, prevState : INotificationState) {
		let {duration} = this.props
		if (duration > 0 && this.state.visible) {
			clearTimeout(this.handle)
			this.handle = setTimeout(this.hide,duration * 1000)
		}
	}

	componentDidMount() {
		let {duration} = this.props
		if (duration > 0 && this.state.visible) {
			this.handle = setTimeout(this.hide,duration * 1000)
		}
	}

    show(message : string=''){
        this.setState((state, props) => ({visible : true,message}))
    }

	hide(){
		this.setState((state, props) => ({visible : false, message : ''}))
	}

	render() {
		let {reverse,children,extraClassName,x,y} = this.props
		let {message} = this.state
		const child = this.state.visible ? (<Content extraClassName={extraClassName} reverse={reverse}>{message || children}</Content>) : null 
		return (
			<Container x={x} y={y}>
				<ReactCSSTransitionGroup transitionName={`${prefix}notification-animation`} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{child}
				</ReactCSSTransitionGroup>
			</Container>
		)
	}
}