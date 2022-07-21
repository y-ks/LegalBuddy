import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { rateLawyer } from "../redux/features/lawyerAction";
import tableCss from "./rateLawyer.module.css";
// import "./rateLawyer.css";

const colors = {
  orange: "#ffba5a",
  grey: "#a9a9a9",
};
function RateLawyerTest({ showmodal, setRate }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, sethoverValue] = useState(undefined);
  if (showmodal) {
    const stars = Array(5).fill(0);

    const handleClick = (value) => {
      setCurrentValue(value);
      setRate(value);
    };
    const handleMouseHover = (value) => sethoverValue(value);
    const handleMouseLeave = () => sethoverValue(undefined);
    return (
      <div style={styles.container}>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{ marginRight: 10, cursor: "pointer" }}
                onClick={() => handleClick(index + 1)}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                onMouseOver={() => handleMouseHover(index + 1)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
export default RateLawyerTest;
