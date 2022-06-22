import React from "react";
import "./signupuser.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { lawyerLogin } from "../redux/features/lawyerAction";

function SignupLawyer() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const value = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(value);
    dispatch(lawyerLogin(value));
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
                    placeholder="Name"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Category"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    placeholder="Phone Number"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
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
                    placeholder="Education"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="total_cases"
                    placeholder="Total Cases"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="cases_won"
                    placeholder="Cases Won"
                    autoComplete="none"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="languages"
                    placeholder="Languages separate by comma"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    placeholder="Confirm-password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    id="img_src"
                    placeholder="Choose image"
                    accept="image/*"
                  />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <a href="/login">Login</a>
                  <button className="btn btn-primary">Create Account</button>
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
