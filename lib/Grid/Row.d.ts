/// <reference types="react" />
import { IBaseProps } from '../consts';
export interface IRowProps extends IBaseProps {
    width?: number | string;
    gutter?: number;
    verticalGutter?: number;
    grids?: number;
}
export interface IRowState {
}
declare const Row: (props: IRowProps) => JSX.Element;
export default Row;
