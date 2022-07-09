import React from "react";
import "antd/dist/antd.css";
import "antd/dist/antd.less";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignupUser";
import SignupLawyer from "./pages/SignupLawyer";
import Mybookings from "./pages/Mybookings";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/mybookings" component={Mybookings} />
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
  if (localStorage.getItem("name")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
export default App;
