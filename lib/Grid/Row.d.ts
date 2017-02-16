/// <reference types="react" />
import React = require('react');
export interface IRowProps {
    width?: number | string;
    gutter?: number;
    verticalGutter?: number;
    style?: any;
    className?: string;
    extraClassName?: string;
    grids?: number;
}
export interface IRowState {
}
export default class Row extends React.Component<IRowProps, IRowState> {
    static defaultProps: IRowProps;
    render(): JSX.Element;
    renderCols(): React.ReactElement<any>[];
}
