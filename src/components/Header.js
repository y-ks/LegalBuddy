import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Categories from "./../data/categories";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              className="logo"
              src={process.env.PUBLIC_URL + "/favicon.ico"}
              alt="logo"
            />
            <span>Legal Buddy</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">all</Nav.Link>
            {Categories.map((value, i) => (
              <Nav.Link key={i}>{value}</Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
