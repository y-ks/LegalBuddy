import React, { useState, useEffect } from "react";
import { message, Popconfirm } from "antd";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/features/adminAction";
import { deleteUser } from "../redux/features/userSlice";
import "./table.scss";

function Table(props) {
  const dispatch = useDispatch();
  const user = props.user;

  const [totalUsers, setUsers] = useState([]);

  useEffect(() => {
    setUsers(user);
  }, [user]);

  return (
    <div className="container">
      <h2>List of Users</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Sn</div>
          <div className="col col-2">Lawyer Name</div>
          <div className="col col-3">Email Address</div>
          <div className="col col-4">Action</div>
        </li>
        {totalUsers.map((user, index) => (
          <li className="table-row" key={index}>
            <div className="col col-1" data-label="Job Id">
              {index + 1}
            </div>
            <div className="col col-2" data-label="Customer Name">
              {user.name}
            </div>
            <div className="col col-3" data-label="Amount">
              {user.email}
            </div>
            <div className="col col-4" data-label="Payment Status">
              <Popconfirm
                title="Are you sure to remove this user?"
                onConfirm={() => {
                  dispatch(removeUser({ userid: user._id }));
                  dispatch(deleteUser({ id: user._id }));
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button variant="outline-danger"> Remove</Button>
              </Popconfirm>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Table;
