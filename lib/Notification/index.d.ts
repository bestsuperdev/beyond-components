/// <reference types="react" />
import React = require('react');
import { X, Y } from './Container';
import { IBaseProps } from '../consts';
export declare enum States {
    none = 0,
    entering = 1,
    entered = 2,
    leaveing = 3,
    leaved = 4,
}
export interface INotificationProps extends IBaseProps {
    visible?: boolean;
    duration?: number;
    reverse?: boolean;
    x?: X;
    y?: Y;
    style?: object;
}
export interface INotificationState {
    message?: string;
    state?: States;
}
export default class Notification extends React.Component<INotificationProps, INotificationState> {
    static defaultProps: INotificationProps;
    static state: INotificationState;
    static getInstance(notification: JSX.Element): {
        show(message?: string): void;
        hide(): void;
    };
    handle: number;
    constructor(props: INotificationProps);
    componentWillReceiveProps(nextProps: INotificationProps): void;
    componentDidUpdate(prevProps: INotificationProps, prevState: INotificationState): void;
    componentDidMount(): void;
    show(message?: string): void;
    hide(): void;
    render(): JSX.Element;
}
