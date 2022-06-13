import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignupUser";
import SignupLawyer from "./pages/SignupLawyer";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/signuplawyer" component={SignupLawyer} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
