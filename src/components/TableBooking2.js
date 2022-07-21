import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { Popconfirm } from "antd";
import { Button } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch } from "react-redux";
import "./table.scss";

import { bookingPayment } from "../redux/features/bookingAction";
import RateLawyer from "./RateLawyer";

function StripedRowExample(props) {
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
              {/* <li className="table-row" key={index} id={book._id}>
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
              </li> */}
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default StripedRowExample;
