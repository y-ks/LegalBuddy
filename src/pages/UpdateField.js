import { useRef } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import NavbarCustom from "../components/NavbarCustom";
import { updateField } from "../redux/features/lawyerAction";
import updateCss from "./updatefield.module.css";

function UpdateField() {
  const dispatch = useDispatch();
  const feeRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const lawyerid = JSON.parse(localStorage.getItem("user"))._id;

  const handleSubmit = () => {
    const reqObj = {
      fee: feeRef.current.value,
      latitude: latitudeRef.current.value,
      longitude: longitudeRef.current.value,
      lawyerid,
    };
    console.log(reqObj);
    dispatch(updateField(reqObj));
  };
  return (
    <>
      <NavbarCustom />
      <div className={updateCss.formalign}>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Fees</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter updated fees"
              ref={feeRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Location,latitude</Form.Label>
            <Form.Control
              type="string"
              placeholder="Latitude"
              ref={latitudeRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Location,longitude</Form.Label>
            <Form.Control
              type="string"
              placeholder="Longitude"
              ref={longitudeRef}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default UpdateField;
