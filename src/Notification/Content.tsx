import React = require('react')
import ReactDOM = require('react-dom')
import classnames = require('classnames')
export interface IContentProps  {
    className? : string;
    extraClassName? : string;
    reverse? : boolean;
    children? : any;
}

const Content = (props : IContentProps)=> {
    let className = props.className || 'notification-content'
    return <div {...props} className={classnames(className,props.extraClassName,props.reverse && `${className}-reverse`)}>{props.children}</div>
} 

export default Content