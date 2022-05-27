import { Button } from "react-bootstrap";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LawyerCardList from "./components/LawyerCardList";
import LawyerModal from "./components/LawyerModal";

function App() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Header />

      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>
      <LawyerModal show={modalShow} onHide={() => setModalShow(false)} />

      <LawyerCardList />
      <Footer />
    </>
  );
}

export default App;
