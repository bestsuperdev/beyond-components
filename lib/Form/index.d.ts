/// <reference types="react" />
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
export interface IFormProps extends React.HTMLProps<HTMLFormElement> {
    onSuccess?: (res: any) => void;
    onError?: (res: any) => void;
    onComplete?: (res: any) => void;
    dataType?: 'json' | 'html';
}
export default class Form extends React.Component<IFormProps, any> {
    iframe: HTMLIFrameElement;
    iframeName: string;
    static defaultProps: IFormProps;
    constructor(props: IFormProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handlerIframeLoad(): void;
    render(): JSX.Element;
}
