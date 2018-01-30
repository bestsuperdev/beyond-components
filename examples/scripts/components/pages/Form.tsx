import * as React from 'react'
import Form from 'Form'
export default class FormPage extends React.Component<any, any> {

	notice: any
	notice2: any

	constructor(props: any) {
		super(props)
	}

	handlerSubmit() {
		// event.preventDefault()
		alert('submit')
	}

	handlerFormSuccess() {
		alert('success')
	}
	handlerFormError() {
		alert('error')
	}
	handlerFormComplete() {
		alert('complete')

	}
	render(): JSX.Element {
		return (
			<div className="page">

				<h2>Form</h2>
				<div>
					<Form action="/test/test.js" onSubmit={this.handlerSubmit.bind(this)}
						onSuccess={this.handlerFormSuccess.bind(this)}
						onError={this.handlerFormError.bind(this)}
						onComplete={this.handlerFormComplete.bind(this)}>
						<input type="file" />
						<button type="submit">submit</button>
					</Form>
				</div>
			</div>
		)
	}
}