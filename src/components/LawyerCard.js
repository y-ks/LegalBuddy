import { Card } from "react-bootstrap";

const LawyerCard = (props) => {
  const lawyer = props.lawyer;
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={`${process.env.PUBLIC_URL}/lawyers/${lawyer.img_src}.jpg`}
        />
        <Card.Body>
          <Card.Title>{lawyer.name}</Card.Title>
          <Card.Text>{lawyer.bio}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default LawyerCard;
