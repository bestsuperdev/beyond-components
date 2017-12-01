import * as React from 'react';
import { Row, Col } from 'Grid'
import "Grid/index.less"

export default class GridPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handlerChange(event: React.KeyboardEvent<HTMLInputElement>) {
        let value = (event.target as HTMLInputElement).value
        this.setState({ value })
    }

    render(): JSX.Element {
        return (
            <div className="page">
                <h2>Grid</h2>
                <Row width={500} style={{ marginBottom: '20px' }}>
                    <Col key="1" width={100} onClick={()=> alert('col support click event') }>width={100}</Col>
                    <Col key="2" width={300}>width={300}</Col>
                    <Col key="3" width={100}>width={100}</Col>
                </Row>

                <Row width={500} style={{ marginBottom: '20px' }}>
                    <Col key="1" width={100} offsetWidth={300}>width={100} offsetWidth={300}</Col>
                    <Col key="2" width={100}>width={100}</Col>
                </Row>

                <h4>default 12 grids</h4>
                <Row style={{ marginBottom: '20px' }}>
                    <Col key="1" col={12}>12</Col>
                </Row>

                <Row style={{ marginBottom: '20px' }}>
                    <Col key="1" col={6}>6</Col>
                    <Col key="2" col={6}>6</Col>
                </Row>

                <Row gutter={10} style={{ marginBottom: '20px' }}>
                    <Col key="1" col={4}>4(gutter 10)</Col>
                    <Col key="2" col={4}>4(gutter 10)</Col>
                    <Col key="3" col={4}>4(gutter 10)</Col>
                </Row>

                <Row verticalGutter={10} gutter={4}>
                    <Col key="1" col={1}>1</Col>
                    <Col key="2" col={1}>1</Col>
                    <Col key="3" col={1}>1</Col>
                    <Col key="4" col={1}>1</Col>
                    <Col key="5" col={1}>1</Col>
                    <Col key="6" col={1}>1</Col>
                    <Col key="7" col={1}>1</Col>
                    <Col key="8" col={1}>1</Col>
                    <Col key="9" col={1}>1</Col>
                    <Col key="10" col={1}>1</Col>
                    <Col key="11" col={1}>1</Col>
                    <Col key="12" col={1}>1</Col>
                </Row>

                <h4>set 24 grids</h4>
                <Row grids={24} verticalGutter={10} gutter={4}>
                    <Col key="1" col={1}>1</Col>
                    <Col key="2" col={1}>1</Col>
                    <Col key="3" col={1}>1</Col>
                    <Col key="4" col={1}>1</Col>
                    <Col key="5" col={1}>1</Col>
                    <Col key="6" col={1}>1</Col>
                    <Col key="7" col={1}>1</Col>
                    <Col key="8" col={1}>1</Col>
                    <Col key="9" col={1}>1</Col>
                    <Col key="10" col={1}>1</Col>
                    <Col key="11" col={1}>1</Col>
                    <Col key="12" col={1}>1</Col>
                    <Col key="13" col={1}>1</Col>
                    <Col key="14" col={1}>1</Col>
                    <Col key="15" col={1}>1</Col>
                    <Col key="16" col={1}>1</Col>
                    <Col key="17" col={1}>1</Col>
                    <Col key="18" col={1}>1</Col>
                    <Col key="19" col={1}>1</Col>
                    <Col key="20" col={1}>1</Col>
                    <Col key="21" col={1}>1</Col>
                    <Col key="22" col={1}>1</Col>
                    <Col key="23" col={1}>1</Col>
                    <Col key="24" col={1}>1</Col>
                </Row>

                <Row grids={2} >
                    <Col key="1" col={1}>12</Col>
                    <Col key="2" col={1}>12</Col>
                </Row>

                <h4>verticalGutter={10} gutter={4}</h4>
                <Row verticalGutter={10} gutter={4}>
                    <Col key="1" col={2} offsetCol={8}>2(colOffset 8)</Col>
                    <Col key="2" col={2}>2</Col>
                </Row>

                <h4>custom prefix grid</h4>
                <Row prefix="example" verticalGutter={10} gutter={4}>
                    <Col key="1" col={1}>1</Col>
                    <Col key="2" col={1}>1</Col>
                    <Col key="3" col={1}>1</Col>
                    <Col key="4" col={1}>1</Col>
                    <Col key="5" col={1}>1</Col>
                    <Col key="6" col={1}>1</Col>
                    <Col key="7" col={1}>1</Col>
                    <Col key="8" col={1}>1</Col>
                    <Col key="9" col={1}>1</Col>
                    <Col key="10" col={1}>1</Col>
                    <Col key="11" col={1}>1</Col>
                    <Col key="12" col={1}>1</Col>
                </Row>
            </div>
        )
    }
}