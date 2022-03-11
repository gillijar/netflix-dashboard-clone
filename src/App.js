import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

import Auth from "./components/Pages/Auth/Auth";
import Dashboard from "./components/UI/Dashboard";
import Browse from "./components/Pages/Browse/Browse";
import Title from "./components/Pages/Title/Title";

const App = () => {
  return (
    <Dashboard>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/browse">
          <Browse />
        </Route>
        <Route path="/browse/:id" exact>
          <Title />
        </Route>
        <Route path="/media/:media" exact>
          <Browse />
        </Route>
      </Switch>
    </Dashboard>
  );
};

export default App;
