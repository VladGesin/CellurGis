import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// eslint-disable-next-line
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbarcomponent = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
        <Navbar.Brand href="/">
          {/* <img alt="" src={NavLogo} width="30" height="30" className="d-inline-block align-top" /> Storm */}
          CellGis
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {/* <NavLink
              to="/ProjectsPage"
              activeClassName="active"
              className=" links-container"
            >
              Project's
            </NavLink> */}
            {/* <NavLink to="/Mappage" activeClassName="active" className=" links-container">
							{' '}
							Map
						</NavLink> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbarcomponent;
