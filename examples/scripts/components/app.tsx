// import * as classnames from 'classnames';
import "Modal/index.less";
import "Grid/index.less";
import "Tabs/index.less";
import "Tooltip/index.less";
import "Notification/index.less";
import "Loading/index.less";
import "SearchSelector/index.less";
import "Pagination/index.less";


import React = require('react')
import Placeholder from 'Placeholder'
import Document from 'Document'
import Modal from 'Modal'
import {Col,Row} from 'Grid'
import Tabs ,{Tab} from 'Tabs'
import Tooltip,{Trigger} from 'Tooltip'
import Notification from 'Notification'
import Form from 'Form'
import Loading from 'Loading'
import Pagination from 'Pagination'
import SearchSelector,{Option} from 'SearchSelector'
export default class App extends React.Component<any, any> {
	notice2: any
	state : any

	notice : {show : (message? : string,tempShowState? :any)=>void; hide : ()=>void;}
	
	loading:any

	timer:any
	constructor(props : any){
		super(props)
		this.state = {
			value1 : "value control",
			clickPosition : '',
			showModal : false,
			showModal2 : false,
			tabActiveKey : "0",
			options:[],
		}
		this.timer = null
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

	handlerToggleModal2(showModal2 : boolean){
		this.setState({showModal2})
	}

	handlerToggleTab(key : string, event : React.MouseEvent<Element>){
		this.setState({tabActiveKey : key})
		return false
	}

	handlerShowMessage(){
		if(!this.notice){
			this.notice = Notification.getInstance(<Notification>hello notification</Notification>)
		}
		this.notice.show("hello world")
	}
	handlerShowMessage2(){
		if(!this.notice2){
			this.notice2 = Notification.getInstance(<Notification prefix="example" duration={3}>hello notification(5s)</Notification>)
		}
		this.notice2.show("hello world",{x : "right",y:"top",duration :5})
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
	handlerColClick(){
		console.log('col')
	}
	handlerShowLoading(){
		if(!this.loading) {
			this.loading = Loading.getInstance()
		}
		this.loading.show('正在加载中。。。',{duration : 3})	
	}
	handlerShowLoading1(){
		this.loading.show("加载中。。。。",{duration:3})
	}
	handlerHideLoading(){
		this.loading.hide()	
	}
	handlerChangeSearchSelector(value:any){
		console.log(value)

	}
	getOptions(matchValue:any){
		console.log(matchValue)
		if(this.timer != null){
			clearTimeout(this.timer)
			this.timer = null
		}
		this.timer = setTimeout(()=>{
			console.log("searchOptions")
			//调用接口获得options，再setState
			let options =[
				{postcode:"310000",postcodeDec:"杭州邮编-310000"},
				{postcode:"315000",postcodeDec:"宁波邮编-315000"},
				{postcode:"325000",postcodeDec:"温州邮编-325000"},
				{postcode:"314000",postcodeDec:"嘉兴邮编-314000"},
				{postcode:"313000",postcodeDec:"湖州邮编-313000"},
				{postcode:"312000",postcodeDec:"绍兴邮编-312000"},
				{postcode:"321000",postcodeDec:"金华邮编-321000"},
				{postcode:"324000",postcodeDec:"衢州邮编-324000"},
				{postcode:"316000",postcodeDec:"舟山邮编-316000"},
				{postcode:"318000",postcodeDec:"台州邮编-318000"},
				{postcode:"323000",postcodeDec:"丽水邮编-323000"},		
				]
				// debugger
			let options_final:any[]=[]
			options.map((item:any,i:number)=>{
				let item_final ={postcode:'',postcodeDec:""}
				item_final.postcode = item.postcode
				item_final.postcodeDec = item.postcodeDec +new Date().toLocaleTimeString()
				options_final.push(item_final)

			})
			console.log(options_final)
			if(matchValue == ''){
				options_final = []
			}
			this.setState({options:options_final})
		},1000)


	}
	renderOptions(){
		let {options} = this.state
		if(options.length > 0) {
			return	options.map((child:any,i:any)=>{
						return(
							<Option value={child.postcode} key={i}>{child.postcodeDec}</Option>
						)
					})
		}
		return null
	}
	render() {
		let provienceList =[
				{value:"bj",text:"北京"},
				{value:"tj",text:"天津"},
				{value:"sh",text:"上海"},
				{value:"sx",text:"山西"},
				{value:"cq",text:"重庆"},
				{value:"hb",text:"河北"},
				{value:"hn",text:"河南"}								
				]
		let provienceListOptions:any[]= []
		provienceList.map((child,i:number)=>{
				provienceListOptions.push((<Option value={child.value} key={i}>{child.text}</Option>))
		})
		return (
			<div className='app'>
				
				<h1>beyond components for react</h1>
<div>
	<h2>Placeholder( 支持 ie8&ie9 )</h2>
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
	<button onClick={this.handlerToggleModal2.bind(this,true)}>点击弹窗(自定义前缀)</button>

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

	<Modal 
		prefix="example"
		onClose={this.handlerToggleModal2.bind(this,false)} 
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
	<h2>Grids</h2>
<div>

	<Row width={500} style={{marginBottom : '20px'}}>
		<Col key="1" width={100} onClick={this.handlerColClick.bind(this)}>width={100}</Col>
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

	<h4>custom prefix grid</h4>
	<Row prefix="example" verticalGutter={10} gutter={4}>
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
</div>
<h2>Tabs</h2>
<div>
	<h4>受控 Tabs</h4>
	<Tabs activeKey={this.state.tabActiveKey} onChange={this.handlerToggleTab.bind(this)}>
		<Tab title="页面1" key="0">页面1的内容</Tab>
		<Tab title="页面2" key="1">页面2的内容</Tab>
		<Tab title="页面3" key="2">页面3的内容</Tab>
		<Tab title="页面4" key="3">页面4的内容</Tab>
	</Tabs>
</div>
<div>
	<h4>不受控 Tabs</h4>
	<Tabs defaultActiveKey={this.state.tabActiveKey}>
		<Tab title="页面1" key="0">页面1的内容</Tab>
		<Tab title="页面2" key="1">页面2的内容</Tab>
		<Tab   title="页面3" key="2">页面3的内容</Tab>
		<Tab title="页面4" key="3">页面4的内容</Tab>
	</Tabs>
</div>
<div>
	<h4>disabled 页面 2</h4>
	<Tabs defaultActiveKey={this.state.tabActiveKey}>
		<Tab title="页面1" key="0">页面1的内容</Tab>
		<Tab disabled title="页面2" key="1">页面2的内容</Tab>
		<Tab   title="页面3" key="2">页面3的内容</Tab>
		<Tab title="页面4" key="3">页面4的内容</Tab>
	</Tabs>
</div>
<div>
	<h4>自定义前缀</h4>
	<Tabs prefix="example" defaultActiveKey={this.state.tabActiveKey}>
		<Tab title="页面1" key="0">页面1的内容</Tab>
		<Tab title="页面2" key="1">页面2的内容</Tab>
		<Tab  title="页面3" key="2">页面3的内容</Tab>
		<Tab title="页面4" key="3">页面4的内容</Tab>
	</Tabs>
</div>
<h2>tooltip</h2>
<div>
	<Tooltip style={{marginRight : 20}} >hello world</Tooltip>
	<Tooltip style={{marginRight : 20}} placement="left"  >hello world</Tooltip>
	<Tooltip style={{marginRight : 20}} placement="right"  >hello world</Tooltip>
	<Tooltip style={{marginRight : 20}} placement="bottom"  >hello world</Tooltip>

</div>
<div style={{marginTop:30,marginBottom:30}}>
	<Trigger tooltip={<Tooltip placement="top">hello world</Tooltip>}>
		<span onMouseEnter={(e)=> console.log('enter') } onMouseOut={(e)=> console.log('out')} className="tooltip-btn">top</span>
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
<div>
	<h4>自定义前缀 </h4>
	<Tooltip prefix="example" style={{marginRight : 20}} >hello world</Tooltip>
	<Tooltip prefix="example" style={{marginRight : 20}} placement="left">hello world</Tooltip>
	<Tooltip prefix="example" style={{marginRight : 20}} placement="right">hello world</Tooltip>
	<Tooltip prefix="example" style={{marginRight : 20}} placement="bottom">hello world</Tooltip>

</div>
<h2>Notification</h2>
<div>
	<button type="button" onClick={this.handlerShowMessage.bind(this)}>click me to show notification</button>
	<button type="button" onClick={this.handlerShowMessage2.bind(this)}>click me to show custom prefix notification</button>
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
<div>
	<h2>Loading</h2>
	<button type="button" onClick={this.handlerShowLoading.bind(this)}>click me to show loading</button>
	<button type="button" onClick={this.handlerHideLoading.bind(this)}>click me to hide loading</button>
	<button type="button" onClick={this.handlerShowLoading1.bind(this)}>click me to show  other set loading</button>
</div>
<div>
<h2>搜索框和Text合并</h2>
<SearchSelector displaySearchInput placeholder='选择省市' showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
{provienceListOptions}
</SearchSelector>	
</div>				
<div>
<h2>调用函数获得options的内容</h2>
<SearchSelector displaySearchInput placeholder='搜索浙江省内的市' onSearch={this.getOptions.bind(this)} showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
	{this.renderOptions()}
</SearchSelector>	
</div>	

<div>
<h2>带搜索框的下拉框,点击搜索输入框清空</h2>
<SearchSelector placeholder='选择省市' showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)} clickInputEmpty>
<Option value='hlj'>黑龙江</Option>
<Option value='jl'>吉林</Option>
<Option value='ln'>辽宁</Option>
<Option value='hb'>河北</Option>
<Option value='hn'>河南</Option>
<Option value='sd'>山东</Option>
<Option value='js'>江苏</Option>
<Option value='sx1'>山西</Option>
<Option value='sx2'>陕西</Option>
<Option value='gs'>甘肃</Option>
<Option value='sc'>四川</Option>
<Option value='qh'>青海</Option>
<Option value='hb'>湖北</Option>
<Option value='hn'>湖南</Option>
<Option value='jx'>江西</Option>
<Option value='ah'>安徽</Option>
<Option selected value='zj'>浙江</Option>
<Option value='fj'>福建</Option>
<Option value='gd'>广东</Option>
<Option value='gz'>贵州</Option>
<Option value='yn'>云南</Option>
<Option value='hn'>海南</Option>
<Option value='tw'>台湾</Option>						
<Option value='nmg'>内蒙古</Option>
<Option value='xj'>新疆维吾尔族自治区</Option>
<Option value='nx'>宁夏回族自治区</Option>
<Option value='xz'>西藏</Option>
<Option value='gx'>广西</Option>						
<Option value='bj'>北京</Option>
<Option value='th'>天津</Option>
<Option value='sh'>上海</Option>
<Option value='cq'>重庆</Option>
<Option value='xg'>香港</Option>
<Option value='am'>澳门</Option>														
</SearchSelector>
</div>				
<div>
<h2>搜索框和Text合并</h2>
<SearchSelector displaySearchInput placeholder='选择省市' showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
	{provienceListOptions}
</SearchSelector>	
</div>				
<div>
<h2>调用函数获得options的内容</h2>
<SearchSelector displaySearchInput placeholder='搜索浙江省内的市' onSearch={this.getOptions.bind(this)} showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
	{this.renderOptions()}
</SearchSelector>	
</div> 

				<div>
					<h2>带搜索框的下拉框</h2>
					<SearchSelector value='zj' placeholder='选择省市' showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)} >
						<Option value='hlj'>黑龙江</Option>
						<Option value='jl'>吉林</Option>
						<Option value='ln'>辽宁</Option>
						<Option value='hb'>河北</Option>
						<Option value='hn'>河南</Option>
						<Option value='sd'>山东</Option>
						<Option value='js'>江苏</Option>
						<Option value='sx1'>山西</Option>
						<Option value='sx2'>陕西</Option>
						<Option value='gs'>甘肃</Option>
						<Option value='sc'>四川</Option>
						<Option value='qh'>青海</Option>
						<Option value='hb'>湖北</Option>
						<Option value='hn'>湖南</Option>
						<Option value='jx'>江西</Option>
						<Option value='ah'>安徽</Option>
						<Option value='zj'>浙江</Option>
						<Option value='fj'>福建</Option>
						<Option value='gd'>广东</Option>
						<Option value='gz'>贵州</Option>
						<Option value='yn'>云南</Option>
						<Option value='hn'>海南</Option>
						<Option value='tw'>台湾</Option>						
						<Option value='nmg'>内蒙古</Option>
						<Option value='xj'>新疆维吾尔族自治区</Option>
						<Option value='nx'>宁夏回族自治区</Option>
						<Option value='xz'>西藏</Option>
						<Option value='gx'>广西</Option>						
						<Option value='bj'>北京</Option>
						<Option value='th'>天津</Option>
						<Option value='sh'>上海</Option>
						<Option value='cq'>重庆</Option>
						<Option value='xg'>香港</Option>
						<Option value='am'>澳门</Option>	
						<Option value='n1'>南1</Option>
						<Option value='n2'>南2</Option>
						<Option value='n3'>南3</Option>
						<Option value='n4'>南4</Option>
						<Option value='n5'>南5</Option>
					</SearchSelector>
				</div>
			<div>
				<h2>带搜索框的下拉框,点击搜索输入框清空</h2>
			<SearchSelector placeholder='选择省市' showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)} clickInputEmpty>
				<Option value='hlj'>黑龙江</Option>
				<Option value='jl'>吉林</Option>
				<Option value='ln'>辽宁</Option>
				<Option value='hb'>河北</Option>
				<Option value='hn'>河南</Option>
				<Option value='sd'>山东</Option>
				<Option value='js'>江苏</Option>
				<Option value='sx1'>山西</Option>
				<Option value='sx2'>陕西</Option>
				<Option value='gs'>甘肃</Option>
				<Option value='sc'>四川</Option>
				<Option value='qh'>青海</Option>
				<Option value='hb'>湖北</Option>
				<Option value='hn'>湖南</Option>
				<Option value='jx'>江西</Option>
				<Option value='ah'>安徽</Option>
				<Option value='zj'>浙江</Option>
				<Option value='fj'>福建</Option>
				<Option value='gd'>广东</Option>
				<Option value='gz'>贵州</Option>
				<Option value='yn'>云南</Option>
				<Option value='hn'>海南</Option>
				<Option value='tw'>台湾</Option>						
				<Option value='nmg'>内蒙古</Option>
				<Option value='xj'>新疆维吾尔族自治区</Option>
				<Option value='nx'>宁夏回族自治区</Option>
				<Option value='xz'>西藏</Option>
				<Option value='gx'>广西</Option>						
				<Option value='bj'>北京</Option>
				<Option value='th'>天津</Option>
				<Option value='sh'>上海</Option>
				<Option value='cq'>重庆</Option>
				<Option value='xg'>香港</Option>
				<Option value='am'>澳门</Option>														
			</SearchSelector>
			</div>				
			<div>
				<h2>搜索框和Text合并</h2>
				<SearchSelector displaySearchInput placeholder='选择省市' showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
					{provienceListOptions}
				</SearchSelector>	
			</div>	
			<div>
				<h2>搜索框和Text合并,清空</h2>
				<SearchSelector clickInputEmpty displaySearchInput placeholder='选择省市' showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
					{provienceListOptions}
				</SearchSelector>	
			</div>				
				<div>
					<h2>调用函数获得options的内容</h2>
					<SearchSelector displaySearchInput placeholder='搜索浙江省内的市' onSearch={this.getOptions.bind(this)} showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
						{this.renderOptions()}
					</SearchSelector>	
				</div>
				<div>
					<h2>调用函数获得options的内容,清空</h2>
					<SearchSelector clickInputEmpty displaySearchInput placeholder='搜索浙江省内的市' onSearch={this.getOptions.bind(this)} showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
						{this.renderOptions()}
					</SearchSelector>	
				</div>
				<div>
				<h2>调用函数获得options的内容,清空</h2>
				<SearchSelector clickInputEmpty placeholder='搜索浙江省内的市' onSearch={this.getOptions.bind(this)} showMaxCount={4} onChange={this.handlerChangeSearchSelector.bind(this)}>
					{this.renderOptions()}
				</SearchSelector>	
			</div>
				<h2>
					分页
				</h2>
				<div>
					<Pagination active={1} totals={100}  />
				</div>
			</div>
		)
	}
}