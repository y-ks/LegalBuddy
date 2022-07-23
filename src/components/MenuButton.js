import axios from "axios";
import React from "react";
import { NavDropdown, Nav } from "react-bootstrap";

export const MenuButton = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const receiverId = "62b1b35384c5c5bf0e6cd0fe";
  const handleChat = () => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `/api/conversation/find/${receiverId}/${user._id}`
        );
        if (!res.data) {
          await axios.post("/api/conversation", {
            senderId: user._id,
            receiverId,
          });

          setTimeout(() => {
            window.location.href = "/message";
          }, 500);
        } else {
          setTimeout(() => {
            window.location.href = "/message";
          }, 500);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  };
  return (
    <Nav>
      <NavDropdown
        id="nav-dropdown-dark-example"
        title={` ${user.name} `}
        menuVariant="dark"
        drop="start"
      >
        {user.userType === "admin" ? (
          <>
            <NavDropdown.Item href="/message">Chatadmin</NavDropdown.Item>
          </>
        ) : (
          <>
            <NavDropdown.Item onClick={handleChat}>Chat</NavDropdown.Item>
          </>
        )}

        {user.userType === "user" ? (
          <NavDropdown.Item href="/mybookings">My Bookings</NavDropdown.Item>
        ) : null}

        {user.userType === "admin" ? (
          <div>
            <NavDropdown.Item href="/lawyerslist">
              Lawyers List
            </NavDropdown.Item>
            <NavDropdown.Item href="/userslist">Users List</NavDropdown.Item>
            <NavDropdown.Item href="/verifylawyers">
              Verify Lawyers
            </NavDropdown.Item>
          </div>
        ) : null}

        {user.userType === "lawyer" ? (
          <div>
            <NavDropdown.Item href="/mydetail">My Detail</NavDropdown.Item>
            <NavDropdown.Item href="/mybookings">
              View bookings
            </NavDropdown.Item>
            <NavDropdown.Item href="/updateField">Modify Data</NavDropdown.Item>
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
