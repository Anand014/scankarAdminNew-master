import React, { useState, useCallback, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import "./index.scss";
import SignUp from "../../components/Signup";
import Signin from "../../components/Signin";
import Forgotpassword from "../../components/Forgotpassword";
import RightPanel from "../../components/Rightpannel";
import LeftPanel from "../../components/Leftpannel";
import myApp from "../../FirebaseConfig";
import { AuthContext } from "../../utility/AuthContext";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
import swal from "sweetalert2";

const Login = ({ history }) => {
  const [toggle, setToggle] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      setLoader(true);
      try {
        // await myApp
        //   .auth()
        //   .signInWithEmailAndPassword(email.value, password.value);
        // history.push('/');
        axios
          .post("https://backend.scankar.com/api/v1/adminLogin", {
            email: email.value,
            password: password.value,
          })
          .then((res) => {
            console.log("login success", res);
            if (res.status === 200) {
              localStorage.setItem("ownertype", res.data.user.ownerType);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userid", res.data.user._id);
              localStorage.setItem("resturant_id", res.data.user.resturant_id);
              // history.push("/")
              window.location.reload();
              setLoader(false);
            } else {
              setLoader(false);
              console.log("error");
            }
          })
          .catch((error) => {
            setLoader(false);
            console.log(error.response.status, "signin status(error)");
            console.log(error.response.data);
            if (error.response.status === 404) {
              swal.fire({
                title: "Email Does Not Exist",
                icon: "error",
                button: "Okay",
              });
            } else if (error.response.status === 400) {
              swal.fire({
                title: "Please Enter Correct Email and Password",
                icon: "error",
                button: "Okay",
              });
            } else {
              setRedirect(true);
              swal.fire({
                title: "Incorrect Password!",
                icon: "error",
                button: "Okay",
              });
            }
          });
      } catch (error) {
        console.log(error, "failed");
      }
    },
    [history]
  );
  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    const { name, email, password, type } = event.target.elements;
    try {
      setLoader(true);
      // await myApp
      //   .auth()
      //   .createUserWithEmailAndPassword(email.value, password.value);
      // return myApp.auth().currentUser.updateProfile({
      //   displayName: name,
      // });
      let mobNo =
        Math.floor(Math.random() * (Math.pow(10, 11) - Math.pow(10, 10))) +
        Math.pow(10, 10);
      const data = {
        firstName: name.value,
        lastName: name.value,
        email: email.value,
        password: password.value,
        ownerType: type.value,
        role: "admin",
        mobileNumber: mobNo.toString(),
      };
      axios
        .post("https://backend.scankar.com/api/v1/register", data)
        .then((res) => {
          console.log("signup reponse", res);
          if (res.status === 200) {
            localStorage.setItem("ownertype", res.data.user.ownerType);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userid", res.data.user._id);
            localStorage.setItem("resturant_id", res.data.user.resturant_id);
            // history.push("/")
            window.location.reload();
          }
        });
      //  history.push('/');
    } catch (error) {
      alert(error);
    }
  }, []);
  const onClick = () => setToggle(!toggle);
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return toggle ? (
    <>
      {loader ? <LinearProgress /> : ""}
      <div className="container" style={{ transition: "all 1s" }}>
        <div className="forms-container">
          <div className="signin-signup">
            <Signin onSubmit={handleLogin} />
            {redirect ? (
              <div>
                <Link to="/forgetpassword" className="forgotpassword">
                  Forgot Password?
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="panels-container">
          <LeftPanel click={onClick} />
          <RightPanel click={onClick} />
        </div>
      </div>
    </>
  ) : (
    <>
      {loader ? <LinearProgress /> : <></>}
      <div
        className="container sign-up-mode"
        style={{ marginLeft: "10%", transition: "all 1s" }}
      >
        <div className="forms-container">
          <div className="signin-signup">
            <SignUp onSubmit={handleSignUp} />
          </div>
        </div>

        <div className="panels-container">
          <LeftPanel click={onClick} />
          <RightPanel click={onClick} />
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
