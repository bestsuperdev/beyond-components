import * as React from 'react'
import Modal from 'Modal'
import 'Modal/index.less'
export default class ModalPage extends React.Component<any, any> {

	constructor(props: any) {
		super(props)
		this.state = {
			showModal : false,
			showModal2 : false
		}
	}

	handlerToggleModal(field : string, value : boolean){
		this.setState({[field] : value})
	}

	render(): JSX.Element {
		return (
			<div className="page">
				<h2>Modal</h2>
				<button onClick={this.handlerToggleModal.bind(this,'showModal', true)}>点击弹窗</button>
				<button onClick={this.handlerToggleModal.bind(this,'showModal2', true)}>点击弹窗(自定义前缀)</button>

				<Modal
					onClose={this.handlerToggleModal.bind(this,'showModal', false)}
					title="this is modal title"
					maxWidth="60%"
					bodyHeight="700px"
					visible={this.state.showModal}
					footer={<div>this is footer</div>}
					mask={true}>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
				</Modal>

				<Modal
					prefix="example"
					onClose={this.handlerToggleModal.bind(this,'showModal2', false)}
					title="this is custom prefix modal title11111"
					maxWidth="70%"
					bodyHeight="700px"
					visible={this.state.showModal2}
					footer={<div>this is footer</div>}
					mask={true}>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
					<p>this is modal content</p>
				</Modal>
			</div>
		)
	}
}