import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { NavLink, Link } from "react-router-dom";

export const Header = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">
          E-manage
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
            )}
          </Nav>
          {user && (
            <NavDropdown
              className="text-white"
              title="Profile"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/home">
                {user.email.charAt(0).toUpperCase() + user.email.slice(1)}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
