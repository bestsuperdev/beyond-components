import * as React from 'react'
import * as classnames from 'classnames'
import Document from '../Document'
import { prefix, IBaseProps } from '../consts'
import assign = require('beyond-lib/lib/assign')
const nprefix = `${prefix}searchSelector`
export interface ISelectUnit{
	value?:string,
	text?:string
}
export interface ISearchSelectorProps extends IBaseProps{
	placeholder? : string,
	onChange? : (data : any) => boolean,
	extraTextClass? : string,
	showMaxCount? : number,
	displaySearchInput? : boolean
	onSearch? : (searchValue:string)=>void,
	clearSearch? : boolean,
	defaultvalue? : string,
	value? : string,
	loadOptions? : ISelectUnit[]   
}
export interface ISearchSelectorState{
	// isShowOption ?:boolean,    
	showOption? : boolean,    
	selectOption? : ISelectUnit,
	searchContent? : string,
	// temp_activeIndex?:number,
	activeIndex? : number
	isShowInput? : boolean,
	clearOptions? : boolean
}
export default class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
	static defaultProps:ISearchSelectorProps = {
		showMaxCount:3,
		displaySearchInput:false
	}    
	constructor(props:ISearchSelectorProps){   
		super(props)
		this.state ={
			showOption:false,
			selectOption:{value:this.props.defaultvalue || '',text:''},
			searchContent:'',
			activeIndex:0,
			isShowInput:false,
			clearOptions:false
		}
	}
	input : HTMLElement
	optionsWrap : HTMLElement
	timer : NodeJS.Timer
	componentDidMount(){
		let { loadOptions } = this.props
		let { selectOption } = this.state
		if (selectOption.value != '') {
			let selectOption1= loadOptions.filter((item)=>(item.value == selectOption.value))[0]
			this.setState({selectOption:selectOption1})
		}
	}
	handlerOutClick(){
		this.setState({showOption:false,isShowInput:false})
	}
	getFilterOptions(props:ISearchSelectorProps,searchContent:string){ 
		//根据searchContent 和 loadOptions获得过滤后的options
		//1、存在onSearch,过滤字段为"";2、不存在onSearch,过滤字段为searchContent
		let {loadOptions} = props
		if(this.props.onSearch){
			return loadOptions
		}else{
			return loadOptions.filter((child:ISelectUnit) => child.text.indexOf(searchContent) >= 0)
		}
	}
	getActiveIndex1( props:ISearchSelectorProps, real_selectOption?:ISelectUnit){//从过滤的options中获得选中项以及位置(相对)
		//获得过滤项，根据searchContent 和 loadOptions获得过滤后的options
		let {selectOption,searchContent} = this.state	
		let activeIndex = 0		
		if( props.onSearch && props.loadOptions.length == 0 ){
			return activeIndex
		}
		if(this.props.clearSearch){
			searchContent = ''
		}		
		let filterOptions = this.getFilterOptions(props,searchContent)
		//获得选中项
		let value = ''
		if ('value' in props) {//受控	
			value = props.value
		}else if (real_selectOption != null) {//不受控
			value = real_selectOption.value
		}
		filterOptions.map((item, key) => {
			if (item.value == value) {
				activeIndex = key
				return false
			}
		})
		return activeIndex
	}
	componentWillReceiveProps(nextprops:ISearchSelectorProps){
		//受控情况下
		let props = nextprops
		let nextState:ISearchSelectorState = {}		
		if ('value' in nextprops) {
			let { value } = props			
			let activeIndex = this.getActiveIndex1(props)
			nextState['activeIndex'] = activeIndex
			let selectOptions = props.loadOptions.filter((item:ISelectUnit)=>(item.value === value))
			if (selectOptions.length > 0) {
				nextState['selectOption'] = selectOptions[0]						
			}
		}
		if (props.onSearch) {
			nextState['clearOptions'] = false
		}
		this.setState(nextState)		
	}
	handlerClick(showOption:boolean,e:Event){
		let nextState:ISearchSelectorState = {showOption,isShowInput:true}			
		this.setState(nextState)
	}	
	handlerClickOption(selectOption:ISelectUnit,event:any){
		let result
		let nextState:ISearchSelectorState = {showOption:false,isShowInput:false,selectOption}
		if (this.props.clearSearch) {
			nextState['searchContent'] = ''
		}
		if (typeof this.props.onChange == 'function') {
			result = this.props.onChange(selectOption)
		}
		if (result !== false) {
			// 不受控刷新
			nextState['activeIndex'] = this.getActiveIndex1(this.props,selectOption)
		} 
		this.setState(nextState)       
	}
	handlerKeydownSelectorOption(event:React.KeyboardEvent<any>){
		let keyCode = event.keyCode
		let nextState : ISearchSelectorState = {}
		let { activeIndex, searchContent} =  this.state
		if (keyCode === 38 || keyCode === 40) {
			if (keyCode == 38) {	
				if (activeIndex > 0 ) {
					activeIndex --
				}
			} else {
				if (activeIndex < this.getFilterOptions(this.props,searchContent).length-1) {
					activeIndex ++
				}
			}
			nextState['activeIndex'] = activeIndex
			this.setState(nextState)
		}else if(keyCode === 13){
			let child = this.getFilterOptions(this.props,this.state.searchContent)[activeIndex]
			this.handlerClickOption(child,null)            
		}else{
			return
		}
		event.preventDefault()
	}
	componentDidUpdate(){
		//滚动条滚动到选中项
		if (this.optionsWrap) {
			this.optionsWrap.scrollTop = (this.state.activeIndex*40)			
		}
	}
	handlerChangeSearchContent(event:React.ChangeEvent<{value:string}>){
		let nextState :ISearchSelectorState = {searchContent:event.target.value,activeIndex:0}
		if (this.props.onSearch && typeof this.props.onSearch === 'function') {
			nextState['clearOptions'] = true
			console.log(typeof this.timer)
			if(this.timer != null) {
				console.log('清时钟')
				clearTimeout(this.timer)
				this.timer = null
			}
			let searchContent = event.target.value
			this.timer= setTimeout(() => {
				console.log('搜索')
				this.props.onSearch(searchContent)				
			},1000)
		}
		this.setState(nextState)       
	}	
	renderOptions(){
		let {showMaxCount,displaySearchInput} = this.props
		let {searchContent,activeIndex,showOption,clearOptions} = this.state
		let filterOptions = this.getFilterOptions(this.props,searchContent)
		if (showOption) {
			let options:JSX.Element[] = []
			filterOptions.map((item,key) => {
				let {value,text} = item
				let matchValue = this.props.onSearch ? '' : searchContent
				let startIndex =text.indexOf(matchValue)
				options.push(
					<div key={key} className={classnames(`${nprefix}-option`, activeIndex === key && 'active')}  onClick={this.handlerClickOption.bind(this,{value,text})} >
						{text.slice(0,startIndex)}<b>{matchValue}</b>{text.slice(startIndex + matchValue.length)}
					</div>
				)     
			})
			if (clearOptions) {
				return <div className={classnames(`${nprefix}-on-searching`)} >搜索中......</div>                        
			}
			if (options.length === 0) {
				return <div className={classnames(`${nprefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
			}
			return <div className={classnames(`${nprefix}-options`)}  ref={(wrap) =>{this.optionsWrap = wrap}} style = {{maxHeight:showMaxCount*40}} >{options}</div>
		}
		return null
	}
	renderInput(){
		//1.输入状态，显示searchContent;2.不在输入状态，显示选中值，与renderText方式一样
		let icon = <img src={require('./images/icon_search.png')} alt="图标"/>
		let {displaySearchInput,placeholder,value} = this.props
		let {searchContent,isShowInput,selectOption,showOption} = this.state        
		let displaySearchInputContainerStyle:React.CSSProperties = {}
		let inputStyle:React.CSSProperties = {}
		if (!displaySearchInput) {
			assign(displaySearchInputContainerStyle,{border:'1px solid grey',margin:'0 10px'})
			assign(inputStyle,{paddingLeft:'10px'})
		} 
		//input不是输入搜索状态时，显示选中项	
		if (!isShowInput) {
			searchContent = selectOption.text		//autoFocus
		}
		if (displaySearchInput || (!displaySearchInput && showOption)) {
			return(
				<div className={classnames(`${nprefix}-input`)} style={displaySearchInputContainerStyle}>
					<input ref={(input)=>{this.input = input}}  type="text" autoFocus
							placeholder={(displaySearchInput && placeholder) || (!displaySearchInput &&'搜索')} 
							style= {inputStyle}
							value={searchContent} 
							onChange={this.handlerChangeSearchContent.bind(this)}
							onClick={this.handlerClick.bind(this,true)} 	
							onKeyDown={this.handlerKeydownSelectorOption.bind(this)} />
					<span className={`${nprefix}-icon-container`}>{icon}</span>  
				</div>              
			)
		}
		return null
	}
	renderText(){
		let {displaySearchInput,value} = this.props
		let { selectOption } = this.state
		let text = selectOption.text
		if (!displaySearchInput) {
			return (
				<div className={classnames(`${nprefix}-text`)} onClick={this.handlerClick.bind(this,!this.state.showOption)}>
					{text||this.props.placeholder}
				</div> 
			)
		}
	}
	render(){
		let {showOption} = this.state
		let {extraClassName,displaySearchInput,style} = this.props
		return (
			<Document onClick={this.handlerOutClick.bind(this)}>
				<div className={ classnames(`${nprefix}`, !displaySearchInput && ((showOption  && `${nprefix}-arrowUp`)||(`${nprefix}-arrowDown`)),extraClassName) } style={style}  >
					{this.renderText()}
					<div className={classnames(`${nprefix}-container`,displaySearchInput &&'container-relative')} >
						{this.renderInput()}
						{this.renderOptions()} 
					</div>                     
				</div>   
			</Document>         
		)
	}
}