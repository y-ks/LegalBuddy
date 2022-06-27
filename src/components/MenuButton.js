import { message } from "antd";
import React from "react";
import { NavDropdown, Nav } from "react-bootstrap";

export const MenuButton = () => {
  return (
    <Nav>
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={` ${JSON.parse(localStorage.getItem("name"))} `}
        menuVariant="dark"
        drop="start"
      >
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">My Lawyers</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};
