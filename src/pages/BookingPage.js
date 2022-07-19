import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./bookingpage.css";
import { bookingRequest } from "../redux/features/bookingAction";
import { fetchBookings } from "../redux/features/bookingSlice";

function BookingPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const lawyerid = props.match.params.lawyerid;
  const userID = JSON.parse(localStorage.getItem("user"));
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const dateRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();
  const onDateChange = () => {
    const d = dateRef.current.value;
    setDate(d);
  };

  const onTimeChange = () => {
    const t = timeRef.current.value;
    setTime(t);
  };

  const handleBookingpage = (event) => {
    event.preventDefault();
    const booking = {
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      description: descriptionRef.current.value,
      date,
      userid: userID._id,
      time: time,
      lawyerid,
    };

    dispatch(bookingRequest(booking));
  };
  return (
    <div className="formclass">
      <Form autoComplete="off" onSubmit={handleBookingpage}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              autoComplete="off"
              ref={emailRef}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>PhoneNumber</Form.Label>
            <Form.Control
              type="string"
              placeholder="Phone number"
              autoComplete="off"
              ref={phoneRef}
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="Nakhipot, Lalitpur"
            ref={addressRef}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Case Description</Form.Label>
          <Form.Control
            placeholder="Case Description"
            as="textarea"
            rows={3}
            autoComplete="off"
            ref={descriptionRef}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Date</Form.Label>

            <Form.Control
              type="date"
              placeholder="Select date"
              ref={dateRef}
              onChange={onDateChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Select Time</Form.Label>
            <Form.Select
              defaultValue="....."
              ref={timeRef}
              onChange={onTimeChange}
              required
            >
              <option disabled>.....</option>
              <option>10-11</option>
              <option>11-12</option>
              <option>13-14</option>
              <option>14-15</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default BookingPage;
