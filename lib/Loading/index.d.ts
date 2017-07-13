/// <reference types="react" />
import React = require('react');
export interface ILoadingProps {
    message?: string;
    maxShowTime?: number;
}
export interface ILoadingState {
    message?: string;
    maxShowTime?: number;
    rotate?: number;
    hidden: boolean;
}
export default class Loading extends React.Component<ILoadingProps, ILoadingState> {
    static getInstance(loading: JSX.Element): {
        show(message?: string, showState?: ILoadingState): void;
        hide(): void;
    };
    constructor(props: ILoadingProps);
    hiddenFlag: boolean;
    boxWidth: number;
    box: any;
    handler: any;
    getBox(): void;
    getBoxWidth(): number;
    resizeWith(): void;
    componentDidMount(): void;
    show(messageValue?: string, showState?: ILoadingState): void;
    hide(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
