import React, { useState } from "react";
import NavbarCustom from "./NavbarCustom";
import lawyerCss from "./lawyerdetail.module.css";
import Rating from "./Rating";
import "./lawyermodal.css";

const LawyerModal = (props) => {
  const lawyer = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <NavbarCustom />
      <div className={lawyerCss.item}>
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/lawyers/${lawyer.img_src}`}
            roundedCircle
            width="120"
          />
          <div>
            <h4>{lawyer.name}</h4>
            <h5 className="text-capitalize text-muted">{`${lawyer.category} Lawyer`}</h5>
            <Rating rating={lawyer.rating} />
          </div>
          <strong>About:</strong> {lawyer.bio}
          <br />
          <strong>Address:</strong> {lawyer.address}
          <br />
          <strong>Email:</strong> {lawyer.email}
          <br />
          <strong>Phone:</strong> {lawyer.phone}
          <br />
          <strong>Total Cases:</strong> {lawyer.career.total_cases}
          <br />
          <strong>Cases Won:</strong> {lawyer.career.cases_won}
          <br />
          <strong>Education:</strong> {lawyer.education}
          <br />
          <strong>Languages: </strong>
          {lawyer.languages.join(", ")}
          <br />
          <strong>My Location</strong>
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                width="800"
                height="300"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=27.71743421942345, 85.34668193633858&t=&z=15&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerModal;
