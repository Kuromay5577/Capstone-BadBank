import React from "react";
//import { useContext } from "react";
import { GoogleButton, Link } from "react-google-button";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, login, googleLogin } = useAuth();

  // let [authMode, setAuthMode] = useState("login");

  // const changeAuthMode = () => {
  //   setAuthMode(authMode === "login" ? "register" : "login");
  // };

  // if (authMode === "login") {
  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content" style={{ padding: 100 }}>
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet? <Link to="/Register">Create Account</Link>
          </div>
          <GoogleButton
            onClick={() => {
              console.log("Google button clicked");
              googleLogin();
            }}
          />
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleChangeEmail}
              value={email}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handleChangePassword}
              value={password}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div>{error?.message}</div>
          {/* <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  );
}

// return (
//   <div className="Auth-form-container">
//     <form className="Auth-form">
//       <div className="Auth-form-content">
//         <h3 className="Auth-form-title">Sign In</h3>
//         <div className="text-center">
//           Already registered?{" "}
//           <span className="link-primary" onClick={changeAuthMode}>
//             Sign In
//           </span>
//         </div>
//         <div className="form-group mt-3">
//           <label>Full Name</label>
//           <input
//             type="text"
//             className="form-control mt-1"
//             placeholder="e.g Jane Doe"
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label>Email address</label>
//           <input
//             type="email"
//             className="form-control mt-1"
//             placeholder="Email Address"
//           />
//         </div>
//         <div className="form-group mt-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control mt-1"
//             placeholder="Password"
//           />
//         </div>
//         <div className="d-grid gap-2 mt-3">
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//         {/* <p className="text-center mt-2">
//           Forgot <a href="/">password?</a>
//         </p> */}
//       </div>
//     </form>
//   </div>
// );
