import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div>
      <div class="login-form">
        <form>
          <h1>Login</h1>
          <div class="content">
            <div class="input-field">
              <input type="email" placeholder="Email" autocomplete="nope" />
            </div>
            <div class="input-field">
              <input
                type="password"
                placeholder="Password"
                autocomplete="new-password"
              />
            </div>
            <a href="#" class="link">
              Signup as Lawyer?
            </a>
          </div>
          <div class="action">
            <button type="submit" formaction="/signup">
              Register
            </button>
            <button>Sign in</button>
          </div>
        </form>
      </div>
      <script src="./script.js"></script>
    </div>
  );
};

export default Login;
