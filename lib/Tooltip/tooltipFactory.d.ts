/// <reference types="react" />
export interface ITooltipOperator {
    show: (target: HTMLElement) => void;
    hide: () => void;
}
export declare function getNewInstance(tooltip: JSX.Element): ITooltipOperator;
