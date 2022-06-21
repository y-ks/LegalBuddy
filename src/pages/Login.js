import React from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { userLogin } from "../redux/features/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    console.log(emailRef.current.value + " " + passwordRef.current.value);

    const value = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(value);
    dispatch(userLogin(value));
  }

  return (
    <div>
      <div class="login-form">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div class="content">
            <div class="input-field">
              <input
                type="email"
                placeholder="Email"
                autocomplete="nope"
                ref={emailRef}
              />
            </div>
            <div class="input-field">
              <input
                type="password"
                placeholder="Password"
                autocomplete="new-password"
                ref={passwordRef}
              />
            </div>
            <a href="/signuplawyer" class="link">
              Signup as Lawyer?
            </a>
          </div>
          <div class="action">
            <button>
              <a href="/signup" class="link">
                Register
              </a>
            </button>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <script src="./script.js"></script>
    </div>
  );
};

export default Login;
