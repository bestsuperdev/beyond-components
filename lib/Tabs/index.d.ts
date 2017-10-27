/// <reference types="react" />
import React = require('react');
import { IBaseProps } from '../consts';
export interface ITabProps extends IBaseProps {
    title: string;
    disabled?: boolean;
}
export interface ITabState {
}
export interface ITabsProps extends IBaseProps {
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (key: string) => void | boolean;
}
export interface ITabsState {
    activeKey: string;
}
export declare const Tab: (props: ITabProps) => JSX.Element;
export default class Tabs extends React.Component<ITabsProps, ITabsState> {
    static defaultProps: ITabsProps;
    state: ITabsState;
    constructor(props: ITabsProps);
    getActiveKey(): string;
    render(): JSX.Element;
    renderNavs(): JSX.Element;
    renderTabs(): JSX.Element;
    handlerClick(activeKey: string): void;
}
