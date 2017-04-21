import React = require('react')
import classnames = require('classnames')
import assign = require('beyond-lib/lib/assign')
import { prefix, IBaseProps } from '../consts'


let scrollBarWidth : number = null
let originBodyPaddingRight : string = null
let modalBodyOpenClassName = `${prefix}modal-body-open`
let isSetBodyPadding = false
let count = 0

function bodyIsOverflowing() {
	//以下代码摘自bootstrap modal.js
	var fullWindowWidth = window.innerWidth
	if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
		var documentElementRect = document.documentElement.getBoundingClientRect()
		fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
	}
	return Math.max((document.body.clientWidth || 0), (document.documentElement.clientWidth || 0)) < fullWindowWidth
}

function measureScrollBar() {
	if (!scrollBarWidth) {
		var scrollDiv = document.createElement('div')
		scrollDiv.style.position = 'absolute'
		scrollDiv.style.top = '-9999px'
		scrollDiv.style.width =  '50px'
		scrollDiv.style.height =  '50px'
		scrollDiv.style.overflow = 'scroll'
		document.body.appendChild(scrollDiv)
		// this.$body.append(scrollDiv)
		scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
		document.body.removeChild(scrollDiv)
	}
	return scrollBarWidth
}

function setBodyPadding() {
	// console.log(bodyIsOverflowing())
	if (bodyIsOverflowing() && !isSetBodyPadding) {
		originBodyPaddingRight = document.body.style.paddingRight
		document.body.style.paddingRight = `${measureScrollBar()}px`
		document.body.className = document.body.className ? (document.body.className + ` ${modalBodyOpenClassName}`) : modalBodyOpenClassName
		isSetBodyPadding = true
		return true
	}
	return false
}

function resetBodyPadding() {
	if (isSetBodyPadding && count === 0) {
		document.body.style.paddingRight = originBodyPaddingRight
		document.body.className = document.body.className.replace(modalBodyOpenClassName,' ').trim().replace(/\s+/,' ')
		isSetBodyPadding = false
		return true
	}
	return false
}

function getHeight(height : NS) : NS{
	if(typeof height === 'number' && height < 1){
		if(typeof window !== 'undefined') {
			return (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.7
		}else {
			return  0
		}
	}else if(typeof height === 'string' && /%$/.test(height)){
		return  (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * parseInt(height,10) / 100
	}
	return height
}

export type NS = number | string;

export interface IModalProps  extends IBaseProps{
    title? : string;
    close? : boolean;
    closeIcon? : any;
    footer? : any;
    visible? : boolean;
    bodyHeight? : NS;
    maxBodyHeight? : NS;
    width? : NS;
	maxWidth? : NS;
    mask? : boolean;
    maskClickClose? : boolean; 
    onOpen? : ()=>void;
    onClose? : ()=>void;
    extraClassName? : string;
    style? : Object;
}

export interface IModalState {};

export default class Modal extends React.Component<IModalProps, IModalState> {

    static defaultProps : IModalProps = {
		prefix : prefix,
		maxBodyHeight : 0.7,
		visible : false,
		maskClickClose : true,
		mask : true,
		closeIcon : 'X'
	}

    constructor(props : IModalProps){
        super(props)
    }

	componentDidMount() {
		// this.isSetBodyPadding = false
		if (this.props.visible) {
			count++
			setBodyPadding()
		}else{
			if (count > 0) {
				count--
			}
			resetBodyPadding()
		}
	}

	componentDidUpdate(prevProps : IModalProps, prevState : IModalState) {
		if (!prevProps.visible !== !this.props.visible) {
			this.componentDidMount()
		}
	}

	componentWillUnmount() {
		if (count > 0) {
			count--
		}
		resetBodyPadding()
	}


	render() {
		let {prefix,style,visible,extraClassName,maskClickClose,width,maxWidth,bodyHeight,maxBodyHeight} = this.props
		let className = `${prefix}modal`
		style = assign({},style)
		if (!visible) {
			(style as any).display = 'none'
		}
		let mask : JSX.Element
		if (this.props.mask !== false) {
			mask = (<div onClick={maskClickClose ? this.handlerClose.bind(this) : null} className={`${className}-mask`}></div>)
		}

		const dialogStyle  = {width,maxWidth}
		const bodyStyle = {height : getHeight(bodyHeight), maxHeight : getHeight(maxBodyHeight) }

		return (
			<div className={classnames(className,extraClassName)} style={style}>
				{mask}
				<div className={`${className}-dialog`} style={dialogStyle}>
					{this.renderHeader()}
					<div className={`${className}-body`} style={bodyStyle}>{this.props.children}</div>
					{this.renderFooter()}
				</div>
			</div>
		)
	}

	handlerClose() {
		if (this.props.visible && typeof this.props.onClose === 'function') {
			this.props.onClose()	
		}
	}

	renderHeader(){
		let title : JSX.Element , closeBtn : JSX.Element
		const {title : _title, close, prefix, closeIcon} = this.props
		let className = `${prefix}modal`
		if (_title || close !== false) {
			if (_title != null) {
				title = <h4 title={_title} className={`${className}-title`}>{_title}</h4>
			}
			if (close !== false) {
				closeBtn = <span onClick={this.handlerClose.bind(this)} className={`${className}-close`}>{closeIcon}</span>
			}
			return (
				<div className={`${className}-header`}>{title}{closeBtn}</div>
			)
		}
	}

	renderFooter(){
		if (this.props.footer != null) {
			const {prefix} = this.props
			let className = `${prefix}modal`
			return (
				<div className={`${className}-footer`}>
					{this.props.footer}
				</div>
			)
		}
	}
}