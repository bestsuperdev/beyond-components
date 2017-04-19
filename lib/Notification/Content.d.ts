/// <reference types="react" />
import { IBaseProps } from '../consts';
export interface IContentProps extends IBaseProps {
    reverse?: boolean;
    children?: any;
    style?: object;
}
declare const Content: (props: IContentProps) => JSX.Element;
export default Content;
