import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
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
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
          </Nav>
          {user && (
            <Nav className="me-end">
              <Nav.Link active as={Link} to="/home">
                {user.email}
              </Nav.Link>
            </Nav>
          )}
          <Nav className="me-end">
            <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
