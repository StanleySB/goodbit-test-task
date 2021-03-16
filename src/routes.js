//core
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CardDetail from "./pages/cardDetail";
//components
import Main from "./pages/main";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/posts/:id" component={CardDetail} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
