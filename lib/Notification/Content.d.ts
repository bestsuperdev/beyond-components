/// <reference types="react" />
import { IBaseProps } from '../consts';
export interface IContentProps extends IBaseProps {
    reverse?: boolean;
}
declare const Content: (props: IContentProps) => JSX.Element;
export default Content;
