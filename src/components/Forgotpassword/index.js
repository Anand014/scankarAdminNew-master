import React from "react";

const Forgotpassword = () => {
  return (
    <form className="sign-in-form">
      <h2 className="title">Forgot Password?</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input name="email" type="email" placeholder="Email" />
      </div>
      <button type="submit" className="btn solid">
        Send Link
      </button>
    </form>
  );
};

export default Forgotpassword;
