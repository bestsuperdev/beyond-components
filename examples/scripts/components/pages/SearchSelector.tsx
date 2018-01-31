import * as React from 'react'
import SearchSelector from 'SearchSelector'
import 'SearchSelector/index.less'

export default class SearchSelectorPage extends React.Component<any, any> {

	timer : any

	constructor(props: any) {
		super(props)
		this.state = {
			searchSelectValue:'',
			searchSelectValue1:''
		}
	}

	handlerChangeSearchSelector(obj: any) {

		// this.setState({searchSelectValue:'hn1'})
		this.setState({ searchSelectValue: obj.value })
		return false

	}
	handlerChangeSearchSelector1(obj: any) {

		// this.setState({searchSelectValue:'hn1'})
		this.setState({ searchSelectValue1: obj.value })
		return false
	}

	getOptions(matchValue:any){
		console.log(matchValue)
		if(this.timer != null){
			clearTimeout(this.timer)
			this.timer = null
		}
		this.timer = setTimeout(()=>{
			console.log('searchOptions')
			// 调用接口获得options，再setState
			let options =[
				{postcode:'310000',postcodeDec:'杭州邮编-310000'},
				{postcode:'315000',postcodeDec:'宁波邮编-315000'},
				{postcode:'325000',postcodeDec:'温州邮编-325000'},
				{postcode:'314000',postcodeDec:'嘉兴邮编-314000'},
				{postcode:'313000',postcodeDec:'湖州邮编-313000'},
				{postcode:'312000',postcodeDec:'绍兴邮编-312000'},
				{postcode:'321000',postcodeDec:'金华邮编-321000'},
				{postcode:'324000',postcodeDec:'衢州邮编-324000'},
				{postcode:'316000',postcodeDec:'舟山邮编-316000'},
				{postcode:'318000',postcodeDec:'台州邮编-318000'},
				{postcode:'323000',postcodeDec:'丽水邮编-323000'}		
				]
			// tslint:disable-next-line:variable-name
			let options_final:any[]=[]
			options.map((item:any,i:number)=>{
				// tslint:disable-next-line:variable-name
				let item_final ={value:'',text:''}
				item_final.value = item.postcode
				item_final.text = item.postcodeDec +new Date().toLocaleTimeString()
				options_final.push(item_final)

			})
			console.log(options_final)
			if(matchValue === ''){
				options_final = []
			}
			this.setState({options:options_final})
		},1000)


	}

	render(): JSX.Element {
		let provienceList = [
			{ value: 'hlj', text: '黑龙江' },
			{ value: 'jl', text: '吉林' },
			{ value: 'ln', text: '辽宁' },
			{ value: 'hb1', text: '河北' },
			{ value: 'hn1', text: '河南' },
			{ value: 'sd', text: '山东' },
			{ value: 'js', text: '江苏' },
			{ value: 'sx1', text: '山西' },
			{ value: 'sx2', text: '陕西' },
			{ value: 'gs', text: '甘肃' },
			{ value: 'sc', text: '四川' },
			{ value: 'qh', text: '青海' },
			{ value: 'hb2', text: '湖北' },
			{ value: 'hn2', text: '湖南' },
			{ value: 'jx', text: '江西' },
			{ value: 'ah', text: '安徽' },
			{ value: 'zj', text: '浙江' },
			{ value: 'fj', text: '福建' },
			{ value: 'gd', text: '广东' },
			{ value: 'gz', text: '贵州' },
			{ value: 'yn', text: '云南' },
			{ value: 'hn3', text: '海南' },
			{ value: 'tw', text: '台湾' },
			{ value: 'nmg', text: '内蒙古' },
			{ value: 'xj', text: '新疆维吾尔族自治区' },
			{ value: 'nx', text: '宁夏回族自治区' },
			{ value: 'xz', text: '西藏' },
			{ value: 'gx', text: '广西' },
			{ value: 'bj', text: '北京' },
			{ value: 'tj', text: '天津' },
			{ value: 'sh', text: '上海' },
			{ value: 'cq', text: '重庆' },
			{ value: 'xg', text: '香港' },
			{ value: 'am', text: '澳门' },
			{ value: 'n1', text: '南1' },
			{ value: 'n2', text: '南2' },
			{ value: 'n3', text: '南3' },
			{ value: 'n4', text: '南4' },
			{ value: 'n5', text: '南5' }
		]
		return (
			<div className="page">
				<h2>SearchSelector</h2>
				<div>
					<h4>带搜索框的下拉框，受控</h4>
					<SearchSelector placeholder="选择省市" showMaxCount={4} value={this.state.searchSelectValue}
						onChange={this.handlerChangeSearchSelector.bind(this)} options={provienceList}>
					</SearchSelector>
				</div>
				<div>
					<h4>带搜索框的下拉框，清空，受控</h4>
					<SearchSelector clickInputEmpty placeholder="选择省市" showMaxCount={4} value={this.state.searchSelectValue}
						onChange={this.handlerChangeSearchSelector.bind(this)} options={provienceList}>
					</SearchSelector>
				</div>
				<div>
					<h4>搜索框和Text合并，受控</h4>
					<SearchSelector displaySearchInput placeholder="选择省市" showMaxCount={4} value={this.state.searchSelectValue}
						onChange={this.handlerChangeSearchSelector.bind(this)} options={provienceList}>
					</SearchSelector>
				</div>
				<div>
					<h4>搜索框和Text合并，清空，受控</h4>
					<SearchSelector displaySearchInput clickInputEmpty placeholder="选择省市" 
						showMaxCount={4} value={this.state.searchSelectValue}
						onChange={this.handlerChangeSearchSelector.bind(this)} options={provienceList}>
					</SearchSelector>
				</div>
				<div>
					<h4>带搜索框的下拉框，不受控</h4>
					<SearchSelector placeholder="选择省市" showMaxCount={4} defaultvalue="zj" options={provienceList}>
					</SearchSelector>
				</div>
				<div>
					<h4>带搜索框的下拉框，清空，不受控</h4>
					<SearchSelector clickInputEmpty placeholder="选择省市" showMaxCount={4} defaultvalue="zj" options={provienceList}>
					</SearchSelector>
				</div>

				<div>
					<h4>搜索框和Text合并，不受控</h4>
					<SearchSelector displaySearchInput placeholder="选择省市" showMaxCount={4} defaultvalue="zj" 
						options={provienceList}>
					</SearchSelector>
				</div>
				<div>
					<h4>搜索框和Text合并,清空,不受控</h4>
					<SearchSelector displaySearchInput clickInputEmpty placeholder="选择省市" showMaxCount={4} 
						defaultvalue="zj" options={provienceList}>
					</SearchSelector>
				</div>
				<div>
					<h4>调用函数获得options的内容，受控</h4>
					<SearchSelector 
						displaySearchInput 
						placeholder="搜索浙江省内的市" 
						showMaxCount={4} 
						value={this.state.searchSelectValue1}
						onSearch={this.getOptions.bind(this)} 
						onChange={this.handlerChangeSearchSelector1.bind(this)} options={this.state.options}>
					</SearchSelector>
				</div>
				<div>
					<h4>调用函数获得options的内容，清空，受控</h4>
					<SearchSelector displaySearchInput clickInputEmpty placeholder="搜索浙江省内的市" 
						showMaxCount={4} value={this.state.searchSelectValue1}
						onSearch={this.getOptions.bind(this)} 
						onChange={this.handlerChangeSearchSelector1.bind(this)} 
						options={this.state.options}>
					</SearchSelector>
				</div>
				<div>
					<h4>调用函数获得options的内容，受控</h4>
					<SearchSelector placeholder="搜索浙江省内的市" showMaxCount={4} value={this.state.searchSelectValue1}
						onSearch={this.getOptions.bind(this)} 
						onChange={this.handlerChangeSearchSelector1.bind(this)} 
						options={this.state.options}>
					</SearchSelector>
				</div>
				<div>
					<h4>调用函数获得options的内容，清空，受控</h4>
					<SearchSelector clickInputEmpty placeholder="搜索浙江省内的市" showMaxCount={4} 
						value={this.state.searchSelectValue1}
						onSearch={this.getOptions.bind(this)} 
						onChange={this.handlerChangeSearchSelector1.bind(this)} 
						options={this.state.options}>
					</SearchSelector>
				</div>
				<div>
					<h4>调用函数获得options的内容，不受控</h4>
					<SearchSelector displaySearchInput placeholder="搜索浙江省内的市" showMaxCount={4}
						onSearch={this.getOptions.bind(this)} options={this.state.options}>
					</SearchSelector>
				</div>
				<div>
					<h4>调用函数获得options的内容，清空，不受控</h4>
					<SearchSelector displaySearchInput clickInputEmpty placeholder="搜索浙江省内的市" showMaxCount={4}
						onSearch={this.getOptions.bind(this)} options={this.state.options}>
					</SearchSelector>
				</div>
				<div>
					<h4>调用函数获得options的内容，不受控</h4>
					<SearchSelector placeholder="搜索浙江省内的市" showMaxCount={4}
						onSearch={this.getOptions.bind(this)} options={this.state.options}>
					</SearchSelector>
				</div>
				<div>
					<h4>调用函数获得options的内容，清空，不受控</h4>
					<SearchSelector clickInputEmpty placeholder="搜索浙江省内的市" showMaxCount={4}
						onSearch={this.getOptions.bind(this)} options={this.state.options}>
					</SearchSelector>
				</div>
			</div>
		)
	}
}