import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeLawyer } from "../redux/features/adminAction";
import { deleteLawyer } from "../redux/features/lawyerSlice";
import "./table.scss";

function Table(props) {
  const dispatch = useDispatch();
  const lawyer = props.lawyer;

  const [totalLawyers, setLawyers] = useState([]);

  useEffect(() => {
    setLawyers(lawyer);
  }, [lawyer]);

  return (
    <div className="container">
      <h2>List of Lawyers</h2>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Sn</div>
          <div className="col col-2">Lawyer Name</div>
          <div className="col col-3">Email Address</div>
          <div className="col col-4">Action</div>
        </li>
        {totalLawyers.map((lawyer, index) => (
          <li className="table-row" key={index}>
            <div className="col col-1" data-label="Job Id">
              {index + 1}
            </div>
            <div className="col col-2" data-label="Customer Name">
              {lawyer.name}
            </div>
            <div className="col col-3" data-label="Amount">
              {lawyer.email}
            </div>
            <div className="col col-4" data-label="Payment Status">
              <Button
                variant="outline-danger"
                onClick={() => {
                  dispatch(deleteLawyer({ id: lawyer._id }));
                  dispatch(removeLawyer({ lawyerid: lawyer._id }));
                }}
              >
                {" "}
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Table;
