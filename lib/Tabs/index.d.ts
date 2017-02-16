/// <reference types="react" />
import React = require('react');
export interface ITabProps {
    navExtraClassName?: string;
    paneExtraClassName?: string;
    key: string;
    title: string;
    disabled?: boolean;
}
export interface ITabState {
}
export interface ITabsProps {
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (key: string) => void;
    className?: string;
    extraClassName?: string;
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
    handleClick(activeKey: string, event: React.MouseEvent<Element>): void;
}
