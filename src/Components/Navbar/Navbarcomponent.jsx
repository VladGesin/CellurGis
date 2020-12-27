import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbarcomponent = () => {
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">
					{/* <img alt="" src={NavLogo} width="30" height="30" className="d-inline-block align-top" /> Storm */}
					Storm
				</Navbar.Brand>
				<Nav>
					<NavLink to="/Workspace" activeClassName="active" className=" links-container">
						Graphs
					</NavLink>
					<NavLink to="/Mappage" activeClassName="active" className=" links-container">
						{' '}
						Map
					</NavLink>
				</Nav>
			</Navbar>
		</div>
	);
};

export default Navbarcomponent;
