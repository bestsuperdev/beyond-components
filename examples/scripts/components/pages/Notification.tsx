import * as React from 'react'
import Notification from 'Notification'
import 'Notification/index.less'
export default class NotificationPage extends React.Component<any, any> {

	notice : any
	notice2 : any

	constructor(props: any) {
		super(props)
	}

	handlerShowMessage() {
		if (!this.notice) {
			this.notice = Notification.getInstance(<Notification>hello notification</Notification>)
		}
		this.notice.show('hello world')
	}
	handlerShowMessage2() {
		if (!this.notice2) {
			let noticejsx = <Notification prefix="example" duration={3}>hello notification(5s)</Notification>
			this.notice2 = Notification.getInstance(noticejsx)
		}
		this.notice2.show('hello world', { x: 'right', y: 'top', duration: 5 })
	}

	render(): JSX.Element {
		return (
			<div className="page">
				<h2>Notification</h2>
				<div>
					<button type="button" onClick={this.handlerShowMessage.bind(this)}>
						click me to show notification
					</button>
					<button type="button" onClick={this.handlerShowMessage2.bind(this)}>
						click me to show custom prefix notification
					</button>
				</div>
			</div>
		)
	}
}