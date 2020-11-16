import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "../utility/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/app";
import Login from "../container/Login";
import ForgotPassword from "../components/Forgotpassword";
import ChangePassword from "../components/Changepassword";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute path="/" component={Home} />
          <Route exact path="/forgetpassword" component={ForgotPassword} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
