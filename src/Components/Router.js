import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from '../Views/Home';
import Staff from '../Views/Staff';
import Footer from '../Components/Footer';
import StaffForm from '../Components/StaffForm';
import './Router.css';


export default class AppRouter extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<>
				<div className='vh-100 container-fluid'>
					<header className='row'>
						<h1 className='bg-danger m-0 p-0 text-right col-12'>TELEFONOS ETC ETC ETC</h1>
					</header>
					<Router>
						<Navbar color="dark" dark expand="md" className='row '>
							<NavbarBrand href="/">reactstrap</NavbarBrand>
							<NavbarToggler onClick={this.toggle} />
							<Collapse isOpen={this.state.isOpen} navbar>

								<Nav className="ml-auto" navbar>
									<NavItem>
										<Link to='/' className='nav-link'>Home</Link>
									</NavItem>
									<NavItem>
										<Link to='/staff/' className='nav-link'>Staff</Link>
									</NavItem>
								</Nav>

							</Collapse>
						</Navbar>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/staff/" exact component={Staff} />
							<Route path="/staff/new" exact component={StaffForm} />
							<Route path="/staff/edit/:id" exact component={StaffForm} />
						</Switch>
					</Router>
				</div>
			</>
		);
	}
}

