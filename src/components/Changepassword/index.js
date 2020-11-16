import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./changePassword.scss";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  let history = useHistory();

  useEffect(() => {
    console.log(password, ConfirmPassword);
    const userID = localStorage.getItem("userid");
    console.log(userID);

    if (!userID) {
      history.push("/login");
    }
  }, [history]);

  const handleChangePassword = (e) => {
    e.preventDefault();
    setLoader(true);
    if (password !== ConfirmPassword) {
      setLoader(false);
      swal.fire({
        title: "Password Do Not Match",
        icon: "error",
        button: "Okay",
      });
    } else {
      let token = localStorage.getItem("token");
      try {
        axios
          .put(`http://localhost:5000/api/v1/resetpassword/${token}`, {
            password: password,
          })
          .then((res) => {
            if (res.status === 200) {
              setLoader(false);
              console.log(res);
              swal
                .fire({
                  title: "Password Changed successfully",
                  icon: "success",
                  button: "Okay",
                })
                .then((res) => {
                  history.push("/");
                });
            }
          })
          .catch((error) => {
            setLoader(false);
            swal.fire({
              title: "User Not Found",
              icon: "info",
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
      <div className="loader">
        {loader ? <LinearProgress disableShrink /> : ""}
      </div>
      <form onSubmit={handleChangePassword} className="forgotPassword-form">
        <h2 className="title">ChangePassword</h2>
        <div className="input-field">
          <i className="fa fa-key"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fa fa-key"></i>
          <input
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm Password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          ;
        </div>
        <button type="submit" className="btn solid">
          Submit
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
