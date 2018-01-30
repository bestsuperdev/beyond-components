import * as React from 'react'
import Tooltip,{Trigger} from 'Tooltip'
import 'Tooltip/index.less'
export default class TabsPage extends React.Component<any, any> {

	constructor(props: any) {
		super(props)
		this.state = {
			tabActiveKey: '0'
		}
	}

	handlerToggleTab(key: string, event: React.MouseEvent<Element>) {
		this.setState({ tabActiveKey: key })
		return false
	}

	render(): JSX.Element {
		return (
			<div className="page">
				<h2>tooltip</h2>
				<div>
					<Tooltip style={{ marginRight: 20 }} >hello world</Tooltip>
					<Tooltip style={{ marginRight: 20 }} placement="left"  >hello world</Tooltip>
					<Tooltip style={{ marginRight: 20 }} placement="right"  >hello world</Tooltip>
					<Tooltip style={{ marginRight: 20 }} placement="bottom"  >hello world</Tooltip>

				</div>
				<div style={{ marginTop: 30, marginBottom: 30 }}>
					<Trigger tooltip={<Tooltip placement="top">hello world</Tooltip>}>
						<span 
							onMouseEnter={(e) => console.log('enter')} 
							onMouseOut={(e) => console.log('out')} 
							className="tooltip-btn">top</span>
					</Trigger>
					<Trigger tooltip={<Tooltip placement="bottom">hello world</Tooltip>}>
						<span className="tooltip-btn">bottom</span>
					</Trigger>
					<Trigger tooltip={<Tooltip placement="left">hello world</Tooltip>}>
						<span className="tooltip-btn">left</span>
					</Trigger>
					<Trigger tooltip={<Tooltip placement="right">hello world</Tooltip>}>
						<span className="tooltip-btn">right</span>
					</Trigger>
				</div>
				<div>
					<h4>自定义前缀 </h4>
					<Tooltip prefix="example"  style={{ marginRight: 20 }} >hello world</Tooltip>
					<Tooltip prefix="example"  style={{ marginRight: 20 }} placement="left">hello world</Tooltip>
					<Tooltip prefix="example"  style={{ marginRight: 20 }} placement="right">hello world</Tooltip>
					<Tooltip prefix="example"  style={{ marginRight: 20 }} placement="bottom">hello world</Tooltip>

				</div>
			</div>
		)
	}
}