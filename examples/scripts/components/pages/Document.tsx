import Document from 'Document'
import * as React from 'react'
// interface IDocumentPageProps {}

interface IDocumentPageState {
		clickPosition? : string;
}

export default class DocumentPage extends React.Component<any, IDocumentPageState> {

	constructor(props : any ){
		super(props)
		this.state = {
			clickPosition : ''
		}
	}

	handlerShowClickPosition(clickPosition : string){
		this.setState({clickPosition})
	}

	public render(): JSX.Element {
		return (
			<div className="page">
				<h2>document</h2>
				<Document onClick={this.handlerShowClickPosition.bind(this,'out')}>
					<div onClick={this.handlerShowClickPosition.bind(this,'inner')} style={{border : '1px solid black'}}>
							click source  : {this.state.clickPosition}
					</div>
				</Document>
			</div>
		)
	}
}