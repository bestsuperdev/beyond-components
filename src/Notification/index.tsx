import Content = require('./Content')
import Container = require('./Container')


/**
 
 <Notification visible duration >show</Notification>
 */
import ReactCSSTransitionGroup = require('react-addons-css-transition-group')
import React = require('react')

type X =  'center' | 'left' | 'right';
type Y = 'top' | 'middle' | 'bottom';

interface INotificationProps{
    visible? : boolean;
    duration? : number;
    reverse? : boolean;
    x? : X;
    y? : Y;
}

interface INotificationState{
    visible : boolean;
}


class Notification extends React.Component<INotificationProps,INotificationState> {

    static defaultProps : INotificationProps = {
        duration : 2,
        visible : false,
        reverse : false
    }

    static state : INotificationState

    handle : number

    constructor(props : INotificationProps){
        super(props)
        this.state = {
            visible : props.visible
        }
        this.hide = this.hide.bind(this)
        this.show = this.show.bind(this)
    }


	componentWillReceiveProps(nextProps : INotificationProps) {
		this.setState((state, props) => ({visible : nextProps.visible}));	
	}

	componentDidUpdate(prevProps : INotificationProps, prevState : INotificationState) {
		if (this.props.duration > 0 && this.state.visible) {
			clearTimeout(this.handle)
			this.handle = setTimeout(this.hide,this.props.duration * 1000)
		}
	}

	componentDidMount() {
		if (this.props.duration > 0 && this.state.visible) {
			this.handle = setTimeout(this.hide,this.props.duration * 1000)
		}
	}

    show(){
        this.setState((state, props) => ({visible : true}))
    }

	hide(){
		this.setState((state, props) => ({visible : false}))
	}

	render() {
		const child = this.state.visible ? (<Content reverse={this.props.reverse}>{this.props.children}</Content>) : null 
		return (
			<Container x={this.props.x} y={this.props.y}>
				<ReactCSSTransitionGroup transitionName="notification-animation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{child}
				</ReactCSSTransitionGroup>
			</Container>
		)
	}
}

export = Notification