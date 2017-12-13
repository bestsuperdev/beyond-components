import * as React from 'react'
import * as classnames from 'classnames'
import Document from '../Document'
import { prefix, IBaseProps } from '../consts'
import assign = require('beyond-lib/lib/assign')
const nprefix = `${prefix}searchSelector`
export interface IOptionProps{
	value?:string,
	text?:string,
	onClick?:()=>void,
	index?:number,
	matchValue?:string,
	indent?:boolean
	activeIndex?:number,
}

// tslint:disable-next-line:variable-name
const Option = (props : IOptionProps)=>{
	let {matchValue,indent,index,activeIndex,text,onClick} = props     
	let _style = indent ? {} : assign({},{textIndent:'20px'})
	let children,startIndex
	// tslint:disable-next-line:no-conditional-assignment
	if(matchValue && (startIndex = text.indexOf(matchValue)) >= 0){
		children = <div>{text.slice(0,startIndex)}<b>{matchValue}</b>{text.slice(startIndex + matchValue.length)}</div>
	}else{
		children = <div>{text}</div>
	}
	return(
		<div className={classnames(`${nprefix}-option`, activeIndex === index && 'active')} style={_style} onClick={onClick}>
			{children}      
		</div>
	)
}


export interface ISearchSelectorProps extends IBaseProps{
	placeholder?:string,
	onChange?:(data:any) => boolean,
	extraTextClass?:string,
	showMaxCount?:number,
	displaySearchInput?:boolean
	onSearch?:(searchValue:string)=>void,
	clearSearch?:boolean,
	defaultvalue?:string,
	value?:string,
	loadOptions?:ISelectUnit[]   
}
export interface ISelectUnit{
	value?:string,
	text?:string
}
export interface ISearchSelectorState{
	// isShowOption ?:boolean,    
	showOption ?:boolean,    
	selectOption?:ISelectUnit,
	searchContent?:string,
	temp_activeIndex?:number,
	isShowInput?:boolean,
	clearOptions?:boolean
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
			temp_activeIndex:0,
			isShowInput:false,
			clearOptions:false
		}
	}
	refs:any
	handlerOutClick(){
		this.setState({showOption:false,isShowInput:false})
	}
	getFilterOptions(props:ISearchSelectorProps,searchContent:string){ 
		//根据searchContent 和 loadOptions获得过滤后的options
		//1、存在onSearch,过滤字段为""
		//2、不存在onSearch,过滤字段为searchContent
		let {loadOptions} = props
		if(this.props.onSearch){
			return loadOptions
		}else{
			return loadOptions.filter((child:ISelectUnit) => child.text.indexOf(searchContent) >= 0)
		}
	}
	getActiveIndex1( props:ISearchSelectorProps, real_selectOption?:ISelectUnit){//从过滤的options中获得选中项以及位置(相对)
		//获得过滤项，根据searchContent 和 loadOptions获得过滤后的options
		//onSearch this.props.loadOptions ==[]
		if( props.onSearch && props.loadOptions.length == 0 ){
			return 0
		}
		let {selectOption,searchContent} = this.state
		if(this.props.clearSearch){
			searchContent = ''
		}
		
		let filterOptions = this.getFilterOptions(props,searchContent)
		//获得选中项
		let temp_activeIndex = 0
		let value = ''
		if('value' in props){//受控	
			value = props.value
		}else if(real_selectOption != null){//不受控
			value = real_selectOption.value
		}
		filterOptions.map((item,key)=>{
			if(item.value == value){
				temp_activeIndex = key
				return false
			}
		})
		return temp_activeIndex
	}
	componentWillReceiveProps(nextprops:ISearchSelectorProps){
		//受控情况下
		let props = nextprops
		if('value' in nextprops){
			let temp_activeIndex = this.getActiveIndex1(props)
			let {value} = props
			let selectOption = props.loadOptions.filter((item:ISelectUnit)=>(item.value === value))[0]							
			this.setState({selectOption,temp_activeIndex})
			if(props.onSearch){
				this.setState({clearOptions:false})
			}					
		}else{
			if(props.onSearch){
				let temp_activeIndex = this.getActiveIndex1(props)
				this.setState({temp_activeIndex})
				if(props.onSearch){
					this.setState({clearOptions:false})
				}
			}
		}
	}
	handlerClick(showOption:boolean,e:Event){
		let nextState:{showOption?:boolean,isShowInput?:boolean,searchContent?:string} = {showOption}
		nextState['isShowInput'] = true 
		if(this.props.clearSearch){
			nextState['searchContent'] = ''
		}			
		this.setState(nextState)
	}	
	handlerClickOption(selectOption:ISelectUnit,event:any){
		let result
		let nextState:{showOption?:boolean,isShowInput?:boolean,selectOption?:ISelectUnit} = {showOption:false,isShowInput:false,selectOption}
		if(this.props.clearSearch){
			nextState['searchContent'] = ''
		}
		this.setState(nextState)     
		if(typeof this.props.onChange == 'function'){
			result = this.props.onChange(selectOption)
		}
		if(result !== false){
			// 不受控刷新
			let temp_activeIndex
			temp_activeIndex = this.getActiveIndex1(this.props,selectOption)
			this.setState({selectOption,temp_activeIndex,isShowInput:false}) 
		}
		if(this.refs.myinput) {
			this.refs.myinput.blur()
		}       
	}
	handlerKeydownSelectorOption(event:any){
		// debugger
		let keyCode = event.keyCode
		let {temp_activeIndex,searchContent} =  this.state
		if(keyCode === 38){
			if(temp_activeIndex > 0){
				temp_activeIndex --
			}
			this.setState({showOption:true,temp_activeIndex})
		}else if(keyCode === 40){
			if(temp_activeIndex < this.getFilterOptions(this.props,searchContent).length -1){
				temp_activeIndex ++
			}
			this.setState({showOption:true,temp_activeIndex})
		}else if(keyCode === 13){
			let child = this.getFilterOptions(this.props,this.state.searchContent)[temp_activeIndex]
			this.handlerClickOption(child,null)            
		}else{
			return
		}
		event.preventDefault()
	}
	componentDidUpdate(){
		//滚动条滚动到选中项
		if(this.refs.optionsWrap){
			this.refs.optionsWrap.scrollTop = (this.state.temp_activeIndex*40)
		}
	}
	handlerChangeSearchContent(event:any){
		this.setState({showOption:true,searchContent:event.target.value,temp_activeIndex:0,isShowInput:true}) 
		if(this.props.onSearch && typeof this.props.onSearch === 'function') {
			this.setState({clearOptions:true})
			this.props.onSearch(event.target.value)
		}       
	}	
	renderOptions(){
		//根据searchContent得到children的过滤
		let {showMaxCount,displaySearchInput} = this.props
		let {searchContent,temp_activeIndex,showOption,clearOptions} = this.state
		let filterOptions = this.getFilterOptions(this.props,searchContent)
		if(showOption){
			let options:any[] = []
			filterOptions.map((item,key)=>{
				let {value,text} = item
				options.push(<Option
						matchValue={this.props.onSearch ? '' : searchContent}
						activeIndex={temp_activeIndex}
						value={value} text={text} key={key}
						index={options.length}
						indent={(displaySearchInput || false)}
						onClick={this.handlerClickOption.bind(this,{value,text})}  />)        
			})
			if(clearOptions){
				return <div className={classnames(`${nprefix}-on-searching`)} >搜索中......</div>                        
			}
			if(options.length === 0) {
				return <div className={classnames(`${nprefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
			}
			return <div className={classnames(`${nprefix}-options`)}  ref="optionsWrap" style = {{maxHeight:showMaxCount*40}} >{options}</div>
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
		if(!displaySearchInput){
			assign(displaySearchInputContainerStyle,{border:'1px solid grey',margin:'0 10px'})
			assign(inputStyle,{paddingLeft:'10px'})
		} 
		//input不是输入搜索状态时，显示选中项	
		if(!isShowInput){
			if(!selectOption){
				searchContent = ''
			}else{
				searchContent = selectOption.text		
			}
		}
		if(displaySearchInput ||(!displaySearchInput && showOption)) {
			return(
				<div className={classnames(`${nprefix}-input`)} style={displaySearchInputContainerStyle}>
					<input ref="myinput"  type="text" autoFocus
							placeholder={(displaySearchInput && placeholder) || (!displaySearchInput &&'搜索')} 
							style= {inputStyle}
							onChange={this.handlerChangeSearchContent.bind(this)}
							onClick={this.handlerClick.bind(this,true)} 
							value={searchContent} 
							onKeyDown={this.handlerKeydownSelectorOption.bind(this)} />
					<span className={`${nprefix}-icon-container`}>{icon}</span>  
				</div>              
			)
		}
		return null
	}
	renderText(){
		//受控：props.value确定的值，不受控：this.state.selectOption      
		let {displaySearchInput,value} = this.props
		let { selectOption } = this.state
		let text = ''
		if(selectOption){
			text = this.state.selectOption.text
		}
		if(!displaySearchInput){
			return(
				<div className={classnames(`${nprefix}-text`)} onClick={this.handlerClick.bind(this,!this.state.showOption)}>
					{text||this.props.placeholder}
				</div> 
			)
		}
	}
	render(){
		let {showOption} = this.state
		let {extraClassName,displaySearchInput,style} = this.props
		return(
			<Document onClick={this.handlerOutClick.bind(this)}>
				<div className={classnames(`${nprefix}`,(!displaySearchInput)&&((showOption && `${nprefix}-arrowUp`)||(!showOption && `${nprefix}-arrowDown`)),extraClassName)} style={style}  >
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