import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    console.log("entered email", email);
  }, [email]);

  const handleForgotPassword = useCallback(async (event) => {
    event.preventDefault();
    try {
      axios
        .post("http://localhost:5000/api/v1/forgotPassword", {
          email: email,
        })
        .then((res) => {
          console.log("login success", res.status);
          if (res.status === 200) {
            setSuccess(true);
          }
        })
        .catch((error) => {
          setMessage(true);
        });
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <form onSubmit={handleForgotPassword} className="forgotPassword-form">
      <h2 className="title">Forgot Password?</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
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
      {success ? <h2>Email has been send</h2> : <div></div>}
      {message ? <h2>No User Found</h2> : <div></div>}
    </form>
  );
};

export default Forgotpassword;
