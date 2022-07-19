import React from "react";
import "antd/dist/antd.css";
import "antd/dist/antd.less";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignupUser";
import SignupLawyer from "./pages/SignupLawyer";
import Mybookings from "./pages/Mybookings";
import LawyersList from "./pages/LawyersList";
import UsersList from "./pages/UsersList";
import VerifyLawyers from "./pages/VerifyLawyers";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AdminRoute exact path="/lawyerslist" component={LawyersList} />
        <AdminRoute exact path="/userslist" component={UsersList} />
        <AdminRoute exact path="/verifylawyers" component={VerifyLawyers} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/mybookings" component={Mybookings} />
        <ProtectedRoute
          exact
          path="/bookingpage/:lawyerid"
          component={BookingPage}
        />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/signuplawyer" component={SignupLawyer} />
      </Switch>
    </BrowserRouter>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export function AdminRoute(props) {
  if (JSON.parse(localStorage.getItem("user")).userType === "admin") {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
}
export default App;
