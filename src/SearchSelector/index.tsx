import * as React from 'react'
import * as classnames from 'classnames'
import Placeholder from '../Placeholder'
import { prefix, IBaseProps } from '../consts'
// const nprefix ="searchSelector"
import assign = require("beyond-lib/lib/assign");
const nprefix = `${prefix}searchSelector`
export interface OptionProps{
    value?:string,
    text?:string,
    selected?:boolean,
    onClick?:()=>void,
    onMouseOver?:()=>void,
    index?:number,
    matchValue?:string,
    indent?:boolean
    activeIndex?:number
}
export class Option extends React.Component<OptionProps,{}>{
    renderText(matchValue:string,str:string){
        if(!matchValue){ 
            return null
        }
        let startX = str.indexOf(matchValue)
        let strBegin = str.substring(0,startX)
        let strEnd = str.substr(startX+matchValue.length) 
        return(
            <div>{strBegin}<b>{matchValue}</b>{strEnd}</div>
        )
    }
    render(){
        let {matchValue,indent,index,activeIndex,text} = this.props
        console.log(activeIndex)        
        let _style = indent?{}:assign({},{textIndent:'20px'})
        return(
            <div className={classnames(`${nprefix}-option`,activeIndex == index && 'active')} style={_style}  onClick={this.props.onClick}>
                {( this.renderText(matchValue,text))||this.props.children}   
            </div>
        )
    }
}
export interface ISearchSelectorProps{
    extraClassName?:string,
    style?:React.CSSProperties,
    // children?:any,
    placeholder?:string,
    // defaultSelect?:boolean,
    onChange?:(data:any)=>void,
    // icon?:boolean,
    extraTextClass?:string,
    showMaxCount?:number,
    // withoutText?:boolean,
    displaySearchInput?:boolean
    // searchFun?:(searchValue:string)=>void,
    onSearch?:(searchValue:string)=>void,
    clickInputEmpty?:boolean,
    value?:string
}
type SelectUnit={
    value?:string,
    text?:string
}
export interface ISearchSelectorState{
    showOption?:boolean,    
    selectOption?:SelectUnit,
    searchContent?:string,
    temp_activeIndex?:number
}
export default class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
    public handle:number
    public innerClick:boolean
    // public options :any[] 
    public options1 :any[]  
    public firstClickText :boolean
    private hideOptionFun:()=>void
    static defaultProps:ISearchSelectorProps ={
        showMaxCount:3,
        clickInputEmpty:false,
        displaySearchInput:false
    }    
    constructor(props:ISearchSelectorProps){   
        super(props)
        this.state ={
            showOption:false,
            selectOption:{value:'',text:''},
            searchContent:'',
            temp_activeIndex:0,
        }
        this.options1 = []
        this.innerClick = false
        this.hideOptionFun = this.hideOption.bind(this)
        this.firstClickText = false
    }
    refs:any
    hideOption(){
        // debugger
		this.handle = setTimeout(()=>{
            if(!this.innerClick){
                this.setState({showOption:false})
            }
            this.handle = null
			this.innerClick = false           
		}, 50);
    }

    componentDidMount(){
        let selectObj = this.getDefaultSelect(this.props)
        if(selectObj != null){
            let {selectOption,temp_activeIndex} =selectObj
            this.setState({selectOption,temp_activeIndex})      
        }
        if(document.addEventListener){
            document.addEventListener('click',this.hideOptionFun)
        }
    }
    componentWillReceiveProps(nextprops:ISearchSelectorProps){
        if(this.props.onSearch) {
            // debugger
            this.setState({temp_activeIndex:0})                
        }   
    }
    componentWillUnmount(){
		clearTimeout(this.handle)
		this.handle = null
        let wrap =  this.refs.wrap
        if(document.removeEventListener)  {
            document.removeEventListener('click',this.hideOptionFun)         
        }       
    }

    getDefaultSelect(props:any){
        let children = (Array.isArray(props.children) ? props.children : [props.children]).filter((child:any) => child!=null )
        let selectChildren = children.filter((child:any) => (child.props.selected ===undefined)?(false): (child.props.selected=== true))
        let selectChild = selectChildren[0] || null
        if(selectChild != null) {
            let temp_activeIndex =0
            children.map((item:any,i:number)=>{
                if(item.props.value == selectChild.props.value){
                    temp_activeIndex = i
                }
            })
            let selectOption ={value:'',text:''}
            selectOption.text = selectChild.props.children
            selectOption.value =selectChild.props.value

            return {selectOption,temp_activeIndex } 
        }else {
            return null
        }          
    }
    getOptionObject(option:any) {
        if (!option) {
            let value:any = null
            let text:any = null
            return {value,text}
        }
        let text = option.props.children == null ? '' : option.props.children
        let value = option.props.value != null ? option.props.value : text
        return {value,text,isPlaceholder : false}
    }
    handlerTextClick(){
        //更改showOption
        this.innerClick = true
        let showOption = !this.state.showOption
        //有text框和input框，input清空
        if(this.props.clickInputEmpty){       
            this.setState({showOption,searchContent:""})
        }
        this.setState({showOption})        
    }
    handlerInputClick(){
        this.innerClick = true
        let showOption = true        
        this.setState({showOption})        
    }
    handlerClickOption(obj:any,event:any){
        // debugger
        console.log('obj',obj)        
        let selectOption = obj
        // debugger
        let showOption = false
        if(this.props.onChange !== undefined && typeof this.props.onChange == "function"){
            this.props.onChange(selectOption)
        }
        //找到temp_activeIndex
        let temp_activeIndex = 0        
        this.options1.map((item:any,i:number)=>{
            // console.log(i)
            // console.log('value',item.value,obj.value)
            if(item.props.value == obj.value){
                temp_activeIndex = i
            }
        })
        console.log('temp_active',temp_activeIndex)
        if(this.props.displaySearchInput) {
            this.setState({showOption,selectOption,searchContent:obj.text,temp_activeIndex})
        }else{
            this.setState({showOption,selectOption,temp_activeIndex})
        }
        if(this.refs.myinput)
            this.refs.myinput.blur()       
    }
    handlerKeydownSelectorOption(event:any){
        // debugger
        console.log('按键按下')
        console.log(event.keyCode)
        let keyCode = event.keyCode
        let {temp_activeIndex} =  this.state
        if(keyCode == '38'){
            console.log('向上选')
            if(temp_activeIndex > 0){
                temp_activeIndex --
            }
            this.setState({showOption:true,temp_activeIndex})
        }else if(keyCode == '40'){
            console.log('向下选')
            if(temp_activeIndex < this.options1.length-1){
                temp_activeIndex ++
            }
            this.setState({showOption:true,temp_activeIndex})
        }else if(keyCode == '13'){
            console.log('回车选择确定选项')
            let child = this.options1[this.state.temp_activeIndex]
            let obj = this.getOptionObject(child)
            this.handlerClickOption(obj,null)
        }else{
            return
        }
        event.preventDefault()
    }
    scrollTo(index:number){
        console.log(this.refs.optionsWrap) 
        if(this.refs.optionsWrap){
            this.refs.optionsWrap.scrollTop = (this.state.temp_activeIndex*40)
        }  
    }
    componentDidUpdate(){
        this.scrollTo(this.state.temp_activeIndex)
    }
    renderOptions(){
        // debugger
        let {showMaxCount,displaySearchInput} = this.props
        let {searchContent,temp_activeIndex} = this.state
        console.log('renderOptions',temp_activeIndex)
        let matchValue = searchContent
        if(this.state.showOption){
            let options = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child:any) => child!=null )
            let temp_options:any[] = []
            console.log('options',options)
            console.log('temp_options',temp_options)
                options.map((child:any,i:number)=>{
                    let {value,text} = this.getOptionObject(child)
                    if(this.props.onSearch && typeof this.props.onSearch == 'function'){
                        matchValue = ''
                    }
                    console.log(matchValue)
                    let patt = new RegExp(matchValue,'ig')
                    if(patt.exec(text) != null) {
                        // debugger
                        temp_options.push( React.cloneElement(child,{
                            matchValue,
                            activeIndex:temp_activeIndex,
                            value,text,
                            index:temp_options.length,
                            key:i,indent:(displaySearchInput || false),
                            onClick:this.handlerClickOption.bind(this,{value,text,i}),
                        }))
                    }

                })
                console.log('temp_options',temp_options)
                this.options1 = temp_options
            console.log(temp_options)            
            if(temp_options.length == 0) {
                return <div className={classnames(`${nprefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
            }
            return <div className={classnames(`${nprefix}-options`)}  ref='optionsWrap' style = {{maxHeight:showMaxCount*40}} >{temp_options}</div>
        }
        return null
    }
    handlerChangeSearchContent(event:any){

        if(this.props.onSearch && typeof this.props.onSearch == 'function') {
            // debugger
            this.props.onSearch(event.target.value)
            this.setState({showOption:true,searchContent:event.target.value,temp_activeIndex:0})  
        }else{
            let searchContent = event.target.value
            this.setState({showOption:true,searchContent,temp_activeIndex:0})  //,temp_activeIndex:0
        }       
    }

    renderInput(){
        let icon = <img src={require('./images/icon_search.png')} alt='图标'/>
        let {displaySearchInput,placeholder} = this.props
        let {showOption} = this.state
        let displaySearchInputContainerStyle ={}
        let inputStyle = {}
        if(!displaySearchInput){
            assign(displaySearchInputContainerStyle,{
                border:'1px solid grey',
                margin:'0 10px'
            })
            assign(inputStyle,{
                paddingLeft:'10px'
            })
        }
        console.log(displaySearchInputContainerStyle)
        
        if(displaySearchInput ||(!displaySearchInput && showOption)) {
            return(
                <div className={classnames(`${nprefix}-input`)} style={displaySearchInputContainerStyle}>
                    <input ref='myinput'  type="text"  autoFocus 
                            placeholder={(displaySearchInput && placeholder) || (!displaySearchInput &&"搜索")} 
                            style= {inputStyle}
                            onChange={this.handlerChangeSearchContent.bind(this)}
                            onClick={this.handlerInputClick.bind(this)} 
                            value={this.state.searchContent} 
                            onKeyDown={this.handlerKeydownSelectorOption.bind(this)}
                            />
                    <span className={`${nprefix}-icon-container`}>{icon}</span>
                </div>              
            )
        }
        return null
    }
    render(){
        console.log(this.state.temp_activeIndex)
        let text = this.state.selectOption != null ? this.state.selectOption.text:null
        let {extraClassName,displaySearchInput,style} = this.props
        return(
            <div ref='wrap'  className={classnames(`${nprefix}`,(!displaySearchInput)&&((this.state.showOption && `${nprefix}-arrowUp`)||(!this.state.showOption && `${nprefix}-arrowDown`)),extraClassName)} 
             style = {style} >  
                {!displaySearchInput &&
                    (<div className={classnames(`${nprefix}-text`)} onClick={this.handlerTextClick.bind(this)}>{text||this.props.placeholder}</div>)}
                <div className={classnames(`${nprefix}-container`,displaySearchInput &&'container-relative')} >
                    {this.renderInput()}
                    {this.renderOptions()} 
                </div>  
                              
            </div>              
        )
    }
}

// export default SearchSelector
// export {Option,ISearchSelectorProps,ISearchSelectorState,OptionProps}