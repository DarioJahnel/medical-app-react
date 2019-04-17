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
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from 'src\Views\Home.js';
import Staff from 'src\Views\Staff.js';


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
    {/* NAVBAR */}
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
            <Router>
                <div>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to='/' class='nav-link'>Home</Link>
                        </NavItem>
                        <NavItem>
                        <Link to='/staff/' class='nav-link'>Staff</Link>
                        </NavItem>
                    </Nav>
                    {/* <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/staff/" component={Staff} />
                    </Switch> */}
                </div>	
            </Router>
            </Collapse>
        </Navbar>
      );
    }
}
