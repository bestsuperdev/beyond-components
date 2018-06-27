import * as React from 'react'
import * as classnames from 'classnames'
import Document from '../Document'
import { prefix, IBaseProps } from '../consts'
import assign = require('beyond-lib/lib/assign')


export interface IOption{
	value : any;
	text : string;
}
export interface ISearchSelectorProps extends IBaseProps{
	placeholder? : string;
	searchPlaceholder? : string;
	onChange? : (option : IOption) => boolean;
	showMaxCount? : number;
	onSearch? : (searchValue:string)=>void;
	defaultValue? : any;
	value? : any;
	options? : IOption[];
	icon? : any;
	searching? : boolean;
}
export interface ISearchSelectorState{
	showOptions? : boolean;
	value? : any;
	searchContent? : string;
	activeIndex? : number;
}
export default class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{

	input : HTMLElement
	optionsWrap : HTMLElement
	timer : number

	static defaultProps:ISearchSelectorProps = {
		showMaxCount:3,
		prefix,
		searchPlaceholder : '搜索'
	}    
	constructor(props:ISearchSelectorProps){   
		super(props)
		let activeIndex
		if(props.defaultValue && props.options){
			props.options.forEach((opt,i) => {
				if(opt.value === props.defaultValue){
					activeIndex = i
				}
			})
		}else{
			activeIndex = 0
		}
		this.state ={
			showOptions:false,
			value : props.defaultValue || null,
			searchContent:'',
			activeIndex	
		}
	}


	getOptions(){ 
		let {options} = this.props
		let content = this.state.searchContent.toLowerCase().trim()
		if(content){
			options = options.filter((opt) => (opt.text.toLowerCase()).indexOf(content) >= 0)
		}
		return options
	}
	getActiveIndex(){//从过滤的options中获得选中项以及位置(相对)
		// //获得过滤项，根据searchContent 和 loadOptions获得过滤后的options
		let {activeIndex} = this.state	
		// let activeIndex = 0		
		// if( props.onSearch && props.options.length === 0 ){
		// 	return activeIndex
		// }
		// searchContent = ''
		// let filterOptions = this.getOptions(props,searchContent)
		// //获得选中项
		// let value = ''
		// if ('value' in props) {//受控	
		// 	value = props.value
		// }else if (realSelectOption != null) {//不受控
		// 	value = realSelectOption.value
		// }
		// filterOptions.map((item, key) => {
		// 	if (item.value === value) {
		// 		activeIndex = key
		// 		return false
		// 	}
		// })
		// return activeIndex
		return activeIndex
	}


	handlerSelect = ()=>{
		if(!this.state.showOptions){

			this.setState({showOptions : true},()=>{
				if(this.input){
					this.input.focus()
				}
			})
		}else{
			this.setState({showOptions : false})
		}
	}


	handlerInputBlur = ()=>{
		this.setState({showOptions : false, searchContent : ''})
	}

	handlerClickOption(selectOption:IOption){
		let result
		let nextState:ISearchSelectorState = {showOptions:false,searchContent : ''}
	
		if (typeof this.props.onChange === 'function') {
			result = this.props.onChange(selectOption)
		}
		if (result !== false) {
			// 不受控刷新
			nextState.value = selectOption.value
		} 
		this.setState(nextState)       
	}

	handlerSelectOption = (event:React.KeyboardEvent<HTMLInputElement>)=>{
		let keyCode = event.which
		let nextState : ISearchSelectorState = {}
		let activeIndex = this.getActiveIndex()
		let options = this.getOptions()
		if (keyCode === 38 || keyCode === 40) {
			if (keyCode === 38 && activeIndex > 0) {	
				activeIndex --
			} else if(keyCode === 40 && activeIndex < options.length - 1){
				activeIndex ++
			}
			this.setState({activeIndex})
		}else if(keyCode === 13){
			let child = options[activeIndex] // this.getOptions(this.props,this.state.searchContent)[activeIndex]
			this.handlerClickOption(child)            
		}
	}

	componentDidUpdate(){
		//滚动条滚动到选中项
		// if (this.optionsWrap) {
		// 	this.optionsWrap.scrollTop = (this.state.activeIndex*40)			
		// }
	}
	handlerSearch = (event:React.ChangeEvent<HTMLInputElement>)=>{
		let searchContent = event.currentTarget.value
		this.setState({searchContent})
		if(this.timer){
			window.clearTimeout(this.timer)
		}
		this.timer= window.setTimeout(() => {
			this.timer = null
			if(typeof this.props.onSearch === 'function'){
				this.props.onSearch(searchContent)
			}
			
		},800)
	}	

	renderOptions(className : string){
		let {showMaxCount,searching} = this.props
		let {searchContent,showOptions} = this.state
		let activeIndex = this.getActiveIndex()
		if (showOptions) {
			let options = this.getOptions()
			if (searching) {
				return <div className={classnames(`${className}-tip`)} >搜索中......</div>                        
			}else if (options.length === 0) {
				return <div className={classnames(`${className}-tip`)}>找不到相关结果 "{searchContent}"</div>
		}else{
				let val = this.getValue()
				return <div className={classnames(`${className}-options`)}  
							ref={(wrap) =>{this.optionsWrap = wrap}} 
							style = {{maxHeight:showMaxCount*40}} >
							{options.map((opt,i)=>{
								return (
									<div key={opt.value} 
										className={classnames(`${className}-option`, activeIndex === i && 'active')} 
										onClick={this.handlerClickOption.bind(this,opt)} >
										{opt.text}
									</div>
								)
							})}
						</div>
			}
		}
	}
	renderInput(className : string){
		//1.输入状态，显示searchContent;2.不在输入状态，显示选中值，与renderText方式一样
		let {searchPlaceholder,value} = this.props
		let {searchContent} = this.state        
		let displaySearchInputContainerStyle:React.CSSProperties = {}
		let inputStyle:React.CSSProperties = {}

		return(
			<div className={`${className}-input`} style={displaySearchInputContainerStyle}>
				<input ref={(input)=>{this.input = input}}  type="text" autoFocus
						placeholder={searchPlaceholder} 
						style= {inputStyle}
						value={searchContent} 
						onChange={this.handlerSearch.bind(this)}
						// onFocus={this.handlerInputFocus} 	
						// onBlur={this.handlerInputBlur} 	
						onKeyDown={this.handlerSelectOption.bind(this)} />
				<span className={`${className}-icon-container`}>{this.props.icon}</span>  
			</div>              
		)
	}

	getSelectedOption(){
		let val = this.getValue()
		return (this.props.options || []).filter((opt)=> opt.value === val )[0] || null
	}

	getValue(){
		return this.props.value || this.state.value
	}

	render(){
		let {extraClassName,style,placeholder} = this.props
		const {showOptions} = this.state
		const className = `${this.props.prefix}search-selector`
		const option = this.getSelectedOption()
		const text = option ? option.text : <span style={{color : '#999'}}>{placeholder}</span>
		return (
				<Document onClick={this.handlerInputBlur}>
					<div style={style} className={classnames(className,extraClassName)}>
						<div className={`${className}-text`} onClick={this.handlerSelect}>{text}</div>
						{showOptions && (
							<div className={`${className}-options-wrap`} >
								{this.renderInput(className)}
								{this.renderOptions(className)} 
							</div>                     
						)}
					</div>   
				</Document>
		)
	}
}