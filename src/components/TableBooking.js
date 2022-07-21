import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch } from "react-redux";
import "./table.scss";

import { bookingPayment } from "../redux/features/bookingAction";
import RateLawyer from "./RateLawyer";

function TableBooking(props) {
  const [modal, setModal] = useState(false);
  const [lawyerid, setlawyerid] = useState();
  const [bookid, setbookid] = useState();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const booking = props.booking.filter((book) => book.userid === user._id);

  return (
    <>
      {modal && (
        <RateLawyer
          showmodal={modal}
          lawyerid={lawyerid}
          closeModal={setModal}
          bookid={bookid}
        />
      )}
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
            <>
              <tr>
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
                            setModal(true);
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
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableBooking;
