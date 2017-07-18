import * as React from 'react'
import * as classnames from 'classnames'
import Placeholder from '../Placeholder'
const prefix ="searchSelector"
interface OptionProps{
    value?:string,
    selected?:boolean,
}
class Option extends React.Component<OptionProps,{}>{
    render(){
        return(
            <div className={`${prefix}-option`} value={this.props.value}>{this.props.children}</div>
        )
    }
}
interface optionData{
    value:string,
    text:string
}
interface ISearchSelectorProps{
    extraClassName?:string,
    children?:any,
    placeholder?:string,
    defaultSelect?:boolean,
    onChange?:(data:optionData)=>void,
    icon?:boolean,
    extraTextClass?:string,
    type?:string,
    showMaxCount?:number,
    // placeholder?:string
}

interface ISearchSelectorState{
    showOption?:boolean,    
    selectOption?:optionData,
    searchContent?:string,
    // options?:optionData[],
    searchOptions?:optionData[]
}
class SearchSelector extends React.Component<ISearchSelectorProps,ISearchSelectorState>{
    public handle:any
    public innerClick:boolean
    public options :optionData[]  
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
        // debugger
        let selectOption = this.getDefaultSelect()
        let options = this.getOptions()
        this.options = options
        this.setState({selectOption,searchOptions:this.options})//,options
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

    getDefaultSelect(){
        // console.log(typeof this.props.children)
        // console.log([this.props.children])
        let children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child) => child!=null )
        console.log(children)
        if(this.props.defaultSelect){
            let selectChildren = children.filter((child) =>  child.props.selected === true)
            let selectChild = selectChildren[0] || null
            let result = selectChild
            let selectObj ={value:'',text:''}
            selectObj.text = selectChild.props.children
            selectObj.value =selectChild.props.value
            if(this.props.onChange !== undefined){
                this.props.onChange(selectObj)
            }
            return selectObj  
        }else{
            return null
        }
              
       
    }

    getOptions(){
        let children = (Array.isArray(this.props.children) ? this.props.children : [this.props.children]).filter((child) => child!=null )
        let options =[]
        for(let i=0;i<children.length;i++){
            let option = {value:'',text:''}
            option.text = children[i].props.children
            option.value = children[i].props.value
            options.push(option)
        }
        return options
    }

    handlerTextClick(){
        let showOption = true
        this.innerClick = true
        // console.log('search   ' +this.state.searchContent)
        // console.log('search   ' +this.state.searchOptions)
        this.setState({showOption})
    }

    handlerClickOption(obj:any,event:any){
        // debugger
        // console.log(obj)
        // console.log(event)
        let selectOption = obj
        let showOption = false
        if(this.props.onChange !== undefined && typeof this.props.onChange == "function"){
            this.props.onChange(selectOption)
        }
        let searchContent = obj.text
        let searchOptions = []
        searchOptions.push(selectOption)
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
			let children = options.map((child,i)=>{
                console.log(child)
                // console.log(i)
				// let {text,value,display} = getOptionObject(child)
				// return React.cloneElement(child,{onClick : this.handleClick.bind(this,text,value)})
                // return React.cloneElement(child, {onClick : this.handlerClickOption.bind(this),key:i})
                let value = child.value
                let text = child.text
                let object = {value,text}
                let icon = null
                if(this.state.selectOption != null)
                    icon = this.props.icon && child.value == this.state.selectOption.value ? <img src='../src/images/icon_search_selected.png' alt='图标'/>:null
                return <div className={classnames(`${prefix}-option`)} key={i} onClick={this.handlerClickOption.bind(this,object)}>{child.text}{icon}</div>
			})

            if(children.length == 0) {
                return <div className={classnames(`${prefix}-no-options`)}>No results match "{this.state.searchContent}"</div>
            } 
            console.log(children)                      
            return <div className={classnames(`${prefix}-options`)}  style = {{maxHeight:showMaxCount*40}}>{children}</div>
        }else{
            // debugger
            return null
        }
    }
    getMatchOptions(matchValue:any){
        if(matchValue.length == 0){
            return this.options
        }else{
            let options = this.options
            let patt = new RegExp(matchValue,'ig')
            let result = null
            let matchFlag = false
            let matchOptions=[]
            for(let i=0;i<options.length;i++){
                result = patt.exec(options[i].text)
                if(result != null){
                   matchOptions.push(options[i])
                }       
            }
            return matchOptions
        }
    }
    judgeMatchState(event:any){
        let searchContent = event.target.value
        let searchOptions = this.getMatchOptions(event.target.value)
        console.log(searchOptions)
        // if(searchOptions.length != 0){
            this.setState({showOption:true,searchContent,searchOptions})
        // }else{
            // this.setState({showOption:true,searchContent,searchOptions})
        // }   
    }
    render(){
        // this.getDefaultSelect()
        console.log(this.state.selectOption)
        // <div className={classnames(`${prefix}-text`,this.props.extraTextClass)} onClick={this.handlerTextClick.bind(this)}>{text}</div>
        let text = this.state.selectOption == null ? null:this.state.selectOption.text
        let {extraClassName,extraTextClass,type} = this.props
        // let icon = <img src='../src/images/icon_search_selected.png' alt='图标'/>
        if(type == '1'){
            return(
                <div ref='wrap' className={classnames(`${prefix}`,this.state.showOption && `border-bottom-none`,extraClassName)}>  
                    <Placeholder>
                        <input placeholder={this.props.placeholder} style={{spellCheck:false}} onChange={this.judgeMatchState.bind(this)} value={this.state.searchContent} onClick={this.handlerTextClick.bind(this)} />
                    </Placeholder>
                    {this.renderOptions()}
                </div>
            )
        }else if(type == '2'){
            return(
                <div ref='wrap' className={classnames(`${prefix}`,this.state.showOption && `border-bottom-none`,extraClassName)}>  
                    <div className={classnames(`${prefix}-text`,this.props.extraTextClass)} onClick={this.handlerTextClick.bind(this)}>{text}</div>
                    <input onChange={this.judgeMatchState.bind(this)} value={this.state.searchContent}/>
                    {this.renderOptions()}                    
                </div>                
            )
        }

    }

}
export {Option,SearchSelector}