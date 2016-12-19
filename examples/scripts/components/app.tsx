import React = require('react')
// import Test = require('src/index.js')
import Placeholder = require('Placeholder')
import Document = require('Document')

import "Modal/index.less";
import Modal = require('Modal')

import "Grid/index.less";
import Col = require('Grid/Col')
import Row = require('Grid/Row')
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
				<div className='app'>

					<Row  width={500} style={{marginBottom : '20px'}}>
						<Col key="1" width={100}>width={100}</Col>
						<Col key="2" width={300}>width={300}</Col>
						<Col key="3" width={100}>width={100}</Col>
					</Row>

					<Row width={500} style={{marginBottom : '20px'}}>
						<Col key="1" width={100} offsetWidth={300}>width={100} offsetWidth={300}</Col>
						<Col key="2" width={100}>width={100}</Col>
					</Row>

					<h2>default 12 grids</h2>
					<Row style={{marginBottom : '20px'}}>
						<Col key="1" col={12}>12</Col>
					</Row>

					<Row style={{marginBottom : '20px'}}>
						<Col key="1" col={6}>6</Col>
						<Col key="2" col={6}>6</Col>
					</Row>

					<Row gutter={10} style={{marginBottom : '20px'}}>
						<Col key="1" col={4}>4(gutter 10)</Col>
						<Col key="2" col={4}>4(gutter 10)</Col>
						<Col key="3" col={4}>4(gutter 10)</Col>
					</Row>

					<Row verticalGutter={10} gutter={4}>
						<Col key="1" col={1}>1</Col>
						<Col key="2" col={1}>1</Col>
						<Col key="3" col={1}>1</Col>
						<Col key="4" col={1}>1</Col>
						<Col key="5" col={1}>1</Col>
						<Col key="6" col={1}>1</Col>
						<Col key="7" col={1}>1</Col>
						<Col key="8" col={1}>1</Col>
						<Col key="9" col={1}>1</Col>
						<Col key="10" col={1}>1</Col>
						<Col key="11" col={1}>1</Col>
						<Col key="12" col={1}>1</Col>
					</Row>

					<h2>set 24 grids</h2>
					<Row grids={24} verticalGutter={10} gutter={4}>
						<Col key="1" col={1}>1</Col>
						<Col key="2" col={1}>1</Col>
						<Col key="3" col={1}>1</Col>
						<Col key="4" col={1}>1</Col>
						<Col key="5" col={1}>1</Col>
						<Col key="6" col={1}>1</Col>
						<Col key="7" col={1}>1</Col>
						<Col key="8" col={1}>1</Col>
						<Col key="9" col={1}>1</Col>
						<Col key="10" col={1}>1</Col>
						<Col key="11" col={1}>1</Col>
						<Col key="12" col={1}>1</Col>
						<Col key="13" col={1}>1</Col>
						<Col key="14" col={1}>1</Col>
						<Col key="15" col={1}>1</Col>
						<Col key="16" col={1}>1</Col>
						<Col key="17" col={1}>1</Col>
						<Col key="18" col={1}>1</Col>
						<Col key="19" col={1}>1</Col>
						<Col key="20" col={1}>1</Col>
						<Col key="21" col={1}>1</Col>
						<Col key="22" col={1}>1</Col>
						<Col key="23" col={1}>1</Col>
						<Col key="24" col={1}>1</Col>
					</Row>

					<Row grids={2} >
						<Col key="1" col={1}>12</Col>
						<Col key="2" col={1}>12</Col>
					</Row>

					<h2>verticalGutter={10} gutter={4}</h2>
					<Row verticalGutter={10} gutter={4}>
						<Col key="1" col={2} offsetCol={8}>2(colOffset 8)</Col>
						<Col key="2" col={2}>2</Col>
					</Row>
				</div>
					
			</div>
		)
	}
}

export = App