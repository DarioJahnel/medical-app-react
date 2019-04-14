import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
	DropdownItem } from 'reactstrap';
	
import './Header.css';

export default class Header extends React.Component {
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

			// HEADER
			<div className='h-10 '>
				<header>
					<h1 className='top'>TELEFONOS ETC ETC ETC</h1>
				</header>

				
				{/* NAVBAR */}
				<div>
					<Navbar color="light" light expand="md">
						<NavbarBrand href="/">reactstrap</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="/components/">Components</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
								</NavItem>
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
										Options
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem>
											Option 1
										</DropdownItem>
										<DropdownItem>
											Option 2
										</DropdownItem>
										<DropdownItem divider />
										<DropdownItem>
											Reset
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</Nav>
						</Collapse>
					</Navbar>
				</div>
			</div>
    );
  }
}