import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import axios from "axios";
import "./forgot.css";
import { CircularProgress } from "@material-ui/core";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log("entered email", email);
  }, [email]);

  const handleForgotPassword = (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      axios
        .post("http://localhost:5000/api/v1/forgotPassword", {
          email: email,
        })
        .then((res) => {
          if (res.status === 200) {
            setLoader(false);
            setSuccess(res.data.data);
          }
        })
        .catch((error) => {
          setLoader(false);
          setMessage(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {success ? (
        swal.fire({
          text: success,
          icon: "success",
          button: "Okay",
        })
      ) : (
        <></>
      )}
      {message ? (
        swal.fire({
          text: "Email Not Found",
          icon: "info",
          button: "Okay",
        })
      ) : (
        <></>
      )}
      <form onSubmit={handleForgotPassword} className="forgotPassword-form">
        <h2 className="title">
          Forgot Password?
          {loader ? (
            <CircularProgress disableShrink className="loader" />
          ) : (
            <></>
          )}
        </h2>
        <div className="input-field">
          <i className="fa fa-user"></i>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn solid">
          Send Link
        </button>
      </form>
    </>
  );
};

export default Forgotpassword;
