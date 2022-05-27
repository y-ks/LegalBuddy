import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/categorySlice";
import Categories from "./../data/categories";

const Header = () => {
  const category = useSelector((state) => state.category.value);
  const dispatch = useDispatch();

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
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
            {Categories.map((value, i) => (
              <Nav.Link key={i} onClick={() => dispatch(setCategory(value))}>
                {value}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
      <h1>category === {category}</h1>
    </header>
  );
};

export default Header;
