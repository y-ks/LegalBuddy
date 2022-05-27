import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCategory } from "../store/categorySlice";
import Lawyers from "./../data/lawyers";

const Header = () => {
  const dispatch = useDispatch();
  const categories = [];
  Lawyers.forEach((lawyer) => {
    categories.push(lawyer["category"]);
  });
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => dispatch(setCategory("all"))}>
            <img
              className="logo"
              src={process.env.PUBLIC_URL + "/favicon.ico"}
              alt="logo"
            />
            <span>Legal Buddy</span>
          </Navbar.Brand>
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
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
