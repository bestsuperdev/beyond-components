import * as classnames from 'classnames';
import "Modal/index.less";
import "Grid/index.less";
import "Tabs/index.less";
import "Tooltip/index.less";
import "Notification/index.less";
import React = require('react')
import Placeholder from 'Placeholder'
import Document from 'Document'
import Modal from 'Modal'
import {Col,Row} from 'Grid'
import Tabs ,{Tab} from 'Tabs'
import Tooltip,{Trigger} from 'Tooltip'
import Notification from 'Notification'
import Form from 'Form'
// import {Content,Notification} from 'Notification'

class App extends React.Component<any,any> {

	state : any;

	notice : {show : (message? : string)=>void; hide : ()=>void;}

	constructor(props : any){
		super(props)
		this.state = {
			value1 : "value control",
			clickPosition : '',
			showModal : false,
			tabActiveKey : "0"
		}
	}

	componentDidMount(){
		
		let wrap = document.createElement('div')
		
		let h2s  = Array.prototype.slice.call(document.querySelectorAll('h2'),0) as Array<HTMLHeadingElement>
		h2s.forEach((h2,i)=>{
			h2.id = i + ''
			let a = document.createElement('a')
			a.innerHTML = h2.innerHTML
			a.href = `#${i}`
			a.style.display = 'block'
			wrap.appendChild(a)
		})
		wrap.style.position = 'fixed'
		wrap.style.right = '0px'
		wrap.style.top = '0px'
		wrap.style.background = 'white'
		document.body.appendChild(wrap)
	}

	handlerChange(event : React.KeyboardEvent<HTMLInputElement>){
		let value1 = (event.target as HTMLInputElement).value
		this.setState((state, props) => ({value1}))
	}

	handlerShowClickPosition(clickPosition : string){
		this.setState({clickPosition})
	}

	handlerToggleModal(showModal : boolean){
		this.setState({showModal})
	}

	handlerToggleTab(key : string, event : React.MouseEvent<Element>){
		this.setState({tabActiveKey : key})
	}

	handlerShowMessage(){
		if(!this.notice){
			this.notice = Notification.getInstance(<Notification duration={3}>hello notification</Notification>)
		}
		this.notice.show()
	}

	handlerSubmit(event : React.FormEvent<any>){
		// event.preventDefault()

	}

	handlerFormSuccess(res : any){
		this.notice.show(res)
		console.log('success')
		console.log(res)
	}
	handlerFormError(res : any){
		console.log('error')
		console.log(res)
	}
	handlerFormComplete(res : any){
		console.log('complete')
		console.log(res)
		
	}

	render() {
		let a = <div></div>
		let b = <Tooltip></Tooltip>
		return (
			<div className='app'>
				<h1>beyond components for react</h1>
				<div>
					<h2>Placeholder(支持 ie8&ie9)</h2>
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
					<h2>Document</h2>
					<div>
						<Document onClick={this.handlerShowClickPosition.bind(this,'out')}>
							<div onClick={this.handlerShowClickPosition.bind(this,'inner')} style={{border : '1px solid black'}}>
								in the document(click source from : {this.state.clickPosition})
								<button type="button" onClick={this.handlerShowClickPosition.bind(this,'inner')}>click me</button>
							</div>
						</Document>
					</div>
				</div>

				<div>
					<h2>Modal</h2>
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
					<h2>Grids</h2>
				<div>

					<Row width={500} style={{marginBottom : '20px'}}>
						<Col key="1" width={100}>width={100}</Col>
						<Col key="2" width={300}>width={300}</Col>
						<Col key="3" width={100}>width={100}</Col>
					</Row>

					<Row width={500} style={{marginBottom : '20px'}}>
						<Col key="1" width={100} offsetWidth={300}>width={100} offsetWidth={300}</Col>
						<Col key="2" width={100}>width={100}</Col>
					</Row>

					<h4>default 12 grids</h4>
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

					<h4>set 24 grids</h4>
					<Row  grids={24} verticalGutter={10} gutter={4}>
						<Col key="1"  col={1}>1</Col>
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

					<h4>verticalGutter={10} gutter={4}</h4>
					<Row verticalGutter={10} gutter={4}>
						<Col key="1" col={2} offsetCol={8}>2(colOffset 8)</Col>
						<Col key="2" col={2}>2</Col>
					</Row>
				</div>
				<h2>Tabs</h2>
				<div>
					<h4>受控 Tabs</h4>
					<Tabs activeKey={this.state.tabActiveKey} onChange={this.handlerToggleTab.bind(this)}>
						<Tab title="页面1" key="0">页面1的内容</Tab>
						<Tab navExtraClassName="red" paneExtraClassName="red" title="页面2" key="1">页面2的内容</Tab>
						<Tab title="页面3" key="2">页面3的内容</Tab>
						<Tab title="页面4" key="3">页面4的内容</Tab>
					</Tabs>
				</div>
				<div>
					<h4>不受控 Tabs</h4>
					<Tabs defaultActiveKey={this.state.tabActiveKey}>
						<Tab title="页面1" key="0">页面1的内容</Tab>
						<Tab title="页面2" key="1">页面2的内容</Tab>
						<Tab navExtraClassName="red" paneExtraClassName="red" title="页面3" key="2">页面3的内容</Tab>
						<Tab title="页面4" key="3">页面4的内容</Tab>
					</Tabs>
				</div>
				<div>
					<h4>disabled 页面 2</h4>
					<Tabs defaultActiveKey={this.state.tabActiveKey}>
						<Tab title="页面1" key="0">页面1的内容</Tab>
						<Tab disabled title="页面2" key="1">页面2的内容</Tab>
						<Tab navExtraClassName="red" paneExtraClassName="red" title="页面3" key="2">页面3的内容</Tab>
						<Tab title="页面4" key="3">页面4的内容</Tab>
					</Tabs>
				</div>
				<h2>tooltip</h2>
				<div>
					<Tooltip style={{marginRight : 20}} visible duration={0}>hello world</Tooltip>
					<Tooltip style={{marginRight : 20}} placement="left" visible duration={0}>hello world</Tooltip>
					<Tooltip style={{marginRight : 20}} placement="right" visible duration={0}>hello world</Tooltip>
					<Tooltip style={{marginRight : 20}} placement="bottom" visible duration={0}>hello world</Tooltip>
	
				</div>
				<div style={{marginTop:30,marginBottom:30}}>
					<Trigger tooltip={<Tooltip placement="top">hello world</Tooltip>}>
						<span className="tooltip-btn">top</span>
					</Trigger>
					<Trigger tooltip={<Tooltip placement="bottom">hello world</Tooltip>}>
						<span className="tooltip-btn">bottom</span>
					</Trigger>
					<Trigger tooltip={<Tooltip placement="left">hello world</Tooltip>}>
						<span className="tooltip-btn">left</span>
					</Trigger>
					<Trigger tooltip={<Tooltip placement="right">hello world</Tooltip>}>
						<span className="tooltip-btn">right</span>
					</Trigger>
				</div>

				<h2>Notification</h2>
				<div>
					<button type="button" onClick={this.handlerShowMessage.bind(this)}>click me to show notification</button>
				</div>

				<h2>Form</h2>
				<div>
					<Form action="/test/test.js" onSubmit={this.handlerSubmit.bind(this)} 
						onSuccess={this.handlerFormSuccess.bind(this)}  
						onError={this.handlerFormError.bind(this)}  
						onComplete={this.handlerFormComplete.bind(this)}  
					>
						<input type="file"/>
						<button type="submit">submit</button>
					</Form>
				</div>
			</div>
		)
	}
}

export = App