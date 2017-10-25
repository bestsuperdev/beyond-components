import React = require('react')
import ReactDOM = require('react-dom')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'
export interface IContentProps extends IBaseProps  {
    reverse? : boolean;
}

const Content = (props : IContentProps)=> {
    let _prefix = props.prefix || prefix
    let className = `${_prefix}notification-content`
    let {style,extraClassName,reverse,children} = props
    return <div style={style} className={classnames(className,extraClassName,reverse && `${className}-reverse`)}>{children}</div>
} 

export default Content