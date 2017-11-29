/*
<Loading  message={"正在加载中。。。"} maxShowTime={10}>
*/

import React = require('react')
import ReactDOM = require('react-dom')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'

export interface ILoadingProps extends IBaseProps {
    duration?:number;
}

export interface ILoadingState{}

export default class Loading extends React.Component<ILoadingProps,ILoadingState>{
	static getInstance(){

        let wrap : HTMLDivElement,handle : number
        return {
            show(message : any, props?:ILoadingProps){
                if(!wrap){
                    wrap = document.createElement('div')
                    document.body.appendChild(wrap)
                }
                if(handle != null){
                    clearTimeout(handle)
                    handle = null
                }
                ReactDOM.render(<Loading {...props}>{message}</Loading>,wrap)
                if(props.duration){
                    handle = setTimeout(this.hide,props.duration * 1000 )
                }
            },
            hide(){
                if(wrap){
                    ReactDOM.unmountComponentAtNode(wrap)
                }
                if(handle != null){
                    clearTimeout(handle)
                    handle = null
                }
            }
        }
    }
    
    constructor(props:ILoadingProps){
        super(props)
    }
 
    render(){
        let {style,children} = this.props 
        let nprefix =`${prefix}loading`      
        return(
            <div className={`${nprefix}`}>
                <div className={`${nprefix}-content`}>
                    <img src={require('./images/loading.png')} />
                    <div className={`${nprefix}-message`}>{children}</div>
                </div>     
            </div>
        )
    }
}

