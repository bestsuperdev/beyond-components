/*

function handler(activePage){

}

<Pagination 
    offset={3}
    omission="..."
    onChange={handler} 
    first={true} 
    last={true} 
    prev={true} 
    next={true} 
    active={1} 
    totals={100} />


<div class="pagination">
    <div>1</div>
    <div>2</div>
    <div class="pagination-active">3</div>
    <div>...</div>
    <div>95</div>
    <div>96</div>
    <div>97</div>
    <div>98</div>
    <div>99</div>
    <div>100</div>
</div>
*/


import * as React from 'react';
import { prefix as _prefix, IBaseProps } from '../consts'
import classnames = require('classnames')
import assign = require('beyond-lib/lib/assign')

enum Type{
    omission,page,active,first,last,prev,next
}
export interface IPaginationItem{
    type : Type;
    value : any;
}


function getPageItems(props : IPaginationProps) : IPaginationItem[]{
    let items : IPaginationItem[] = [],i:number
    let {active,offset,totals,prev,next,first,last,omission} = props

    //页数不为1，则插入pre

    if(active > 1 && first) {
        items.push({type : Type.first,value : first})
    }
    if(active > 1 && prev){
        items.push({type : Type.prev ,value : prev})
    }

    //对当前页前半部分进行判断


    if(active - 2 * offset - 1 <= 1 ) {
        for (i = 1; i < active; i++) items.push({type : Type.page,value : i})
    }else{
        //期间页数太多,则添加省略号
        for (i = 1; i <= offset; i++) items.push({type : Type.page,value : i})
        items.push({type : Type.omission, value : omission })
        for (i = active - offset; i < active; i++) items.push({type : Type.page,value : i})
    }
    
    //插入当前页
    items.push({type : Type.active, value : active})
    
    //对当前页后半部分进行处理
    if(totals - active > 2 * offset + 1 ){
        //期间页数太多,则添加省略号
        for (i = active+1; i <= active + offset; i++) items.push({type : Type.page,value : i})
        items.push({type : Type.omission, value : omission })
        for (i = totals - offset + 1; i <= totals; i++) items.push({type : Type.page,value : i})
    }else{
        for (i = active+1; i <= totals; i++) items.push({type : Type.page,value : i})
    }

    //如果当前页数非最后一页,则插入next
    if(active < totals && next) items.push({type : Type.next, value : next})
    if(active < totals && last) items.push({type : Type.last, value : last})
    return items
}

interface IPaginationProps extends IBaseProps{
    active? : number;
    totals? : number;
    offset? : number;
    omission? : string;
    onChange? : (active : number)=> void;
    first? : any;
    last? : any;
    prev? : any;
    next? : any;
} ;

interface IPaginationState {};

export default class Pagination extends React.Component<IPaginationProps, IPaginationState> {

    static defaultProps = {
        offset : 2,
        omission : '...',
        next : '下一页',
        prev : '上一页',
        first : '首页',
        last : '尾页'
    }

    handlerClick(item : IPaginationItem){
        if(typeof this.props.onChange === 'function'){
            let value
            let {totals,active} = this.props
            switch (item.type) {
                case Type.page:
                    value = item.value
                    break;
                case Type.first:
                    value = 1
                    break;
                case Type.last:
                    value = totals
                    break;
                case Type.prev:
                    value = active - 1
                    break;
                case Type.next:
                    value = active + 1
                    break;
            }
            if(value != null){
                this.props.onChange(value)
            }
        }
    }

    public render(): JSX.Element {
        let {prefix} = this.props

        const className = `${prefix || _prefix}pagination`
        const items = getPageItems(this.props)
        return (
            <div className={className}>
                {items.map((item)=> {
                    let classNames = classnames(`${className}-item`,item.type === Type.active && `${className}-active`)
                    return <div onClick={this.handlerClick.bind(item)} className={classNames}>{item.value}</div>
                })}
            </div>
        )
    }
}

