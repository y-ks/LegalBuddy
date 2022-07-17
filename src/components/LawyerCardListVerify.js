import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchLawyers } from "../redux/features/lawyerSlice";
import { hideModal } from "../redux/features/modalSlice";
// import Lawyers from "./../data/lawyers";
import LawyerCard from "./LawyerCard";
import LawyerModal from "./LawyerModal";
import LawyerModalVerify from "./LawyerModalVerify";

const LawyerCardListVerify = () => {
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
  return (
    !lawyer.loading &&
    lawyer.lawyers.length && (
      <Container className="mb-4">
        <LawyerModalVerify
          lawyer={filteredLawyers}
          show={modalShow}
          onHide={() => dispatch(hideModal())}
        />
        <h1 className="text-capitalize mt-3 mb-4">{category} Lawyers</h1>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredLawyers.map(
            (lawyer) =>
              lawyer.isVerified === false && (
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

export default LawyerCardListVerify;
