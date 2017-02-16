/// <reference types="react" />
export interface IContentProps {
    className?: string;
    extraClassName?: string;
    reverse?: boolean;
    children?: any;
}
declare const Content: (props: IContentProps) => JSX.Element;
export default Content;
