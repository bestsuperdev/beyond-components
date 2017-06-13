export const prefix = 'beyond_p-'

export interface IBaseProps<T> extends React.HTMLProps<T>    {
    extraClassName? : string;
    prefix? :string;
    // onClick? : (data?: any)=>any;
}