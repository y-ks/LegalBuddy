import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Image, Modal, Form } from "react-bootstrap";
import Rating from "./Rating";
import { NavDropdown, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/features/userAction";
import { message } from "antd";

export const MenuButton = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(1);
  const oldpasswordRef = useRef();
  const newpasswordRef = useRef();
  const confirmpasswordRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const handleChangePassword = (e) => {
    e.preventDefault();
    const password = oldpasswordRef.current.value;
    const newpassword = newpasswordRef.current.value;
    const confirmpassword = confirmpasswordRef.current.value;
    if (password === "" || newpassword === "" || confirmpassword === "") {
      handleClose();
      message.error("Missing Field");
      return;
    }

    if (newpassword !== confirmpassword) {
      handleClose();
      message.error("New password and confirm password mismatch");
      return;
    }

    if (newpassword === password) {
      handleClose();
      message.error("New password cannot be old password");
      return;
    }

    const obj = {
      userId: user._id,
      password,
      newpassword,
    };

    handleClose();

    dispatch(changePassword(obj));
  };
  return (
    <>
      {modal === 1 && (
        <Modal show={show} onHide={handleClose}>
          <div style={{ margin: "10px", padding: " 10px" }}>
            <Form onSubmit={handleChangePassword}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Old Password"
                  ref={oldpasswordRef}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  ref={newpasswordRef}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm-Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmpasswordRef}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Modal>
      )}
      {user.userType === "lawyer" && modal === 2 && (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="d-flex flex-row gap-2 justify-content-center align-items-center"
            >
              <Image
                src={`${process.env.PUBLIC_URL}/lawyers/${user.img_src}`}
                roundedCircle
                width="120"
              />
              <div>
                <h4>{user.name}</h4>
                <h5 className="text-capitalize text-muted">{`${user.category} Lawyer`}</h5>
                <Rating rating={user.rating} />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>About:</strong> {user.bio}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Total Cases:</strong> {user.career.total_cases}
            </p>
            <p>
              <strong>Cases Won:</strong> {user.career.cases_won}
            </p>
            <p>
              <strong>Education:</strong> {user.education}
            </p>
            <p>
              <strong>Languages: </strong>
              {user.languages.join(", ")}
            </p>
            <p>
              <strong>Find Me Here</strong>
            </p>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  width="800"
                  height="300"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=27.71743421942345, 85.34668193633858&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
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
              <NavDropdown.Item
                onClick={() => {
                  setModal(2);
                  handleShow();
                }}
              >
                My Detail
              </NavDropdown.Item>
              <NavDropdown.Item href="/mybookings">
                View bookings
              </NavDropdown.Item>
              <NavDropdown.Item href="/updateField">
                Modify Data
              </NavDropdown.Item>
            </div>
          ) : null}
          {user.userType !== "admin" ? (
            <NavDropdown.Item
              onClick={() => {
                setModal(1);
                handleShow();
              }}
            >
              Change Password
            </NavDropdown.Item>
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
    </>
  );
};
