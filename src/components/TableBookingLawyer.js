import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./table.scss";

import {
  bookingPayment,
  finishBooking,
  rejectBooking,
  verifyBooking,
} from "../redux/features/bookingAction";
import RateLawyer from "./RateLawyer";
import { Popconfirm } from "antd";

function TableBookingLawyer(props) {
  const [modal, setModal] = useState(false);
  const [lawyerid, setlawyerid] = useState();
  const [bookid, setbookid] = useState();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const booking = props.booking.filter((book) => book.lawyerid === user._id);

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
            <th>Client Name</th>
            <th>Email</th>
            <th>Time</th>
            <th>Date</th>
            <th>Description</th>
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
                <td>{book.description}</td>
                <td>
                  {" "}
                  {!book.isVerified ? (
                    <>
                      <div>
                        <Popconfirm
                          className="verifyIcon"
                          title="Are you sure to verify this Booking?"
                          onConfirm={() => {
                            dispatch(verifyBooking({ bookid: book._id }));
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <CheckOutlined style={{ color: "green" }} />
                        </Popconfirm>
                      </div>
                      <Popconfirm
                        className="verifyIcon"
                        title="Are you sure to reject this booking?"
                        onConfirm={() => {
                          dispatch(rejectBooking({ bookid: book._id }));
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <CloseOutlined style={{ color: "red" }} />
                      </Popconfirm>
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
