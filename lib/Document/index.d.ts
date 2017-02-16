/// <reference types="react" />
import React = require('react');
export interface IDocumentProps {
    delay?: number;
    children?: any;
    onClick?: (event?: React.MouseEvent<Element>) => void;
}
export interface IDocumentState {
}
export default class Document extends React.Component<IDocumentProps, IDocumentState> {
    private innerClick;
    static defaultProps: IDocumentProps;
    constructor(props: IDocumentProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handlerInnerClick(): void;
    handlerOutClick(): void;
    render(): any;
}
