import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { showModal } from "../store/modalSlice";
import Rating from "./Rating";

const LawyerCard = (props) => {
  const dispatch = useDispatch();
  const lawyer = props.lawyer;
  return (
    <>
      <Card onClick={() => dispatch(showModal(lawyer.id))}>
        <Card.Img
          variant="top"
          src={`${process.env.PUBLIC_URL}/lawyers/${lawyer.img_src}.jpg`}
        />
        <Card.Body>
          <Card.Title>{lawyer.name}</Card.Title>
          <Card.Text>
            {lawyer.bio}
            <br />
            <Rating rating={lawyer.rating} />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default LawyerCard;
