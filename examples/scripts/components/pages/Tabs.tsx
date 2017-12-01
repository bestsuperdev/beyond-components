import * as React from 'react';
import Tabs, { Tab } from 'Tabs'
import "Tabs/index.less"
export default class TabsPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            tabActiveKey: '0'
        }
    }
    
    handlerToggleTab(key : string, event : React.MouseEvent<Element>){
		this.setState({tabActiveKey : key})
		return false
    }
    

    render(): JSX.Element {
        return (
            <div className="page">
                <h2>Tabs</h2>
                <div>
                    <h4>受控 Tabs</h4>
                    <Tabs activeKey={this.state.tabActiveKey} onChange={this.handlerToggleTab.bind(this)}>
                        <Tab title="页面1" key="0">页面1的内容</Tab>
                        <Tab title="页面2" key="1">页面2的内容</Tab>
                        <Tab title="页面3" key="2">页面3的内容</Tab>
                        <Tab title="页面4" key="3">页面4的内容</Tab>
                    </Tabs>
                </div>
                <div>
                    <h4>不受控 Tabs</h4>
                    <Tabs defaultActiveKey={this.state.tabActiveKey}>
                        <Tab title="页面1" key="0">页面1的内容</Tab>
                        <Tab title="页面2" key="1">页面2的内容</Tab>
                        <Tab title="页面3" key="2">页面3的内容</Tab>
                        <Tab title="页面4" key="3">页面4的内容</Tab>
                    </Tabs>
                </div>
                <div>
                    <h4>disabled 页面 2</h4>
                    <Tabs defaultActiveKey={this.state.tabActiveKey}>
                        <Tab title="页面1" key="0">页面1的内容</Tab>
                        <Tab disabled title="页面2" key="1">页面2的内容</Tab>
                        <Tab title="页面3" key="2">页面3的内容</Tab>
                        <Tab title="页面4" key="3">页面4的内容</Tab>
                    </Tabs>
                </div>
                <div>
                    <h4>自定义前缀</h4>
                    <Tabs prefix="example" defaultActiveKey={this.state.tabActiveKey}>
                        <Tab title="页面1" key="0">页面1的内容</Tab>
                        <Tab title="页面2" key="1">页面2的内容</Tab>
                        <Tab title="页面3" key="2">页面3的内容</Tab>
                        <Tab title="页面4" key="3">页面4的内容</Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}