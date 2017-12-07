import * as React from 'react'
import classnames = require('classnames')
import { prefix, IBaseProps } from '../consts'
export interface IContentProps extends IBaseProps  {
	reverse? : boolean;
}

// tslint:disable-next-line:variable-name
const Content = (props : IContentProps)=> {
	let _prefix = `${props.prefix || prefix}notification-content`
	let {style,extraClassName,reverse,children} = props
	let className = classnames(_prefix,reverse && `${_prefix}-reverse`,extraClassName)
	return <div style={style} className={className}>{children}</div>
} 

export default Content