/// <reference types="react" />
import { IBaseProps } from '../consts';
export declare type X = 'center' | 'left' | 'right';
export declare type Y = 'top' | 'middle' | 'bottom';
export interface IContainerProps extends IBaseProps {
    x?: X;
    y?: Y;
}
declare const Container: (props: IContainerProps) => JSX.Element;
export default Container;
