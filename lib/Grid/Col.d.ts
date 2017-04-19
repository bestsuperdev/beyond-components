/// <reference types="react" />
import { IBaseProps } from '../consts';
export declare type NS = number | string;
export interface IColProps extends IBaseProps {
    width?: NS;
    offsetWidth?: NS;
    col?: number;
    offsetCol?: number;
    style?: any;
    grids?: number;
    children?: any;
}
declare const Col: (props: IColProps) => JSX.Element;
export default Col;
