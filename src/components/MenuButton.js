import React from "react";
import { NavDropdown, Nav } from "react-bootstrap";

export const MenuButton = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Nav>
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={` ${user.name} `}
        menuVariant="dark"
        drop="start"
      >
        {user.userType === "user" ? (
          <NavDropdown.Item href="/mybookings">My Bookings</NavDropdown.Item>
        ) : null}

        {user.userType === "admin" ? (
          <div>
            <NavDropdown.Item href="/mybookings">View Lawyers</NavDropdown.Item>
            <NavDropdown.Item href="/mybookings">View Users</NavDropdown.Item>
            <NavDropdown.Item href="/mybookings">
              Verify Lawyers
            </NavDropdown.Item>
          </div>
        ) : null}

        {user.userType === "lawyer" ? (
          <div>
            <NavDropdown.Item href="/mybookings">
              View bookings
            </NavDropdown.Item>
            <NavDropdown.Item href="/mybookings">Modify Data</NavDropdown.Item>
          </div>
        ) : null}

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
