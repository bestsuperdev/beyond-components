/// <reference types="react" />
import * as React from 'react';
export interface IMobileLayoutContainerProps extends React.HTMLProps<HTMLDivElement> {
    height?: string | number;
}
declare const Container: (props: IMobileLayoutContainerProps) => JSX.Element;
export default Container;
