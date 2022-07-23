import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./table.scss";

import {
  finishBooking,
  rejectBooking,
  verifyBooking,
} from "../redux/features/bookingAction";

import { Popconfirm } from "antd";
import axios from "axios";

function TableBookingLawyer(props) {
  const [show, setShow] = useState(false);
  const [book, setBook] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const booking = props.booking.filter((book) => book.lawyerid === user._id);

  const handleVerify = (receiverId, reqObj) => {
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
        }
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
    dispatch(verifyBooking(reqObj));
  };

  return (
    <>
      {book && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Booking Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Name: </strong>
              {book.username}
            </p>
            <p>
              <strong>Email:</strong> {book.email}
            </p>
            <p>
              <strong>Address: </strong>
              {book.address}
            </p>
            <p>
              <strong>Phone:</strong> {book.phone}
            </p>

            <p style={{ display: "block", overflowWrap: "break-word" }}>
              <strong>Description: </strong>
              {book.description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Popconfirm
              className="verifyIcon"
              title="Are you sure to verify this Booking?"
              onConfirm={() => {
                handleClose();
                handleVerify(book.userid, { bookid: book._id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button variant="success">Verify</Button>
            </Popconfirm>
            <Popconfirm
              className="verifyIcon"
              title="Are you sure to reject this booking?"
              onConfirm={() => {
                handleClose();
                dispatch(rejectBooking({ bookid: book._id }));
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button variant="danger">Reject</Button>
            </Popconfirm>
          </Modal.Footer>
        </Modal>
      )}
      <Table striped>
        <thead>
          <tr>
            <th>SN</th>
            <th>Client Name</th>
            <th>Email</th>
            <th>Time</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((book, index) => (
            <>
              <tr>
                <td>{index + 1}</td>

                <td>{book.username}</td>
                <td>{book.email}</td>
                <td>{book.time}</td>
                <td>{book.date}</td>
                <td>
                  {" "}
                  {!book.isVerified ? (
                    <>
                      <div>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setBook(book);
                            handleShow();
                          }}
                        >
                          View Booking
                        </Button>
                      </div>
                    </>
                  ) : book.isPaid ? (
                    !book.isFinished ? (
                      <>
                        <Popconfirm
                          className="verifyIcon"
                          title="Appointment completed?"
                          onConfirm={() => {
                            dispatch(finishBooking({ bookid: book._id }));
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button variant="primary">Finish</Button>
                        </Popconfirm>
                      </>
                    ) : (
                      <>
                        <Button variant="primary" disabled>
                          Finish
                        </Button>
                      </>
                    )
                  ) : (
                    <Button disabled variant="secondary">
                      Not Paid
                    </Button>
                  )}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableBookingLawyer;
