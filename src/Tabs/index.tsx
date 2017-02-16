/**
 
import Tabs , {Tab} from 'beyond-components'

<Tabs activeKey="1" >
    <Tabs.Tab disabled key="1">1</Tabs.Tab>
    <Tabs.Tab key="2" eventType="">2</Tab>
    <Tabs.Tab key="3" onChange={}>3</Tab>
</Tabs>
 */
import classnames = require('classnames')
import React = require('react')
import {prefix} from '../consts'
// import * as React  from 'react'

export interface ITabProps {
    navExtraClassName? : string;
    paneExtraClassName? : string;
    key : string;
    title : string;
    disabled? : boolean;
}

export interface ITabState {

}

export interface ITabsProps {
    defaultActiveKey? : string;
    activeKey? : string;
    onChange? : (key : string)=> void;
    className? : string;
    extraClassName? : string;
}

export interface ITabsState {
    activeKey : string;
}

type TabElement = React.ReactElement<ITabProps>

export class Tab extends React.Component<ITabProps,ITabState>{
    render(){
        return <div></div>
    }
}

export default class Tabs extends React.Component<ITabsProps,ITabsState> {

    static defaultProps : ITabsProps = {
        className : `${prefix}tabs`
    }

    state : ITabsState;

    constructor(props : ITabsProps){
        super(props)
        this.state = {
            activeKey : props.activeKey || props.defaultActiveKey || ""
        }
    }
    
    componentWillReceiveProps(nextProps : ITabsProps){
        if(nextProps.activeKey != null){
            this.setState({activeKey : nextProps.activeKey})
        }
    }
    

    render() {
        const {className,extraClassName} = this.props
		return (
            <div {...(this.props as any)} className={classnames(className,extraClassName)}>
				{this.renderNavs()}
				{this.renderTabs()}
			</div>
		)
	}

	renderNavs(){
        let children : TabElement[]
        const {children : _children,className : prefix} = this.props
        const {activeKey} = this.state
        if(!_children){
            children = []
        }else if(!Array.isArray(_children)){
            children = [_children as TabElement]
        }else{
            children = _children as TabElement[]
        }
        const navs = children.filter((child)=> child != null ).map((child :  TabElement)=>{
            const key = child.key
            const {title,disabled,navExtraClassName} = child.props
            const events : {onClick? : (event : React.MouseEvent<Element>)=>void; } = {}
            if(!disabled){
                events.onClick = this.handleClick.bind(this,key)
            }
            return (
                <li key={key} className={classnames(`${prefix}-nav`,{ active : key == activeKey },navExtraClassName)}  {...events}>
                    {title}
                </li>
            )
        })
        return <ul className={`${prefix}-navs`}>{navs}</ul>
	}


	renderTabs(){
        let children : TabElement[]
        const {children : _children,className : prefix} = this.props
        const {activeKey} = this.state
        if(!_children){
            children = []
        }else if(!Array.isArray(_children)){
            children = [_children as TabElement]
        }else{
            children = _children as TabElement[]
        }
        const panes = children.filter((child)=> child != null).map((child : TabElement)=>{ 
            const key = child.key
            const active = activeKey == key
            const {paneExtraClassName} = child.props
            return <div key={key} className={classnames(`${prefix}-pane`,{active},paneExtraClassName)}>{(child.props as any).children}</div>
        })
        return <div className={`${prefix}-panes`}>{panes}</div>
	}

	handleClick(activeKey : string , event : React.MouseEvent<Element>){
        // let result
        if(typeof this.props.onChange === 'function'){
            this.props.onChange(activeKey)
        }
        if(this.props.activeKey == null){
            this.setState({activeKey})
        }
	}
}


