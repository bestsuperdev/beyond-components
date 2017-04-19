/// <reference types="react" />
import React = require('react');
import { IBaseProps } from '../consts';
export interface IRowProps extends IBaseProps {
    width?: number | string;
    gutter?: number;
    verticalGutter?: number;
    style?: any;
    grids?: number;
}
export interface IRowState {
}
export default class Row extends React.Component<IRowProps, IRowState> {
    static defaultProps: IRowProps;
    render(): JSX.Element;
    renderCols(): React.ReactElement<any>[];
}
