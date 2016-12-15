# beyond-components

用于提供二次开发的 React 原型组件，只提供最基本的样式。

计划组件（尚在整理中）

- [x] Document
- [x] Placeholder
- [x] Modal
- [ ] Grid
- [ ] Trigger
- [ ] Selector
- [ ] Message
- [ ] Tooltip
- [ ] Notification

## 文档

### Document

用 react 绑定的事件，会全部绑定在 document 元素上，如果用原生 js 在 document 上绑定点击事件，用 react 绑定的点击事件，即使阻止冒泡，也会触发原生绑定在 document 上的点击事件，该组件就是为了解决此类问题。

可用于弹窗、下拉框组件

```jsx
const Document = require('beyond-components/lib/Document')
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

在不支持 Placeholder 的浏览器上（IE8,IE9）上模拟 Placeholder，会自动判断是否支持 Placeholder，如果支持则使用原生的。使用该组件一定要确认 input/textarea 组件的 value 是受控的

```jsx

const Placeholder = require('beyond-components/lib/Placeholder')

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
| color    | string | number   | placeholder 显示时候的默认颜色  | #999 |


### Modal

弹窗组件

```jsx
const Modal = require('beyond-components/lib/Modal');
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

