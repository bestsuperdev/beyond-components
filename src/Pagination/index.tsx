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


import * as React from 'react'
import { prefix, IBaseProps } from '../consts'
import classnames = require('classnames')

enum Type{
	omission,page,active,first,last,prev,next
}
export interface IPaginationItem{
	type : Type;
	value : any;
}


function getPageItems(props : IPaginationProps) : IPaginationItem[]{
	let items : IPaginationItem[] = [],i:number
	let {page,offset,totals,prev,next,first,last,omission} = props

	//页数不为1，则插入pre

	if(page > 1 && first) {
		items.push({type : Type.first,value : first})
	}
	if(page > 1 && prev){
		items.push({type : Type.prev ,value : prev})
	}

	//对当前页前半部分进行判断


	if(page - 2 * offset - 1 <= 1 ) {
		for (i = 1; i < page; i++) { items.push({type : Type.page,value : i}) }
	}else{
		//期间页数太多,则添加省略号
		for (i = 1; i <= offset; i++) { items.push({type : Type.page,value : i}) }
		items.push({type : Type.omission, value : omission })
		for (i = page - offset; i < page; i++) { items.push({type : Type.page,value : i}) }
	}
	
	//插入当前页
	items.push({type : Type.active, value : page})
	
	//对当前页后半部分进行处理
	if(totals - page > 2 * offset + 1 ){
		//期间页数太多,则添加省略号
		for (i = page+1; i <= page + offset; i++) { items.push({type : Type.page,value : i}) }
		items.push({type : Type.omission, value : omission })
		for (i = totals - offset + 1; i <= totals; i++) { items.push({type : Type.page,value : i}) }
	}else{
		for (i = page+1; i <= totals; i++) { items.push({type : Type.page,value : i}) }
	}

	//如果当前页数非最后一页,则插入next
	if(page < totals && next) { items.push({type : Type.next, value : next}) }
	if(page < totals && last) { items.push({type : Type.last, value : last}) }
	return items
}

interface IPaginationProps extends IBaseProps{
	page? : number;
	totals? : number;
	offset? : number;
	omission? : string;
	onChange? : (options : {page : number})=> void;
	first? : any;
	last? : any;
	prev? : any;
	next? : any;
	showSizeChange? : boolean;
	showGoto? : boolean;
	size? : number;
	defaultSize? : number;
	sizes? : number[];
	
} 


export default class Pagination extends React.Component<IPaginationProps, {}> {

	constructor(props : IPaginationProps){
		super(props)
	}

	static defaultProps = {
		offset : 1,
		omission : '...',
		next : '下一页',
		prev : '上一页',
		first : '首页',
		last : '尾页',
		prefix,
		showSizeChange : false,
		showGoto : false,
		sizes : [10,20,30,50]
	}

	input : HTMLInputElement

	handlerClick(item : IPaginationItem){
		if(typeof this.props.onChange === 'function'){
			let page
			let {totals,page : current} = this.props
			switch (item.type) {
				case Type.page:
					page = item.value
					break
				case Type.first:
					page = 1
					break
				case Type.last:
					page = totals
					break
				case Type.prev:
					page = current - 1
					break
				case Type.next:
					page = current + 1
					break
			}
			if(page != null){
				this.props.onChange({page})
			}
		}
	}

	handlerGodo = (e : React.KeyboardEvent<HTMLInputElement>)=>{
		if(e.which === 13 && typeof this.props.onChange === 'function'){
			this.props.onChange({page : +e.currentTarget.value})
			setTimeout(() => {
				this.input.value = ''
			}, 0)
		}
	}

	public render(): JSX.Element {

		const className = `${this.props.prefix}pagination`
		const items = getPageItems(this.props)
		const {showSizeChange,sizes,showGoto} = this.props
		return (
			<div className={className}>
				{items.map((item)=> {
					let classNames = classnames(`${className}-item`,item.type === Type.active && `${className}-active`)
					return (
						<div key={item.value} onClick={this.handlerClick.bind(this,item)} className={classNames}>
							{item.value}
						</div>
					)
				})}
				{showSizeChange &&(
					<select>
						{sizes.map((size)=> <option value={size}>{size}</option> )}
					</select>
				)}
				{showGoto && (

					<input ref={(input)=> this.input = input } onKeyDown={this.handlerGodo} type="text" placeholder="Goto"/>
				)}
			</div>
		)
	}
}

