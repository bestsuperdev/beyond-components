/// <reference types="react" />
import * as React from 'react';
export interface OptionProps {
    value?: string;
    text?: string;
    selected?: boolean;
    onClick?: () => void;
    onMouseOver?: () => void;
    index?: number;
    matchValue?: string;
    indent?: boolean;
    activeIndex?: number;
}
export declare class Option extends React.Component<OptionProps, {}> {
    renderText(matchValue: string, str: string): JSX.Element;
    render(): JSX.Element;
}
export interface ISearchSelectorProps {
    extraClassName?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    onChange?: (data: {
        text: string;
        value: string;
    }) => void;
    extraTextClass?: string;
    showMaxCount?: number;
    displaySearchInput?: boolean;
    onSearch?: (searchValue: string) => void;
    clickInputEmpty?: boolean;
}
export interface ISearchSelectorState {
    showOption?: boolean;
    selectOption?: any;
    searchContent?: string;
    searchOptions?: any[];
    temp_activeIndex?: number;
}
export default class SearchSelector extends React.Component<ISearchSelectorProps, ISearchSelectorState> {
    handle: any;
    innerClick: boolean;
    options: any[];
    searchOptions: any[];
    private hideOptionFun;
    static defaultProps: ISearchSelectorProps;
    constructor(props: ISearchSelectorProps);
    refs: any;
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
        index: any;
    };
    getOptions(props: any): any[];
    handlerTextClick(): void;
    handlerInputClick(): void;
    handlerClickOption(obj: any, event: any): void;
    handlerKeydownSelectorOption(event: any): void;
    scrollTo(index: number): void;
    componentDidUpdate(): void;
    handlerMouseoverSelectorOption(obj: any, event: any): void;
    renderOptions(): JSX.Element;
    getMatchOptions(matchValue: any): any[];
    judgeMatchState(event: any): void;
    renderInput(): JSX.Element;
    render(): JSX.Element;
}
