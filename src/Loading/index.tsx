/*
<Loading  message={"正在加载中。。。"} maxShowTime={10}>
*/

import React = require('react')
import ReactDOM = require('react-dom')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'

export interface ILoadingProps {
    message?:string,
    maxShowTime?:number,
}
export interface ILoadingState{
    message?:string,
    maxShowTime?:number,
    rotate?:number,
    hidden:boolean
}

export default class Loading extends React.Component<ILoadingProps,ILoadingState>{
	static getInstance(loading : JSX.Element){
		if(loading){
			let wrap = document.createElement('div')
			document.body.appendChild(wrap)
			let handle = ReactDOM.render(loading,wrap) as Loading
            return {
                show(message?:string,showState?:ILoadingState){
                    handle.show(message,showState)
                },
                hide(){
                    // console.log("123")
                    handle.hide()                   
                }
            }
        }
	}    
    // public handle:any
    constructor(props:ILoadingProps){
        super(props)
        this.state = {
            rotate:0,
            hidden:false
        }
        this.hiddenFlag = false
        this.boxWidth = 0
        this.handler = null
    }
    public hiddenFlag:boolean
    public boxWidth:number
    public handler :any
 	getBoxWidth(){
        this.boxWidth = ReactDOM.findDOMNode(this).clientWidth	
        if(this.boxWidth > 375) {
            this.boxWidth = 375
        }
	} 
    resizeWith(){
        this.getBoxWidth()
        this.setState((props,state)=>state)
    }  
    componentDidMount(){
        this.getBoxWidth()
        this.setState((props,state)=>state)
        if(!this.hiddenFlag && this.props.maxShowTime){
            this.hiddenFlag = true
            this.handler =setTimeout(this.hide.bind(this),this.props.maxShowTime*1000)
        }
        window.addEventListener('resize',this.resizeWith.bind(this))

    }
    show(messageValue?:string,showState?:ILoadingState){
        let maxShowTime = showState?showState.maxShowTime : this.props.maxShowTime
        let message = messageValue|| this.props.message
        clearTimeout(this.handler)
        this.setState({hidden:false,message})        
        this.handler = setTimeout(this.hide.bind(this),maxShowTime*1000)
    }
    hide(){
        console.log("clear it")
        clearTimeout(this.handler)
        this.handler = null
        this.setState({hidden:true})
    }
    componentWillUnmount(){
        this.hiddenFlag = false
        window.removeEventListener('resize',this.resizeWith.bind(this))
    }
    render(){
        let {message} =this.props 
        message = this.state.message || message
        let nprefix =`${prefix}loading`      
        return(
            <div className={`${nprefix}`} style={{fontSize:14}}>
                {!this.state.hidden && <div className={`${nprefix}-content`} style={{width:this.boxWidth*0.4,minHeight:this.boxWidth*0.4}}>
                    <div className={`${nprefix}-image`} style={{width:this.boxWidth*0.2,height:this.boxWidth*0.2}}>
                        <img src={require('./images/loading.jpg')} />
                    </div>
                    <div className={`${nprefix}-message`}>{message}</div>
                </div> }          
            </div>
        )
    }
}

