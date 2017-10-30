import * as React from 'react'
import * as classnames from 'classnames'
import Placeholder from '../Placeholder'
import { prefix, IBaseProps } from '../consts'
// const nprefix ="searchSelector"
import assign = require("beyond-lib/lib/assign");
const nprefix = `${prefix}searchSelector`
interface OptionProps{
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
class Option extends React.Component<OptionProps,{}>{
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
        let _style = indent?{}:assign({},{textIndent:'20px'})
        return(
            <div className={classnames(`${nprefix}-option`,activeIndex == index && 'active')} style={_style}  onClick={this.props.onClick}>
                {( this.renderText(matchValue,text))||this.props.children}   
            </div>
        )
    }
}
interface ISearchSelectorProps{
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
    clickInputEmpty?:boolean
}
interface ISearchSelectorState{
    showOption?:boolean,    
    selectOption?:any,
    searchContent?:string,
    searchOptions?:any[],
    temp_activeIndex?:number
}
class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
    public handle:any
    public innerClick:boolean
    public options :any[]  
    public searchOptions :any[]  
    private hideOptionFun:()=>void
    static defaultProps:ISearchSelectorProps ={
        showMaxCount:3,
        clickInputEmpty:false,
        // withoutText:false,
        displaySearchInput:false
    }    
    constructor(props:ISearchSelectorProps){   
        super(props)
        this.state ={
            showOption:false,
            selectOption:{value:'',text:''},
            searchContent:'',
            searchOptions:[],
            temp_activeIndex:0,
        }
        this.options = []
        this.innerClick = false
        this.hideOptionFun = this.hideOption.bind(this)
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
        // debugger
        let selectOption = this.getDefaultSelect(this.props)
        // console.log(selectOption)
        let options = this.getOptions(this.props)   
        console.log(this.options)
        if(selectOption != null){
            let searchContent =selectOption.text            
            this.setState({selectOption,searchOptions:this.options})//,searchContent,options       
        }else {
            this.setState({searchOptions:this.options})//,options
        }
        let wrap =  this.refs.wrap    
        if(document.addEventListener){
            document.addEventListener('click',this.hideOptionFun)
        }
    }
    componentWillReceiveProps(nextprops:any){
        if(this.props.onSearch) {
            let options = this.getOptions(nextprops)          
            this.setState({searchOptions:this.options})//selectOption, searchContent,        
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
        // console.log(selectChild)
        if(selectChild != null) {
            let result = selectChild
            let selectObj ={value:'',text:''}
            selectObj.text = selectChild.props.children
            selectObj.value =selectChild.props.value
            if(this.props.onChange !== undefined){
                this.props.onChange(selectObj)
            }
            return selectObj  
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
        return {value,text,isPlaceholder : false,index:option.props.index}
    }
    getOptions(props:any){
        let children = (Array.isArray(props.children) ? props.children : [props.children]).filter((child:any) => child!=null )
        console.log('searchOptions',this.state.searchOptions)
        let {displaySearchInput} = this.props
        let options:any[] =[]
        let indent = (displaySearchInput || false)
        children = children.map((child:any,i:number)=>{
            let {value,text} = this.getOptionObject(child)
            options.push(React.cloneElement(child,{value,text,index:i,key:i,indent,
                                                    onClick:this.handlerClickOption.bind(this,{value,text,i}),
                                                    onMouseOver:this.handlerMouseoverSelectorOption.bind(this,{value,text,i})
                                                }))    
        })
        this.options = options
        return options        
    }
    handlerTextClick(){
        //更改showOption
        this.innerClick = true
        let showOption = !this.state.showOption
        this.setState({showOption})
        //有text框和input框，input清空
        if(this.props.clickInputEmpty){
            let searchOptions = this.options
            if(this.props.onSearch){
                this.options =[]
                searchOptions = []
            }            
            console.log(searchOptions)
            this.setState({showOption,searchContent:"",searchOptions,temp_activeIndex:0}) 
        }
    }
    handlerInputClick(){
        // debugger
        ////更改searchOptions
        this.innerClick = true
        let showOption = true        
        this.setState({showOption})
        //只有input框，input清空
        if(this.props.displaySearchInput){
            if(this.props.clickInputEmpty){
                //   debugger
                let searchOptions = this.options                
                if(this.props.onSearch){
                    this.options =[]
                    searchOptions = []
                }
                this.setState({showOption,searchContent:"",searchOptions,temp_activeIndex:0})
                
            }
        }
    }
    handlerClickOption(obj:any,event:any){
        // debugger
        console.log(obj)
        let selectOption = obj
        // debugger
        let showOption = false
        if(this.props.onChange !== undefined && typeof this.props.onChange == "function"){
            this.props.onChange(selectOption)
        }
        console.log(this.state.searchOptions)
        //找到temp_activeIndex
        let temp_activeIndex = 0        
        console.log('this.state.searchOptions',this.state.searchOptions)
        this.state.searchOptions.map((item:any,i:number)=>{
            console.log(i)
            console.log('obj',obj)
            console.log('value',item.value,obj.value)
            if(item.props.value == obj.value){
                temp_activeIndex = i
            }
        })
        console.log('temp_active',temp_activeIndex)
        console.log('index',obj.index)
        if(this.props.displaySearchInput) {
            this.setState({showOption,selectOption,searchContent:obj.text,temp_activeIndex})//,searchContent,searchOptions,temp_activeIndex:0,searchOptions:this.options
        }else{
            this.setState({showOption,selectOption,temp_activeIndex})//,searchContent:'',searchOptions:this.options,temp_activeIndex:0
        }
        if(this.refs.myinput)
            this.refs.myinput.blur()       
    }
    handlerKeydownSelectorOption(event:any){
        console.log('keydown')
        console.log(event.keyCode)
        let keyCode = event.keyCode
        console.log(this.options)
        let {temp_activeIndex} =  this.state
        // this.setState({showOption:true,selectOption:this.options[1]})
        if(keyCode == '38'){
            console.log('向上选')
            if(temp_activeIndex > 0){
                temp_activeIndex --
            }
            this.setState({showOption:true,temp_activeIndex})
        }else if(keyCode == '40'){
            console.log('向下选')
            if(temp_activeIndex < this.state.searchOptions.length-1){
                temp_activeIndex ++
            }
            console.log(temp_activeIndex,'temp_activeIndex')
            this.setState({showOption:true,temp_activeIndex})
        }else if(keyCode == '13'){
            console.log('回车选择确定选项')
            // this.setState({showOption:false,selectOption:this.options[this.state.temp_activeIndex]})
            let child = this.state.searchOptions[this.state.temp_activeIndex]
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
    handlerMouseoverSelectorOption(obj:any,event:any){
        console.log('mouseover')
        console.log(obj)
    }
    renderOptions(){
        // debugger
        console.log('searchOptions',this.state.searchOptions)
        let {showMaxCount,displaySearchInput} = this.props
        if(this.state.showOption){
            let options = this.state.searchOptions
            options =options.map((child:any,i:number)=>{
                return React.cloneElement(child,{activeIndex:this.state.searchOptions[this.state.temp_activeIndex].props.index})
            })
            console.log(options)            
            if(options.length == 0) {
                return <div className={classnames(`${nprefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
            }
            return <div className={classnames(`${nprefix}-options`)}  ref='optionsWrap' style = {{maxHeight:showMaxCount*40}} >{options}</div>
        }else{
            // debugger
            return null
        }
    }
    getMatchOptions(matchValue:any){
        // debugger
        console.log(this.props)
        let children = this.options
        console.log(this.options)
        let matchOptions:any[] =[]
        let matchNum = 0
        // debugger
        console.log('mathValue',matchValue)
        children.map((child,i)=>{
            let {value,text} = this.getOptionObject(child)
            let patt = new RegExp(matchValue,'ig')
            if(patt.exec(text) != null) {
                matchOptions.push(React.cloneElement(child,{key:matchNum,matchValue}))//,{value,text,key:i}
                matchNum++
            }            
        })
        console.log('matchOptions',matchOptions)
         return matchOptions
    }
    judgeMatchState(event:any){

        if(this.props.onSearch && typeof this.props.onSearch == 'function') {
            // debugger
            this.props.onSearch(event.target.value)
            this.setState({showOption:true,searchContent:event.target.value,temp_activeIndex:0})  
        }else{
            let searchContent = event.target.value
            // debugger
            
            let searchOptions = this.getMatchOptions(event.target.value)
            console.log(searchOptions)
            this.searchOptions = searchOptions
            this.setState({showOption:true,searchContent,searchOptions,temp_activeIndex:0})  //,temp_activeIndex:0
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
                            onChange={this.judgeMatchState.bind(this)}
                            onClick={this.handlerInputClick.bind(this)} 
                            value={this.state.searchContent} 
                            onKeyDown={this.handlerKeydownSelectorOption.bind(this)}
                            />
                    <span className={`${nprefix}-icon-container`}>{icon}</span>
                </div>              
            )
        }else{
            return null
        }
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

export default SearchSelector
export {Option}