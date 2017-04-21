/// <reference types="react" />
import React = require('react');
export interface ITriggerProps {
    tooltip: any;
}
export interface ITriggerState {
}
export default class Trigger extends React.Component<ITriggerProps, ITriggerState> {
    tooltip: {
        show: (node: Element) => void;
        hide: () => void;
    };
    target: Element;
    componentDidMount(): void;
    render(): React.SFCElement<{
        onMouseEnter: {};
        onMouseLeave: {};
    }>;
    show(): void;
    hide(): void;
}
