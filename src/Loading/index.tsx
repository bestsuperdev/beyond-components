/*
<Loading  message={"正在加载中。。。"} maxShowTime={10}>
*/

import React = require('react')
import ReactDOM = require('react-dom')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'

// const nprefix = 'beyond-loading'

export interface ILoadingProps {
    message?:string,
    maxShowTime?:number,
}
export interface ILoadingState{
    rotate?:number,
    hidden:boolean
}

export default class Loading extends React.Component<ILoadingProps,ILoadingState>{
	static getInstance(loading : JSX.Element){
		if(loading){
			let wrap = document.createElement('div')
			document.body.appendChild(wrap)
			let handle = ReactDOM.render(loading,wrap) as Loading
		}
        return ({
            hide(){
                this.hide()  
            }
        })
	}    
    constructor(props:ILoadingProps){
        super(props)
        this.state = {
            rotate:0,
            hidden:false
        }
        this.hiddenFlag = false
        this.boxWidth = 0
    }

    public hiddenFlag:boolean
    public boxWidth:number

 	getBoxWidth(){
		let box = ReactDOM.findDOMNode(this)
        this.boxWidth = box.clientWidth	
        if(this.boxWidth > 375) {
            this.boxWidth = 375
        }
		return this.boxWidth
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
            setTimeout(this.hide.bind(this),this.props.maxShowTime*1000)
        }
        window.addEventListener('resize',this.resizeWith.bind(this))

    }
    hide(){
        this.setState({hidden:true})
    }
    componentWillUnmount(){
        this.hiddenFlag = false
         window.removeEventListener('resize',this.resizeWith.bind(this))
    }
    render(){
        let {message} =this.props 
        let nprefix =`${prefix}loading`      
        if( !this.state.hidden){
            return(
                <div className={`${nprefix}`} style={{fontSize:14}}>
                    <div className={`${nprefix}-content`} style={{width:this.boxWidth*0.4,minHeight:this.boxWidth*0.4}}>
                        <div className={`${nprefix}-image`} style={{width:this.boxWidth*0.2,height:this.boxWidth*0.2}}>
                            <img src={require('./images/loading.jpg')} />
                        </div>
                        <div className={`${nprefix}-message`}>{message}</div>
                    </div>           
                </div>
                )
        }else{
            return null
        }

    }

}

