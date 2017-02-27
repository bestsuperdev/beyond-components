# beyond-components

用于提供二次开发的 React 原型组件，只提供最基本的样式。

计划组件（尚在整理中）

- [x] Document
- [x] Placeholder
- [x] Modal
- [x] Grid
- [x] Tabs
- [x] Tooltip
- [x] Notification

## 安装 install
```bash
npm install beyond-components  --save

```

## 文档 doc 

### Document

用 react 绑定的事件，会全部绑定在 document 元素上，如果用原生 js 在 document 上绑定点击事件，用 react 绑定的点击事件，即使阻止冒泡，也会触发原生绑定在 document 上的点击事件，该组件就是为了解决此类问题。

可用于弹窗、下拉框组件

```jsx
import Document from 'beyond-components/lib/Document'
class App extends React.Component{

    hide(){}

    show(){}

    render(){
        <Document onClick={this.hide.bind(this)}>
            <div className="modal" onClick={this.show.bind(this)}></div>
        </Document>
    }
}

```

| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| onClick    | function   |   | - |
| delay    | number   | document 事件延迟触发，请勿修改小于50  | 100 |


### Placeholder

在不支持 Placeholder 的浏览器上（IE8,IE9）上模拟 Placeholder，会自动判断是否支持 Placeholder，如果支持则使用原生的。  

**使用该组件一定要确认 input/textarea 组件的 value 是受控的**

```jsx

import Placeholder from 'beyond-components/lib/Placeholder'

class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {value : ''}
    }

    handlerInputChange(event){
        let value = event.target.value
        this.setState({value})
    }

    render(){
        <Placeholder>
            <input type="text" placeholder="请输入用户名" value={this.state.value} onChange={this.handlerInputChange.bind(this)} />
        </Placeholder>
    }
}
```
| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| color    | string  | placeholder 显示时候的默认颜色  | #999 |


### Modal

弹窗组件

```jsx
import Modal from 'beyond-components/lib/Modal'
require('beyond-components/lib/Modal/index.css')
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible : false
        }
    }

    hide(){
        this.setState({visible : false})
    }

    show(){
        this.setState({visible : true})
    }

    render(){
        <div>
            <button onClick={this.show.bind(this)}>点击弹窗</button>
            <Modal visible={this.state.visible} onClose={this.hide.bind(this)} title="我是标题">我是内容</Modal>
        </div>
    }
}


```


| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| title    | string   | 弹窗的标题  | - |
| close    | boolean   |  是否在顶部显示关闭按钮 | true |
| closeIcon    | String/Element   |  改变关闭按钮样式 | X |
| footer   | mixin    |   尾部内容     | - |
| visible   | boolean   |    是否显示弹窗    | false |
| maxBodyHeight | number   |  最大内容高度（不包括头部和底部），超出会出现滚动条 | 浏览器高度的*0.7 |
| bodyHeight | number   | 内容高度（不包括头部和底部） | 浏览器高度的*0.7 |
| width        | string   | 弹窗宽度       | - |
| maxWidth        | string   | 弹窗最大宽度       | - |
| mask        | boolean   | 是否显示遮罩层       | true |
| maskClickClose       | boolean   |   点击遮罩关闭     |  true |
| onOpen | function   |   显示的时候触发，返回false则阻止该事件发生     |  - |
| onClose | function   |   关闭的时候触发，返回false则阻止该事件发生     |  - |
| className    | string   |     替换原有class，不建议如此操作   | - |
| extraClassName    | string   | 外层元素增加class | - |
| style        | object   |    外部样式    | - |



### Grid(Row,Col)

排版布局组件

```jsx
import "beyond-components/lib/Grid/index.less";
import {Col,Row} = require('beyond-components/lib/Grid')
class App extends React.Component{

    render(){
        <Row>
            <Col col={4}>
                this is content
            </Col>
            <Col col={4}>
                this is content
            </Col>
            <Col col={4}>
                this is content
            </Col>
        </Row>
    }
}
```
#### Row

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| grids     | number |   12    | 非必需，总的grids数|
| gutter    |  number   |   0   | 非必需，grid内容水平间隔|
| verticalGutter  |   number    |  0  | 非必需，,grid内容垂直间隔 |
| width  |    number/string    |   - | 非必需，宽度|
| style  |    object    |  -  | 非必需，样式 |
| className  | string    |  row  | 非必需，替换原有className，不建议|
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |

#### Col
| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| col     | number |  -   | 非必需，所占grids数|
| offsetCol    |  number   |   -   | 非必需，margin-right 推移的grids数|
| width  |   number/string    |  -  | 非必需，宽度，单位是px |
| offsetWidth  |    number/string    |   - | 非必需，margin-right 宽度，单位是px|
| style  | Object |  -  | 非必需，样式 |
| className  | string    |  col  | 非必需，替换原有className，不建议|
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |


### Tabs (Tabs Tab)

Tab 组件

```jsx
import "beyond-components/lib/Tabs/index.less";
import Tabs,{Tab} = require('beyond-components/lib/Tabs')
class App extends React.Component{

    render(){
        <Tabs defaultActiveKey="0">
            <Tab title="页面1" key="0">页面1的内容</Tab>
            <Tab title="页面2" key="1" disabled>页面2的内容</Tab>
            <Tab title="页面3" key="2">页面3的内容</Tab>
            <Tab title="页面4" key="3">页面4的内容</Tab>
        </Tabs>
    }
}


```
#### Tabs

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| defaultActiveKey     | string |   -    | 默认的 active Tab，不受控 |
| activeKey    |  string   |   0   | active Tab，受控 |
| onChange  |   function   |  -  | 切换 tab 时的回掉函数 |
| className  | string  |  tabs  | 非必需，替换原有className，不建议|
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |

#### Tab

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| navExtraClassName     | string |  -   | 增加 tab 的 nav 样式|
| paneExtraClassName    |  string   |   -   | 增加 tab 的 pane 样式 |
| key  |   string    |  -  | 必须，标识 key |
| title  |    string    |   - | 每个 tab 的标题|
| disabled  | boolean |  false  | 禁止切换到该 tab |


### Tooltip (Tooltip Trigger)

排版布局组件

```jsx
import "beyond-components/lib/Tooltip/index.less";
import Tooltip,{Trigger} from 'beyond-components/lib/Tooltip'
class App extends React.Component{

    render(){
        <Trigger tooltip={<Tooltip placement="top">hello world</Tooltip>}>
            <span>hover me</span>
        </Trigger>
    }
}
```

#### Tooltip

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| placement  |   string   |  top  | top/bottom/left/right 设置 tooltip 显示的位置 |
| className  | string  |  tooltip  | 非必需，替换原有className，不建议|
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |
| style    |  object   |   -   | 设置外层样式 |


#### Trigger

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| tooltip | Tooltip |  -   | 必须 |



### Notification

消息组件

```jsx
require("beyond-components/lib/Notification/index.less");
import Notification from 'beyond-components/lib/Notification'
class App extends React.Component{

    handlerClick(){
        if(!this.notice){
            this.notice = Notification.getInstance(<Notification />)
        }
        this.notice.show('hello world:' + Math.random())
    }

    handlerClick(){
        if(!this.notice2){
            this.notice2 = Notification.getInstance(<Notification>hello world</Notification>)
        }
        this.notice.show()
    }

    render(){
        <div>
            <button onClick={this.handlerClick.bind(this)}>click me to show hello world</button>
            <button onClick={this.handlerClick2.bind(this)}>click me to show another hello world</button>
        </div>
    }
}
```

#### Notification (作为组件)

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| reverse  |   boolean   |  false  |设置反转颜色 |
| className  | string  |  tooltip  | 非必需，替换原有className，不建议|
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |
| style    |  object   |   -   | 设置外层样式 |