import React, { useState } from "react";
import { Button, Image, Modal, Card } from "react-bootstrap";
import { Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { verifyLawyer, rejectLawyer } from "../redux/features/adminAction";
import "./lawyermodal.css";
// import Lawyers from "./../data/lawyers";
import Rating from "./Rating";
import { lawyerState } from "../redux/features/lawyerSlice";

function LawyerModalVerify(props) {
  const id = useSelector((state) => state.modalDialog.lawyerId);
  const Lawyers = useSelector((state) => state.getalllawyers.lawyers);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // let id = props.lawyer[0]._id;
  if (id) {
    const lawyer = Lawyers.find((lawyer) => lawyer._id === id);
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Card.Img
            variant="top"
            src={`${process.env.PUBLIC_URL}/lawyers/${lawyer.certificate_src}`}
          />
        </Modal>
        <Modal
          {...props}
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
                src={`${process.env.PUBLIC_URL}/lawyers/${lawyer.img_src}`}
                roundedCircle
                width="120"
              />
              <div>
                <h4>{lawyer.name}</h4>
                <h5 className="text-capitalize text-muted">{`${lawyer.category} Lawyer`}</h5>
                <Rating rating={lawyer.rating} />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>About:</strong> {lawyer.bio}
            </p>
            <p>
              <strong>Address:</strong> {lawyer.address}
            </p>
            <p>
              <strong>Email:</strong> {lawyer.email}
            </p>
            <p>
              <strong>Phone:</strong> {lawyer.phone}
            </p>
            <p>
              <strong>Fee:</strong> {lawyer.fee}
            </p>
            <p>
              <strong>Total Cases:</strong> {lawyer.career.total_cases}
            </p>
            <p>
              <strong>Cases Won:</strong> {lawyer.career.cases_won}
            </p>
            <p>
              <strong>Education:</strong> {lawyer.education}
            </p>
            <p>
              <strong>Languages: </strong>
              {lawyer.languages.join(", ")}
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
                  src={`https://maps.google.com/maps?q=${lawyer.location.lattitude}, ${lawyer.location.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleShow}>View Certificate</Button>
            <Popconfirm
              title="Are you sure to verify this lawyer?"
              onConfirm={() => {
                props.onHide();
                dispatch(verifyLawyer({ lawyerid: lawyer._id }));
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                // style={{ color: "black", background: "white" }}
                // onClick={props.onHide}
                variant="success"
              >
                Verify
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure to Reject this lawyer?"
              onConfirm={() => {
                props.onHide();
                dispatch(rejectLawyer({ lawyerid: lawyer._id }));
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button variant="danger">Reject</Button>
            </Popconfirm>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default LawyerModalVerify;
