import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import { LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { User } from "react-feather";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  let history = useHistory();
  const userID = localStorage.getItem("userid");

  useEffect(() => {
    console.log(password, ConfirmPassword);
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
          .put(`https://backend.scankar.com/api/v1/changePassword`, {
            password: password,
            oldpassword: oldPassword,
            id: userID,
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
            if (error.response.status === 401) {
              swal.fire({
                title: "Invalid Current password",
                icon: "info",
                button: "Okay",
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {loader ? <LinearProgress /> : ""}
      <form onSubmit={handleChangePassword} className="forgotPassword-form">
        <h2 className="title">Change Password</h2>
        <div className="input-field">
          <i className="fa fa-key"></i>
          <input
            type="password"
            name="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fa fa-key"></i>
          <input
            type="password"
            name="password"
            placeholder="New Password"
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
        </div>
        <button type="submit" className="btn solid">
          Submit
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
