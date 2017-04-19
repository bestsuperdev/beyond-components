/// <reference types="react" />
import { IBaseProps } from '../consts';
export declare type X = 'center' | 'left' | 'right';
export declare type Y = 'top' | 'middle' | 'bottom';
export interface IContainerProps extends IBaseProps {
    className?: string;
    extraClassName?: string;
    x?: X;
    y?: Y;
    children?: any;
    style?: object;
}
declare const Container: (props: IContainerProps) => JSX.Element;
export default Container;
