/*
import Tabs , {Tab} from 'beyond-components'

<Tabs activeKey="1" >
	<Tabs.Tab disabled key="1">1</Tabs.Tab>
	<Tabs.Tab key="2" eventType="">2</Tab>
	<Tabs.Tab key="3" onChange={}>3</Tab>
</Tabs>
 */
import classnames = require('classnames')
import * as React from 'react'
import { prefix, IBaseProps } from '../consts'


export interface ITabProps extends IBaseProps {
	title : string;
	disabled? : boolean;
}


export interface ITabsProps extends IBaseProps {
	defaultActiveKey? : string;
	activeKey? : string;
	onChange? : (key : string)=> void | boolean;
}

export interface ITabsState {
	activeKey : string;
}

type TabElement = React.ReactElement<ITabProps>

// tslint:disable-next-line:variable-name
export const Tab = ()=> <div></div>

export default class Tabs extends React.Component<ITabsProps,ITabsState> {

	static defaultProps : ITabsProps = {
		prefix 
	}

	state : ITabsState

	constructor(props : ITabsProps){
		super(props)
		this.state = {
			activeKey : props.defaultActiveKey || ''
		}
	}

	
	getActiveKey(){
		return this.props.activeKey || this.state.activeKey
	}

	render() {
		const {prefix : _prefix, extraClassName, style} = this.props
		let className = `${_prefix}tabs`
		return (
			<div style={style} className={classnames(className,extraClassName)}>
				{this.renderNavs()}
				{this.renderTabs()}
			</div>
		)
	}

	renderNavs(){
		let children : TabElement[]
		const {children : _children,prefix : _prefix} = this.props
		const activeKey = this.getActiveKey()

		let className = `${_prefix}tabs`
		if(!_children){
			children = []
		}else if(!Array.isArray(_children)){
			children = [_children as TabElement]
		}else{
			children = _children as TabElement[]
		}
		const navs = children.filter((child)=> child != null ).map((child)=>{
			const {title,disabled} = child.props
			let navClassName = classnames(`${className}-nav`,{ active : child.key === activeKey })
			return (
				<li key={child.key} 
					className={navClassName} 
					onClick={disabled ? null : this.handlerClick.bind(this,child.key)}>
					{title}
				</li>
			)
		})
		return <ul className={`${className}-navs`}>{navs}</ul>
	}


	renderTabs(){
		// let children : TabElement[]
		let {children, prefix : _prefix} = this.props
		const activeKey = this.getActiveKey()
		let className = `${_prefix}tabs`
		if(!children){
			children = []
		}else if(!Array.isArray(children)) {
			children = [children]
		}
		const panes = (children as  TabElement[] ).filter((child)=> child != null).map((child)=>{ 
			// tslint:disable-next-line:triple-equals
			const active = activeKey == child.key
			return <div key={child.key} className={classnames(`${className}-pane`,{active})}>{child.props.children}</div>
		})
		return <div className={`${className}-panes`}>{panes}</div>
	}

	handlerClick(activeKey : string){
		let result
		if(typeof this.props.onChange === 'function'){
			result = this.props.onChange(activeKey)
		}
		if(result !== false){
			this.setState({activeKey})
		}
	}
}


