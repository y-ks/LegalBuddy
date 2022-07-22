import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch } from "react-redux";
import "./table.scss";

import { bookingPayment } from "../redux/features/bookingAction";
import RateLawyer from "./RateLawyer";
import RateLawyerTest from "./RateLawyerTest";
import { rateLawyer } from "../redux/features/lawyerAction";

function TableBooking(props) {
  const [lawyerid, setlawyerid] = useState();
  const [bookid, setbookid] = useState();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const booking = props.booking.filter((book) => book.userid === user._id);

  const [show, setShow] = useState(false);
  const [rate, setRate] = useState();
  const handleClose = () => {
    setShow(false);
    const reqObj = {
      lawyerid: lawyerid,
      rating: rate,
      bookid,
    };
    if (rate) {
      dispatch(rateLawyer(reqObj));
    }
    console.log(rate);
  };

  const hideModal = () => {
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Lawyer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RateLawyerTest
            showmodal={show}
            setRate={setRate}
            bookid={bookid}
            lawyerid={lawyerid}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped>
        <thead>
          <tr>
            <th>SN</th>
            <th>Lawyer Name</th>
            <th>Address</th>
            <th>Time</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((book, index) => (
            <tr key={book._id}>
              <td>{index + 1}</td>

              <td>{book.lawyername}</td>
              <td>{book.lawyerAddress}</td>
              <td>{book.time}</td>
              <td>{book.date}</td>
              <td>
                {" "}
                {!book.isVerified ? (
                  <>
                    <Button variant="secondary" disabled>
                      {" "}
                      Pending
                    </Button>
                  </>
                ) : book.isPaid ? (
                  book.isRated ? (
                    <>
                      <Button variant="warning" disabled>
                        {" "}
                        Rate
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="warning"
                        onClick={() => {
                          setShow(true);
                          setlawyerid(book.lawyerid);
                          setbookid(book._id);
                        }}
                      >
                        {" "}
                        Rate
                      </Button>
                    </>
                  )
                ) : (
                  <>
                    <StripeCheckout
                      token={(token) => {
                        const reqObj = {
                          token,
                          bookid: book._id,
                        };

                        dispatch(bookingPayment(reqObj));
                      }}
                      amount={500 * 100}
                      currency="NPR"
                      stripeKey="pk_test_51LNcMODUEVFHIpAz8EX7bYAWrIwj9dCU3GYSz0XKNh0lXeYYP7XVBEHEadf8R0ZrmRdrV8TudaPU10HrTcuEbNuB00qShgagaa"
                    >
                      <Button variant="success" onClick={() => {}}>
                        {" "}
                        Pay
                      </Button>
                    </StripeCheckout>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableBooking;
