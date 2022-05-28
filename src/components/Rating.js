import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutlined } from "@fortawesome/free-regular-svg-icons";

const Rating = (props) => {
  const rating = props.rating;
  const Rating = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating / 2) {
      Rating.push(<FontAwesomeIcon key={i} icon={faStar} />);
    } else {
      if (i < rating / 2 + 1 && rating / 2 !== 0) {
        Rating.push(<FontAwesomeIcon key={i} icon={faStarHalfStroke} />);
      } else {
        Rating.push(<FontAwesomeIcon key={i} icon={faStarOutlined} />);
      }
    }
  }
  return <span className="rating">{Rating}</span>;
};

export default Rating;
