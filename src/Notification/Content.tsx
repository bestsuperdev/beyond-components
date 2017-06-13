import React = require('react')
import ReactDOM = require('react-dom')
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'
export interface IContentProps extends IBaseProps<HTMLDivElement>  {
    reverse? : boolean;
    children? : any;
    style? : object;
}

const Content = (props : IContentProps)=> {
    let _prefix = props.prefix || prefix
    let className = `${_prefix}notification-content`
    let {style,extraClassName,reverse,children} = props
    return <div style={style} className={classnames(className,extraClassName,reverse && `${className}-reverse`)}>{children}</div>
} 

export default Content