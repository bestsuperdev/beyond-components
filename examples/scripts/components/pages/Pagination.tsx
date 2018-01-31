import * as React from 'react'
import Pagination from 'Pagination'
import 'Pagination/index.less'

export default class PaginationPage extends React.Component<any, any> {

	timer : any

	constructor(props: any) {
		super(props)
		this.state = {
			active:1,
			size : 5
		}
	}

	handlerChange = (page : number)=>{
		this.setState({active : page})
		return false
	}


	render(): JSX.Element {
	
		return (
			<div className="page">
				<h2>Pagination</h2>
				

				<h3>不受控</h3>
				<div style={{marginTop : 20}}>
					<Pagination showSizeChange 
						defaultPage={this.state.active} 
						totals={100} 
						/>
				</div>
				<div style={{marginTop : 20}}>
					<Pagination 
						showGoto
						showSizeChange 
						defaultPage={this.state.active} 
						totals={100} 
						/>
				</div>
				<div style={{marginTop : 20}}>
					<Pagination 
						showGoto
						// showSizeChange 
						defaultPage={this.state.active} 
						totals={100} 
						 />
				</div>
				<h3>受控</h3>
				<div>
					<Pagination page={this.state.active} totals={100} onChange={this.handlerChange}  />
				</div>
				<div style={{marginTop : 20}}>
					<Pagination showSizeChange 

						size={this.state.size}
						page={this.state.active} 
						totals={100} 
						onSizeChange={(size)=> this.setState({size})}
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