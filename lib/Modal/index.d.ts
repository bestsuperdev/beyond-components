/// <reference types="react" />
import React = require('react');
import { IBaseProps } from '../consts';
export declare type NS = number | string;
export interface IModalProps extends IBaseProps {
    title?: any;
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
}
export interface IModalState {
}
export default class Modal extends React.Component<IModalProps, IModalState> {
    static defaultProps: IModalProps;
    constructor(props: IModalProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IModalProps, prevState: IModalState): void;
    componentWillUnmount(): void;
    handlerClose(): void;
    render(): JSX.Element;
    renderHeader(): JSX.Element;
    renderFooter(): JSX.Element;
}
