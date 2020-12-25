import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import NavLogo from './NavbarLogo.png';
import './Navbar.css';

const Navbarcomponent = () => {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">
					<img alt="" src={NavLogo} width="30" height="30" className="d-inline-block align-top" /> Storm
				</Navbar.Brand>
				<Nav>
					<NavLink to="/Workspace" activeClassName="active" className=" links-container">
						Graphs
					</NavLink>
					<NavLink to="/Mappage" activeClassName="active" className=" links-container">
						{' '}
						Map
					</NavLink>
					{/* <NavDropdown title="מחלקות" id="basic-nav-dropdown" dir="rtl" className=''>
        <NavDropdown.Item href="#action/3.1">צוות RF</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">הנדסה</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">מנויים</NavDropdown.Item>    
      </NavDropdown> */}
				</Nav>
			</Navbar>
		</div>
	);
};

export default Navbarcomponent;
