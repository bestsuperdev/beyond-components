/// <reference types="react" />
import React = require('react');
export interface ITooltipProps {
    visible?: boolean;
    duration?: number;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    style?: Object;
    extraClassName?: string;
    className?: string;
}
export interface ITooltipState {
    visible?: boolean;
    style?: Object;
}
export default class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
    static defaultProps: ITooltipProps;
    state: ITooltipState;
    handle: number;
    constructor(props: ITooltipProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: ITooltipProps): void;
    componentDidUpdate(): void;
    _setStyle(style: Object): void;
    show(): void;
    hide(): void;
    toggle(visible: boolean): void;
    render(): JSX.Element;
}
