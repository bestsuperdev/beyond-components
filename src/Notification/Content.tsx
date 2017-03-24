import React = require('react')
import ReactDOM = require('react-dom')
import classnames = require('classnames')
import {prefix} from '../consts'
const contentClassName = `${prefix}notification-content`
export interface IContentProps  {
    className? : string;
    extraClassName? : string;
    reverse? : boolean;
    children? : any;
    style? : object;
}

const Content = (props : IContentProps)=> {
    let className = props.className || contentClassName
    
    return <div style={props.style} className={classnames(className,props.extraClassName,props.reverse && `${className}-reverse`)}>{props.children}</div>
} 

export default Content