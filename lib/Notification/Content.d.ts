/// <reference types="react" />
export interface IContentProps {
    className?: string;
    extraClassName?: string;
    reverse?: boolean;
    children?: any;
    style?: object;
}
declare const Content: (props: IContentProps) => JSX.Element;
export default Content;
