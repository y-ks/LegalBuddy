import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Lawyers from "./../data/lawyers";

const Header = () => {
  const categories = [];
  Lawyers.forEach((lawyer) => {
    categories.push(lawyer["category"]);
  });
  return (
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
          <Nav.Link href="/">home</Nav.Link>
          {categories.map((category, i) => (
            <Nav.Link key={i}>{category}</Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
