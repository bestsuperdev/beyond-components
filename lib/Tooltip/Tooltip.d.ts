/// <reference types="react" />
import React = require('react');
import { IBaseProps } from '../consts';
export interface ITooltipProps extends IBaseProps {
    visible?: boolean;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    style?: Object;
}
export interface ITooltipState {
    visible?: boolean;
    style?: Object;
}
export default class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
    static defaultProps: ITooltipProps;
    state: ITooltipState;
    constructor(props: ITooltipProps);
    _setStyle(style: Object): void;
    show(): void;
    hide(): void;
    toggle(visible: boolean): void;
    render(): JSX.Element;
}
