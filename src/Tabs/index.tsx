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
import { prefix, IBaseProps } from '../consts'


export interface ITabProps  {
    key : string;
    title : string;
    disabled? : boolean;
};

export interface ITabState {};

export interface ITabsProps extends IBaseProps {
    defaultActiveKey? : string;
    activeKey? : string;
    onChange? : (key : string)=> void | boolean;
    style? : object;
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
        prefix : prefix // `${prefix}tabs`
    }

    state : ITabsState;

    constructor(props : ITabsProps){
        super(props)
        this.state = {
            activeKey : props.defaultActiveKey || ""
        }
    }

    
    getActiveKey(){
        return this.props.activeKey || this.state.activeKey
    }

    render() {
        const {prefix,extraClassName,style} = this.props
        let className = `${prefix}tabs`
		return (
            <div style={style} className={classnames(className,extraClassName)}>
				{this.renderNavs()}
				{this.renderTabs()}
			</div>
		)
	}

	renderNavs(){
        let children : TabElement[]
        const {children : _children,prefix} = this.props
        const activeKey = this.getActiveKey()

        let className = `${prefix}tabs`
        if(!_children){
            children = []
        }else if(!Array.isArray(_children)){
            children = [_children as TabElement]
        }else{
            children = _children as TabElement[]
        }
        const navs = children.filter((child)=> child != null ).map((child :  TabElement)=>{
            const key = child.key
            const {title,disabled} = child.props
            let navClassName = classnames(`${className}-nav`,{ active : key == activeKey })

            return (
                <li key={key} className={navClassName} onClick={disabled ? null : this.handlerClick.bind(this,key)}>
                    {title}
                </li>
            )
        })
        return <ul className={`${className}-navs`}>{navs}</ul>
	}


	renderTabs(){
        let children : TabElement[]
        const {children : _children, prefix} = this.props
        const activeKey = this.getActiveKey()
        let className = `${prefix}tabs`
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
            return <div key={key} className={classnames(`${className}-pane`,{active})}>{(child.props as any).children}</div>
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


