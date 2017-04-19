/// <reference types="react" />
import React = require('react');
import { IBaseProps } from '../consts';
export interface ITabProps {
    key: string;
    title: string;
    disabled?: boolean;
}
export interface ITabState {
}
export interface ITabsProps extends IBaseProps {
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (key: string) => void;
    extraClassName?: string;
    style?: object;
}
export interface ITabsState {
    activeKey: string;
}
export declare class Tab extends React.Component<ITabProps, ITabState> {
    render(): JSX.Element;
}
export default class Tabs extends React.Component<ITabsProps, ITabsState> {
    static defaultProps: ITabsProps;
    state: ITabsState;
    constructor(props: ITabsProps);
    componentWillReceiveProps(nextProps: ITabsProps): void;
    render(): JSX.Element;
    renderNavs(): JSX.Element;
    renderTabs(): JSX.Element;
    handlerClick(activeKey: string, event: React.MouseEvent<Element>): void;
}
