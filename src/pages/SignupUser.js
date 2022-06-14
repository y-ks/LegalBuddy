import React from "react";
import { useRef, useState } from "react";
import "./signupuser.css";
import axios from "axios";

const SignupUser = () =>  {

  const nameref = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();


  function addUser() {
    if(nameref.current.value==="" || emailRef.current.value==="" || passwordRef.current.value===""|| confirmpasswordRef.current.value===""){
      //setError('Please Fill all the field')
      return
    }

    if(!(passwordRef.current.value === confirmpasswordRef.current.value)){
      console.log(passwordRef.current.value + " " + confirmpasswordRef.current.value);
      //setError('Password Missmatch')
      return
    }

    const article = {
      name  : nameref.current.value,
      email : emailRef.current.value,
      password : passwordRef.current.value
     };

     console.log(article);

    axios.post('http://localhost:5000/register', article)
        .then(response => {
           //setError(response.data.message);
           console.log(response.data.message);
           setTimeout(() => {
            window.location.href = "/login";
          }, 500);
        })
        .catch(error => {
          //setError(error.data.message);
          console.error('There was an error!', error);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    addUser();
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <h2 className="card-title text-center">Signup User</h2>
            <div className="card-body py-md-4">
              <form _lpchecked="1" autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    required
                    ref={nameref}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                    ref={emailRef}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                    ref={passwordRef}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="confirm-password"
                    placeholder="Confirm-password"
                    required
                    ref={confirmpasswordRef}
                  />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <a href="/login">Login</a>

                  <button type="submit" className="btn btn-primary">Create Account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupUser;
