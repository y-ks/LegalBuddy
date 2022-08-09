import React, { useState } from "react";
import "./signupuser.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { lawyerRegister } from "../redux/features/lawyerAction";

function SignupLawyer() {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();
  const categoryRef = useRef();
  const confirm_passwordRef = useRef();
  const addressRef = useRef();
  const bioRef = useRef();
  const total_casesRef = useRef();
  const cases_wonRef = useRef();
  const feeRef = useRef();
  const numberRef = useRef();
  const educationRef = useRef();
  const nameRef = useRef();
  const latRef = useRef();
  const longRef = useRef();

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCertificate = (event) => {
    setCertificate(event.target.files[0]);
  };

  const addLawyer = () => {
    if (
      nameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      confirm_passwordRef.current.value === "" ||
      categoryRef.current.value === "" ||
      addressRef.current.value === "" ||
      bioRef.current.value === "" ||
      total_casesRef.current.value === "" ||
      cases_wonRef.current.value === "" ||
      feeRef.current.value === "" ||
      latRef.current.value === "" ||
      longRef.current.value === "" ||
      numberRef === "" ||
      educationRef === ""
    ) {
      return;
    }

    if (!(passwordRef.current.value === confirm_passwordRef.current.value)) {
      return;
    }

    if (!numberRef.current.value.length === 10) {
      return;
    }

    const value = {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      address: addressRef.current.value,
      bio: bioRef.current.value,
      education: educationRef.current.value,
      career: {
        total_cases: total_casesRef.current.value,
        cases_won: cases_wonRef.current.value,
      },
      fee: feeRef.current.value,
      phone: numberRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      img_src: image,
      certificate_src: certificate,
      location: {
        lattitude: latRef.current.value,
        longitude: longRef.current.value,
      },
    };

    const formData = new FormData();
    const jsonData = JSON.stringify(value);
    formData.append("img_src[]", image);
    formData.append("img_src[]", certificate);
    formData.append("data", jsonData);

    dispatch(lawyerRegister(formData));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    addLawyer();
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <h2 className="card-title text-center">Signup Lawyer</h2>
            <div className="card-body py-md-4">
              <form _lpchecked="1" autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    ref={nameRef}
                    placeholder="Name"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    ref={categoryRef}
                    placeholder="Category"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    ref={addressRef}
                    placeholder="Address"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    ref={emailRef}
                    placeholder="Email"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref={numberRef}
                    id="number"
                    placeholder="Phone Number"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref={bioRef}
                    id="bio"
                    placeholder="Bio"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="education"
                    ref={educationRef}
                    placeholder="Education"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref={total_casesRef}
                    id="total_cases"
                    placeholder="Total Cases"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref={cases_wonRef}
                    id="cases_won"
                    placeholder="Cases Won"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref={feeRef}
                    id="fee"
                    placeholder="Fee"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref={latRef}
                    id="lat"
                    placeholder="Location, Latitude"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    ref={longRef}
                    id="long"
                    placeholder="Location, Longitude"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    ref={passwordRef}
                    placeholder="Password"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    ref={confirm_passwordRef}
                    id="confirm-password"
                    placeholder="Confirm-password"
                  />
                </div>
                <div className="form-group">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    id="img_src"
                    placeholder="Profile Picture"
                    onChange={handleImage}
                  />
                </div>
                <div className="form-group">
                  <label>Certificate</label>
                  <input
                    type="file"
                    className="form-control"
                    id="img_src"
                    placeholder="Certificate"
                    onChange={handleCertificate}
                  />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <a href="/login">Login</a>
                  <button type="submit" className="btn btn-primary">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupLawyer;
