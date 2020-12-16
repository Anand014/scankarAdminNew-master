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
    if (email === "") {
      swal.fire({
        title: "Please Enter a Valid Email",
        icon: "error",
        button: "Okay",
      });
      setLoader(false);
    } else {
      try {
        axios
          .post("https://backend.scankar.com/api/v1/resetpassword", {
            email: email,
          })
          .then((res) => {
            console.log(res);
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
            console.log(error);
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
