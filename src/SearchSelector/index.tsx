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
    activeIndex?:number,
    // active?:boolean
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
    onChange?:(data:any)=>boolean,
    // icon?:boolean,
    extraTextClass?:string,
    showMaxCount?:number,
    // withoutText?:boolean,
    displaySearchInput?:boolean
    // searchFun?:(searchValue:string)=>void,
    onSearch?:(searchValue:string)=>void,
    clickInputEmpty?:boolean,
    defaultvalue?:string
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
    temp_activeIndex?:number,
    isSelecting?:boolean
}
export default class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
    public handle:number
    public innerClick:boolean
    // public options :any[] 
    public options :any[]  
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
            selectOption:{value:this.props.defaultvalue||'',text:''},
            searchContent:'',
            temp_activeIndex:0,
            isSelecting:false
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
    getSelectOption(props:any){
        //props=>selectOption
        //this.options.length !=0 ? this.options:
        //找到选中项在全局中的位置
        let children = (Array.isArray(props.children) ? props.children : [props.children]).filter((child:any) => child!=null )
        console.log('children.length',children.length)
        let temp_activeIndex = 0
        let {selectOption}= this.state
        let value = props.value || this.state.selectOption.value
        console.log('selectValue',value)
        children.map((item:any,i:number)=>{
            if(item.props.value == value){
                temp_activeIndex = i
                selectOption.value = item.props.value
                selectOption.text = item.props.children
            }
        })
        console.log('selectOptionG',selectOption)
        console.log('temp_activeIndexG',temp_activeIndex)
        return {selectOption,temp_activeIndex} 
    }
    getOptionObject(option:any) {
        let obj:SelectUnit = {value:'',text:''}       
        obj.text = option.props.children == null ? '' : option.props.children
        obj.value = option.props.value != null ? option.props.value : obj.text
        return obj
    }
    componentDidMount(){
        console.log('did')
        let {selectOption,temp_activeIndex} = this.getSelectOption(this.props)
        if(selectOption.value != ''){
            this.setState({selectOption,temp_activeIndex,isSelecting:false})      
        }
        if(document.addEventListener){
            document.addEventListener('click',this.hideOptionFun)
        }
    }
    componentWillReceiveProps(nextprops:ISearchSelectorProps){
        // if(this.props.onSearch) {
        //     // debugger
        //     this.setState({temp_activeIndex:0})                
        // } 
        console.log('receiveprops')
        // debugger
        if(this.props.onChange){
            //受控情况下
            let {selectOption,temp_activeIndex} = this.getSelectOption(nextprops)
            
               console.log('selectOption',selectOption)
               if(selectOption.value != ''){
                   this.setState({selectOption,temp_activeIndex,isSelecting:false})      
               }
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


    handlerTextClick(){
        //更改showOption
        this.innerClick = true
        let showOption = !this.state.showOption
        //有text框时，input清空
        if(!this.props.displaySearchInput &&this.props.clickInputEmpty){
            this.setState({showOption,searchContent:"",isSelecting:false})
        }
        this.setState({showOption,isSelecting:false})        
    }
    handlerInputClick(){
        this.innerClick = true
        let showOption = true  
        this.setState({showOption,isSelecting:false})
        //无text框时，input清空    
        if(this.props.displaySearchInput && this.props.clickInputEmpty){
            this.setState({showOption,searchContent:"",isSelecting:false})//,temp_activeIndex:0
        }  
                
    }
    getChildrenAll(){
        console.log('childrenAll',this.props.children)
        return (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child:any) => child!=null )
    }
    handlerClickOption(obj:any,event:any){
        // debugger
        console.log('obj',obj)        
        let selectOption = obj
        let showOption = false
        let result
        this.setState({showOption})
        if(typeof this.props.onChange == "function"){
            result = this.props.onChange(selectOption)
        }
        if(result !== false){
            // debugger
            console.log('不受控渲染')
            if(this.props.clickInputEmpty){
                console.log('清空input')
                this.options =this.getChildrenAll()
            }else{
                console.log('不清空input')
            }
                let temp_activeIndex = 0  
                console.log(this.options)      
                this.options.map((item:any,i:number)=>{//temp_options
                    if(item.props.value == obj.value){
                        temp_activeIndex = i
                    }
                })
                // debugger
                if(this.props.displaySearchInput){
                    this.setState({selectOption,searchContent:obj.text,temp_activeIndex,isSelecting:false})
                }else{
                    // debugger
                    this.setState({selectOption,temp_activeIndex,isSelecting:false})
                }
        }else{
            console.log('受控渲染')
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
            this.setState({showOption:true,temp_activeIndex,isSelecting:true})
        }else if(keyCode == '40'){
            console.log('向下选')
            if(temp_activeIndex < this.options.length-1){//temp_options
                temp_activeIndex ++
            }
            this.setState({showOption:true,temp_activeIndex,isSelecting:true})
        }else if(keyCode == '13'){
            console.log('回车选择确定选项')
            let child = this.options[this.state.temp_activeIndex]//temp_options
            console.log('keydoen return',child)
            
            let obj = this.getOptionObject(child)
            this.handlerClickOption(obj,null)
        }else{
            return
        }
        event.preventDefault()
    }
    scrollTo(index:number){
        if(this.refs.optionsWrap){
            // debugger
            this.refs.optionsWrap.scrollTop = (this.state.temp_activeIndex*40)
        }  
    }
    componentDidUpdate(){
        this.scrollTo(this.state.temp_activeIndex)
    }
    getOptionsAccordingtoSearchContent(searchContent:string){
        let children  = this.getChildrenAll()
        let options:any[] = []
        children.map((item:any,i:number)=>{
            let patt = new RegExp(searchContent,'ig')
            let {value,text} = this.getOptionObject(item) 
            if(patt.exec(text) != null) {
                options.push(item)
            }
        })
        return options
    }
    renderOptions(){
        console.log(this.state.temp_activeIndex)
        let {showMaxCount,displaySearchInput} = this.props
        let {searchContent,temp_activeIndex,selectOption} = this.state
        //调用函数获得options时，matchValue
        let matchValue = this.props.onSearch ? '' : searchContent
        if(this.state.showOption){
            let children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child:any) => child!=null )
            let options:any[] = []
            children.map((child:any,i:number)=>{
                let {value,text} = this.getOptionObject(child)
                let patt = new RegExp(matchValue,'ig')
                if(patt.exec(text) != null) {
                    options.push( React.cloneElement(child,{
                        matchValue,
                        activeIndex:temp_activeIndex,
                        value,text,
                        index:options.length,
                        key:i,indent:(displaySearchInput || false),
                        onClick:this.handlerClickOption.bind(this,{value,text,i}),
                    }))
                }
            })
            this.options = options
            if(options.length == 0) {
                return <div className={classnames(`${nprefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
            }
            return <div className={classnames(`${nprefix}-options`)}  ref='optionsWrap' style = {{maxHeight:showMaxCount*40}} >{options}</div>
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
        let displaySearchInputContainerStyle:React.CSSProperties ={}
        let inputStyle:React.CSSProperties = {}
        if(!displaySearchInput){
            assign(displaySearchInputContainerStyle,{border:'1px solid grey',margin:'0 10px'})
            assign(inputStyle,{paddingLeft:'10px'})
        }        
        if(displaySearchInput ||(!displaySearchInput && this.state.showOption)) {
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
        // this.getChildrenAll()
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