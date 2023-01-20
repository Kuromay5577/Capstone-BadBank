import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Alert from "@mui/material/Alert";
import GoogleButton from "react-google-button";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, register, googleRegister } = useAuth();

  const handleSubmit = (event) => {
    //    alert("Welcome " + name + "! ");
    event.preventDefault();
    register({ name: name, email: email, password: password });
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Auth-form-container">
      {error ? <Alert severity="error">This is an error alert!</Alert> : null}
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content" style={{ padding: 100 }}>
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?
            <p className="text-center mt-2">
              <a href="/login">Log in</a>
            </p>
          </div>
          <GoogleButton
            onClick={() => {
              console.log("Google button clicked");
              googleRegister();
            }}
          />
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={handleChangeName}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={handleChangeEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={handleChangePassword}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2">
          Forgot <a href="/">password?</a>
        </p> */}
        </div>
      </form>
    </div>
  );
}
