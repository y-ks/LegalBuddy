import React from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
// import Lawyers from "./../data/lawyers";
import Rating from "./Rating";

const LawyerModal = (props) => {
  const id = useSelector((state) => state.modalDialog.lawyerId);
  const Lawyers = useSelector((state) => state.getalllawyers.lawyers);
  // let id = props.lawyer[0]._id;
  if (id) {
    const lawyer = Lawyers.find((lawyer) => lawyer._id === id);
    return (
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
              src={`${process.env.PUBLIC_URL}/lawyers/${lawyer.img_src}.jpg`}
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            // style={{ color: "black", background: "white" }}
            onClick={props.onHide}
          >
            {lawyer.isVerified ? "Contact" : "Verify"}
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default LawyerModal;
