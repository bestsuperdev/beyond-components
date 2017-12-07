declare var module: any;
// declare var require: any;


declare module "react-hot-loader";

declare var require: {
    (path: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

declare function fetch<T>(url : string , options? : Object) : PromiseLike<T>;

declare interface Element {
    attachEvent(type : string,handler :(event : any)=>void) : void;
    detachEvent(type : string,handler :(event : any)=>void) : void;
}

declare interface Document {
    attachEvent(type : string,handler :(event : any)=>void) : void;
    detachEvent(type : string,handler :(event : any)=>void) : void;
}