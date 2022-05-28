import React from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Lawyers from "./../data/lawyers";
import Rating from "./Rating";

const LawyerModal = (props) => {
  const id = useSelector((state) => state.modalDialog.lawyerId);
  const lawyer = Lawyers.find((lawyer) => lawyer.id === id);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
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
        <p>{lawyer.bio}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LawyerModal;
