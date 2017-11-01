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
    clickInputEmpty?:boolean
}
export interface ISearchSelectorState{
    showOption?:boolean,    
    selectOption?:any,
    searchContent?:string,
    temp_activeIndex?:number
}
export default class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
    public handle:number
    public innerClick:boolean
    public options :any[] 
    public options1 :any[]  
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
        this.options = []
        this.options1 = []
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
            this.setState({selectOption})      
        }
        let wrap =  this.refs.wrap    
        if(document.addEventListener){
            document.addEventListener('click',this.hideOptionFun)
        }
    }
    componentWillReceiveProps(nextprops:ISearchSelectorProps){
        if(this.props.onSearch) {
            let options = this.getOptions(nextprops)          
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
        return {value,text,isPlaceholder : false}
    }
    getOptions(props:any,searchContent?:string){
        let children = (Array.isArray(props.children) ? props.children : [props.children]).filter((child:any) => child!=null )
        let {displaySearchInput} = this.props
        let options:any[] =[]
        let indent = (displaySearchInput || false)
        children = children.map((child:any,i:number)=>{
            let {value,text} = this.getOptionObject(child)
            options.push(React.cloneElement(child,{value,text,index:i,key:i,indent,
                                                    onClick:this.handlerClickOption.bind(this,{value,text,i}),
                                                }))    
        })
        // this.options = options
        return options        
    }
    handlerTextClick(){
        //更改showOption
        this.innerClick = true
        let showOption = !this.state.showOption
        this.setState({showOption})
        //有text框和input框，input清空
        if(this.props.clickInputEmpty){
            if(this.props.onSearch){
                this.options =[]
            }            
            this.setState({showOption,searchContent:"",temp_activeIndex:0})
        }
    }
    handlerInputClick(){
        // debugger
        ////更改searchContent
        this.innerClick = true
        let showOption = true        
        this.setState({showOption})
        //只有input框，input清空
        if(this.props.displaySearchInput){
            if(this.props.clickInputEmpty){
                //   debugger
                if(this.props.onSearch){
                    this.options =[]
                }
                this.setState({showOption,searchContent:"",temp_activeIndex:0})
                
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
        //找到temp_activeIndex
        let temp_activeIndex = 0        
        this.options1.map((item:any,i:number)=>{
            console.log(i)
            console.log('obj',obj)
            console.log('value',item.value,obj.value)
            if(item.props.value == obj.value){
                temp_activeIndex = i
            }
        })
        console.log(temp_activeIndex)
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
        console.log('keydown')
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
            console.log(temp_activeIndex,'temp_activeIndex')
            this.setState({showOption:true,temp_activeIndex})
        }else if(keyCode == '13'){
            console.log('回车选择确定选项')
            // this.setState({showOption:false,selectOption:this.options[this.state.temp_activeIndex]})
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
        if(this.state.showOption){
            let options = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child:any) => child!=null )
            let temp_options:any[] = []
                options.map((child:any,i:number)=>{
                    let {value,text} = this.getOptionObject(child)
                    console.log(this.state.searchContent)
                    let patt = new RegExp(this.state.searchContent,'ig')
                    if(this.props.onSearch && typeof this.props.onSearch == 'function'){
                        temp_options.push( React.cloneElement(child,{
                            matchValue:'',
                            activeIndex:this.state.temp_activeIndex,
                            value,text,
                            index:temp_options.length,
                            key:i,indent:(displaySearchInput || false),
                            onClick:this.handlerClickOption.bind(this,{value,text,i}),
                        }))
                    }else{
                        if(patt.exec(text) != null) {
                            temp_options.push( React.cloneElement(child,{
                                matchValue:this.state.searchContent,
                                activeIndex:this.state.temp_activeIndex,
                                value,text,
                                index:temp_options.length,
                                key:i,indent:(displaySearchInput || false),
                                onClick:this.handlerClickOption.bind(this,{value,text,i}),
                            }))
                        }
                    }

                })
            this.options1 = temp_options
            console.log(temp_options)            
            if(temp_options.length == 0) {
                return <div className={classnames(`${nprefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
            }
            return <div className={classnames(`${nprefix}-options`)}  ref='optionsWrap' style = {{maxHeight:showMaxCount*40}} >{temp_options}</div>
        }else{
            // debugger
            return null
        }
    }
    judgeMatchState(event:any){

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

// export default SearchSelector
// export {Option,ISearchSelectorProps,ISearchSelectorState,OptionProps}