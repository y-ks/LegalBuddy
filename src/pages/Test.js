import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RateLawyer from "../components/RateLawyer";
import RateLawyerTest from "../components/RateLawyerTest";

function Test() {
  const [show, setShow] = useState(false);
  const [rate, setRate] = useState();
  const handleClose = () => {
    setShow(false);
    console.log(rate);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate Lawyer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RateLawyerTest showmodal={true} setRate={setRate} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Test;
