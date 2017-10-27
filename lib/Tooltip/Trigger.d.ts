/// <reference types="react" />
import React = require('react');
import { ITooltipOperator } from './tooltipFactory';
export interface ITriggerProps {
    tooltip: JSX.Element;
}
export interface ITriggerState {
}
export default class Trigger extends React.Component<ITriggerProps, ITriggerState> {
    tooltipOperator: ITooltipOperator;
    target: HTMLElement;
    componentDidMount(): void;
    render(): React.ReactElement<any>;
    show(): void;
    hide(): void;
}
