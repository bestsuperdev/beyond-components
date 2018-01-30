// import React from 'react'


import * as  React from 'react'

import Document from './pages/Document'
import Placeholder from './pages/Placeholder'
import Modal from './pages/Modal'
import Grid from './pages/Grid'
import Tabs from './pages/Tabs'
import Tooltip from './pages/Tooltip'
import Notification from './pages/Notification'
import Form from './pages/Form'
import Loading from './pages/Loading'
import Pagination from './pages/Pagination'
import SearchSelector from './pages/SearchSelector'
import Home from './pages/Home'


import {HashRouter as Router,Route,NavLink as Link} from 'react-router-dom'

interface IComponentPage {
	name : string;
	link : string;
	component : any;

	exact? : boolean;
	[key : string] : any;
}
const components : IComponentPage[] = [
	{name : 'Home', component : Home, link : '/',exact : true},
	{name : 'Document', component : Document, link : '/Document'},
	{name : 'Placeholder', component : Placeholder, link : '/Placeholder'},
	{name : 'Modal', component : Modal, link : '/Modal'},
	{name : 'Grid', component : Grid, link : '/Grid'},
	{name : 'Tabs', component : Tabs, link : '/Tabs'},
	{name : 'Tooltip', component : Tooltip, link : '/Tooltip'},
	{name : 'Notification', component : Notification, link : '/Notification'},
	{name : 'Form', component : Form, link : '/Form'},
	{name : 'Loading', component : Loading, link : '/Loading'},
	{name : 'Pagination', component : Pagination, link : '/Pagination'},
	{name : 'SearchSelector', component : SearchSelector, link : '/SearchSelector'}]


export default class App extends React.Component<any, any> {

	constructor(props : any){
		super(props)
		
	}


	render() {

		return (
			<Router>
				<div className="app">
					<div className="sidebar">
						{components.map((item)=> <Link  key={item.link}  to={item.link}>{item.name}</Link>)}
					</div>
					<div className="main">
						{components.map((item)=>{
							return <Route key={item.link}  path={item.link} component={item.component} exact={item.exact} /> 
						})}
					</div>
				</div>
			</Router>
		)
		
	}
}