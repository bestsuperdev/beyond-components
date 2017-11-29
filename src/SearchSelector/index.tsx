import * as React from 'react'
import * as classnames from 'classnames'
import Placeholder from '../Placeholder'
import Document from '../Document'
import { prefix, IBaseProps } from '../consts'
import assign = require("beyond-lib/lib/assign")
const nprefix = `${prefix}searchSelector`
export interface OptionProps{
    value?:string,
    text?:string,
    onClick?:()=>void,
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
        return(
            <div>{str.substring(0,startX)}<b>{matchValue}</b>{str.substr(startX+matchValue.length)}</div>
        )
    }
    render(){
        let {matchValue,indent,index,activeIndex,text} = this.props
        console.log(activeIndex)        
        let _style = indent?{}:assign({},{textIndent:'20px'})
        return(
            <div className={classnames(`${nprefix}-option`,activeIndex == index && 'active')} style={_style} onClick={this.props.onClick}>
                {( this.renderText(matchValue,text))||this.props.text}      
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
    children?:JSX.Element[],
    loadOptions?:SelectUnit[]   
}
type SelectUnit={
    value?:string,
    text?:string
}
export interface ISearchSelectorState{
   isShowOption ?:boolean,    
    selectOption?:SelectUnit,
    searchContent?:string,
    temp_activeIndex?:number,
    isShowInput?:boolean,
    clearOptions?:boolean
}
export default class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
    public options :any[]  
    static defaultProps:ISearchSelectorProps ={
        showMaxCount:3,
        displaySearchInput:false
    }    
    constructor(props:ISearchSelectorProps){   
        super(props)
        this.state ={
            isShowOption:false,
            selectOption:{value:this.props.defaultvalue || '',text:''},
            searchContent:'',
            temp_activeIndex:0,
            isShowInput:false,
            clearOptions:false
        }
        this.options = []
    }
    refs:any
    handlerOutClick(){
        this.setState({isShowOption:false})
    }
    getSelectOption(props:ISearchSelectorProps,isAllOptions:boolean){
        //找到选中项在options中的位置(全局和筛选)
        let children = isAllOptions ? (Array.isArray(props.loadOptions) ? props.loadOptions : [props.loadOptions]).filter((child:any) => child!=null ) : this.options        
        let temp_activeIndex = 0
        let {selectOption}= this.state
        let value = props.value || selectOption.value
        for(let i=0;i<children.length;i++){
            if(children[i].value == value){
                temp_activeIndex = i
                selectOption = children[i]
                break
            }
        }
        return {selectOption,temp_activeIndex} 
    }
    componentDidMount(){
        console.log('did')
        this.options = (Array.isArray(this.props.loadOptions) ? this.props.loadOptions : [this.props.loadOptions]).filter((child:any) => child!=null )    
        let {selectOption,temp_activeIndex} = this.getSelectOption(this.props,true)
        this.setState({selectOption,searchContent:'',temp_activeIndex})      
    }
    componentWillReceiveProps(nextprops:ISearchSelectorProps){
        //受控情况下
        if(this.props.onChange && !this.props.onSearch){//&& !this.props.onSearch
            let isAllChildren = false  
            if(this.props.clickInputEmpty){//清空 
                isAllChildren = true
            }
            let {selectOption,temp_activeIndex} = this.getSelectOption(nextprops,isAllChildren)
            this.setState({selectOption,temp_activeIndex})
        }else if(this.props.onSearch){//this.props.onChange && 
            let {selectOption,temp_activeIndex} = this.getSelectOption(nextprops,true)
            this.setState({selectOption,clearOptions:false})
        }       
    }
    
    handlerTextClick(){
        //更改isShowOption
        let isShowOption = !this.state.isShowOption
        this.setState({isShowOption})  
        //有text框时，input清空
        if(!this.props.displaySearchInput ){
            this.setState({isShowOption,isShowInput:true})
            if(this.props.clickInputEmpty){
                this.setState({isShowOption,searchContent:"",isShowInput:true})                
            }
        }
    }
    handlerInputClick(){
        let isShowOption = true  
        this.setState({isShowOption})
        //无text框时，input清空    
        if(this.props.displaySearchInput ){
            this.setState({isShowOption,isShowInput:true})
            if(this.props.clickInputEmpty){
                this.setState({isShowOption,searchContent:"",isShowInput:true})                
            }
        }                  
    }
    handlerClickOption(selectOption:SelectUnit,event:any){
        let result
        this.setState({isShowOption:false,isShowInput:false})        
        if(typeof this.props.onChange == "function"){
            result = this.props.onChange(selectOption)
        }
        console.log("result",result)
        if(result !== false){
            // 不受控刷新
            let temp_activeIndex = this.state.temp_activeIndex              
            if(this.props.clickInputEmpty){
                //重新计算得到temp_active
                this.options = (Array.isArray(this.props.loadOptions) ? this.props.loadOptions : [this.props.loadOptions]).filter((child:any) => child!=null )
                this.options.map((item:any,i:number)=>{
                    if(item.value == selectOption.value){
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
            this.setState({isShowOption:true,temp_activeIndex})
        }else if(keyCode == '40'){
            if(temp_activeIndex < this.options.length-1){
                temp_activeIndex ++
            }
            this.setState({isShowOption:true,temp_activeIndex})
        }else if(keyCode == '13'){
            let child = this.options[this.state.temp_activeIndex]
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
    renderOptions(){
        //根据searchContent得到children的过滤
        let {showMaxCount,displaySearchInput} = this.props
        let {searchContent,temp_activeIndex,selectOption,isShowOption,clearOptions} = this.state
        //调用函数获得options时，matchValue
        let matchValue = this.props.onSearch ? '' : searchContent
        console.log("clearOptions",clearOptions)
        let children = clearOptions?[]: (Array.isArray(this.props.loadOptions) ? this.props.loadOptions : [this.props.loadOptions]).filter((child:any) => child!=null )            
        if(isShowOption){
            let options:any[] = []
            let temp_options:any[] = []
                children.map((child:any,i:number)=>{
                    let {value,text} = child
                    let patt = new RegExp(matchValue,'ig')
                    if(patt.exec(child.text) != null) {
                        temp_options.push(child)
                        options.push(<Option
                        matchValue={matchValue}
                        activeIndex={temp_activeIndex}
                        value={value} text={text} key={i}
                        index={options.length}
                        indent={(displaySearchInput || false)}
                        onClick={this.handlerClickOption.bind(this,{value,text})}  />)                    
                    }
                })
                this.options = temp_options
                //onSearch显示问题,当搜索内容为空时，全部不显示，与一般不同（一般为全部显示）
                if(this.props.onSearch && searchContent == ''){
                    options = []
                }
                if(clearOptions){
                    return <div className={classnames(`${nprefix}-on-searching`)} >搜索中......</div>                        
                }
                if(!this.props.onSearch ||(this.props.onSearch &&!clearOptions)){
                    if(options.length == 0) {
                        return <div className={classnames(`${nprefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
                    }
                    return <div className={classnames(`${nprefix}-options`)}  ref='optionsWrap' style = {{maxHeight:showMaxCount*40}} >{options}</div>
                }

        }
        return null
    }
    handlerChangeSearchContent(event:any){
        this.setState({isShowOption:true,searchContent:event.target.value,temp_activeIndex:0,isShowInput:true}) 
        if(this.props.onSearch && typeof this.props.onSearch == 'function') {
            this.setState({clearOptions:true})
            this.props.onSearch(event.target.value)
        }       
    }
    renderInput(){
        let icon = <img src={require('./images/icon_search.png')} alt='图标'/>
        let {displaySearchInput,placeholder} = this.props
        let {searchContent,isShowInput,selectOption,isShowOption} = this.state        
        let displaySearchInputContainerStyle:React.CSSProperties = {}
        let inputStyle:React.CSSProperties = {}
        if(!displaySearchInput){
            assign(displaySearchInputContainerStyle,{border:'1px solid grey',margin:'0 10px'})
            assign(inputStyle,{paddingLeft:'10px'})
        } 
        //input不是输入搜索状态时，显示选中项
        if(!isShowInput){       
            searchContent = selectOption.text
        }
        if(displaySearchInput ||(!displaySearchInput && isShowOption)) {
            return(
                <div className={classnames(`${nprefix}-input`)} style={displaySearchInputContainerStyle}>
                    <input ref='myinput'  type="text" autoFocus
                            placeholder={(displaySearchInput && placeholder) || (!displaySearchInput &&"搜索")} 
                            style= {inputStyle}
                            onChange={this.handlerChangeSearchContent.bind(this)}
                            onClick={this.handlerInputClick.bind(this)} 
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
    render(){
        let {extraClassName,displaySearchInput,style} = this.props
        return(
            <Document onClick={this.handlerOutClick.bind(this)}>
                <div className={classnames(`${nprefix}`,(!displaySearchInput)&&((this.state.isShowOption && `${nprefix}-arrowUp`)||(!this.state.isShowOption && `${nprefix}-arrowDown`)),extraClassName)} style = {style}  >
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