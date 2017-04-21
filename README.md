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
- [x] Form

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

    hide(){
        //hide modal
    }

    show(){
        //show modal
    }

    render(){
        <Document onClick={this.hide.bind(this)}>
            <div className="modal" onClick={this.show.bind(this)}></div>
        </Document>
    }
}
```

#### API

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

#### API


| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| color    | string  | placeholder 显示时候的默认颜色  | #999 |


### Modal

弹窗组件

```jsx
require('beyond-components/lib/Modal/index.css')
import Modal from 'beyond-components/lib/Modal'
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


#### API


| 属性     | 类型   |  说明  | 默认值 |
| -------- | -----  | ----   | ---- |
| title    | string   | 弹窗的标题  | - |
| close    | boolean   |  是否在顶部显示关闭按钮 | true |
| closeIcon    | String/Element   |  改变关闭按钮样式 | X |
| footer   | mixin    |   尾部内容     | - |
| visible   | boolean   |    是否显示弹窗    | false |
| maxBodyHeight | number   |  最大内容高度（不包括头部和底部），超出会出现滚动条 | 浏览器高度的*0.7 |
| bodyHeight | number   | 内容高度（不包括头部和底部） | - |
| width        | string   | 弹窗宽度       | - |
| maxWidth        | string   | 弹窗最大宽度       | - |
| mask        | boolean   | 是否显示遮罩层       | true |
| maskClickClose       | boolean   |   点击遮罩关闭     |  true |
| onOpen | function   |   显示的时候触发，返回false则阻止该事件发生     |  - |
| onClose | function   |   关闭的时候触发，返回false则阻止该事件发生     |  - |
| prefix    | string   | 改变class前缀，深度定制时候使用   | beyond_p- |
| extraClassName    | string   | 外层元素增加class | - |
| style        | object   |    外部样式    | - |


#### 定制

**dom 结构**

```jsx
<div className="beyond_p-modal">
    <div className="beyond_p-modal-mask"></div>
    <div className="beyond_p-modal-dialog">
        <div className="beyond_p-modal-header">
            {this.props.title}
            <span className="beyond_p-modal-close">
                {this.props.closeIcon}
            </span>
        </div>
        <div className="beyond_p-modal-dialog">
            {this.props.children}
        </div>
        <div className="beyond_p-modal-footer">
            {this.props.footer}
        </div>
    </div>
</div>
```


### Grid(Row,Col)

排版布局组件

```jsx
require("beyond-components/lib/Grid/index.css")
import {Col,Row} from 'beyond-components/lib/Grid'
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

#### API

**Row**

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| grids     | number |   12    | 非必需，总的grids数|
| gutter    |  number   |   0   | 非必需，grid内容水平间隔|
| verticalGutter  |   number    |  0  | 非必需，,grid内容垂直间隔 |
| width  |    number/string    |   - | 非必需，宽度|
| style  |    object    |  -  | 非必需，样式 |
| prefix    | string   | 改变class前缀，深度定制时候使用   | beyond_p- |
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |

**Col**

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| col     | number |  -   | 非必需，所占grids数|
| offsetCol    |  number   |   -   | 非必需，margin-right 推移的grids数|
| width  |   number/string    |  -  | 非必需，宽度，单位是px |
| offsetWidth  |    number/string    |   - | 非必需，margin-right 宽度，单位是px|
| style  | Object |  -  | 非必需，样式 |
| prefix    | string   | 改变class前缀，深度定制时候使用   | beyond_p- |
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |


#### 定制

**dom 结构**

```jsx
<div className="beyond_p-row">
    <div className="beyond_p-col"></div>
    <div className="beyond_p-col"></div>
    <div className="beyond_p-col"></div>
</div>
```


### Tabs (Tabs Tab)

Tab 组件

```jsx
require("beyond-components/lib/Tabs/index.css");
import Tabs,{Tab} from 'beyond-components/lib/Tabs'

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


#### API

**Tabs**

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| defaultActiveKey     | string |   -    | 默认的 active Tab，不受控 |
| activeKey    |  string   |   0   | active Tab，受控 |
| onChange  |   function   |  -  | 切换 tab 时的回掉函数 |
| prefix    | string   | 改变class前缀，深度定制时候使用   | beyond_p- |
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |

**Tab**

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| key  |   string    |  -  | 必须，标识 key |
| title  |    string    |   - | 每个 tab 的标题|
| disabled  | boolean |  false  | 禁止切换到该 tab |


#### 定制

**dom 结构**

```jsx
<div className="beyond_p-tabs">
    <ul className="beyond_p-navs">
        <li className="beyond_p-nav">{Tab.props.title}</li>
        <li className="beyond_p-nav">{Tab.props.title}</li>
    </ul>
    <div className="beyond_p-panes">
        <div className="beyond_p-pane">{Tab.props.children}</div>
        <div className="beyond_p-pane">{Tab.props.children}</div>
    </div>
</div>
```


### Tooltip (Tooltip Trigger)

提示气泡

```jsx
require("beyond-components/lib/Tooltip/index.css");
import Tooltip,{Trigger} from 'beyond-components/lib/Tooltip'
class App extends React.Component{

    render(){
        <Trigger tooltip={<Tooltip placement="top">hello world</Tooltip>}>
            <span>hover me</span>
        </Trigger>
    }
}
```


#### API

**Tooltip**

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| placement  |   string   |  top  | top/bottom/left/right 设置 tooltip 显示的位置 |
| prefix    | string   | 改变class前缀，深度定制时候使用   | beyond_p- |
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |
| style    |  object   |   -   | 设置外层样式 |


**Trigger**

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| tooltip | Tooltip |  -   | 必须 |


#### 定制

** Tooltip dom 结构**

```jsx
<div className="beyond_p-tooltip">
    <div className="beyond_p-content">{this.props.children}</div>
    <div className="beyond_p-triangle"></div>
</div>
```



### Notification

消息组件

```jsx
require("beyond-components/lib/Notification/index.css");
import Notification from 'beyond-components/lib/Notification'
class App extends React.Component{

    handlerClick(){
        if(!this.notice){
            this.notice = Notification.getInstance(<Notification />)
        }
        this.notice.show('hello world:' + Math.random())
    }

    handlerClick2(){
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

#### API

**Notification (作为组件)**

| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| duration    |  number   |   2  | 持续时间，单位为 秒 ，若为 0 则不自动消失 |
| x  |   string   |  center/left/right  | 消息框水平位置 |
| y  |   string   |  top/middle/bottom  | 消息框垂直位置 |
| reverse  |   boolean   |  false  |设置反转颜色 |
| prefix    | string   | 改变class前缀，深度定制时候使用   | beyond_p- |
| extraClassName  |    string    |  -  | 非必需，增加className，定制样式 |
| style    |  object   |   -   | 设置外层样式 |


**Notification （类）**

| 静态方法        |  返回类型   |  参数 | 说明 |
| --------   | :----:   | :----:  |:----:  |
| getInstance  |   -   |  -  | 返回一个 notice 对象 |



#### 定制

** Notification dom 结构**

```jsx
<div className="beyond_p-notification">
    <div className="beyond_p-notification-content">
        {this.props.children}
    </div>
</div>
```



### Form Ajax文件上传

使用 iframe 模拟文件 ajax 上传，兼容到 IE8 ，假如浏览器支持 FormData，则不会自动生成 iframe 标签，请使用 FormData 上传文件  
在使用 iframe 模拟文件上传的时候，IE 浏览器，包括最新的 IE11，请求返回的 content-type 不支持 json，建议服务端直接返回 text/plain

```jsx
import Form from 'beyond-components/lib/Form'
class App extends React.Component{

    handlerSubmit(event){
        if(typeof FormData !== 'undefined'){
            //如果使用 FormData 上传，则阻止表单进行普通提交，使用 FormData进行文件上传
            event.preventDefault()
            //code here
        }
    }

    handlerFormSuccess(res){
        //不使用 iframe 上传文件，不会触发此方法
        //res 是服务单返回的body信息
        console.log(res)
    }

    render(){
        <Form action="http://www.example.com" 
                onSubmit={this.handlerSubmit.bind(this)} 
				onSuccess={this.handlerFormSuccess.bind(this)}>
            <input type="file"/>
            <button type="submit">submit</button>
        </Form>
    }
}
```


#### API


| 属性        |  类型   |  默认值  | 说明 |
| --------   | :----:   | :----:  |:----:  |
| className  | string  |  -  | 设置 form 的 class |
| style    |  object   |   -   | 设置 form 样式 |
| encType    |  string   |   multipart/form-data   | - |
| dataType |  string(json/html)   |   json   | 对返回数据进行处理 |
| method |  string   |   POST   | - |
| action |  string   |   -   | 提交地址 |
| onSubmit |  function   |   -   | 表单提交触发事件 |
| onSuccess |  function   |   -   | 提交成功事件，仅在使用 iframe 时候触发  |
| onError |  function   |   -   | 提交成功，解析数据失败事件，仅在使用 iframe 时候触发 |
| onComplete |  function   |   -   | 提交完成事件，仅在使用 iframe 时候触发 |
