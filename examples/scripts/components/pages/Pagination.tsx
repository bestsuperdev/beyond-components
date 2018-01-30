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

	handlerChange = (page : {page : number})=>{
		this.setState({active : page.page})
	}


	render(): JSX.Element {
	
		return (
			<div className="page">
				<h2>Pagination</h2>
				<div>
					<Pagination page={this.state.active} totals={100} onChange={this.handlerChange}  />
				</div>
				<div style={{marginTop : 20}}>
					<Pagination showSizeChange 
						page={this.state.active} 
						totals={100} 
						onChange={this.handlerChange}  />
				</div>
				<div style={{marginTop : 20}}>
					<Pagination 
						showGoto
						showSizeChange 
						page={this.state.active} 
						totals={100} 
						onChange={this.handlerChange}  />
				</div>
				<div style={{marginTop : 20}}>
					<Pagination 
						showGoto
						// showSizeChange 
						page={this.state.active} 
						totals={100} 
						onChange={this.handlerChange}  />
				</div>
			</div>
		)
	}
}