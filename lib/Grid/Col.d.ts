/// <reference types="react" />
import * as React from 'react';
export declare type NS = number | string;
export interface IColProps extends React.HTMLProps<HTMLDivElement> {
    width?: NS;
    offsetWidth?: NS;
    col?: number;
    offsetCol?: number;
    grids?: number;
    extraClassName?: string;
    prefix?: string;
}
declare const Col: (props: IColProps) => JSX.Element;
export default Col;
