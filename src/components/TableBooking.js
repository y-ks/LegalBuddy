import React, { useState, useEffect } from "react";
import { Popconfirm } from "antd";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./table.scss";

function Table(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const booking = props.booking.filter((book) => book.userid === user._id);
  const lawyer = props.lawyer;
  console.log(booking);
  return (
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
          <li className="table-row" key={index}>
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
              {book.isPaid ? (
                <>
                  <Popconfirm
                    title="Are you sure to rate this user?"
                    // onConfirm={() => {
                    //   dispatch(removeUser({ userid: user._id }));
                    //   dispatch(deleteUser({ id: user._id }));
                    // }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button variant="outline-danger"> Rate</Button>
                  </Popconfirm>
                </>
              ) : (
                <>
                  <Popconfirm
                    title="Are you sure to make this payment?"
                    // onConfirm={() => {
                    //   dispatch(removeUser({ userid: user._id }));
                    //   dispatch(deleteUser({ id: user._id }));
                    // }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button variant="outline-danger"> Pay</Button>
                  </Popconfirm>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Table;
