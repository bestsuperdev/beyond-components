import * as React from 'react'
import * as classnames from 'classnames'
import Placeholder from '../Placeholder'
const prefix ="searchSelector"
interface OptionProps{
    value?:string,
    text?:string,
    selected?:boolean,
    onClick?:()=>void,
    key?:number,
    matchValue?:string,
    indent?:boolean
}
class Option extends React.Component<OptionProps,{}>{
    getSeparateString(matchValue:string,str:string){
        let startX = str.indexOf(matchValue)
        let len = matchValue.length
        let strBegin = str.substring(0,startX)
        let strEnd = str.substr(startX+len) 
        return{strBegin,strEnd}
    }
    render(){
        let {matchValue,indent} = this.props
        console.log(indent)
        let text = this.props.text||this.props.children
        // console.log(matchValue)
        // console.log(text)
        if(matchValue){
            // debugger
            let strObj = this.props.matchValue && this.getSeparateString(matchValue,this.props.text) //{!matchValue && text}
            return(
                <div className={classnames(`${prefix}-option`,indent &&'text-ind10')}  onClick={this.props.onClick} key={this.props.key && this.props.key}>
                    {(matchValue &&(<div>{strObj.strBegin}<b>{matchValue}</b>{strObj.strEnd}</div>))||text}   
                </div>
            )
        }else{
            return(
                <div className={classnames(`${prefix}-option`,indent &&'text-ind10')}  onClick={this.props.onClick} key={this.props.key && this.props.key}>
                    {text}   
                </div>  
            )        
        }

    }
}
interface ISearchSelectorProps{
    extraClassName?:string,
    // children?:any,
    placeholder?:string,
    // defaultSelect?:boolean,
    onChange?:(data:any)=>void,
    // icon?:boolean,
    extraTextClass?:string,
    showMaxCount?:number,
    withoutText?:boolean,
    searchFun?:(searchValue:string)=>void,
    clickInputEmpty?:boolean
}
interface ISearchSelectorState{
    showOption?:boolean,    
    selectOption?:any,
    searchContent?:string,
    searchOptions?:any[]
}
class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
    public handle:any
    public innerClick:boolean
    public options :any[]  
    private hideOptionFun:()=>void
    static defaultProps:ISearchSelectorProps ={
        showMaxCount:3,
        clickInputEmpty:false,
        withoutText:false
    }    
    constructor(props:ISearchSelectorProps){   
        super(props)
        this.state ={
            showOption:false,
            selectOption:{value:'',text:''},
            searchContent:'',
            searchOptions:[],
        }
        this.options = []
        this.innerClick = false
        this.hideOptionFun = this.hideOption.bind(this)
    }
    refs:{
        wrap:any
    }
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
        let selectOption = this.getDefaultSelect(this.props)
        console.log(selectOption)
        let options = this.getOptions(this.props)
        if(selectOption != null){
            let searchContent =selectOption.text            
            this.setState({selectOption,searchContent,searchOptions:this.options})//,options       
        }else {
          this.setState({searchOptions:this.options})//,options
        }
        let wrap =  this.refs.wrap    
        if(document.addEventListener){
            document.addEventListener('click',this.hideOptionFun)
        }
    }
    componentWillReceiveProps(nextprops:any){
        if(this.props.searchFun) {
            let options = this.getOptions(nextprops)          
            this.setState({searchOptions:this.options})//selectOption, searchContent,        
            if(document.addEventListener){
                document.addEventListener('click',this.hideOptionFun)
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
    getOptions(props:any){
        let children = (Array.isArray(props.children) ? props.children : [props.children]).filter((child:any) => child!=null )
        let {withoutText} = this.props
        console.log(withoutText)
        let options:any[] =[]
        let indent = (withoutText || false)
        children = children.map((child:any,i:number)=>{
            let {value,text} = this.getOptionObject(child)
            options.push(React.cloneElement(child,{value,text,key:i,onClick:this.handlerClickOption.bind(this,{value,text,i}),indent}))          
        })
        this.options = options
        return options        
    }
    handlerTextClick(){
        let showOption = !this.state.showOption
        this.innerClick = true
        let searchOptions = this.options
        if(this.props.clickInputEmpty){
            this.setState({showOption,searchContent:"",searchOptions})
        }else{
            this.setState({showOption,searchOptions})
        }
    }
    handlerInputClick(){
        let showOption = true
        this.innerClick = true
        let searchOptions = this.options
        if(this.props.clickInputEmpty){
            this.setState({showOption,searchContent:"",searchOptions})
        }else{
            this.setState({showOption,searchOptions})
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
        if(this.props.withoutText) {
            this.setState({showOption,selectOption,searchContent:obj.text})//,searchContent,searchOptions
        }else{
            this.setState({showOption,selectOption})
        }
    }
    renderOptions(){
        let {showMaxCount,withoutText} = this.props
        if(this.state.showOption){
            let options = this.state.searchOptions
            if(options.length == 0) {
                return <div className={classnames(`${prefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
            }
            return <div className={classnames(`${prefix}-options`)}  style = {{maxHeight:showMaxCount*40}}>{options}</div>
        }else{
            // debugger
            return null
        }
    }
    getMatchOptions(matchValue:any){
        console.log(this.props)
        let children = this.options
        let matchOptions:any[] =[]
        let matchNum = 0
        children = children.map((child,i)=>{
            let {value,text} = this.getOptionObject(child)
            let patt = new RegExp(matchValue,'ig')
            if(patt.exec(text) != null) {
                matchOptions.push(React.cloneElement(child,{key:matchNum,matchValue}))//,{value,text,key:i}
                matchNum++
            }            
        })
         return matchOptions
    }
    judgeMatchState(event:any){
        if(this.props.searchFun && typeof this.props.searchFun == 'function') {
            // debugger
            this.props.searchFun(event.target.value)
            this.setState({showOption:true,searchContent:event.target.value})  
        }else{
            let searchContent = event.target.value
            let searchOptions = this.getMatchOptions(event.target.value)
            console.log(searchOptions)
            this.setState({showOption:true,searchContent,searchOptions})  
        }       

    }
    renderInput(){
        let icon = <img src={require('./images/icon_search.png')} alt='图标'/>
        let{withoutText,placeholder} = this.props
        let {showOption} = this.state
        if(withoutText ||(!withoutText && showOption)) {
            return(
                <div className={classnames(`${prefix}-input`,!withoutText&&'mlr-10 bd')}>
                    <input placeholder={(withoutText &&placeholder)||(!withoutText &&"搜索")} type="text" onChange={this.judgeMatchState.bind(this)} value={this.state.searchContent} onClick={this.handlerInputClick.bind(this)}/>
                    <span className={`${prefix}-icon-container`}>{icon}</span>
                </div>              
            )
        }else{
            return null
        }
    }
    render(){
        // console.log(this.state.selectOption)
        let text = this.state.selectOption != null ? this.state.selectOption.text:null
        let {extraClassName,withoutText} = this.props
        return(
            <div ref='wrap' className={classnames(`${prefix}`,this.state.showOption && `border-bottom-none`,(!withoutText)&&((this.state.showOption && `${prefix}-arrowUp`)||(!this.state.showOption && `${prefix}-arrowDown`)),extraClassName)}>  
                {!withoutText &&
                    (<div className={classnames(`${prefix}-text`)} onClick={this.handlerTextClick.bind(this)}>{text||this.props.placeholder}</div>)}
                {this.renderInput()}
                {this.renderOptions()}                    
            </div>              
        )
    }
}
export {Option,SearchSelector}