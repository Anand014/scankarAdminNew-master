import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import axios from "axios";
import "./forgot.css";
import { LinearProgress } from "@material-ui/core";

import { useHistory } from "react-router-dom";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  let history = useHistory();

  // useEffect(() => {
  //   console.log("entered email", email);
  // }, [email]);

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
            swal
              .fire({
                title: "Email sent successfully",
                icon: "success",
                button: "Okay",
              })
              .then((res) => {
                history.push("/login");
              });
          }
        })
        .catch((error) => {
          setLoader(false);
          swal.fire({
            title: "Email Not found",
            icon: "error",
            button: "Okay",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loader ? <LinearProgress /> : ""}
      <form onSubmit={handleForgotPassword} className="forgotPassword-form">
        <h2 className="title">Forgot Password?</h2>
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
