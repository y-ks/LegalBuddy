import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/features/categorySlice";
import Lawyers from "./../data/lawyers";
import { MenuButton } from "./MenuButton";

const Header = () => {
  const dispatch = useDispatch();
  const categories = [];
  Lawyers.forEach((lawyer) => {
    const category = lawyer["category"];
    if (categories.indexOf(category) === -1) categories.push(category);
  });
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => dispatch(setCategory("all"))}>
            <img
              className="logo"
              src={process.env.PUBLIC_URL + "/favicon.ico"}
              alt="logo"
            />
            <span>Legal Buddy</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => dispatch(setCategory("all"))}>
                all
              </Nav.Link>
              {categories.map((value, i) => (
                <Nav.Link key={i} onClick={() => dispatch(setCategory(value))}>
                  {value}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <MenuButton />;
      </Navbar>
    </header>
  );
};

export default Header;
