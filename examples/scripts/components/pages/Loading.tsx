import * as React from 'react'
import Loading from 'Loading'
import 'Loading/index.less'

export default class LoadingPage extends React.Component<any, any> {

	loading : any

	constructor(props: any) {
		super(props)
	}

	handlerShowLoading() {
		if (!this.loading) {
			this.loading = Loading.getInstance()
		}
		this.loading.show('正在加载中...', { duration: 3 })
	}
	handlerShowLoading2() {
		this.loading.show('加载中...', { duration: 3 })
	}
	handlerHideLoading() {
		this.loading.hide()
	}

	render(): JSX.Element {
		return (
			<div className="page">

				<h2>Loading</h2>
				<div>
					<button type="button" onClick={this.handlerShowLoading.bind(this)}>click me to show loading</button>
					<button type="button" onClick={this.handlerShowLoading2.bind(this)}>click me to show other set loading</button>
				</div>
			</div>
		)
	}
}