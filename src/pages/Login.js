import React from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { userLogin } from "../redux/features/userAction";
import { lawyerLogin } from "../redux/features/lawyerAction";

const Login = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const value = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    document.getElementById("user").checked
      ? dispatch(userLogin(value))
      : dispatch(lawyerLogin(value));
  }

  return (
    <div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                autoComplete="nope"
                ref={emailRef}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                ref={passwordRef}
              />
            </div>

            <div>
              <label for="user" className="l-radio">
                <input type="radio" id="user" name="userType" />
                <span>User</span>
              </label>
              <label for="lawyer" className="l-radio">
                <input type="radio" id="lawyer" name="userType" />
                <span>Lawyer</span>
              </label>
            </div>
            <a href="/signuplawyer" className="link">
              Signup as Lawyer?
            </a>
            <br />
            <a href="/signup" className="link">
              Signup as user?
            </a>
          </div>
          <div className="action">
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <script src="./script.js"></script>
    </div>
  );
};

export default Login;
