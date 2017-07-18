import * as React from 'react'
import * as classnames from 'classnames'
import Placeholder from '../Placeholder'
const prefix ="searchSelector"
interface OptionProps{
    value?:string,
    text?:string,
    selected?:boolean,
    onClick?:()=>void,
    key?:number
}
class Option extends React.Component<OptionProps,{}>{
    render(){
        console.log(this)
        console.log(this.props)
        return(
            <div className={`${prefix}-option`} value={this.props.value} onClick={this.props.onClick} key={this.props.key && this.props.key}>{this.props.text||this.props.children}</div>
        )
    }
}
interface ISearchSelectorProps{
    extraClassName?:string,
    children?:any,
    placeholder?:string,
    defaultSelect?:boolean,
    onChange?:(data:any)=>void,
    icon?:boolean,
    extraTextClass?:string,
    type?:string,
    showMaxCount?:number,
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
    public options :any[]//optionData[]  
    private hideOptionFun:()=>void
    static defaultProps:ISearchSelectorProps ={
        showMaxCount:3
    }    
    constructor(props:ISearchSelectorProps){   
        super(props)
        this.state ={
            showOption:false,
            selectOption:{value:'',text:''},
            searchContent:'',
            // options:[],
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

    componentWillUnmount(){
		clearTimeout(this.handle)
		this.handle = null
        let wrap =  this.refs.wrap
        if(document.removeEventListener)  {
            document.removeEventListener('click',this.hideOptionFun)         
        }       
    }

    getDefaultSelect(props:any){
        // console.log(typeof this.props.children)
        // console.log([this.props.children])
        let children = (Array.isArray(props.children) ? props.children : [props.children]).filter((child:any) => child!=null )
        // console.log(children)      
        let selectChildren = children.filter((child:any) =>  child.props.selected === true)
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
        let options:any[] =[]
        children = children.map((child:any,i:number)=>{
            let {value,text} = this.getOptionObject(child)
            options.push(React.cloneElement(child,{value,text,key:i,onClick:this.handlerClickOption.bind(this,{value,text,i})}))          
        })
        this.options = options
        return options        
    }
    handlerTextClick(){
        let showOption = !this.state.showOption
         this.innerClick = true
         let searchOptions = this.options
         let searchContent =""
         this.setState({showOption,searchContent,searchOptions})
    }
    handlerInputClick(){
        let showOption = true
        this.innerClick = true
        let searchOptions = this.options
        let searchContent =""
        this.setState({showOption,searchContent,searchOptions})
    }

    handlerClickOption(obj:any,event:any){
        // debugger
        // console.log(obj)
        console.log(event)
        let selectOption = obj
        let showOption = false
        if(this.props.onChange !== undefined && typeof this.props.onChange == "function"){
            this.props.onChange(selectOption)
        }
        let searchContent = obj.text
        let searchOptions = []
        searchOptions.push(this.options[obj.i])
        this.setState({selectOption,showOption,searchContent,searchOptions})
    }
    renderOptions(){
        console.log(this.state.searchOptions)
        console.log(this.options)
        console.log(this.state.showOption)
        let {showMaxCount} = this.props
        if(this.state.showOption){
            let options = this.state.searchOptions
            console.log(options)
            if(options.length == 0) {
                return <div className={classnames(`${prefix}-no-options`,this.props.type == "2" &&"bd-none"&&'bd-bt',this.props.type == "1" &&"bd-top-none")}>No results match "{this.state.searchContent}"</div>
            }
            return <div className={classnames(`${prefix}-options`,this.props.type == "2" &&"plr-10")}  style = {{maxHeight:showMaxCount*40}}>{options}</div>
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
            console.log(value+"" +text)
            let patt = new RegExp(matchValue,'ig')
            if(patt.exec(text) != null) {
                matchOptions.push(React.cloneElement(child,{key:matchNum}))//,{value,text,key:i}
                matchNum++
            }            
        })
         return matchOptions
    }
    judgeMatchState(event:any){
        let searchContent = event.target.value
        let searchOptions = this.getMatchOptions(event.target.value)
        console.log(searchOptions)
        this.setState({showOption:true,searchContent,searchOptions})  
    }
    render(){
        console.log(this.state.selectOption)
        let text = this.state.selectOption != null ? this.state.selectOption.text:null
        // console.log(text)
        let {extraClassName,extraTextClass,type} = this.props
        let icon = <img src={require('./images/icon_search.png')} alt='图标'/>
        if(type == '1'){
            return(
                <div ref='wrap' className={classnames(`${prefix}`,this.state.showOption && `border-bottom-none`,`bd-none`,extraClassName)}>  
                    <Placeholder>
                        <div className={classnames(`${prefix}-input`)}>
                            <input type="text" style={{textDecoration:"none"}}  placeholder={this.props.placeholder}  onChange={this.judgeMatchState.bind(this)} value={this.state.searchContent} onClick={this.handlerInputClick.bind(this)} />
                            <span className={`${prefix}-icon-container`}>{icon}</span>
                        </div>
                    </Placeholder>
                    {this.renderOptions()}
                </div>
            )
        }else if(type == '2'){
            return(
                <div ref='wrap' className={classnames(`${prefix}`,this.state.showOption && `border-bottom-none`,(this.state.showOption && `${prefix}-arrowUp`)||(!this.state.showOption && `${prefix}-arrowDown`),extraClassName)}>  
                    <div className={classnames(`${prefix}-text`,this.props.extraTextClass)} onClick={this.handlerTextClick.bind(this)}>{text||this.props.placeholder}</div>
                    <div className={classnames(`${prefix}-input`,'mlr-10')}>
                        {this.state.showOption && <input type="text" onChange={this.judgeMatchState.bind(this)} value={this.state.searchContent} onClick={this.handlerInputClick.bind(this)}/>}
                        {this.state.showOption && <span className={`${prefix}-icon-container`}>{icon}</span>}
                    </div>
                    {this.renderOptions()}                    
                </div>                
            )
        }
    }
}
export {Option,SearchSelector}