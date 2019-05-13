import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	Col,
	Row
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
				<Router>
					<Col xs='12' style={{
						height: '10vh',
						zIndex: '1000000'
					}}>
						<header className='row'>
							<h1 className='bg-danger m-0 p-0 text-right col-12'>TELEFONOS ETC ETC ETC</h1>
						</header>
						<Navbar color="dark" dark expand="md" className='row py-0 '>
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
					</Col>
					<Col xs='12' style={{
						height: '85vh',
						maxHeight: '85vh',
						overflowY: 'auto',
						paddingTop: '0.7em'
					}} className=''>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/staff/" exact component={Staff} />
							<Route path="/staff/new" exact component={StaffForm} />
							<Route path="/staff/edit/:id" exact component={StaffForm} />
						</Switch>
					</Col>
					<Col xs='12' className='bg-danger' style={{
						height: '5vh'
					}}>
						<Footer />
					</Col>
				</Router>
			</>
		);
	}
}

