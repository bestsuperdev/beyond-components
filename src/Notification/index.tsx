/*
	let notice = Notification.getInstance(<Notification />)
	notice.show("hello world",{duration : 3})

	<Notification ref={(n)=> this.n = n } >hello notification</Notification>
	this.n.show()
 */

import React = require('react')
import ReactDOM = require('react-dom')
import Content from './Content'
import Container, { X, Y } from './Container'
import { prefix, IBaseProps } from '../consts'
import classnames = require('classnames')
import assign = require('beyond-lib/lib/assign')


export enum States {
	none,
	entering,
	entered,
	leaveing,
	leaved
}

const getAnimationClassName = (_prefix: string, state: States) => {
	_prefix = `${_prefix}notification`
	let states = {
		[States.none]: '',
		[States.entering]: `${_prefix}-animation-entering`,
		[States.entered]: `${_prefix}-animation-entering ${_prefix}-animation-entered`,
		[States.leaveing]: `${_prefix}-animation-leaving`,
		[States.leaved]: `${_prefix}-animation-leaving ${_prefix}-animation-leaved`
	}
	return states[state]
}

export interface INotificationShowState {
	duration?: number;
	reverse?: boolean;
	x?: X;
	y?: Y;
}

export interface INotificationState {
	message?: string;
	state?: States;
	showState?: INotificationShowState;
}

export interface INotificationProps extends INotificationShowState, IBaseProps {
}

export default class Notification extends React.Component<INotificationProps, INotificationState> {

	static defaultProps: INotificationProps = {
		duration: 2,
		reverse: false,
		prefix
	}

	static state: INotificationState

	static getInstance(notification: JSX.Element) {
		if (notification) {
			let wrap = document.createElement('div')
			document.body.appendChild(wrap)
			let handle = ReactDOM.render(notification, wrap) as Notification
			return {
				show(message?: string, showState?: INotificationShowState) {
					handle.show(message, showState)
				},

				hide() {
					handle.hide()
				}
			}
		}
	}

	handle: any

	constructor(props: INotificationProps) {
		super(props)
		this.state = {
			message: '',
			state: States.none,
			showState: null
		}
		this.hide = this.hide.bind(this)
		this.show = this.show.bind(this)
	}

	componentDidUpdate() {
		let { state, showState } = this.state
		let duration = showState && showState.duration != null ? showState.duration : this.props.duration

		clearTimeout(this.handle)
		if (state === States.entering) {
			this.handle = setTimeout(() => {
				this.setState({ state: States.entered })
			}, 0)
		} else if (state === States.entered && duration > 0) {
			this.handle = setTimeout(() => {
				this.setState({ state: States.leaveing })
			}, (duration + 0.3) * 1000)
		} else if (state === States.leaveing) {
			this.setState({ state: States.leaved })
		} else if (state === States.leaved) {
			this.handle = setTimeout(() => {
				this.setState({ state: States.none, showState: null })
			}, 300)
		}
	}

	componentDidMount() {
		let { state } = this.state
		if (state === States.entering) {
			setTimeout(() => {
				this.setState({ state: States.entered })
			}, 0)
		}
	}

	show(message = '', showState?: INotificationShowState) {
		let { state } = this.state
		if (showState != null) {
			showState = assign({}, showState)
		}

		let duration = showState && showState.duration != null ? showState.duration : this.props.duration

		clearTimeout(this.handle)

		if (state === States.none) {
			this.setState({ message, state: States.entering, showState })
		} else if (state === States.entering || (state === States.entered && duration > 0)) {
			this.setState({ message })
		} else if (state === States.leaveing) {
			this.setState({ message, state: States.entered, showState })
		} else if (state === States.leaved) {
			setTimeout(() => {
				this.setState({ message, state: States.entering, showState })
			}, 300)
		}
	}

	hide() {
		let { state } = this.state
		if (state !== States.none && state !== States.leaved && state !== States.leaveing) {
			clearTimeout(this.handle)
			this.setState({ state: States.leaveing })
		}
	}

	render() {
		let { reverse, children, extraClassName, x, y, style, prefix : _prefix } = this.props
		let { showState, message, state } = this.state
		if (showState != null) {
			x = showState.x || x
			y = showState.y || y
			reverse = showState.reverse != null ? showState.reverse : reverse
		}
		let child: JSX.Element = null
		if (state !== States.none) {
			let className = classnames(getAnimationClassName(_prefix, state), extraClassName)
			child = (
				<Content prefix={_prefix} style={style} extraClassName={className} reverse={reverse}>
					{message || children}
				</Content>
			)
		}
		return (
			<Container prefix={_prefix} x={x} y={y}>{child}</Container>
		)
	}
}