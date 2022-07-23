import React, { useState, useEffect } from "react";
import { Popconfirm } from "antd";
import { Button, Image, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeLawyer } from "../redux/features/adminAction";
import { lawyerState } from "../redux/features/lawyerSlice";
import "./table.scss";
import Rating from "./Rating";

function Table(props) {
  const dispatch = useDispatch();
  const lawyer = props.lawyer;
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [totalLawyers, setLawyers] = useState([]);

  useEffect(() => {
    setLawyers(lawyer);
  }, [lawyer]);

  return (
    <>
      {user && (
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
                src={`${process.env.PUBLIC_URL}/lawyers/${user.img_src}.jpg`}
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
            <Popconfirm
              title="Are you sure to remove this lawyer?"
              onConfirm={() => {
                handleClose();
                dispatch(removeLawyer({ lawyerid: user._id }));
                dispatch(lawyerState({ id: user._id }));
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button variant="danger">Remove</Button>
            </Popconfirm>
          </Modal.Footer>
        </Modal>
      )}
      <div className="container">
        <h2>List of Lawyers</h2>
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Sn</div>
            <div className="col col-2">Lawyer Name</div>
            <div className="col col-3">Email Address</div>
            <div className="col col-4">Action</div>
          </li>
          {totalLawyers.map(
            (lawyer, index) =>
              lawyer.isVerified === true && (
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
                      variant="primary"
                      onClick={() => {
                        setUser(lawyer);
                        handleShow();
                      }}
                    >
                      {" "}
                      View
                    </Button>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
}

export default Table;
