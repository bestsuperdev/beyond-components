import * as React from 'react';
import Placeholder from 'Placeholder'

export default class PlaceholderPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handlerChange(event : React.KeyboardEvent<HTMLInputElement>){
		let value = (event.target as HTMLInputElement).value
		this.setState({value})
    }
    
    render(): JSX.Element {
        return (
            <div className="page">
                <h2>Placeholder( 支持 ie8&ie9 )</h2>
                <div>
                    <Placeholder>
                        <input autoComplete="off" type="text" placeholder="请输入名称" style={{ fontSize: 12, height: 20 }} />
                    </Placeholder>
                    <br />
                    <Placeholder>
                        <input autoComplete="off" defaultValue="hava default value" type="text" placeholder="请输入名称" style={{ fontSize: 12, height: 20 }} />
                    </Placeholder>
                    <br />
                    <Placeholder>
                        <input autoComplete="off" value={this.state.value} onChange={this.handlerChange.bind(this)} type="text" placeholder="请输入名称" style={{ fontSize: 12, height: 20 }} />
                    </Placeholder>
                    <br />
                    <Placeholder>
                        <input autoComplete="off" type="password" placeholder="请输入密码" style={{ fontSize: 12, height: 20 }} />
                    </Placeholder>
                </div>
                <div>
                    <Placeholder>
                        <textarea placeholder="请输入文本" cols={30} rows={10}></textarea>
                    </Placeholder>
                </div>
            </div>
        )
    }
}