import React = require('react')
// import Test = require('src/index.js')
import Placeholder = require('Placeholder')
import Document = require('Document')

import "Modal/index.less";
import Modal = require('Modal')
// const Document = require('src/Document')

// const Placeholder = (props : any)=> <div></div>

class App extends React.Component<any,any> {

	state : any;

	constructor(props : any){
		super(props)
		this.state = {
			value1 : "value control",
			clickPosition : '',
			showModal : false
		}
	}

	handlerChange(event : React.KeyboardEvent<HTMLInputElement>){
		let value1 = (event.target as HTMLInputElement).value
		this.setState((state, props) => ({value1}))
	}

	handlerShowClickPosition(clickPosition : string){
		console.log(clickPosition)
		this.setState({clickPosition})
	}

	handlerToggleModal(showModal : boolean){
		this.setState({showModal})
	}

	render() {
		return (
			<div className='app'>
				<h1>beyond components for react</h1>
				<div>
					<h3>Placeholder(支持 ie8&ie9)</h3>
					<div>

						<Placeholder>
							 <input autoComplete="off"  type="text" placeholder="请输入名称" style={{fontSize : 12,height : 20}}/>
						</Placeholder>
						<br/>
						<Placeholder>
							<input autoComplete="off" defaultValue="hava default value"  type="text" placeholder="请输入名称" style={{fontSize : 12,height : 20}}/>
						</Placeholder>
						<br/>
						<Placeholder>
							<input autoComplete="off" value={this.state.value1} onChange={this.handlerChange.bind(this)}  type="text" placeholder="请输入名称" style={{fontSize : 12,height : 20}}/>
						</Placeholder>
						<br/>
						<Placeholder>
							<input autoComplete="off" type="password" placeholder="请输入密码" style={{fontSize : 12,height : 20}}/>
						</Placeholder>
					</div>
					<div>
						<Placeholder>
							<textarea placeholder="请输入文本" cols={30} rows={10}></textarea>
						</Placeholder>
					</div>
				</div>

				<div>
					<h3>Document</h3>
					<div>
						<Document onClick={this.handlerShowClickPosition.bind(this,'out')}>
							<div onClick={this.handlerShowClickPosition.bind(this,'inner')} style={{border : '1px solid black'}}>
								in the document11(click position : {this.state.clickPosition})
								<button type="button" onClick={this.handlerShowClickPosition.bind(this,'inner')}>click me</button>
							</div>
						</Document>
					</div>
				</div>

				<div>
					<h3>Modal</h3>
					<button onClick={this.handlerToggleModal.bind(this,true)}>点击弹窗</button>
					<Modal onClose={this.handlerToggleModal.bind(this,false)} title="this is modal title" maxWidth="60%" bodyHeight="700px" visible={this.state.showModal} footer={<div>this is footer</div>} mask={true}>
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
			</div>
		)
	}
}

export = App