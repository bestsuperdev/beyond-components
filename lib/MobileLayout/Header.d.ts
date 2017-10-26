/// <reference types="react" />
import * as React from 'react';
export interface IMobileLayoutHeaderProps extends React.HTMLProps<HTMLDivElement> {
    height?: number | string;
}
export interface IHeaderState {
}
declare const Header: (props: IMobileLayoutHeaderProps) => JSX.Element;
export default Header;
