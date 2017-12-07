import * as React from 'react'
import Pagination from 'Pagination'
import 'Pagination/index.less'

export default class PaginationPage extends React.Component<any, any> {

	timer : any

	constructor(props: any) {
		super(props)
		this.state = {
			active:1
		}
	}


	render(): JSX.Element {
	
		return (
			<div className="page">
				<h2>Pagination</h2>
				<div>
					<Pagination active={this.state.active} totals={100} onChange={(active)=> this.setState({active}) }  />
				</div>
			</div>
		)
	}
}