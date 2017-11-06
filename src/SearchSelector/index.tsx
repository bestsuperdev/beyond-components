import * as React from 'react'
import * as classnames from 'classnames'
import Placeholder from '../Placeholder'
import Document from '../Document'
import { prefix, IBaseProps } from '../consts'
// const nprefix ="searchSelector"
import assign = require("beyond-lib/lib/assign")
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
    placeholder?:string,
    onChange?:(data:any) => boolean,
    extraTextClass?:string,
    showMaxCount?:number,
    displaySearchInput?:boolean
    onSearch?:(searchValue:string)=>void,
    clickInputEmpty?:boolean,
    defaultvalue?:string
    value?:string,
    children?:JSX.Element[]
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
    isShowInput?:boolean
}
export default class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
    public handle:number
    public innerClick:boolean
    public options :any[]  
    private hideOptionFun:()=>void
    static defaultProps:ISearchSelectorProps ={
        showMaxCount:3,
        // clickInputEmpty:false,
        displaySearchInput:false
    }    
    constructor(props:ISearchSelectorProps){   
        super(props)
        this.state ={
            showOption:false,
            selectOption:{value:this.props.defaultvalue || '',text:''},
            searchContent:'',
            temp_activeIndex:0,
            isShowInput:false
        }
        this.options = []
        this.innerClick = false
        this.hideOptionFun = this.hideOption.bind(this)
    }
    refs:any
    hideOption(){
        // console.log('false')
		this.handle = setTimeout(()=>{
            console.log(this)
            if(!this.innerClick){
                console.log('false')
                this.setState({showOption:false})
            }
            this.handle = null
            this.innerClick = false           
        }, 50)
    }
    getSelectOption(props:ISearchSelectorProps,isAllChildren:boolean){
        //找到选中项在options中的位置(全局和筛选)
        let children = isAllChildren ? (Array.isArray(props.children) ? props.children : [props.children]).filter((child:any) => child!=null ) : this.options
        let temp_activeIndex = 0
        let {selectOption}= this.state
        let value = props.value || this.state.selectOption.value
        for(let i=0;i<children.length;i++){
            if(children[i].props.value == value){
                temp_activeIndex = i
                selectOption.value = children[i].props.value
                selectOption.text = children[i].props.children
                break
            }
        }
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
        this.options = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child:any) => child!=null )
        // debugger
        let {selectOption,temp_activeIndex} = this.getSelectOption(this.props,true)
        if(selectOption.value != ''){
            this.setState({selectOption,searchContent:'',temp_activeIndex})      
        }
        // if(document.addEventListener){
        //     document.addEventListener('click',this.hideOptionFun)
        // }
    }
    componentWillReceiveProps(nextprops:ISearchSelectorProps){
        // //受控情况下
        if(this.props.onChange && !this.props.onSearch){//
            let isAllChildren = false  
            if(this.props.clickInputEmpty){//清空 
                isAllChildren = true
            }
            let {selectOption,temp_activeIndex} = this.getSelectOption(nextprops,isAllChildren)
            if(selectOption.value != ''){
                this.setState({selectOption,temp_activeIndex})    //searchContent:selectOption.text,  
            }
        }       
    }
    componentWillUnmount(){
		clearTimeout(this.handle)
		this.handle = null
        let wrap =  this.refs.wrap
        // if(document.removeEventListener)  {
        //     document.removeEventListener('click',this.hideOptionFun)         
        // }       
    }

    handlerTextClick(){
        //更改showOption
        this.innerClick = true
        let showOption = !this.state.showOption
        this.setState({showOption})  
        //有text框时，input清空
        if(!this.props.displaySearchInput ){// && this.props.clickInputEmpty
            this.setState({showOption,isShowInput:true})
            if(this.props.clickInputEmpty){
                this.setState({showOption,searchContent:"",isShowInput:true})                
            }
        }
    }
    handlerInputClick(){
        this.innerClick = true
        let showOption = true  
        this.setState({showOption})
        //无text框时，input清空    
        if(this.props.displaySearchInput ){//&& this.props.clickInputEmpty
            this.setState({showOption,isShowInput:true})//,isShowInput:true
            if(this.props.clickInputEmpty){
                this.setState({showOption,searchContent:"",isShowInput:true})                
            }
        }                  
    }
    handlerClickOption(obj:any,event:any){
        // debugger
        if(this.props.displaySearchInput){
            this.setState({isShowInput:false})
        }
        let selectOption = obj
        let showOption = false
        let result
        this.setState({showOption})
        if(typeof this.props.onChange == "function"){
            result = this.props.onChange(selectOption)
        }
        if(result !== false){
            // 不受控刷新
            let temp_activeIndex = this.state.temp_activeIndex              
            if(this.props.clickInputEmpty){
                //重新计算得到temp_active
                this.options = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child:any) => child!=null )
                this.options.map((item:any,i:number)=>{//temp_options
                    if(item.props.value == obj.value){
                        temp_activeIndex = i
                    }
                })
            }
            this.setState({selectOption,temp_activeIndex,isShowInput:false})
        }
        if(this.refs.myinput)
            this.refs.myinput.blur()       
    }
    handlerKeydownSelectorOption(event:any){
        // debugger
        let keyCode = event.keyCode
        let {temp_activeIndex} =  this.state
        if(keyCode == '38'){
            if(temp_activeIndex > 0){
                temp_activeIndex --
            }
            this.setState({showOption:true,temp_activeIndex})
        }else if(keyCode == '40'){
            if(temp_activeIndex < this.options.length-1){//temp_options
                temp_activeIndex ++
            }
            this.setState({showOption:true,temp_activeIndex})
        }else if(keyCode == '13'){
            let child = this.options[this.state.temp_activeIndex]//temp_options
            let obj = this.getOptionObject(child)
            this.handlerClickOption(obj,null)
        }else{
            return
        }
        event.preventDefault()
    }
    scrollTo(index:number){
        if(this.refs.optionsWrap){
            this.refs.optionsWrap.scrollTop = (this.state.temp_activeIndex*40)
        }  
    }
    componentDidUpdate(){
        this.scrollTo(this.state.temp_activeIndex)
    }
    renderOptions(){
        //根据searchContent得到children的过滤，选中项？？？
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
                        value,text,key:i,
                        index:options.length,
                        indent:(displaySearchInput || false),
                        onClick:this.handlerClickOption.bind(this,{value,text,i}),
                    }))
                }
            })
            this.options = options
            //onSearch显示问题,当搜索内容为空时，全部不显示，与一般不同（一般为全部显示）
            if(this.props.onSearch && searchContent == ''){
                options = []
            }
            if(options.length == 0) {
                return <div className={classnames(`${nprefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
            }
            return <div className={classnames(`${nprefix}-options`)}  ref='optionsWrap' style = {{maxHeight:showMaxCount*40}} >{options}</div>
        }
        return null
    }
    handlerChangeSearchContent(event:any){
        this.setState({showOption:true,searchContent:event.target.value,temp_activeIndex:0,isShowInput:true}) 
        if(this.props.onSearch && typeof this.props.onSearch == 'function') {
            this.props.onSearch(event.target.value)
        }       
    }
    renderInput(){
        let icon = <img src={require('./images/icon_search.png')} alt='图标'/>
        let {displaySearchInput,placeholder} = this.props
        let {searchContent,isShowInput} = this.state        
        let displaySearchInputContainerStyle:React.CSSProperties ={}
        let inputStyle:React.CSSProperties = {}
        if(!displaySearchInput){
            assign(displaySearchInputContainerStyle,{border:'1px solid grey',margin:'0 10px'})
            assign(inputStyle,{paddingLeft:'10px'})
        } 
        //’input不是输入搜索状态时，显示选中项
        if(!isShowInput){       
            let {selectOption,temp_activeIndex} = this.getSelectOption(this.props,true)
            searchContent = selectOption.text
        }
        if(displaySearchInput ||(!displaySearchInput && this.state.showOption)) {
            return(
                <div className={classnames(`${nprefix}-input`)} style={displaySearchInputContainerStyle}>
                    <input ref='myinput'  type="text" autoFocus
                            placeholder={(displaySearchInput && placeholder) || (!displaySearchInput &&"搜索")} 
                            style= {inputStyle}
                            onChange={this.handlerChangeSearchContent.bind(this)}
                            onClick={this.handlerInputClick.bind(this)} 
                            value={searchContent} 
                            onKeyDown={this.handlerKeydownSelectorOption.bind(this)}
                            />
                    <span className={`${nprefix}-icon-container`}>{icon}</span>
                </div>              
            )
        }
        return null
    }
    renderText(){
        //受控：props.value确定的值，不受控：this.state.selectOption      
        let {selectOption,temp_activeIndex} = this.getSelectOption(this.props,true)
        let {extraClassName,displaySearchInput,style} = this.props
        let text = this.props.value ? selectOption.text:(this.state.selectOption != null ? this.state.selectOption.text:null)  
        if(!displaySearchInput){
            return(
                <div className={classnames(`${nprefix}-text`)} onClick={this.handlerTextClick.bind(this)}>{text||this.props.placeholder}</div> 
            )
        }
        return null
    }
    show(){
        console.log('true')
        this.innerClick = true
    }
    render(){
        let {extraClassName,displaySearchInput,style} = this.props
        return(
            <Document onClick={this.hideOption.bind(this)}>
            <div ref='wrap'  className={classnames(`${nprefix}`,(!displaySearchInput)&&((this.state.showOption && `${nprefix}-arrowUp`)||(!this.state.showOption && `${nprefix}-arrowDown`)),extraClassName)} 
             style = {style} >
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