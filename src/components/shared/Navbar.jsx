import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavigationBar = () => {
  return (
    <Navbar
      className="px-4 py-2"
      style={{
        background:
          "linear-gradient(90deg, rgba(63,43,150,1) 0%, rgba(168,192,255,1) 100%)"
      }}
      expand="lg"
    >
      <Navbar.Brand as={Link} to="/" className="font-weight-bold">
        Fin-Management
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/incomes" className="mr-3 text-light">
            Incomes
          </Nav.Link>
          <Nav.Link as={Link} to="/savings" className="text-light">
            Savings
          </Nav.Link>
          <Nav.Link as={Link} to="/expenses" className="text-light">
            Expenses
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
