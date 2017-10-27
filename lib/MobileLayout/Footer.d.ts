/// <reference types="react" />
import * as React from 'react';
export interface IFooterProps {
    className?: string;
    style?: React.CSSProperties;
    children?: any;
    height?: number | string;
}
export interface IFooterState {
}
export default class Footer extends React.Component<IFooterProps, IFooterState> {
    static defaultProps: IFooterProps;
    render(): JSX.Element;
}
