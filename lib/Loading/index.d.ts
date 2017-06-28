/// <reference types="react" />
import React = require('react');
export interface ILoadingProps {
    message?: string;
    maxShowTime?: number;
}
export interface ILoadingState {
    rotate?: number;
    hidden: boolean;
}
export default class Loading extends React.Component<ILoadingProps, ILoadingState> {
    static getInstance(loading: JSX.Element): void;
    constructor(props: ILoadingProps);
    hiddenFlag: boolean;
    boxWidth: number;
    getBoxWidth(): number;
    resizeWith(): void;
    componentDidMount(): void;
    hide(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
