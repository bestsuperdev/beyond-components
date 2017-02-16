/// <reference types="react" />
import React = require('react');
import { X, Y } from './Container';
/**
 let n = Notification.getHandle(<Notification visible duration >show</Notification>)
 n.show
 <Notification visible duration >show</Notification>
 */
export interface INotificationProps {
    visible?: boolean;
    duration?: number;
    reverse?: boolean;
    x?: X;
    y?: Y;
    extraClassName?: string;
}
export interface INotificationState {
    visible?: boolean;
    message?: string;
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
