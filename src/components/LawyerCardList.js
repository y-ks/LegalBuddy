import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Lawyers from "./../data/lawyers";
import LawyerCard from "./LawyerCard";

const LawyerCardList = () => {
  const category = useSelector((state) => state.category.value);
  let filteredLawyers = [];
  if (category === "all") {
    filteredLawyers = Lawyers;
  } else {
    Lawyers.forEach((lawyer) => {
      if (lawyer.category === category) filteredLawyers.push(lawyer);
    });
  }
  return (
    <Container className="mb-4">
      <h1 className="text-capitalize mt-3 mb-4">{category} Lawyers</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredLawyers.map((lawyer) => (
          <Col key={lawyer.id}>
            <LawyerCard lawyer={lawyer} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LawyerCardList;
