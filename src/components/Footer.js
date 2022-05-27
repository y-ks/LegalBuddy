import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer class="fixed-bottom text-light">
      <Navbar bg="dark" variant="dark">
        <Container className="justify-content-center">
          <span>
            <FontAwesomeIcon icon={faCopyright} /> 2022. Legal Buddy. All Rights
            Reserved.
          </span>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
