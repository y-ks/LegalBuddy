import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchLawyers } from "../redux/features/lawyerSlice";
import { hideModal } from "../redux/features/modalSlice";
// import Lawyers from "./../data/lawyers";
import LawyerCard from "./LawyerCard";
import LawyerModal from "./LawyerModal";

const LawyerCardList = () => {
  const userID = JSON.parse(localStorage.getItem("user"))._id;
  const category = useSelector((state) => state.category.value);
  const modalShow = useSelector((state) => state.modalDialog.isModalShow);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLawyers());
  }, [dispatch]);

  const lawyer = useSelector((state) => state.getalllawyers);
  const Lawyers = lawyer.lawyers;

  let filteredLawyers = [];
  if (category === "all") {
    filteredLawyers = Lawyers;
  } else {
    Lawyers.forEach((lawyer) => {
      if (lawyer.category === category) filteredLawyers.push(lawyer);
    });
  }

  let temp = [...filteredLawyers];

  temp.sort((a, b) => b.rating - a.rating);
  const lawyerExclude = temp.filter((lawyer) => lawyer._id !== userID);
  filteredLawyers = [...lawyerExclude];

  return (
    !lawyer.loading &&
    lawyer.lawyers.length && (
      <Container className="mb-4">
        <LawyerModal
          lawyer={filteredLawyers}
          show={modalShow}
          onHide={() => dispatch(hideModal())}
        />
        <h1 className="text-capitalize mt-3 mb-4">{category} Lawyers</h1>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredLawyers.map(
            (lawyer) =>
              lawyer.isVerified === true && (
                <Col key={lawyer._id}>
                  <LawyerCard lawyer={lawyer} />
                </Col>
              )
          )}
        </Row>
      </Container>
    )
  );
};

export default LawyerCardList;
