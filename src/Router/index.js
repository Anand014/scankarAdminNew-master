import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "../utility/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/app";
import Login from "../container/Login";
import Forgotpassword from "../components/Forgotpassword";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute path="/" component={Home} />
<<<<<<< HEAD
          {/* <Route path="/Forgotpassword" component={Forgotpassword} /> */}
=======
          <Route exact path="/forgetpassword" component={Forgotpassword} />
>>>>>>> 8ac723b65b502be7e9212b698f8d0433b8863094
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
