/// <reference types="react" />
import React = require('react');
export declare type NS = number | string;
export interface IModalProps {
    title?: string;
    close?: boolean;
    closeIcon?: any;
    footer?: any;
    visible?: boolean;
    bodyHeight?: NS;
    maxBodyHeight?: NS;
    width?: NS;
    maxWidth?: NS;
    mask?: boolean;
    maskClickClose?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    className?: string;
    extraClassName?: string;
    style?: Object;
}
export interface IModalState {
}
export default class Modal extends React.Component<IModalProps, IModalState> {
    static defaultProps: IModalProps;
    constructor(props: IModalProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IModalProps, prevState: IModalState): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    handlerClose(): void;
    renderHeader(): JSX.Element;
    renderFooter(): JSX.Element;
}
