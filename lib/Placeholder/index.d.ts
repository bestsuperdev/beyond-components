/// <reference types="react" />
import React = require('react');
export interface IPlaceholderProps {
    children?: any;
    color?: string | number;
}
export interface IPlaceholderState {
    isPlaceholder?: boolean;
    value?: string;
}
export default class Placeholder extends React.Component<IPlaceholderProps, IPlaceholderState> {
    static defaultProps: IPlaceholderProps;
    constructor(props: IPlaceholderProps);
    render(): any;
    handleChange(event: React.SyntheticEvent<Element>): void;
    handleBlur(event: React.SyntheticEvent<Element>): void;
    handleFocus(event: React.SyntheticEvent<Element>): void;
}
