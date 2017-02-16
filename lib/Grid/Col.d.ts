/// <reference types="react" />
export declare type NS = number | string;
export interface IColProps {
    width?: NS;
    offsetWidth?: NS;
    col?: number;
    offsetCol?: number;
    style?: any;
    className?: string;
    extraClassName?: string;
    grids?: number;
    children?: any;
}
declare const Col: (props: IColProps) => JSX.Element;
export default Col;
