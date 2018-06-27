

declare var module: any;


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

// declare namespace process {
//     export namespace env {
//         export const NODE_ENV;
//     }
// }

// declare const __webpack_public_path__ : string;