import React from "react";
import "./login.css";
import { useRef, useState } from "react";
import axios from "axios";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoggedIn, setLoggedIn] = useState("");

  async function handleSubmit(e) {
    console.log(e);
    e.preventDefault();
    console.log(emailRef.current.value + " " + passwordRef.current.value);

    const article = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("http://localhost:5000/users/login", article)
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          console.log(response.data);
          console.log(response.data.token);
          const token = localStorage.setItem("Token", response.data.token);
          localStorage.setItem("userID", response.data.user._id);
          localStorage.setItem("userName", response.data.user.name);
        } else {
          //console.log(error.data);
        }
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  }

  if (isLoggedIn) {
    window.location.href = "/";
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
