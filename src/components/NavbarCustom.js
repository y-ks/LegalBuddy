import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCategory } from "../redux/features/categorySlice";
import Lawyers from "./../data/lawyers";
import { MenuButton } from "./MenuButton";

const NavbarCustom = () => {
  const dispatch = useDispatch();
  // const categories = [];
  // Lawyers.forEach((lawyer) => {
  //   const category = lawyer["category"];
  //   if (categories.indexOf(category) === -1) categories.push(category);
  // });
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => dispatch(setCategory("all"))} href="/">
            <img
              className="logo"
              src={process.env.PUBLIC_URL + "/favicon.ico"}
              alt="logo"
              width="20"
              height="20"
            />
            <span>Legal Buddy</span>
          </Navbar.Brand>
        </Container>
        <MenuButton />;
      </Navbar>
    </header>
  );
};

export default NavbarCustom;
