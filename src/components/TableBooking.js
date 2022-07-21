import React, { useState, useEffect } from "react";
import { Popconfirm } from "antd";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch } from "react-redux";
import "./table.scss";

import { bookingPayment } from "../redux/features/bookingAction";
import RateLawyer from "./RateLawyer";

function Table(props) {
  const [modal, setModal] = useState(false);
  const [lawyerid, setlawyerid] = useState();

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
        />
      )}
      <div className="container">
        <h2>List of Bookings</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Sn</div>
            <div className="col col-2">Lawyer Name</div>
            <div className="col col-3">Address</div>
            <div className="col col-4">Action</div>
          </li>
          {booking.map((book, index) => (
            <li className="table-row" key={index} id={book._id}>
              <div className="col col-1" data-label="Job Id">
                {index + 1}
              </div>
              <div className="col col-2" data-label="Customer Name">
                {book.lawyername}
              </div>
              <div className="col col-3" data-label="Amount">
                {book.lawyerAddress}
              </div>
              <div className="col col-4" data-label="Payment Status">
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Table;
