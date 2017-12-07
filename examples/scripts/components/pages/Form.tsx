import * as React from 'react'
import Form from 'Form'
export default class FormPage extends React.Component<any, any> {

	notice: any
	notice2: any

	constructor(props: any) {
		super(props)
	}

	handlerSubmit(event: React.FormEvent<any>) {
		// event.preventDefault()
		alert('submit')
	}

	handlerFormSuccess(res: any) {
		alert('success')
	}
	handlerFormError(res: any) {
		alert('error')
	}
	handlerFormComplete(res: any) {
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