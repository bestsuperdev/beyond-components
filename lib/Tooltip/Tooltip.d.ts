/// <reference types="react" />
import React = require('react');
import { IBaseProps } from '../consts';
export interface ITooltipProps extends IBaseProps {
    defaultVisible?: boolean;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    style?: React.CSSProperties;
    children?: any;
}
export interface ITooltipState {
    visible?: boolean;
    style?: React.CSSProperties;
}
export default class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
    static defaultProps: ITooltipProps;
    state: ITooltipState;
    constructor(props: ITooltipProps);
    _setStyle(style: React.CSSProperties): void;
    show(): void;
    hide(): void;
    toggle(visible: boolean): void;
    render(): JSX.Element;
}
