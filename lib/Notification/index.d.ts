/// <reference types="react" />
/**
 *
    let notice = Notification.getInstance(<Notification />)
    notice.show("hello world",{duration : 3})

    <Notification ref={(n)=> this.n = n } >hello notification</Notification>
    this.n.show()
 */
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
export interface INotificationShowState {
    duration?: number;
    reverse?: boolean;
    x?: X;
    y?: Y;
}
export interface INotificationState {
    message?: string;
    state?: States;
    showState?: INotificationShowState;
}
export interface INotificationProps extends INotificationShowState, IBaseProps {
}
export default class Notification extends React.Component<INotificationProps, INotificationState> {
    static defaultProps: INotificationProps;
    static state: INotificationState;
    static getInstance(notification: JSX.Element): {
        show(message?: string, showState?: INotificationShowState): void;
        hide(): void;
    };
    handle: number;
    constructor(props: INotificationProps);
    componentDidUpdate(): void;
    componentDidMount(): void;
    show(message?: string, showState?: INotificationShowState): void;
    hide(): void;
    render(): JSX.Element;
}
