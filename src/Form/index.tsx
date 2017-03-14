/**
 * fetch-ie8
 * 
 * onSubmit 只有支持 FormData 的浏览器才会触发
 * dataType : 'json'/'text'/'html'
 * 
 * handlerSubmit(event){
 * 		submitForm(data)
 * 		.then((res)=>{
 * 			console.log(res)
 * 		})
 * }
 * 
 * handlerSuccess(res){
 * 	if(res.Sucess){
 * 		alert('success loaded')
 * 	}
 * }
 * 
 * <Form className timeout={10} encType="multipart/form-data" userFormData action="example.com" method="POST" onSubmit={this.handlerSubmit} onSuccess  onError onComplete>
 *      <input name="file1" type="file"/>
 *      <input name="file2" type="file"/>
 *      <input type="text"/>
 *      <button type="submit">submit</button>
 * </Form>
 * 
 */

import * as React from 'react';
import assign = require('beyond-lib/lib/assign')


const supportFormData = typeof FormData !== 'undefined'
let id = 0

function getIframeName(){
	id++
	return `beyondcomponentsForm` // + id
}

export interface IFormProps {

	onSubmit? : (event : React.FormEvent<any>)=> void;	
	onSuccess? : (res : any)=> void;
	onError? : (res : any)=> void;
	onComplete? : (res : any)=> void;
	dataType? : 'json' | 'html';
	className? : string;
	style? : Object;
	encType? : string;
	action? : string;
	method? : string;
}



export default class Form extends React.Component<IFormProps,any> {

	iframe : HTMLIFrameElement
	iframeName : string

	static defaultProps : any = {
		encType : 'multipart/form-data',
		dataType : 'json',
		method : 'POST'
	}

	constructor(props : IFormProps){
		super(props)
		this.handlerIframeLoad = this.handlerIframeLoad.bind(this)
		if(!supportFormData){
			this.iframeName = getIframeName()
		}

	}

	componentDidMount(){
		if(!supportFormData){
			this.iframe = document.createElement('iframe')
			this.iframe.name = this.iframeName
			this.iframe.id = this.iframeName
			this.iframe.style.width = '0px' 
			this.iframe.style.height = '0px' 
			this.iframe.style.border = 'none' 
			document.body.appendChild(this.iframe)
			this.iframe.onload = this.handlerIframeLoad
		}
	}

	componentWillUnmount(){
		if(this.iframe){
			this.iframe.onload = null
			document.body.removeChild(this.iframe)
			this.iframe = null
		}
	}    

	handlerIframeLoad(){
		let body = null
		if (this.iframe.contentDocument) {
			body = this.iframe.contentDocument.getElementsByTagName('body')[0]
		}else if(this.iframe.contentWindow){
			body = this.iframe.contentWindow.document.getElementsByTagName('body')[0]
		}
		if(body){
			let {dataType} = this.props
			let content = body.textContent || body.innerText || ''
			let cb = (data : any, type : 'onSuccess' | 'onError' | 'onComplete')=>{
				if (typeof this.props[type] === 'function') {
					this.props[type](data)
				}
			}
			if(dataType === 'json'){
				try{
					content = JSON.parse(content)
					cb(content,'onSuccess')
					cb(content,'onComplete')
				}catch(e){
					cb(content,'onError')
					cb(content,'onComplete')
				}
			}else{
				cb(content,'onSuccess')
				cb(content,'onComplete')
			}
		}
	}


	render() {
		let props = assign({},this.props)
		let {children} = this.props
		delete props.dataType
		delete props.onComplete
		delete props.onError
		delete props.onSuccess
		return (
			<form target={this.iframeName} {...props}>{children}</form>
		)
	}
}