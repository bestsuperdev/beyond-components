/// <reference types="react" />
import * as React from 'react';
export interface OptionProps {
    value?: string;
    text?: string;
    selected?: boolean;
    onClick?: () => void;
    key?: number;
    matchValue?: string;
    indent?: boolean;
}
export declare class Option extends React.Component<OptionProps, {}> {
    getSeparateString(matchValue: string, str: string): {
        strBegin: string;
        strEnd: string;
    };
    render(): JSX.Element;
}
export interface ISearchSelectorProps {
    extraClassName?: string;
    placeholder?: string;
    onChange?: (data: any) => void;
    extraTextClass?: string;
    showMaxCount?: number;
    withoutText?: boolean;
    searchFun?: (searchValue: string) => void;
    clickInputEmpty?: boolean;
}
export interface ISearchSelectorState {
    showOption?: boolean;
    selectOption?: any;
    searchContent?: string;
    searchOptions?: any[];
}
export declare class SearchSelector extends React.Component<ISearchSelectorProps, ISearchSelectorState> {
    handle: any;
    innerClick: boolean;
    options: any[];
    private hideOptionFun;
    static defaultProps: ISearchSelectorProps;
    constructor(props: ISearchSelectorProps);
    refs: {
        wrap: any;
    };
    hideOption(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextprops: any): void;
    componentWillUnmount(): void;
    getDefaultSelect(props: any): {
        value: string;
        text: string;
    };
    getOptionObject(option: any): {
        value: any;
        text: any;
    } | {
        value: any;
        text: any;
        isPlaceholder: boolean;
    };
    getOptions(props: any): any[];
    handlerTextClick(): void;
    handlerInputClick(): void;
    handlerClickOption(obj: any, event: any): void;
    renderOptions(): JSX.Element;
    getMatchOptions(matchValue: any): any[];
    judgeMatchState(event: any): void;
    renderInput(): JSX.Element;
    render(): JSX.Element;
}
